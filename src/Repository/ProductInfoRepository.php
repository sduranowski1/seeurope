<?php
// src/Repository/ProductInfoRepository.php

namespace App\Repository;

use App\Entity\Enova\ProductInfo;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ManagerRegistry;

class ProductInfoRepository extends ServiceEntityRepository
{
    private EntityManagerInterface $entityManager;

    public function __construct(ManagerRegistry $registry, EntityManagerInterface $entityManager)
    {
        parent::__construct($registry, ProductInfo::class);
        $this->entityManager = $entityManager; // Explicitly inject the EntityManager
    }

    // Add any custom repository methods if needed
    public function save(ProductInfo $productInfo): void
    {
        $this->entityManager->persist($productInfo); // Mark for saving
        $this->entityManager->flush(); // Save to the database
    }
}
