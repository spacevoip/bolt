import { sendPixAPI } from './api/pix/sendPix';
import { supabase } from '../lib/supabase';
import type { PixResponse, PixTransaction } from '../types/pix';
import { toast } from 'react-hot-toast';

export async function sendPix(
  pixKey: string, 
  amount: number, 
  code: string
): Promise<PixResponse> {
  try {
    const response = await sendPixAPI({ pixKey, amount, code });
    await recordTransaction(code, pixKey, amount, response.txid || '');
    return response;
  } catch (error) {
    const errorMessage = error instanceof Error 
      ? error.message 
      : 'Failed to process PIX transfer';
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
}

async function recordTransaction(
  fromAccount: string,
  toAccount: string,
  amount: number,
  txid: string
): Promise<void> {
  try {
    const transaction: Omit<PixTransaction, 'data'> = {
      valor: amount,
      method: 'pix',
      status: 'pending',
      account: fromAccount,
      chave_pix: toAccount,
      txid
    };

    const { error } = await supabase
      .from('pagamentos_enviados')
      .upsert(
        {
          ...transaction,
          data: new Date().toISOString()
        },
        {
          onConflict: 'txid',
          ignoreDuplicates: true
        }
      );

    if (error && error.code !== '23505') { // Ignore unique constraint violations
      console.error('Error recording transaction:', error);
      toast.error('Transaction recorded but failed to save details');
    }
  } catch (error) {
    console.error('Failed to record transaction:', error);
  }
}