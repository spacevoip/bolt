import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { fetchBalance } from '../services/balanceService';

export function useBalanceRefresh(interval = 10000) {
  const location = useLocation();
  const { user, updateBalance } = useAuthStore();
  const isDashboard = location.pathname === '/';

  const refreshBalance = async () => {
    if (!user?.account) return;
    
    try {
      const newBalance = await fetchBalance(user.account);
      updateBalance(newBalance);
    } catch (error) {
      console.error('Failed to refresh balance:', error);
    }
  };

  useEffect(() => {
    if (!isDashboard) return;

    // Initial refresh
    refreshBalance();

    // Set up interval for dashboard
    const timer = setInterval(refreshBalance, interval);

    return () => clearInterval(timer);
  }, [user?.account, isDashboard, interval]);

  return { refreshBalance };
}