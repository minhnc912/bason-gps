interface Props {
    open: boolean;

    loading?: boolean;

    onClose: () => void;

    onConfirm: () => void;
}

export default function DeleteDeviceModal({
    open,
    loading,
    onClose,
    onConfirm,
}: Props) {
    if (!open) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
                <h2 className="mb-4 text-xl font-semibold">Delete Device</h2>

                <p className="mb-6 text-gray-600">
                    Are you sure you want to delete this device?
                </p>

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="rounded-lg border px-4 py-2"
                    >
                        Cancel
                    </button>

                    <button
                        disabled={loading}
                        onClick={onConfirm}
                        className="rounded-lg bg-red-600 px-4 py-2 text-white"
                    >
                        {loading ? "Deleting..." : "Delete"}
                    </button>
                </div>
            </div>
        </div>
    );
}
