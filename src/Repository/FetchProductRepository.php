<?php
// src/Repository/FetchProductRepository.php

namespace App\Repository;

use App\Entity\Enova\FetchProduct;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;

class FetchProductRepository extends ServiceEntityRepository
{
    private EntityManagerInterface $entityManager;

    public function __construct(ManagerRegistry $registry, EntityManagerInterface $entityManager)
    {
        parent::__construct($registry, FetchProduct::class);
        $this->entityManager = $entityManager; // Explicitly inject the EntityManager
    }

    public function save(FetchProduct $fetchProduct): void
    {
        $this->entityManager->persist($fetchProduct);
        $this->entityManager->flush();
    }
}

