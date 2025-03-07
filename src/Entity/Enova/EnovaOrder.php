<?php

namespace App\Entity\Enova;

use ApiPlatform\Doctrine\Common\Filter\SearchFilterInterface;
use ApiPlatform\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use App\Controller\EnovaMakeOrder\EnovaMakeOrderController;
use App\Repository\EnovaOrderRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: EnovaOrderRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(),
        new Post(
            uriTemplate: '/enova_orders/enova_call',
            controller: EnovaMakeOrderController::class,
            read: false,  // Prevents automatic entity fetching
            deserialize: false, // We handle deserialization manually in the controller
            name: 'make_enova_order'
        ),
//        new Post(),
        new Get(),
//        new Put(),
//        new Patch(),
        new Delete()
    ]
)]
#[ApiFilter(
    SearchFilter::class,
    properties: [
        'email' => SearchFilterInterface::STRATEGY_PARTIAL
    ]
)]
#[ApiFilter(OrderFilter::class, properties: ['id'])]
class EnovaOrder
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(type: 'string', length: 255)]
    private ?string $email = null;

    #[ORM\Column(type: 'integer')]
    private int $idWWW;

    #[ORM\Column(type: 'integer')]
    private int $idEnova;

    #[ORM\Column(type: 'string')]
    private string $idPlatnosciInternetowej;

    #[ORM\Column(type: 'string')]
    private string $numerWWW;

    #[ORM\Column(type: 'string')]
    private string $numerEnova;

    #[ORM\Column(type: 'decimal', precision: 10, scale: 2)]
    private float $wartosc;

    #[ORM\Column(type: 'decimal', precision: 10, scale: 2)]
    private float $wartoscWaluta;

    #[ORM\Column(type: 'integer')]
    private int $platnik;

    #[ORM\Column(type: 'integer')]
    private int $odbiorca;

    #[ORM\Column(type: 'json', nullable: true, options: ['jsonb' => true])]
    private array $lokalizacjaDostawy = [];

    #[ORM\Column(type: 'datetime')]
    private \DateTimeInterface $data;

    #[ORM\Column(type: 'string', nullable: true)]
    private ?string $opis = null;

    #[ORM\Column(type: 'json', nullable: true, options: ['jsonb' => true])]
    private array $pozycjeDokHandlowego = [];

    #[ORM\Column(type: 'datetime', nullable: true)]
    private ?\DateTimeInterface $terminPlatnosci = null;

    #[ORM\Column(type: 'string', nullable: true)]
    private ?string $contactPerson = null;

    #[ORM\Column(type: 'string', nullable: true)]
    private ?string $phone = null;

    #[ORM\Column(type: 'string', nullable: true)]
    private ?string $orderNumber = null;

    #[ORM\Column(type: 'string', nullable: true)]
    private ?string $shipping = null;

    #[ORM\ManyToMany(targetEntity: EnovaProduct::class)]
    #[ORM\JoinTable(name: "orders")]
    private Collection $relatedProducts;

    public function __construct()
    {
        $this->relatedProducts = new ArrayCollection();
    }

    public function getRelatedProducts(): Collection
    {
        return $this->relatedProducts;
    }

    public function mapProducts(Collection $products): void
    {
        $this->relatedProducts->clear();

        foreach ($this->pozycjeDokHandlowego as $pozycja) {
            $product = $products->filter(fn(EnovaProduct $p) => $p->getId() === $pozycja['towarEnovaId'])->first();

            if ($product) {
                $this->relatedProducts->add($product);
            }
        }
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(?int $id): void
    {
        $this->id = $id;
    }

    public function getIdWWW(): int
    {
        return $this->idWWW;
    }

    public function setIdWWW(int $idWWW): void
    {
        $this->idWWW = $idWWW;
    }

    public function getIdPlatnosciInternetowej(): string
    {
        return $this->idPlatnosciInternetowej;
    }

    public function setIdPlatnosciInternetowej(string $idPlatnosciInternetowej): void
    {
        $this->idPlatnosciInternetowej = $idPlatnosciInternetowej;
    }

    public function getIdEnova(): int
    {
        return $this->idEnova;
    }

    public function setIdEnova(int $idEnova): void
    {
        $this->idEnova = $idEnova;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(?string $email): void
    {
        $this->email = $email;
    }



    public function getNumerWWW(): string
    {
        return $this->numerWWW;
    }

    public function setNumerWWW(string $numerWWW): void
    {
        $this->numerWWW = $numerWWW;
    }

    public function getNumerEnova(): string
    {
        return $this->numerEnova;
    }

    public function setNumerEnova(string $numerEnova): void
    {
        $this->numerEnova = $numerEnova;
    }

    public function getWartosc(): float
    {
        return $this->wartosc;
    }

    public function setWartosc(float $wartosc): void
    {
        $this->wartosc = $wartosc;
    }

    public function getPlatnik(): int
    {
        return $this->platnik;
    }

    public function setPlatnik(int $platnik): void
    {
        $this->platnik = $platnik;
    }

    public function getWartoscWaluta(): float
    {
        return $this->wartoscWaluta;
    }

    public function setWartoscWaluta(float $wartoscWaluta): void
    {
        $this->wartoscWaluta = $wartoscWaluta;
    }

    public function getOdbiorca(): int
    {
        return $this->odbiorca;
    }

    public function setOdbiorca(int $odbiorca): void
    {
        $this->odbiorca = $odbiorca;
    }

    public function getLokalizacjaDostawy(): array
    {
        return $this->lokalizacjaDostawy;
    }

    public function setLokalizacjaDostawy(array $lokalizacjaDostawy): void
    {
        $this->lokalizacjaDostawy = $lokalizacjaDostawy;
    }

    public function getData(): \DateTimeInterface
    {
        return $this->data;
    }

    public function setData(\DateTimeInterface $data): void
    {
        $this->data = $data;
    }

    public function getOpis(): ?string
    {
        return $this->opis;
    }

    public function setOpis(?string $opis): void
    {
        $this->opis = $opis;
    }

    public function getPozycjeDokHandlowego(): array
    {
        return $this->pozycjeDokHandlowego;
    }

    public function setPozycjeDokHandlowego(array $pozycjeDokHandlowego): void
    {
        $this->pozycjeDokHandlowego = $pozycjeDokHandlowego;
    }

    public function getTerminPlatnosci(): ?\DateTimeInterface
    {
        return $this->terminPlatnosci;
    }

    public function setTerminPlatnosci(?\DateTimeInterface $terminPlatnosci): void
    {
        $this->terminPlatnosci = $terminPlatnosci;
    }

    public function getContactPerson(): ?string
    {
        return $this->contactPerson;
    }

    public function setContactPerson(?string $contactPerson): void
    {
        $this->contactPerson = $contactPerson;
    }

    public function getPhone(): ?string
    {
        return $this->phone;
    }

    public function setPhone(?string $phone): void
    {
        $this->phone = $phone;
    }

    public function getOrderNumber(): ?string
    {
        return $this->orderNumber;
    }

    public function setOrderNumber(?string $orderNumber): void
    {
        $this->orderNumber = $orderNumber;
    }

    public function getShipping(): ?string
    {
        return $this->shipping;
    }

    public function setShipping(?string $shipping): void
    {
        $this->shipping = $shipping;
    }


}
