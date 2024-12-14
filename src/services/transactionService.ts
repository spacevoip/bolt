import { supabase } from '../lib/supabase';
import type { Transaction } from '../types/transaction';
import { mapSentTransaction, mapReceivedTransaction } from '../utils/transactionMapper';

export async function fetchSentTransactions(account: string): Promise<Transaction[]> {
  try {
    const { data, error } = await supabase
      .from('pagamentos_enviados')
      .select('*')
      .eq('account', account)
      .order('data', { ascending: false });

    if (error) {
      console.error('Error fetching sent transactions:', error);
      return [];
    }

    return data?.map(mapSentTransaction) || [];
  } catch (error) {
    console.error('Error in fetchSentTransactions:', error);
    return [];
  }
}

export async function fetchReceivedTransactions(account: string): Promise<Transaction[]> {
  try {
    const { data, error } = await supabase
      .from('pagamentos_recebidos')
      .select('*')
      .eq('account', account)
      .order('horario', { ascending: false });

    if (error) {
      console.error('Error fetching received transactions:', error);
      return [];
    }

    return data?.map(mapReceivedTransaction) || [];
  } catch (error) {
    console.error('Error in fetchReceivedTransactions:', error);
    return [];
  }
}

export async function fetchBalance(account: string): Promise<number> {
  try {
    const { data, error } = await supabase
      .from('saldo')
      .select('saldo')
      .eq('account', account)
      .single();

    if (error) throw error;
    return Number(data?.saldo) || 0;
  } catch (error) {
    console.error('Error fetching balance:', error);
    return 0;
  }
}