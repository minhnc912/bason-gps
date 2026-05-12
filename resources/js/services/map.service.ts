import api from "./api";

import { API_ENDPOINTS } from "@/constants/api";

export const getMapDevices = async () => {
    return api.get(API_ENDPOINTS.MAP_DEVICES);
};
