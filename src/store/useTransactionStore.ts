import { create } from 'zustand';
import type { Transaction } from '../types/transaction';
import { useAuthStore } from './useAuthStore';
import { fetchSentTransactions, fetchReceivedTransactions } from '../services/transactionService';
import { processTransaction } from '../services/processService';
import { fetchBalance } from '../services/balanceService';

interface TransactionState {
  transactions: Transaction[];
  sentTransactions: Transaction[];
  receivedTransactions: Transaction[];
  isLoading: boolean;
  error: string | null;
  fetchTransactions: (account: string) => Promise<void>;
  addTransaction: (transaction: Omit<Transaction, 'id' | 'date' | 'fromAccount' | 'toAccount' | 'status'>) => Promise<void>;
}

export const useTransactionStore = create<TransactionState>((set) => ({
  transactions: [],
  sentTransactions: [],
  receivedTransactions: [],
  isLoading: false,
  error: null,

  fetchTransactions: async (account: string) => {
    set({ isLoading: true, error: null });
    try {
      const [sent, received] = await Promise.all([
        fetchSentTransactions(account),
        fetchReceivedTransactions(account)
      ]);

      const allTransactions = [...sent, ...received]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

      set({
        transactions: allTransactions,
        sentTransactions: sent,
        receivedTransactions: received,
        isLoading: false,
        error: null
      });
    } catch (error) {
      console.error('Error fetching transactions:', error);
      set({ 
        error: 'Failed to fetch transactions', 
        isLoading: false,
        transactions: [],
        sentTransactions: [],
        receivedTransactions: []
      });
    }
  },

  addTransaction: async (transaction) => {
    const { user } = useAuthStore.getState();
    if (!user) throw new Error('User not authenticated');

    set({ isLoading: true, error: null });
    try {
      // Get recipient's account
      const { data: recipientData, error: recipientError } = await supabase
        .from('users')
        .select('account')
        .eq('name', transaction.toUser)
        .single();

      if (recipientError) throw recipientError;

      // Process the transaction
      await processTransaction(
        user.account,
        recipientData.account,
        transaction.amount,
        transaction.description,
        transaction.fromUser,
        transaction.toUser
      );

      // Update user's balance
      const newBalance = await fetchBalance(user.account);
      useAuthStore.setState((state) => ({
        user: state.user ? { ...state.user, balance: newBalance } : null,
      }));

      // Refresh transactions
      await useTransactionStore.getState().fetchTransactions(user.account);
      set({ isLoading: false, error: null });
    } catch (error) {
      console.error('Transaction error:', error);
      set({ error: 'Failed to process transaction', isLoading: false });
      throw error;
    }
  },
}));