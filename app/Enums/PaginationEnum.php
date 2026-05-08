<?php

namespace App\Enums;

enum PaginationEnum: int
{
    case DEFAULT_PER_PAGE = 10;

    public function label(): string
    {
        return match ($this) {
            self::DEFAULT_PER_PAGE => 'Default Per Page',
        };
    }
}
