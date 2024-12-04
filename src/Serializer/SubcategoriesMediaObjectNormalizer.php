<?php

namespace App\Serializer;

use App\Entity\SubcategoriesMediaObject;

class SubcategoriesMediaObjectNormalizer extends BaseMediaObjectNormalizer
{
    protected function supports($data): bool
    {
        return $data instanceof SubcategoriesMediaObject;
    }

    public function getSupportedTypes(?string $format): array
    {
        return [
            SubcategoriesMediaObject::class => true,
        ];
    }
}
