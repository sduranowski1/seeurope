<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Entity\Traits\Timestampable;
use App\Repository\BrandRepository;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\HasLifecycleCallbacks;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: BrandRepository::class)]
#[HasLifecycleCallbacks]
#[ApiResource(
    normalizationContext: ['groups' => ['brand:read']],
    denormalizationContext: ['groups' => ['brand:write']]
)]
class Brand
{
    use Timestampable;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['brand:read', 'variant:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 50)]
    #[Groups(['brand:read', 'brand:create', 'brand:update', 'variant:read', 'variant:create', 'variant:update'])]
    private ?string $name = null;

//    #[ORM\Column(length: 255)]
//    private ?string $variant = null;

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

//    public function getVariant(): ?string
//    {
//        return $this->variant;
//    }
//
//    public function setVariant(string $variant): static
//    {
//        $this->variant = $variant;
//
//        return $this;
//    }
}
