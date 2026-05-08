export const API_ENDPOINTS = {
    LOGIN: "/login",
    REGISTER: "/register",
    ME: "/me",
    OPCENTER: "/opcenters",
    DEVICES: "/devices",
    DEVICE_HISTORIES: (deviceId: number) => `/devices/${deviceId}/histories`,
};
