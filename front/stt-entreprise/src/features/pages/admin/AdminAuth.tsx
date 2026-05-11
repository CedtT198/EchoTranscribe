import { useEffect, type JSX } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useAuth } from "../../../auth/useAuth";
import Loading from "../../../components/others/Loading";

type AdminAuthProps = {
  children: JSX.Element;
};

export default function AdminAuth({ children }: AdminAuthProps) {
    const { isAuthenticated, isLoading } = useAuth0();
    const { loginAuth0 } = useAuth();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            loginAuth0("/admin/layout/");
        }
    }, [isAuthenticated, isLoading, loginAuth0]);

    if (isLoading) return <Loading />;
    if (!isAuthenticated) return null;

    return children;
};