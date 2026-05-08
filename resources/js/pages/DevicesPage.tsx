import { useEffect, useState } from "react";

import { getDevices } from "@/services/device.service";

import Pagination from "@/components/common/Pagination";

import useDebounce from "@/hooks/useDebounce";

import { DEVICE_POLLING_INTERVAL } from "@/constants/device";
import { Device } from "@/types/devices";
import DeviceTableSkeleton from "@/components/devices/DeviceTableSkeleton";
import DeviceTable from "@/components/devices/DeviceTable";

export default function DevicesPage() {
    const [devices, setDevices] = useState<Device[]>([]);

    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState(1);

    const [lastPage, setLastPage] = useState(1);

    const [search, setSearch] = useState("");

    const debouncedSearch = useDebounce(search);

    const fetchDevices = async () => {
        try {
            const res = await getDevices({
                page,
                search: debouncedSearch,
            });

            setDevices(res.data.data);

            setLastPage(res.data.last_page);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDevices();
    }, [page, debouncedSearch]);

    useEffect(() => {
        const interval = setInterval(() => {
            fetchDevices();
        }, DEVICE_POLLING_INTERVAL);

        return () => clearInterval(interval);
    }, [page, debouncedSearch]);

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Devices</h1>
                </div>

                <input
                    type="text"
                    placeholder="Search device..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full rounded-xl border px-4 py-2 md:w-80"
                />
            </div>

            {loading ? (
                <DeviceTableSkeleton />
            ) : (
                <>
                    <DeviceTable devices={devices} isSuperUser={true} />

                    <Pagination
                        currentPage={page}
                        lastPage={lastPage}
                        onPageChange={setPage}
                    />
                </>
            )}
        </div>
    );
}
