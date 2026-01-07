import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef } from "react";
import { useAuthToken } from "./auth/useAuthToken";

export const AuthBootstrap = () => {
    const { token, loading: tokenLoading } = useAuthToken()
    const { isAuthenticated, isLoading: auth0Loading } = useAuth0();

    const hasSynced = useRef(false);

    useEffect(() => {
        console.log("AuthBootstrap effect", {
            isAuthenticated,
            auth0Loading,
            tokenLoading,
            hasToken: !!token,
            hasSynced: hasSynced.current,
        });

        if (!auth0Loading && !tokenLoading && token && isAuthenticated && !hasSynced.current) {
            hasSynced.current = true;
            syncUser(token);
        }
    }, [isAuthenticated, auth0Loading, tokenLoading, token]);

    const syncUser = async (token: string) => {
        try {
            // const token = await getAccessTokenSilently();
            await fetch("http://localhost:8080/user/getOrCreate", {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            console.log("User synchronized successfully");
        } catch (e) {
            console.error("User sync failed.", e);
        }
    };

    return null;
};

export default AuthBootstrap;