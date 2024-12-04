<?php
// api/src/Controller/CreateProductsMediaObjectAction.php

namespace App\Controller;

use App\Entity\CategoriesMediaObject;
use App\Entity\ItemTypesMediaObject;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

#[AsController]
final class CreateItemTypesMediaObjectAction extends AbstractController
{
    public function __invoke(Request $request): ItemTypesMediaObject
    {
        $uploadedFile = $request->files->get('file');
        if (!$uploadedFile) {
            throw new BadRequestHttpException('"file" is required');
        }

        $itemTypesMediaObject = new ItemTypesMediaObject();
        $itemTypesMediaObject->file = $uploadedFile;

        return $itemTypesMediaObject;
    }
}