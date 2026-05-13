<?php

namespace App\Actions\Ticket;

use App\Enums\PaginationEnum;
use App\Models\Ticket;
use Illuminate\Http\Request;

class GetTicketsAction
{
    public function execute(Request $request)
    {
        $query = Ticket::query()
            ->with('device')
            ->when($request->opcenter_id, fn($q) => $q->where('opcenter_id', $request->opcenter_id))
            ->when($request->search, function ($q) use ($request) {
                $search = $request->search;

                $q->where(function ($sub) use ($search) {
                    $sub->where('unit_id', 'like', "%{$search}%")
                        ->orWhere('truck_number', 'like', "%{$search}%")
                        ->orWhere('meter_number', 'like', "%{$search}%")
                        ->orWhere('action', 'like', "%{$search}%");
                });
            });

        return $query->paginate(PaginationEnum::DEFAULT_PER_PAGE->value);
    }
}
