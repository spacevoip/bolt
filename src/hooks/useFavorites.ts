import { useState, useEffect } from 'react';
import { getFavorites } from '../services/favoriteService';
import type { Favorite } from '../types/favorite';

export function useFavorites(account: string | undefined) {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadFavorites = async () => {
    if (!account) return;
    
    try {
      setIsLoading(true);
      setError(null);
      const data = await getFavorites(account);
      setFavorites(data);
    } catch (err) {
      console.error('Error loading favorites:', err);
      setError('Failed to load favorites');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadFavorites();
  }, [account]);

  return {
    favorites,
    isLoading,
    error,
    refresh: loadFavorites
  };
}