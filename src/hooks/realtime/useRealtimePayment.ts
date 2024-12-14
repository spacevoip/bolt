import { useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { toast } from 'react-hot-toast';
import type { RealtimeChannel } from '@supabase/supabase-js';

interface UseRealtimePaymentProps {
  txid: string | null;
  onPaymentReceived: (amount: number) => void;
  onPaymentCancelled: () => void;
}

export function useRealtimePayment({ 
  txid, 
  onPaymentReceived,
  onPaymentCancelled 
}: UseRealtimePaymentProps) {
  useEffect(() => {
    if (!txid) return;

    let channel: RealtimeChannel;

    const setupRealtimeSubscription = () => {
      channel = supabase
        .channel(`payment-${txid}`)
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'pagamentos_recebidos',
            filter: `txid=eq.${txid}`
          },
          (payload) => {
            if (payload.new) {
              const status = payload.new.status?.toLowerCase();
              const amount = Number(payload.new.valor) || 0;

              if (status === 'paid') {
                onPaymentReceived(amount);
                toast.success('Payment received successfully!');
                channel.unsubscribe();
              } else if (status === 'cancelled') {
                onPaymentCancelled();
                toast.error('Payment was cancelled');
                channel.unsubscribe();
              }
            }
          }
        )
        .subscribe((status) => {
          if (status === 'SUBSCRIBED') {
            console.log('Listening for payment updates...');
          }
        });
    };

    setupRealtimeSubscription();

    return () => {
      if (channel) {
        channel.unsubscribe();
      }
    };
  }, [txid, onPaymentReceived, onPaymentCancelled]);
}