<?php

namespace App\Actions\Device;

use App\Enums\PaginationEnum;
use App\Enums\UserRoleEnum;
use App\Models\Device;
use Illuminate\Http\Request;

class GetDevicesAction
{
    public function execute(Request $request)
    {
        $user = $request->user();
        $opcenterId = $request->query('opcenter_id');

        $search = $request->query('search');

        $query = Device::query()->with('state');

        if ($user->role !== UserRoleEnum::SUPERUSER->value) {
            $query->where('opcenter_id', $opcenterId);
        }

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('unit_id', 'like', "%{$search}%")->orWhere('serial', 'like', "%{$search}%");
            });
        }

        return $query->paginate(perPage: PaginationEnum::DEFAULT_PER_PAGE->value);
    }
}
