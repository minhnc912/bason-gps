<?php

namespace App\Actions\Realtime;

use App\Data\RealtimePayloadData;
use App\Enums\GpsTrackingEnum;
use App\Models\DeviceState;

class HasMeaningfulRealtimeChangeAction
{
    public static function run(DeviceState $state, RealtimePayloadData $payload): bool
    {
        if (self::hasMovedEnough($state, $payload)) {
            return true;
        }

        if ($payload->powerStatus !== null && $state->power_status !== $payload->powerStatus) {
            return true;
        }

        if ($payload->toolWatch && $state->tool_watch !== $payload->toolWatch) {
            return true;
        }

        if ($payload->temperature && abs($state->temperature - $payload->temperature) >= 2) {
            return true;
        }

        if (!$state->last_report_at) {
            return true;
        }

        return $state->last_report_at->diffInSeconds(now()) >= 60;
    }

    private static function hasMovedEnough(DeviceState $state, RealtimePayloadData $payload): bool
    {
        if (!$payload->latitude || !$payload->longitude) {
            return false;
        }

        $latDiff = abs($state->latitude - $payload->latitude);

        $lngDiff = abs($state->longitude - $payload->longitude);

        return $latDiff > GpsTrackingEnum::MIN_DISTANCE_DELTA || $lngDiff > GpsTrackingEnum::MIN_DISTANCE_DELTA;
    }

    public static function hasMovedFarEnoughForGeocode(DeviceState $state, RealtimePayloadData $payload): bool
    {
        if (!$payload->latitude || !$payload->longitude) {
            return false;
        }

        $latDiff = abs($state->latitude - $payload->latitude);

        $lngDiff = abs($state->longitude - $payload->longitude);

        return $latDiff > 0.001 || $lngDiff > 0.001;
    }
}
