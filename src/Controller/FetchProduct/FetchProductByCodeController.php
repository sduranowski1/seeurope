<?php
// src/Controller/FetchProductByIdController.php

namespace App\Controller\FetchProduct;

use App\Entity\Enova\FetchProduct;
use App\Repository\FetchProductRepository;
use App\Repository\ProductInfoRepository;
use App\Repository\TokenRepository;
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

        if (!isset($data['parametr'])) {
            throw new BadRequestHttpException('Missing "parametr" field in request body.');
        }

        $parametr = $data['parametr'];

        // Get the token from the database
        $tokenEntity = $this->tokenRepository->findLatestToken();
        if (!$tokenEntity) {
            throw new \Exception('No token found in the database.');
        }

        // Assume you have a method to fetch the token dynamically if needed
        $token = $tokenEntity->getToken();

        // Now, use the token for the next request (e.g., POST /DajTowarWgId)
        $productUrl = 'http://extranet.seequipment.pl:9010/api/PanelWWW_API/DajTowarWgKod';

        // POST request to fetch the product data
        $productResponse = $this->client->request('POST', $productUrl, [
            'json' => [
                'parametr' => $parametr  // Use the input parameter
            ],
            'headers' => [
                'Authorization' => 'Bearer ' . $token,  // Use the token here
                'Content-Type' => 'application/json',  // Content-Type header to specify the body format
                'Accept' => 'application/json',        // Accept header to specify the expected response format
            ],
            'verify_peer' => false, // Add this to disable SSL verification
        ]);

        // Handle the response from the second request
        $productData = $productResponse->toArray();


        foreach ($productData as $product) {
            // Fetch additional product information using the product ID from the API response
            $productInfo = $this->productInfoRepository->find($product['id']);

            // If productInfo is found, merge it with the product data
            if ($productInfo) {
                $product['productInfo'] = [
                    'id' => $productInfo->getId(),
                    'imagePath' => $productInfo->getImagePath(), // Add catid

                    // Add any other fields from the productInfo entity that you need
                ];
            }

            // Add the product with productInfo to the 'elementy' array
            $productData = $product;
        }

        // Create and persist the FetchProduct entity
        $fetchProduct = new FetchProduct();
        $fetchProduct->setProductInfo($productInfo); // Set the related product info

        // Save FetchProduct in the database
        $this->fetchProductRepository->save($fetchProduct);

        return new JsonResponse($productData);
    }
}
