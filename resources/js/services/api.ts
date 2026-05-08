import { ROUTES } from "@/constants/route";
import { STORAGE_KEYS } from "@/constants/storage";
import { getToken } from "@/utils/auth";
import { removeEmptyParams } from "@/utils/request";
import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
    const token = getToken();

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    const opcenterId = localStorage.getItem(STORAGE_KEYS.OPCENTER_ID);

    if (opcenterId) {
        config.params = removeEmptyParams({
            ...config.params,
            opcenter_id: opcenterId,
        });
    }

    return config;
});

api.interceptors.response.use(
    (res) => res,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem(STORAGE_KEYS.TOKEN);
            globalThis.location.href = ROUTES.LOGIN;
        }

        return Promise.reject(error);
    },
);

export default api;
