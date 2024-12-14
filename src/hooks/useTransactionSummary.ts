import { useMemo } from 'react';
import type { Transaction, TransactionSummary } from '../types/transaction';

export function useTransactionSummary(transactions: Transaction[]): TransactionSummary {
  return useMemo(() => {
    return transactions.reduce(
      (acc, transaction) => {
        if (transaction.type === 'pix_received') {
          acc.totalIncoming += transaction.amount;
        } else {
          acc.totalOutgoing += transaction.amount;
        }
        acc.totalTransactions++;
        return acc;
      },
      { totalIncoming: 0, totalOutgoing: 0, totalTransactions: 0 }
    );
  }, [transactions]);
}