<?php

// src/Controller/TokenController.php
namespace App\Controller;

use App\Entity\Token;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Contracts\HttpClient\HttpClientInterface;

class TokenController extends AbstractController
{
    private HttpClientInterface $client;
    private EntityManagerInterface $em;

    public function __construct(HttpClientInterface $client, EntityManagerInterface $em)
    {
        $this->client = $client;
        $this->em = $em;
    }

    public function __invoke(Request $request): JsonResponse
    {
        $enovaToken = $_ENV['ENOVA_TOKEN'] ?? null;
        // Check if the token is being retrieved
        if (!$enovaToken) {
            throw new \Exception('ENOVA_TOKEN is not set');
        }

        $url = 'http://extranet.seequipment.pl:9010/api/LoginApi';
        $headers = [
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . $enovaToken,
        ];

        $response = $this->client->request('POST', $url, [
            'headers' => $headers,
        ]);

        if ($response->getStatusCode() !== 200) {
            return new JsonResponse(['error' => 'Failed to fetch token'], $response->getStatusCode());
        }

        $data = $response->toArray();
        $token = $data['Token'] ?? null;

        if (!$token) {
            return new JsonResponse(['error' => 'Token not found in response'], 400);
        }


        // Look for an existing token record in the database
        $existingToken = $this->em->getRepository(Token::class)->findOneBy([]);

        if ($existingToken) {
            // Update the existing token
            $existingToken->setToken($token);
            $this->em->flush();
        } else {
            // If no token exists, create a new one
            $tokenEntity = new Token();
            $tokenEntity->setToken($token);
            $this->em->persist($tokenEntity);
            $this->em->flush();
        }


        return new JsonResponse(['token' => $token]);
    }
}
