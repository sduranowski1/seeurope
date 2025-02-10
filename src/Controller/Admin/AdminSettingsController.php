<?php
// src/Controller/AdminSettingsController.php
namespace App\Controller\Admin;

use App\Entity\GlobalSettings;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class AdminSettingsController
{
    #[Route('/api/admin/sorting', name: 'update_sorting', methods: ['POST'])]
    public function updateSorting(Request $request, EntityManagerInterface $em, Security $security): JsonResponse
    {
        $user = $security->getUser();
        if (!$user || !in_array('ROLE_ADMIN', $user->getRoles())) {
            return new JsonResponse(['error' => 'Unauthorized'], 403);
        }

        $data = json_decode($request->getContent(), true);
        if (!isset($data['field'], $data['order'])) {
            return new JsonResponse(['error' => 'Invalid data'], 400);
        }

        $globalSettings = $em->getRepository(GlobalSettings::class)->find(1) ?? new GlobalSettings();
        $globalSettings->setSortField($data['field']);
        $globalSettings->setSortOrder($data['order']);

        $em->persist($globalSettings);
        $em->flush();

        return new JsonResponse(['success' => true]);
    }

    #[Route('/api/sorting', name: 'get_sorting', methods: ['GET'])]
    public function getSorting(EntityManagerInterface $em): JsonResponse
    {
        $globalSettings = $em->getRepository(GlobalSettings::class)->find(1);
        return new JsonResponse([
            'field' => $globalSettings ? $globalSettings->getSortField() : 'id',
            'order' => $globalSettings ? $globalSettings->getSortOrder() : 'asc',
        ]);
    }
}
