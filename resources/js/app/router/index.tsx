import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";
import { ROUTES } from "@/constants/route";
import HomePage from "@/pages/HomePage";
import AppLayout from "@/layouts/AppLayout";
import DevicesPage from "@/pages/DevicesPage";
import DeviceHistoryPage from "@/pages/DeviceHistoryPage";
import SelectOpcenterPage from "@/pages/SelectOpcenterPage";
import UsersPage from "@/pages/UsersPage";
import OpcentersPage from "@/pages/OpcentersPage";
import MapPage from "@/pages/MapPage";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path={ROUTES.LOGIN}
                    element={
                        <PublicRoute>
                            <LoginPage />
                        </PublicRoute>
                    }
                />
                <Route
                    path={ROUTES.REGISTER}
                    element={
                        <PublicRoute>
                            <RegisterPage />
                        </PublicRoute>
                    }
                />
                <Route
                    path={ROUTES.SELECT_OPCENTER}
                    element={
                        <ProtectedRoute>
                            <SelectOpcenterPage />
                        </ProtectedRoute>
                    }
                />
                <Route element={<AppLayout />}>
                    <Route path={ROUTES.HOME} element={<HomePage />} />

                    <Route
                        path={ROUTES.USERS}
                        element={
                            <ProtectedRoute>
                                <UsersPage />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path={ROUTES.OPCENTERS}
                        element={
                            <ProtectedRoute>
                                <OpcentersPage />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path={ROUTES.DEVICES}
                        element={
                            <ProtectedRoute>
                                <DevicesPage />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path={ROUTES.DEVICE_HISTORIES}
                        element={
                            <ProtectedRoute>
                                <DeviceHistoryPage />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path={ROUTES.Map}
                        element={
                            <ProtectedRoute>
                                <MapPage />
                            </ProtectedRoute>
                        }
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
