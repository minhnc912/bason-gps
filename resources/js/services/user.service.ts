import type { UsersResponse } from "@/types/user";
import api from "./api";

export const getUsers = (page = 1, search = "") => {
    return api.get<UsersResponse>("/users", {
        params: {
            page,
            search,
        },
    });
};

export const updateUserRole = (userId: number, role: string) => {
    return api.put(`/users/${userId}/role`, {
        role,
    });
};
