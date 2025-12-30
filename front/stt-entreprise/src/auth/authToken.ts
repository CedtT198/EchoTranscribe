import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";

export const useAuthToken = () => {
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
                console.error(err);
            }
        };

        fetchToken();
    }, [getAccessTokenSilently]);

    return token;
};