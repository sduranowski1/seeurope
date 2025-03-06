<?php

namespace App\EventListener;

use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;
use Symfony\Component\Security\Core\User\UserInterface;

class JWTCreatedListener
{
    public function onJWTCreated(JWTCreatedEvent $event): void
    {
        $user = $event->getUser();

        if (!$user instanceof UserInterface) {
            return;
        }

        // Get the default payload
        $payload = $event->getData();

        // Add enovaPerson email if available
        if ($user->getEnovaPerson() && $user->getEnovaPerson()->getEmail()) {
            $payload['enova_email'] = $user->getEnovaPerson()->getEmail();
        }

        // Set new payload
        $event->setData($payload);
    }
}
