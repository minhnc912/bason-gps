import { useEffect, useState } from "react";

import { useParams, Link } from "react-router-dom";

import { getDeviceHistories } from "@/services/device-history.service";

import { DeviceHistory, DeviceHistoryResponse } from "@/types/device-history";

import { formatDuration } from "@/utils/date";

import { ROUTES } from "@/constants/route";
import PowerBadge from "@/components/pages/devices/PowerBadge";
import AddressLink from "@/components/pages/devices/AddressLink";
import DataTable from "@/components/common/table/DataTable";
import TableLoading from "@/components/common/table/TableLoading";
import TableEmptyState from "@/components/common/table/TableEmptyState";

export default function DeviceHistoryPage() {
    const { id } = useParams();

    const [loading, setLoading] = useState(true);

    const [data, setData] = useState<DeviceHistoryResponse | null>(null);

    const fetchHistories = async () => {
        try {
            const res = await getDeviceHistories(Number(id));

            setData(res.data);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHistories();
    }, [id]);

    const currentSession = data?.current_session;

    const histories = data?.histories.data ?? [];

    if (loading) {
        return (
            <div className="space-y-6">
                <div className="h-32 animate-pulse rounded-2xl bg-gray-200" />

                <div className="h-96 animate-pulse rounded-2xl bg-gray-200" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}

            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Device History</h1>

                    <p className="text-gray-500">Device session timeline</p>
                </div>

                <Link
                    to={ROUTES.DEVICES}
                    className="rounded-xl border px-4 py-2 text-sm hover:bg-gray-100"
                >
                    Back to Devices
                </Link>
            </div>

            {/* Current Session */}

            <div className="rounded-2xl border bg-white p-6 shadow-sm">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-semibold">
                            Current Active Session
                        </h2>

                        <p className="text-sm text-gray-500">
                            Latest realtime session
                        </p>
                    </div>

                    {currentSession && (
                        <PowerBadge power={currentSession.power_status} />
                    )}
                </div>

                {!currentSession ? (
                    <div className="rounded-xl border border-dashed p-10 text-center text-gray-500">
                        No active session found
                    </div>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <SessionInfoCard
                            label="Start Time"
                            value={new Date(
                                currentSession.started_at,
                            ).toLocaleString()}
                        />

                        <SessionInfoCard
                            label="Last Report"
                            value={new Date(
                                currentSession.ended_at,
                            ).toLocaleString()}
                        />

                        <SessionInfoCard
                            label="Duration"
                            value={formatDuration(
                                currentSession.duration_seconds,
                            )}
                        />

                        <SessionInfoCard
                            label="Assignee"
                            value={currentSession.operator ?? "-"}
                        />

                        <SessionInfoCard
                            label="Firmware"
                            value={currentSession.firmware_version ?? "-"}
                        />

                        <div>
                            <p className="mb-1 text-sm text-gray-500">
                                Address
                            </p>

                            <div className="rounded-xl border bg-gray-50 p-4 text-sm">
                                <AddressLink address={currentSession.address} />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* History Table */}

            <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
                <div className="border-b p-6">
                    <h2 className="text-lg font-semibold">Previous Sessions</h2>

                    <p className="text-sm text-gray-500">
                        Last 15 completed sessions
                    </p>
                </div>

                {histories.length === 0 ? (
                    <div className="p-10 text-center text-gray-500">
                        No history found
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <DataTable
                            headers={[
                                "Start Time",
                                "End Time",
                                "Duration",
                                "Assignee",
                                "Firmware",
                                "Power",
                                "Last Location",
                            ]}
                        >
                            {loading && <TableLoading columns={7} />}

                            {!loading && histories.length === 0 && (
                                <TableEmptyState />
                            )}

                            {!loading &&
                                histories.length > 0 &&
                                histories.map((history: DeviceHistory) => (
                                    <tr
                                        key={history.id}
                                        className="border-t hover:bg-gray-50"
                                    >
                                        <td className="p-4 text-sm">
                                            {new Date(
                                                history.started_at,
                                            ).toLocaleString()}
                                        </td>

                                        <td className="p-4 text-sm">
                                            {new Date(
                                                history.ended_at,
                                            ).toLocaleString()}
                                        </td>

                                        <td className="p-4 text-sm">
                                            {formatDuration(
                                                history.duration_seconds,
                                            )}
                                        </td>

                                        <td className="p-4 text-sm">
                                            {history.operator ?? "-"}
                                        </td>

                                        <td className="p-4 text-sm">
                                            {history.firmware_version ?? "-"}
                                        </td>

                                        <td className="p-4">
                                            <PowerBadge
                                                power={history.power_status}
                                            />
                                        </td>

                                        <td className="max-w-xs p-4 text-sm">
                                            <AddressLink
                                                address={history.address}
                                            />
                                        </td>
                                    </tr>
                                ))}
                        </DataTable>
                    </div>
                )}
            </div>
        </div>
    );
}

interface SessionInfoCardProps {
    label: string;

    value: string;
}

function SessionInfoCard({ label, value }: SessionInfoCardProps) {
    return (
        <div>
            <p className="mb-1 text-sm text-gray-500">{label}</p>

            <div className="rounded-xl border bg-gray-50 p-4 text-sm font-medium">
                {value}
            </div>
        </div>
    );
}
