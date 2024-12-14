import { env } from './env';

export const supabaseConfig = {
  url: env.supabase.url,
  anonKey: env.supabase.anonKey,
  options: {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
    global: {
      headers: {
        'x-application-name': 'modern-banking-system',
      },
    },
  },
} as const;

export const connectionConfig = {
  retryAttempts: 3,
  retryDelay: 1000,
  timeout: 10000,
} as const;