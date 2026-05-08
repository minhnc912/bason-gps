import Modal from "./Modal";

interface Props {
    open: boolean;

    title?: string;

    description?: string;

    confirmText?: string;

    cancelText?: string;

    onClose: () => void;

    onConfirm: () => void;

    loading?: boolean;
}

export default function ConfirmModal({
    open,
    title = "Confirm",
    description = "Are you sure?",
    confirmText = "Confirm",
    cancelText = "Cancel",
    onClose,
    onConfirm,
    loading,
}: Props) {
    return (
        <Modal open={open} onClose={onClose} title={title} className="max-w-md">
            <div className="space-y-6">
                <p className="text-sm text-gray-600">{description}</p>

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="rounded-lg border px-4 py-2 text-sm"
                    >
                        {cancelText}
                    </button>

                    <button
                        disabled={loading}
                        onClick={onConfirm}
                        className="rounded-lg bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700 disabled:opacity-50"
                    >
                        {loading ? "Loading..." : confirmText}
                    </button>
                </div>
            </div>
        </Modal>
    );
}
