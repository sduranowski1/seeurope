<?php


namespace App\Entity\TestEnova;

use App\Repository\TestEnovaAddressRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: TestEnovaAddressRepository::class)]
#[ORM\Table(name: "test_enova_address")]
class TestEnovaAddress
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(['testEnovaContractor:read', 'testEnovaLocation:read', 'userEnova:read', 'testEnovaPerson:read'])]
    private ?int $id = null;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(['testEnovaContractor:read', 'testEnovaLocation:read', 'userEnova:read', 'testEnovaPerson:read'])]
    private ?string $wojewodztwo = null;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(['testEnovaContractor:read', 'testEnovaLocation:read', 'userEnova:read', 'testEnovaPerson:read'])]
    private ?string $gmina = null;

    #[ORM\Column(type: 'string', length: 50, nullable: true)]
    #[Groups(['testEnovaContractor:read', 'testEnovaLocation:read', 'userEnova:read', 'testEnovaPerson:read'])]
    private ?string $nrDomu = null;

    #[ORM\Column(type: 'string', length: 50, nullable: true)]
    #[Groups(['testEnovaContractor:read', 'testEnovaLocation:read', 'userEnova:read', 'testEnovaPerson:read'])]
    private ?string $nrLokalu = null;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(['testEnovaContractor:read', 'testEnovaLocation:read', 'userEnova:read', 'testEnovaPerson:read'])]
    private ?string $poczta = null;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(['testEnovaContractor:read', 'testEnovaLocation:read', 'userEnova:read', 'testEnovaPerson:read'])]
    private ?string $powiat = null;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(['testEnovaContractor:read', 'testEnovaLocation:read', 'userEnova:read', 'testEnovaPerson:read'])]
    private ?string $ulica = null;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(['testEnovaContractor:read', 'testEnovaLocation:read', 'userEnova:read', 'testEnovaPerson:read'])]
    private ?string $miejscowosc = null;

    #[ORM\Column(type: 'string', length: 20, nullable: true)]
    #[Groups(['testEnovaContractor:read', 'testEnovaLocation:read', 'userEnova:read', 'testEnovaPerson:read'])]
    private ?string $kodPocztowy = null;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(['testEnovaContractor:read', 'testEnovaLocation:read', 'userEnova:read', 'testEnovaPerson:read'])]
    private ?string $kraj = null;

    // Getters and Setters
    public function getId(): ?int
    {
        return $this->id;
    }

    public function getWojewodztwo(): ?string
    {
        return $this->wojewodztwo;
    }

    public function setWojewodztwo(?string $wojewodztwo): self
    {
        $this->wojewodztwo = $wojewodztwo;
        return $this;
    }

    public function getGmina(): ?string
    {
        return $this->gmina;
    }

    public function setGmina(?string $gmina): self
    {
        $this->gmina = $gmina;
        return $this;
    }

    public function getNrDomu(): ?string
    {
        return $this->nrDomu;
    }

    public function setNrDomu(?string $nrDomu): self
    {
        $this->nrDomu = $nrDomu;
        return $this;
    }

    public function getNrLokalu(): ?string
    {
        return $this->nrLokalu;
    }

    public function setNrLokalu(?string $nrLokalu): self
    {
        $this->nrLokalu = $nrLokalu;
        return $this;
    }

    public function getPoczta(): ?string
    {
        return $this->poczta;
    }

    public function setPoczta(?string $poczta): self
    {
        $this->poczta = $poczta;
        return $this;
    }

    public function getPowiat(): ?string
    {
        return $this->powiat;
    }

    public function setPowiat(?string $powiat): self
    {
        $this->powiat = $powiat;
        return $this;
    }

    public function getUlica(): ?string
    {
        return $this->ulica;
    }

    public function setUlica(?string $ulica): self
    {
        $this->ulica = $ulica;
        return $this;
    }

    public function getMiejscowosc(): ?string
    {
        return $this->miejscowosc;
    }

    public function setMiejscowosc(?string $miejscowosc): self
    {
        $this->miejscowosc = $miejscowosc;
        return $this;
    }

    public function getKodPocztowy(): ?string
    {
        return $this->kodPocztowy;
    }

    public function setKodPocztowy(?string $kodPocztowy): self
    {
        $this->kodPocztowy = $kodPocztowy;
        return $this;
    }

    public function getKraj(): ?string
    {
        return $this->kraj;
    }

    public function setKraj(?string $kraj): self
    {
        $this->kraj = $kraj;
        return $this;
    }
}