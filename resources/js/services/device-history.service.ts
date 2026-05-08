import { API_ENDPOINTS } from "@/constants/api";

import { DeviceHistoryResponse } from "@/types/device-history";
import api from "./api";

export const getDeviceHistories = (deviceId: number) => {
    return api.get<DeviceHistoryResponse>(
        API_ENDPOINTS.DEVICE_HISTORIES(deviceId),
    );
};
