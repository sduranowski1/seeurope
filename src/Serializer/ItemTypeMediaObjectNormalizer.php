<?php

namespace App\Serializer;

use App\Entity\ItemTypesMediaObject;

class ItemTypeMediaObjectNormalizer extends BaseMediaObjectNormalizer
{
    protected function supports($data): bool
    {
        return $data instanceof ItemTypesMediaObject;
    }

    public function getSupportedTypes(?string $format): array
    {
        return [
            ItemTypesMediaObject::class => true,
        ];
    }
}