export const ROUTES = {
    HOME: "/",
    LOGIN: "/login",
    REGISTER: "/register",
    USERS: "/users",
    SELECT_OPCENTER: "/select-opcenter",
    DEVICES: "/devices",
    OPCENTERS: "/opcenters",

    // dynamic
    DEVICE_HISTORIES: `/devices/:id/history`,
} as const;
