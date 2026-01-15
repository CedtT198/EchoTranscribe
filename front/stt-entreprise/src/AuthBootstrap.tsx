import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef } from "react";
import { getAccessTokenGlobal } from "./Auth0ProviderWithNavigate";

const AuthBootstrap = () => {
    const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
   const hasSynced = useRef(false);

    useEffect(() => {    
        if (isLoading) return;
        if (!isAuthenticated) return;
        if (hasSynced.current) return;

        
        const syncUser = async () => {
            try {
                const token = await getAccessTokenGlobal();
                if (!token) {
                    console.warn("No token available to sync user");
                    return;
                }
                
                // const token = await getAccessTokenSilently();
                await fetch("http://localhost:8080/user/getOrCreate", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });
                console.log("User synchronized successfully");
                hasSynced.current = true;
            } catch (e) {
                console.error("User sync failed.", e);
                await loginWithRedirect({
                    authorizationParams: {
                        audience: "https://echo.transcribe.api.com/",
                        prompt: "consent",
                    },
                    appState: { returnTo: window.location.pathname },
                });
            }
        };
    
        syncUser();
    }, [isAuthenticated, isLoading]);

    return null;
};

export default AuthBootstrap;