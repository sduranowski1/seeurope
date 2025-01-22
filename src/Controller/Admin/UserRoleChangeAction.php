<?php

namespace App\Controller\Admin;

use App\Entity\Enova\UserEnova;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;

class UserRoleChangeAction extends AbstractController
{
    public function __invoke(UserEnova $data, EntityManagerInterface $entityManager): JsonResponse
    {
        // Get the current roles of the user
        $roles = $data->getRoles();

        // Toggle the roles
        if (in_array('ROLE_ADMIN', $roles)) {
            // If the user is an admin, demote them to ROLE_USER
            $data->setRoles(['ROLE_USER']);
        } else {
            // If the user is not an admin, promote them to ROLE_ADMIN
            $data->setRoles(['ROLE_ADMIN']);
        }

        // Save the changes to the database
        $entityManager->persist($data);
        $entityManager->flush();

        return new JsonResponse(['status' => 'success', 'roles' => $data->getRoles()]);
    }
}
