import { supabase } from '../lib/supabase';
import type { PendingPayment } from '../types/qrcode';
import { toast } from 'react-hot-toast';

interface SavePaymentParams {
  valor: number;
  chave_pix: string;
  account: string;
  tax: number;
  method?: string;
  status?: string;
  code?: string;
  name?: string;
}

export async function saveSentPayment({
  valor,
  chave_pix,
  account,
  tax,
  method = 'pix',
  status = 'pending',
  code,
  name
}: SavePaymentParams): Promise<void> {
  try {
    const { error } = await supabase
      .from('pagamentos_enviados')
      .insert({
        valor,
        method,
        status,
        account,
        chave_pix,
        tax,
        code: code || account,
        name: name || chave_pix,
        data: new Date().toISOString()
      });

    if (error) {
      console.error('Error saving sent payment:', error);
      toast.error('Failed to save payment record');
      throw error;
    }
  } catch (error) {
    console.error('Failed to save sent payment:', error);
    throw error;
  }
}

export async function savePendingPayment(payment: Omit<PendingPayment, 'created_at'>) {
  const { error } = await supabase
    .from('pendentes')
    .insert(payment);

  if (error) {
    console.error('Error saving pending payment:', error);
    toast.error('Failed to save pending payment');
    throw error;
  }
}

export async function checkPaymentStatus(txid: string): Promise<string> {
  try {
    const { data, error } = await supabase
      .from('pendentes')
      .select('status')
      .eq('txid', txid)
      .single();

    if (error) throw error;
    return data.status;
  } catch (error) {
    console.error('Error checking payment status:', error);
    throw new Error('Failed to check payment status');
  }
}

export async function cancelPayment(txid: string): Promise<void> {
  try {
    const { error } = await supabase
      .from('pendentes')
      .update({ status: 'cancelled' })
      .eq('txid', txid);

    if (error) throw error;
  } catch (error) {
    console.error('Error cancelling payment:', error);
    toast.error('Failed to cancel payment');
    throw error;
  }
}