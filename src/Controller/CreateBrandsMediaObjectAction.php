<?php
// api/src/Controller/CreateProductsMediaObjectAction.php

namespace App\Controller;

use App\Entity\BrandsMediaObject;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

#[AsController]
final class CreateBrandsMediaObjectAction extends AbstractController
{
    public function __invoke(Request $request): BrandsMediaObject
    {
        $uploadedFile = $request->files->get('file');
        if (!$uploadedFile) {
            throw new BadRequestHttpException('"file" is required');
        }

        $brandsMediaObject = new BrandsMediaObject();
        $brandsMediaObject->file = $uploadedFile;

        return $brandsMediaObject;
    }
}