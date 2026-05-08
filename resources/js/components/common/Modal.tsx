import type { ReactNode } from "react";

import clsx from "clsx";

interface Props {
    open: boolean;

    title?: string;

    children: ReactNode;

    onClose: () => void;

    className?: string;
}

export default function Modal({
    open,
    title,
    children,
    onClose,
    className,
}: Props) {
    if (!open) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div
                className={clsx(
                    "w-full max-w-lg rounded-2xl bg-white shadow-xl",
                    className,
                )}
            >
                <div className="flex items-center justify-between border-b px-6 py-4">
                    <h2 className="text-lg font-semibold">{title}</h2>

                    <button
                        onClick={onClose}
                        className="text-gray-500 transition hover:text-black"
                    >
                        ✕
                    </button>
                </div>

                <div className="p-6">{children}</div>
            </div>
        </div>
    );
}
