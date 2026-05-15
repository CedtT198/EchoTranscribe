import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, type JSX } from "react";
import { Navigate } from "react-router-dom";
import Loading from "../components/others/Loading";
import { useAuth } from "../auth/useAuth";

type ProtectedRouteProps = {
    role: "ADMIN" | "USER";
    children: JSX.Element;
};

export default function ProtectedRoute({ role, children }: ProtectedRouteProps) {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const { loginAuth0 } = useAuth();

    // alert(isAuthenticated);
    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            loginAuth0("/admin/layout/");
        }
    }, [isAuthenticated, isLoading, loginAuth0]);

    if (isLoading) return <Loading/>;
    if (!isAuthenticated) return null;

    const roles: string[] = user?.["https://echotranscribe.com/roles"] || [];
    // alert(roles);
    return roles.includes(role) ? children : <Navigate to="/unauthorized" replace />;
};
