<?php

namespace App\Http\Controllers\Api;

use App\Actions\Realtime\CreateDeviceHistoryAction;
use App\Actions\Realtime\DetectHistoryChangeAction;
use App\Actions\Realtime\FindOrCreateDeviceAction;
use App\Actions\Realtime\HasMeaningfulRealtimeChangeAction;
use App\Actions\Realtime\InitializeDeviceStateAction;
use App\Actions\Realtime\ParseRealtimePayloadAction;
use App\Actions\Realtime\ResolveAddressAction;
use App\Actions\Realtime\UpdateDeviceStateAction;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LegacyDeviceIngestController extends Controller
{
    public function __invoke(Request $request)
    {
        $payload = ParseRealtimePayloadAction::run($request->all());
        $device = FindOrCreateDeviceAction::run($payload);
        $deviceState = InitializeDeviceStateAction::run($device, $payload);
        $shouldCreateHistory = DetectHistoryChangeAction::run($deviceState, $payload);

        if ($shouldCreateHistory) {
            CreateDeviceHistoryAction::run($device, $deviceState, $payload);
        }

        $hasMeaningfulChange = HasMeaningfulRealtimeChangeAction::run($deviceState, $payload);

        $address = null;
        if (HasMeaningfulRealtimeChangeAction::hasMovedFarEnoughForGeocode($deviceState, $payload) || !$deviceState->address) {
            $address = ResolveAddressAction::run($payload->latitude, $payload->longitude);
        }

        if ($hasMeaningfulChange) {
            $deviceState = UpdateDeviceStateAction::run($deviceState, $payload, $shouldCreateHistory, $address);
        }

        return response()->json([
            'success' => true,
            'device_id' => $device->id,
            'unit_id' => $device->unit_id,
            'latitude' => $deviceState->latitude,
            'longitude' => $deviceState->longitude,
            'temperature' => $deviceState->temperature,
            'last_report_at' => $deviceState->last_report_at,
        ]);
    }
}
