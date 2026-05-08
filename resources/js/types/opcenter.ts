export interface Opcenter {
    id: number;

    name: string;

    created_at: string;
}

export interface OpcentersResponse {
    data: Opcenter[];

    current_page: number;

    last_page: number;
}
