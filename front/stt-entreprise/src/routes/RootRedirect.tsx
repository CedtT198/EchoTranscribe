import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
import { useRoles } from "../auth/useRoles";

export default function RootRedirect() {
    const { isAuthenticated, isLoading } = useAuth0();
    const roles = useRoles();

    if (isLoading) return null;
    if (!isAuthenticated) {
        return <Navigate to="/public/layout/" replace />;
    }

    if (roles.includes("ADMIN")) {
        return <Navigate to="/admin/layout/" replace />;
    }

    return <Navigate to="/public/layout/" replace />;
}