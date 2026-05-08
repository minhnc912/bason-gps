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
    return (
        <div className="flex items-center justify-end gap-2">
            <button
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                className="rounded-lg border px-3 py-2 disabled:opacity-50"
            >
                Prev
            </button>

            <span className="text-sm text-gray-600">
                {currentPage} / {lastPage}
            </span>

            <button
                disabled={currentPage === lastPage}
                onClick={() => onPageChange(currentPage + 1)}
                className="rounded-lg border px-3 py-2 disabled:opacity-50"
            >
                Next
            </button>
        </div>
    );
}
