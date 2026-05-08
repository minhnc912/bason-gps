import clsx from "clsx";

interface Props {
    currentPage: number;

    lastPage: number;

    onPageChange: (page: number) => void;
}

export default function Pagination({
    currentPage,
    lastPage,
    onPageChange,
}: Props) {
    const pages = Array.from(
        {
            length: lastPage,
        },
        (_, i) => i + 1,
    );

    return (
        <div className="flex flex-wrap items-center justify-center gap-2">
            <button
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                className="rounded-lg border px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
            >
                Prev
            </button>

            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={clsx(
                        "rounded-lg border px-4 py-2 text-sm transition-colors",

                        currentPage === page
                            ? "bg-blue-600 text-white border-blue-600"
                            : "hover:bg-gray-100",
                    )}
                >
                    {page}
                </button>
            ))}

            <button
                disabled={currentPage === lastPage}
                onClick={() => onPageChange(currentPage + 1)}
                className="rounded-lg border px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
            >
                Next
            </button>
        </div>
    );
}
