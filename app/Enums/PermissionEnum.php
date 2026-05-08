<?php

namespace App\Enums;

enum PermissionEnum: string
{
    case VIEW_ALL_DEVICES = 'view_all_devices';
    case VIEW_OWN_OPCENTER = 'view_own_opcenter';

    public function label(): string
    {
        return match ($this) {
            self::VIEW_ALL_DEVICES => 'View All Devices',
            self::VIEW_OWN_OPCENTER => 'View Own OPCenter',
        };
    }
}
