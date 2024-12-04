<?php

namespace App\Serializer;

use App\Entity\CategoriesMediaObject;

class CategoriesMediaObjectNormalizer extends BaseMediaObjectNormalizer
{
    protected function supports($data): bool
    {
        return $data instanceof CategoriesMediaObject;
    }

    public function getSupportedTypes(?string $format): array
    {
        return [
            CategoriesMediaObject::class => true,
        ];
    }
}
