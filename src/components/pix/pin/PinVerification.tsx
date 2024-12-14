import React from 'react';
import { Lock } from 'lucide-react';
import PinInput from './PinInput';

interface PinVerificationProps {
  onSuccess: () => void;
  onError: (message: string) => void;
  onCancel: () => void;
}

export default function PinVerification({ onSuccess, onError, onCancel }: PinVerificationProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <Lock className="text-blue-600" size={24} />
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Verificação de Segurança</h2>
            <p className="text-sm text-gray-500">Digite seu PIN para continuar</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <PinInput
          onSuccess={onSuccess}
          onError={onError}
        />

        <button
          onClick={onCancel}
          className="w-full py-3 px-4 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}