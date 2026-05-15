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
        <>
            {devices.map((device) => {
                const state = device.state;

                return (
                    <tr key={device.id} className="border-t hover:bg-gray-50">
                        <td className="px-1 font-medium">{device.unit_id}</td>

                        <td className="px-1">{device.serial ?? "-"}</td>

                        <td className="px-1">{state?.tool_watch ?? "-"}</td>

                        <td className="px-1">
                            <PowerBadge power={state?.power_status} />
                        </td>

                        <td className="px-1 text-sm">
                            {state?.session_started_at
                                ? new Date(
                                      state.session_started_at,
                                  ).toLocaleString()
                                : "-"}
                        </td>

                        <td className="px-1 text-sm text-gray-600">
                            {state?.last_report_at
                                ? new Date(
                                      state.last_report_at,
                                  ).toLocaleString()
                                : "-"}
                        </td>

                        <td className="px-1 flex justify-center">
                            <Link
                                to={`/devices/${device.id}/history`}
                                className="inline-flex items-center justify-center rounded-lg border border-gray-300 p-2 hover:bg-gray-100"
                            >
                                <EyeIcon size={16} />
                            </Link>
                        </td>

                        <td className="px-1 text-sm">
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

                        <td className="max-w-xs truncate px-1 text-sm">
                            {state?.address ? (
                                <AddressLink address={state.address} />
                            ) : (
                                "-"
                            )}
                        </td>

                        <td className="px-1 text-sm text-gray-600">
                            {device.note ?? "-"}
                        </td>

                        {isSuperUser && (
                            <td className="px-1">
                                <div className="flex gap-2">
                                    <button
                                        className="rounded-lg border px-3 py-1 text-sm hover:bg-gray-100 cursor-pointer"
                                        onClick={() => onEdit(device)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="rounded-lg border border-red-200 px-3 py-1 text-sm text-red-600 hover:bg-red-50 cursor-pointer"
                                        onClick={() => onDelete(device)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </td>
                        )}
                    </tr>
                );
            })}
        </>
    );
}
