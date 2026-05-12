export interface MapDevice {
    id: number;
    unit_id: string;
    serial: string;
    latitude: number | null;
    longitude: number | null;
    address: string | null;
    tool_watch: string | null;
    power_status: number;
    last_report_at: string | null;
}
