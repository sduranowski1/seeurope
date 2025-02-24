<?php

namespace App\Controller\FetchProduct;

use App\Entity\Enova\EnovaProduct;
use App\Repository\EnovaProductRepository;
use App\Repository\ProductInfoRepository;
use App\Repository\TokenRepository;
use App\Service\TokenService;
use GuzzleHttp\Client;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Contracts\HttpClient\HttpClientInterface;

class EnovaProductsController extends AbstractController
{
    private HttpClientInterface $client;
    private TokenRepository $tokenRepository;
    private TokenService $tokenService;  // TokenService injected
    private EnovaProductRepository $enovaProductRepository;
    private ProductInfoRepository $productInfoRepository;

    public function __construct(
        HttpClientInterface $client,
        TokenRepository $tokenRepository,
        TokenService $tokenService,  // Inject TokenService
        EnovaProductRepository $enovaProductRepository,
        ProductInfoRepository $productInfoRepository
    ) {
        $this->client = $client;
        $this->tokenRepository = $tokenRepository;
        $this->tokenService = $tokenService;  // Assign service to property
        $this->enovaProductRepository = $enovaProductRepository;
        $this->productInfoRepository = $productInfoRepository;
    }

    public function fetchAndSaveProducts(): JsonResponse
    {
        // Call the TokenController method to fetch and save the token at the beginning
        try {
            $token = $this->tokenService->fetchAndStoreToken();  // Fetch and save the token
        } catch (\Exception $e) {
            return new JsonResponse(['error' => $e->getMessage()], 500);
        }

        // Get the token from the database
        $tokenEntity = $this->tokenRepository->findLatestToken();
        if (!$tokenEntity) {
            throw new \Exception('No token found in the database.');
        }

        $token = $tokenEntity->getToken();

        $allProducts = [];
        $currentPage = 1;
        $limit = 50; // Adjust as needed

        do {
            $productUrl = 'http://extranet.seequipment.pl:9010/api/PanelWWW_API/DajTowary';
            $productResponse = $this->client->request('POST', $productUrl, [
                'json' => [
                    'strona' => $currentPage,
                    'limit' => $limit,
                    'pokazCeny' => true,
                    'poleSortowane' => 'ID',
                    'czyRosnaco' => 1
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
                break;
            }

            $allProducts = array_merge($allProducts, $productData['elementy']);
            $currentPage++;
        } while (count($allProducts) < $productData['liczbaWszystkich']);

        foreach ($allProducts as $product) {
            // Fetch the corresponding ProductInfo entity by its ID (using the same ID as in the product)
            $productInfo = $this->productInfoRepository->find($product['id']); // Adjust this if 'id' is not the right field for ProductInfo

            if (!$productInfo) {
                // If the ProductInfo doesn't exist, you can handle the case here, maybe skip this product or log an error
                continue;
            }

            // Check if the product already exists in the database
            $existingProduct = $this->enovaProductRepository->findOneBy(['id' => $product['id']]);

            if (!$existingProduct) {
                // Create a new FetchProduct entity
                $newProduct = new EnovaProduct();
                $newProduct->setId($product['id']);
                $newProduct->setProductInfo($productInfo);
                $newProduct->setCode($product['kod']);
                $newProduct->setName($product['nazwa']);
                $newProduct->setEan($product['EAN']);
                $newProduct->setUnit($product['jednostka']);
                $newProduct->setQuantity((int)$product['Ilosc']);
                $newProduct->setStockStatus($product['stanMagazynowy']);
                $newProduct->setFeatures($product['listaCechy']);
                $newProduct->setPriceList($product['listaCen']);
//                $newProduct->setIndividualPrices($product['listaCenIndywidualnych']);
                $newProduct->setUpdatedAt(new \DateTime());
                // Map other fields as needed

                $this->enovaProductRepository->save($newProduct, true);
            } else {
                // Update existing product
                $existingProduct->setId($product['id']);
                $existingProduct->setProductInfo($productInfo);
                $existingProduct->setName($product['nazwa']);
                $existingProduct->setCode($product['kod']);
                $existingProduct->setEan($product['EAN']);
                $existingProduct->setUnit($product['jednostka']);
                $existingProduct->setQuantity((int)$product['Ilosc']);
                $existingProduct->setStockStatus($product['stanMagazynowy']);
                $existingProduct->setFeatures($product['listaCechy']);
                $existingProduct->setPriceList($product['listaCen']);
//                $existingProduct->setIndividualPrices($product['listaCenIndywidualnych']);
                $existingProduct->setUpdatedAt(new \DateTime());
                // Update other fields as needed

                $this->enovaProductRepository->save($existingProduct, true);
            }
        }

        return new JsonResponse(['status' => 'success', 'message' => 'Products fetched and saved successfully']);
    }
}
