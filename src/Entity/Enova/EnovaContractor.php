<?php

namespace App\Entity\Enova;

use ApiPlatform\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource(
    normalizationContext: ['groups' => ['enovaContractor:read']],
    denormalizationContext: ['groups' => ['enovaContractor:create']]
)]
#[ApiFilter(SearchFilter::class, properties: ['nazwa' => 'partial'])]
#[ApiFilter(OrderFilter::class, properties: ['id', 'nazwa'])]
#[ORM\Entity]
class EnovaContractor
{
    #[ORM\Column(name: 'id_enova', type: 'integer', unique: true)]
    #[Groups(["enovaContractor:read", 'enovaPerson:read',  'userEnova:read'])]
    private ?int $idEnova = null;

    #[ORM\Id]
    #[ORM\Column(type: 'integer', unique: true)]
    #[Groups(["enovaContractor:read", 'enovaLocation:read'])]
    private ?int $id = null;

    #[ORM\Column(type: 'string')]
    #[Groups(["enovaContractor:read", 'enovaLocation:read'])]
    private ?string $kod = null;

    #[ORM\Column(type: 'string')]
    #[Groups(['enovaContractor:read', 'enovaContractor:create', 'enovaContractor:update', 'enovaPerson:read', 'enovaPerson:create', 'enovaPerson:update'])]
    private ?string $nazwa = null;

    #[ORM\Column(type: 'string')]
    #[Groups(['enovaContractor:read', 'enovaContractor:create', 'enovaContractor:update', 'enovaPerson:read', 'enovaPerson:create', 'enovaPerson:update'])]
    private ?string $Email = null;

    #[ORM\Column(type: 'string')]
    #[Groups(['enovaContractor:read', 'enovaContractor:create', 'enovaContractor:update', 'enovaPerson:read', 'enovaPerson:create', 'enovaPerson:update', 'userEnova:read'])]
    private ?string $cenaKontrahentaNazwa = null;

    #[ORM\Column(type: 'string')]
    #[Groups(['enovaContractor:read', 'enovaContractor:create', 'enovaContractor:update', 'enovaPerson:read', 'enovaPerson:create', 'enovaPerson:update'])]
    private ?string $Telefon = null;

    #[ORM\ManyToOne(cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(nullable: true)]
    #[Groups(['enovaContractor:read', 'enovaContractor:create', 'enovaContractor:update', 'enovaPerson:read', 'enovaPerson:create', 'enovaPerson:update', 'userEnova:read'])]
    private ?EnovaAddress $adres = null;

    #[ORM\ManyToOne(cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(nullable: true)]
    #[Groups(['enovaContractor:read', 'enovaContractor:create', 'enovaContractor:update'])]
    private ?EnovaAddress $adresKorespondencyjny = null;

    #[ORM\OneToMany(mappedBy: 'contractor', targetEntity: EnovaLocation::class, cascade: ['persist', 'remove'], orphanRemoval: true)]
    #[Groups(['enovaContractor:read', 'enovaContractor:write', 'enovaPerson:read', 'enovaPerson:create', 'enovaPerson:update', 'userEnova:read'])]
    private Collection $locations;

    #[ORM\OneToMany(targetEntity: EnovaPerson::class, mappedBy: 'contractor', cascade: ['persist', 'remove'])]
    #[Groups(['enovaContractor:read', 'enovaContractor:create', 'enovaContractor:update'])]
    private Collection $listaOsobyKontrahenta;

//    #[ORM\OneToMany(targetEntity: EnovaLocation::class, mappedBy: 'contractor', cascade: ['persist', 'remove'])]
//    #[Groups(['enovaContractor:read', 'enovaContractor:create', 'enovaContractor:update'])]
//    private Collection $listaLokalizacje;

    public function __construct()
    {
        $this->listaOsobyKontrahenta = new ArrayCollection();
        $this->locations = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(int $id): self
    {
        $this->id = $id;
        return $this;
    }

    public function getIdEnova(): ?int
    {
        return $this->idEnova;
    }

    public function setIdEnova(int $idEnova): self
    {
        $this->idEnova = $idEnova;
        // Optionally, clone the idEnova into id (if you want automatic sync)
        $this->id = $idEnova; // Clone logic
        return $this;
    }

    public function getKod(): ?string
    {
        return $this->kod;
    }

    public function setKod(?string $kod): void
    {
        $this->kod = $kod;
    }



    public function getNazwa(): ?string
    {
        return $this->nazwa;
    }

    public function setNazwa(?string $nazwa): void
    {
        $this->nazwa = $nazwa;
    }

    public function getEmail(): ?string
    {
        return $this->Email;
    }

    public function setEmail(?string $Email): void
    {
        $this->Email = $Email;
    }

    public function getCenaKontrahentaNazwa(): ?string
    {
        return $this->cenaKontrahentaNazwa;
    }

    public function setCenaKontrahentaNazwa(?string $cenaKontrahentaNazwa): void
    {
        $this->cenaKontrahentaNazwa = $cenaKontrahentaNazwa;
    }

    public function getTelefon(): ?string
    {
        return $this->Telefon;
    }

    public function setTelefon(?string $Telefon): void
    {
        $this->Telefon = $Telefon;
    }

    public function getAdres(): ?EnovaAddress
    {
        return $this->adres;
    }

    public function setAdres(?EnovaAddress $adres): void
    {
        $this->adres = $adres;
    }

    public function getAdresKorespondencyjny(): ?EnovaAddress
    {
        return $this->adresKorespondencyjny;
    }

    public function setAdresKorespondencyjny(?EnovaAddress $adresKorespondencyjny): void
    {
        $this->adresKorespondencyjny = $adresKorespondencyjny;
    }

    public function getLocations(): Collection
    {
        return $this->locations;
    }

    public function addLocation(EnovaLocation $location): self
    {
        if (!$this->locations->contains($location)) {
            $this->locations[] = $location;
            $location->setContractor($this);
        }

        return $this;
    }

    public function removeLocation(EnovaLocation $location): self
    {
        if ($this->locations->removeElement($location)) {
            // Set the owning side to null (unless already changed)
            if ($location->getContractor() === $this) {
                $location->setContractor(null);
            }
        }

        return $this;
    }



    public function getListaOsobyKontrahenta(): Collection
    {
        return $this->listaOsobyKontrahenta;
    }

    public function addListaOsobyKontrahenta(EnovaPerson $person): self
    {
        if (!$this->listaOsobyKontrahenta->contains($person)) {
            $this->listaOsobyKontrahenta->add($person);
            $person->setContractor($this);
        }
        return $this;
    }

    public function removeListaOsobyKontrahenta(EnovaPerson $person): self
    {
        if ($this->listaOsobyKontrahenta->removeElement($person)) {
            if ($person->getContractor() === $this) {
                $person->setContractor(null);
            }
        }
        return $this;
    }

//    public function getListaLokalizacje(): Collection
//    {
//        return $this->listaLokalizacje;
//    }
//
//    public function addListaLokalizacje(EnovaLocation $location): self
//    {
//        if (!$this->listaLokalizacje->contains($location)) {
//            $this->listaLokalizacje->add($location);
//            $location->setContractor($this);
//        }
//        return $this;
//    }
//
//    public function removeListaLokalizacje(EnovaLocation $location): self
//    {
//        if ($this->listaLokalizacje->removeElement($location)) {
//            if ($location->getContractor() === $this) {
//                $location->setContractor(null);
//            }
//        }
//        return $this;
//    }
}
