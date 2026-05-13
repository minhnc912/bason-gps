import { useState } from "react";
import toast from "react-hot-toast";
import {
    createOpcenter,
    deleteOpcenter,
    updateOpcenter,
} from "@/services/opcenter.service";
import type { Opcenter } from "@/types/opcenter";
import { useOpcentersPage } from "@/hooks/useOpcentersPage";
import useDebounce from "@/hooks/useDebounce";
import OpcenterForm from "@/components/pages/opcenter/OpcenterForm";
import Modal from "@/components/common/Modal";
import ConfirmModal from "@/components/common/ConfirmModal";
import OpcenterTable from "@/components/pages/opcenter/OpcenterTable";
import { UserRoleEnum } from "@/components/enums/user-role.enum";
import { useAuthContext } from "@/app/providers/AuthProvider";
import TablePagination from "@/components/common/table/TablePagination";
import TableSearchInput from "@/components/common/table/TableSearchInput";
import DataTable from "@/components/common/table/DataTable";
import TableLoading from "@/components/common/table/TableLoading";
import TableEmptyState from "@/components/common/table/TableEmptyState";

export default function OpcentersPage() {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [openForm, setOpenForm] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [selected, setSelected] = useState<Opcenter | null>(null);
    const debouncedSearch = useDebounce(search);
    const { opcenters, pagination, loading, refetch } = useOpcentersPage({
        page,
        search: debouncedSearch,
    });
    const { user } = useAuthContext();
    const isSuperUser = user?.role === UserRoleEnum.SUPERUSER;

    const handleCreate = () => {
        setSelected(null);

        setOpenForm(true);
    };

    const handleEdit = (opcenter: Opcenter) => {
        setSelected(opcenter);

        setOpenForm(true);
    };

    const handleDelete = (opcenter: Opcenter) => {
        setSelected(opcenter);

        setOpenDelete(true);
    };

    const handleSubmit = async (data: { name: string }) => {
        try {
            if (selected) {
                await updateOpcenter(selected.id, data);

                toast.success("Updated successfully");
            } else {
                await createOpcenter(data);

                toast.success("Created successfully");
            }

            setOpenForm(false);

            refetch();
        } catch {
            toast.error("Operation failed");
        }
    };

    const confirmDelete = async () => {
        if (!selected) {
            return;
        }

        try {
            await deleteOpcenter(selected.id);

            toast.success("Deleted successfully");

            setOpenDelete(false);

            refetch();
        } catch {
            toast.error("Delete failed");
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Opcenters</h1>

                {isSuperUser && (
                    <button
                        onClick={handleCreate}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-white"
                    >
                        Create
                    </button>
                )}
            </div>

            <TableSearchInput value={search} onChange={setSearch} />
            <DataTable
                headers={["ID", "Name", ...(isSuperUser ? ["Action"] : [])]}
            >
                {loading && <TableLoading columns={isSuperUser ? 3 : 2} />}

                {!loading && opcenters.length === 0 && <TableEmptyState />}

                {!loading && opcenters.length > 0 && (
                    <OpcenterTable
                        isSuperUser={isSuperUser}
                        onDelete={handleDelete}
                        onEdit={handleEdit}
                        opcenters={opcenters}
                    />
                )}
            </DataTable>

            <TablePagination
                currentPage={pagination.currentPage}
                lastPage={pagination.lastPage}
                onPageChange={setPage}
            />

            <Modal
                open={openForm}
                onClose={() => setOpenForm(false)}
                title={selected ? "Edit Opcenter" : "Create Opcenter"}
            >
                <OpcenterForm
                    defaultValues={selected ?? undefined}
                    onSubmit={handleSubmit}
                />
            </Modal>

            <ConfirmModal
                open={openDelete}
                onClose={() => setOpenDelete(false)}
                onConfirm={confirmDelete}
                title="Delete Opcenter"
                description="Are you sure?"
            />
        </div>
    );
}
