<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Entity\Traits\Timestampable;
use App\Repository\VariantRepository;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\HasLifecycleCallbacks;

#[ORM\Entity(repositoryClass: VariantRepository::class)]
#[HasLifecycleCallbacks]
#[ApiResource]
class Variant
{
            /*
     * Timestampable trait
     */
    use Timestampable;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 50)]
    private ?string $variantname = null;

    #[ORM\Column(nullable: true)]
    private ?int $bid = null;

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
}
