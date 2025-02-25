<?php

namespace App\Entity\Enova\FeaturesList;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Entity\Brand;
use App\Entity\Category;
use App\Entity\ItemType;
use App\Entity\Subcategory;
use App\Entity\Traits\Timestampable;
use App\Entity\Variant;
use App\Repository\FeaturesListRepository;
use App\Repository\SubcategoryRepository;
use Doctrine\ORM\Mapping\HasLifecycleCallbacks;
use Symfony\Component\Serializer\Annotation\Groups;
use Doctrine\ORM\Mapping as ORM;


#[ORM\Entity(repositoryClass: FeaturesListRepository::class)]
#[HasLifecycleCallbacks]
#[ApiResource(
    operations: [
        new GetCollection(),
        new GetCollection(
            uriTemplate: '/features_lists/no_pagination',
            paginationEnabled: false,
        ),
//        new Post(),
        new Get(),
        new Put(),
//        new Patch(),
//        new Delete()
    ],
    normalizationContext: ['groups' => ['featuresList:read']],
    denormalizationContext: ['groups' => ['featuresList:create']]

)]
class FeaturesList
{
    use Timestampable;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(['featuresList:read', 'brand:read', "productInfo:read"])]
    private ?int $id = null;

    #[ORM\Column(length: 50)]
    #[Groups(['featuresList:read', 'brand:read', "productInfo:read", 'enovaProduct:read'])]
    private ?string $name = null;

    #[ORM\ManyToOne(targetEntity: Brand::class)]
    #[ORM\JoinColumn(referencedColumnName: 'id', nullable: true)]
    #[Groups(['featuresList:read', 'brand:read', "productInfo:read", 'enovaProduct:read'])]
    public ?Brand $brand = null;

    #[ORM\ManyToOne(targetEntity: Variant::class)]
    #[ORM\JoinColumn(referencedColumnName: 'id', nullable: true)]
    #[Groups(['featuresList:read', 'variant:read', "productInfo:read", 'enovaProduct:read'])]
    public ?Variant $variant = null;

    #[ORM\ManyToOne(targetEntity: Category::class)]
    #[ORM\JoinColumn(referencedColumnName: 'id', nullable: true)]
    #[Groups(['featuresList:read', 'category:read', "productInfo:read", 'enovaProduct:read'])]
    public ?Category $category = null;

    #[ORM\ManyToOne(targetEntity: Subcategory::class)]
    #[ORM\JoinColumn(referencedColumnName: 'id', nullable: true)]
    #[Groups(['featuresList:read', 'subcategory:read', "productInfo:read", 'enovaProduct:read'])]
    public ?Subcategory $subcategory = null;

    #[ORM\ManyToOne(targetEntity: ItemType::class)]
    #[ORM\JoinColumn(referencedColumnName: 'id', nullable: true)]
    #[Groups(['featuresList:read', 'itemType:read', "productInfo:read", 'enovaProduct:read'])]
    public ?ItemType $itemType = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(?int $id): void
    {
        $this->id = $id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(?string $name): void
    {
        $this->name = $name;
    }

    public function getBrand(): ?Brand
    {
        return $this->brand;
    }

    public function setBrand(?Brand $brand): void
    {
        $this->brand = $brand;
    }

    public function getVariant(): ?Variant
    {
        return $this->variant;
    }

    public function setVariant(?Variant $variant): void
    {
        $this->variant = $variant;
    }

    public function getCategory(): ?Category
    {
        return $this->category;
    }

    public function setCategory(?Category $category): void
    {
        $this->category = $category;
    }

    public function getSubcategory(): ?Subcategory
    {
        return $this->subcategory;
    }

    public function setSubcategory(?Subcategory $subcategory): void
    {
        $this->subcategory = $subcategory;
    }

    public function getItemType(): ?ItemType
    {
        return $this->itemType;
    }

    public function setItemType(?ItemType $itemType): void
    {
        $this->itemType = $itemType;
    }


}