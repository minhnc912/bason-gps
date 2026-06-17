<?php

namespace App\Actions\Realtime;

use App\Data\RealtimePayloadData;
use App\Models\Device;
use App\Models\DeviceHistory;
use App\Models\DeviceState;

class CreateDeviceHistoryAction
{
    public static function run(Device $device, DeviceState $state, RealtimePayloadData $payload): DeviceHistory
    {
        $startedAt = $state->session_started_at ?? now();

        $endedAt = now();

        return DeviceHistory::create([
            'device_id' => $device->id,

            'latitude' => $payload->latitude ?? $state->latitude,
            'longitude' => $payload->longitude ?? $state->longitude,

            'power_status' => $payload->powerStatus ?? $state->power_status,
            'temperature' => $payload->temperature ?? $state->temperature,
            'tool_watch' => $payload->toolWatch ?? $state->tool_watch,

            'address' => $state->address,

            'started_at' => $startedAt,
            'ended_at' => $endedAt,

            'duration_seconds' => $startedAt
                ? $startedAt->diffInSeconds($endedAt)
                : 0,

            'operator' => $payload->operator ?? $state->operator,

            'firmware_version' => $payload->firmwareVersion
                ?? $state->firmware_version,
        ]);
    }
}
