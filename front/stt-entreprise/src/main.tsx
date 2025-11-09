import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import '../public/pages/notFound.scss'
import '../public/pages/other.scss'
import '../public/pages/sign.scss'
import '../public/pages/landing.scss'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
