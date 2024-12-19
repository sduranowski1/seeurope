<?php
// src/Service/TokenService.php

namespace App\Service;

use App\Entity\Token;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Contracts\HttpClient\HttpClientInterface;

class TokenService
{
    private HttpClientInterface $client;
    private EntityManagerInterface $em;

    public function __construct(HttpClientInterface $client, EntityManagerInterface $em)
    {
        $this->client = $client;
        $this->em = $em;
    }

    public function fetchAndStoreToken(): string
    {
        $enovaToken = $_ENV['ENOVA_TOKEN'] ?? null;
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
            throw new \Exception('Failed to fetch token');
        }

        $data = $response->toArray();
        $token = $data['Token'] ?? null;

        if (!$token) {
            throw new \Exception('Token not found in response');
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

        return $token;
    }
}
