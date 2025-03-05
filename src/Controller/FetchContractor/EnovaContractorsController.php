<?php

namespace App\Controller\FetchContractor;

use App\Entity\Enova\EnovaAddress;
use App\Entity\Enova\EnovaContractor;
use App\Entity\Enova\EnovaLocation;
use App\Entity\Enova\EnovaPerson;
use App\Repository\EnovaContractorRepository;
use App\Repository\EnovaLocationRepository;
use App\Repository\EnovaPersonRepository;
use App\Repository\EnovaAddressRepository;  // Added repository for EnovaAddress
use App\Repository\TokenRepository;
use App\Service\TokenService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Contracts\HttpClient\HttpClientInterface;

class EnovaContractorsController extends AbstractController
{
    private HttpClientInterface $client;
    private TokenRepository $tokenRepository;
    private TokenService $tokenService;
    private EnovaContractorRepository $enovaContractorRepository;
    private EnovaPersonRepository $enovaPersonRepository;
    private EnovaLocationRepository $enovaLocationRepository;
    private EnovaAddressRepository $enovaAddressRepository;  // Added property for EnovaAddressRepository

    public function __construct(
        HttpClientInterface $client,
        TokenRepository $tokenRepository,
        TokenService $tokenService,
        EnovaContractorRepository $enovaContractorRepository,
        EnovaPersonRepository $enovaPersonRepository,
        EnovaLocationRepository $enovaLocationRepository,
        EnovaAddressRepository $enovaAddressRepository  // Inject EnovaAddressRepository
    )
    {
        $this->client = $client;
        $this->tokenRepository = $tokenRepository;
        $this->tokenService = $tokenService;
        $this->enovaContractorRepository = $enovaContractorRepository;
        $this->enovaPersonRepository = $enovaPersonRepository;
        $this->enovaLocationRepository = $enovaLocationRepository;
        $this->enovaAddressRepository = $enovaAddressRepository;  // Assign to the property
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
                    'strona' => 1,
//                    'limit' => 50,
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

        $data = $response->toArray();

//        // Define the path to save the JSON file
//        $filePath = 'contractors_data.json';
//
//        // Convert the data to JSON
//        $jsonData = json_encode($data['elementy'], JSON_PRETTY_PRINT);
//
//        // Save the JSON data to a file
//        file_put_contents($filePath, $jsonData);

        if (!isset($data['elementy']) || empty($data['elementy'])) {
            return new JsonResponse(['status' => 'success', 'message' => 'No contractors found.']);
        }

        // Debugging: Check if 'elementy' exists and is an array
        if (!isset($data['elementy']) || !is_array($data['elementy'])) {
            error_log("Invalid data structure: 'elementy' key is missing or not an array.");
            return new JsonResponse(['status' => 'error', 'message' => "'elementy' data is missing or invalid."], 400);
        }

        foreach ($data['elementy'] as $contractor) {
            // Ensure that each contractor is an array and contains 'idEnova'
            if (!is_array($contractor)) {
                error_log("Skipping entry : Not an array");
                continue;
            }

            if (!isset($contractor['idEnova'])) {
                error_log("Skipping entry : Missing 'idEnova'");
                continue;
            }

            error_log("Processing contractor  with idEnova: " . $contractor['idEnova']);

            if (!is_array($contractor) || !isset($contractor['idEnova'])) {
                continue; // Skip this contractor if 'idEnova' is missing
            }
            // Find contractor by idEnova
            try {
                $existingContractor = $this->enovaContractorRepository->findOneBy(['idEnova' => $contractor['idEnova']]);
            } catch (\Exception $e) {
                error_log("Database error on contractor: " . $e->getMessage());
                continue;
            }
            // Process primary address
            $adres = $this->processAddress($contractor['adres']);
            if ($existingContractor) {
                $existingContractor->setAdres($adres);
            }

            // Process mailing address
            $adresKorespondencyjny = $this->processAddress($contractor['adresKorespondencyjny']);
            if ($existingContractor) {
                $existingContractor->setAdresKorespondencyjny($adresKorespondencyjny);
            }

            if (!$existingContractor) {
                // Create a new contractor if not found
                $newContractor = new EnovaContractor();
                $newContractor->setIdEnova($contractor['idEnova']);
                $newContractor->setId($contractor['idEnova']);
                $newContractor->setNazwa($contractor['nazwa']);
                $newContractor->setKod($contractor['kod']);
                $newContractor->setEmail($contractor['Email']);
                $newContractor->setCenaKontrahentaNazwa($contractor['cenaKontrahentaNazwa']);
                $newContractor->setTelefon($contractor['Telefon']);
                $newContractor->setAdres($adres);
                $newContractor->setAdresKorespondencyjny($adresKorespondencyjny);

                foreach ($contractor['listaLokalizacje'] as $locationData) {
                    $location = $this->processLocation($locationData);
//                    $newContractor->addLocation($location);
                }

                foreach ($contractor['listaOsobyKontrahenta'] as $personData) {
                    $person = $this->processPerson($personData);
                    $newContractor->addListaOsobyKontrahenta($person);
                }

                $this->enovaContractorRepository->save($newContractor, true);
            } else {
                // Update the existing contractor
                $existingContractor->setId($contractor['idEnova']);
                $existingContractor->setNazwa($contractor['nazwa']);
                $existingContractor->setKod($contractor['kod']);
                $existingContractor->setEmail($contractor['Email']);
                $existingContractor->setCenaKontrahentaNazwa($contractor['cenaKontrahentaNazwa']);
                $existingContractor->setTelefon($contractor['Telefon']);
                $existingContractor->setAdres($adres);  // Update address
                $existingContractor->setAdresKorespondencyjny($adresKorespondencyjny);  // Update mailing address

                // Update or add locations
                foreach ($contractor['listaLokalizacje'] as $locationData) {
                    $location = $this->processLocation($locationData);
//                    $existingContractor->addLocation($location);
                }

                // Update or add persons
                foreach ($contractor['listaOsobyKontrahenta'] as $personData) {
                    $person = $this->processPerson($personData);
                    $existingContractor->addListaOsobyKontrahenta($person);
                }

                $this->enovaContractorRepository->save($existingContractor, true);
            }
        }

        return new JsonResponse(['status' => 'success', 'message' => 'Contractors fetched and saved successfully']);
    }

    private function processAddress(array $addressData): EnovaAddress
    {
        if (!isset($addressData['id'])) {
            throw new \Exception('Address ID is missing.');
        }

        // Try to find an existing address by ID
        $adres = $this->enovaAddressRepository->find($addressData['id']);

        if (!$adres) {
            // Create a new entity only if it doesn't exist
            $adres = new EnovaAddress();
            $adres->setId($addressData['id']);
        }

        // Update the entity's fields
        $adres->setWojewodztwo($addressData['wojewodztwo'] ?? null);
        $adres->setGmina($addressData['gmina'] ?? null);
        $adres->setNrDomu($addressData['nrDomu'] ?? null);
        $adres->setNrLokalu($addressData['nrLokalu'] ?? null);
        $adres->setPoczta($addressData['poczta'] ?? null);
        $adres->setPowiat($addressData['powiat'] ?? null);
        $adres->setUlica($addressData['ulica'] ?? null);
        $adres->setMiejscowosc($addressData['miejscowosc'] ?? null);
        $adres->setKodPocztowy($addressData['kodPocztowy'] ?? null);
        $adres->setKraj($addressData['kraj'] ?? null);

        // Ensure the address is managed by Doctrine
        $this->enovaAddressRepository->save($adres, true);

        return $adres;
    }



    private function processLocation(array $locationData): EnovaLocation
    {
        if (!isset($locationData['id'])) {
            throw new \Exception('Location ID is missing.');
        }

        // Retrieve existing location or create a new one
        $location = $this->enovaLocationRepository->find($locationData['id']) ?? new EnovaLocation();
        $location->setId($locationData['id']);  // Ensure ID is set correctly

        $location->setKod($locationData['kod'] ?? '');
        $location->setNazwa($locationData['nazwa'] ?? '');
        $location->setEMail($locationData['eMail'] ?? '');

        if (isset($locationData['adres'])) {
            $adresLocation = $this->processAddress($locationData['adres']);
            $location->setAdresLocation($adresLocation);
        }

        return $location;
    }



    private function processPerson(array $personData): EnovaPerson
    {
        if (!isset($personData['id'])) {
            throw new \Exception('Person ID is missing.');
        }

        // Retrieve existing person or create a new one
        $person = $this->enovaPersonRepository->find($personData['id']) ?? new EnovaPerson();
        $person->setId($personData['id']);  // Ensure ID is set correctly
        $person->setImie($personData['imie'] ?? '');
        $person->setNazwisko($personData['nazwisko'] ?? '');
        $person->setStanowisko($personData['stanowisko'] ?? '');
        $person->setEmail($personData['email'] ?? '');
        $person->setTelKomorkowy($personData['telKomorkowy'] ?? '');
        $person->setDostepDoWWW($personData['dostepDoWWW'] ?? false);
        $person->setPrawoDoZamowien($personData['prawoDoZamowien'] ?? false);

        $this->enovaPersonRepository->save($person, true);

        return $person;
    }

}
