import React, { useState } from 'react';
import { useTransactionStore } from '../store/useTransactionStore';
import { useAuthStore } from '../store/useAuthStore';
import { ArrowUpRight, ArrowDownLeft, Filter, RefreshCw } from 'lucide-react';
import TransactionList from '../components/transactions/TransactionList';
import TransactionDetails from '../components/transactions/TransactionDetails';
import type { Transaction } from '../types/transaction';

type TransactionFilter = 'all' | 'sent' | 'received';

export default function Transactions() {
  const [filter, setFilter] = useState<TransactionFilter>('all');
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { user } = useAuthStore();
  const { transactions, sentTransactions, receivedTransactions, fetchTransactions, isLoading } = useTransactionStore();

  const ITEMS_PER_PAGE = 10;

  // Sort transactions by date (most recent first)
  const sortedTransactions = [...transactions].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const sortedSentTransactions = [...sentTransactions].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const sortedReceivedTransactions = [...receivedTransactions].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const displayTransactions = filter === 'sent' 
    ? sortedSentTransactions 
    : filter === 'received' 
      ? sortedReceivedTransactions 
      : sortedTransactions;

  // Pagination
  const totalPages = Math.ceil(displayTransactions.length / ITEMS_PER_PAGE);
  const paginatedTransactions = displayTransactions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleRefresh = async () => {
    if (user?.account) {
      await fetchTransactions(user.account);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Transactions List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Histórico de Transações</h2>
                  <p className="text-gray-500 mt-1">Visualize todas as suas transações</p>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <Filter size={20} className="text-gray-400" />
                    <select
                      value={filter}
                      onChange={(e) => {
                        setFilter(e.target.value as TransactionFilter);
                        setCurrentPage(1);
                      }}
                      className="border-0 bg-gray-50 rounded-lg py-2 px-3 text-gray-700 focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">Todas as Transações</option>
                      <option value="sent">Enviadas</option>
                      <option value="received">Recebidas</option>
                    </select>
                  </div>

                  <button
                    onClick={handleRefresh}
                    disabled={isLoading}
                    className={`p-2 rounded-lg transition-colors ${
                      isLoading 
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                        : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                    }`}
                  >
                    <RefreshCw size={20} className={isLoading ? 'animate-spin' : ''} />
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6">
              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-500">Total de Transações</p>
                  <p className="text-2xl font-semibold">{displayTransactions.length}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-xl">
                  <p className="text-sm text-green-600">Recebidas</p>
                  <p className="text-2xl font-semibold text-green-700">{sortedReceivedTransactions.length}</p>
                </div>
                <div className="bg-red-50 p-4 rounded-xl">
                  <p className="text-sm text-red-600">Enviadas</p>
                  <p className="text-2xl font-semibold text-red-700">{sortedSentTransactions.length}</p>
                </div>
              </div>

              {/* Transactions List */}
              <TransactionList
                transactions={paginatedTransactions}
                onSelect={setSelectedTransaction}
                selectedId={selectedTransaction?.id}
              />

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-6 flex justify-center space-x-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className={`px-3 py-1 rounded-lg ${
                      currentPage === 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                    }`}
                  >
                    Anterior
                  </button>
                  <span className="px-3 py-1 bg-gray-50 rounded-lg text-gray-600">
                    {currentPage} de {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-1 rounded-lg ${
                      currentPage === totalPages
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                    }`}
                  >
                    Próxima
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Transaction Details Sidebar */}
        <div className="lg:col-span-1">
          <TransactionDetails
            transaction={selectedTransaction}
            onClose={() => setSelectedTransaction(null)}
          />
        </div>
      </div>
    </div>
  );
}