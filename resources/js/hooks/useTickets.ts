import { useCallback, useEffect, useState } from "react";

import toast from "react-hot-toast";

import { getTickets } from "@/services/ticket.service";

import { Ticket } from "@/types/tickets";

interface Params {
    page: number;

    search: string;
}

export function useTickets({ page, search }: Params) {
    const [tickets, setTickets] = useState<Ticket[]>([]);

    const [loading, setLoading] = useState(false);

    const [pagination, setPagination] = useState({
        currentPage: 1,
        lastPage: 1,
        total: 0,
    });

    const fetchTickets = useCallback(async () => {
        try {
            setLoading(true);

            const response = await getTickets({
                page,
                search,
            });

            const data = response.data;

            setTickets(data.data);

            setPagination({
                currentPage: data.current_page,
                lastPage: data.last_page,
                total: data.total,
            });
        } catch {
            toast.error("Failed to load tickets");
        } finally {
            setLoading(false);
        }
    }, [page, search]);

    useEffect(() => {
        fetchTickets();
    }, [fetchTickets]);

    return {
        tickets,
        loading,
        pagination,
        refetch: fetchTickets,
    };
}
