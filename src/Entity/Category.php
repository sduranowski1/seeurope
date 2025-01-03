<?php

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use App\Entity\Traits\Timestampable;
use App\Repository\CategoryRepository;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\HasLifecycleCallbacks;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: CategoryRepository::class)]
#[HasLifecycleCallbacks]
#[ApiResource(
    normalizationContext: ['groups' => ['category:read']],
    denormalizationContext: ['groups' => ['category:create']]
)]
#[ApiFilter(SearchFilter::class, properties: ['name' => 'partial'])]
class Category
{
    use Timestampable;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(['category:read', 'subcategory:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 50)]
    #[Groups(['category:read', 'category:create', 'category:update', 'subcategory:read', 'subcategory:create', 'subcategory:update', "productInfo:read", 'enovaProduct:read'])]
    private ?string $name = null;

    #[ORM\Column(length: 50)]
    #[Groups(['category:read', 'category:create', 'category:update', 'subcategory:read', 'subcategory:create', 'subcategory:update', "productInfo:read", 'enovaProduct:read'])]
    private ?string $polishName = null;

    #[ORM\Column(length: 50)]
    #[Groups(['category:read', 'category:create', 'category:update', 'subcategory:read', 'subcategory:create', 'subcategory:update', "productInfo:read", 'enovaProduct:read'])]
    private ?string $germanName = null;

    #[ORM\ManyToOne(targetEntity: CategoriesMediaObject::class)]
    #[ORM\JoinColumn(nullable: true)]
    #[ApiProperty(types: ['https://schema.org/image'])]
    #[Groups(['category:read', 'category:create', 'category:update'])]
    public ?CategoriesMediaObject $image = null;

    #[ORM\Column(type: "string")]
    #[Groups(['category:read', 'category:create', 'category:update'])]
    private ?string $imagePath = null;

    #[ORM\Column(type: "string")]
    #[Groups(['category:read', 'category:create', 'category:update'])]
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
