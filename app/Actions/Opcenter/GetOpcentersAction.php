<?php

namespace App\Actions\Opcenter;

use App\Models\Opcenter;

class GetOpcentersAction
{
    public function execute()
    {
        return Opcenter::withCount('devices')->get();
    }
}
