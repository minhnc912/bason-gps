export const ROUTES = {
    HOME: "/",
    LOGIN: "/login",
    REGISTER: "/register",
    SELECT_OPCENTER: "/select-opcenter",
    DEVICES: "/devices",

    // dynamic
    DEVICE_HISTORIES: `/devices/:id/history`,
} as const;
