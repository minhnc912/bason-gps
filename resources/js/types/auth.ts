export interface LoginPayload {
    email: string;
    password: string;
    opcenter_id?: number;
}

export interface RegisterPayload {
    name: string;
    email: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    user: {
        id: number;
        name: string;
        email: string;
        role: string;
    };
}
