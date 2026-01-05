import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import { useAuth } from "./useAuth";

export const useAuthToken = () => {
    const { loginAuth0 } = useAuth();
    const { getAccessTokenSilently } = useAuth0();
    const [token, setToken] = useState(null);

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const t = await getAccessTokenSilently({
                    authorizationParams: {
                        audience: "https://echo.transcribe.api.com/",
                    },
                });
                setToken(t);
            } catch (err) {
                if (err.error === 'consent_required') {
                    // console.error("nety le condition d'erreur");
                    loginAuth0();
                }
                // console.error(err);
            }
        };

        fetchToken();
    }, [getAccessTokenSilently]);

    return token;
};