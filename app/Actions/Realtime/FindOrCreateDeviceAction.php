<?php

namespace App\Actions\Realtime;

use App\Data\RealtimePayloadData;
use App\Models\Device;
use App\Models\Opcenter;

class FindOrCreateDeviceAction
{
    public static function run(
        RealtimePayloadData $payload
    ): Device {
        $defaultOpcenter = Opcenter::query()->first();
        return Device::firstOrCreate(
            [
                'unit_id' => $payload->unitId,
            ],
            [
                'serial' => $payload->unitId,

                // default opcenter
                'opcenter_id' => $defaultOpcenter->id,
            ]
        );
    }
}
