<?php
namespace App\Actions\Device;

use App\Models\Device;

class DeleteDeviceAction
{
    public function execute(
        Device $device,
    ) {

        $device->delete();
    }
}
