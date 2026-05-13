interface Props {
    columns?: number;

    rows?: number;
}

export default function TableLoading({ columns = 5, rows = 8 }: Props) {
    return (
        <>
            {Array.from({ length: rows }).map((_, rowIndex) => (
                <tr key={rowIndex} className="border-t">
                    {Array.from({ length: columns }).map((_, columnIndex) => (
                        <td key={columnIndex} className="p-4">
                            <div className="h-4 animate-pulse rounded bg-gray-200" />
                        </td>
                    ))}
                </tr>
            ))}
        </>
    );
}
