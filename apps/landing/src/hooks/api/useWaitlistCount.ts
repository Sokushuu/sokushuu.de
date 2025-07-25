import { useState, useEffect } from 'react';
import { API_CONFIG } from '../../config/api';

interface WaitlistCountResponse {
  success: boolean;
  count: number;
}

interface UseWaitlistCountReturn {
  count: number;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useWaitlistCount = (): UseWaitlistCountReturn => {
  const [count, setCount] = useState(2847); // Fallback count
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWaitlistCount = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.WAITLIST_COUNT}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch waitlist count: ${response.status}`);
      }

      const data: WaitlistCountResponse = await response.json();
      
      if (data.success && typeof data.count === 'number') {
        setCount(data.count);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch waitlist count';
      setError(errorMessage);
      console.warn('Waitlist count fetch failed, using fallback:', errorMessage);
      // Keep fallback count on error
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWaitlistCount();
  }, []);

  return {
    count,
    isLoading,
    error,
    refetch: fetchWaitlistCount
  };
};