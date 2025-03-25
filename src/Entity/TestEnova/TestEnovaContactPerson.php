<?php


namespace App\Entity\TestEnova;

use ApiPlatform\Doctrine\Common\Filter\SearchFilterInterface;
use ApiPlatform\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Repository\TestEnovaContactPersonRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource(
    operations: [
        new GetCollection(),
        new GetCollection(
            uriTemplate: '/test_enova_contact_people/by_uuid'
        ),
        new Post(),
        new Get(),
        new Put(),
        new Patch(),
        new Delete()
    ],
    normalizationContext: ['groups' => ['testEnovaPerson:read']],
    denormalizationContext: ['groups' => ['testEnovaPerson:create']]

)]
#[ApiFilter(SearchFilter::class, properties: [
    'id' => SearchFilterInterface::STRATEGY_PARTIAL,
    'imie' => 'partial',
    'uuid' => 'exact',
    'nazwisko' => 'partial'])]
#[ApiFilter(OrderFilter::class, properties: ['id', 'imie', 'nazwisko'])]
#[ORM\Entity(repositoryClass: TestEnovaContactPersonRepository::class)]
#[ORM\Table(name: "test_enova_contact_person")]
class TestEnovaContactPerson
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(["testEnovaPerson:read", "testEnovaContractor:read", 'userEnova:read'])]
    private ?int $id = null;

    #[ORM\Column(type: 'uuid')]
    #[Groups(["testEnovaPerson:read", "testEnovaContractor:read", 'userEnova:read'])]
    private ?int $uuid = null;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(["testEnovaPerson:read", "testEnovaContractor:read", 'userEnova:read'])]
    private ?string $imie = null;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(["testEnovaPerson:read", "testEnovaContractor:read", 'userEnova:read'])]
    private ?string $nazwisko = null;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(["testEnovaPerson:read", "testEnovaContractor:read", 'userEnova:read'])]
    private ?string $stanowisko = null;

//    #[ORM\Column(type: 'integer')]
//    private ?int $idKontrahent = null;
//
    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(["testEnovaPerson:read", "testEnovaContractor:read", 'userEnova:read'])]
    private ?string $email = null;

    #[ORM\Column(type: 'string', length: 50, nullable: true)]
    #[Groups(["testEnovaPerson:read", "testEnovaContractor:read", 'userEnova:read'])]
    private ?string $telKomorkowy = null;

    #[ORM\Column(type: 'boolean')]
    #[Groups(["testEnovaPerson:read", "testEnovaContractor:read", 'userEnova:read'])]
    private ?bool $dostepDoWWW = false;

    #[ORM\Column(type: 'boolean')]
    #[Groups(["testEnovaPerson:read", "testEnovaContractor:read", 'userEnova:read'])]
    private ?bool $prawoDoZamowien = false;

    #[ORM\ManyToOne(targetEntity: TestEnovaContractor::class, inversedBy: 'contactPersons')]
    #[ORM\JoinColumn(name: 'contractor_id', referencedColumnName: 'id')]
    #[Groups(["testEnovaPerson:read", 'userEnova:read'])]
    private ?TestEnovaContractor $contractor = null;

    #[ORM\ManyToOne(targetEntity: TestEnovaAddress::class, cascade: ['persist'])]
    #[ORM\JoinColumn(name: 'adres_id', referencedColumnName: 'id')]
    #[Groups(["testEnovaPerson:read"])]
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

    public function getUuid(): ?int
    {
        return $this->uuid;
    }

    public function setUuid(?int $uuid): void
    {
        $this->uuid = $uuid;
    }

    public function getImie(): ?string
    {
        return $this->imie;
    }

    public function setImie(string $imie): self
    {
        $this->imie = $imie;
        return $this;
    }

    public function getNazwisko(): ?string
    {
        return $this->nazwisko;
    }

    public function setNazwisko(string $nazwisko): self
    {
        $this->nazwisko = $nazwisko;
        return $this;
    }

    public function getStanowisko(): ?string
    {
        return $this->stanowisko;
    }

    public function setStanowisko(?string $stanowisko): self
    {
        $this->stanowisko = $stanowisko;
        return $this;
    }

//    public function getIdKontrahent(): ?int
//    {
//        return $this->idKontrahent;
//    }
//
//    public function setIdKontrahent(int $idKontrahent): self
//    {
//        $this->idKontrahent = $idKontrahent;
//        return $this;
//    }
//
    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(?string $email): self
    {
        $this->email = $email;
        return $this;
    }

    public function getTelKomorkowy(): ?string
    {
        return $this->telKomorkowy;
    }

    public function setTelKomorkowy(?string $telKomorkowy): self
    {
        $this->telKomorkowy = $telKomorkowy;
        return $this;
    }

    public function isDostepDoWWW(): ?bool
    {
        return $this->dostepDoWWW;
    }

    public function setDostepDoWWW(bool $dostepDoWWW): self
    {
        $this->dostepDoWWW = $dostepDoWWW;
        return $this;
    }

    public function isPrawoDoZamowien(): ?bool
    {
        return $this->prawoDoZamowien;
    }

    public function setPrawoDoZamowien(bool $prawoDoZamowien): self
    {
        $this->prawoDoZamowien = $prawoDoZamowien;
        return $this;
    }

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