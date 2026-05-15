import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef } from "react";
import { getAccessTokenGlobal } from "./Auth0ProviderWithNavigate";
import { findActual, useUserSession } from "./api/subscription";

export default function AuthBootstrap() {
    const { isAuthenticated, isLoading, loginWithRedirect, user } = useAuth0();
    const hasSynced = useRef(false);
    const { setSubscription } = useUserSession();

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
                await fetch("https://echotranscribe.onrender.com/user/getOrCreate", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                const subRes = await findActual(user?.sub);
                if (subRes.data) {
                    const subscription = await subRes.data;
                    setSubscription(subscription);
                    
                    // console.log("Subscription: "+subscription.subscription_type);
                }

                // console.log("User synchronized successfully");
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
