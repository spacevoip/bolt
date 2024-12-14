import { useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { toast } from 'react-hot-toast';
import type { RealtimeChannel } from '@supabase/supabase-js';

interface UseRealtimePaymentProps {
  txid: string | null;
  onPaymentReceived: (amount: number) => void;
  onReset: () => void;
}

export function useRealtimePayment({ txid, onPaymentReceived, onReset }: UseRealtimePaymentProps) {
  useEffect(() => {
    if (!txid) return;

    let channel: RealtimeChannel;
    let resetTimer: NodeJS.Timeout;

    const setupRealtimeSubscription = () => {
      channel = supabase
        .channel('payment-status')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'pagamentos_recebidos',
            filter: `txid=eq.${txid}`
          },
          (payload) => {
            if (payload.new && payload.new.status?.toLowerCase() === 'paid') {
              onPaymentReceived(Number(payload.new.valor) || 0);
              toast.success('Pagamento Recebido com Sucesso (:');
              
              // Set timer to reset the page after 3 seconds
              resetTimer = setTimeout(() => {
                onReset();
              }, 3000);
              
              channel.unsubscribe();
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
      if (resetTimer) {
        clearTimeout(resetTimer);
      }
    };
  }, [txid, onPaymentReceived, onReset]);
}