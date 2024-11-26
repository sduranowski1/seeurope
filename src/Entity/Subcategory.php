<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Entity\Traits\Timestampable;
use App\Repository\SubcategoryRepository;
use App\Repository\VariantRepository;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\HasLifecycleCallbacks;

#[ORM\Entity(repositoryClass: SubcategoryRepository::class)]
#[HasLifecycleCallbacks]
#[ApiResource]
class Subcategory
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
    private ?string $subCatName = null;

    #[ORM\Column(nullable: true)]
    private ?int $cid = null;

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
}
