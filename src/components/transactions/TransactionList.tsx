import React from 'react';
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { format } from 'date-fns';
import type { Transaction } from '../../types/transaction';

interface TransactionListProps {
  transactions: Transaction[];
  onSelect: (transaction: Transaction) => void;
  selectedId?: string;
}

export default function TransactionList({ transactions, onSelect, selectedId }: TransactionListProps) {
  // Filter out pending and "AGUARDANDO PAGAMENTO" transactions
  const filteredTransactions = transactions.filter(transaction => 
    transaction.status.toLowerCase() !== 'pending' && 
    transaction.status.toLowerCase() !== 'aguardando pagamento'
  );

  return (
    <div className="space-y-4">
      {filteredTransactions.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No transactions found</p>
        </div>
      ) : (
        filteredTransactions.map((transaction) => {
          const uniqueKey = `${transaction.id}-${new Date(transaction.date).getTime()}`;
          
          return (
            <button
              key={uniqueKey}
              onClick={() => onSelect(transaction)}
              className={`w-full text-left flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl transition-colors ${
                selectedId === transaction.id
                  ? 'bg-blue-50 hover:bg-blue-100'
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
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
                  <p className="font-medium text-gray-900">
                    {transaction.type === 'pix_received' 
                      ? `From ${transaction.fromUser}`
                      : `To ${transaction.toUser}`
                    }
                  </p>
                  <p className="text-sm text-gray-500">
                    {format(new Date(transaction.date), 'dd/MM/yyyy HH:mm')}
                  </p>
                </div>
              </div>
              <div className="text-right mt-2 sm:mt-0">
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
            </button>
          );
        })
      )}
    </div>
  );
}