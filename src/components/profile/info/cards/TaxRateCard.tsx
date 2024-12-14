import React from 'react';
import { Percent } from 'lucide-react';
import { useTaxRate } from '../../../../hooks/tax/useTaxRate';

interface TaxRateCardProps {
  accountNumber: string;
}

export default function TaxRateCard({ accountNumber }: TaxRateCardProps) {
  const { taxRate, isLoading, error } = useTaxRate(accountNumber);

  const formatTaxRate = (rate: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'percent',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(rate / 100);
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg space-y-2">
      <div className="flex items-center space-x-2 text-gray-500">
        <Percent className="w-5 h-5" />
        <span className="text-sm">Tax Rate</span>
      </div>
      <div>
        {isLoading ? (
          <div className="animate-pulse h-6 bg-gray-200 rounded w-16" />
        ) : error ? (
          <p className="text-red-500 text-sm">Failed to load tax rate</p>
        ) : (
          <p className="font-medium text-gray-900">{formatTaxRate(taxRate)}</p>
        )}
      </div>
    </div>
  );
}