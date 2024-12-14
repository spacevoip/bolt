export interface Transaction {
  id: string;
  type: 'pix_sent' | 'pix_received';
  amount: number;
  date: string; // Changed from Date to string to ensure consistency
  description: string;
  fromUser: string;
  toUser: string;
  fromAccount: string;
  toAccount: string;
  status: string;
  document?: string;
  tax?: number;
}

export interface TransactionSummary {
  totalIncoming: number;
  totalOutgoing: number;
  totalTransactions: number;
}