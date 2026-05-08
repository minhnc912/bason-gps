import { useEffect } from "react";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";

import { useOpcenters } from "@/hooks/useOpcenters";

const schema = z.object({
    unit_id: z.string().min(1, "Unit ID is required"),

    serial: z.string().optional(),

    opcenter_id: z.coerce.number(),
});

type DeviceFormInput = z.input<typeof schema>;

export type DeviceFormData = z.output<typeof schema>;

interface Props {
    defaultValues?: Partial<DeviceFormData>;

    loading?: boolean;

    onSubmit: (data: DeviceFormData) => void;
}

export default function DeviceForm({
    defaultValues,
    loading,
    onSubmit,
}: Props) {
    const { opCenters } = useOpcenters();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<DeviceFormInput, unknown, DeviceFormData>({
        resolver: zodResolver(schema),

        defaultValues: {
            unit_id: defaultValues?.unit_id ?? "",

            serial: defaultValues?.serial ?? "",

            opcenter_id: defaultValues?.opcenter_id,
        },
    });

    useEffect(() => {
        if (defaultValues) {
            reset({
                unit_id: defaultValues.unit_id,

                serial: defaultValues.serial ?? "",

                opcenter_id: defaultValues.opcenter_id,
            });

            return;
        }

        if (opCenters.length > 0) {
            reset({
                unit_id: "",

                serial: "",

                opcenter_id: opCenters[0].id,
            });
        }
    }, [defaultValues, opCenters, reset]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <input
                    {...register("unit_id")}
                    placeholder="Unit ID"
                    className="w-full rounded-lg border px-4 py-2"
                />

                {errors.unit_id && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.unit_id.message}
                    </p>
                )}
            </div>

            <div>
                <input
                    {...register("serial")}
                    placeholder="Serial"
                    className="w-full rounded-lg border px-4 py-2"
                />
            </div>

            <div>
                <select
                    {...register("opcenter_id", {
                        valueAsNumber: true,
                    })}
                    className="w-full rounded-lg border px-4 py-2"
                >
                    {opCenters.map((opcenter) => (
                        <option key={opcenter.id} value={opcenter.id}>
                            {opcenter.name}
                        </option>
                    ))}
                </select>

                {errors.opcenter_id && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.opcenter_id.message}
                    </p>
                )}
            </div>

            <button
                disabled={loading}
                className="w-full rounded-lg bg-blue-600 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
            >
                {loading ? "Saving..." : "Save Device"}
            </button>
        </form>
    );
}
