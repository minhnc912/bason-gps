<?php

namespace App\Actions\Realtime;

use App\Data\RealtimePayloadData;

class ParseRealtimePayloadAction
{
    public static function run(array $payload): RealtimePayloadData
    {
        [$latitude, $longitude] = self::parseCoordinates(
            $payload['coord'] ?? null
        );

        return new RealtimePayloadData(
            unitId: $payload['uid'] ?? '',
            firmwareVersion: $payload['fwv'] ?? null,
            latitude: $latitude,
            longitude: $longitude,
            temperature: self::parseTemperature(
                $payload['temp'] ?? null
            ),
            powerStatus: isset($payload['pwr'])
                ? (int) $payload['pwr']
                : null,
            toolWatch: $payload['t'] ?? null,
            operator: $payload['operator'] ?? null,
            boot: $payload['boot'] ?? null,
            simGps: isset($payload['sim'])
                ? (int) $payload['sim']
                : null,
            rawPayload: $payload,
        );
    }

    private static function parseCoordinates(?string $coord): array
    {
        if (!$coord) {
            return [null, null];
        }

        $coord = str_replace(' ', '', $coord);

        $parts = explode(',', $coord);

        return [
            isset($parts[0]) ? (float) $parts[0] : null,
            isset($parts[1]) ? (float) $parts[1] : null,
        ];
    }

    private static function parseTemperature(
        mixed $temperature
    ): ?float {
        if (!$temperature) {
            return null;
        }

        $temperature = str_replace("'C", '', $temperature);

        return round(
            ((float) $temperature * 1.8) + 32,
            2
        );
    }
}
