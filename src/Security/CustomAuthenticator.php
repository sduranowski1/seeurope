<?php
// src/Security/CustomAuthenticator.php
namespace App\Security;

use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\Exception\UserNotFoundException;
use Symfony\Component\Security\Core\User\UserProviderInterface;
use Symfony\Component\Security\Core\User\PasswordUpgraderInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Security\Http\Authenticator\AbstractAuthenticator;
use Symfony\Component\Security\Http\Authenticator\Passport\Passport;
use Symfony\Component\Security\Http\Authenticator\Passport\SelfValidatingPassport;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\UserBadge;

class CustomAuthenticator extends AbstractAuthenticator
{
    private UserProviderInterface $userEnovaProvider;
    private UserProviderInterface $submissionProvider;
    private UserPasswordHasherInterface $passwordHasher;

    private JWTTokenManagerInterface $jwtManager;

    public function __construct(
        JWTTokenManagerInterface $jwtManager,

        UserProviderInterface $userEnovaProvider,
        UserProviderInterface $submissionProvider,
        UserPasswordHasherInterface $passwordHasher
    ) {
        $this->jwtManager = $jwtManager;

        $this->userEnovaProvider = $userEnovaProvider;
        $this->submissionProvider = $submissionProvider;
        $this->passwordHasher = $passwordHasher;
    }

    public function supports(Request $request): bool
    {
        return $request->getPathInfo() === '/auth' && $request->isMethod('POST');
    }

    public function authenticate(Request $request): Passport
    {
        // Check if the request is JSON
        $data = json_decode($request->getContent(), true);

        if (!$data || !isset($data['email']) || !isset($data['password'])) {
            throw new AuthenticationException('Email and password must be provided.');
        }

        $email = $data['email'];
        $password = $data['password'];

        $userBadge = new UserBadge($email, function ($email) use ($password) {
            return $this->getUser($email, $password);
        });

        return new SelfValidatingPassport($userBadge);
    }


    private function getUser(string $email, string $password)
    {
        // Try UserEnova provider
        try {
            $user = $this->userEnovaProvider->loadUserByIdentifier($email);
            if ($this->passwordHasher->isPasswordValid($user, $password)) {
                return $user;
            }
        } catch (UserNotFoundException $e) {
            // Ignore and try next provider
        }

        // Try Submission provider
        try {
            $user = $this->submissionProvider->loadUserByIdentifier($email);
            if ($this->passwordHasher->isPasswordValid($user, $password)) {
                return $user;
            }
        } catch (UserNotFoundException $e) {
            // No providers match
        }

        throw new AuthenticationException('Invalid credentials.');
    }

    public function onAuthenticationSuccess(
        Request                                                                                $request,
        PassportInterface|\Symfony\Component\Security\Core\Authentication\Token\TokenInterface $passport,
        string                                                                                 $firewallName
    ): JsonResponse {
        $user = $passport->getUser();
        $token = $this->jwtManager->create($user); // Generate the JWT token

        return new JsonResponse([
            'message' => 'Authentication successful!',
            'token' => $token,
        ]);
    }

    public function onAuthenticationFailure(Request $request, AuthenticationException $exception): Response
    {
        return new JsonResponse([
            'error' => 'Authentication failed',
            'message' => $exception->getMessage(),
        ], Response::HTTP_UNAUTHORIZED);
    }
}
