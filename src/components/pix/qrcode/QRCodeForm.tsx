import React, { useState } from 'react';
import { QrCode } from 'lucide-react';
import { formatCurrency, validateAmount } from '../../../utils/currency';

interface QRCodeFormProps {
  onSubmit: (amount: number, description?: string) => Promise<void>;
}

export default function QRCodeForm({ onSubmit }: QRCodeFormProps) {
  const [amount, setAmount] = useState('');
  const [formattedAmount, setFormattedAmount] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, '');
    const numberValue = Number(rawValue) / 100;
    setAmount(numberValue.toString());
    setFormattedAmount(formatCurrency(numberValue));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate amount
    const validationError = validateAmount(Number(amount));
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);
    try {
      await onSubmit(Number(amount), description);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            <QrCode className="text-blue-600" size={24} />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Gerar QR Code</h2>
            <p className="text-sm text-gray-500">Crie um QR code para receber PIX</p>
          </div>
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
            Valor *
          </label>
          <input
            type="text"
            value={formattedAmount}
            onChange={handleAmountChange}
            placeholder="R$ 0,00"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <p className="mt-1 text-xs text-gray-500">
            Valor máximo: R$ 100.000,00
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Descrição (opcional)
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Adicione uma descrição para este QR code"
            maxLength={100}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          {isLoading ? 'Gerando...' : 'Gerar QR Code'}
        </button>
      </form>
    </div>
  );
}