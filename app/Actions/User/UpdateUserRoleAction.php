<?php

namespace App\Actions\User;

use App\Models\User;

class UpdateUserRoleAction
{
    public function execute(
        User $user,
        string $role,
    ) {
        $user->syncRoles([$role]);

        return $user;
    }
}
