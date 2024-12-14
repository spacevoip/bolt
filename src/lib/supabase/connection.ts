import { supabase } from './client';
import { validateDatabaseConnection } from './validation';
import { connectionConfig } from '../../config/supabase.config';

interface ConnectionStatus {
  success: boolean;
  message: string;
}

async function attemptConnection(attempt: number): Promise<ConnectionStatus> {
  try {
    const { data, error } = await supabase.from('users').select('count').single();
    if (error) throw error;
    
    return { 
      success: true, 
      message: 'Database connection established'
    };
  } catch (error) {
    const errorMessage = validateDatabaseConnection(error);
    if (attempt < connectionConfig.retryAttempts) {
      await new Promise(resolve => setTimeout(resolve, connectionConfig.retryDelay));
      return attemptConnection(attempt + 1);
    }
    return { success: false, message: errorMessage };
  }
}

export async function testConnection(): Promise<ConnectionStatus> {
  return attemptConnection(1);
}

export async function initializeConnection(): Promise<void> {
  const { success, message } = await testConnection();
  if (!success) {
    console.error('❌', message);
    throw new Error(message);
  }
}