<?php

namespace App\Serializer;

use App\Entity\BrandsMediaObject;

class BrandsMediaObjectNormalizer extends BaseMediaObjectNormalizer
{
    protected function supports($data): bool
    {
        return $data instanceof BrandsMediaObject;
    }

    public function getSupportedTypes(?string $format): array
    {
        return [
            BrandsMediaObject::class => true,
        ];
    }
}
