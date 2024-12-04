<?php

namespace App\Entity;

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
class ItemType
{
    use Timestampable;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(['itemType:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 50)]
    #[Groups(['itemType:read', 'itemType:create', 'itemType:update'])]
    private ?string $name = null;

    #[ORM\ManyToOne(targetEntity: CategoriesMediaObject::class)]
    #[ORM\JoinColumn(nullable: true)]
    #[ApiProperty(types: ['https://schema.org/image'])]
    #[Groups(['itemType:read', 'itemType:create', 'itemType:update'])]
    public ?CategoriesMediaObject $image = null;

    #[ORM\Column(type: "string")]
    #[Groups(['itemType:read', 'itemType:create', 'itemType:update'])]
    private string $imagePath;

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
}
