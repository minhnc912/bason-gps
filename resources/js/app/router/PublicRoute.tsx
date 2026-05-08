import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { ROUTES } from "@/constants/route";

export default function PublicRoute({ children }: any) {
    const { isAuthenticated, loading } = useAuth();

    if (loading) return null;

    if (isAuthenticated) {
        return <Navigate to={ROUTES.DASHBOARD} replace />;
    }

    return children;
}
