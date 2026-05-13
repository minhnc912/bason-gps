interface Props {
    message?: string;
}

export default function TableEmptyState({ message = "No data found" }: Props) {
    return (
        <tr>
            <td colSpan={999} className="px-4 py-10 text-center text-gray-500">
                {message}
            </td>
        </tr>
    );
}
