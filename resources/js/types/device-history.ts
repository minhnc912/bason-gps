export interface DeviceHistory {
    id: number;

    started_at: string;

    ended_at: string;

    duration_seconds: number;

    operator: string | null;

    firmware_version: string | null;

    power_status: boolean;

    address: string | null;
}

export interface DeviceHistoryResponse {
    current_session: DeviceHistory | null;

    histories: {
        data: DeviceHistory[];
    };
}
