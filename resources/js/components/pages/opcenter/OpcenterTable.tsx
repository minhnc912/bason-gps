import { Opcenter } from "@/types/opcenter";

interface Props {
    opcenters: Opcenter[];
    isSuperUser: boolean;
    onEdit: (opcenter: Opcenter) => void;
    onDelete: (opcenter: Opcenter) => void;
}

function OpcenterTable({ opcenters, isSuperUser, onEdit, onDelete }: Props) {
    return (
        <>
            {opcenters.map((opcenter) => (
                <tr key={opcenter.id} className="border-t">
                    <td className="px-1">{opcenter.id}</td>

                    <td className="px-1">{opcenter.name}</td>

                    {isSuperUser && (
                        <td className="p-1">
                            <div className="flex gap-2">
                                <button
                                    className="rounded-lg border px-3 py-1 text-sm hover:bg-gray-100 cursor-pointer"
                                    onClick={() => onEdit(opcenter)}
                                >
                                    Edit
                                </button>

                                <button
                                    className="rounded-lg border border-red-200 px-3 py-1 text-sm text-red-600 hover:bg-red-50 cursor-pointer"
                                    onClick={() => onDelete(opcenter)}
                                >
                                    Delete
                                </button>
                            </div>
                        </td>
                    )}
                </tr>
            ))}
        </>
    );
}

export default OpcenterTable;
