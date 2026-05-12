<?php

namespace App\Data;

class RealtimePayloadData
{
    public function __construct(
        public readonly string $unitId,
        public readonly ?string $firmwareVersion,
        public readonly ?float $latitude,
        public readonly ?float $longitude,
        public readonly ?float $temperature,
        public readonly ?int $powerStatus,
        public readonly ?string $toolWatch,
        public readonly ?string $operator,
        public readonly ?string $boot,
        public readonly ?int $simGps,
        public readonly array $rawPayload = [],
    ) {}
}
