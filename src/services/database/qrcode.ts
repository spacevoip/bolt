import { supabase } from '../../lib/supabase';
import type { QRCodePaymentStatus } from '../../types/qrcode';

export async function verifyQRCodePaymentDB(txid: string): Promise<QRCodePaymentStatus> {
  try {
    const { data, error } = await supabase
      .from('pagamentos_recebidos')
      .select('status, valor')
      .eq('txid', txid)
      .single();

    if (error) {
      console.error('Database query error:', error);
      return { status: 'pending', amount: 0, found: false };
    }

    if (data?.status?.toLowerCase() === 'paid') {
      return {
        status: 'paid',
        amount: Number(data.valor) || 0,
        found: true
      };
    }

    return {
      status: 'pending',
      amount: Number(data.valor) || 0,
      found: true
    };
  } catch (error) {
    console.error('Database verification error:', error);
    return { status: 'pending', amount: 0, found: false };
  }
}

export async function cancelQRCodeDB(txid: string): Promise<void> {
  const { error } = await supabase
    .from('pendentes')
    .update({ status: 'cancelled' })
    .eq('txid', txid);

  if (error) throw error;
}