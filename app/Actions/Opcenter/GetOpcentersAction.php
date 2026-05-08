<?php

namespace App\Actions\Opcenter;

use App\Enums\PaginationEnum;
use App\Models\Opcenter;
use Illuminate\Http\Request;

class GetOpcentersAction
{
    public function execute(Request $request)
    {
        $search =
            $request->query('search');

        $query =
            Opcenter::query();

        if ($search) {

            $query->where(
                'name',
                'like',
                "%{$search}%"
            );
        }

        return $query
            ->paginate(
                PaginationEnum::DEFAULT_PER_PAGE->value
            );
    }
}
