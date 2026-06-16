import { ROUTES } from "./route";
import { USER_ROLES } from "./user-role";

export interface NavigationItem {
    label: string;

    path: string;

    roles?: string[];
}

export const PUBLIC_NAV_ITEMS = [
    {
        label: "Login",
        path: ROUTES.LOGIN,
    },
];

export const PRIVATE_NAV_ITEMS: NavigationItem[] = [
    {
        label: "Devices",
        path: ROUTES.DEVICES,
    },
    {
        label: "Users",
        path: ROUTES.USERS,
        roles: [USER_ROLES.SUPERUSER],
    },
    {
        label: "Opcenters",
        path: ROUTES.OPCENTERS,
    },
    {
        label: "Map",
        path: ROUTES.Map,
    },
    {
        label: "Tickets",
        path: ROUTES.Tickets,
    },
    {
        label: "Post data",
        path: ROUTES.POSTDATA,
    },
];
