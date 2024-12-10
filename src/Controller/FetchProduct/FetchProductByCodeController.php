<?php
namespace App\Controller\FetchProduct;

use App\Repository\TokenRepository;
use App\Entity\Enova\FetchProduct;
use App\Repository\ProductInfoRepository;
use App\Repository\FetchProductRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Contracts\HttpClient\HttpClientInterface;

class FetchProductByCodeController extends AbstractController
{
    private HttpClientInterface $client;
    private TokenRepository $tokenRepository;
    private ProductInfoRepository $productInfoRepository;
    private FetchProductRepository $fetchProductRepository;

    public function __construct(
        HttpClientInterface $client,
        TokenRepository $tokenRepository,
        ProductInfoRepository $productInfoRepository,
        FetchProductRepository $fetchProductRepository
    ) {
        $this->client = $client;
        $this->tokenRepository = $tokenRepository;
        $this->productInfoRepository = $productInfoRepository;
        $this->fetchProductRepository = $fetchProductRepository;
    }

    public function __invoke(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        // Validate required field
        if (!isset($data['parametr'])) {
            throw new BadRequestHttpException('Missing "parametr" field in request body.');
        }

        $parametr = $data['parametr'];

        // Get the token from the database
        $tokenEntity = $this->tokenRepository->findLatestToken();
        if (!$tokenEntity) {
            throw new \Exception('No token found in the database.');
        }

        $token = $tokenEntity->getToken();

        // POST request to fetch the product data by code
        $productUrl = 'http://extranet.seequipment.pl:9010/api/PanelWWW_API/DajTowarWgKod';
        $productResponse = $this->client->request('POST', $productUrl, [
            'json' => ['parametr' => $parametr],
            'headers' => [
                'Authorization' => 'Bearer ' . $token,
                'Content-Type' => 'application/json',
                'Accept' => 'application/json',
            ],
            'verify_peer' => false,
        ]);

        $productData = $productResponse->toArray();

        if (empty($productData)) {
            throw $this->createNotFoundException('Product not found.');
        }

        // Extract product information
        $productId = $productData['id']; // Assuming the API returns a single product object with an ID
        $productInfo = $this->productInfoRepository->find($productId);

        if (!$productInfo) {
            throw $this->createNotFoundException(sprintf('Product with ID %d not found.', $productId));
        }

        // Construct the image path using braid
        $imagePath = sprintf('/images/products/%d.jpg', $productInfo->getBraid());

        // Build the response
        $response = [
            "id" => $productData['id'] ?? 0,
            "bid" => $productData['bid'] ?? 0,
            "vid" => $productData['vid'] ?? 0,
            "cid" => $productData['cid'] ?? 0,
            "kod" => $productData['kod'] ?? "string",
            "nazwa" => $productData['nazwa'] ?? "string",
            "ean" => $productData['ean'] ?? "string",
            "jednostka" => $productData['jednostka'] ?? "string",
            "ilosc" => $productData['ilosc'] ?? 0,
            "stanMagazynowy" => $productData['stanMagazynowy'] ?? "string",
            "listaCechy" => $productData['listaCechy'] ?? [],
            "listaCen" => $productData['listaCen'] ?? [
                    [
                        "waluta" => "string",
                        "netto" => 0,
                        "nazwa" => "string"
                    ]
                ],
            "listaCenIndywidualnych" => $productData['listaCenIndywidualnych'] ?? [
                    [
                        "waluta" => "string",
                        "netto" => 0,
                        "towarID" => 0,
                        "kontrahentID" => 0
                    ]
                ],
            "productInfo" => [
                "id" => $productInfo->getId() ?? 0,
                "imagePath" => $productInfo->getImagePath() ?? "string", // Provide a default path if $imagePath is null
                "description" => $productInfo->getDescription() ?? "string", // description
                // Add additional fields here as needed
            ],
        ];

        // Create and persist the FetchProduct entity
        $fetchProduct = new FetchProduct();
        $fetchProduct->setProductInfo($productInfo);
        $this->fetchProductRepository->save($fetchProduct);

        return new JsonResponse($response);
    }
}
