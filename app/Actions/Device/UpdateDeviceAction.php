<?php

namespace App\Actions\Device;

use App\Models\Device;

class UpdateDeviceAction
{
    public function execute(
        Device $device,
        array $data,
    ) {

        $device->update($data);

        return $device;
    }
}
