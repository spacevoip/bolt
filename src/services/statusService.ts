import { supabase } from '../lib/supabase';
import { toast } from 'react-hot-toast';

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

export async function updatePaymentStatus(txid: string, status: string): Promise<void> {
  try {
    const { error } = await supabase
      .from('pendentes')
      .update({ status })
      .eq('txid', txid);

    if (error) throw error;
  } catch (error) {
    console.error('Error updating payment status:', error);
    toast.error('Failed to update payment status');
    throw error;
  }
}

export async function cancelPayment(txid: string): Promise<void> {
  try {
    await updatePaymentStatus(txid, 'cancelled');
  } catch (error) {
    console.error('Error cancelling payment:', error);
    toast.error('Failed to cancel payment');
    throw error;
  }
}