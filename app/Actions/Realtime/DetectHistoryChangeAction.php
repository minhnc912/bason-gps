<?php

namespace App\Actions\Realtime;

use App\Data\RealtimePayloadData;
use App\Enums\GpsTrackingEnum;
use App\Models\DeviceState;

class DetectHistoryChangeAction
{
    public static function run(DeviceState $state, RealtimePayloadData $payload): bool
    {
        if ($payload->powerStatus !== null &&
        (bool) $state->power_status !== (bool) $payload->powerStatus) {
            return true;
        }

        if ($payload->toolWatch && $state->tool_watch !== $payload->toolWatch) {
            return true;
        }

        if ($payload->operator && $state->operator !== $payload->operator) {
            return true;
        }

        if ($payload->firmwareVersion && $state->firmware_version !== $payload->firmwareVersion) {
            return true;
        }

        if (self::hasMovedEnough($state, $payload)) {
            return true;
        }

        if (!$state->last_report_at) {
            return false;
        }

        if ($state->last_report_at->diffInSeconds(now()) < 30) {
            return false;
        }

        return false;
    }

    public static function reason(
        DeviceState $state,
        RealtimePayloadData $payload
    ): ?string
    {
        if (
            $payload->powerStatus !== null
            &&
            (bool) $state->power_status !== (bool) $payload->powerStatus
        ) {
            return 'power_status_changed';
        }

        if (
            $payload->firmwareVersion
            &&
            $state->firmware_version !== $payload->firmwareVersion
        ) {
            return 'firmware_changed';
        }

        if (
            $payload->toolWatch
            &&
            $state->tool_watch !== $payload->toolWatch
        ) {
            return 'tool_watch_changed';
        }

        if (self::hasMovedEnough($state, $payload)) {
            return 'device_moved';
        }

        return null;
    }

    private static function hasMovedEnough(DeviceState $state, RealtimePayloadData $payload): bool
    {
        if (
            $payload->latitude === null
            ||
            $payload->longitude === null
        ) {
            return false;
        }

        $latDiff = abs($state->latitude - $payload->latitude);

        $lngDiff = abs($state->longitude - $payload->longitude);

        return $latDiff > GpsTrackingEnum::HISTORY_DISTANCE_DELTA || $lngDiff > GpsTrackingEnum::HISTORY_DISTANCE_DELTA;
    }
}
