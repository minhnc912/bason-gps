import { useEffect, useState } from "react";

import { getUsers } from "@/services/user.service";

import type { User } from "@/types/user";

interface Props {
    page: number;

    search: string;
}

export function useUsers({ page, search }: Props) {
    const [users, setUsers] = useState<User[]>([]);

    const [loading, setLoading] = useState(false);

    const [pagination, setPagination] = useState({
        currentPage: 1,
        lastPage: 1,
    });

    const fetchUsers = async () => {
        try {
            setLoading(true);

            const res = await getUsers(page, search);

            setUsers(res.data.data);

            setPagination({
                currentPage: res.data.current_page,

                lastPage: res.data.last_page,
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [page, search]);

    return {
        users,
        loading,
        pagination,
        refetch: fetchUsers,
    };
}
