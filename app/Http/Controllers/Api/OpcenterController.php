<?php

namespace App\Http\Controllers\Api;

use App\Actions\Opcenter\AssignUserToOpcenterAction;
use App\Actions\Opcenter\CreateOpcenterAction;
use App\Actions\Opcenter\GetOpcentersAction;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class OpcenterController extends Controller
{
    public function index(GetOpcentersAction $action)
    {
        return response()->json($action->execute());
    }

    public function store(Request $request, CreateOpcenterAction $action)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        return response()->json($action->execute($validated), 201);
    }

}
