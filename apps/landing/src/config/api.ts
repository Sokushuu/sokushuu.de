// API configuration
// TODO: Move to environment variables in production
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:8787',
  ENDPOINTS: {
    LAUNCH_DATE: '/config/launch-date',
    WAITLIST_COUNT: '/waitlist/count',
    WAITLIST_SUBSCRIBE: '/waitlist',
  }
} as const;