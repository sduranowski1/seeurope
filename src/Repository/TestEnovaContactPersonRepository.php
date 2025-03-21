<?php

namespace App\Repository;

use App\Entity\TestEnova\TestEnovaContactPerson;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<TestEnovaContactPerson>
 */
class TestEnovaContactPersonRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, TestEnovaContactPerson::class);
    }

    // Add custom query methods here if needed
}