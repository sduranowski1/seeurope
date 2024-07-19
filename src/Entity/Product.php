<?php

namespace App\Entity;

use AllowDynamicProperties;
use ApiPlatform\Metadata\ApiResource;
use App\Repository\ProductRepository;
use DateTimeImmutable;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\HasLifecycleCallbacks;
//use Gedmo\Mapping\Annotation\Timestampable;
use App\Entity\Traits\Timestampable;

#[AllowDynamicProperties] #[ORM\Entity(repositoryClass: ProductRepository::class)]
#[HasLifecycleCallbacks]
#[ApiResource]
class Product
{
    /*
     * Timestampable trait
     */
    use Timestampable;



    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $itemNo = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column]
    private ?int $price = null;

    #[ORM\Column]
    private ?int $quantity = null;

//    #[ORM\Column]
//    private ?int $amount = null;

    #[ORM\Column(length: 50)]
    private ?string $unit = null;

    #[ORM\Column(length: 255)]
    private ?string $model = null;

    #[ORM\Column(nullable: true)]
    private ?int $bid = null;

    #[ORM\Column(nullable: true)]
    private ?int $vid = null;

    #[ORM\Column]
    private ?string $category = null;

//    #[ORM\Column(length: 50)]
//    private ?string $brand_model = null;




//    #[Timestampable(on: 'create')]
//    #[ORM\Column]
//    private ?DateTimeImmutable $created = null;
//
//    #[Timestampable(on: 'update')]
//    #[ORM\Column]
//    private ?DateTimeImmutable $updated = null;

//    public function getCreated(): ?DateTimeImmutable
//    {
//        return $this->created;
//    }

//    public function setCreated(DateTimeImmutable $created): self
//    {
//        $this->created = $created;
//
//        return $this;
//    }

//    public function getUpdated(): ?DateTimeImmutable
//    {
//        return $this->updated;
//    }
//
//    public function setUpdated(DateTimeImmutable $updated): self
//    {
//        $this->updated = $updated;
//
//        return $this;
//    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getItemNo(): ?string
    {
        return $this->itemNo;
    }

    public function setItemNo(string $itemNo): static
    {
        $this->itemNo = $itemNo;

        return $this;
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

    public function getPrice(): ?int
    {
        return $this->price;
    }

    public function setPrice(int $price): static
    {
        $this->price = $price;

        return $this;
    }

    public function getQuantity(): ?int
    {
        return $this->quantity;
    }

    public function setQuantity(int $quantity): static
    {
        $this->quantity = $quantity;

        return $this;
    }

//    public function getAmount(): ?int
//    {
//        return $this->amount;
//    }
//
//    public function setAmount(int $amount): static
//    {
//        $this->amount = $amount;
//
//        return $this;
//    }

    public function getUnit(): ?string
    {
        return $this->unit;
    }

    public function setUnit(string $unit): static
    {
        $this->unit = $unit;

        return $this;
    }

    public function getModel(): ?string
    {
        return $this->model;
    }

    public function setModel(string $model): static
    {
        $this->model = $model;

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

    public function getVid(): ?int
    {
        return $this->vid;
    }

    public function setVid(?int $vid): static
    {
        $this->vid = $vid;

        return $this;
    }

    public function getCategory(): ?string
    {
        return $this->category;
    }

    public function setCategory(string $category): static
    {
        $this->category = $category;

        return $this;
    }

//    public function getBrandModel(): ?string
//    {
//        return $this->brand_model;
//    }
//
//    public function setBrandModel(string $brand_model): static
//    {
//        $this->brand_model = $brand_model;
//
//        return $this;
//    }



}
