import { ROUTES } from "@/constants/route";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "@/assets/img/bacson-logo.png";
import { Button } from "../common/Button";
import { useAuth } from "@/hooks/useAuth";
import NavLinks from "./NavLinks";
import { PRIVATE_NAV_ITEMS, PUBLIC_NAV_ITEMS } from "@/constants/navigation";
import OpcenterSwitcher from "./OpcenterSwitcher";
import { useAuthContext } from "@/app/providers/AuthProvider";
import { UserRoleEnum } from "../enums/user-role.enum";

export default function Header() {
    const { logout } = useAuth();
    const { user } = useAuthContext();
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const isAuth = !!localStorage.getItem("auth_token");

    const handleLogout = () => {
        logout();
        setOpen(false);
    };

    const filteredNavItems = PRIVATE_NAV_ITEMS.filter((item) => {
        if (!item.roles) {
            return true;
        }

        return item.roles.includes(user?.role ?? "");
    });

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/60">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 h-16">
                {/* LOGO */}
                <Link
                    to={ROUTES.HOME}
                    className="shrink-0 transition-transform hover:scale-105"
                >
                    <img
                        src={logo}
                        alt="logo"
                        className="h-12 w-auto object-contain"
                    />
                </Link>

                {/* DESKTOP NAV */}
                <nav className="hidden md:flex items-center gap-8">
                    {isAuth ? (
                        <div className="flex items-center gap-6">
                            <NavLinks items={filteredNavItems} />

                            {user?.role !== UserRoleEnum.SUPERUSER && (
                                <OpcenterSwitcher />
                            )}

                            <Button
                                onClick={handleLogout}
                                className="bg-red-600 hover:bg-red-700"
                            >
                                Logout
                            </Button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-4">
                            <NavLinks items={PUBLIC_NAV_ITEMS} />

                            <Button
                                onClick={() => navigate(ROUTES.REGISTER)}
                                className="h-9 px-5 bg-blue-600 hover:bg-blue-700 text-white"
                            >
                                Get Started!
                            </Button>
                        </div>
                    )}
                </nav>

                {/* BURGER */}
                <button
                    className="p-2 md:hidden text-gray-600 hover:bg-gray-100 rounded-md"
                    onClick={() => setOpen(!open)}
                >
                    {open ? "X" : "☰"}
                </button>
            </div>

            {/* MOBILE MENU */}
            {open && (
                <div className="md:hidden border-t bg-white animate-in slide-in-from-top duration-300">
                    <div className="flex flex-col space-y-4 px-4 py-6">
                        {isAuth ? (
                            <>
                                <NavLinks
                                    items={filteredNavItems}
                                    mobile
                                    onNavigate={() => setOpen(false)}
                                />

                                {user?.role !== UserRoleEnum.SUPERUSER && (
                                    <OpcenterSwitcher />
                                )}
                                <Button
                                    className="w-full bg-red-600"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <>
                                <NavLinks
                                    items={PUBLIC_NAV_ITEMS}
                                    mobile
                                    onNavigate={() => setOpen(false)}
                                />
                                <Button
                                    onClick={() => navigate(ROUTES.REGISTER)}
                                    className="h-9 px-5 bg-blue-600 hover:bg-blue-700 text-white"
                                >
                                    Get Started!
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}
