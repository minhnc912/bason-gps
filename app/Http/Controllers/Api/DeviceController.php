<?php

namespace App\Http\Controllers\Api;

use App\Actions\Device\CreateDeviceAction;
use App\Actions\Device\GetDevicesAction;
use App\Http\Controllers\Controller;
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
}
