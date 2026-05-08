import api from "./api";
import { DevicePagination } from "@/types/devices";
import { API_ENDPOINTS } from "@/constants/api";

export interface DeviceQueryParams {
    page: number;
    search: string;
}

export const getDevices = async (params: DeviceQueryParams) => {
    return api.get<DevicePagination>(API_ENDPOINTS.DEVICES, {
        params,
    });
};
