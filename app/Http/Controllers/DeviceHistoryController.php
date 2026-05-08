<?php

namespace App\Http\Controllers;

use App\Actions\Device\GetDeviceHistoriesAction;
use App\Models\Device;

class DeviceHistoryController extends Controller
{
    public function index(
        Device $device,
        GetDeviceHistoriesAction $action
    ) {

        return response()->json(
            $action->execute($device)
        );
    }
}
