<?php

// src/Controller/PasswordResetRequestAction.php
namespace App\Controller\PasswordReset;

//use App\Dto\PasswordResetRequest;
use App\Entity\Enova\UserEnova;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Twig\Environment;

class PasswordResetRequestAction extends AbstractController
{
    #[Route('/api/forgot-password', name: 'forgot_password', methods: ['POST'])]
    public function __invoke(
//        PasswordResetRequest        $data,
        Request                     $request,
        EntityManagerInterface      $em,
        MailerInterface             $mailer,
        UserPasswordHasherInterface $passwordHasher, // Inject password hasher
        Environment                 $twig
    ): Response
    {
        // Decode incoming request data
        $data = json_decode($request->getContent(), true);
        $email = $data['email'] ?? null;

        // Check if email was provided
        if (!$email) {
            return $this->json(['error' => 'Email is required'], Response::HTTP_BAD_REQUEST);
        }

        // Find user by email
        $user = $em->getRepository(UserEnova::class)->findOneBy(['email' => $email]);

        // Check if user exists
        if (!$user) {
            return $this->json(['error' => 'User not found'], Response::HTTP_NOT_FOUND);
        }

        // Generate a temporary password (e.g., 12 characters long)
        $temporaryPassword = bin2hex(random_bytes(6)); // Generates a 12-character password

        // Hash the temporary password
        $hashedPassword = $passwordHasher->hashPassword($user, $temporaryPassword);

        // Update the user with the new temporary password
        $user->setPassword($hashedPassword);
        $em->flush();

        $emailBody = $twig->render("emails/password_reset.html.twig", ["temporaryPassword" => $temporaryPassword]);

        // Prepare email with temporary password
        $emailMessage = (new Email())
            ->from('webservice@seequipment.pl')
            ->to($email)
            ->subject('Tymczasowe hasło dla twojego konta')
//            ->html("<p>Your temporary password is: <strong>{$temporaryPassword}</strong></p><p>Please log in with this password and change it once logged in.</p>");
            ->html($emailBody);

        // Send the email
        $mailer->send($emailMessage);

        // Return success message
        return $this->json(['message' => 'Temporary password has been sent to your email'], Response::HTTP_OK);
    }
}
