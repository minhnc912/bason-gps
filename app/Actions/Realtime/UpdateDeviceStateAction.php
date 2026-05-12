<?php

namespace App\Actions\Realtime;

use App\Data\RealtimePayloadData;
use App\Models\DeviceState;

class UpdateDeviceStateAction
{
    public static function run(DeviceState $deviceState, RealtimePayloadData $payload, bool $resetSession = false, ?string $address = null): DeviceState
    {
        $deviceState->update([
            'latitude' => self::resolveLatitude($payload, $deviceState),
            'longitude' => self::resolveLongitude($payload, $deviceState),
            'last_report_at' => now(),
            'session_started_at' => $resetSession ? now() : $deviceState->session_started_at,
            'power_status' => $payload->powerStatus ?? $deviceState->power_status,
            'temperature' => $payload->temperature ?? $deviceState->temperature,
            'tool_watch' => $payload->toolWatch ?? $deviceState->tool_watch,
            'firmware_version' => $payload->firmwareVersion ?? $deviceState->firmware_version,
            'operator' => $payload->operator ?? $deviceState->operator,
            'address' => $address ?? $deviceState->address,
        ]);

        return $deviceState->fresh();
    }

    private static function resolveLatitude(RealtimePayloadData $payload, DeviceState $state): float
    {
        if (self::isValidCoordinate($payload->latitude)) {
            return $payload->latitude;
        }

        return $state->latitude;
    }

    private static function resolveLongitude(RealtimePayloadData $payload, DeviceState $state): float
    {
        if (self::isValidCoordinate($payload->longitude)) {
            return $payload->longitude;
        }

        return $state->longitude;
    }

    private static function isValidCoordinate(?float $value): bool
    {
        if (!$value) {
            return false;
        }

        return abs($value) > 0.000001;
    }
}
