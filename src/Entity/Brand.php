<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Entity\Traits\Timestampable;
use App\Repository\BrandRepository;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\HasLifecycleCallbacks;

#[ORM\Entity(repositoryClass: BrandRepository::class)]
#[HasLifecycleCallbacks]
#[ApiResource]
class Brand
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
