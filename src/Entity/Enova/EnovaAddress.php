<?php

namespace App\Entity\Enova;

use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource]
#[ORM\Entity]
class EnovaAddress
{
    #[ORM\Id]
//    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'string')]
    #[Groups(['enovaContractor:read', 'enovaLocation:read', 'enovaPerson:read'])]
    private ?string $id = null;

    #[ORM\Column(type: 'string', nullable: true)]
    #[Groups(['enovaContractor:read', 'enovaContractor:create', 'enovaContractor:update', 'enovaLocation:read', 'enovaLocation:write', 'enovaLocation:update', 'userEnova:read', 'userEnova:create', 'userEnova:update' ])]
    private ?string $wojewodztwo = null;

    #[ORM\Column(type: 'string', nullable: true)]
    #[Groups(['enovaContractor:read', 'enovaContractor:create', 'enovaContractor:update', 'enovaLocation:read', 'enovaLocation:write', 'enovaLocation:update', 'userEnova:read', 'userEnova:create', 'userEnova:update'])]
    private ?string $gmina = null;

    #[ORM\Column(type: 'string', nullable: true)]
    #[Groups(['enovaContractor:read', 'enovaContractor:create', 'enovaContractor:update', 'enovaLocation:read', 'enovaLocation:write', 'enovaLocation:update', 'userEnova:read', 'userEnova:create', 'userEnova:update'])]
    private ?string $nrDomu = null;

    #[ORM\Column(type: 'string', nullable: true)]
    #[Groups(['enovaContractor:read', 'enovaContractor:create', 'enovaContractor:update', 'enovaLocation:read', 'enovaLocation:write', 'enovaLocation:update', 'userEnova:read', 'userEnova:create', 'userEnova:update'])]
    private ?string $nrLokalu = null;

    #[ORM\Column(type: 'string', nullable: true)]
    #[Groups(['enovaContractor:read', 'enovaContractor:create', 'enovaContractor:update', 'enovaLocation:read', 'enovaLocation:write', 'enovaLocation:update', 'userEnova:read', 'userEnova:create', 'userEnova:update'])]
    private ?string $poczta = null;

    #[ORM\Column(type: 'string', nullable: true)]
    #[Groups(['enovaContractor:read', 'enovaContractor:create', 'enovaContractor:update', 'enovaLocation:read', 'enovaLocation:write', 'enovaLocation:update', 'userEnova:read', 'userEnova:create', 'userEnova:update'])]
    private ?string $powiat = null;

    #[ORM\Column(type: 'string', nullable: true)]
    #[Groups(['enovaContractor:read', 'enovaContractor:create', 'enovaContractor:update', 'enovaLocation:read', 'enovaLocation:write', 'enovaLocation:update', 'userEnova:read', 'userEnova:create', 'userEnova:update'])]
    private ?string $ulica = null;

    #[ORM\Column(type: 'string', nullable: true)]
    #[Groups(['enovaContractor:read', 'enovaContractor:create', 'enovaContractor:update', 'enovaLocation:read', 'enovaLocation:write', 'enovaLocation:update', 'userEnova:read', 'userEnova:create', 'userEnova:update'])]
    private ?string $miejscowosc = null;

    #[ORM\Column(type: 'string', nullable: true)]
    #[Groups(['enovaContractor:read', 'enovaContractor:create', 'enovaContractor:update', 'enovaLocation:read', 'enovaLocation:write', 'enovaLocation:update', 'enovaPerson:read', 'enovaPerson:create', 'enovaPerson:update'])]
    private ?string $kodPocztowy = null;

    #[ORM\Column(type: 'string', nullable: true)]
    #[Groups(['enovaContractor:read', 'enovaContractor:create', 'enovaContractor:update', 'enovaLocation:read', 'enovaLocation:write', 'enovaLocation:update', 'enovaPerson:read', 'enovaPerson:create', 'enovaPerson:update'])]
    private ?string $kraj = null;

    public function getId(): ?string
    {
        return $this->id;
    }

    public function setId(?string $id): void
    {
        $this->id = $id;
    }



    public function getWojewodztwo(): ?string
    {
        return $this->wojewodztwo;
    }

    public function setWojewodztwo(?string $wojewodztwo): void
    {
        $this->wojewodztwo = $wojewodztwo;
    }

    public function getGmina(): ?string
    {
        return $this->gmina;
    }

    public function setGmina(?string $gmina): void
    {
        $this->gmina = $gmina;
    }

    public function getNrDomu(): ?string
    {
        return $this->nrDomu;
    }

    public function setNrDomu(?string $nrDomu): void
    {
        $this->nrDomu = $nrDomu;
    }

    public function getNrLokalu(): ?string
    {
        return $this->nrLokalu;
    }

    public function setNrLokalu(?string $nrLokalu): void
    {
        $this->nrLokalu = $nrLokalu;
    }

    public function getPoczta(): ?string
    {
        return $this->poczta;
    }

    public function setPoczta(?string $poczta): void
    {
        $this->poczta = $poczta;
    }

    public function getPowiat(): ?string
    {
        return $this->powiat;
    }

    public function setPowiat(?string $powiat): void
    {
        $this->powiat = $powiat;
    }

    public function getUlica(): ?string
    {
        return $this->ulica;
    }

    public function setUlica(?string $ulica): void
    {
        $this->ulica = $ulica;
    }

    public function getMiejscowosc(): ?string
    {
        return $this->miejscowosc;
    }

    public function setMiejscowosc(?string $miejscowosc): void
    {
        $this->miejscowosc = $miejscowosc;
    }

    public function getKodPocztowy(): ?string
    {
        return $this->kodPocztowy;
    }

    public function setKodPocztowy(?string $kodPocztowy): void
    {
        $this->kodPocztowy = $kodPocztowy;
    }

    public function getKraj(): ?string
    {
        return $this->kraj;
    }

    public function setKraj(?string $kraj): void
    {
        $this->kraj = $kraj;
    }

    // Getters and Setters for each field


}
