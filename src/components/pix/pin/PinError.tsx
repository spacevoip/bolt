import React from 'react';
import { AlertCircle } from 'lucide-react';

interface PinErrorProps {
  attempts: number;
}

export default function PinError({ attempts }: PinErrorProps) {
  return (
    <div className="flex items-center justify-center space-x-2 text-red-600">
      <AlertCircle className="w-5 h-5" />
      <span className="text-sm">
        {attempts > 0 
          ? `Invalid PIN. ${attempts} attempts remaining` 
          : 'Account locked. Please contact support.'}
      </span>
    </div>
  );
}