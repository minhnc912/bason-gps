import {
    GoogleMap,
    Marker,
    InfoWindow,
    useJsApiLoader,
} from "@react-google-maps/api";

import { useEffect, useRef, useState } from "react";

import {
    DEFAULT_CENTER,
    DEFAULT_ZOOM,
    DEVICE_FOCUS_ZOOM,
    MAP_CONTAINER_STYLE,
} from "@/constants/map";
import { getDevicePosition } from "@/utils/map";
import { MapDevice } from "@/types/map";

interface Props {
    devices: MapDevice[];
    focusedDeviceId: number | null;
}

export default function GoogleMapView({ devices, focusedDeviceId }: Props) {
    const mapRef = useRef<google.maps.Map | null>(null);

    const hasInitialFitRef = useRef(false);

    const [selectedDevice, setSelectedDevice] = useState<MapDevice | null>(
        null,
    );

    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    });

    const handleMapLoad = (map: google.maps.Map) => {
        mapRef.current = map;
    };

    useEffect(() => {
        if (
            !mapRef.current ||
            devices.length === 0 ||
            hasInitialFitRef.current
        ) {
            return;
        }

        const bounds = new google.maps.LatLngBounds();

        devices.forEach((device) => {
            bounds.extend({
                lat: Number(device.latitude),
                lng: Number(device.longitude),
            });
        });

        mapRef.current.fitBounds(bounds);

        hasInitialFitRef.current = true;
    }, [devices]);

    useEffect(() => {
        if (!mapRef.current || !focusedDeviceId) {
            return;
        }

        const device = devices.find((item) => item.id === focusedDeviceId);

        if (!device) {
            return;
        }

        mapRef.current.panTo({
            lat: Number(device.latitude),
            lng: Number(device.longitude),
        });

        google.maps.event.addListenerOnce(mapRef.current, "idle", () => {
            mapRef.current!.setZoom(DEVICE_FOCUS_ZOOM);
        });

        setSelectedDevice(device);
    }, [focusedDeviceId, devices]);

    if (!isLoaded) {
        return <div className="p-4">Loading map...</div>;
    }

    return (
        <GoogleMap
            mapContainerStyle={MAP_CONTAINER_STYLE}
            center={DEFAULT_CENTER}
            zoom={DEFAULT_ZOOM}
            onLoad={handleMapLoad}
        >
            {devices.map((device) => {
                const position = getDevicePosition(device);

                if (!position) {
                    return null;
                }

                return <Marker key={device.id} position={position} />;
            })}

            {selectedDevice && (
                <InfoWindow
                    position={{
                        lat: Number(selectedDevice.latitude),
                        lng: Number(selectedDevice.longitude),
                    }}
                    options={{
                        pixelOffset: new google.maps.Size(0, -40),
                    }}
                    onCloseClick={() => setSelectedDevice(null)}
                >
                    <div className="space-y-2 min-w-[220px]">
                        <div className="font-semibold">
                            {selectedDevice.unit_id}
                        </div>

                        <div className="text-sm">{selectedDevice.address}</div>

                        <div>
                            Power: {selectedDevice.power_status ? "AC" : "DC"}
                        </div>

                        <div>Status: {selectedDevice.tool_watch ?? "-"}</div>
                    </div>
                </InfoWindow>
            )}
        </GoogleMap>
    );
}
