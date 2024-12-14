import React from 'react';
import { formatCurrency, validateAmount } from '../../../utils/currency';

interface QRCodeFormProps {
  amount: string;
  formattedAmount: string;
  description: string;
  isLoading: boolean;
  error: string;
  setAmount: (value: string) => void;
  setFormattedAmount: (value: string) => void;
  setDescription: (value: string) => void;
  onSubmit: () => void;
}

export function QRCodeForm({
  amount,
  formattedAmount,
  description,
  isLoading,
  error,
  setAmount,
  setFormattedAmount,
  setDescription,
  onSubmit
}: QRCodeFormProps) {
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, '');
    const numberValue = Number(rawValue) / 100;
    setAmount(numberValue.toString());
    setFormattedAmount(formatCurrency(rawValue));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateAmount(amount);
    if (validationError) return;
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Amount *
        </label>
        <div className="relative">
          <input
            type="text"
            value={formattedAmount}
            onChange={handleAmountChange}
            placeholder="R$ 0,00"
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
              error ? 'border-red-300 focus:ring-red-200' : 'focus:ring-blue-200'
            }`}
            required
          />
        </div>
        <p className="mt-1 text-xs text-gray-500">
          Maximum amount: R$ 100.000,00
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description (optional)
        </label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Payment description..."
          maxLength={100}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading || !amount}
        className={`w-full py-3 rounded-lg font-medium transition-all ${
          isLoading || !amount
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg'
        }`}
      >
        {isLoading ? 'Generating...' : 'Generate QR Code'}
      </button>
    </form>
  );
}