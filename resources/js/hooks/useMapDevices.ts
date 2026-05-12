import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getMapDevices } from "@/services/map.service";
import { MapDevice } from "@/types/map";
import { POLLING_INTERVAL } from "@/constants/config";

export function useMapDevices() {
    const [devices, setDevices] = useState<MapDevice[]>([]);

    const [loading, setLoading] = useState(false);

    const fetchDevices = useCallback(async () => {
        try {
            setLoading(true);

            const response = await getMapDevices();

            setDevices(response.data.data);
        } catch {
            toast.error("Failed to load map devices");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchDevices();

        const interval = setInterval(fetchDevices, POLLING_INTERVAL);

        return () => clearInterval(interval);
    }, []);

    return {
        devices,
        loading,
        refetch: fetchDevices,
    };
}
