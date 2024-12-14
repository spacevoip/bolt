import { useState, useEffect } from 'react';

interface UseRealtimeProgressProps {
  isActive: boolean;
  duration?: number;
  interval?: number;
}

export function useRealtimeProgress({ 
  isActive, 
  duration = 300000, // 5 minutes
  interval = 3000 // 3 seconds
}: UseRealtimeProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setProgress(0);
      return;
    }

    const incrementSize = (interval / duration) * 100;
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return prev; // Cap at 90% until completion
        return Math.min(prev + incrementSize, 90);
      });
    }, interval);

    return () => clearInterval(timer);
  }, [isActive, duration, interval]);

  const complete = () => setProgress(100);
  const reset = () => setProgress(0);

  return { progress, complete, reset };
}