import React, { useState } from 'react';
import { Star, X } from 'lucide-react';
import { useAuthStore } from '../../../store/useAuthStore';
import { createFavorite } from '../../../services/favoriteService';
import { validatePixKey } from '../../../utils/validation';
import { toast } from 'react-hot-toast';

interface AddFavoriteFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export default function AddFavoriteForm({ onSuccess, onCancel }: AddFavoriteFormProps) {
  const { user } = useAuthStore();
  const [name, setName] = useState('');
  const [key, setKey] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!user?.account) {
      setError('User not authenticated');
      return;
    }

    const keyError = validatePixKey(key);
    if (keyError) {
      setError(keyError);
      return;
    }

    try {
      setIsSubmitting(true);
      await createFavorite({
        name: name.trim(),
        key: key.trim(),
        account: user.account
      });
      toast.success('Favorite added successfully');
      onSuccess();
    } catch (error) {
      console.error('Error adding favorite:', error);
      setError('Failed to add favorite');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Star className="text-blue-600" size={24} />
            <h2 className="text-xl font-semibold text-gray-900">Add PIX Favorite</h2>
          </div>
          <button
            onClick={onCancel}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name or Nickname *
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter a name for this contact"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            PIX Key *
          </label>
          <input
            type="text"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="Enter the PIX key"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSubmitting || !name || !key}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
              isSubmitting || !name || !key
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isSubmitting ? 'Adding...' : 'Add Favorite'}
          </button>
        </div>
      </form>
    </div>
  );
}