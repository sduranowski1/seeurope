<?php

namespace App\Entity\Enova;

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
    'imie' => 'partial',
    'nazwisko' => 'partial'])]
#[ORM\Entity]
class EnovaPerson
{
    #[ORM\Id]
//    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(['enovaPerson:read'])]
    private ?int $id = null;

    #[ORM\Column(type: 'string')]
    #[Groups(['enovaPerson:read', 'enovaPerson:create', 'enovaPerson:update'])]
    private ?string $imie = null;

    #[ORM\Column(type: 'string')]
    #[Groups(['enovaPerson:read', 'enovaPerson:create', 'enovaPerson:update'])]
    private ?string $nazwisko = null;

    #[ORM\ManyToOne(targetEntity: EnovaContractor::class, inversedBy: 'listaOsobyKontrahenta')]
    #[ORM\JoinColumn(referencedColumnName: 'id_enova', nullable: false)]
    #[Groups(['enovaPerson:read', 'enovaPerson:create'])]
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
