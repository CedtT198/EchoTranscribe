import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

export const CallbackPage = () => {
  const { handleRedirectCallback, isLoading, error } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("CallbackPage monté – traitement du callback");
    const process = async () => {
      try {
        const { appState } = await handleRedirectCallback();
        console.log("handleRedirectCallback réussi", appState);
        navigate(appState?.returnTo || "/public/layout/", { replace: true });
      } catch (err) {
        console.error("Erreur callback", err);
        navigate("/public/layout/", { replace: true });
      }
    };
    process();
  }, [handleRedirectCallback, navigate]);

  if (isLoading) return <div>Processing login...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div>Redirecting...</div>;
};