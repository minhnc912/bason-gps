import type { Opcenter, OpcentersResponse } from "@/types/opcenter";
import api from "./api";
import { API_ENDPOINTS } from "@/constants/api";

export const getOpcenters = (page = 1, search = "") => {
    return api.get<OpcentersResponse>(API_ENDPOINTS.OPCENTERS, {
        params: {
            page,
            search,
        },
    });
};

export const getOpcenterOptions = () => {
    return api.get<Opcenter[]>(API_ENDPOINTS.OPCENTERSOPTIONS);
};

export const createOpcenter = (payload: { name: string }) => {
    return api.post(API_ENDPOINTS.OPCENTERS, payload);
};

export const updateOpcenter = (
    id: number,
    payload: {
        name: string;
    },
) => {
    return api.put(`/opcenters/${id}`, payload);
};

export const deleteOpcenter = (id: number) => {
    return api.delete(`/opcenters/${id}`);
};
