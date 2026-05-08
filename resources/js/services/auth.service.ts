import api from "./api";
import { API_ENDPOINTS } from "@/constants/api";
import { LoginPayload, RegisterPayload, AuthResponse } from "@/types/auth";

export const login = (payload: LoginPayload) => {
    return api.post<AuthResponse>(API_ENDPOINTS.LOGIN, payload);
};

export const register = (payload: RegisterPayload) => {
    return api.post<AuthResponse>(API_ENDPOINTS.REGISTER, payload);
};

export const getMe = () => {
    return api.get(API_ENDPOINTS.ME);
};
