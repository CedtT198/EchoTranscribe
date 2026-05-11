import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import { Auth0ProviderWithNavigate } from './Auth0ProviderWithNavigate';
import { ToastProvider } from './auth/ToastProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Auth0ProviderWithNavigate>
        <ToastProvider>
          <App />
        </ToastProvider>
      </Auth0ProviderWithNavigate>
    </BrowserRouter>
  </StrictMode>
);