<?php
// src/Controller/TokenController.php

namespace App\Controller;

use App\Service\TokenService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;

class TokenController extends AbstractController
{
    private TokenService $tokenService;

    public function __construct(TokenService $tokenService)
    {
        $this->tokenService = $tokenService;
    }

    public function __invoke(): JsonResponse
    {
        try {
            // Call the service to fetch and store the token
            $token = $this->tokenService->fetchAndStoreToken();

            return new JsonResponse(['token' => $token]);

        } catch (\Exception $e) {
            return new JsonResponse(['error' => $e->getMessage()], 400);
        }
    }
}
