import React, { useState } from 'react';
import { Star, Plus } from 'lucide-react';
import { useAuthStore } from '../../../store/useAuthStore';
import { createFavorite, deleteFavorite } from '../../../services/favoriteService';
import type { Favorite } from '../../../types/favorite';
import FavoritesList from './FavoritesList';
import { toast } from 'react-hot-toast';

interface FavoritesCardProps {
  favorites: Favorite[];
  onSelect: (favorite: Favorite) => void;
  onFavoriteAdded: () => void;
  onShowAddForm: () => void;
}

export default function FavoritesCard({ 
  favorites, 
  onSelect, 
  onFavoriteAdded,
  onShowAddForm
}: FavoritesCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (id: string) => {
    try {
      setIsDeleting(true);
      await deleteFavorite(id);
      onFavoriteAdded(); // Refresh list
    } catch (error) {
      toast.error('Failed to delete favorite');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Star className="text-blue-600" size={24} />
            <div>
              <h2 className="text-xl font-semibold text-gray-900">PIX Favorites</h2>
              <p className="text-sm text-gray-500">Quick access to your frequent contacts</p>
            </div>
          </div>
          
          <button
            onClick={onShowAddForm}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            aria-label="Add new favorite"
          >
            <Plus size={24} />
          </button>
        </div>
      </div>

      <div className="p-6">
        <FavoritesList
          favorites={favorites}
          onSelect={onSelect}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}