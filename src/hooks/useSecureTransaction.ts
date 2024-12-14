import { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { rateLimiter } from '../services/rateLimit';
import { validateTransactionAmount, validatePixKey } from '../utils/security';
import { toast } from 'react-hot-toast';

export function useSecureTransaction() {
  const [isProcessing, setIsProcessing] = useState(false);
  const { user } = useAuthStore();

  const processTransaction = async (
    pixKey: string,
    amount: number,
    description?: string
  ) => {
    if (!user?.account) {
      toast.error('User not authenticated');
      return false;
    }

    // Rate limiting
    if (rateLimiter.isRateLimited(user.account)) {
      toast.error('Too many requests. Please try again later.');
      return false;
    }

    // Input validation
    if (!validatePixKey(pixKey)) {
      toast.error('Invalid PIX key format');
      return false;
    }

    if (!validateTransactionAmount(amount)) {
      toast.error('Invalid transaction amount');
      return false;
    }

    setIsProcessing(true);
    try {
      // Process transaction logic here
      return true;
    } catch (error) {
      console.error('Transaction error:', error);
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    processTransaction,
    isProcessing
  };
}