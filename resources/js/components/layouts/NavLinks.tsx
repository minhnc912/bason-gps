import clsx from "clsx";

import { Link, useLocation } from "react-router-dom";

interface NavItem {
    label: string;

    path: string;
}

interface Props {
    items: NavItem[];

    onNavigate?: () => void;

    mobile?: boolean;
}

export default function NavLinks({ items, onNavigate, mobile }: Props) {
    const location = useLocation();

    return (
        <>
            {items.map((item) => {
                const isActive = location.pathname === item.path;

                return (
                    <Link
                        key={item.path}
                        to={item.path}
                        onClick={onNavigate}
                        className={clsx(
                            "transition-colors hover:text-blue-600",

                            mobile
                                ? "text-lg font-medium"
                                : "text-sm font-medium",

                            isActive ? "text-blue-600" : "text-gray-600",
                        )}
                    >
                        {item.label}
                    </Link>
                );
            })}
        </>
    );
}
