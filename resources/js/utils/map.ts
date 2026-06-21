import { Device } from "@/types/devices";
import { MapDevice } from "@/types/map";


export function getDevicePosition(
    device: MapDevice,
) {
    const latitude =
        device.latitude;

    const longitude =
        device.longitude;

    if (
        latitude === null ||
        latitude === undefined ||
        longitude === null ||
        longitude === undefined
    ) {
        return null;
    }

    const lat = Number(latitude);
    const lng = Number(longitude);

    if (
        !Number.isFinite(lat) ||
        !Number.isFinite(lng)
    ) {
        return null;
    }

    return {
        lat,
        lng,
    };
}
