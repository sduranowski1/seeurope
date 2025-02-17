<?php

namespace App\Entity\Order;

use ApiPlatform\Doctrine\Common\Filter\SearchFilterInterface;
use ApiPlatform\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use App\Repository\OrderRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\HasLifecycleCallbacks;

#[ORM\Entity(repositoryClass: OrderRepository::class)]
#[HasLifecycleCallbacks]
#[ApiResource]
#[ORM\Table(name: 'orders')]
#[ApiFilter(
    SearchFilter::class,
    properties: [
        'email' => SearchFilterInterface::STRATEGY_PARTIAL
    ]
)]
#[ApiFilter(OrderFilter::class, properties: ['id'])]
class Order
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private ?int $id = null;

    #[ORM\Column(type: 'string', length: 255)]
    private ?string $email = null;

    #[ORM\Column(type: 'string', length: 255)]
    private ?string $name = null;

    #[ORM\Column(type: Types::JSON)]
    private array $address = [];

    #[ORM\Column(type: 'string', length: 20, nullable: true)]
    private ?string $phone = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTime $orderDate = null;

    #[ORM\Column(type: Types::JSON)]
    private array $items = [];

    #[ORM\Column(type: 'float')]
    private ?float $subtotal = null;

    #[ORM\Column(type: 'float')]
    private ?float $tax = null;

    #[ORM\Column(type: 'float')]
    private ?float $total = null;

    #[ORM\Column(type: 'string', length: 20, nullable: true)]
    private ?string $currency = null;

    // Getters and setters for all properties...

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getItems(): array
    {
        return $this->items;
    }

    public function setItems(array $items): self
    {
        $this->items = $items;

        return $this;
    }

    public function getAddress(): array
    {
        return $this->address;
    }

    public function setAddress(array $address): void
    {
        $this->address = $address;
    }

    public function getTotal(): ?float
    {
        return $this->total;
    }

    public function setTotal(?float $total): void
    {
        $this->total = $total;
    }

    public function getTax(): ?float
    {
        return $this->tax;
    }

    public function setTax(?float $tax): void
    {
        $this->tax = $tax;
    }

    public function getSubtotal(): ?float
    {
        return $this->subtotal;
    }

    public function setSubtotal(?float $subtotal): void
    {
        $this->subtotal = $subtotal;
    }

    public function getOrderDate(): ?\DateTime
    {
        return $this->orderDate;
    }

    public function setOrderDate(?\DateTime $orderDate): void
    {
        $this->orderDate = $orderDate;
    }

    public function getPhone(): ?string
    {
        return $this->phone;
    }

    public function setPhone(?string $phone): void
    {
        $this->phone = $phone;
    }

    public function getCurrency(): ?string
    {
        return $this->currency;
    }

    public function setCurrency(?string $currency): void
    {
        $this->currency = $currency;
    }



    // Add other getters and setters as needed...
}
