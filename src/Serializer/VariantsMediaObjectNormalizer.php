<?php

namespace App\Serializer;

use App\Entity\VariantsMediaObject;

class VariantsMediaObjectNormalizer extends BaseMediaObjectNormalizer
{
    protected function supports($data): bool
    {
        return $data instanceof VariantsMediaObject;
    }

    public function getSupportedTypes(?string $format): array
    {
        return [
            VariantsMediaObject::class => true,
        ];
    }
}

