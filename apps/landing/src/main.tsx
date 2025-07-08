import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import mixpanel from 'mixpanel-browser'

import './index.css'
import App from './App.tsx'

const MIXPANEL_TOKEN = import.meta.env.VITE_MIXPANEL_TOKEN;

if (MIXPANEL_TOKEN) {
  mixpanel.init(MIXPANEL_TOKEN, {
    debug: false,
    track_pageview: 'full-url', // Better for SPAs - tracks URL changes
    persistence: 'localStorage',
    autocapture: {
      pageview: 'full-url',
      click: true,
      input: true,
      scroll: true,
      submit: true,
      capture_text_content: false
    }
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
