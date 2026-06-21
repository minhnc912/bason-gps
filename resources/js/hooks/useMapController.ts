import { useState } from "react";

export default function useMapController() {
    const [focusedDeviceId, setFocusedDeviceId] =
        useState<number | null>(null);

    return {
        focusedDeviceId,
        setFocusedDeviceId,
    };
}
