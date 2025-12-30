import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef } from "react";

const AuthBootstrap = () => {
    const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

    const hasSynced = useRef(false);

    console.log("auth bootstrap");
    useEffect(() => {
        console.log("use effect auth bootstrap");
        if (!isLoading && isAuthenticated && !hasSynced.current) {
            hasSynced.current = true;
            syncUser();
        }
    }, [isAuthenticated, isLoading]);

    const syncUser = async () => {
        try {
            const token = await getAccessTokenSilently();
            await fetch("http://localhost:8080/user/getOrCreate", {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            console.log("token sync user "+token);
        } catch (e) {
            console.error("User sync failed.", e);
        }
    };

    return null;
};

export default AuthBootstrap;