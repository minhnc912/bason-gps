import { useState } from "react";
import toast from "react-hot-toast";
import Pagination from "@/components/common/Pagination";
import { useUsers } from "@/hooks/useUsers";
import { updateUserRole } from "@/services/user.service";
import { USER_ROLES } from "@/constants/user-role";
import useDebounce from "@/hooks/useDebounce";
import { useAuthContext } from "@/app/providers/AuthProvider";
import { UserRoleEnum } from "@/components/enums/user-role.enum";
import clsx from "clsx";

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

                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search users..."
                    className="rounded-lg border px-4 py-2"
                />
            </div>

            <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
                <table className="w-full">
                    <thead className="bg-[#4CAF50] text-white text-sm">
                        <tr>
                            <th className="px-4 py-3 text-left">Name</th>

                            <th className="px-4 py-3 text-left">Email</th>

                            <th className="px-4 py-3 text-left">Role</th>

                            <th className="px-4 py-3 text-left">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id} className="border-t">
                                <td className="px-4 py-3">{user.name}</td>

                                <td className="px-4 py-3">{user.email}</td>

                                <td className="px-4 py-3">{user.role}</td>

                                <td className="px-4 py-3">
                                    <select
                                        value={user.role ?? ""}
                                        onChange={(e) =>
                                            handleChangeRole(
                                                user.id,
                                                e.target.value,
                                            )
                                        }
                                        disabled={
                                            user.name ===
                                            UserRoleEnum.SUPERADMIN
                                        }
                                        className={clsx(
                                            "rounded-lg border px-3 py-2 ",
                                            user.name ===
                                                UserRoleEnum.SUPERADMIN
                                                ? "bg-gray-300 cursor-not-allowed"
                                                : "cursor-pointer",
                                        )}
                                    >
                                        {Object.values(USER_ROLES).map(
                                            (role) => (
                                                <option key={role} value={role}>
                                                    {role}
                                                </option>
                                            ),
                                        )}
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {!loading && users.length === 0 && (
                    <div className="p-8 text-center text-gray-500">
                        No users found
                    </div>
                )}
            </div>

            <Pagination
                currentPage={pagination.currentPage}
                lastPage={pagination.lastPage}
                onPageChange={setPage}
            />
        </div>
    );
}
