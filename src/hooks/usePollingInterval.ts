import { useEffect, useRef } from 'react';

interface PollingOptions {
  enabled: boolean;
  baseInterval: number;
  maxInterval: number;
  backoffFactor?: number;
}

export function usePollingInterval(
  callback: () => Promise<boolean>,
  { 
    enabled = true,
    baseInterval = 2000,
    maxInterval = 5000,
    backoffFactor = 1.5
  }: PollingOptions
) {
  const attemptCount = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (!enabled) return;

    const poll = async () => {
      const shouldStop = await callback();

      if (shouldStop) {
        attemptCount.current = 0;
        return;
      }

      // Calculate next interval with exponential backoff
      const nextInterval = Math.min(
        baseInterval * Math.pow(backoffFactor, attemptCount.current),
        maxInterval
      );

      attemptCount.current++;
      timeoutRef.current = setTimeout(poll, nextInterval);
    };

    // Start polling
    poll();

    // Cleanup
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      attemptCount.current = 0;
    };
  }, [callback, enabled, baseInterval, maxInterval, backoffFactor]);
}