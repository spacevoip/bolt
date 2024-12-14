import { supabase } from '../lib/supabase';

export async function processTransaction(
  fromAccount: string,
  toAccount: string,
  amount: number,
  description: string,
  fromUser: string,
  toUser: string
): Promise<void> {
  try {
    const { error } = await supabase.rpc('process_transaction', {
      p_from_account: fromAccount,
      p_to_account: toAccount,
      p_amount: amount,
      p_description: description,
      p_from_user: fromUser,
      p_to_user: toUser,
    });

    if (error) {
      console.error('Error processing transaction:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error in processTransaction:', error);
    throw error;
  }
}