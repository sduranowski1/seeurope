<?php

namespace App\Controller\EnovaMakeOrder;

use App\Entity\Enova\EnovaOrder;
use App\Repository\TokenRepository;
use App\Service\TokenService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Contracts\HttpClient\HttpClientInterface;
use Psr\Log\LoggerInterface;

class EnovaMakeOrderController extends AbstractController
{
    private EntityManagerInterface $entityManager;
    private HttpClientInterface $client;
    private TokenRepository $tokenRepository;
    private TokenService $tokenService;
    private LoggerInterface $logger;  // Inject LoggerInterface


    public function __construct(
        EntityManagerInterface $entityManager,
        HttpClientInterface $client,
        TokenRepository     $tokenRepository,
        TokenService        $tokenService,
        LoggerInterface     $logger
    )
    {
        $this->entityManager = $entityManager;
        $this->client = $client;
        $this->tokenRepository = $tokenRepository;
        $this->tokenService = $tokenService;
        $this->logger = $logger;
    }

    public function __invoke(Request $request): JsonResponse
    {
        return $this->postAndSaveContractors($request);
    }

    public function postAndSaveContractors(Request $request): JsonResponse
    {
        try {
            $token = $this->tokenService->fetchAndStoreToken();
        } catch (\Exception $e) {
            return new JsonResponse(['error' => $e->getMessage()], 500);
        }

        $tokenEntity = $this->tokenRepository->findLatestToken();
        if (!$tokenEntity) {
            return new JsonResponse(['error' => 'No token found in the database.'], 500);
        }

        $token = $tokenEntity->getToken();
        $ordersUrl = 'http://extranet.seequipment.pl:9010/api/PanelWWW_API/DodajZamowienie';


        // Get request data and decode it
        $requestBody = json_decode($request->getContent(), true);
        if (!$requestBody) {
            return new JsonResponse(['error' => 'Invalid JSON payload'], 400);
        }

        // Add timestamps dynamically if missing
        if (!isset($requestBody['data'])) {
            $requestBody['data'] = (new \DateTime())->format('c');
        }
        if (!isset($requestBody['terminPlatnosci'])) {
            $requestBody['terminPlatnosci'] = (new \DateTime('+7 days'))->format('c');
        }

        try {
            $response = $this->client->request('POST', $ordersUrl, [
                'json' => $requestBody,
                'headers' => [
                    'Authorization' => 'Bearer ' . $token,
                    'Content-Type' => 'application/json',
                    'Accept' => 'application/json',
                ],
                'verify_peer' => false,
            ]);

            $data = $response->toArray();

            // Save response to database
            $enovaOrder = new EnovaOrder();
            $enovaOrder->setIdWWW($data['idWWW'] ?? null);
            $enovaOrder->setIdEnova($data['idEnova'] ?? null);
            $email = null;
            if (isset($data['lokalizacjaDostawy']) && isset($data['lokalizacjaDostawy']['eMail'])) {
                $email = $data['lokalizacjaDostawy']['eMail'];
            }

            $enovaOrder->setEmail($email);
            $enovaOrder->setIdPlatnosciInternetowej($data['idPlatnosciInternetowej'] ?? null);
            $enovaOrder->setNumerWWW($data['numerWWW'] ?? null);
            $enovaOrder->setNumerEnova($data['numerEnova'] ?? null);
            $enovaOrder->setWartosc($data['wartosc'] ?? null);
            $enovaOrder->setWartoscWaluta($data['wartoscWaluta'] ?? null);
            $enovaOrder->setPlatnik($data['platnik'] ?? null);
            $enovaOrder->setOdbiorca($data['odbiorca'] ?? null);
            $enovaOrder->setLokalizacjaDostawy($data['lokalizacjaDostawy'] ?? []);
            $enovaOrder->setData(new \DateTime($data['data'] ?? 'now'));
            $enovaOrder->setOpis($data['opis'] ?? null);
            $enovaOrder->setPozycjeDokHandlowego($data['pozycjeDokHandlowego'] ?? []);
            $enovaOrder->setTerminPlatnosci(new \DateTime($data['terminPlatnosci'] ?? 'now'));

            // Process 'pozycjeDokHandlowego' and extract 'productName'
            $pozycjeDokHandlowego = [];
            if (isset($data['pozycjeDokHandlowego']) && is_array($data['pozycjeDokHandlowego'])) {
                foreach ($data['pozycjeDokHandlowego'] as $pozycja) {
                    $pozycjaDok = [
                        'towarEnovaId' => $pozycja['towarEnovaId'] ?? null,
                        'ilosc' => $pozycja['ilosc'] ?? null,
                        'cena' => $pozycja['cena'] ?? null,
                        'wartosc' => $pozycja['wartosc'] ?? null,
                        'jednostka' => $pozycja['jednostka'] ?? null,
                        'symbolWaluty' => $pozycja['symbolWaluty'] ?? null,
                        'productName' => $pozycja['productName'] ?? null // Capture product name
                    ];
                    $pozycjeDokHandlowego[] = $pozycjaDok;
                }
            }

            // Save updated list with product names
            $enovaOrder->setPozycjeDokHandlowego($pozycjeDokHandlowego);


            $this->entityManager->persist($enovaOrder);
            $this->entityManager->flush();

            return new JsonResponse($data, $response->getStatusCode());
        } catch (\Exception $e) {
            // Log the error here as well
            $this->logger->error('Error making order request: ' . $e->getMessage(), [
                'exception' => $e,
                'request_data' => $request->request->all(), // Optionally log request data
            ]);
            return new JsonResponse(['error' => $e->getMessage()], 500);
        }
    }

}
