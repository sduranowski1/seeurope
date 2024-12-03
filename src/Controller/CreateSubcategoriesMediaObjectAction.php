<?php
// api/src/Controller/CreateMediaObjectAction.php

namespace App\Controller;

use App\Entity\SubcategoriesMediaObject;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

#[AsController]
final class CreateSubcategoriesMediaObjectAction extends AbstractController
{
    public function __invoke(Request $request): SubcategoriesMediaObject
    {
        $uploadedFile = $request->files->get('file');
        if (!$uploadedFile) {
            throw new BadRequestHttpException('"file" is required');
        }

        $subcategoriesMediaObject = new SubcategoriesMediaObject();
        $subcategoriesMediaObject->file = $uploadedFile;

        return $subcategoriesMediaObject;
    }
}