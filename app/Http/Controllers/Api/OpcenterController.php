<?php

namespace App\Http\Controllers\Api;

use App\Actions\Opcenter\CreateOpcenterAction;
use App\Actions\Opcenter\DeleteOpcenterAction;
use App\Actions\Opcenter\GetOpcentersAction;
use App\Actions\Opcenter\UpdateOpcenterAction;
use App\Http\Controllers\Controller;
use App\Models\Opcenter;
use Illuminate\Http\Request;

class OpcenterController extends Controller
{
     public function index(
        Request $request,
        GetOpcentersAction $action,
    ) {

        return response()->json(
            $action->execute($request)
        );
    }

    public function options()
    {
        return response()->json(
            Opcenter::query()
                ->select(['id', 'name'])
                ->orderBy('name')
                ->get(),
        );
    }

    public function store(
        Request $request,
        CreateOpcenterAction $action,
    ) {

        $validated =
            $request->validate([
                'name' =>
                    'required|string|max:255|unique:opcenters,name',
            ]);

        return response()->json(
            $action->execute(
                $validated,
            ),
            201,
        );
    }

    public function update(
        Request $request,
        Opcenter $opcenter,
        UpdateOpcenterAction $action,
    ) {

        $validated =
            $request->validate([
                'name' =>
                    'required|string|max:255|unique:opcenters,name,' .
                    $opcenter->id,
            ]);

        return response()->json(
            $action->execute(
                $opcenter,
                $validated,
            ),
        );
    }

    public function destroy(
        Opcenter $opcenter,
        DeleteOpcenterAction $action,
    ) {

        $action->execute(
            $opcenter,
        );

        return response()->json([
            'message' =>
                'Deleted successfully',
        ]);
    }
}
