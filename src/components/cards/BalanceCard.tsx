import React, { useState } from 'react';
import { Wallet, TrendingUp, TrendingDown, CreditCard, RefreshCw } from 'lucide-react';
import { useLocale } from '../../hooks/useLocale';
import { formatCurrency } from '../../utils/currency';

interface BalanceCardProps {
  balance: number;
  totalIncoming: number;
  totalOutgoing: number;
  onRefresh: () => Promise<void>;
}

export default function BalanceCard({ balance, totalIncoming, totalOutgoing, onRefresh }: BalanceCardProps) {
  const { t } = useLocale();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await onRefresh();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <div className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 text-white overflow-hidden">
      <div className="relative">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
          <div className="p-3 bg-white/10 backdrop-blur-sm rounded-xl w-fit">
            <Wallet size={28} className="text-white" />
          </div>
          <div className="flex-1">
            <p className="text-white/80 font-medium">{t('common.balance')}</p>
            <div className="flex items-center space-x-3">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                {formatCurrency(balance)}
              </h2>
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className={`p-2 rounded-lg transition-colors ${
                  isRefreshing 
                    ? 'bg-white/5 cursor-not-allowed' 
                    : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                <RefreshCw 
                  size={20} 
                  className={`text-white ${isRefreshing ? 'animate-spin' : ''}`} 
                />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp size={20} className="text-green-300" />
              <span className="text-white/80">{t('dashboard.balance.incoming')}</span>
            </div>
            <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-300">
              {formatCurrency(totalIncoming)}
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingDown size={20} className="text-red-300" />
              <span className="text-white/80">{t('dashboard.balance.outgoing')}</span>
            </div>
            <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-red-300">
              {formatCurrency(totalOutgoing)}
            </p>
          </div>
        </div>

        {/* Hide on mobile */}
        <div className="hidden sm:flex flex-wrap gap-3">
          <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/10">
            <CreditCard size={16} className="inline mr-2" />
            {t('dashboard.balance.available')}
          </div>
          <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/10">
            {t('dashboard.balance.instant')}
          </div>
        </div>
      </div>
    </div>
  );
}