<?php
// api/src/Controller/CreateMediaObjectAction.php

namespace App\Controller;

use App\Entity\VariantsMediaObject;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

#[AsController]
final class CreateVariantsMediaObjectAction extends AbstractController
{
    public function __invoke(Request $request): VariantsMediaObject
    {
        $uploadedFile = $request->files->get('file');
        if (!$uploadedFile) {
            throw new BadRequestHttpException('"file" is required');
        }

        $variantsMediaObject = new VariantsMediaObject();
        $variantsMediaObject->file = $uploadedFile;

        return $variantsMediaObject;
    }
}