import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import mixpanel from 'mixpanel-browser'
import { PostHogProvider } from 'posthog-js/react'

import './index.css'
import App from './App.tsx'

const MIXPANEL_TOKEN = import.meta.env.VITE_MIXPANEL_TOKEN;
const POSTHOG_KEY = import.meta.env.VITE_PUBLIC_POSTHOG_KEY;
const POSTHOG_HOST = import.meta.env.VITE_PUBLIC_POSTHOG_HOST;

// Validate required PostHog environment variables
if (!POSTHOG_KEY) {
  throw new Error(
    'Missing required environment variable: VITE_PUBLIC_POSTHOG_KEY. ' +
    'Please set this variable in your .env.local file or deployment environment. ' +
    'You can find your PostHog API key at https://us.posthog.com/settings/project'
  );
}

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

// PostHog configuration options
const posthogOptions = {
  api_host: POSTHOG_HOST || 'https://us.i.posthog.com',
  autocapture: true, // Enable all autocapture features
  persistence: 'localStorage' as const,
  capture_pageview: false // We'll handle this manually for React Router
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PostHogProvider 
      apiKey={POSTHOG_KEY} 
      options={posthogOptions}
    >
      <App />
    </PostHogProvider>
  </StrictMode>,
)
