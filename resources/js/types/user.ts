export interface User {
    id: number;

    name: string;

    email: string;

    role: string | null;

    created_at: string;
}

export interface UsersResponse {
    data: User[];

    current_page: number;

    last_page: number;
}
