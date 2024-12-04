<?php
// api/src/Controller/CreateProductsMediaObjectAction.php

namespace App\Controller;

use App\Entity\CategoriesMediaObject;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

#[AsController]
final class CreateCategoriesMediaObjectAction extends AbstractController
{
    public function __invoke(Request $request): CategoriesMediaObject
    {
        $uploadedFile = $request->files->get('file');
        if (!$uploadedFile) {
            throw new BadRequestHttpException('"file" is required');
        }

        $categoriesMediaObject = new CategoriesMediaObject();
        $categoriesMediaObject->file = $uploadedFile;

        return $categoriesMediaObject;
    }
}