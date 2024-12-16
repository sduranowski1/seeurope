<?php
// src/Controller/FetchContractorPeopleController.php

namespace App\Controller\FetchContractorPeople;

use App\Repository\TokenRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Contracts\HttpClient\HttpClientInterface;

class FetchContractorPeopleController extends AbstractController
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

        if (!isset($data['strona']) || !isset($data['limit'])) {
            throw new BadRequestHttpException('Missing "strona" or "limit" field in request body.');
        }

        $strona = (int) $data['strona'];
        $limit = (int) $data['limit'];

        // Get the token from the database
        $tokenEntity = $this->tokenRepository->findLatestToken();
        if (!$tokenEntity) {
            throw new \Exception('No token found in the database.');
        }

        $token = $tokenEntity->getToken();

        // Fetch all contractors upfront (adjust as necessary for API constraints)
        $productUrl = 'http://extranet.seequipment.pl:9010/api/PanelWWW_API/DajKontrahentow';
        $productResponse = $this->client->request('POST', $productUrl, [
            'json' => [
                'strona' => 1, // Start with the first page
                'limit' => 1000, // Fetch a large number to simulate fetching all data
            ],
            'headers' => [
                'Authorization' => 'Bearer ' . $token,
                'Content-Type' => 'application/json',
                'Accept' => 'application/json',
            ],
            'verify_peer' => false,
        ]);

        $productData = $productResponse->toArray();

        // Filter out contractors with empty "listaOsobyKontrahenta"
        $filteredData = array_filter($productData['elementy'] ?? [], function ($contractor) {
            return !empty($contractor['listaOsobyKontrahenta']);
        });

        // Calculate total items after filtering
        $totalItems = count($filteredData);

        // Paginate filtered data
        $paginatedData = array_slice($filteredData, ($strona - 1) * $limit, $limit);

        // Return response with updated pagination info
        return new JsonResponse([
            'liczbaWszystkich' => $totalItems,
            'elementy' => $paginatedData,
        ]);
    }
}
