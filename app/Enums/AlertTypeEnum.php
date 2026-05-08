<?php

namespace App\Enums;

enum AlertTypeEnum: string
{
    case OFFLINE = 'offline';
    case OUT_OF_ZONE = 'out_of_zone';

    public function label(): string
    {
        return match ($this) {
            self::OFFLINE => 'Offline',
            self::OUT_OF_ZONE => 'Out of Zone',
        };
    }
}
