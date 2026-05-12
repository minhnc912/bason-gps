<?php

namespace App\Actions\Device;

use App\Models\Device;
use App\Models\DeviceState;
use App\Models\DeviceHistory;

use App\Helper\GpsHelper;

use App\Enums\GpsTrackingEnum;

class ProcessDeviceRealtimeDataAction
{
    public function execute(array $payload): void
    {
        $device = Device::where(
            'unit_id',
            $payload['unit_id']
        )->first();

        if (!$device) {
            return;
        }

        $state = $device->state;

        $distance = 0;

        if ($state?->latitude && $state?->longitude) {

            $distance = GpsHelper::distanceInMeters(
                $state->latitude,
                $state->longitude,
                $payload['latitude'],
                $payload['longitude']
            );
        }

        $powerChanged =
            $state?->power_status !==
            $payload['power_status'];

        $lastHistory = $device
            ->histories()
            ->latest()
            ->first();

        $historyTooOld =
            !$lastHistory ||
            $lastHistory->created_at->diffInMinutes(now())
            >= GpsTrackingEnum::HISTORY_INTERVAL_MINUTES;

        $shouldCreateHistory =
            $distance >= GpsTrackingEnum::MIN_DISTANCE_DELTA
            || $powerChanged
            || $historyTooOld;

        $sessionStartedAt =
            $state?->session_started_at ?? now();

        if ($shouldCreateHistory) {

            DeviceHistory::create([

                'device_id' => $device->id,

                'latitude' => $state?->latitude
                    ?? $payload['latitude'],

                'longitude' => $state?->longitude
                    ?? $payload['longitude'],

                'power_status' => $state?->power_status
                    ?? $payload['power_status'],

                'temperature' => $state?->temperature,

                'tool_watch' => $state?->tool_watch,

                'address' => $state?->address,

                'started_at' => $sessionStartedAt,

                'ended_at' => now(),

                'duration_seconds' =>
                    $sessionStartedAt->diffInSeconds(now()),
            ]);

            $sessionStartedAt = now();
        }

        DeviceState::updateOrCreate(

            ['device_id' => $device->id],

            [

                'latitude' => $payload['latitude'],

                'longitude' => $payload['longitude'],

                'power_status' => $payload['power_status'],

                'temperature' => $payload['temperature'] ?? null,

                'tool_watch' => $payload['tool_watch'] ?? null,

                'firmware_version' =>
                    $payload['firmware_version'] ?? null,

                'last_report_at' => now(),

                'session_started_at' => $sessionStartedAt,
            ]
        );
    }
}
