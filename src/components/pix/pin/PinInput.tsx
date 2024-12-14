import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../../../store/useAuthStore';
import { verifyPin } from '../../../services/authService';
import PinDigit from './PinDigit';
import PinError from './PinError';
import { usePinState } from '../../../hooks/usePinState';

interface PinInputProps {
  onSuccess: () => void;
  onError: (message: string) => void;
}

export default function PinInput({ onSuccess, onError }: PinInputProps) {
  const { user } = useAuthStore();
  const {
    pin,
    activeIndex,
    attempts,
    isError,
    isSuccess,
    handleKeyPress,
    handlePinVerification
  } = usePinState({ onSuccess, onError });

  useEffect(() => {
    if (pin.every(digit => digit !== '')) {
      handlePinVerification();
    }
  }, [pin]);

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-medium text-gray-900">Digite seu PIN</h3>
        <p className="text-sm text-gray-500">Enter your 4-digit security PIN</p>
      </div>

      <div className="flex justify-center space-x-3">
        {pin.map((digit, index) => (
          <PinDigit
            key={index}
            value={digit}
            isActive={index === activeIndex}
            isError={isError}
            isSuccess={isSuccess}
            onKeyDown={handleKeyPress}
          />
        ))}
      </div>

      {isError && <PinError attempts={attempts} />}
    </div>
  );
}