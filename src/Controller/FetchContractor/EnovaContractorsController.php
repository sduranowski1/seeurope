<?php

namespace App\Controller\FetchContractor;

use App\Entity\Enova\EnovaContractor;
use App\Entity\Enova\EnovaPerson;
use App\Entity\Enova\EnovaProduct;
use App\Repository\EnovaContractorRepository;
use App\Repository\EnovaPersonRepository;
use App\Repository\EnovaProductRepository;
use App\Repository\ProductInfoRepository;
use App\Repository\TokenRepository;
use App\Service\TokenService;
use GuzzleHttp\Client;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Contracts\HttpClient\HttpClientInterface;

class EnovaContractorsController extends AbstractController
{
    private HttpClientInterface $client;
    private TokenRepository $tokenRepository;
    private TokenService $tokenService;  // TokenService injected
    private EnovaContractorRepository $enovaContractorRepository;
    private EnovaPersonRepository $enovaPersonRepository;

    public function __construct(
        HttpClientInterface    $client,
        TokenRepository        $tokenRepository,
        TokenService           $tokenService,  // Inject TokenService
        EnovaContractorRepository $enovaContractorRepository,
        EnovaPersonRepository $enovaPersonRepository,
    )
    {
        $this->client = $client;
        $this->tokenRepository = $tokenRepository;
        $this->tokenService = $tokenService;  // Assign service to property
        $this->enovaContractorRepository = $enovaContractorRepository;
        $this->enovaPersonRepository = $enovaPersonRepository;
    }

    public function fetchAndSaveContractors(): JsonResponse
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

        $contractorsUrl = 'http://extranet.seequipment.pl:9010/api/PanelWWW_API/DajKontrahentow';
        $response = $this->client->request('POST', $contractorsUrl, [
            'json' => [
//                'strona' => 1,
//                'limit' => 50,
                'pokazOsoby' => true
            ],
            'headers' => [
                'Authorization' => 'Bearer ' . $token,
                'Content-Type' => 'application/json',
                'Accept' => 'application/json',
            ],
            'verify_peer' => false,
        ]);

        $data = $response->toArray();

        if (!isset($data['elementy']) || empty($data['elementy'])) {
            return new JsonResponse(['status' => 'success', 'message' => 'No contractors found.']);
        }

        foreach ($data['elementy'] as $contractor) {
            // Find contractor by idEnova
            $existingContractor = $this->enovaContractorRepository->findOneBy(['idEnova' => $contractor['idEnova']]);

            if (!$existingContractor) {
                // Create a new contractor if not found
                $newContractor = new EnovaContractor();
                $newContractor->setIdEnova($contractor['idEnova']); // Use idEnova for the contractor
                $newContractor->setNazwa($contractor['nazwa']);

                foreach ($contractor['listaOsobyKontrahenta'] as $personData) {
                    $person = new EnovaPerson();
                    $person->setImie($personData['imie']);
                    $person->setNazwisko($personData['nazwisko']);
                    $person->setId($personData['id']); // Use id for person
                    $newContractor->addListaOsobyKontrahenta($person);
                }

                $this->enovaContractorRepository->save($newContractor, true);
            } else {
                // Update the existing contractor
                $existingContractor->setNazwa($contractor['nazwa']);

                foreach ($contractor['listaOsobyKontrahenta'] as $personData) {
                    // Find the person by id
                    $person = $this->enovaPersonRepository->findOneBy(['id' => $personData['id']]);

                    if (!$person) {
                        // Create a new person if not found
                        $person = new EnovaPerson();
                        $person->setImie($personData['imie']);
                        $person->setNazwisko($personData['nazwisko']);
                        $person->setId($personData['id']); // Use id for person
                        $existingContractor->addListaOsobyKontrahenta($person);
                    } else {
                        // Update the existing person
                        $person->setImie($personData['imie']);
                        $person->setImie($personData['nazwisko']);
                    }
                }

                $this->enovaContractorRepository->save($existingContractor, true);
            }
        }

        return new JsonResponse(['status' => 'success', 'message' => 'Contractors fetched and saved successfully']);
    }
}
