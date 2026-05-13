<?php

namespace App\Http\Controllers\Api\Ticket;

use App\Actions\Ticket\CreateTicketAction;
use App\Actions\Ticket\GetTicketsAction;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTicketRequest;
use Illuminate\Http\Request;

class TicketController extends Controller
{
    public function index(Request $request, GetTicketsAction $getTicketsAction)
    {
        $tickets = $getTicketsAction->execute($request->integer('opcenter_id'));

        return response()->json($tickets);
    }

    public function store(StoreTicketRequest $request, CreateTicketAction $createTicketAction)
    {
        $ticket = $createTicketAction->execute($request->validated(), $request->user());

        return response()->json([
            'message' => 'Ticket created successfully',

            'data' => $ticket,
        ]);
    }
}
