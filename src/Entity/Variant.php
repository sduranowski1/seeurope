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
use App\Repository\VariantRepository;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\HasLifecycleCallbacks;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: VariantRepository::class)]
#[HasLifecycleCallbacks]
#[ApiResource(
    operations: [
        new GetCollection(),
        new GetCollection(
            uriTemplate: '/variants/no_pagination',
            paginationEnabled: false,
        ),
        new Post(),
        new Get(),
        new Put(),
        new Patch(),
        new Delete()
    ],
    normalizationContext: ['groups' => ['variant:read']],
    denormalizationContext: ['groups' => ['variant:create']]

)]
#[ApiFilter(SearchFilter::class, properties: ['variantname' => 'partial', 'brand.name' => 'partial'])]
#[ApiFilter(OrderFilter::class, properties: ['id', 'variantname', 'polishName', 'germanName'])]
class Variant
{
    use Timestampable;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['variant:read', "productInfo:read", 'productInfo:create', 'featuresList:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 50)]
    #[Groups(['variant:read', 'variant:create', 'variant:update', "productInfo:read", 'productInfo:create', 'enovaProduct:read', 'featuresList:read', 'featuresList:create', 'featuresList:update'])]
    private ?string $variantname = null;

    #[ORM\Column(length: 50)]
    #[Groups(['variant:read', 'variant:create', 'variant:update', "productInfo:read", 'productInfo:create', 'enovaProduct:read'])]
    private ?string $polishName = null;

    #[ORM\Column(length: 50)]
    #[Groups(['variant:read', 'variant:create', 'variant:update', "productInfo:read", 'productInfo:create', 'enovaProduct:read'])]
    private ?string $germanName = null;

    #[ORM\Column(type: "text", nullable: true)]
    #[Groups(['variant:read', 'variant:create', 'variant:update', "productInfo:read", 'productInfo:create', 'enovaProduct:read'])]
    private ?string $description = null;

    #[ORM\Column(type: "text", nullable: true)]
    #[Groups(['variant:read', 'variant:create', 'variant:update', "productInfo:read", 'productInfo:create', 'enovaProduct:read'])]
    private ?string $polishDescription = null;

    #[ORM\Column(type: "text", nullable: true)]
    #[Groups(['variant:read', 'variant:create', 'variant:update', "productInfo:read", 'productInfo:create', 'enovaProduct:read'])]
    private ?string $germanDescription = null;

//    #[ORM\Column(nullable: true)]
//    #[Groups(['variant:read', 'variant:create'])]
//    private ?int $bid = null;

    #[ORM\ManyToOne(targetEntity: Brand::class)]
    #[ORM\JoinColumn(name: 'bid', referencedColumnName: 'id', nullable: true)]
    #[Groups(['variant:read', 'variant:create'])]
    public ?Brand $brand = null;


    #[ORM\ManyToOne(targetEntity: VariantsMediaObject::class)]
    #[ORM\JoinColumn(nullable: true)]
    #[ApiProperty(types: ['https://schema.org/image'])]
    #[Groups(['variant:read', 'variant:create', 'variant:update'])]
    public ?VariantsMediaObject $image = null;

    #[ORM\Column(type: "string")]
    #[Groups(['variant:read', 'variant:create', 'variant:update'])]
    private ?string $imagePath = null;

    #[ORM\Column(type: "string")]
    #[Groups(['variant:read', 'variant:create', 'variant:update'])]
    private string $domainImagePath;

    public function getImagePath(): ?string
    {
        return $this->imagePath;
    }

    public function setImagePath(?string $imagePath): void
    {
        $this->imagePath = $imagePath;
    }

    public function getDomainImagePath(): string
    {
        return $this->domainImagePath;
    }

    public function setDomainImagePath(string $domainImagePath): void
    {
        $this->domainImagePath = $domainImagePath;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getVariantname(): ?string
    {
        return $this->variantname;
    }

    public function setVariantname(string $variantname): static
    {
        $this->variantname = $variantname;

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

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): void
    {
        $this->description = $description;
    }

    public function getPolishDescription(): ?string
    {
        return $this->polishDescription;
    }

    public function setPolishDescription(?string $polishDescription): void
    {
        $this->polishDescription = $polishDescription;
    }

    public function getGermanDescription(): ?string
    {
        return $this->germanDescription;
    }

    public function setGermanDescription(?string $germanDescription): void
    {
        $this->germanDescription = $germanDescription;
    }

    

//    public function getBid(): ?int
//    {
//        return $this->bid;
//    }
//
//    public function setBid(?int $bid): static
//    {
//        $this->bid = $bid;
//
//        return $this;
//    }

    public function getBrand(): ?Brand
    {
        return $this->brand;
    }

    public function setBrand(?Brand $brand): self
    {
        $this->brand = $brand;
        return $this;
    }
}
