import React from 'react';
import { CheckCircle } from 'lucide-react';
import type { Transaction } from '../../../types/transaction';

interface TransactionStatusProps {
  transaction: Transaction;
}

export default function TransactionStatus({ transaction }: TransactionStatusProps) {
  return (
    <div className="mb-6 p-4 rounded-lg bg-green-50">
      <div className="flex items-center space-x-3">
        <CheckCircle className="text-green-600" size={24} />
        <div>
          <p className="font-medium text-green-800">
            {transaction.status}
          </p>
          <p className="text-sm text-green-600">
            {transaction.type === 'pix_received' ? 'Payment Received' : 'Payment Sent'}
          </p>
        </div>
      </div>
    </div>
  );
}