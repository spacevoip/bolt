import React from 'react';
import { CheckCircle } from 'lucide-react';
import { cn } from '../../../utils/styles';

interface PinDigitProps {
  value: string;
  index: number;
  isActive: boolean;
  isError: boolean;
  isSuccess: boolean;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function PinDigit({
  value,
  index,
  isActive,
  isError,
  isSuccess,
  onKeyDown
}: PinDigitProps) {
  return (
    <div className="relative">
      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        value={value}
        onChange={() => {}}
        onKeyDown={onKeyDown}
        autoFocus={isActive}
        className={cn(
          "w-12 h-12 text-center text-2xl font-bold border-2 rounded-lg",
          "focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200",
          isError && "border-red-500 animate-shake",
          isSuccess && "border-green-500",
          !isError && !isSuccess && value && "border-blue-500",
          !isError && !isSuccess && !value && "border-gray-200"
        )}
        maxLength={1}
      />
      {isSuccess && index === 3 && (
        <div className="absolute -right-2 -top-2 bg-white rounded-full">
          <CheckCircle className="w-5 h-5 text-green-500" />
        </div>
      )}
    </div>
  );
}