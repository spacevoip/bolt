import React from 'react';
import { SendHorizontal, AlertCircle } from 'lucide-react';
import { formatCurrency } from '../../../utils/currency';

interface PixFormProps {
  pixKey: string;
  setPixKey: (value: string) => void;
  amount: string;
  formattedAmount: string;
  setAmount: (value: string) => void;
  setFormattedAmount: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  error: string;
  onSubmit: (e: React.FormEvent) => void;
  disabled?: boolean;
}

export default function PixForm({
  pixKey,
  setPixKey,
  amount,
  formattedAmount,
  setAmount,
  setFormattedAmount,
  description,
  setDescription,
  error,
  onSubmit,
  disabled = false
}: PixFormProps) {
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, '');
    const numberValue = Number(rawValue) / 100;
    setAmount(numberValue.toString());
    setFormattedAmount(formatCurrency(numberValue));
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <SendHorizontal className="text-blue-600" size={24} />
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Enviar PIX</h2>
            <p className="text-sm text-gray-500">Transferência instantânea</p>
          </div>
        </div>
      </div>

      <form onSubmit={onSubmit} className="p-6 space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
            <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={18} />
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Chave PIX *
          </label>
          <input
            type="text"
            value={pixKey}
            onChange={(e) => setPixKey(e.target.value)}
            placeholder="Digite a chave PIX"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:bg-gray-50 disabled:text-gray-500"
            required
            disabled={disabled}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Valor *
          </label>
          <input
            type="text"
            value={formattedAmount}
            onChange={handleAmountChange}
            placeholder="R$ 0,00"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:bg-gray-50 disabled:text-gray-500"
            required
            disabled={disabled}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Descrição
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descrição"
            maxLength={100}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:bg-gray-50 disabled:text-gray-500"
            disabled={disabled}
          />
        </div>

        <button
          type="submit"
          disabled={!pixKey || !amount || disabled}
          className={`w-full py-3 rounded-lg font-medium transition-all ${
            !pixKey || !amount || disabled
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg'
          }`}
        >
          Revisar PIX
        </button>
      </form>
    </div>
  );
}