<?php
// src/Repository/FetchProductRepository.php

namespace App\Repository;

use App\Entity\Enova\EnovaProduct;
use App\Entity\Enova\FetchProduct;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;

class EnovaProductRepository extends ServiceEntityRepository
{
    private EntityManagerInterface $entityManager;

    public function __construct(ManagerRegistry $registry, EntityManagerInterface $entityManager)
    {
        parent::__construct($registry, EnovaProduct::class);
        $this->entityManager = $entityManager; // Explicitly inject the EntityManager
    }

    public function save(EnovaProduct $fetchProduct): void
    {
        $this->entityManager->persist($fetchProduct);
        $this->entityManager->flush();
    }

    public function findAllProductIds(): array
    {
        return $this->createQueryBuilder('p')
            ->select('p.id')
            ->getQuery()
            ->getSingleColumnResult();
    }

    public function remove(EnovaProduct $product, bool $flush = false): void
    {
        $this->entityManager->remove($product);
        if ($flush) {
            $this->entityManager->flush();
        }
    }

}

