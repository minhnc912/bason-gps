<?php

namespace App\Actions\Device;

use App\Enums\DeviceStatusEnum;
use App\Models\Device;

class CreateDeviceAction
{
    public function execute(array $data)
    {
        return Device::create([
            'unit_id' => $data['unit_id'],
            'serial' => $data['serial'] ?? null,
            'opcenter_id' => $data['opcenter_id'],
            'status' => DeviceStatusEnum::ACTIVE->value,
        ]);
    }
}
