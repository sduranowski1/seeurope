<?php


namespace App\Entity\TestEnova;

use ApiPlatform\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use App\Entity\TestEnova\TestEnovaLocation;
use App\Entity\TestEnova\TestEnovaContactPerson;
use App\Entity\TestEnova\TestEnovaAddress;
use App\Repository\TestEnovaContractorRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource(
    normalizationContext: ['groups' => ['testEnovaContractor:read']],
    denormalizationContext: ['groups' => ['testEnovaContractor:create']]
)]
#[ApiFilter(SearchFilter::class, properties: ['nazwa' => 'partial'])]
#[ApiFilter(OrderFilter::class, properties: ['id', 'nazwa'])]
#[ORM\Entity(repositoryClass: TestEnovaContractorRepository::class)]
#[ORM\Table(name: "test_enova_contractor")]
class TestEnovaContractor
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(["testEnovaContractor:read", 'userEnova:read'])]
    private ?int $id = null;

    #[ORM\Column(type: 'integer')]
    #[Groups(["testEnovaContractor:read", 'testEnovaPerson:read',  'userEnova:read'])]
    private ?int $idEnova = null;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(["testEnovaContractor:read", 'testEnovaLocation:read'])]
    private ?string $kod = null;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(["testEnovaContractor:read", 'testEnovaLocation:read', 'testEnovaPerson:read', 'userEnova:read'])]
    private ?string $nazwa = null;

    #[ORM\Column(type: 'string', length: 20, nullable: true)]
    #[Groups(["testEnovaContractor:read"])]
    private ?string $nip = null;

    #[ORM\Column(type: 'string', length: 20, nullable: true)]
    #[Groups(["testEnovaContractor:read"])]
    private ?string $regon = null;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(["testEnovaContractor:read", 'testEnovaPerson:read'])]
    private ?string $email = null;

    #[ORM\Column(type: 'string', length: 50, nullable: true)]
    #[Groups(["testEnovaContractor:read", 'testEnovaPerson:read'])]
    private ?string $telefon = null;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(["testEnovaContractor:read", 'testEnovaPerson:read', 'userEnova:read'])]
    private ?string $cenaKontrahentaNazwa = null;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(["testEnovaContractor:read"])]
    private ?string $adresUlica = null;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(["testEnovaContractor:read"])]
    private ?string $adresMiejscowosc = null;

    #[ORM\Column(type: 'string', length: 20, nullable: true)]
    #[Groups(["testEnovaContractor:read"])]
    private ?string $adresKodPocztowy = null;

    #[ORM\OneToMany(targetEntity: TestEnovaContactPerson::class, mappedBy: 'contractor', cascade: ['persist'])]
    #[Groups(["testEnovaContractor:read"])]
    private Collection $contactPersons;

    #[ORM\OneToMany(targetEntity: TestEnovaLocation::class, mappedBy: 'contractor', cascade: ['persist'])]
    #[Groups(["testEnovaContractor:read", 'testEnovaPerson:read'])]
    private Collection $locations;

    #[ORM\ManyToOne(targetEntity: TestEnovaAddress::class, cascade: ['persist'])]
    #[Groups(["testEnovaContractor:read", 'testEnovaPerson:read'])]
    #[ORM\JoinColumn(name: 'adres_id', referencedColumnName: 'id')]
    private ?TestEnovaAddress $adres = null;

    #[ORM\ManyToOne(targetEntity: TestEnovaAddress::class, cascade: ['persist'])]
    #[Groups(["testEnovaContractor:read"])]
    #[ORM\JoinColumn(name: 'adres_korespondencyjny_id', referencedColumnName: 'id')]
    private ?TestEnovaAddress $adresKorespondencyjny = null;

    public function __construct()
    {
        $this->contactPersons = new ArrayCollection();
        $this->locations = new ArrayCollection();
    }

    public function getContactPersons(): Collection
    {
        return $this->contactPersons;
    }

    public function addContactPerson(TestEnovaContactPerson $contactPerson): self
    {
        if (!$this->contactPersons->contains($contactPerson)) {
            $this->contactPersons[] = $contactPerson;
            $contactPerson->setContractor($this);
        }
        return $this;
    }

    public function getLocations(): Collection
    {
        return $this->locations;
    }

    public function addLocation(TestEnovaLocation $location): self
    {
        if (!$this->locations->contains($location)) {
            $this->locations[] = $location;
            $location->setContractor($this);
        }
        return $this;
    }

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

    public function getAdresKorespondencyjny(): ?TestEnovaAddress
    {
        return $this->adresKorespondencyjny;
    }

    public function setAdresKorespondencyjny(?TestEnovaAddress $adresKorespondencyjny): self
    {
        $this->adresKorespondencyjny = $adresKorespondencyjny;
        return $this;
    }

    // Getters and Setters
    public function getId(): ?int
    {
        return $this->id;
    }

    public function setIdEnova(int $idEnova): self
    {
        $this->idEnova = $idEnova;
        return $this;
    }

    public function getIdEnova(): ?int
    {
        return $this->idEnova;
    }

    public function setKod(string $kod): self
    {
        $this->kod = $kod;
        return $this;
    }

    public function getKod(): ?string
    {
        return $this->kod;
    }

    public function setNazwa(string $nazwa): self
    {
        $this->nazwa = $nazwa;
        return $this;
    }

    public function getNazwa(): ?string
    {
        return $this->nazwa;
    }

    public function setNip(?string $nip): self
    {
        $this->nip = $nip;
        return $this;
    }

    public function getNip(): ?string
    {
        return $this->nip;
    }

    public function setRegon(?string $regon): self
    {
        $this->regon = $regon;
        return $this;
    }

    public function getRegon(): ?string
    {
        return $this->regon;
    }

    public function setEmail(?string $email): self
    {
        $this->email = $email;
        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setTelefon(?string $telefon): self
    {
        $this->telefon = $telefon;
        return $this;
    }

    public function getTelefon(): ?string
    {
        return $this->telefon;
    }

    public function setCenaKontrahentaNazwa(?string $cenaKontrahentaNazwa): self
    {
        $this->cenaKontrahentaNazwa = $cenaKontrahentaNazwa;
        return $this;
    }

    public function getCenaKontrahentaNazwa(): ?string
    {
        return $this->cenaKontrahentaNazwa;
    }

    public function setAdresUlica(?string $adresUlica): self
    {
        $this->adresUlica = $adresUlica;
        return $this;
    }

    public function getAdresUlica(): ?string
    {
        return $this->adresUlica;
    }

    public function setAdresMiejscowosc(?string $adresMiejscowosc): self
    {
        $this->adresMiejscowosc = $adresMiejscowosc;
        return $this;
    }

    public function getAdresMiejscowosc(): ?string
    {
        return $this->adresMiejscowosc;
    }

    public function setAdresKodPocztowy(?string $adresKodPocztowy): self
    {
        $this->adresKodPocztowy = $adresKodPocztowy;
        return $this;
    }

    public function getAdresKodPocztowy(): ?string
    {
        return $this->adresKodPocztowy;
    }
}