import { useEffect, useState } from "react";

import { getOpcenters } from "@/services/opcenter.service";

import type { Opcenter } from "@/types/opcenter";

interface Props {
    page: number;

    search: string;
}

export function useOpcentersPage({ page, search }: Props) {
    const [opcenters, setOpcenters] = useState<Opcenter[]>([]);

    const [loading, setLoading] = useState(false);

    const [pagination, setPagination] = useState({
        currentPage: 1,
        lastPage: 1,
    });

    const fetchOpcenters = async () => {
        try {
            setLoading(true);

            const res = await getOpcenters(page, search);

            setOpcenters(res.data.data);

            setPagination({
                currentPage: res.data.current_page,

                lastPage: res.data.last_page,
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOpcenters();
    }, [page, search]);

    return {
        opcenters,
        loading,
        pagination,
        refetch: fetchOpcenters,
    };
}
