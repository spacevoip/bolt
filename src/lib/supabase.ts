import { createClient } from '@supabase/supabase-js';
import { env } from '../config/env';
import type { Database } from '../types/supabase';

// Validate environment variables
function validateConfig() {
  const { url, anonKey } = env.supabase;
  
  if (!url || !url.includes('supabase.co')) {
    throw new Error('Invalid Supabase URL configuration');
  }
  
  if (!anonKey || anonKey.length < 30) {
    throw new Error('Invalid Supabase anon key configuration');
  }
}

// Initialize Supabase client with validated config
validateConfig();

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

// Test connection and provide feedback
export async function testConnection() {
  try {
    const { data, error } = await supabase.from('users').select('count').single();
    if (error) throw error;
    return { 
      success: true, 
      message: 'Connected to Supabase successfully' 
    };
  } catch (error) {
    console.error('Supabase connection error:', error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Failed to connect to Supabase' 
    };
  }
}

// Initialize connection
export async function initializeConnection() {
  const { success, message } = await testConnection();
  if (success) {
    console.log('✅ Supabase connection established');
  } else {
    console.error('❌ Supabase connection failed:', message);
    throw new Error('Failed to initialize Supabase connection');
  }
}

// Initialize connection on load
initializeConnection().catch(console.error);