import { MapDevice } from "@/types/map";

interface Props {
    devices: MapDevice[];
    search: string;
    onSearchChange: (value: string) => void;
    onFocusDevice: (deviceId: number) => void;
}

export default function DeviceSidebar({
    devices,
    search,
    onSearchChange,
    onFocusDevice,
}: Props) {
    return (
        <div
            className="w-full md:w-[320px] max-h-55 md:max-h-full border-b md:border-b-0 md:border-r overflow-y-auto bg-white
            "
        >
            <div className="p-4 border-b font-semibold text-lg">Devices</div>

            <div className="p-4">
                <input
                    type="text"
                    placeholder="Search device..."
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full rounded border px-3 py-2"
                />
            </div>

            <div className="divide-y">
                {devices.map((device) => (
                    <button
                        key={device.id}
                        onClick={() => onFocusDevice(device.id)}
                        className="
                            w-full
                            text-left
                            p-4
                            hover:bg-gray-100
                            transition
                        "
                    >
                        <div className="font-medium">{device.unit_id}</div>
                        <div
                            className="
                                text-sm
                                text-gray-500
                                truncate
                            "
                        >
                            {device.address ?? "No address"}
                        </div>

                        <div className="mt-1 text-xs">
                            Status: {device.tool_watch ?? "-"}
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}
