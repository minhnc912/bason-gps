<?php

namespace App\Actions\Map;

use App\Models\Device;
use Illuminate\Database\Eloquent\Collection;

class GetMapDevicesAction
{
    public static function run(?int $opcenterId = null): Collection
    {
        return Device::query()->with('state')->when($opcenterId, fn($query) => $query->where('opcenter_id', $opcenterId))->get();
    }
}
