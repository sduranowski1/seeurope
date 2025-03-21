<?php

namespace App\Repository;

use App\Entity\TestEnova\TestEnovaAddress;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<TestEnovaAddress>
 */
class TestEnovaAddressRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, TestEnovaAddress::class);
    }

    // Add custom query methods here if needed
}