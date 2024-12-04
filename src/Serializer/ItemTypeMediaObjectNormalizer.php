<?php

namespace App\Serializer;

use App\Entity\ItemTypeMediaObject;

class ItemTypeMediaObjectNormalizer extends BaseMediaObjectNormalizer
{
    protected function supports($data): bool
    {
        return $data instanceof ItemTypeMediaObject;
    }

    public function getSupportedTypes(?string $format): array
    {
        return [
            ItemTypeMediaObject::class => true,
        ];
    }
}