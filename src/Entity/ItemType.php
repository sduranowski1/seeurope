<?php

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use App\Entity\Traits\Timestampable;
use App\Repository\ItemTypeRepository;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\HasLifecycleCallbacks;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: ItemTypeRepository::class)]
#[HasLifecycleCallbacks]
#[ApiResource(
    normalizationContext: ['groups' => ['itemType:read']],
    denormalizationContext: ['groups' => ['itemType:create']]
)]
#[ApiFilter(SearchFilter::class, properties: ['name' => 'partial'])]
class ItemType
{
    use Timestampable;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(['itemType:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 50)]
    #[Groups(['itemType:read', 'itemType:create', 'itemType:update', "productInfo:read", 'enovaProduct:read'])]
    private ?string $name = null;

    #[ORM\Column(length: 50)]
    #[Groups(['itemType:read', 'itemType:create', 'itemType:update', "productInfo:read", 'enovaProduct:read'])]
    private ?string $polishName = null;

    #[ORM\Column(length: 50)]
    #[Groups(['itemType:read', 'itemType:create', 'itemType:update', "productInfo:read", 'enovaProduct:read'])]
    private ?string $germanName = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['itemType:read', 'itemType:create'])]
    private ?int $scid = null;

    #[ORM\ManyToOne(targetEntity: Subcategory::class)]
    #[ORM\JoinColumn(name: 'scid', referencedColumnName: 'id', nullable: true)]
    #[Groups(['itemType:read', 'itemType:create'])]
    public ?Subcategory $subcategory = null;

    #[ORM\ManyToOne(targetEntity: ItemTypesMediaObject::class)]
    #[ORM\JoinColumn(nullable: true)]
    #[ApiProperty(types: ['https://schema.org/image'])]
    #[Groups(['itemType:read', 'itemType:create', 'itemType:update'])]
    public ?ItemTypesMediaObject $image = null;

    #[ORM\Column(type: "string")]
    #[Groups(['itemType:read', 'itemType:create', 'itemType:update'])]
    private string $imagePath = 'landscape-placeholder.svg';

    #[ORM\Column(type: "string")]
    #[Groups(['itemType:read', 'itemType:create', 'itemType:update'])]
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



    public function getSubcategory(): ?Subcategory
    {
        return $this->subcategory;
    }

    public function setSubcategory(?Subcategory $subcategory): void
    {
        $this->subcategory = $subcategory;
    }

    public function getScid(): ?int
    {
        return $this->scid;
    }

    public function setScid(?int $scid): void
    {
        $this->scid = $scid;
    }
}
