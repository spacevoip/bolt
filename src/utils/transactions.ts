import { Transaction } from '../types/user';

export const calculateTransactionTotals = (transactions: Transaction[]) => {
  return transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === 'pix_received') {
        acc.totalIncoming += transaction.amount;
      } else {
        acc.totalOutgoing += transaction.amount;
      }
      return acc;
    },
    { totalIncoming: 0, totalOutgoing: 0 }
  );
};