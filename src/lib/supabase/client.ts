import { createClient } from '@supabase/supabase-js';
import { env } from '../../config/env';
import type { Database } from '../../types/supabase';

export const supabase = createClient<Database>(
  env.supabase.url,
  env.supabase.anonKey,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
    global: {
      headers: {
        'x-application-name': 'modern-banking-system',
      },
    },
  }
);