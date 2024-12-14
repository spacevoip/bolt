import React from 'react';
import { Star, Trash2 } from 'lucide-react';
import type { Favorite } from '../../../types/favorite';

interface FavoritesListProps {
  favorites: Favorite[];
  onSelect: (favorite: Favorite) => void;
  onDelete: (id: string) => Promise<void>;
}

export default function FavoritesList({ favorites, onSelect, onDelete }: FavoritesListProps) {
  if (favorites.length === 0) {
    return (
      <div className="text-center py-8">
        <Star className="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <p className="text-gray-500">No favorites yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {favorites.map((favorite) => (
        <div
          key={favorite.id}
          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <button
            onClick={() => onSelect(favorite)}
            className="flex-1 flex items-center text-left"
          >
            <div>
              <p className="font-medium text-gray-900">{favorite.name}</p>
              <p className="text-sm text-gray-500">{favorite.key}</p>
            </div>
          </button>
          
          <button
            onClick={() => onDelete(favorite.id)}
            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
            aria-label="Remove favorite"
          >
            <Trash2 size={18} />
          </button>
        </div>
      ))}
    </div>
  );
}