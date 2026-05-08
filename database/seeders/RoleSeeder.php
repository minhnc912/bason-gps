<?php

namespace Database\Seeders;

use App\Enums\UserRoleEnum;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Role::firstOrCreate([
            'name' => UserRoleEnum::SUPERUSER->value,
        ]);

        Role::firstOrCreate([
            'name' => UserRoleEnum::USER->value,
        ]);
    }
}
