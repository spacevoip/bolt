import { supabase } from '../lib/supabase';
import { toast } from 'react-hot-toast';
import { cryptoService } from './cryptoService';

/**
 * ATENÇÃO: Não modifique este arquivo sem consultar a documentação.
 * As funções aqui são críticas para a segurança do sistema.
 */

export interface AuthError {
  code: string;
  message: string;
}

export async function signIn(email: string, password: string) {
  try {
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (userError) {
      throw new Error('Invalid credentials');
    }

    if (!user) {
      throw new Error('User not found');
    }

    const isValidPassword = await cryptoService.verifyPassword(password, user.password);
    if (!isValidPassword) {
      await updateFailedAttempts(email, (user.failed_attempts || 0) + 1);
      throw new Error('Invalid credentials');
    }

    // Reset failed attempts on successful login
    if (user.failed_attempts > 0) {
      await updateFailedAttempts(email, 0);
    }

    return { user, error: null };
  } catch (error) {
    console.error('Authentication error:', error);
    return {
      user: null,
      error: {
        code: 'invalid_credentials',
        message: error instanceof Error ? error.message : 'Authentication failed'
      }
    };
  }
}

export async function verifyPin(account: string, pin: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('auth')
      .eq('account', account)
      .single();

    if (error) throw error;
    
    return data?.auth === pin;
  } catch (error) {
    console.error('PIN verification error:', error);
    throw new Error('Failed to verify PIN');
  }
}

export async function changePassword(userId: string, newPassword: string): Promise<void> {
  try {
    const hashedPassword = await cryptoService.hashPassword(newPassword);
    const { error } = await supabase
      .from('users')
      .update({ password: hashedPassword })
      .eq('id', userId);

    if (error) throw error;
  } catch (error) {
    console.error('Password change error:', error);
    throw new Error('Failed to change password');
  }
}

export async function updateFailedAttempts(email: string, attempts: number): Promise<void> {
  try {
    const { error } = await supabase
      .from('users')
      .update({ failed_attempts: attempts })
      .eq('email', email);

    if (error) throw error;

    // Lock account if max attempts exceeded
    if (attempts >= 5) {
      await lockAccount(email);
    }
  } catch (error) {
    console.error('Failed to update attempts:', error);
    throw new Error('Failed to update attempts');
  }
}

export async function lockAccount(email: string): Promise<void> {
  try {
    const { error } = await supabase
      .from('users')
      .update({ is_locked: true })
      .eq('email', email);

    if (error) throw error;
  } catch (error) {
    console.error('Failed to lock account:', error);
    throw new Error('Failed to lock account');
  }
}