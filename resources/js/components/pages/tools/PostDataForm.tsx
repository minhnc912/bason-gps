import { useState } from "react";

import { PostDataFormData } from "@/types/postdata";
import { Input } from "@/components/common/Input";

interface Props {
    loading: boolean;
    onSubmit: (data: PostDataFormData) => void;
}

export default function PostDataForm({ loading, onSubmit }: Props) {
    const [form, setForm] = useState<PostDataFormData>({
        uid: "",
        fwv: "",
        coord: "",
        temp: 0,
        pwr: 0,
        t: "",
        sim: "",
    });

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();

                onSubmit(form);
            }}
            className="space-y-6"
        >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            UID
                        </label>

                        <Input
                            placeholder="GPS001"
                            value={form.uid}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>,
                            ) =>
                                setForm({
                                    ...form,
                                    uid: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Firmware Version
                        </label>

                        <Input
                            placeholder="1.0.2"
                            value={form.fwv}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>,
                            ) =>
                                setForm({
                                    ...form,
                                    fwv: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Coordinate
                        </label>

                        <Input
                            placeholder="16.047079,108.206230"
                            value={form.coord}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>,
                            ) =>
                                setForm({
                                    ...form,
                                    coord: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Temperature
                        </label>

                        <Input
                            type="number"
                            value={form.temp}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>,
                            ) =>
                                setForm({
                                    ...form,
                                    temp: Number(e.target.value),
                                })
                            }
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Power Status
                        </label>

                        <select
                            value={form.pwr}
                            onChange={(
                                e: React.ChangeEvent<HTMLSelectElement>,
                            ) =>
                                setForm({
                                    ...form,
                                    pwr: Number(e.target.value),
                                })
                            }
                            className="w-full rounded-lg border border-gray-300 px-3 py-2"
                        >
                            <option value={1}>ON</option>
                            <option value={0}>OFF</option>
                        </select>
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Tool Watch
                        </label>

                        <Input
                            placeholder="RUNNING"
                            value={form.t}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>,
                            ) =>
                                setForm({
                                    ...form,
                                    t: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            SIM
                        </label>

                        <Input
                            placeholder="1"
                            value={form.sim}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>,
                            ) =>
                                setForm({
                                    ...form,
                                    sim: e.target.value,
                                })
                            }
                        />
                    </div>
                </div>
            </div>
            <div className="flex ">
                <button
                    type="submit"
                    disabled={loading}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {loading ? "Sending..." : "Submit"}
                </button>
            </div>
        </form>
    );
}
