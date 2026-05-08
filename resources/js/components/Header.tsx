import { ROUTES } from "@/constants/route";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "@/assets/img/duke-energy.png";
import { Button } from "./ui/Button";
import { useAuth } from "@/hooks/useAuth";
import clsx from "clsx";

export default function Header() {
    const { logout } = useAuth();
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const isAuth = !!localStorage.getItem("auth_token");

    const handleLogout = () => {
        logout();
        setOpen(false);
    };

    const navLinkClass = (path: string) => `
        text-sm font-medium transition-colors hover:text-blue-600
        ${location.pathname === path ? "text-blue-600" : "text-gray-600"}
    `;

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
                        className="h-8 w-auto object-contain"
                    />
                </Link>

                {/* DESKTOP NAV */}
                <nav className="hidden md:flex items-center gap-8">
                    {isAuth ? (
                        <div className="flex w-full justify-between items-center gap-4">
                            <Link
                                to={ROUTES.DASHBOARD}
                                className={navLinkClass(ROUTES.DASHBOARD)}
                            >
                                Dashboard
                            </Link>
                            <Button
                                onClick={handleLogout}
                                className="bg-red-600 hover:bg-red-700 max-w-22"
                            >
                                Logout
                            </Button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Link
                                to={ROUTES.LOGIN}
                                className={navLinkClass(ROUTES.LOGIN)}
                            >
                                Login
                            </Link>
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
                                <Link
                                    to={ROUTES.DASHBOARD}
                                    className={clsx(
                                        `text-lg font-medium `,
                                        navLinkClass(ROUTES.DASHBOARD),
                                    )}
                                    onClick={() => setOpen(false)}
                                >
                                    Dashboard
                                </Link>
                                <Button
                                    className="w-full bg-red-600"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to={ROUTES.LOGIN}
                                    className="text-lg font-medium text-gray-700"
                                    onClick={() => setOpen(false)}
                                >
                                    Login
                                </Link>
                                <Button
                                    onClick={() => {
                                        navigate(ROUTES.REGISTER);
                                        setOpen(false);
                                    }}
                                    className="w-full bg-blue-600"
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
