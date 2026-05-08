<?php

namespace App\Actions\Opcenter;

use App\Models\Opcenter;

class DeleteOpcenterAction
{
    public function execute(
        Opcenter $opcenter,
    ) {

        $opcenter->delete();
    }
}
