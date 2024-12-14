import React from 'react';
import { format } from 'date-fns';
import type { Transaction } from '../../types/transaction';
import TransactionHeader from './details/TransactionHeader';
import TransactionStatus from './details/TransactionStatus';
import TransactionDetailItem from './details/TransactionDetailItem';

interface TransactionDetailsProps {
  transaction: Transaction | null;
  onClose: () => void;
}

export default function TransactionDetails({ transaction, onClose }: TransactionDetailsProps) {
  if (!transaction) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <p className="text-gray-500 text-center">Select a transaction to view details</p>
      </div>
    );
  }

  const details = [
    { 
      label: 'Amount', 
      value: `R$ ${transaction.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` 
    },
    { 
      label: 'Type', 
      value: transaction.type === 'pix_received' ? 'Received' : 'Sent' 
    },
    { 
      label: 'To', 
      value: transaction.toUser 
    },
    { 
      label: 'Document', 
      value: transaction.document,
      type: 'document' as const
    },
    { 
      label: 'Date', 
      value: format(new Date(transaction.date), 'dd/MM/yyyy HH:mm:ss') 
    },
    { 
      label: 'Status', 
      value: transaction.status 
    },
    { 
      label: 'Tax', 
      value: transaction.tax 
        ? `R$ ${transaction.tax.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` 
        : 'No tax'
    },
    { 
      label: 'Transaction ID', 
      value: transaction.id 
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <TransactionHeader onClose={onClose} />

      <div className="p-6">
        <TransactionStatus transaction={transaction} />

        <div className="space-y-4">
          {details.map((detail, index) => (
            <TransactionDetailItem
              key={index}
              label={detail.label}
              value={detail.value}
              type={detail.type}
            />
          ))}
        </div>
      </div>
    </div>
  );
}