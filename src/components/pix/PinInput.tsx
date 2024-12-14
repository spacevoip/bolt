import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { verifyPin } from '../../services/authService';
import { useAuthStore } from '../../store/useAuthStore';

interface PinInputProps {
  onSuccess: () => void;
  onError: (message: string) => void;
}

export default function PinInput({ onSuccess, onError }: PinInputProps) {
  const { user } = useAuthStore();
  const [pin, setPin] = useState(['', '', '', '']);
  const [activeIndex, setActiveIndex] = useState(0);
  const [attempts, setAttempts] = useState(4);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (pin.every(digit => digit !== '')) {
      handlePinVerification();
    }
  }, [pin]);

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

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-medium text-gray-900">Digite seu PIN</h3>
        <p className="text-sm text-gray-500">Enter your 4-digit security PIN</p>
      </div>

      <div className="flex justify-center space-x-3">
        {pin.map((digit, index) => (
          <div
            key={index}
            className="relative"
          >
            <input
              type="password"
              value={digit}
              onChange={() => {}}
              onKeyDown={handleKeyPress}
              autoFocus={index === activeIndex}
              className={`w-12 h-12 text-center text-2xl font-bold border-2 rounded-lg 
                focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200
                ${isError ? 'border-red-500 animate-shake' : ''}
                ${isSuccess ? 'border-green-500' : ''}
                ${!isError && !isSuccess && digit ? 'border-blue-500' : 'border-gray-200'}
              `}
              maxLength={1}
            />
            {isSuccess && index === 3 && (
              <div className="absolute -right-2 -top-2 bg-white rounded-full">
                <CheckCircle className="w-5 h-5 text-green-500" />
              </div>
            )}
          </div>
        ))}
      </div>

      {isError && (
        <div className="flex items-center justify-center space-x-2 text-red-600">
          <AlertCircle className="w-5 h-5" />
          <span className="text-sm">
            {attempts > 0 
              ? `Invalid PIN. ${attempts} attempts remaining` 
              : 'Account locked. Please contact support.'}
          </span>
        </div>
      )}
    </div>
  );
}