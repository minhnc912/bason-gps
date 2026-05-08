import { useCallback, useEffect, useState } from "react";

import toast from "react-hot-toast";

import { getDevices } from "@/services/device.service";
import { Device } from "@/types/devices";
import { POLLING_INTERVAL } from "@/constants/config";

interface Params {
    page: number;

    search: string;
}

export function useDevices({ page, search }: Params) {
    const [devices, setDevices] = useState<Device[]>([]);

    const [loading, setLoading] = useState(false);

    const [pagination, setPagination] = useState({
        currentPage: 1,
        lastPage: 1,
        total: 0,
    });

    const fetchDevices = useCallback(async () => {
        try {
            setLoading(true);

            const res = await getDevices({
                page,
                search,
            });

            const data = res.data;

            setDevices(data.data);

            setPagination({
                currentPage: data.current_page,

                lastPage: data.last_page,

                total: data.total,
            });
        } catch {
            toast.error("Failed to load devices");
        } finally {
            setLoading(false);
        }
    }, [page, search]);

    useEffect(() => {
        fetchDevices();

        const interval = setInterval(fetchDevices, POLLING_INTERVAL);

        return () => clearInterval(interval);
    }, [fetchDevices]);

    return {
        devices,
        loading,
        pagination,
        refetch: fetchDevices,
    };
}
