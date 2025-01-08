<?php
// src/Repository/FetchProductRepository.php

namespace App\Repository;

use App\Entity\Enova\EnovaContractor;
use App\Entity\Enova\EnovaProduct;
use App\Entity\Enova\FetchProduct;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;

class EnovaContractorRepository extends ServiceEntityRepository
{
    private EntityManagerInterface $entityManager;

    public function __construct(ManagerRegistry $registry, EntityManagerInterface $entityManager)
    {
        parent::__construct($registry, EnovaContractor::class);
        $this->entityManager = $entityManager; // Explicitly inject the EntityManager
    }

    public function save(EnovaContractor $fetchContractor): void
    {
        $this->entityManager->persist($fetchContractor);
        $this->entityManager->flush();
    }
}

