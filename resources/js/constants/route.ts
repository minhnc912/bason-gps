export const ROUTES = {
    HOME: "/",
    LOGIN: "/login",
    REGISTER: "/register",
    DASHBOARD: "/dashboard",
    DEVICES: "/devices",

    // dynamic
    DEVICE_HISTORIES: `/devices/:id/history`,
} as const;
