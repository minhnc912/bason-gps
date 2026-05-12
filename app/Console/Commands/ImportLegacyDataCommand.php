<?php

namespace App\Console\Commands;

use App\Models\Device;
use App\Models\DeviceState;
use App\Models\Opcenter;
use App\Models\User;
use Illuminate\Console\Attributes\Description;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

#[Signature('app:import-legacy-data-command')]
#[Description('Command description')]
class ImportLegacyDataCommand extends Command
{
    protected $signature = 'import:legacy-data';

    protected $description = 'Import legacy GPS data';

    public function handle(): void
    {
        // $this->importOpcenters();

        // $this->importDevices();

        // $this->importDeviceStates();

        // $this->importUsers();

        $this->assignRoles();

        $this->info('Legacy import completed.');
    }

    private function importOpcenters(): void
    {
        $groups = DB::connection('legacy_mysql')->table('groups')->get();
        foreach ($groups as $group) {
            Opcenter::create([
                'name' => $group->name,
                'legacy_group_id' => $group->groupId,
            ]);
        }
    }

    private function importDevices(): void
    {
        $devices = DB::connection('legacy_mysql')->table('devices')->get();

        $groupMap = DB::connection('legacy_mysql')->table('grouptodevices')->get()->keyBy('deviceId');

        foreach ($devices as $legacyDevice) {
            $groupRelation = $groupMap[$legacyDevice->id] ?? null;

            if (!$groupRelation) {
                continue;
            }

            $opcenter = Opcenter::where('legacy_group_id', $groupRelation->groupId)->first();

            if (!$opcenter) {
                continue;
            }
       $this->info(json_encode($legacyDevice));
            Device::create([
                'unit_id' => $legacyDevice->unitID,
                'serial' => $legacyDevice->serial,
                'note' => $legacyDevice->note,
                'opcenter_id' => $opcenter->id,
                'legacy_device_id' => $legacyDevice->id,
            ]);
        }
    }

    private function importDeviceStates(): void
    {
        $legacyDevices = DB::connection('legacy_mysql')->table('devices')->get();

        foreach ($legacyDevices as $legacyDevice) {
            $device = Device::where('legacy_device_id', $legacyDevice->id)->first();

            if (!$device) {
                continue;
            }

            DeviceState::create([
                'device_id' => $device->id,

                'latitude' => $legacyDevice->latitude,

                'longitude' => $legacyDevice->longtitude,

                'power_status' => $legacyDevice->powerStatus ?? 0,

                'temperature' => $legacyDevice->temperature,

                'tool_watch' => $legacyDevice->toolWatch,

                'firmware_version' => $legacyDevice->firmwareVersion,

                'address' => $legacyDevice->address,

                'operator' => $legacyDevice->operator,

                'last_report_at' => $legacyDevice->lastReport ? \Carbon\Carbon::createFromTimestamp($legacyDevice->lastReport) : null,

                'session_started_at' => $legacyDevice->startTime ? \Carbon\Carbon::createFromTimestamp($legacyDevice->startTime) : null,
            ]);
        }
    }

    private function importUsers(): void
    {
        $users = DB::connection('legacy_mysql')->table('users')->get();

        foreach ($users as $legacyUser) {
            User::create([
                'name' => $legacyUser->name,
                'email' => $legacyUser->email,
                'password' => $legacyUser->password,
                'legacy_user_id' => $legacyUser->id,
            ]);
        }
    }

    private function assignRoles(): void
    {
        $legacyUsers = DB::connection('legacy_mysql')->table('users')->get();

        foreach ($legacyUsers as $legacyUser) {
            $user = User::where('legacy_user_id', $legacyUser->id)->first();

            if (!$user) {
                continue;
            }

            $role = $legacyUser->permissionId === 1 ? 'superuser' : 'user';

            $user->assignRole($role);
        }
    }
}
