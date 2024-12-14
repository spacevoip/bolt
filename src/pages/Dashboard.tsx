import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { useTransactionStore } from '../store/useTransactionStore';
import { useBalanceRefresh } from '../hooks/useBalanceRefresh';
import { calculateTransactionTotals } from '../utils/transactions';
import BalanceCard from '../components/cards/BalanceCard';
import QuickActionCard from '../components/cards/QuickActionCard';
import RecentTransactions from '../components/transactions/RecentTransactions';
import { 
  SendHorizontal, 
  QrCode, 
  Receipt, 
  PiggyBank
} from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuthStore();
  const { transactions, fetchTransactions } = useTransactionStore();
  const { refreshBalance } = useBalanceRefresh();
  const { totalIncoming, totalOutgoing } = calculateTransactionTotals(transactions);

  useEffect(() => {
    if (user?.account) {
      fetchTransactions(user.account);
    }
  }, [user?.account]);

  const handleRefreshTransactions = async () => {
    if (user?.account) {
      await fetchTransactions(user.account);
    }
  };

  const quickActions = [
    {
      icon: SendHorizontal,
      title: 'Send PIX',
      description: 'Transfer money instantly',
      to: '/pix',
      gradient: 'bg-gradient-to-br from-violet-500 to-purple-600'
    },
    {
      icon: QrCode,
      title: 'PIX QR Code',
      description: 'Receive payments easily',
      to: '/pix-qr',
      gradient: 'bg-gradient-to-br from-blue-500 to-indigo-600'
    },
    {
      icon: Receipt,
      title: 'Transactions',
      description: 'View your history',
      to: '/transactions',
      gradient: 'bg-gradient-to-br from-emerald-500 to-teal-600'
    },
    {
      icon: PiggyBank,
      title: 'Savings',
      description: 'Manage your savings',
      to: '/transactions',
      gradient: 'bg-gradient-to-br from-amber-500 to-orange-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Welcome message - Only visible on desktop */}
        <div className="hidden lg:block">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
          <p className="text-gray-500">Here's your financial overview</p>
        </div>

        {/* Balance Card */}
        <BalanceCard 
          balance={user?.balance || 0}
          totalIncoming={totalIncoming}
          totalOutgoing={totalOutgoing}
          onRefresh={refreshBalance}
        />

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          {quickActions.map((action, index) => (
            <QuickActionCard key={index} {...action} />
          ))}
        </div>

        {/* Recent Transactions */}
        <RecentTransactions 
          transactions={transactions} 
          onRefresh={handleRefreshTransactions}
          maxMobileTransactions={3}
        />
      </div>
    </div>
  );
}