import { useEffect, useState } from "react";

import { getOpcenterOptions } from "@/services/opcenter.service";

import type { Opcenter } from "@/types/opcenter";

export function useOpcenters() {
    const [opCenters, setOpCenters] = useState<Opcenter[]>([]);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const res = await getOpcenterOptions();

                setOpCenters(res.data);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return {
        opCenters,
        loading,
    };
}
