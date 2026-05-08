<?php

namespace App\Actions\Opcenter;

use App\Models\Opcenter;

class UpdateOpcenterAction
{
    public function execute(
        Opcenter $opcenter,
        array $data,
    ) {

        $opcenter->update([
            'name' => $data['name'],
        ]);

        return $opcenter;
    }
}
