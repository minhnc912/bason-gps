<?php

namespace App\Actions\User;

use App\Enums\PaginationEnum;
use App\Models\User;
use Illuminate\Http\Request;

class GetUsersAction
{
    public function execute(Request $request)
    {
        $search = $request->query('search');

        $query = User::query();

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")->orWhere('email', 'like', "%{$search}%");
            });
        }

        return $query->paginate(PaginationEnum::DEFAULT_PER_PAGE->value)->through(function ($user) {
            return [
                'id' => $user->id,

                'name' => $user->name,

                'email' => $user->email,

                'created_at' => $user->created_at,

                'role' => $user->getRoleNames()->first(),
            ];
        });
    }
}
