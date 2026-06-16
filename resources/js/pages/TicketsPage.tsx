import { useAuthContext } from "@/app/providers/AuthProvider";
import Modal from "@/components/common/Modal";
import DataTable from "@/components/common/table/DataTable";
import TableEmptyState from "@/components/common/table/TableEmptyState";
import TableLoading from "@/components/common/table/TableLoading";
import TablePagination from "@/components/common/table/TablePagination";
import TableSearchInput from "@/components/common/table/TableSearchInput";
import { UserRoleEnum } from "@/components/enums/user-role.enum";
import TicketForm from "@/components/pages/ticket/TicketForm";
import TicketTable from "@/components/pages/ticket/TicketTable";
import useDebounce from "@/hooks/useDebounce";
import { useTickets } from "@/hooks/useTickets";
import { createTicket, CreateTicketPayload } from "@/services/ticket.service";
import { useState } from "react";
import toast from "react-hot-toast";

function TicketsPage() {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [saving, setSaving] = useState(false);

    const debouncedSearch = useDebounce(search);
    const { user } = useAuthContext();
    const isSuperUser = user?.role === UserRoleEnum.SUPERUSER;

    const { tickets, loading, pagination, refetch } = useTickets({
        page,
        search: debouncedSearch,
    });

    const handleSubmitTicket = async (data: CreateTicketPayload) => {
        try {
            setSaving(true);

            await createTicket(data);

            toast.success("Ticket created");

            setOpenModal(false);

            refetch();
        } catch {
            toast.error("Failed to save device");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Tickets</h1>

                    <p className="text-gray-500">Manage tickets</p>
                </div>

                {isSuperUser && (
                    <button
                        className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
                        onClick={() => {
                            setOpenModal(true);
                        }}
                    >
                        Add Ticket
                    </button>
                )}
            </div>

            {/* <TableSearchInput value={search} onChange={setSearch} /> */}
            <DataTable
                headers={[
                    "Name",
                    "Date Created",
                    "Truck #",
                    "Meter #",
                    "Coordinate",
                    "Address",
                    "Actual Address",
                    "Action",
                    // ...(isSuperUser ? ["Actions"] : []),
                ]}
            >
                {loading && <TableLoading columns={8} />}

                {!loading && tickets.length === 0 && <TableEmptyState />}

                {!loading && tickets.length > 0 && (
                    <TicketTable tickets={tickets} />
                )}
            </DataTable>

            <TablePagination
                currentPage={pagination.currentPage}
                lastPage={pagination.lastPage}
                onPageChange={setPage}
            />

            <Modal
                open={openModal}
                onClose={() => setOpenModal(false)}
                title={"Create Ticket"}
            >
                <TicketForm
                    defaultValues={undefined}
                    loading={saving}
                    onSubmit={handleSubmitTicket}
                />
            </Modal>

            {/* <ConfirmModal open={openDelete} loading={saving} onClose={()=> setOpenDelete(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Device"
        description="Are you sure?"
        /> */}
        </div>
    );
}

export default TicketsPage;
