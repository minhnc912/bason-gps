import { useEffect } from "react";

import { useForm } from "react-hook-form";

interface Props {
    defaultValues?: {
        name: string;
    };

    onSubmit: (data: { name: string }) => void;
}

export default function OpcenterForm({ defaultValues, onSubmit }: Props) {
    const { register, handleSubmit, reset } = useForm({
        defaultValues,
    });

    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues, reset]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input
                {...register("name")}
                placeholder="Opcenter name"
                className="w-full rounded-lg border px-4 py-2"
            />

            <button className="w-full rounded-lg bg-blue-600 py-2 text-white">
                Save
            </button>
        </form>
    );
}
