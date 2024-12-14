import React from 'react';
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { format } from 'date-fns';
import type { Transaction } from '../../types/transaction';

interface TransactionCardProps {
  transaction: Transaction;
}

export default function TransactionCard({ transaction }: TransactionCardProps) {
  // Don't render pending or "AGUARDANDO PAGAMENTO" transactions
  if (
    transaction.status.toLowerCase() === 'pending' || 
    transaction.status.toLowerCase() === 'aguardando pagamento'
  ) {
    return null;
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors gap-4">
      <div className="flex items-center space-x-4">
        <div className={`p-2 rounded-full ${
          transaction.type === 'pix_received' 
            ? 'bg-green-100 text-green-600'
            : 'bg-red-100 text-red-600'
        }`}>
          {transaction.type === 'pix_received' 
            ? <ArrowDownLeft size={20} />
            : <ArrowUpRight size={20} />
          }
        </div>
        <div>
          <p className="font-medium text-gray-900">{transaction.description}</p>
          <p className="text-sm text-gray-500">
            {format(new Date(transaction.date), 'dd/MM/yyyy HH:mm')}
          </p>
        </div>
      </div>
      <div className="text-left sm:text-right">
        <p className={`font-semibold ${
          transaction.type === 'pix_received'
            ? 'text-green-600'
            : 'text-red-600'
        }`}>
          {transaction.type === 'pix_received' ? '+' : '-'}
          R$ {transaction.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </p>
        <p className="text-sm text-gray-500">
          {transaction.status}
        </p>
      </div>
    </div>
  );
}