<?php
namespace App\Controller;

use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;

class SubmissionAuthController
{
    /**
     * @Route("/submission_auth", name="submission_auth", methods={"POST"})
     */
    public function login(Request $request): JsonResponse
    {
        // This method should not be called directly. It is used as the check_path for JSON login.
        return new JsonResponse(['error' => 'This endpoint is handled by Symfony\'s security system.'], 400);
    }

    /**
     * @Route("/submission_logout", name="submission_app_logout", methods={"POST"})
     */
    public function logout(): void
    {
        // This method will be handled by Symfony's security system
        throw new \Exception('This should never be reached!');
    }
}
