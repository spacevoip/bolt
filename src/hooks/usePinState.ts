import { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { verifyPin } from '../services/authService';

interface UsePinStateProps {
  onSuccess: () => void;
  onError: (message: string) => void;
}

export function usePinState({ onSuccess, onError }: UsePinStateProps) {
  const { user } = useAuthStore();
  const [pin, setPin] = useState(['', '', '', '']);
  const [activeIndex, setActiveIndex] = useState(0);
  const [attempts, setAttempts] = useState(4);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePinVerification = async () => {
    if (!user?.account) return;
    
    setIsVerifying(true);
    try {
      const pinString = pin.join('');
      const isValid = await verifyPin(user.account, pinString);

      if (isValid) {
        setIsSuccess(true);
        setIsError(false);
        setTimeout(() => {
          onSuccess();
        }, 500);
      } else {
        handleFailedAttempt();
      }
    } catch (error) {
      console.error('PIN verification error:', error);
      onError('Failed to verify PIN');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleFailedAttempt = () => {
    setIsError(true);
    setAttempts(prev => prev - 1);
    setPin(['', '', '', '']);
    setActiveIndex(0);

    if (attempts <= 1) {
      onError('Account locked due to too many failed attempts');
      return;
    }

    onError(`Invalid PIN. ${attempts - 1} attempts remaining`);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      if (activeIndex > 0) {
        const newPin = [...pin];
        newPin[activeIndex - 1] = '';
        setPin(newPin);
        setActiveIndex(activeIndex - 1);
      }
      return;
    }

    if (!/^\d$/.test(e.key)) return;

    if (activeIndex < 4) {
      const newPin = [...pin];
      newPin[activeIndex] = e.key;
      setPin(newPin);
      setActiveIndex(Math.min(activeIndex + 1, 3));
    }
  };

  return {
    pin,
    activeIndex,
    attempts,
    isError,
    isSuccess,
    isVerifying,
    handleKeyPress,
    handlePinVerification
  };
}