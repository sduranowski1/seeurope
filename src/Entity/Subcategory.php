<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Entity\Traits\Timestampable;
use App\Repository\SubcategoryRepository;
use App\Repository\VariantRepository;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\HasLifecycleCallbacks;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: SubcategoryRepository::class)]
#[HasLifecycleCallbacks]
#[ApiResource(
    normalizationContext: ['groups' => ['subcategory:read']],
    denormalizationContext: ['groups' => ['subcategory:create']]

)]
class Subcategory
{
    /*
* Timestampable trait
*/
    use Timestampable;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(['subcategory:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 50)]
    #[Groups(['subcategory:read', 'subcategory:create'])]
    private ?string $subCatName = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['subcategory:read', 'subcategory:create'])]
    private ?int $cid = null;

    #[ORM\ManyToOne(targetEntity: Category::class)]
    #[ORM\JoinColumn(name: 'cid', referencedColumnName: 'id', nullable: true)]
    #[Groups(['subcategory:read', 'subcategory:create'])]
    public ?Category $category = null;

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
