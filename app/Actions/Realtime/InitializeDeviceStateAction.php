<?php

namespace App\Actions\Realtime;

use App\Data\RealtimePayloadData;
use App\Models\Device;
use App\Models\DeviceState;

class InitializeDeviceStateAction
{
    public static function run(Device $device, RealtimePayloadData $payload): DeviceState
    {

         $state =DeviceState::firstOrCreate(
            [
                'device_id' => $device->id,
            ],
            [
                'latitude' => $payload->latitude ?? 0.000001,
                'longitude' => $payload->longitude ?? 0.000001,
                'power_status' => $payload->powerStatus ?? 0,
                'temperature' => $payload->temperature,
                'tool_watch' => $payload->toolWatch,
                'firmware_version' => $payload->firmwareVersion,
                'address' => null,
                'session_started_at' => now(),
                'last_report_at' => now(),
                'operator' => $payload->operator,
            ],
        );

        return $state;
    }
}
