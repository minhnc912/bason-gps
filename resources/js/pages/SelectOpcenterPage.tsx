import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import { ROUTES } from "@/constants/route";

import { STORAGE_KEYS } from "@/constants/storage";
import { Button } from "@/components/ui/Button";
import { useOpcenters } from "@/hooks/useOpcenters";

export default function SelectOpcenterPage() {
    const navigate = useNavigate();

    const { opCenters, loading } = useOpcenters();

    const [submitting, setSubmitting] = useState(false);

    const [selectedOpcenter, setSelectedOpcenter] = useState("");

    const handleContinue = () => {
        if (!selectedOpcenter) {
            toast.error("Please select an opcenter");

            return;
        }

        setSubmitting(true);

        localStorage.setItem(STORAGE_KEYS.OPCENTER_ID, selectedOpcenter);

        toast.success("Opcenter selected");

        navigate(ROUTES.HOME);
    };

    return (
        <div className="mx-auto flex min-h-[70vh] max-w-md items-center justify-center px-4">
            <div className="w-full rounded-3xl border bg-white p-8 shadow-sm">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold">Select Opcenter</h1>

                    <p className="mt-2 text-sm text-gray-500">
                        Choose an operation center to continue
                    </p>
                </div>

                {loading ? (
                    <div className="space-y-4">
                        <div className="h-12 animate-pulse rounded-xl bg-gray-200" />

                        <div className="h-12 animate-pulse rounded-xl bg-gray-200" />
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                Opcenter
                            </label>

                            <select
                                value={selectedOpcenter}
                                onChange={(e) =>
                                    setSelectedOpcenter(e.target.value)
                                }
                                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500"
                            >
                                <option value="">Choose an opcenter</option>

                                {opCenters.map((opCenter) => (
                                    <option
                                        key={opCenter.id}
                                        value={opCenter.id}
                                    >
                                        {opCenter.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <Button
                            onClick={handleContinue}
                            loading={submitting}
                            className="w-full"
                        >
                            Continue
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
