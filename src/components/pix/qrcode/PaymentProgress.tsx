import React from 'react';

interface PaymentProgressProps {
  progress: number; // 0 to 100
  status: 'pending' | 'paid' | 'cancelled';
}

export default function PaymentProgress({ progress, status }: PaymentProgressProps) {
  const getStatusColor = () => {
    switch (status) {
      case 'paid':
        return 'bg-green-500';
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-blue-500';
    }
  };

  return (
    <div className="space-y-2">
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-500 ${getStatusColor()}`}
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="flex justify-between text-sm text-gray-500">
        <span>Verifying payment</span>
        <span>{progress}%</span>
      </div>
    </div>
  );
}