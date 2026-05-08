import api from "./api";
import { DevicePagination } from "@/types/devices";
import { API_ENDPOINTS } from "@/constants/api";

export interface DeviceQueryParams {
    page: number;
    search: string;
}

export interface CreateDevicePayload {
    unit_id: string;

    serial?: string;

    opcenter_id: number;
}

export interface UpdateDevicePayload {
    unit_id: string;

    serial?: string;

    opcenter_id: number;

    status: string;
}

export const getDevices = async (params: DeviceQueryParams) => {
    return api.get<DevicePagination>(API_ENDPOINTS.DEVICES, {
        params,
    });
};

export const createDevice = (payload: CreateDevicePayload) => {
    return api.post(API_ENDPOINTS.DEVICES, payload);
};

export const updateDevice = (id: number, payload: UpdateDevicePayload) => {
    return api.put(`${API_ENDPOINTS.DEVICES}/${id}`, payload);
};

export const deleteDevice = (id: number) => {
    return api.delete(`${API_ENDPOINTS.DEVICES}/${id}`);
};
