<?php
// src/Repository/FetchProductRepository.php

namespace App\Repository;

use App\Entity\Enova\FetchContractor;
use App\Entity\Enova\FetchProduct;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;

class FetchContractorRepository extends ServiceEntityRepository
{
    private EntityManagerInterface $entityManager;

    public function __construct(ManagerRegistry $registry, EntityManagerInterface $entityManager)
    {
        parent::__construct($registry, FetchContractor::class);
        $this->entityManager = $entityManager; // Explicitly inject the EntityManager
    }

    public function save(FetchContractor $fetchContractor): void
    {
        $this->entityManager->persist($fetchContractor);
        $this->entityManager->flush();
    }
}

