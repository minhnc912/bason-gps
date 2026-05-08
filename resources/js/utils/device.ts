import { DEVICE_ONLINE_MINUTES } from "@/constants/device";
import { DeviceState } from "@/types/devices";

export const isDeviceOnline = (lastReportAt?: string | null) => {
    if (!lastReportAt) {
        return false;
    }

    const diff = Date.now() - new Date(lastReportAt).getTime();

    return diff < DEVICE_ONLINE_MINUTES * 60 * 1000;
};

export const formatPowerStatus = (power?: boolean) => {
    return power ? "AC" : "DC";
};

export const isApproximateLocation = (
    lat?: number | null,
    lng?: number | null,
) => {
    return lat === 0.000001 || lng === 0.000001;
};
