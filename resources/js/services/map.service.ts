import api from "./api";

import { API_ENDPOINTS } from "@/constants/api";

interface MapDeviceParams {
    search?: string;
}

export const getMapDevices = (params?: MapDeviceParams) => {
    return api.get(API_ENDPOINTS.MAP_DEVICES, {
        params,
    });
};
