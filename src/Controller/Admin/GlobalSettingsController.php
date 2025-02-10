<?php
namespace App\Controller\Admin;

use App\Entity\Enova\GlobalSettings;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class GlobalSettingsController extends AbstractController
{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    #[Route('/api/global_settings', name: 'get_sorting_settings', methods: ['GET'])]
    public function getSortingSettings(): JsonResponse
    {
        // Fetch global settings, assuming there is only one row
        $globalSettings = $this->entityManager->getRepository(GlobalSettings::class)->find(1);

        if (!$globalSettings) {
            return $this->json([
                'sortField' => 'id',
                'sortOrder' => 'asc',
            ]);
        }

        return $this->json([
            'sortField' => $globalSettings->getSortField(),
            'sortOrder' => $globalSettings->getSortOrder(),
        ]);
    }

    #[Route('/api/global_settings/{id}', name: 'update_sorting_settings', methods: ['PUT'])]
    public function updateSortingSettings(int $id): JsonResponse
    {
        // Fetch the global settings object
        $globalSettings = $this->entityManager->getRepository(GlobalSettings::class)->find($id);

        if (!$globalSettings) {
            return $this->json(['error' => 'Global settings not found'], 404);
        }

        // Get the new settings from the PUT request body
        $data = json_decode(file_get_contents('php://input'), true);

        if (isset($data['sortField'])) {
            $globalSettings->setSortField($data['sortField']);
        }

        if (isset($data['sortOrder'])) {
            $globalSettings->setSortOrder($data['sortOrder']);
        }

        // Persist the changes
        $this->entityManager->persist($globalSettings);
        $this->entityManager->flush();

        return $this->json([
            'sortField' => $globalSettings->getSortField(),
            'sortOrder' => $globalSettings->getSortOrder(),
        ]);
    }
}

