<?php
// api/src/Entity/UserEnova.php

namespace App\Entity\Enova;

use ApiPlatform\Doctrine\Common\Filter\SearchFilterInterface;
use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Controller\Admin\UserRoleChangeAction;
use App\Controller\PasswordReset\PasswordResetRequestAction;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\UserRepository;
use App\State\UserPasswordHasher;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ApiResource(
    operations: [
        new GetCollection(),
        new Post(validationContext: ['groups' => ['Default', 'userEnova:create']], processor: UserPasswordHasher::class),
        new Get(),
        new Put(security: 'is_granted("ROLE_ADMIN") or object == user'),
        new Patch(security: 'is_granted("ROLE_ADMIN") or object == user',
            processor: UserPasswordHasher::class // Allow admins or the user themselves to update
        ),
        new Delete(
            security: 'is_granted("ROLE_ADMIN") or object == user' // Allow admins or the user themselves to delete
        ),
                // Forgot Password Request
        new Post(
            uriTemplate: '/forgot-password',
            controller: PasswordResetRequestAction::class,
//            security: "is_granted('ROLE_USER')",
            input: false,
            output: false,
        ),
        // Toggle Role
        new Patch(
            uriTemplate: '/user_enovas/{id}/toggle-role',
            controller: UserRoleChangeAction::class,
            openapiContext: [
                'summary' => 'Toggle user role',
                'description' => 'Allows an admin to toggle a user\'s role.'
            ],
            security: "is_granted('ROLE_ADMIN')"
        ),
    ],
    normalizationContext: ['groups' => ['userEnova:read']],
    denormalizationContext: ['groups' => ['userEnova:create', 'userEnova:update']],
),
ApiFilter(
    SearchFilter::class,
    properties: [
        'email' => SearchFilterInterface::STRATEGY_PARTIAL
    ]
)]
#[ORM\Entity(repositoryClass: UserRepository::class)]
//#[ORM\Table(name: '`user`')]
#[UniqueEntity('email')]
//#[UniqueEntity('enovaPerson.email')]  // Ensure uniqueness is on EnovaPerson's email
class UserEnova implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[Groups(['userEnova:read'])]
    #[ORM\Id]
    #[ORM\Column(type: 'integer')]
    #[ORM\GeneratedValue]
    private ?int $id = null;

    #[Assert\NotBlank]
    #[Assert\Email]
    #[Groups(['userEnova:read', 'userEnova:create', 'userEnova:update'])]
    #[ORM\Column(length: 180, unique: true)]
    private ?string $email = null;

    #[ORM\Column]
    private ?string $password = null;

    #[Assert\NotBlank(groups: ['userEnova:create'])]
    #[Groups(['userEnova:create', 'userEnova:update'])]
    private ?string $plainPassword = null;

//    #[ORM\ManyToOne(targetEntity: EnovaPerson::class)]
//    #[ORM\JoinColumn(name: 'enova_person_id', referencedColumnName: 'id', nullable: true)]
//    #[Groups(['userEnova:read', 'userEnova:create', 'userEnova:update'])]
//    private ?EnovaPerson $enovaPerson = null;
    #[ORM\ManyToOne(targetEntity: EnovaPerson::class)]
    #[ORM\JoinColumn(name: 'enova_person_id', referencedColumnName: 'id', nullable: true)]
    #[Groups(['userEnova:read', 'userEnova:create', 'userEnova:update'])]
    private ?EnovaPerson $enovaPerson = null;

    #[ORM\Column(type: 'json')]
    #[Groups(['userEnova:read', 'userEnova:update'])]
    private array $roles = [];

    public function __construct()
    {
        if (empty($this->roles)) {
            $this->roles[] = 'ROLE_USER';
        }

//        $this->regDate = new \DateTime(); // Sets the current date and time

    }
    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
//        dump($this->enovaPerson); // Check if enovaPerson is set
//        dump($this->enovaPerson?->getEmail()); // Check the email value
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

    public function getEnovaPerson(): ?EnovaPerson
    {
        return $this->enovaPerson;
    }

    public function setEnovaPerson(?EnovaPerson $enovaPerson): self
    {
        $this->enovaPerson = $enovaPerson;
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

    #[ORM\PrePersist]
    #[ORM\PreUpdate]
    public function syncEnovaPersonId(): void
    {
        if ($this->id !== null) {
            $this->enovaPerson = new EnovaPerson();
            $this->enovaPerson->setId($this->id); // Ensure the EnovaPerson entity has this ID
        }
    }
}