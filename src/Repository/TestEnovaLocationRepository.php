<?php

namespace App\Repository;

use App\Entity\TestEnova\TestEnovaLocation;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<TestEnovaLocation>
 */
class TestEnovaLocationRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, TestEnovaLocation::class);
    }

    // Add custom query methods here if needed
}