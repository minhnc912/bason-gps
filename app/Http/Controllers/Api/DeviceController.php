<?php

namespace App\Http\Controllers\Api;

use App\Actions\Device\CreateDeviceAction;
use App\Actions\Device\DeleteDeviceAction;
use App\Actions\Device\GetDevicesAction;
use App\Actions\Device\UpdateDeviceAction;
use App\Http\Controllers\Controller;
use App\Models\Device;
use Illuminate\Http\Request;

class DeviceController extends Controller
{
    public function index(Request $request, GetDevicesAction $action)
    {
        return response()->json($action->execute($request));
    }

    public function store(Request $request, CreateDeviceAction $action)
    {
        $validated = $request->validate([
            'unit_id' => 'required|unique:devices',
            'serial' => 'nullable|string',
            'opcenter_id' => 'required|exists:opcenters,id',
        ]);

        return response()->json($action->execute($validated), 201);
    }

    public function update(Request $request, Device $device, UpdateDeviceAction $action)
    {
        $validated = $request->validate([
            'unit_id' => 'required|unique:devices,unit_id,' . $device->id,

            'serial' => 'nullable|string',

            'opcenter_id' => 'required|exists:opcenters,id',
        ]);

        return response()->json($action->execute($device, $validated));
    }

    public function destroy(Device $device, DeleteDeviceAction $action)
    {
        $action->execute($device);

        return response()->json([
            'message' => 'Device deleted',
        ]);
    }
}
