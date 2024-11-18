<?php

// src/Entity/Token.php
namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use App\Controller\TokenController;
use Doctrine\ORM\Mapping as ORM;

#[ApiResource(
    operations: [
        new Get(
            uriTemplate: '/fetch-enova-token',
            controller: TokenController::class,
            paginationEnabled: false, // No output entity needed
            output: false,   // No need to read data from the entity
            read: false
        ),
//        new GetCollection(
//            uriTemplate: '/fetch-enova-token',
//            controller: TokenController::class,
//            paginationEnabled: false, // No output collection needed
//            output: false,   // No need to read data from the entity
//            read: false
//        ),
    ]
)]
#[ORM\Entity]
class Token
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private ?int $id = null;

    #[ORM\Column(type: 'string', length: 1000)]
    private ?string $token = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getToken(): ?string
    {
        return $this->token;
    }

    public function setToken(string $token): self
    {
        $this->token = $token;
        return $this;
    }
}

