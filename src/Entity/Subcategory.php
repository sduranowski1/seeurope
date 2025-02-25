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
use App\Repository\SubcategoryRepository;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\HasLifecycleCallbacks;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: SubcategoryRepository::class)]
#[HasLifecycleCallbacks]
#[ApiResource(
    operations: [
        new GetCollection(),
        new GetCollection(
            uriTemplate: '/subcategories/no_pagination',
            paginationEnabled: false,
        ),
        new Post(),
        new Get(),
        new Put(),
        new Patch(),
        new Delete()
    ],
    normalizationContext: ['groups' => ['subcategory:read']],
    denormalizationContext: ['groups' => ['subcategory:create']]

)]
#[ApiFilter(SearchFilter::class, properties: ['subCatName' => 'partial', 'category.name' => 'partial'])]
#[ApiFilter(OrderFilter::class, properties: ['id', 'subCatName', 'polishName', 'germanName'])]
class Subcategory
{
    use Timestampable;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(['subcategory:read', 'itemType:read', "productInfo:read", 'productInfo:create', 'featuresList:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 50)]
    #[Groups(['subcategory:read', 'subcategory:create', 'subcategory:update', 'itemType:read', 'itemType:create', 'itemType:update', "productInfo:read", 'productInfo:create', 'enovaProduct:read', 'featuresList:read', 'featuresList:create', 'featuresList:update'])]
    private ?string $subCatName = null;

    #[ORM\Column(length: 50)]
    #[Groups(['subcategory:read', 'subcategory:create', 'subcategory:update', 'itemType:read', 'itemType:create', 'itemType:update', "productInfo:read", 'enovaProduct:read'])]
    private ?string $polishSubCatName = null;

    #[ORM\Column(length: 50)]
    #[Groups(['subcategory:read', 'subcategory:create', 'subcategory:update', 'itemType:read', 'itemType:create', 'itemType:update', "productInfo:read", 'enovaProduct:read'])]
    private ?string $germanSubCatName = null;

    #[ORM\Column(type: "text", nullable: true)]
    #[Groups(['subcategory:read', 'subcategory:create', 'subcategory:update', 'itemType:read', 'itemType:create', 'itemType:update', "productInfo:read", 'enovaProduct:read'])]
    private ?string $description = null;

    #[ORM\Column(type: "text", nullable: true)]
    #[Groups(['subcategory:read', 'subcategory:create', 'subcategory:update', 'itemType:read', 'itemType:create', 'itemType:update', "productInfo:read", 'enovaProduct:read'])]
    private ?string $polishDescription = null;

    #[ORM\Column(type: "text", nullable: true)]
    #[Groups(['subcategory:read', 'subcategory:create', 'subcategory:update', 'itemType:read', 'itemType:create', 'itemType:update', "productInfo:read", 'enovaProduct:read'])]
    private ?string $germanDescription = null;

//    #[ORM\Column(nullable: true)]
//    #[Groups(['subcategory:read', 'subcategory:create'])]
//    private ?int $cid = null;

    #[ORM\Column(type: 'boolean')]
    #[Groups(['subcategory:read', 'subcategory:create', 'subcategory:update'])]
    private bool $capacity;

    #[ORM\Column(type: 'boolean')]
    #[Groups(['subcategory:read', 'subcategory:create', 'subcategory:update'])]
    private bool $depth;

    #[ORM\Column(type: 'boolean')]
    #[Groups(['subcategory:read', 'subcategory:create', 'subcategory:update'])]
    private bool $dimension;

    #[ORM\Column(type: 'boolean')]
    #[Groups(['subcategory:read', 'subcategory:create', 'subcategory:update'])]
    private bool $equipmentSide;

    #[ORM\Column(type: 'boolean')]
    #[Groups(['subcategory:read', 'subcategory:create', 'subcategory:update'])]
    private bool $existingFork;

    #[ORM\Column(type: 'boolean')]
    #[Groups(['subcategory:read', 'subcategory:create', 'subcategory:update'])]
    private bool $height;

    #[ORM\Column(type: 'boolean')]
    #[Groups(['subcategory:read', 'subcategory:create', 'subcategory:update'])]
    private bool $information;

    #[ORM\Column(type: 'boolean')]
    #[Groups(['subcategory:read', 'subcategory:create', 'subcategory:update'])]
    private bool $length;

    #[ORM\Column(type: 'boolean')]
    #[Groups(['subcategory:read', 'subcategory:create', 'subcategory:update'])]
    private bool $machineSide;

    #[ORM\Column(type: 'boolean')]
    #[Groups(['subcategory:read', 'subcategory:create', 'subcategory:update'])]
    private bool $masaDo;

    #[ORM\Column(type: 'boolean')]
    #[Groups(['subcategory:read', 'subcategory:create', 'subcategory:update'])]
    private bool $masaOd;

    #[ORM\Column(type: 'boolean')]
    #[Groups(['subcategory:read', 'subcategory:create', 'subcategory:update'])]
    private bool $model;

    #[ORM\Column(type: 'boolean')]
    #[Groups(['subcategory:read', 'subcategory:create', 'subcategory:update'])]
    private bool $moreInformation;

    #[ORM\Column(type: 'boolean')]
    #[Groups(['subcategory:read', 'subcategory:create', 'subcategory:update'])]
    private bool $opisWC;

    #[ORM\Column(type: 'boolean')]
    #[Groups(['subcategory:read', 'subcategory:create', 'subcategory:update'])]
    private bool $product;

    #[ORM\Column(type: 'boolean')]
    #[Groups(['subcategory:read', 'subcategory:create', 'subcategory:update'])]
    private bool $recommendedMachineWeight;

    #[ORM\Column(type: 'boolean')]
    #[Groups(['subcategory:read', 'subcategory:create', 'subcategory:update'])]
    private bool $type;

    #[ORM\Column(type: 'boolean')]
    #[Groups(['subcategory:read', 'subcategory:create', 'subcategory:update'])]
    private bool $variant;

    #[ORM\Column(type: 'boolean')]
    #[Groups(['subcategory:read', 'subcategory:create', 'subcategory:update'])]
    private bool $volume;

    #[ORM\Column(type: 'boolean')]
    #[Groups(['subcategory:read', 'subcategory:create', 'subcategory:update'])]
    private bool $weight;

    #[ORM\Column(type: 'boolean')]
    #[Groups(['subcategory:read', 'subcategory:create', 'subcategory:update'])]
    private bool $width;


    #[ORM\ManyToOne(targetEntity: Category::class)]
    #[ORM\JoinColumn(name: 'cid', referencedColumnName: 'id', nullable: true)]
    #[Groups(['subcategory:read', 'subcategory:create', 'itemType:read'])]
    public ?Category $category = null;

    #[ORM\ManyToOne(targetEntity: SubcategoriesMediaObject::class)]
    #[ORM\JoinColumn(nullable: true)]
    #[ApiProperty(types: ['https://schema.org/image'])]
    #[Groups(['subcategory:read', 'subcategory:create', 'subcategory:update'])]
    public ?SubcategoriesMediaObject $image = null;

    #[ORM\Column(type: "string")]
    #[Groups(['subcategory:read', 'subcategory:create', 'subcategory:update'])]
    private ?string $imagePath = null;

    #[ORM\Column(type: "string")]
    #[Groups(['subcategory:read', 'subcategory:create', 'subcategory:update'])]
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

    public function getSubCatName(): ?string
    {
        return $this->subCatName;
    }

    public function setSubCatName(string $subCatName): static
    {
        $this->subCatName = $subCatName;

        return $this;
    }

    public function getPolishSubCatName(): ?string
    {
        return $this->polishSubCatName;
    }

    public function setPolishSubCatName(?string $polishSubCatName): void
    {
        $this->polishSubCatName = $polishSubCatName;
    }

    public function getGermanSubCatName(): ?string
    {
        return $this->germanSubCatName;
    }

    public function setGermanSubCatName(?string $germanSubCatName): void
    {
        $this->germanSubCatName = $germanSubCatName;
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



//    public function getCid(): ?int
//    {
//        return $this->cid;
//    }
//
//    public function setCid(?int $cid): static
//    {
//        $this->cid = $cid;
//
//        return $this;
//    }

    public function getCategory(): ?Category
    {
        return $this->category;
    }

    public function setCategory(?Category $category): self
    {
        $this->category = $category;
        return $this;
    }

    public function isCapacity(): bool
    {
        return $this->capacity;
    }

    public function setCapacity(bool $capacity): void
    {
        $this->capacity = $capacity;
    }

    public function isDepth(): bool
    {
        return $this->depth;
    }

    public function setDepth(bool $depth): void
    {
        $this->depth = $depth;
    }

    public function isEquipmentSide(): bool
    {
        return $this->equipmentSide;
    }

    public function setEquipmentSide(bool $equipmentSide): void
    {
        $this->equipmentSide = $equipmentSide;
    }

    public function isDimension(): bool
    {
        return $this->dimension;
    }

    public function setDimension(bool $dimension): void
    {
        $this->dimension = $dimension;
    }

    public function isExistingFork(): bool
    {
        return $this->existingFork;
    }

    public function setExistingFork(bool $existingFork): void
    {
        $this->existingFork = $existingFork;
    }

    public function isHeight(): bool
    {
        return $this->height;
    }

    public function setHeight(bool $height): void
    {
        $this->height = $height;
    }

    public function isInformation(): bool
    {
        return $this->information;
    }

    public function setInformation(bool $information): void
    {
        $this->information = $information;
    }

    public function isLength(): bool
    {
        return $this->length;
    }

    public function setLength(bool $length): void
    {
        $this->length = $length;
    }

    public function isMachineSide(): bool
    {
        return $this->machineSide;
    }

    public function setMachineSide(bool $machineSide): void
    {
        $this->machineSide = $machineSide;
    }

    public function isMasaDo(): bool
    {
        return $this->masaDo;
    }

    public function setMasaDo(bool $masaDo): void
    {
        $this->masaDo = $masaDo;
    }

    public function isMasaOd(): bool
    {
        return $this->masaOd;
    }

    public function setMasaOd(bool $masaOd): void
    {
        $this->masaOd = $masaOd;
    }

    public function isModel(): bool
    {
        return $this->model;
    }

    public function setModel(bool $model): void
    {
        $this->model = $model;
    }

    public function isMoreInformation(): bool
    {
        return $this->moreInformation;
    }

    public function setMoreInformation(bool $moreInformation): void
    {
        $this->moreInformation = $moreInformation;
    }

    public function isOpisWC(): bool
    {
        return $this->opisWC;
    }

    public function setOpisWC(bool $opisWC): void
    {
        $this->opisWC = $opisWC;
    }

    public function isProduct(): bool
    {
        return $this->product;
    }

    public function setProduct(bool $product): void
    {
        $this->product = $product;
    }

    public function isRecommendedMachineWeight(): bool
    {
        return $this->recommendedMachineWeight;
    }

    public function setRecommendedMachineWeight(bool $recommendedMachineWeight): void
    {
        $this->recommendedMachineWeight = $recommendedMachineWeight;
    }

    public function isType(): bool
    {
        return $this->type;
    }

    public function setType(bool $type): void
    {
        $this->type = $type;
    }

    public function isVariant(): bool
    {
        return $this->variant;
    }

    public function setVariant(bool $variant): void
    {
        $this->variant = $variant;
    }

    public function isVolume(): bool
    {
        return $this->volume;
    }

    public function setVolume(bool $volume): void
    {
        $this->volume = $volume;
    }

    public function isWeight(): bool
    {
        return $this->weight;
    }

    public function setWeight(bool $weight): void
    {
        $this->weight = $weight;
    }

    public function isWidth(): bool
    {
        return $this->width;
    }

    public function setWidth(bool $width): void
    {
        $this->width = $width;
    }


}
