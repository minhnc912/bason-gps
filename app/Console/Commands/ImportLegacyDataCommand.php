<?php

namespace App\Console\Commands;

use App\Models\Device;
use App\Models\DeviceHistory;
use App\Models\DeviceState;
use App\Models\Opcenter;
use App\Models\User;
use Carbon\Carbon;
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

        $this->importDeviceHistories();

        // $this->importUsers();

        // $this->assignRoles();

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
        $devices = DB::connection('legacy_mysql')->table('devices')->limit(200)->get();

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
            User::updateOrCreate(
                [
                    'email' => $legacyUser->email,
                ],
                [
                    'name' => $legacyUser->name,
                    'password' => $legacyUser->password,
                    'legacy_user_id' => $legacyUser->id,
                ],
            );
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

    private function importDeviceHistories(): void
    {
        $this->info('Importing device histories...');

        $deviceMap = Device::pluck('id', 'unit_id');

        $histories = DB::connection('legacy_mysql')->table('histories')->whereNotNull('latitude')->whereNotNull('longtitude')->orderByDesc('id')->limit(200)->get();

        $insertData = [];

        foreach ($histories as $history) {
            $deviceId = $deviceMap[$history->deviceID] ?? null;

            if (!$deviceId) {
                continue;
            }

            if (abs($history->latitude) < 0.001 && abs($history->longtitude) < 0.001) {
                continue;
            }

            $startedAt = $history->sTime ? Carbon::createFromTimestamp((int) $history->sTime) : now();

            $endedAt = $history->eTime ? Carbon::createFromTimestamp((int) $history->eTime) : $startedAt;

            $insertData[] = [
                'device_id' => $deviceId,

                'latitude' => $history->latitude,

                'longitude' => $history->longtitude,

                'power_status' => $history->powerStatus ?? 0,

                'temperature' => null,

                'tool_watch' => $history->toolWatch,

                'address' => $history->address,

                'started_at' => $startedAt,

                'ended_at' => $endedAt,

                'duration_seconds' => max(0, (int) $history->eTime - (int) $history->sTime),

                'operator' => $history->operator,

                'firmware_version' => $history->firmwareVersion,

                'created_at' => now(),

                'updated_at' => now(),
            ];
        }

        DeviceHistory::insert($insertData);

        $this->info('Device histories imported.');
    }
}
