<?php
// src/Controller/FetchProductByIdController.php

namespace App\Controller\FetchContractor;

use App\Repository\TokenRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Contracts\HttpClient\HttpClientInterface;

class FetchContractorByIdController extends AbstractController
{
    private HttpClientInterface $client;
    private TokenRepository $tokenRepository;

    public function __construct(HttpClientInterface $client, TokenRepository $tokenRepository)
    {
        $this->client = $client;
        $this->tokenRepository = $tokenRepository;
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
        $productUrl = 'http://extranet.seequipment.pl:9010/api/PanelWWW_API/DajKontrahentaWgId';

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

        return new JsonResponse($productData);
    }
}
