import { useEffect, useState } from 'react';
import { testConnection } from '../connection';

export function useSupabaseConnection() {
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const { success, message } = await testConnection();
        setIsConnected(success);
        if (!success) {
          setError(message);
        }
      } catch (err) {
        setIsConnected(false);
        setError(err instanceof Error ? err.message : 'Unknown connection error');
      } finally {
        setIsChecking(false);
      }
    };

    checkConnection();
  }, []);

  return { isConnected, error, isChecking };
}