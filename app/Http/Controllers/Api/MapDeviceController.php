<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Device;
use Illuminate\Http\Request;

class MapDeviceController extends Controller
{
    public function __invoke(Request $request)
    {
        $search = $request->search;

        $devices = Device::query()
            ->with('state')

            ->when($request->opcenter_id, fn($query) => $query->where('opcenter_id', $request->opcenter_id))

            ->when($search, function ($query) use ($search) {
                $query->where(function ($query) use ($search) {
                    $query
                        ->where('unit_id', 'like', "%{$search}%")

                        ->orWhere('serial', 'like', "%{$search}%")

                        ->orWhereHas('state', function ($query) use ($search) {
                            $query
                                ->where('address', 'like', "%{$search}%")

                                ->orWhere('tool_watch', 'like', "%{$search}%");
                        });
                });
            })

            ->get();

        return response()->json([
            'data' => $devices->map(function ($device) {
                return [
                    'id' => $device->id,

                    'unit_id' => $device->unit_id,

                    'serial' => $device->serial,

                    'latitude' => $device->state?->latitude,

                    'longitude' => $device->state?->longitude,

                    'address' => $device->state?->address,

                    'tool_watch' => $device->state?->tool_watch,

                    'power_status' => $device->state?->power_status,

                    'last_report_at' => $device->state?->last_report_at,
                ];
            }),
        ]);
    }
}
