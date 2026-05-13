<?php

namespace App\Actions\Ticket;

use App\Enums\PaginationEnum;
use App\Models\Ticket;

class GetTicketsAction
{
    public function execute(?int $opcenterId)
    {
        return Ticket::query()
            ->with(['device.state', 'creator'])
            ->when($opcenterId, fn($query) => $query->where('opcenter_id', $opcenterId))
            ->latest()
            ->paginate(perPage: PaginationEnum::DEFAULT_PER_PAGE->value);
    }
}
