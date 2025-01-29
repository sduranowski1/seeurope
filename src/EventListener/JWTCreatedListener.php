<?php

// src/EventListener/JWTCreatedListener.php
namespace App\EventListener;

use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;
use Symfony\Component\Security\Core\User\UserInterface;

class JWTCreatedListener
{
    public function onJWTCreated(JWTCreatedEvent $event)
    {
        // Get current user from the token event
        $user = $event->getUser();

        // Check if the user is an instance of UserInterface (your user entity)
        if (!$user instanceof UserInterface) {
            return;
        }

        // Get current data of the token
        $data = $event->getData();

        // Add user ID to the token payload
        $data['id'] = $user->getId();

        // Add username to the token payload
        $data['username'] = $user->getUsername();

        // Check if the user has a contractor and add cenaContrahentaNazwa if it exists
        $contractor = $user->getContractor();
        if ($contractor && $contractor->getCenaContrahentaNazwa()) {
            $data['cenaContrahentaNazwa'] = $contractor->getCenaContrahentaNazwa();
        }

        // Set the new data in the event
        $event->setData($data);
    }
}
