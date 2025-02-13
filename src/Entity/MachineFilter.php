<?php

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Entity\Traits\Timestampable;
use App\Repository\CouplingFilterRepository;
use App\Repository\MachineFilterRepository;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\HasLifecycleCallbacks;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: MachineFilterRepository::class)]
#[HasLifecycleCallbacks]
#[ApiResource(
    operations: [
        new GetCollection(),
        new GetCollection(
            uriTemplate: '/machine_filters/no_pagination',
            paginationEnabled: false,
        ),
        new Post(),
        new Get(),
        new Put(),
        new Patch(),
        new Delete()
    ],
    normalizationContext: ['groups' => ['machineFilter:read']],
    denormalizationContext: ['groups' => ['machineFilter:create']]
)]
#[ApiFilter(SearchFilter::class, properties: ['name' => 'partial'])]
#[ApiFilter(OrderFilter::class, properties: ['id', 'name', 'polishName', 'germanName'])]
class MachineFilter
{
    use Timestampable;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['machineFilter:read', "productInfo:read", 'productInfo:create'])]
    private ?int $id = null;

    #[ORM\Column(length: 50)]
    #[Groups(['machineFilter:read', 'machineFilter:create', 'machineFilter:update', "productInfo:read", 'productInfo:create', 'enovaProduct:read'])]
    private ?string $name = null;

    #[ORM\Column(length: 50)]
    #[Groups(['machineFilter:read', 'machineFilter:create', 'machineFilter:update', "productInfo:read", 'productInfo:create', 'enovaProduct:read'])]
    private ?string $polishName = null;

    #[ORM\Column(length: 50)]
    #[Groups(['machineFilter:read', 'machineFilter:create', 'machineFilter:update', "productInfo:read", 'productInfo:create', 'enovaProduct:read'])]
    private ?string $germanName = null;


//    #[ORM\ManyToOne(targetEntity: BrandsMediaObject::class)]
//    #[ORM\JoinColumn(nullable: true)]
//    #[ApiProperty(types: ['https://schema.org/image'])]
//    #[Groups(['couplingFilter:read', 'couplingFilter:create', 'couplingFilter:update'])]
//    public ?BrandsMediaObject $image = null;
//
//    #[ORM\Column(type: "string")]
//    #[Groups(['couplingFilter:read', 'couplingFilter:create', 'couplingFilter:update'])]
//    private ?string $imagePath = null;
//
//    #[ORM\Column(type: "string")]
//    #[Groups(['couplingFilter:read', 'couplingFilter:create', 'couplingFilter:update'])]
//    private string $domainImagePath;

//    public function getImagePath(): ?string
//    {
//        return $this->imagePath;
//    }
//
//    public function setImagePath(?string $imagePath): void
//    {
//        $this->imagePath = $imagePath;
//    }
//
//    public function getDomainImagePath(): string
//    {
//        return $this->domainImagePath;
//    }
//
//    public function setDomainImagePath(string $domainImagePath): void
//    {
//        $this->domainImagePath = $domainImagePath;
//    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getPolishName(): ?string
    {
        return $this->polishName;
    }

    public function setPolishName(?string $polishName): void
    {
        $this->polishName = $polishName;
    }

    public function getGermanName(): ?string
    {
        return $this->germanName;
    }

    public function setGermanName(?string $germanName): void
    {
        $this->germanName = $germanName;
    }


}
