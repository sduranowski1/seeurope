<?php

namespace App\Entity\Enova;

use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ApiResource(
//    normalizationContext: ['groups' => ['enovaProduct:read']],
//    denormalizationContext: ['groups' => ['enovaProduct:create']]

)]
#[ApiFilter(SearchFilter::class, properties: [
    'nazwa' => 'partial'])]
#[ORM\Entity]
class EnovaContractor
{
    #[ORM\Id]
    #[ORM\Column(name: 'id_enova', type: 'integer', unique: true)]
    private ?int $idEnova = null;

    #[ORM\Column(type: 'string')]
    private ?string $nazwa = null;

    #[ORM\OneToMany(mappedBy: 'contractor', targetEntity: EnovaPerson::class, cascade: ['persist', 'remove'])]
    private Collection $listaOsobyKontrahenta;

    public function __construct()
    {
        $this->listaOsobyKontrahenta = new ArrayCollection();
    }

    public function getIdEnova(): ?int
    {
        return $this->idEnova;
    }

    public function setIdEnova(int $idEnova): self
    {
        $this->idEnova = $idEnova;
        return $this;
    }

    public function getNazwa(): ?string
    {
        return $this->nazwa;
    }

    public function setNazwa(?string $nazwa): void
    {
        $this->nazwa = $nazwa;
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
}
