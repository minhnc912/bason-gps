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
                <Route element={<AppLayout />}>
                    <Route
                        path={ROUTES.SELECT_OPCENTER}
                        element={
                            <ProtectedRoute>
                                <SelectOpcenterPage />
                            </ProtectedRoute>
                        }
                    />

                    <Route path={ROUTES.HOME} element={<HomePage />} />

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
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
