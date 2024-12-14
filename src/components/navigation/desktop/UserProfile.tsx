import React, { useState } from 'react';
import { Eye, EyeOff, Wallet } from 'lucide-react';
import { useAuthStore } from '../../../store/useAuthStore';
import Logo from '../../common/Logo';

export default function UserProfile() {
  const { user } = useAuthStore();
  const [showBalance, setShowBalance] = useState(false);

  const formatBalance = (balance: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(balance);
  };

  return (
    <div className="p-4 border-b">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <img
            src={user?.avatar}
            alt={user?.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="overflow-hidden">
            <h2 className="font-semibold truncate">{user?.name}</h2>
            <p className="text-sm text-gray-500 truncate">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Account Info */}
      <div className="space-y-2">
        <div className="bg-gray-50 rounded-lg p-2">
          <p className="text-sm text-gray-600">Account</p>
          <p className="font-mono font-medium text-blue-600 break-all">{user?.account}</p>
        </div>

        {/* Balance Display */}
        <div className="bg-blue-50 rounded-lg p-2">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center space-x-2">
              <Wallet size={16} className="text-blue-600" />
              <p className="text-sm text-blue-600">Available Balance</p>
            </div>
            <button
              onClick={() => setShowBalance(!showBalance)}
              className="p-1 hover:bg-blue-100 rounded-full transition-colors"
              aria-label={showBalance ? 'Hide balance' : 'Show balance'}
            >
              {showBalance ? (
                <EyeOff size={16} className="text-blue-600" />
              ) : (
                <Eye size={16} className="text-blue-600" />
              )}
            </button>
          </div>
          <p className="font-mono font-medium text-blue-700">
            {showBalance ? formatBalance(user?.balance || 0) : '••••••'}
          </p>
        </div>
      </div>
    </div>
  );
}