import { useState } from "react";
import toast from "react-hot-toast";
import { useUsers } from "@/hooks/useUsers";
import { updateUserRole } from "@/services/user.service";
import { USER_ROLES } from "@/constants/user-role";
import useDebounce from "@/hooks/useDebounce";
import { UserRoleEnum } from "@/components/enums/user-role.enum";
import clsx from "clsx";
import TablePagination from "@/components/common/table/TablePagination";
import TableSearchInput from "@/components/common/table/TableSearchInput";
import DataTable from "@/components/common/table/DataTable";
import TableLoading from "@/components/common/table/TableLoading";
import TableEmptyState from "@/components/common/table/TableEmptyState";

export default function UsersPage() {
    const [page, setPage] = useState(1);

    const [search, setSearch] = useState("");

    const debouncedSearch = useDebounce(search);

    const { users, loading, pagination, refetch } = useUsers({
        page,
        search: debouncedSearch,
    });

    const handleChangeRole = async (userId: number, role: string) => {
        try {
            await updateUserRole(userId, role);

            toast.success("Role updated");

            refetch();
        } catch {
            toast.error("Failed to update role");
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Users</h1>
            </div>
            {/* <TableSearchInput value={search} onChange={setSearch} /> */}
            <DataTable headers={["Name", "Email", "Role", "Action"]}>
                {loading && <TableLoading columns={4} />}

                {!loading && users.length === 0 && <TableEmptyState />}

                {!loading &&
                    users.length > 0 &&
                    users.map((user) => (
                        <tr key={user.id} className="border-t">
                            <td className="px-1">{user.name}</td>

                            <td className="px-1">{user.email}</td>

                            <td className="px-1">{user.role}</td>

                            <td className="p-1">
                                <select
                                    value={user.role ?? ""}
                                    onChange={(e) =>
                                        handleChangeRole(
                                            user.id,
                                            e.target.value,
                                        )
                                    }
                                    disabled={
                                        user.name === UserRoleEnum.SUPERADMIN
                                    }
                                    className={clsx(
                                        "rounded-lg border p-1 ",
                                        user.name === UserRoleEnum.SUPERADMIN
                                            ? "bg-gray-300 cursor-not-allowed"
                                            : "cursor-pointer",
                                    )}
                                >
                                    {Object.values(USER_ROLES).map((role) => (
                                        <option key={role} value={role}>
                                            {role}
                                        </option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                    ))}
            </DataTable>

            <TablePagination
                currentPage={pagination.currentPage}
                lastPage={pagination.lastPage}
                onPageChange={setPage}
            />
        </div>
    );
}
