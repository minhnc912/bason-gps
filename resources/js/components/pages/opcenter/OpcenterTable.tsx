import { Opcenter } from "@/types/opcenter";

interface Props {
    opcenters: Opcenter[];
    isSuperUser: boolean;
    onEdit: (opcenter: Opcenter) => void;
    onDelete: (opcenter: Opcenter) => void;
}

function OpcenterTable({ opcenters, isSuperUser, onEdit, onDelete }: Props) {
    return (
        <div className="overflow-hidden rounded-2xl border bg-white">
            <table className="w-full">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-4 py-3 text-left">ID</th>

                        <th className="px-4 py-3 text-left">Name</th>

                        {isSuperUser && (
                            <th className="p-4 text-left">Actions</th>
                        )}
                    </tr>
                </thead>

                <tbody>
                    {opcenters.map((opcenter) => (
                        <tr key={opcenter.id} className="border-t">
                            <td className="px-4 py-3">{opcenter.id}</td>

                            <td className="px-4 py-3">{opcenter.name}</td>

                            {isSuperUser && (
                                <td className="p-4">
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
                </tbody>
            </table>
        </div>
    );
}

export default OpcenterTable;
