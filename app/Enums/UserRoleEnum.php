<?php

namespace App\Enums;

enum UserRoleEnum: string
{
    case SUPERUSER = 'superuser';
    case USER = 'user';

    public function label(): string
    {
        return match ($this) {
            self::SUPERUSER => 'Super User',
            self::USER => 'User',
        };
    }
}
