<?php
namespace App\Actions\Opcenter;

use App\Models\User;
use App\Models\Opcenter;

class AssignUserToOpcenterAction
{
    public function execute(int $userId, int $opcenterId)
    {
        $user = User::findOrFail($userId);
        $opcenter = Opcenter::findOrFail($opcenterId);

        $user->opcenters()->syncWithoutDetaching([$opcenter->id]);

        return [
            'user_id' => $user->id,
            'opcenter_id' => $opcenter->id,
        ];
    }
}
