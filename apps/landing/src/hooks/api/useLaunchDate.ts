import { useState, useEffect } from 'react';
import { API_CONFIG } from '../../config/api';

interface LaunchDateResponse {
  success: boolean;
  launch_date: string;
}

interface UseLaunchDateReturn {
  launchDate: Date;
  isLoading: boolean;
  error: string | null;
}

export const useLaunchDate = (): UseLaunchDateReturn => {
  const [launchDate, setLaunchDate] = useState(new Date('2025-08-24T00:00:00Z')); // Fallback
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLaunchDate = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.LAUNCH_DATE}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch launch date: ${response.status}`);
        }

        const data: LaunchDateResponse = await response.json();
        
        if (data.success && data.launch_date) {
          setLaunchDate(new Date(data.launch_date));
        } else {
          throw new Error('Invalid response format');
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch launch date';
        setError(errorMessage);
        console.warn('Launch date fetch failed, using fallback:', errorMessage);
        // Keep fallback date on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchLaunchDate();
  }, []);

  return {
    launchDate,
    isLoading,
    error
  };
};