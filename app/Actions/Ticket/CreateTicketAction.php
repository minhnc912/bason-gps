<?php

namespace App\Actions\Ticket;

use App\Models\Device;
use App\Models\Ticket;
use App\Models\User;

class CreateTicketAction
{
    public function execute(array $data, User $user): Ticket
    {
        $device = Device::where('unit_id', $data['unit_id'])->firstOrFail();

        return Ticket::create([
            'opcenter_id' => $device->opcenter_id,

            'device_id' => $device->id,

            'created_by' => $user->id,

            'unit_id' => $device->unit_id,

            'truck_number' => $data['truck_number'],

            'meter_number' => $data['meter_number'],

            'address' => $data['address'],

            'latitude' => $data['latitude'],

            'longitude' => $data['longitude'],

            'action' => $data['action'],
        ]);
    }
}
