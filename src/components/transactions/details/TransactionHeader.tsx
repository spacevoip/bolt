import React from 'react';
import { X } from 'lucide-react';

interface TransactionHeaderProps {
  onClose: () => void;
}

export default function TransactionHeader({ onClose }: TransactionHeaderProps) {
  return (
    <div className="p-6 border-b border-gray-100 flex items-center justify-between">
      <h3 className="text-lg font-semibold text-gray-900">Transaction Details</h3>
      <button
        onClick={onClose}
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <X size={20} className="text-gray-500" />
      </button>
    </div>
  );
}