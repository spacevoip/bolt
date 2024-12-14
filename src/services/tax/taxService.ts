import { supabase } from '../../lib/supabase';

export async function fetchAccountTaxRate(accountNumber: string): Promise<number> {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('tax')
      .eq('account', accountNumber)
      .single();

    if (error) throw error;
    return data?.tax || 0;
  } catch (error) {
    console.error('Error fetching tax rate:', error);
    return 0;
  }
}