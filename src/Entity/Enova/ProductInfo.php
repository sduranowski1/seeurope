<?php
// src/Entity/ProductInfo.php
namespace App\Entity\Enova;

use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use App\Entity\Brand;
use App\Entity\Category;
use App\Entity\CouplingFilter;
use App\Entity\ItemType;
use App\Entity\MachineFilter;
use App\Entity\ProductsMediaObject;
use App\Entity\Subcategory;
use App\Entity\Variant;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity]
#[ORM\Table(name: 'product_info')]  // Optional: define the table name if it's different from the class nam
#[ApiResource(
    normalizationContext: ['groups' => ['productInfo:read']],
    denormalizationContext: ['groups' => ['productInfo:create']]
)]
class ProductInfo
{
    #[ORM\Id]
    #[ORM\GeneratedValue(strategy: "AUTO")]
    #[ORM\Column(type: "integer")]
    #[Groups(['enovaProduct:read', "productInfo:read"])]
    private int $id;

//    #[ORM\Column(type: "integer", options: ["default" => 0])]
//    #[Groups(['enovaProduct:read', "productInfo:read"])]
//    private int $braid;

    #[ORM\ManyToOne(targetEntity: Brand::class)]
    #[ORM\JoinColumn(name: 'braid', referencedColumnName: 'id', options: ["default" => 0])]
    #[Groups(['enovaProduct:read', "productInfo:read", 'productInfo:create'])]
    private ?Brand $brand = null;

    #[ORM\ManyToOne(targetEntity: Variant::class)]
    #[ORM\JoinColumn(name: 'varid', referencedColumnName: 'id', options: ["default" => 0])]
    #[Groups(['enovaProduct:read', "productInfo:read", 'productInfo:create'])]
    private ?Variant $variant = null;

    #[ORM\ManyToOne(targetEntity: CouplingFilter::class)]
    #[ORM\JoinColumn(name: 'coupling_filter_id', referencedColumnName: 'id', options: ["default" => 0])]
    #[Groups(['enovaProduct:read', "productInfo:read", 'productInfo:create'])]
    private ?CouplingFilter $couplingFilter = null;

    #[ORM\ManyToOne(targetEntity: MachineFilter::class)]
    #[ORM\JoinColumn(name: 'machine_filter_id', referencedColumnName: 'id', options: ["default" => 0])]
    #[Groups(['enovaProduct:read', "productInfo:read", 'productInfo:create'])]
    private ?MachineFilter $machineFilter = null;
//    #[ORM\Column(type: "integer", options: ["default" => 0])]
//    #[Groups(['enovaProduct:read', "productInfo:read"])]
//    private int $varid;

    #[ORM\ManyToOne(targetEntity: Category::class)]
    #[ORM\JoinColumn(name: 'catid', referencedColumnName: 'id', options: ["default" => 0])]
    #[Groups(['enovaProduct:read', "productInfo:read", 'productInfo:create'])]
    private ?Category $category = null;

//    #[ORM\Column(type: "integer", options: ["default" => 0])]
//    #[Groups(['enovaProduct:read', "productInfo:read"])]
//    private int $catid;

    #[ORM\ManyToOne(targetEntity: Subcategory::class)]
    #[ORM\JoinColumn(name: 'scatid', referencedColumnName: 'id', options: ["default" => 0])]
    #[Groups(['enovaProduct:read', "productInfo:read", 'productInfo:create'])]
    private ?Subcategory $subcategory = null;

//    #[ORM\Column(type: "integer", options: ["default" => 0])]
//    #[Groups(['enovaProduct:read', "productInfo:read"])]
//    private int $scatid;

    #[ORM\ManyToOne(targetEntity: ItemType::class)]
    #[ORM\JoinColumn(name: 'itypeid', referencedColumnName: 'id', options: ["default" => 0])]
    #[Groups(['enovaProduct:read', "productInfo:read", 'productInfo:create'])]
    private ?ItemType $itemType = null;

//    #[ORM\Column(type: "integer", options: ["default" => 0])]
//    #[Groups(['enovaProduct:read', "productInfo:read"])]
//    private int $itypeid;

    #[ORM\Column(type: "text", nullable: true)]
    #[Groups(['enovaProduct:read', "productInfo:read", 'productInfo:create'])]
    private ?string $englishTitle = null;

    #[ORM\Column(type: "text", nullable: true)]
    #[Groups(['enovaProduct:read', "productInfo:read", 'productInfo:create'])]
    private ?string $germanTitle = null;

    #[ORM\Column(type: "text", nullable: true)]
    #[Groups(['enovaProduct:read', "productInfo:read", 'productInfo:create'])]
    private ?string $description = null;

    #[ORM\Column(type: "text", nullable: true)]
    #[Groups(['enovaProduct:read', "productInfo:read", 'productInfo:create'])]
    private ?string $polishDescription = null;

    #[ORM\Column(type: "text", nullable: true)]
    #[Groups(['enovaProduct:read', "productInfo:read", 'productInfo:create'])]
    private ?string $germanDescription = null;

    #[ORM\ManyToOne(targetEntity: ProductsMediaObject::class)]
    #[ORM\JoinColumn(nullable: true)]
    #[ApiProperty(types: ['https://schema.org/image'])]
    public ?ProductsMediaObject $image = null;

    #[ORM\Column(type: "string")]
    #[Groups(['enovaProduct:read', "productInfo:read", 'productInfo:create'])]
    private string $imagePath;

    public function getImagePath(): string
    {
        return $this->imagePath;
    }

    public function setImagePath(string $imagePath): void
    {
        $this->imagePath = $imagePath;
    }


    // Getters and Setters

    public function getId(): int
    {
        return $this->id;
    }

    public function setId(int $id): self
    {
        $this->id = $id;
        return $this;
    }

    public function getBrand(): ?Brand
    {
        return $this->brand;
    }

    public function setBrand(?Brand $brand): void
    {
        $this->brand = $brand;
    }



//    public function getBraid(): int
//    {
//        return $this->braid;
//    }
//
//    public function setBraid(int $braid): self
//    {
//        $this->braid = $braid;
//        return $this;
//    }

    public function getVariant(): ?Variant
    {
        return $this->variant;
    }

    public function setVariant(?Variant $variant): void
    {
        $this->variant = $variant;
    }

    public function getCouplingFilter(): ?CouplingFilter
    {
        return $this->couplingFilter;
    }

    public function setCouplingFilter(?CouplingFilter $couplingFilter): void
    {
        $this->couplingFilter = $couplingFilter;
    }

    public function getMachineFilter(): ?MachineFilter
    {
        return $this->machineFilter;
    }

    public function setMachineFilter(?MachineFilter $machineFilter): void
    {
        $this->machineFilter = $machineFilter;
    }



//    public function getVarid(): int
//    {
//        return $this->varid;
//    }
//
//    public function setVarid(int $varid): self
//    {
//        $this->varid = $varid;
//        return $this;
//    }

    public function getSubcategory(): ?Subcategory
    {
        return $this->subcategory;
    }

    public function setSubcategory(?Subcategory $subcategory): void
    {
        $this->subcategory = $subcategory;
    }

//    public function getScatid(): int
//    {
//        return $this->scatid;
//    }
//
//    public function setScatid(int $scatid): void
//    {
//        $this->scatid = $scatid;
//    }

    public function getCategory(): ?Category
    {
        return $this->category;
    }

    public function setCategory(?Category $category): void
    {
        $this->category = $category;
    }


//    public function getCatid(): int
//    {
//        return $this->catid;
//    }
//
//    public function setCatid(int $catid): self
//    {
//        $this->catid = $catid;
//        return $this;
//    }

    public function getItemType(): ?ItemType
    {
        return $this->itemType;
    }

    public function setItemType(?ItemType $itemType): void
    {
        $this->itemType = $itemType;
    }

    public function getEnglishTitle(): ?string
    {
        return $this->englishTitle;
    }

    public function setEnglishTitle(?string $englishTitle): void
    {
        $this->englishTitle = $englishTitle;
    }



    public function getGermanTitle(): ?string
    {
        return $this->germanTitle;
    }

    public function setGermanTitle(?string $germanTitle): void
    {
        $this->germanTitle = $germanTitle;
    }

//    public function getItypeid(): int
//    {
//        return $this->itypeid;
//    }
//
//    public function setItypeid(int $itypeid): void
//    {
//        $this->itypeid = $itypeid;
//    }



    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): void
    {
        $this->description = $description;
    }

    // Add the toArray method
    public function toArray(): array
    {
        return [
            'id' => $this->getId(),
        ];
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
}
