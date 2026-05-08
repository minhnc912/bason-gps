<?php

namespace App\Actions\Opcenter;

use App\Models\Opcenter;

class CreateOpcenterAction
{
    public function execute(array $data)
    {
        return Opcenter::create([
            'name' => $data['name'],
        ]);
    }
}
