import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";

export function useAuth() {
    const location = useLocation();
    const { loginWithRedirect: login,  logout: auth0Logout, } = useAuth0();

    const loginAuth0 = (returnPath?: string) => {
        login({
            appState: { returnTo: returnPath ||  location.pathname},
            // appState: { returnTo: window.location.pathname }
        });
    }

    const signupAuth0 = (returnPath?: string) => {
        login({
            authorizationParams: { screen_hint: "signup" },
            appState: { returnTo: returnPath ||  location.pathname},
            // appState: { returnTo: window.location.pathname }
        });
    }

    const logoutAuth0 = (returnPath?: string) => {
        auth0Logout({
            logoutParams: { returnTo: returnPath ||  window.location.origin},
            // logoutParams: { returnTo: window.location.origin },
        });
    }

    return { loginAuth0, signupAuth0, logoutAuth0 }
}