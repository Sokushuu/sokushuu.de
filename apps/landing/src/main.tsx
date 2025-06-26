import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import mixpanel from 'mixpanel-browser'

import './index.css'
import App from './App.tsx'

const MIXPANEL_TOKEN = import.meta.env.VITE_MIXPANEL_TOKEN;

if (MIXPANEL_TOKEN) {
  mixpanel.init(MIXPANEL_TOKEN, {
    debug: true,
    track_pageview: true,
    persistence: 'localStorage'
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
