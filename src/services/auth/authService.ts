import { supabase } from '../../lib/supabase/client';
import { hashPassword, verifyPassword } from '../crypto/cryptoService';
import { generateAccountNumber } from '../../utils/account';
import type { User } from '../../types/user';
import { toast } from 'react-hot-toast';

export async function loginUser(email: string, password: string): Promise<User> {
  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !user) {
      throw new Error('Invalid credentials');
    }

    const isValidPassword = await verifyPassword(password, user.password);
    if (!isValidPassword) {
      throw new Error('Invalid credentials');
    }

    const { data: balance } = await supabase
      .from('saldo')
      .select('saldo')
      .eq('account', user.account)
      .single();

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      balance: balance?.saldo || 0,
      avatar: user.avatar_url,
      account: user.account,
    };
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

export async function registerUser(
  name: string, 
  email: string, 
  password: string
): Promise<void> {
  try {
    // Check if email exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('email')
      .eq('email', email)
      .single();

    if (existingUser) {
      throw new Error('Email already registered');
    }

    const hashedPassword = await hashPassword(password);
    const account = generateAccountNumber();

    // Create user
    const { error: createError } = await supabase
      .from('users')
      .insert({
        name,
        email,
        password: hashedPassword,
        account,
        avatar_url: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`,
      });

    if (createError) throw createError;

    // Initialize balance
    const { error: balanceError } = await supabase
      .from('saldo')
      .insert({
        account,
        saldo: 0,
      });

    if (balanceError) throw balanceError;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
}

export async function updateUserProfile(
  userId: string, 
  data: Partial<User>
): Promise<void> {
  try {
    const { error } = await supabase
      .from('users')
      .update({
        name: data.name,
        avatar_url: data.avatar,
      })
      .eq('id', userId);

    if (error) throw error;
  } catch (error) {
    console.error('Profile update error:', error);
    throw error;
  }
}

export async function changePassword(
  userId: string, 
  currentPassword: string,
  newPassword: string
): Promise<void> {
  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('password')
      .eq('id', userId)
      .single();

    if (error || !user) throw new Error('User not found');

    const isValidPassword = await verifyPassword(currentPassword, user.password);
    if (!isValidPassword) {
      throw new Error('Current password is incorrect');
    }

    const hashedPassword = await hashPassword(newPassword);
    const { error: updateError } = await supabase
      .from('users')
      .update({ password: hashedPassword })
      .eq('id', userId);

    if (updateError) throw updateError;
  } catch (error) {
    console.error('Password change error:', error);
    throw error;
  }
}