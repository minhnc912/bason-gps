<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

use App\Http\Requests\StoreRealtimeGpsRequest;

use App\Actions\Device\ProcessDeviceRealtimeDataAction;

class DeviceIngestController extends Controller
{
    public function store(
        StoreRealtimeGpsRequest $request,
        ProcessDeviceRealtimeDataAction $action
    ) {

        $action->execute(
            $request->validated()
        );

        return response()->json([
            'success' => true,
        ]);
    }
}
