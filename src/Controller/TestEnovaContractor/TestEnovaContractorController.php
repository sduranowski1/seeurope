<?php

namespace App\Controller\TestEnovaContractor;

use App\Entity\TestEnova\TestEnovaAddress;
use App\Repository\UserRepository;
use Doctrine\DBAL\Connection;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use App\Service\TokenService;
use App\Repository\TokenRepository;
use Symfony\Contracts\HttpClient\HttpClientInterface;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\TestEnova\TestEnovaContractor;
use App\Entity\TestEnova\TestEnovaContactPerson;
use App\Entity\TestEnova\TestEnovaLocation;
use App\Repository\TestEnovaContractorRepository;
use App\Repository\TestEnovaContactPersonRepository;
use App\Repository\TestEnovaLocationRepository;

class TestEnovaContractorController extends AbstractController
{
    private $tokenService;
    private $tokenRepository;
    private $client;
    private $entityManager;
    private $contractorRepository;
    private $connection;
    private $userRepository;

    public function __construct(
        TokenService $tokenService,
        TokenRepository $tokenRepository,
        HttpClientInterface $client,
        EntityManagerInterface $entityManager,
        TestEnovaContractorRepository $contractorRepository,
        Connection $connection,
        UserRepository $userRepository
    ) {
        $this->tokenService = $tokenService;
        $this->tokenRepository = $tokenRepository;
        $this->client = $client;
        $this->entityManager = $entityManager;
        $this->contractorRepository = $contractorRepository;
        $this->connection = $connection;
        $this->userRepository = $userRepository;
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

        // Check if 'elementy' key exists in the response
        if (!isset($data['elementy'])) {
            return new JsonResponse(['error' => 'No contractors found in the response.'], 404);
        }

        // Fetch all existing contractors
        $existingContractors = $this->contractorRepository->findAll();
        $existingContractorsMap = []; // Map of idEnova => TestEnovaContractor

        foreach ($existingContractors as $contractor) {
            $existingContractorsMap[$contractor->getIdEnova()] = $contractor;
        }

        $this->connection->executeStatement('SET FOREIGN_KEY_CHECKS = 0');

        // Truncate contact persons and locations tables before processing new data
        $this->truncateTable('test_enova_contractor');
        $this->truncateTable('test_enova_contact_person');
        $this->truncateTable('test_enova_location');
        $this->truncateTable('test_enova_address');

        // Re-enable foreign key checks
        $this->connection->executeStatement('SET FOREIGN_KEY_CHECKS = 1');

        // Clear the EntityManager to remove references to old entities
        $this->entityManager->clear();

        // Process API data
        foreach ($data['elementy'] as $contractorData) {
            $idEnova = $contractorData['idEnova'];

            // Check if the contractor already exists
            if (isset($existingContractorsMap[$idEnova])) {
                // Update existing contractor
                $contractor = $existingContractorsMap[$idEnova];
                unset($existingContractorsMap[$idEnova]); // Remove from the map to track remaining records
            } else {
                // Create new contractor
                $contractor = new TestEnovaContractor();
            }

            // Update contractor fields
            $contractor->setIdEnova($contractorData['idEnova']);
            $contractor->setKod($contractorData['kod']);
            $contractor->setNazwa($contractorData['nazwa']);
            $contractor->setNip($contractorData['NIP']);
            $contractor->setRegon($contractorData['Regon']);
            $contractor->setEmail($contractorData['Email']);
            $contractor->setTelefon($contractorData['Telefon']);
            $contractor->setCenaKontrahentaNazwa($contractorData['cenaKontrahentaNazwa']);

            // Handle simplified address data
            $adres = $contractorData['adres'];
            $contractor->setAdresUlica($adres['ulica']);
            $contractor->setAdresMiejscowosc($adres['miejscowosc']);
            $contractor->setAdresKodPocztowy($adres['kodPocztowy']);

            // Save addresses
            $adres = $this->saveAddress($contractorData['adres']);
            $contractor->setAdres($adres);

            if (isset($contractorData['adresKorespondencyjny'])) {
                $adresKorespondencyjny = $this->saveAddress($contractorData['adresKorespondencyjny']);
                $contractor->setAdresKorespondencyjny($adresKorespondencyjny);
            }

            // Save contact persons
            $this->saveContactPersons($contractor, $contractorData['listaOsobyKontrahenta']);

            // Save locations
            $this->saveLocations($contractor, $contractorData['listaLokalizacje']);

            // Persist the contractor
            $this->entityManager->persist($contractor);
        }

        // Remove contractors that are no longer in the API response
        foreach ($existingContractorsMap as $contractor) {
            $this->entityManager->remove($contractor);
        }

        // Flush changes to the database
        $this->entityManager->flush();

        return new JsonResponse(['message' => 'Contractors fetched and saved successfully.'], 200);
    }

    private function truncateTable(string $tableName): void
    {
        // Disable foreign key checks
        $this->connection->executeStatement('SET FOREIGN_KEY_CHECKS = 0');

        // Truncate the table
        $this->connection->executeStatement("TRUNCATE TABLE $tableName");

        // Re-enable foreign key checks
        $this->connection->executeStatement('SET FOREIGN_KEY_CHECKS = 1');
    }

    private function saveAddress(array $addressData): TestEnovaAddress
    {
        $address = new TestEnovaAddress();
        $address->setWojewodztwo($addressData['wojewodztwo']);
        $address->setGmina($addressData['gmina']);
        $address->setNrDomu($addressData['nrDomu']);
        $address->setNrLokalu($addressData['nrLokalu']);
        $address->setPoczta($addressData['poczta']);
        $address->setPowiat($addressData['powiat']);
        $address->setUlica($addressData['ulica']);
        $address->setMiejscowosc($addressData['miejscowosc']);
        $address->setKodPocztowy($addressData['kodPocztowy']);
        $address->setKraj($addressData['kraj']);

        $this->entityManager->persist($address);
        return $address;
    }

    private function saveContactPersons(TestEnovaContractor $contractor, array $contactPersonsData): void
    {
        foreach ($contactPersonsData as $contactPersonData) {
            // Check if the contact person with the given ID already exists
            $existingContactPerson = $this->entityManager->find(TestEnovaContactPerson::class, $contactPersonData['id']);

            // If it exists, use the existing one, otherwise create a new one
            if ($existingContactPerson) {
                $contactPerson = $existingContactPerson;
            } else {
                $contactPerson = new TestEnovaContactPerson();
            }

            // Update contact person fields
            $contactPerson->setImie($contactPersonData['imie']);
            $contactPerson->setUuid($contactPersonData['id']);
            $contactPerson->setId($contactPersonData['id']);
            $contactPerson->setNazwisko($contactPersonData['nazwisko']);
            $contactPerson->setStanowisko($contactPersonData['stanowisko']);
            $contactPerson->setEmail($contactPersonData['email'] ?? '');
            $contactPerson->setTelKomorkowy($contactPersonData['telKomorkowy'] ?? '');
            $contactPerson->setDostepDoWWW($contactPersonData['dostepDoWWW'] ?? false);
            $contactPerson->setPrawoDoZamowien($contactPersonData['prawoDoZamowien'] ?? false);
            // Set other fields...

            // Save contact person address
            if (isset($contactPersonData['adres'])) {
                $contactPersonAdres = $this->saveAddress($contactPersonData['adres']);
                $contactPerson->setAdres($contactPersonAdres);
            }

            // Ensure the contractor is persisted
            $this->entityManager->persist($contractor);

            // Link the contact person to the contractor
            $contactPerson->setContractor($contractor);
            $this->entityManager->persist($contactPerson);

            // Update the email in the UserEnova entity
            if (isset($contactPersonData['email'])) {
                $userEnova = $this->userRepository->find($contactPersonData['id']);
                if ($userEnova) {
                    $userEnova->setEmail($contactPersonData['email']);
                    $this->userRepository->save($userEnova, true);
                }
            }

            // Optionally, you can clear the EntityManager here to prevent memory issues
            $this->entityManager->clear(); // Clear the identity map
        }

        // Finally, flush once after processing all contact persons
        $this->entityManager->flush();
    }


    private function saveLocations(TestEnovaContractor $contractor, array $locationsData): void
    {
        foreach ($locationsData as $locationData) {
            $location = new TestEnovaLocation();

            // Update location fields
            $location->setUuid($locationData['id']);
            $location->setKod($locationData['kod']);
            $location->setNazwa($locationData['nazwa']);
            // Set other fields...

            // Save location address
            if (isset($locationData['adres'])) {
                $locationAdres = $this->saveAddress($locationData['adres']);
                $location->setAdres($locationAdres);
            }

            // Link the location to the contractor
            $location->setContractor($contractor);
            $this->entityManager->persist($location);
        }
    }
}