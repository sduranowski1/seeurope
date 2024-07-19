<?php

// src/Controller/SecurityController.php

namespace App\Controller;

use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;

class SecurityController
{
    /**
     * @Route("/auth", name="auth", methods={"POST"})
     */
    public function login(Request $request, Security $security)
    {
        $user = $security->getUser();
        return new JsonResponse(['user' => $user->getUsername()]);
    }

    #[Route('/logout', name: 'app_logout')]
    public function logout(): void
    {
        throw new \Exception('This should never be reached!');
    }
}
