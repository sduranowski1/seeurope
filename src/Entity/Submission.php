<?php
// api/src/Entity/Submission.php

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\State\SubmissionPasswordHasher;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\SubmissionRepository;
use App\State\UserPasswordHasher;
use Ramsey\Uuid\Guid\Guid;
use Ramsey\Uuid\Uuid;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ApiResource(
    operations: [
        new GetCollection(),
        new Post(validationContext: ['groups' => ['Default', 'submission:create']], processor: SubmissionPasswordHasher::class),
        new Get(),
        new Put(processor: SubmissionPasswordHasher::class),
        new Patch(processor: SubmissionPasswordHasher::class),
        new Delete(),
    ],
    normalizationContext: ['groups' => ['submission:read']],
    denormalizationContext: ['groups' => ['submission:create', 'submission:update']],
)]
//#[ApiResource()]
#[ORM\Entity(repositoryClass: SubmissionRepository::class)]
#[ApiFilter(OrderFilter::class, properties: ['id', 'email', 'firstname', 'surname', 'enabled'])]
//#[ORM\Table(name: '`submission`')]
#[UniqueEntity('email')]
class Submission implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[Groups(['submission:read'])]
    #[ORM\Id]
    #[ORM\Column(type: 'string', unique: true)]
//    #[ORM\GeneratedValue]
    private ?string $id;

    #[Assert\NotBlank]
    #[Assert\Email]
    #[Groups(['submission:read', 'submission:create', 'submission:update'])]
    #[ORM\Column(length: 180, unique: true)]
    private ?string $email = null;

    #[ORM\Column]
    private ?string $password = null;

    #[Assert\NotBlank(groups: ['submission:create'])]
    #[Groups(['submission:create', 'submission:update'])]
    private ?string $plainPassword = null;

    #[ORM\Column(length: 50)]
    #[Groups(['submission:read', 'submission:create', 'submission:update'])]
    private ?string $firstname = null;

    #[ORM\Column(length: 50)]
    #[Groups(['submission:read', 'submission:create', 'submission:update'])]
    private ?string $surname = null;

    #[ORM\Column(length: 255)]
    #[Groups(['submission:read', 'submission:create', 'submission:update'])]
    private ?string $company = null;

    #[ORM\Column(length: 255)]
    #[Groups(['submission:read', 'submission:create', 'submission:update'])]
    private ?string $address = null;

    #[ORM\Column(length: 10)]
    #[Groups(['submission:read', 'submission:create', 'submission:update'])]
    private ?string $zipCode = null;

    #[ORM\Column(length: 20)]
    #[Groups(['submission:read', 'submission:create', 'submission:update'])]
    private ?string $country = null;

    #[ORM\Column]
    #[Groups(['submission:read', 'submission:create', 'submission:update'])]
    private ?int $phone = null;

    #[ORM\Column(length: 255)]
    #[Groups(['submission:read', 'submission:create', 'submission:update'])]
    private ?string $machineType = null;

    #[ORM\Column(length: 255)]
    #[Groups(['submission:read', 'submission:create', 'submission:update'])]
    private ?string $consideredProducts = null;

    #[ORM\Column(type: Types::TEXT)]
    #[Groups(['submission:read', 'submission:create', 'submission:update'])]
    private ?string $message = null;

    #[ORM\Column(type: 'json')]
    #[Groups(['submission:read', 'submission:update'])]
    private array $roles = [];

    #[ORM\Column(type: 'boolean')]
    #[Groups(['submission:read', 'submission:create', 'submission:update'])]
    private bool $enabled = false;

    public function __construct()
    {
        $timestamp = date('YmdHis'); // Current time: YYYYMMDDHHmmss
        $randomPart = substr(Uuid::uuid4()->getHex(), 0, 6); // 6 random hex chars
        $this->id = "{$timestamp}-{$randomPart}"; // Example: 20240327123845-a1b2c3
    }


    public function getId(): ?string
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    public function getPlainPassword(): ?string
    {
        return $this->plainPassword;
    }

    public function setPlainPassword(?string $plainPassword): self
    {
        $this->plainPassword = $plainPassword;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;

        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials(): void
    {
        $this->plainPassword = null;
    }

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(string $firstname): static
    {
        $this->firstname = $firstname;

        return $this;
    }
    public function getSurname(): ?string
    {
        return $this->surname;
    }

    public function setSurname(string $surname): static
    {
        $this->surname = $surname;

        return $this;
    }

    public function getCompany(): ?string
    {
        return $this->company;
    }

    public function setCompany(string $company): static
    {
        $this->company = $company;

        return $this;
    }

    public function getAddress(): ?string
    {
        return $this->address;
    }

    public function setAddress(string $address): static
    {
        $this->address = $address;

        return $this;
    }

    public function getZipCode(): ?string
    {
        return $this->zipCode;
    }

    public function setZipCode(string $zipCode): static
    {
        $this->zipCode = $zipCode;

        return $this;
    }

    public function getCountry(): ?string
    {
        return $this->country;
    }

    public function setCountry(string $country): static
    {
        $this->country = $country;

        return $this;
    }

    public function getPhone(): ?int
    {
        return $this->phone;
    }

    public function setPhone(int $phone): static
    {
        $this->phone = $phone;

        return $this;
    }

    public function getMachineType(): ?string
    {
        return $this->machineType;
    }

    public function setMachineType(string $machineType): static
    {
        $this->machineType = $machineType;

        return $this;
    }

    public function getConsideredProducts(): ?string
    {
        return $this->consideredProducts;
    }

    public function setConsideredProducts(string $consideredProducts): static
    {
        $this->consideredProducts = $consideredProducts;

        return $this;
    }

    public function getMessage(): ?string
    {
        return $this->message;
    }

    public function setMessage(string $message): static
    {
        $this->message = $message;

        return $this;
    }


    // Add getter and setter methods for the enabled property
    public function isEnabled(): bool
    {
        return $this->enabled;
    }

    public function setEnabled(bool $enabled): self
    {
        $this->enabled = $enabled;

        return $this;
    }
}