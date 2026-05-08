import { getOpCenters } from "@/services/opcenter.service";
import { OpCenter } from "@/types/opcenter";
import { useEffect, useState } from "react";

export function useOpcenters() {
    const [opCenters, setOpCenters] = useState<OpCenter[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchOpCenters = async () => {
        try {
            const res = await getOpCenters();
            setOpCenters(res.data);
        } catch {
            setError("Không load được danh sách khu vực");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOpCenters();
    }, []);

    return { opCenters, loading, error, refetch: fetchOpCenters };
}
