import { supabase } from '../lib/supabase';

export async function fetchBalance(account: string): Promise<number> {
  try {
    const { data, error } = await supabase
      .from('saldo')
      .select('saldo')
      .eq('account', account)
      .single();

    if (error) {
      console.error('Error fetching balance:', error);
      return 0;
    }

    return Number(data?.saldo) || 0;
  } catch (error) {
    console.error('Error in fetchBalance:', error);
    return 0;
  }
}

export async function hasEnoughBalance(account: string, amount: number): Promise<boolean> {
  try {
    const balance = await fetchBalance(account);
    return balance >= amount;
  } catch (error) {
    console.error('Error checking balance:', error);
    throw new Error('Failed to verify balance');
  }
}