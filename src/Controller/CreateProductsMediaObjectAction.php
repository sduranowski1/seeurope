<?php
// api/src/Controller/CreateProductsMediaObjectAction.php

namespace App\Controller;

use App\Entity\ProductsMediaObject;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

#[AsController]
final class CreateProductsMediaObjectAction extends AbstractController
{
    public function __invoke(Request $request): ProductsMediaObject
    {
        $uploadedFile = $request->files->get('file');
        if (!$uploadedFile) {
            throw new BadRequestHttpException('"file" is required');
        }

        $productsObject = new ProductsMediaObject();
        $productsObject->file = $uploadedFile;

        return $productsObject;
    }
}