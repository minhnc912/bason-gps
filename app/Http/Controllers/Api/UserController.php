<?php

namespace App\Http\Controllers\Api;

use App\Actions\User\GetUsersAction;
use App\Actions\User\UpdateUserRoleAction;
use App\Enums\UserRoleEnum;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Enum;

class UserController extends Controller
{
    public function index(
        Request $request,
        GetUsersAction $action,
    ) {
        return response()->json(
            $action->execute($request)
        );
    }

    public function updateRole(
        Request $request,
        User $user,
        UpdateUserRoleAction $action,
    ) {

        $validated =
            $request->validate([
                'role' => [
                    'required',
                    new Enum(
                        UserRoleEnum::class
                    ),
                ],
            ]);

        return response()->json(
            $action->execute(
                $user,
                $validated['role'],
            )
        );
    }
}
