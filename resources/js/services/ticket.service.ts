import { API_ENDPOINTS } from "@/constants/api";
import api from "./api";

import { TicketPagination } from "@/types/tickets";

export interface TicketQueryParams {
    page: number;

    search: string;
}

export interface CreateTicketPayload {
    unit_id: string;

    truck_number?: string;

    meter_number?: string;

    address?: string;

    latitude?: number;

    longitude?: number;

    action: string;
}

export const getTickets = (params: TicketQueryParams) => {
    return api.get<TicketPagination>(API_ENDPOINTS.TICKETS, {
        params,
    });
};

export const createTicket = (payload: CreateTicketPayload) => {
    return api.post(API_ENDPOINTS.TICKETS, payload);
};
