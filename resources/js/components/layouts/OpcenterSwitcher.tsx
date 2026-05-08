import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import { STORAGE_KEYS } from "@/constants/storage";

import { ROUTES } from "@/constants/route";

import { useOpcenters } from "@/hooks/useOpcenters";

export default function OpcenterSwitcher() {
    const navigate = useNavigate();

    const { opCenters } = useOpcenters();

    const [selectedOpcenter, setSelectedOpcenter] = useState("");

    useEffect(() => {
        const storedOpcenter = localStorage.getItem(STORAGE_KEYS.OPCENTER_ID);

        if (storedOpcenter) {
            setSelectedOpcenter(storedOpcenter);
        }
    }, []);

    const handleChange = (value: string) => {
        setSelectedOpcenter(value);

        localStorage.setItem(STORAGE_KEYS.OPCENTER_ID, value);

        toast.success("Opcenter changed");

        navigate(ROUTES.HOME);
    };

    return (
        <select
            value={selectedOpcenter}
            onChange={(e) => handleChange(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
        >
            <option value="">Select center</option>

            {opCenters.map((opcenter) => (
                <option key={opcenter.id} value={String(opcenter.id)}>
                    {opcenter.name}
                </option>
            ))}
        </select>
    );
}
