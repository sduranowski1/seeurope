<?php

namespace App\Repository;

use App\Entity\TestEnova\TestEnovaContractor;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<TestEnovaContractor>
 */
class TestEnovaContractorRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, TestEnovaContractor::class);
    }

    // Add custom query methods here if needed
}