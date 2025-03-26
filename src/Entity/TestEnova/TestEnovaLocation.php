<?php


namespace App\Entity\TestEnova;

use ApiPlatform\Metadata\ApiResource;
use App\Entity\TestEnova\TestEnovaContractor;
use App\Repository\TestEnovaLocationRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource(
    normalizationContext: ['groups' => ['testEnovaLocation:read']],
    denormalizationContext: ['groups' => ['testEnovaLocation:write']]
)]
#[ORM\Entity(repositoryClass: TestEnovaLocationRepository::class)]
#[ORM\Table(name: "test_enova_location")]
class TestEnovaLocation
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups([ 'testEnovaLocation:read', 'testEnovaContractor:read', 'userEnova:read', 'testEnovaPerson:read'])]
    private ?int $id = null;

    #[ORM\Column(type: 'integer')]
    #[Groups([ 'testEnovaLocation:read', 'testEnovaContractor:read', 'userEnova:read', 'testEnovaPerson:read'])]
    private ?int $uuid = null;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups([ 'testEnovaLocation:read', 'testEnovaContractor:read', 'userEnova:read', 'testEnovaPerson:read'])]
    private ?string $kod = null;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups([ 'testEnovaLocation:read', 'testEnovaContractor:read', 'userEnova:read', 'testEnovaPerson:read'])]
    private ?string $nazwa = null;

//    #[ORM\Column(type: 'string', length: 255, nullable: true)]
//    private ?string $eMail = null;
//
//    #[ORM\Column(type: 'string', length: 255, nullable: true)]
//    private ?string $nazwaOdbierajacego = null;
//
//    #[ORM\Column(type: 'integer')]
//    private ?int $idWWW = null;

    #[ORM\ManyToOne(targetEntity: TestEnovaContractor::class, inversedBy: 'locations')]
    #[ORM\JoinColumn(name: 'contractor_id', referencedColumnName: 'id')]
    #[Groups([ 'testEnovaLocation:read'])]
    private ?TestEnovaContractor $contractor = null;

    #[ORM\ManyToOne(targetEntity: TestEnovaAddress::class, cascade: ['persist'])]
    #[ORM\JoinColumn(name: 'adres_id', referencedColumnName: 'id')]
    #[Groups([ 'testEnovaLocation:read', 'testEnovaContractor:read', 'userEnova:read'])]
    private ?TestEnovaAddress $adres = null;

// Getters and Setters
    public function getAdres(): ?TestEnovaAddress
    {
        return $this->adres;
    }

    public function setAdres(?TestEnovaAddress $adres): self
    {
        $this->adres = $adres;
        return $this;
    }

    // Getters and Setters
    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(?int $id): void
    {
        $this->id = $id;
    }



    public function getUuid(): ?int
    {
        return $this->uuid;
    }

    public function setUuid(?int $uuid): void
    {
        $this->uuid = $uuid;
    }



    public function getKod(): ?string
    {
        return $this->kod;
    }

    public function setKod(string $kod): self
    {
        $this->kod = $kod;
        return $this;
    }

    public function getNazwa(): ?string
    {
        return $this->nazwa;
    }

    public function setNazwa(string $nazwa): self
    {
        $this->nazwa = $nazwa;
        return $this;
    }

//    public function getEMail(): ?string
//    {
//        return $this->eMail;
//    }
//
//    public function setEMail(?string $eMail): self
//    {
//        $this->eMail = $eMail;
//        return $this;
//    }
//
//    public function getNazwaOdbierajacego(): ?string
//    {
//        return $this->nazwaOdbierajacego;
//    }
//
//    public function setNazwaOdbierajacego(?string $nazwaOdbierajacego): self
//    {
//        $this->nazwaOdbierajacego = $nazwaOdbierajacego;
//        return $this;
//    }
//
//    public function getIdWWW(): ?int
//    {
//        return $this->idWWW;
//    }
//
//    public function setIdWWW(int $idWWW): self
//    {
//        $this->idWWW = $idWWW;
//        return $this;
//    }

    public function getContractor(): ?TestEnovaContractor
    {
        return $this->contractor;
    }

    public function setContractor(?TestEnovaContractor $contractor): self
    {
        $this->contractor = $contractor;
        return $this;
    }
}