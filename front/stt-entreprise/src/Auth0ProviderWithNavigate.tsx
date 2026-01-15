// src/auth/Auth0ProviderWithNavigate.tsx
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";

export const Auth0ProviderWithNavigate: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();

  const onRedirectCallback = (appState?: { returnTo?: string }) => {
    console.log("onRedirectCallback appelé !", appState);
    navigate(appState?.returnTo || "/public/layout/", { replace: true });
  };
  console.log("Auth0Provider rendu");

  return (
    <Auth0Provider
      domain="dev-jdtdmvnllnhe51fm.us.auth0.com"
      clientId="PHjpMBH8DIi5eT4R4R34oq1xA6qPvsYD"
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: "https://echo.transcribe.api.com/",
      }}
      onRedirectCallback={onRedirectCallback}
      useRefreshTokens={true}
      cacheLocation="localstorage"  
      useRefreshTokensFallback={true} 
    >
      <TokenInjector />
      {children}
    </Auth0Provider>
  );
};

let globalGetToken: (() => Promise<string | undefined>) | null = null;
export const getAccessTokenGlobal = async (): Promise<string | undefined> => {
  if (globalGetToken) {
    return globalGetToken();
  }
  return undefined;
};

const TokenInjector = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      globalGetToken = () => getAccessTokenSilently({
        authorizationParams: { audience: "https://echo.transcribe.api.com/" }
      });
    } else {
      globalGetToken = null;
    }
  }, [getAccessTokenSilently, isAuthenticated]);

  return null;
};