import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import { useAuth } from "./useAuth";

export const useAuthToken = () => {
    const { loginAuth0 } = useAuth();
    const { getAccessTokenSilently, isAuthenticated, isLoading } = useAuth0();
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isLoading) return;
        if (!isAuthenticated) {
            setLoading(false);
            return;
        }
        
        const fetchToken = async () => {
            try {
                const t = await getAccessTokenSilently({
                    authorizationParams: {
                        audience: "https://echo.transcribe.api.com/",
                    },
                });
                setToken(t);
            } catch (err: any) {
                if (err.error === 'consent_required' || err.error === "login_required") {
                    // console.error("nety le condition d'erreur");
                    loginAuth0();
                } else {
                    console.error("Error getting token: ", err);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchToken();
    }, [getAccessTokenSilently, isAuthenticated, isLoading, loginAuth0]);

    return { token, loading } ;
};