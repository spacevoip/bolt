import { supabase } from '../lib/supabase';
import type { Favorite, CreateFavoriteDTO } from '../types/favorite';
import { toast } from 'react-hot-toast';

export async function createFavorite(data: CreateFavoriteDTO): Promise<Favorite> {
  try {
    const { data: favorite, error } = await supabase
      .from('favorites')
      .insert({
        name: data.name,
        key: data.key,
        account: data.account,
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw error;
    return favorite;
  } catch (error) {
    console.error('Error creating favorite:', error);
    throw new Error('Failed to create favorite');
  }
}

export async function getFavorites(account: string): Promise<Favorite[]> {
  try {
    const { data, error } = await supabase
      .from('favorites')
      .select('*')
      .eq('account', account)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching favorites:', error);
    return [];
  }
}

export async function deleteFavorite(id: string): Promise<void> {
  try {
    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('id', id);

    if (error) throw error;
    toast.success('Favorite removed successfully');
  } catch (error) {
    console.error('Error deleting favorite:', error);
    throw new Error('Failed to delete favorite');
  }
}