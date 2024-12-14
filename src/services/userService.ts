import { supabase } from '../lib/supabase';
import type { User } from '../types/user';

export async function fetchUserProfile(userId: string): Promise<Partial<User>> {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('cnpj, tax, gerente, created_at')
      .eq('id', userId)
      .single();

    if (error) throw error;

    return {
      cnpj: data.cnpj,
      tax_rate: data.tax,
      manager: data.gerente,
      created_at: data.created_at
    };
  } catch (error) {
    console.error('Error fetching user profile:', error);
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
        cnpj: data.cnpj,
        tax: data.tax_rate,
        gerente: data.manager,
      })
      .eq('id', userId);

    if (error) throw error;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
}