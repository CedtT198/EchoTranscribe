import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

export default function AutoLogout({ shouldLogout }: { shouldLogout: boolean }) {
  const { logout: auth0Logout } = useAuth0();

  useEffect(() => {
    if (shouldLogout) {
      auth0Logout({
        logoutParams: { returnTo: window.location.origin },
      });
    }
  }, [shouldLogout, auth0Logout]);

  return null;
};

