import { Device } from "@/types/devices";
import { isApproximateLocation } from "@/utils/device";

import { Link } from "react-router-dom";
import EyeIcon from "@/assets/icon/EyeIcon";
import CoordinateCell from "./CoordinateCell";
import PowerBadge from "./PowerBadge";
import AddressLink from "./AddressLink";

interface Props {
    devices: Device[];
    isSuperUser: boolean;
    onEdit: (device: Device) => void;
    onDelete: (device: Device) => void;
}

export default function DeviceTable({
    devices,
    isSuperUser,
    onEdit,
    onDelete,
}: Props) {
    return (
        <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead className="bg-[#4CAF50] text-white text-sm">
                        <tr>
                            <th className="p-4 text-left">Unit ID</th>

                            <th className="p-4 text-left">Serial</th>

                            <th className="p-4 text-left">Tool Watch</th>

                            <th className="p-4 text-left">Power</th>

                            <th className="p-4 text-left">Start Time</th>

                            <th className="p-4 text-left">Last Report</th>

                            <th className="p-4 text-left">History</th>

                            <th className="p-4 text-left">Coordinate</th>

                            <th className="p-4 text-left">Address</th>

                            <th className="p-4 text-left">Note</th>

                            {isSuperUser && (
                                <th className="p-4 text-left">Actions</th>
                            )}
                        </tr>
                    </thead>

                    <tbody>
                        {devices.map((device) => {
                            const state = device.state;

                            return (
                                <tr
                                    key={device.id}
                                    className="border-t hover:bg-gray-50"
                                >
                                    <td className="p-4 font-medium">
                                        {device.unit_id}
                                    </td>

                                    <td className="p-4">
                                        {device.serial ?? "-"}
                                    </td>

                                    <td className="p-4">
                                        {state?.tool_watch ?? "-"}
                                    </td>

                                    <td className="p-4">
                                        <PowerBadge
                                            power={state?.power_status}
                                        />
                                    </td>

                                    <td className="p-4 text-sm">
                                        {state?.session_started_at
                                            ? new Date(
                                                  state.session_started_at,
                                              ).toLocaleString()
                                            : "-"}
                                    </td>

                                    <td className="p-4 text-sm text-gray-600">
                                        {state?.last_report_at
                                            ? new Date(
                                                  state.last_report_at,
                                              ).toLocaleString()
                                            : "-"}
                                    </td>

                                    <td className="p-4">
                                        <Link
                                            to={`/devices/${device.id}/history`}
                                            className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-3 py-2 hover:bg-gray-100"
                                        >
                                            <EyeIcon />
                                        </Link>
                                    </td>

                                    <td className="p-4 text-sm">
                                        {isApproximateLocation(
                                            state?.latitude,
                                            state?.longitude,
                                        ) ? (
                                            <span className="text-orange-500">
                                                Approx location by mobile signal
                                            </span>
                                        ) : (
                                            <CoordinateCell
                                                latitude={state?.latitude}
                                                longitude={state?.longitude}
                                            />
                                        )}
                                    </td>

                                    <td className="max-w-xs truncate p-4 text-sm">
                                        {state?.address ? (
                                            <AddressLink
                                                address={state.address}
                                            />
                                        ) : (
                                            "-"
                                        )}
                                    </td>

                                    <td className="p-4 text-sm text-gray-600">
                                        {device.note ?? "-"}
                                    </td>

                                    {isSuperUser && (
                                        <td className="p-4">
                                            <div className="flex gap-2">
                                                <button
                                                    className="rounded-lg border px-3 py-1 text-sm hover:bg-gray-100 cursor-pointer"
                                                    onClick={() =>
                                                        onEdit(device)
                                                    }
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    className="rounded-lg border border-red-200 px-3 py-1 text-sm text-red-600 hover:bg-red-50 cursor-pointer"
                                                    onClick={() =>
                                                        onDelete(device)
                                                    }
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
