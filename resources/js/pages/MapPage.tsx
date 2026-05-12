import { useMemo, useRef } from "react";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import type { Map as LeafletMap } from "leaflet";

import L from "leaflet";

import { useMapDevices } from "@/hooks/useMapDevices";

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",

    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",

    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function MapPage() {
    const { devices } = useMapDevices();

    const mapRef = useRef<LeafletMap | null>(null);

    const validDevices = useMemo(() => {
        return devices.filter((device) => device.latitude && device.longitude);
    }, [devices]);

    const defaultCenter = useMemo(() => {
        if (validDevices.length > 0) {
            return [
                Number(validDevices[0].latitude),
                Number(validDevices[0].longitude),
            ] as [number, number];
        }

        return [16.047079, 108.20623] as [number, number];
    }, [validDevices]);

    const handleFocusDevice = (latitude: number, longitude: number) => {
        if (!mapRef.current) {
            return;
        }

        mapRef.current.flyTo([latitude, longitude], 16, {
            duration: 1.5,
        });
    };

    return (
        <div className="flex flex-col md:flex-row h-[calc(100vh-80px)]">
            <div className="w-full md:w-[320px] max-h-55 md:max-h-full border-b md:border-b-0 md:border-r overflow-y-auto bg-white">
                <div className="p-4 border-b font-semibold text-lg">
                    Devices
                </div>

                <div className="divide-y">
                    {validDevices.map((device) => (
                        <button
                            key={device.id}
                            onClick={() =>
                                handleFocusDevice(
                                    Number(device.latitude),
                                    Number(device.longitude),
                                )
                            }
                            className="
                                w-full
                                text-left
                                p-4
                                hover:bg-gray-100
                                transition
                            "
                        >
                            <div className="font-medium">{device.unit_id}</div>

                            <div className="text-sm text-gray-500 truncate">
                                {device.address || "No address"}
                            </div>

                            <div className="mt-1 text-xs">
                                Status: {device.tool_watch || "-"}
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex-1">
                <MapContainer
                    center={defaultCenter}
                    zoom={13}
                    className="h-full w-full"
                    ref={mapRef}
                >
                    <TileLayer
                        attribution="&copy; OpenStreetMap"
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {validDevices.map((device) => (
                        <Marker
                            key={device.id}
                            position={[
                                Number(device.latitude),
                                Number(device.longitude),
                            ]}
                        >
                            <Popup>
                                <div className="space-y-2 min-w-[220px]">
                                    <div className="font-semibold">
                                        {device.unit_id}
                                    </div>

                                    <div className="text-sm">
                                        {device.address}
                                    </div>

                                    <div>Status: {device.tool_watch}</div>

                                    <div>
                                        Power:{" "}
                                        {device.power_status ? "ON" : "OFF"}
                                    </div>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
        </div>
    );
}
