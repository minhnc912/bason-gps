export interface Device {
    id: number;

    unit_id: string;

    serial: string | null;

    status: string;

    opcenter_id: number;

    note: string | null;

    created_at: string;

    state?: DeviceState | null;
}

export interface DeviceState {
    latitude: number | null;

    longitude: number | null;

    power_status: boolean;

    temperature: number | null;

    tool_watch: string | null;

    last_report_at: string | null;

    session_started_at: string | null;

    address: string | null;
}

export interface DevicePagination {
    data: Device[];

    current_page: number;

    last_page: number;

    total: number;
}
