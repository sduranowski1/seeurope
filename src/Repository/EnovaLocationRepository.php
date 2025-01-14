<?php
// src/Repository/FetchProductRepository.php

namespace App\Repository;

use App\Entity\Enova\EnovaContractor;
use App\Entity\Enova\EnovaLocation;
use App\Entity\Enova\EnovaProduct;
use App\Entity\Enova\FetchProduct;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;

class EnovaLocationRepository extends ServiceEntityRepository
{
    private EntityManagerInterface $entityManager;

    public function __construct(ManagerRegistry $registry, EntityManagerInterface $entityManager)
    {
        parent::__construct($registry, EnovaLocation::class);
        $this->entityManager = $entityManager; // Explicitly inject the EntityManager
    }

    public function save(EnovaLocation $fetchLocation): void
    {
        $this->entityManager->persist($fetchLocation);
        $this->entityManager->flush();
    }
}

