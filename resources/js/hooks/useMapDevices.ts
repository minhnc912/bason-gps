import { useCallback, useEffect, useState } from "react";

import toast from "react-hot-toast";

import { getMapDevices } from "@/services/map.service";

import { MapDevice } from "@/types/map";

import { POLLING_INTERVAL } from "@/constants/config";
import { Device } from "@/types/devices";

interface Params {
    search: string;
}

export function useMapDevices({ search }: Params) {
    const [devices, setDevices] = useState<MapDevice[]>([]);

    const [loading, setLoading] = useState(false);

    const fetchDevices = useCallback(async () => {
        try {
            setLoading(true);

            const response = await getMapDevices({
                search,
            });

            const mapDevices: MapDevice[] = response.data.data.map(
                (device: MapDevice) => ({
                    ...device,

                    latitude: Number(device.latitude),

                    longitude: Number(device.longitude),
                }),
            );

            setDevices(mapDevices);
        } catch {
            toast.error("Failed to load map devices");
        } finally {
            setLoading(false);
        }
    }, [search]);

    useEffect(() => {
        fetchDevices();

        const interval = setInterval(fetchDevices, POLLING_INTERVAL);

        return () => clearInterval(interval);
    }, [fetchDevices]);

    return {
        devices,
        loading,
        refetch: fetchDevices,
    };
}
