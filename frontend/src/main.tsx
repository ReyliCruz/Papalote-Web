import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ZonesProvider } from './hooks/Zones.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ZonesProvider>
      <App />
    </ZonesProvider>
  </StrictMode>
)
