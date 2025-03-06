<?php

namespace App\Entity\Enova;

use ApiPlatform\Doctrine\Common\Filter\SearchFilterInterface;
use ApiPlatform\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource(
    normalizationContext: ['groups' => ['enovaPerson:read']],
    denormalizationContext: ['groups' => ['enovaPerson:create']]

)]
#[ApiFilter(SearchFilter::class, properties: [
    'id' => SearchFilterInterface::STRATEGY_PARTIAL,
    'imie' => 'partial',
    'nazwisko' => 'partial'])]
#[ORM\Entity]
#[ApiFilter(OrderFilter::class, properties: ['id', 'imie', 'nazwisko'])]
class EnovaPerson
{
    #[ORM\Id]
//    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(['enovaPerson:read', 'enovaContractor:read', 'userEnova:read'])]
    private ?int $id = null;

    #[ORM\Column(type: 'string')]
    #[Groups(['enovaPerson:read', 'enovaPerson:create', 'enovaPerson:update', 'enovaContractor:read', 'enovaContractor:create', 'enovaContractor:update', 'userEnova:read'])]
    private ?string $imie = null;

    #[ORM\Column(type: 'string')]
    #[Groups(['enovaPerson:read', 'enovaPerson:create', 'enovaPerson:update', 'enovaContractor:read', 'enovaContractor:create', 'enovaContractor:update', 'userEnova:read'])]
    private ?string $nazwisko = null;

    #[ORM\Column(type: 'string')]
    #[Groups(['enovaPerson:read', 'enovaPerson:create', 'enovaPerson:update', 'enovaContractor:read', 'enovaContractor:create', 'enovaContractor:update', 'userEnova:read'])]
    private ?string $stanowisko = null;

    #[ORM\Column(type: 'string')]
    #[Groups(['enovaPerson:read', 'enovaPerson:create', 'enovaPerson:update', 'enovaContractor:read', 'enovaContractor:create', 'enovaContractor:update', 'userEnova:read'])]
    private ?string $email = null;

    #[ORM\Column(type: 'string')]
    #[Groups(['enovaPerson:read', 'enovaPerson:create', 'enovaPerson:update', 'enovaContractor:read', 'enovaContractor:create', 'enovaContractor:update', 'userEnova:read'])]
    private ?string $telKomorkowy = null;

    // New properties
    #[ORM\Column(type: 'boolean')]
    #[Groups(['enovaPerson:read', 'enovaPerson:create', 'enovaPerson:update', 'enovaContractor:read', 'enovaContractor:create', 'enovaContractor:update', 'userEnova:read'])]
    private bool $dostepDoWWW = false;

    #[ORM\Column(type: 'boolean')]
    #[Groups(['enovaPerson:read', 'enovaPerson:create', 'enovaPerson:update', 'enovaContractor:read', 'enovaContractor:create', 'enovaContractor:update', 'userEnova:read'])]
    private bool $prawoDoZamowien = false;

    #[ORM\ManyToOne(targetEntity: EnovaContractor::class, inversedBy: 'listaOsobyKontrahenta')]
    #[ORM\JoinColumn(referencedColumnName: 'id_enova', nullable: false)]
    #[Groups(['enovaPerson:read', 'enovaPerson:create', 'userEnova:read'])]
    private ?EnovaContractor $contractor = null;


    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(?int $id): void
    {
        $this->id = $id;
    }



    public function getImie(): ?string
    {
        return $this->imie;
    }

    public function setImie(?string $imie): void
    {
        $this->imie = $imie;
    }

    public function getNazwisko(): ?string
    {
        return $this->nazwisko;
    }

    public function setNazwisko(?string $nazwisko): void
    {
        $this->nazwisko = $nazwisko;
    }

    public function getStanowisko(): ?string
    {
        return $this->stanowisko;
    }

    public function setStanowisko(?string $stanowisko): void
    {
        $this->stanowisko = $stanowisko;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(?string $email): void
    {
        $this->email = $email;
    }

    public function getTelKomorkowy(): ?string
    {
        return $this->telKomorkowy;
    }

    public function setTelKomorkowy(?string $telKomorkowy): void
    {
        $this->telKomorkowy = $telKomorkowy;
    }



    public function getContractor(): ?EnovaContractor
    {
        return $this->contractor;
    }

    public function setContractor(?EnovaContractor $contractor): self
    {
        $this->contractor = $contractor;
        return $this;
    }

    public function isDostepDoWWW(): bool
    {
        return $this->dostepDoWWW;
    }

    public function setDostepDoWWW(bool $dostepDoWWW): void
    {
        $this->dostepDoWWW = $dostepDoWWW;
    }

    public function isPrawoDoZamowien(): bool
    {
        return $this->prawoDoZamowien;
    }

    public function setPrawoDoZamowien(bool $prawoDoZamowien): void
    {
        $this->prawoDoZamowien = $prawoDoZamowien;
    }


}
