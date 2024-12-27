<?php

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use App\Entity\Traits\Timestampable;
use App\Repository\SubcategoryRepository;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\HasLifecycleCallbacks;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: SubcategoryRepository::class)]
#[HasLifecycleCallbacks]
#[ApiResource(
    normalizationContext: ['groups' => ['subcategory:read']],
    denormalizationContext: ['groups' => ['subcategory:create']]

)]
#[ApiFilter(SearchFilter::class, properties: ['subCatName' => 'partial'])]
class Subcategory
{
    use Timestampable;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(['subcategory:read', 'itemType:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 50)]
    #[Groups(['subcategory:read', 'subcategory:create', 'subcategory:update', 'itemType:read', 'itemType:create', 'itemType:update', "productInfo:read", 'enovaProduct:read'])]
    private ?string $subCatName = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['subcategory:read', 'subcategory:create'])]
    private ?int $cid = null;

    #[ORM\ManyToOne(targetEntity: Category::class)]
    #[ORM\JoinColumn(name: 'cid', referencedColumnName: 'id', nullable: true)]
    #[Groups(['subcategory:read', 'subcategory:create'])]
    public ?Category $category = null;

    #[ORM\ManyToOne(targetEntity: SubcategoriesMediaObject::class)]
    #[ORM\JoinColumn(nullable: true)]
    #[ApiProperty(types: ['https://schema.org/image'])]
    #[Groups(['subcategory:read', 'subcategory:create', 'subcategory:update'])]
    public ?SubcategoriesMediaObject $image = null;

    #[ORM\Column(type: "string")]
    #[Groups(['subcategory:read', 'subcategory:create', 'subcategory:update'])]
    private string $imagePath;

    #[ORM\Column(type: "string")]
    #[Groups(['subcategory:read', 'subcategory:create', 'subcategory:update'])]
    private string $domainImagePath;

    public function getImagePath(): string
    {
        return $this->imagePath;
    }

    public function setImagePath(string $imagePath): void
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

    public function getCid(): ?int
    {
        return $this->cid;
    }

    public function setCid(?int $cid): static
    {
        $this->cid = $cid;

        return $this;
    }

    public function getCategory(): ?Category
    {
        return $this->category;
    }

    public function setCategory(?Category $category): self
    {
        $this->category = $category;
        return $this;
    }
}
