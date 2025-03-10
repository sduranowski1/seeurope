<?php

namespace App\Entity\Enova;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Entity\Enova\EnovaProduct;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity]
#[ApiResource(
    operations: [
        new GetCollection(),
//        new GetCollection(
//            uriTemplate: '/enova_products/no_pagination',
//            paginationEnabled: false,
//        ),
//        new Post(),
        new Get(),
//        new Put(),
//        new Patch(),
//        new Delete()
    ],
    normalizationContext: ['groups' => ['enovaOrderItem:read']],
    denormalizationContext: ['groups' => ['enovaOrderItem:create']]

)]
class EnovaOrderItem
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(['enovaOrderItem:read', 'enovaOrder:read'])]
    private ?int $id = null;

    // Foreign key to EnovaProduct
    #[ORM\ManyToOne(targetEntity: EnovaOrder::class, inversedBy: 'pozycjeDokHandlowego')]
    #[ORM\JoinColumn(name: 'enova_order_id', referencedColumnName: 'id', nullable: false)]
    #[Groups(['enovaOrderItem:read', 'enovaOrderItem:create', 'enovaOrderItem:update', 'enovaOrder:read', 'enovaOrder:create', 'enovaOrder:update'])]
    private EnovaOrder $enovaOrder;

//    #[ORM\Column(type: 'integer')]
//    #[Groups(['enovaOrderItem:read', 'enovaOrderItem:create', 'enovaOrderItem:update'])]
//    private ?int $towarEnovaId = null;

    #[ORM\Column(type: 'decimal', precision: 10, scale: 2)]
    #[Groups(['enovaOrderItem:read', 'enovaOrderItem:create', 'enovaOrderItem:update', 'enovaOrder:read', 'enovaOrder:create', 'enovaOrder:update'])]    private ?float $price = null;

    #[ORM\Column(type: 'integer')]
    #[Groups(['enovaOrderItem:read', 'enovaOrderItem:create', 'enovaOrderItem:update', 'enovaOrder:read', 'enovaOrder:create', 'enovaOrder:update'])]
    private ?int $quantity = null;

    #[ORM\Column(type: 'string', length: 10)]
    #[Groups(['enovaOrderItem:read', 'enovaOrderItem:create', 'enovaOrderItem:update', 'enovaOrder:read', 'enovaOrder:create', 'enovaOrder:update'])]
    private ?string $currency = null;


    #[ORM\ManyToOne(targetEntity: EnovaProduct::class)]
    #[ORM\JoinColumn(name: 'towar_enova_id', referencedColumnName: 'id', nullable: true)]
    #[Groups(['enovaOrderItem:read', 'enovaOrderItem:create', 'enovaOrderItem:update', 'enovaOrder:read', 'enovaOrder:create', 'enovaOrder:update'])]
    public ?EnovaProduct $enovaProduct = null;

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
