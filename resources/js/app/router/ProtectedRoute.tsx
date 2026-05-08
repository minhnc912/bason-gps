import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { ROUTES } from "@/constants/route";

export default function ProtectedRoute({ children }: any) {
    const { isAuthenticated, loading } = useAuth();

    if (loading) return <div>Loading...</div>;

    if (!isAuthenticated) {
        return <Navigate to={ROUTES.LOGIN} replace />;
    }

    return children;
}
