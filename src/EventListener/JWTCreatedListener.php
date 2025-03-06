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

        // Set the new data in the event
        $event->setData($data);
    }
}