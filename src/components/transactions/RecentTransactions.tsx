import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RefreshCw } from 'lucide-react';
import TransactionCard from '../cards/TransactionCard';
import { useLocale } from '../../hooks/useLocale';
import type { Transaction } from '../../types/transaction';

interface RecentTransactionsProps {
  transactions: Transaction[];
  onRefresh?: () => Promise<void>;
  maxMobileTransactions?: number;
}

export default function RecentTransactions({ 
  transactions, 
  onRefresh,
  maxMobileTransactions = 3
}: RecentTransactionsProps) {
  const { t } = useLocale();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const filteredTransactions = transactions
    .filter(transaction => 
      transaction.status.toLowerCase() !== 'pending' && 
      transaction.status.toLowerCase() !== 'aguardando pagamento'
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const displayTransactions = window.innerWidth < 640 
    ? filteredTransactions.slice(0, maxMobileTransactions)
    : filteredTransactions.slice(0, 5);

  const handleRefresh = async () => {
    if (!onRefresh) return;
    setIsRefreshing(true);
    await onRefresh();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-900">
            {t('dashboard.recentTransactions.title')}
          </h3>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className={`p-2 rounded-lg transition-colors ${
                isRefreshing 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
              }`}
            >
              <RefreshCw size={20} className={isRefreshing ? 'animate-spin' : ''} />
            </button>
            <Link 
              to="/transactions" 
              className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
            >
              {t('dashboard.recentTransactions.viewAll')}
            </Link>
          </div>
        </div>
      </div>
      <div className="p-6 space-y-4">
        {displayTransactions.length === 0 ? (
          <p className="text-center text-gray-500">
            {t('dashboard.recentTransactions.noTransactions')}
          </p>
        ) : (
          displayTransactions.map((transaction) => (
            <TransactionCard 
              key={`${transaction.id}-${new Date(transaction.date).getTime()}`}
              transaction={transaction} 
            />
          ))
        )}
      </div>
    </div>
  );
}