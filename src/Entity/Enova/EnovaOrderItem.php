<?php

namespace App\Entity\Enova;

use App\Entity\Enova\EnovaProduct;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
class EnovaOrderItem
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private ?int $id = null;

    // Foreign key to EnovaProduct
    #[ORM\ManyToOne(targetEntity: EnovaOrder::class, inversedBy: 'pozycjeDokHandlowego')]
    #[ORM\JoinColumn(name: 'enova_order_id', referencedColumnName: 'id', nullable: false)]
    private EnovaOrder $enovaOrder;

    #[ORM\Column(type: 'integer')]
    private ?int $towarEnovaId = null;

    #[ORM\Column(type: 'string', length: 255)]
    private ?string $productName = null;

    #[ORM\Column(type: 'decimal', precision: 10, scale: 2)]
    private ?float $price = null;

    #[ORM\Column(type: 'integer')]
    private ?int $quantity = null;

    #[ORM\Column(type: 'string', length: 10)]
    private ?string $currency = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(?int $id): void
    {
        $this->id = $id;
    }

    public function getEnovaOrder(): EnovaOrder
    {
        return $this->enovaOrder;
    }

    public function setEnovaOrder(EnovaOrder $enovaOrder): void
    {
        $this->enovaOrder = $enovaOrder;
    }

    public function getTowarEnovaId(): ?int
    {
        return $this->towarEnovaId;
    }

    public function setTowarEnovaId(?int $towarEnovaId): void
    {
        $this->towarEnovaId = $towarEnovaId;
    }

    public function getProductName(): ?string
    {
        return $this->productName;
    }

    public function setProductName(?string $productName): void
    {
        $this->productName = $productName;
    }

    public function getQuantity(): ?int
    {
        return $this->quantity;
    }

    public function setQuantity(?int $quantity): void
    {
        $this->quantity = $quantity;
    }

    public function getCurrency(): ?string
    {
        return $this->currency;
    }

    public function setCurrency(?string $currency): void
    {
        $this->currency = $currency;
    }

    public function getPrice(): ?float
    {
        return $this->price;
    }

    public function setPrice(?float $price): void
    {
        $this->price = $price;
    }

    // Getters and Setters for each property...


}
