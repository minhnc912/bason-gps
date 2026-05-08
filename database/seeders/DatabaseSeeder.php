<?php

namespace Database\Seeders;

use App\Enums\UserRoleEnum;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        $this->call(RoleSeeder::class);

        $admin = User::firstOrCreate(
            [
                'email' => 'admin@gmail.com',
            ],
            [
                'name' => 'Super Admin',
                'password' => Hash::make('12345678'),
            ],
        );

        $admin->assignRole(UserRoleEnum::SUPERUSER->value);
    }
}
