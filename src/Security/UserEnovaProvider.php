<?php
namespace App\Security;

use App\Entity\Enova\UserEnova;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Core\Exception\UserNotFoundException;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\UserProviderInterface;

class UserEnovaProvider implements UserProviderInterface
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function loadUserByIdentifier(string $identifier): UserInterface
    {
        $user = $this->entityManager->getRepository(UserEnova::class)->createQueryBuilder('u')
            ->leftJoin('u.enovaPerson', 'e') // Ensure it's a LEFT JOIN to include null values
            ->where('u.email = :identifier OR e.email = :identifier')
            ->setParameter('identifier', $identifier)
            ->getQuery()
            ->getOneOrNullResult();

        if (!$user) {
            throw new UserNotFoundException(sprintf('User with email "%s" not found.', $identifier));
        }

        return $user;
    }


    public function refreshUser(UserInterface $user): UserInterface
    {
        if (!$user instanceof UserEnova) {
            throw new \InvalidArgumentException('Invalid user class.');
        }

        return $this->loadUserByIdentifier($user->getUserIdentifier());
    }

    public function supportsClass(string $class): bool
    {
        return $class === UserEnova::class;
    }
}
