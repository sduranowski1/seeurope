<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use App\Entity\Traits\Timestampable;
use App\Repository\VariantRepository;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\HasLifecycleCallbacks;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: VariantRepository::class)]
#[HasLifecycleCallbacks]
#[ApiResource(
    normalizationContext: ['groups' => ['variant:read']],
    denormalizationContext: ['groups' => ['variant:create']]

)]
class Variant
{
    use Timestampable;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['variant:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 50)]
    #[Groups(['variant:read', 'variant:create', 'variant:update'])]
    private ?string $variantname = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['variant:read', 'variant:create'])]
    private ?int $bid = null;

    #[ORM\ManyToOne(targetEntity: Brand::class)]
    #[ORM\JoinColumn(name: 'bid', referencedColumnName: 'id', nullable: true)]
    #[Groups(['variant:read', 'variant:create'])]
    public ?Brand $brand = null;


    #[ORM\ManyToOne(targetEntity: BrandsMediaObject::class)]
    #[ORM\JoinColumn(nullable: true)]
    #[ApiProperty(types: ['https://schema.org/image'])]
    #[Groups(['variant:read', 'variant:create', 'variant:update'])]
    public ?VariantsMediaObject $image = null;

    #[ORM\Column(type: "string")]
    #[Groups(['variant:read', 'variant:create', 'variant:update'])]
    private string $imagePath;

    #[ORM\Column(type: "string")]
    #[Groups(['variant:read', 'variant:create', 'variant:update'])]
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

    public function getVariantname(): ?string
    {
        return $this->variantname;
    }

    public function setVariantname(string $variantname): static
    {
        $this->variantname = $variantname;

        return $this;
    }

    public function getBid(): ?int
    {
        return $this->bid;
    }

    public function setBid(?int $bid): static
    {
        $this->bid = $bid;

        return $this;
    }

    public function getBrand(): ?Brand
    {
        return $this->brand;
    }

    public function setBrand(?Variant $brand): self
    {
        $this->brand = $brand;
        return $this;
    }
}
