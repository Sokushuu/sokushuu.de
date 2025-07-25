import { useState } from 'react';
import { API_CONFIG } from '../../config/api';

interface WaitlistSubscribeResponse {
  success: boolean;
  message?: string; // For success responses
  errors?: Array<{
    code: number;
    message: string;
  }>; // For error responses
}

interface UseWaitlistSubscribeReturn {
  subscribe: (email: string) => Promise<{ success: boolean; message: string }>;
  isLoading: boolean;
  error: string | null;
}

export const useWaitlistSubscribe = (): UseWaitlistSubscribeReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const subscribe = async (email: string): Promise<{ success: boolean; message: string }> => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.WAITLIST_SUBSCRIBE}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data: WaitlistSubscribeResponse = await response.json();

      if (response.ok && data.success) {
        return {
          success: true,
          message: data.message || 'Successfully subscribed!'
        };
      } else {
        // Handle API errors - extract message from errors array
        let errorMessage = 'Subscription failed. Please try again.';
        
        if (data.errors && data.errors.length > 0) {
          // Use the first error message from the API
          errorMessage = data.errors[0].message;
        } else if (data.message) {
          // Fallback to direct message if available
          errorMessage = data.message;
        } else {
          // Generic error based on status code
          errorMessage = `Subscription failed: ${response.status}`;
        }
        
        setError(errorMessage);
        return {
          success: false,
          message: errorMessage
        };
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Network error occurred';
      setError(errorMessage);
      console.error('Subscription failed:', errorMessage);
      return {
        success: false,
        message: 'Subscription failed. Please try again.'
      };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    subscribe,
    isLoading,
    error
  };
};