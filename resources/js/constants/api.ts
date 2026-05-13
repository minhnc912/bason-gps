export const API_ENDPOINTS = {
    LOGIN: "/login",
    REGISTER: "/register",
    ME: "/me",
    OPCENTERS: "/opcenters",
    OPCENTERSOPTIONS: "/opcenters/options",
    DEVICES: "/devices",
    MAP_DEVICES: "/map/devices",
    TICKETS: "/tickets",
    DEVICE_HISTORIES: (deviceId: number) => `/devices/${deviceId}/histories`,
};
