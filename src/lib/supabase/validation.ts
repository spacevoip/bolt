import { supabaseConfig } from '../../config/supabase.config';

export function validateSupabaseConfig(): void {
  const { url, anonKey } = supabaseConfig;
  
  if (!url || !url.includes('supabase.co')) {
    throw new Error('Invalid Supabase URL configuration');
  }
  
  if (!anonKey || anonKey.length < 30) {
    throw new Error('Invalid Supabase anon key configuration');
  }
}

export function validateDatabaseConnection(error: unknown): string {
  if (error instanceof Error) {
    return `Database connection error: ${error.message}`;
  }
  return 'Unknown database connection error';
}