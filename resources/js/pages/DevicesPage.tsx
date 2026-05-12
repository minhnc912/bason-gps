import { useEffect, useState } from "react";

import {
    createDevice,
    deleteDevice,
    updateDevice,
} from "@/services/device.service";

import Pagination from "@/components/common/Pagination";

import useDebounce from "@/hooks/useDebounce";

import { Device } from "@/types/devices";
import DeviceTableSkeleton from "@/components/pages/devices/DeviceTableSkeleton";
import DeviceTable from "@/components/pages/devices/DeviceTable";
import { UserRoleEnum } from "@/components/enums/user-role.enum";
import { useDevices } from "@/hooks/useDevices";
import { useAuthContext } from "@/app/providers/AuthProvider";
import toast from "react-hot-toast";
import DeviceForm, {
    DeviceFormData,
} from "@/components/pages/devices/DeviceForm";
import Modal from "@/components/common/Modal";
import ConfirmModal from "@/components/common/ConfirmModal";

export default function DevicesPage() {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
    const [openModal, setOpenModal] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [saving, setSaving] = useState(false);

    const debouncedSearch = useDebounce(search);
    const { devices, loading, pagination, refetch } = useDevices({
        page,
        search: debouncedSearch,
    });
    const { user } = useAuthContext();
    const isSuperUser = user?.role === UserRoleEnum.SUPERUSER;

    const handleEdit = (device: Device) => {
        setSelectedDevice(device);
        setOpenModal(true);
    };

    const handleDelete = (device: Device) => {
        setSelectedDevice(device);
        setOpenDelete(true);
    };

    const handleSubmitDevice = async (data: DeviceFormData) => {
        try {
            setSaving(true);

            if (selectedDevice) {
                await updateDevice(selectedDevice.id, data);

                toast.success("Device updated");
            } else {
                await createDevice(data);

                toast.success("Device created");
            }

            setOpenModal(false);

            refetch();
        } catch {
            toast.error("Failed to save device");
        } finally {
            setSaving(false);
        }
    };

    const handleConfirmDelete = async () => {
        if (!selectedDevice) {
            return;
        }

        try {
            setSaving(true);

            await deleteDevice(selectedDevice.id);

            toast.success("Device deleted");

            setOpenDelete(false);

            refetch();
        } catch {
            toast.error("Failed to delete device");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Devices</h1>

                    <p className="text-gray-500">Manage realtime GPS devices</p>
                </div>

                {isSuperUser && (
                    <button
                        className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
                        onClick={() => {
                            setSelectedDevice(null);
                            setOpenModal(true);
                        }}
                    >
                        Add Device
                    </button>
                )}
            </div>

            <div>
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search unit ID or serial..."
                    className="w-full rounded-lg border px-4 py-2"
                />
            </div>

            {loading ? (
                <DeviceTableSkeleton />
            ) : (
                <>
                    <DeviceTable
                        devices={devices}
                        isSuperUser={isSuperUser}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />

                    <Pagination
                        currentPage={pagination.currentPage}
                        lastPage={pagination.lastPage}
                        onPageChange={setPage}
                    />
                </>
            )}

            <Modal
                open={openModal}
                onClose={() => setOpenModal(false)}
                title={selectedDevice ? "Edit Device" : "Create Device"}
            >
                <DeviceForm
                    defaultValues={
                        selectedDevice
                            ? {
                                  unit_id: selectedDevice.unit_id,
                                  serial: selectedDevice.serial ?? "",
                                  opcenter_id: selectedDevice.opcenter_id,
                              }
                            : undefined
                    }
                    loading={saving}
                    onSubmit={handleSubmitDevice}
                />
            </Modal>

            <ConfirmModal
                open={openDelete}
                loading={saving}
                onClose={() => setOpenDelete(false)}
                onConfirm={handleConfirmDelete}
                title="Delete Device"
                description="Are you sure?"
            />
        </div>
    );
}
