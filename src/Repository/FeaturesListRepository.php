<?php

namespace App\Repository;

use App\Entity\Brand;
use App\Entity\GlobalSettings;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ManagerRegistry;
use App\Entity\Enova\FeaturesList\FeaturesList;

/**
 * @extends ServiceEntityRepository<FeaturesList>
 */
class FeaturesListRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, FeaturesList::class);
    }

    //    /**
    //     * @return Brand[] Returns an array of Brand objects
    //     */
    //    public function findByExampleField($value): array
    //    {
    //        return $this->createQueryBuilder('b')
    //            ->andWhere('b.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->orderBy('b.id', 'ASC')
    //            ->setMaxResults(10)
    //            ->getQuery()
    //            ->getResult()
    //        ;
    //    }

    //    public function findOneBySomeField($value): ?Brand
    //    {
    //        return $this->createQueryBuilder('b')
    //            ->andWhere('b.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }

//    public function findAllWithSorting(EntityManagerInterface $em)
//    {
//        $globalSettings = $em->getRepository(GlobalSettings::class)->find(1);
//        $sortField = $globalSettings ? $globalSettings->getSortField() : 'id';
//        $sortOrder = $globalSettings ? $globalSettings->getSortOrder() : 'asc';
//
//        return $this->createQueryBuilder('b')
//            ->orderBy("b.$sortField", $sortOrder)
//            ->getQuery()
//            ->getResult();
//    }
}
