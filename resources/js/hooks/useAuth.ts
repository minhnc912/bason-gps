import { useState } from "react";
import {
    login as loginApi,
    register as registerApi,
} from "@/services/auth.service";
import { STORAGE_KEYS } from "@/constants/storage";
import { getToken } from "@/utils/auth";
import { LoginPayload, RegisterPayload } from "@/types/auth";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/route";

export function useAuth() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const isAuthenticated = !!getToken();

    const login = async (payload: LoginPayload) => {
        setLoading(true);
        try {
            const res = await loginApi(payload);

            localStorage.setItem(STORAGE_KEYS.TOKEN, res.data.token);
            localStorage.setItem(
                STORAGE_KEYS.OPCENTER_ID,
                String(payload.opcenter_id),
            );
            return res.data;
        } finally {
            setLoading(false);
        }
    };

    const register = async (payload: RegisterPayload) => {
        setLoading(true);
        try {
            const res = await registerApi(payload);

            return res.data;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        const keysToRemove = [STORAGE_KEYS.TOKEN, STORAGE_KEYS.OPCENTER_ID];
        keysToRemove.forEach((key) => localStorage.removeItem(key));
        navigate(ROUTES.HOME);
    };

    return {
        login,
        register,
        logout,
        loading,
        isAuthenticated,
    };
}
