<?php

namespace App\Entity\Enova;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Metadata\ApiResource;

#[ApiResource(
    normalizationContext: ['groups' => ['enovaLocation:read']],
    denormalizationContext: ['groups' => ['enovaLocation:write']]
)]
#[ORM\Entity]
class EnovaLocation
{
    #[ORM\Id]
//    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups([ 'enovaLocation:read', 'enovaContractor:read', 'userEnova:read'])]
    private ?int $id = null;

    #[ORM\Column(type: 'string', length: 50, nullable: true)] // Made nullable
    #[Groups(['enovaLocation:read', 'enovaLocation:write', 'enovaContractor:read', 'userEnova:read'])]
    private ?string $kod = null;

    #[ORM\Column(type: 'string', length: 255, nullable: true)] // Made nullable
    #[Groups(['enovaLocation:read', 'enovaLocation:write', 'enovaContractor:read', 'userEnova:read'])]
    private ?string $nazwa = null;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(['enovaLocation:read', 'enovaLocation:write', 'enovaContractor:read', 'userEnova:read'])]
    private ?string $eMail = null;

    #[ORM\ManyToOne(cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(nullable: true)]
    #[Groups(['enovaLocation:read', 'enovaLocation:write', 'enovaContractor:read', 'userEnova:read'])]
    private ?EnovaAddress $adresLocation = null;

    #[ORM\ManyToOne(targetEntity: EnovaContractor::class, inversedBy: 'locations')]
    #[ORM\JoinColumn(name: 'id_enova', referencedColumnName: 'id_enova', nullable: false)]
    #[Groups(['enovaLocation:read', 'enovaLocation:write'])]
    private ?EnovaContractor $contractor = null;

    // Getters and Setters
    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(?int $id): void
    {
        $this->id = $id;
    }



    public function getKod(): ?string
    {
        return $this->kod;
    }

    public function setKod(?string $kod): self // Allow nullable input
    {
        $this->kod = $kod;
        return $this;
    }

    public function getNazwa(): ?string
    {
        return $this->nazwa;
    }

    public function setNazwa(?string $nazwa): self // Allow nullable input
    {
        $this->nazwa = $nazwa;
        return $this;
    }

    public function getEMail(): ?string
    {
        return $this->eMail;
    }

    public function setEMail(?string $eMail): self
    {
        $this->eMail = $eMail;
        return $this;
    }

    public function getAdresLocation(): ?EnovaAddress
    {
        return $this->adresLocation;
    }

    public function setAdresLocation(?EnovaAddress $adresLocation): void
    {
        $this->adresLocation = $adresLocation;
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
}
