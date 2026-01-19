import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { PortfolioProvider } from './context/PortfolioContext.jsx'
import { SpeedInsights } from "@vercel/speed-insights/react"
import { Analytics } from '@vercel/analytics/next'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PortfolioProvider>
      
      <App />

      <Analytics/>
      <SpeedInsights />

    </PortfolioProvider>
  </StrictMode>,
)
