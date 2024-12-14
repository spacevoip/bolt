import { useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../store/useAuthStore';
import type { RealtimeChannel } from '@supabase/supabase-js';

export function useRealtimeBalance() {
  const { user, updateBalance } = useAuthStore();

  useEffect(() => {
    if (!user?.account) return;

    let channel: RealtimeChannel;

    const setupRealtimeSubscription = () => {
      channel = supabase
        .channel('balance-updates')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'saldo',
            filter: `account=eq.${user.account}`
          },
          (payload) => {
            if (payload.new) {
              updateBalance(Number(payload.new.saldo) || 0);
            }
          }
        )
        .subscribe((status) => {
          if (status === 'SUBSCRIBED') {
            console.log('Listening for balance updates...');
          }
        });
    };

    setupRealtimeSubscription();

    return () => {
      if (channel) {
        channel.unsubscribe();
      }
    };
  }, [user?.account, updateBalance]);
}