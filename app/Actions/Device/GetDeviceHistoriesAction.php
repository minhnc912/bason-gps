<?php

namespace App\Actions\Device;

use App\Enums\PaginationEnum;
use App\Models\Device;

class GetDeviceHistoriesAction
{
    public function execute(Device $device): array
    {
        $state = $device->state;

        $currentSession = null;

        if ($state) {

            $currentSession = [

                'started_at' =>
                    $state->session_started_at,

                'ended_at' =>
                    $state->last_report_at,

                'duration_seconds' =>
                    $state->session_started_at
                        ? $state
                            ->session_started_at
                            ->diffInSeconds(
                                $state->last_report_at
                            )
                        : 0,

                'operator' =>
                    $state->operator,

                'firmware_version' =>
                    $state->firmware_version,

                    'sim_id' => $state->sim_id,

                'power_status' =>
                    $state->power_status,

                'address' =>
                    $state->address,
            ];
        }

        $histories = $device
            ->histories()
            ->latest()
            ->paginate(perPage: PaginationEnum::DEFAULT_PER_PAGE->value);

        return [

            'current_session' =>
                $currentSession,

            'histories' =>
                $histories,
        ];
    }
}
