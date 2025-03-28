<?php

namespace App\Controller\FetchProduct;

use App\Entity\Enova\EnovaProduct;
use App\Entity\Enova\ProductInfo;
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
        try {
            $token = $this->tokenService->fetchAndStoreToken();
        } catch (\Exception $e) {
            return new JsonResponse(['error' => $e->getMessage()], 500);
        }

        $tokenEntity = $this->tokenRepository->findLatestToken();
        if (!$tokenEntity) {
            throw new \Exception('No token found in the database.');
        }

        $token = $tokenEntity->getToken();

        // Get all existing product IDs before fetching
        $existingProductIds = $this->enovaProductRepository->findAllProductIds(); // You need to implement this in the repository

        $allProducts = [];
        $fetchedProductIds = [];
        $currentPage = 1;
        $limit = 50;

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

            foreach ($productData['elementy'] as $product) {
                $fetchedProductIds[] = $product['id'];
            }

            $allProducts = array_merge($allProducts, $productData['elementy']);
            $currentPage++;
        } while (count($allProducts) < $productData['liczbaWszystkich']);

        foreach ($allProducts as $product) {
            $productInfo = $this->productInfoRepository->find($product['id']);

            if (!$productInfo) {
                $productInfo = new ProductInfo(); // Create a new ProductInfo if not found

                // Assign default values for each field based on its type
                $productInfo->setId($product['id']);
                $productInfo->setBrand($product['braid'] ?? 0);  // Default value 0 for int
                $productInfo->setVariant($product['varid'] ?? 0);  // Default value 0 for int
                $productInfo->setCategory($product['catid'] ?? 0);  // Default value 0 for int
//                $productInfo->setImageId($product['image_id'] ?? null);  // Default value NULL for nullable field
                $productInfo->setImagePath($product['image_path'] ?? '/media/item_types/landscape-placeholder.svg');  // Default value NULL for nullable string
                $productInfo->setSubcategory($product['scatid'] ?? 0);  // Default value 0 for int
                $productInfo->setItemType($product['itypeid'] ?? 0);  // Default value 0 for int
                $productInfo->setDescription($product['description'] ?? null);  // Default value NULL for nullable string
                $productInfo->setPolishDescription($product['polish_description'] ?? null);  // Default value NULL for nullable string
                $productInfo->setGermanDescription($product['german_description'] ?? null);  // Default value NULL for nullable string
                $productInfo->setEnglishTitle($product['english_title'] ?? null);  // Default value NULL for nullable string
                $productInfo->setGermanTitle($product['german_title'] ?? null);  // Default value NULL for nullable string
                $productInfo->setCouplingFilter($product['coupling_filter_id'] ?? 0);  // Default value 0 for int
                $productInfo->setMachineFilter($product['machine_filter_id'] ?? 0);  // Default value 0 for int

                $this->productInfoRepository->save($productInfo, true); // Save new ProductInfo
            }

            $existingProduct = $this->enovaProductRepository->findOneBy(['id' => $product['id']]);

            if (!$existingProduct) {
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
                $newProduct->setUpdatedAt(new \DateTime());

                $this->enovaProductRepository->save($newProduct, true);
            } else {
                $existingProduct->setProductInfo($productInfo);
                $existingProduct->setName($product['nazwa']);
                $existingProduct->setCode($product['kod']);
                $existingProduct->setEan($product['EAN']);
                $existingProduct->setUnit($product['jednostka']);
                $existingProduct->setQuantity((int)$product['Ilosc']);
                $existingProduct->setStockStatus($product['stanMagazynowy']);
                $existingProduct->setFeatures($product['listaCechy']);
                $existingProduct->setPriceList($product['listaCen']);
                $existingProduct->setUpdatedAt(new \DateTime());

                $this->enovaProductRepository->save($existingProduct, true);
            }
        }

        // Remove products that were not present in the latest fetch
        $productsToRemove = array_diff($existingProductIds, $fetchedProductIds);

        foreach ($productsToRemove as $productId) {
            $productToDelete = $this->enovaProductRepository->find($productId);
            if ($productToDelete) {
                $this->enovaProductRepository->remove($productToDelete, true);
            }
        }

        return new JsonResponse(['status' => 'success', 'message' => 'Products fetched, updated, and removed successfully']);
    }

}
