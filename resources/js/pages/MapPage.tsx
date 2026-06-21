import { useMemo, useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import { useMapDevices } from "@/hooks/useMapDevices";
import useMapController from "@/hooks/useMapController";
import DeviceSidebar from "@/components/pages/map/DeviceSidebar";
import GoogleMapView from "@/components/pages/map/GoogleMapView";


export default function MapPage() {
    const [search, setSearch] = useState("");

    const debouncedSearch = useDebounce(search, 500);

    const { devices } = useMapDevices({
        search: debouncedSearch,
    });

    const { focusedDeviceId, setFocusedDeviceId } = useMapController();

    return (
        <div
            className="flex flex-col md:flex-row h-[calc(100vh-80px)]
            "
        >
            <DeviceSidebar
                devices={devices}
                search={search}
                onSearchChange={setSearch}
                onFocusDevice={setFocusedDeviceId}
            />

            <div className="flex-1">
                <GoogleMapView
                    devices={devices}
                    focusedDeviceId={focusedDeviceId}
                />
            </div>
        </div>
    );
}
