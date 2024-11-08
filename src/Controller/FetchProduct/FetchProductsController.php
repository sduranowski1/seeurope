<?php

// src/Controller/FetchProductByIdController.php

namespace App\Controller\FetchProduct;

use App\Repository\TokenRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Contracts\HttpClient\HttpClientInterface;

class FetchProductsController extends AbstractController
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

        if (!isset($data['strona'])) {
            throw new BadRequestHttpException('Missing "strona" field in request body.');
        }

        $strona = $data['strona'];

        if (!isset($data['limit'])) {
            throw new BadRequestHttpException('Missing "limit" field in request body.');
        }

        $limit = $data['limit'];

        if (!isset($data['pokazCeny'])) {
            throw new BadRequestHttpException('Missing "pokazCeny" field in request body.');
        }

        $pokazCeny = $data['pokazCeny'];

        // Get the token from the database
        $tokenEntity = $this->tokenRepository->findLatestToken();
        if (!$tokenEntity) {
            throw new \Exception('No token found in the database.');
        }

        // Assume you have a method to fetch the token dynamically if needed
        $token = $tokenEntity->getToken();

        // Now, use the token for the next request (e.g., POST /DajTowarWgId)
        $productUrl = 'http://extranet.seequipment.pl:9010/api/PanelWWW_API/DajTowary';

        // POST request to fetch the product data
        $productResponse = $this->client->request('POST', $productUrl, [
            'json' => [
                'strona' => $strona,  // Use the input parameter
                'limit' => $limit,  // Use the input parameter
                'pokazCeny' => $pokazCeny  // Use the input parameter
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