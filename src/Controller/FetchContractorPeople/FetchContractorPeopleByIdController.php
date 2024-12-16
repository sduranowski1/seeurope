<?php
// src/Controller/FetchProductByIdController.php

namespace App\Controller\FetchContractorPeople;

use App\Entity\Enova\FetchContractor;
use App\Repository\FetchContractorRepository;
use App\Repository\TokenRepository;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Contracts\HttpClient\HttpClientInterface;

class FetchContractorPeopleByIdController extends AbstractController
{
    private HttpClientInterface $client;
    private TokenRepository $tokenRepository;
    private UserRepository $userRepository;
    private FetchContractorRepository $fetchContractorRepository;

    public function __construct(HttpClientInterface $client, TokenRepository $tokenRepository, UserRepository $userRepository, FetchContractorRepository $fetchContractorRepository)
    {
        $this->client = $client;
        $this->tokenRepository = $tokenRepository;
        $this->userRepository = $userRepository;
        $this->fetchContractorRepository = $fetchContractorRepository;
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
        $productUrl = 'http://extranet.seequipment.pl:9010/api/PanelWWW_API/DajKontaktOsobaWgId';

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

        if (empty($productData)) {
            throw $this->createNotFoundException('Product not found.');
        }

        // Extract product information
        $productId = $productData['id']; // Assuming the API returns a single product object with an ID
        $productInfo = $this->userRepository->find($productId);

        if (!$productInfo) {
            throw $this->createNotFoundException(sprintf('Contrahnet User with ID %d not found.', $productId));
        }

        // Build the response
        $response = [
            "id" => $productData['id'] ?? 0,
            "idKontrahent" => $productData['idKontrahent'] ?? 0,
            "imie" => $productData['imie'] ?? "string",
            "nazwisko" => $productData['nazwisko'] ?? "string",
            "stanowisko" => $productData['stanowisko'] ?? "string",
            "email" => $productData['email'] ?? "string",
            "telKomorkowy" => $productData['telKomorkowy'] ?? "string",
            "adres" => $productData['adres'] ?? [
                    [
                        "wojewodztwo" => "string",
                        "gmina" => "string",
                        "nrDomu" => "string",
                        "nrLokalu" => "string",
                        "poczta" => "string",
                        "powiat" => "string",
                        "Regon" => 0,
                        "telefon" => "string",
                        "ulica" => "string",
                        "miejscowosc" => "string",
                        "kodPocztowy" => "string",
                        "kraj" => "string",
                    ]
                ],
            "dostepDoWWW" => $productData['dostepDoWWW'] ?? true,
            "prawoDoZamowien" => $productData['prawoDoZamowien'] ?? true,
            "login" => [
                "loginId" => $productInfo->getId() ?? 0,
                "email" => $productInfo->getEmail() ?? "string",
                "plainPassword" => $productInfo->getPlainPassword() ?? "string", // description
                // Add additional fields here as needed
            ],
        ];

        // Create and persist the FetchProduct entity
        $fetchProduct = new FetchContractor();
        $fetchProduct->setUser($productInfo);
        $this->fetchContractorRepository->save($fetchProduct);

        return new JsonResponse($response);
    }
}
