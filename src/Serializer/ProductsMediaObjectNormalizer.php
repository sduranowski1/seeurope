<?php

namespace App\Serializer;

use App\Entity\ProductsMediaObject;

class ProductsMediaObjectNormalizer extends BaseMediaObjectNormalizer
{
    protected function supports($data): bool
    {
        return $data instanceof ProductsMediaObject;
    }

    public function getSupportedTypes(?string $format): array
    {
        return [
            ProductsMediaObject::class => true,
        ];
    }
}
