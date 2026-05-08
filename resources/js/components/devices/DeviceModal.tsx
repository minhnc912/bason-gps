import { Device } from "@/types/devices";
import DeviceForm, { type DeviceFormData } from "./DeviceForm";

interface Props {
    open: boolean;

    title: string;

    device?: Device | null;

    loading?: boolean;

    onClose: () => void;

    onSubmit: (data: DeviceFormData) => void;
}

export default function DeviceModal({
    open,
    title,
    device,
    loading,
    onClose,
    onSubmit,
}: Props) {
    if (!open) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-semibold">{title}</h2>

                    <button onClick={onClose}>✕</button>
                </div>

                <DeviceForm
                    loading={loading}
                    defaultValues={
                        device
                            ? {
                                  unit_id: device.unit_id,

                                  serial: device.serial ?? "",

                                  opcenter_id: device.opcenter_id,
                              }
                            : undefined
                    }
                    onSubmit={onSubmit}
                />
            </div>
        </div>
    );
}
