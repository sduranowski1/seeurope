<?php
namespace App\Controller\FetchProduct;

use App\Repository\TokenRepository;
use App\Entity\Enova\FetchProduct; // Import the FetchProduct entity
use App\Repository\ProductInfoRepository; // Import ProductInfo repository
use App\Repository\FetchProductRepository; // Import FetchProduct repository
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Contracts\HttpClient\HttpClientInterface;

class FetchProductsController extends AbstractController
{
    private HttpClientInterface $client;
    private TokenRepository $tokenRepository;
    private ProductInfoRepository $productInfoRepository;
    private FetchProductRepository $fetchProductRepository; // Inject FetchProductRepository

    public function __construct(
        HttpClientInterface $client,
        TokenRepository $tokenRepository,
        ProductInfoRepository $productInfoRepository,
        FetchProductRepository $fetchProductRepository // Initialize repository
    )
    {
        $this->client = $client;
        $this->tokenRepository = $tokenRepository;
        $this->productInfoRepository = $productInfoRepository;
        $this->fetchProductRepository = $fetchProductRepository; // Initialize repository
    }

    public function __invoke(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        // Validate the required fields
        foreach (['strona', 'limit', 'pokazCeny', 'poleSortowane', 'czyRosnaco'] as $field) {
            if (!isset($data[$field])) {
                throw new BadRequestHttpException(sprintf('Missing "%s" field in request body.', $field));
            }
        }

        $strona = $data['strona'];
        $limit = $data['limit'];
        $pokazCeny = $data['pokazCeny'];
        $poleSortowane = $data['poleSortowane'];
        $czyRosnaco = $data['czyRosnaco'];
        $nazwaFilter = $data['nazwa'] ?? null; // Optional filter by 'nazwa'

        // Get the token from the database
        $tokenEntity = $this->tokenRepository->findLatestToken();
        if (!$tokenEntity) {
            throw new \Exception('No token found in the database.');
        }

        $token = $tokenEntity->getToken();

        $allProducts = []; // Collect all products
        $currentPage = 1;

        do {
            // POST request to fetch the product data
            $productUrl = 'http://extranet.seequipment.pl:9010/api/PanelWWW_API/DajTowary';
            $productResponse = $this->client->request('POST', $productUrl, [
                'json' => [
                    'strona' => $currentPage,
                    'limit' => $limit,
                    'pokazCeny' => $pokazCeny,
                    'poleSortowane' => $poleSortowane,
                    'czyRosnaco' => $czyRosnaco
                ],
                'headers' => [
                    'Authorization' => 'Bearer ' . $token,
                    'Content-Type' => 'application/json',
                    'Accept' => 'application/json',
                ],
                'verify_peer' => false,
            ]);

            $productData = $productResponse->toArray();

            if (!isset($productData['elementy']) || empty($productData['elementy'])) {
                break; // Stop fetching if no more elements
            }

            $allProducts = array_merge($allProducts, $productData['elementy']);
            $currentPage++;
        } while (count($allProducts) < $productData['liczbaWszystkich']);

        // Apply 'nazwa' filter across all collected data
        $filteredProducts = array_filter($allProducts, function ($product) use ($nazwaFilter) {
            return $nazwaFilter === null || stripos($product['nazwa'], $nazwaFilter) !== false;
        });

        // Paginate the filtered results locally
        $offset = ($strona - 1) * $limit;
        $paginatedProducts = array_slice($filteredProducts, $offset, $limit);

        $response = [
            'liczbaWszystkich' => count($filteredProducts),
            'wartoscWszystkich' => 0,
            'wartoscNaStronie' => 0,
            'elementy' => [],
        ];

        foreach ($paginatedProducts as $product) {
            // Fetch additional product information using the product ID
            $productInfo = $this->productInfoRepository->find($product['id']);

            if ($productInfo) {
                $product['productInfo'] = [
                    'id' => $productInfo->getId(),
                    'braid' => $productInfo->getBraid(),
                    'catid' => $productInfo->getCatid(),
                    'scatid' => $productInfo->getScatid(),
                    'varid' => $productInfo->getVarid(),
                    'itypeid' => $productInfo->getItypeid(),
                ];
            }

            $response['elementy'][] = $product;
        }

        return new JsonResponse($response);
    }

}

