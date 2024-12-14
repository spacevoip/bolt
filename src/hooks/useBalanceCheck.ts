import { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { hasEnoughBalance } from '../services/balanceService';
import { calculateTax, getInsufficientBalanceMessage } from '../utils/currency';

export function useBalanceCheck() {
  const { user } = useAuthStore();
  const [isChecking, setIsChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkBalance = async (amount: number): Promise<boolean> => {
    if (!user?.account) {
      setError('User not authenticated');
      return false;
    }

    setIsChecking(true);
    setError(null);

    try {
      const tax = calculateTax(amount);
      const totalAmount = amount + tax;
      const hasBalance = await hasEnoughBalance(user.account, totalAmount);

      if (!hasBalance) {
        setError(getInsufficientBalanceMessage(totalAmount));
        return false;
      }

      return true;
    } catch (error: any) {
      setError(error.message || 'Failed to verify balance');
      return false;
    } finally {
      setIsChecking(false);
    }
  };

  return {
    checkBalance,
    isChecking,
    error,
    clearError: () => setError(null)
  };
}