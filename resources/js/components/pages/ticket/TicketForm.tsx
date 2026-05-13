import { useEffect, useState } from "react";

import { getDevices } from "@/services/device.service";

import { Device } from "@/types/devices";

export interface TicketFormData {
    unit_id: string;

    truck_number: string;

    meter_number: string;

    address: string;

    latitude?: number;

    longitude?: number;

    action: string;
}

interface Props {
    loading?: boolean;

    defaultValues?: Partial<TicketFormData>;

    onSubmit: (data: TicketFormData) => void;
}

const ACTION_OPTIONS = [
    "Install",
    "Remove",
    "Maintenance",
    "Transfer",
    "Repair",
];

export default function TicketForm({
    loading,
    defaultValues,
    onSubmit,
}: Props) {
    const [devices, setDevices] = useState<Device[]>([]);

    const [form, setForm] = useState<TicketFormData>({
        unit_id: defaultValues?.unit_id ?? "",

        truck_number: defaultValues?.truck_number ?? "",

        meter_number: defaultValues?.meter_number ?? "",

        address: defaultValues?.address ?? "",

        latitude: defaultValues?.latitude,

        longitude: defaultValues?.longitude,

        action: defaultValues?.action ?? "Install",
    });

    useEffect(() => {
        loadDevices();
    }, []);

    const loadDevices = async () => {
        try {
            const response = await getDevices({
                page: 1,
                search: "",
            });

            setDevices(response.data.data);
        } catch {
            //
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        onSubmit(form);
    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
                <label className="mb-1 block text-sm font-medium">Device</label>

                <select
                    value={form.unit_id}
                    onChange={(e) =>
                        setForm((prev) => ({
                            ...prev,
                            unit_id: e.target.value,
                        }))
                    }
                    className="w-full rounded-lg border px-3 py-2"
                    required
                >
                    <option value="">Select device</option>

                    {devices.map((device) => (
                        <option key={device.id} value={device.unit_id}>
                            {device.unit_id}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="mb-1 block text-sm font-medium">Action</label>

                <select
                    value={form.action}
                    onChange={(e) =>
                        setForm((prev) => ({
                            ...prev,
                            action: e.target.value,
                        }))
                    }
                    className="w-full rounded-lg border px-3 py-2"
                >
                    {ACTION_OPTIONS.map((action) => (
                        <option key={action} value={action}>
                            {action}
                        </option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                    <label className="mb-1 block text-sm font-medium">
                        Truck Number
                    </label>

                    <input
                        type="text"
                        value={form.truck_number}
                        onChange={(e) =>
                            setForm((prev) => ({
                                ...prev,
                                truck_number: e.target.value,
                            }))
                        }
                        className="w-full rounded-lg border px-3 py-2"
                    />
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium">
                        Meter Number
                    </label>

                    <input
                        type="text"
                        value={form.meter_number}
                        onChange={(e) =>
                            setForm((prev) => ({
                                ...prev,
                                meter_number: e.target.value,
                            }))
                        }
                        className="w-full rounded-lg border px-3 py-2"
                    />
                </div>
            </div>

            <div>
                <label className="mb-1 block text-sm font-medium">
                    Address
                </label>

                <input
                    type="text"
                    value={form.address}
                    onChange={(e) =>
                        setForm((prev) => ({
                            ...prev,
                            address: e.target.value,
                        }))
                    }
                    className="w-full rounded-lg border px-3 py-2"
                />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                    <label className="mb-1 block text-sm font-medium">
                        Latitude
                    </label>

                    <input
                        type="number"
                        step="any"
                        value={form.latitude ?? ""}
                        onChange={(e) =>
                            setForm((prev) => ({
                                ...prev,
                                latitude: Number(e.target.value),
                            }))
                        }
                        className="w-full rounded-lg border px-3 py-2"
                    />
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium">
                        Longitude
                    </label>

                    <input
                        type="number"
                        step="any"
                        value={form.longitude ?? ""}
                        onChange={(e) =>
                            setForm((prev) => ({
                                ...prev,
                                longitude: Number(e.target.value),
                            }))
                        }
                        className="w-full rounded-lg border px-3 py-2"
                    />
                </div>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
            >
                {loading ? "Saving..." : "Save Ticket"}
            </button>
        </form>
    );
}
