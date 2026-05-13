export interface Ticket {
    id: number;

    unit_id: string;

    device_id?: number | null;

    opcenter_id: number;

    truck_number?: string | null;

    meter_number?: string | null;

    address?: string | null;

    latitude?: number | null;

    longitude?: number | null;

    action: string;

    created_by?: number;

    created_at: string;
}

export interface TicketPagination {
    data: Ticket[];

    current_page: number;

    last_page: number;

    total: number;
}
