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
use App\Entity\Enova\FeaturesList\FeaturesList;
use App\Entity\Traits\Timestampable;
use App\Repository\BrandRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\HasLifecycleCallbacks;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: BrandRepository::class)]
#[HasLifecycleCallbacks]
#[ApiResource(
    operations: [
        new GetCollection(),
        new GetCollection(
            uriTemplate: '/brands/no_pagination',
            paginationEnabled: false,
        ),
        new Post(),
        new Get(),
        new Put(),
        new Patch(),
        new Delete()
    ],
    normalizationContext: ['groups' => ['brand:read']],
    denormalizationContext: ['groups' => ['brand:create']]
)]
#[ApiFilter(SearchFilter::class, properties: ['name' => 'partial'])]
#[ApiFilter(OrderFilter::class, properties: ['id', 'name', 'polishName', 'germanName'])]
class Brand
{
    use Timestampable;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['brand:read', 'variant:read', "productInfo:read", 'productInfo:create', 'featuresList:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 50)]
    #[Groups(['brand:read', 'brand:create', 'brand:update', 'variant:read', 'variant:create', 'variant:update', "productInfo:read", 'productInfo:create', 'enovaProduct:read', 'featuresList:read', 'featuresList:create', 'featuresList:update'])]
    private ?string $name = null;

    #[ORM\Column(length: 50)]
    #[Groups(['brand:read', 'brand:create', 'brand:update', 'variant:read', 'variant:create', 'variant:update', "productInfo:read", 'productInfo:create', 'enovaProduct:read'])]
    private ?string $polishName = null;

    #[ORM\Column(length: 50)]
    #[Groups(['brand:read', 'brand:create', 'brand:update', 'variant:read', 'variant:create', 'variant:update', "productInfo:read", 'productInfo:create', 'enovaProduct:read'])]
    private ?string $germanName = null;

    #[ORM\Column(type: "text", nullable: true)]
    #[Groups(['brand:read', 'brand:create', 'brand:update', 'variant:read', 'variant:create', 'variant:update', "productInfo:read", 'productInfo:create', 'enovaProduct:read'])]
    private ?string $description = null;

    #[ORM\Column(type: "text", nullable: true)]
    #[Groups(['brand:read', 'brand:create', 'brand:update', 'variant:read', 'variant:create', 'variant:update', "productInfo:read", 'productInfo:create', 'enovaProduct:read'])]
    private ?string $polishDescription = null;

    #[ORM\Column(type: "text", nullable: true)]
    #[Groups(['brand:read', 'brand:create', 'brand:update', 'variant:read', 'variant:create', 'variant:update', "productInfo:read", 'productInfo:create', 'enovaProduct:read'])]
    private ?string $germanDescription = null;


    #[ORM\ManyToOne(targetEntity: BrandsMediaObject::class)]
    #[ORM\JoinColumn(nullable: true)]
    #[ApiProperty(types: ['https://schema.org/image'])]
    #[Groups(['brand:read', 'brand:create', 'brand:update'])]
    public ?BrandsMediaObject $image = null;

    #[ORM\Column(type: "string")]
    #[Groups(['brand:read', 'brand:create', 'brand:update'])]
    private ?string $imagePath = null;

    #[ORM\Column(type: "string")]
    #[Groups(['brand:read', 'brand:create', 'brand:update'])]
    private string $domainImagePath;

    // Add the One-to-Many relationship to FeaturesList
    #[ORM\OneToMany(targetEntity: FeaturesList::class, mappedBy: "brand", cascade: ["persist", "remove"])]
    #[Groups(['brand:read', 'brand:create', 'brand:update'])]
    private Collection $featuresLists;

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


    public function __construct()
    {
        $this->featuresLists = new ArrayCollection();
    }

    // Add getter and setter for featuresLists
    public function getFeaturesLists(): Collection
    {
        return $this->featuresLists;
    }

    public function addFeaturesList(FeaturesList $featuresList): self
    {
        if (!$this->featuresLists->contains($featuresList)) {
            $this->featuresLists[] = $featuresList;
            $featuresList->setBrand($this);
        }

        return $this;
    }

    public function removeFeaturesList(FeaturesList $featuresList): self
    {
        if ($this->featuresLists->removeElement($featuresList)) {
            // set the owning side to null (unless already changed)
            if ($featuresList->getBrand() === $this) {
                $featuresList->setBrand(null);
            }
        }

        return $this;
    }
}
