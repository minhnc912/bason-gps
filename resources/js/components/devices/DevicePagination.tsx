interface Props {
    currentPage: number;
    lastPage: number;
    onPageChange: (page: number) => void;
}

export default function DevicePagination({
    currentPage,
    lastPage,
    onPageChange,
}: Props) {
    return (
        <div className="mt-4 flex items-center justify-center gap-4">
            <button
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                className="rounded border px-4 py-2"
            >
                Prev
            </button>

            <span>
                {currentPage} / {lastPage}
            </span>

            <button
                disabled={currentPage === lastPage}
                onClick={() => onPageChange(currentPage + 1)}
                className="rounded border px-4 py-2"
            >
                Next
            </button>
        </div>
    );
}
