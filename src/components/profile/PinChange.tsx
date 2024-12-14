import React, { useState } from 'react';
import { Lock } from 'lucide-react';
import PinInput from '../pix/pin/PinInput';
import { toast } from 'react-hot-toast';
import { changePin } from '../../services/authService';

interface PinChangeProps {
  userId: string;
}

export default function PinChange({ userId }: PinChangeProps) {
  const [step, setStep] = useState<'initial' | 'verify' | 'new'>('initial');
  const [isLoading, setIsLoading] = useState(false);

  const handlePinVerificationSuccess = () => {
    setStep('new');
  };

  const handlePinVerificationError = (message: string) => {
    toast.error(message);
  };

  const handleNewPinSuccess = async () => {
    setIsLoading(true);
    try {
      await changePin(userId);
      toast.success('PIN alterado com sucesso');
      setStep('initial');
    } catch (error) {
      console.error('Erro ao alterar PIN:', error);
      toast.error('Falha ao alterar o PIN');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Alterar PIN</h3>
        {step === 'initial' && (
          <button
            onClick={() => setStep('verify')}
            className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            Alterar PIN
          </button>
        )}
      </div>

      {step === 'verify' && (
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="text-center mb-6">
            <Lock className="w-12 h-12 text-blue-600 mx-auto mb-2" />
            <h4 className="text-lg font-medium text-gray-900">Verificação de Segurança</h4>
            <p className="text-sm text-gray-500">
              Digite seu PIN atual para continuar
            </p>
          </div>
          <PinInput
            onSuccess={handlePinVerificationSuccess}
            onError={handlePinVerificationError}
          />
        </div>
      )}

      {step === 'new' && (
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="text-center mb-6">
            <Lock className="w-12 h-12 text-blue-600 mx-auto mb-2" />
            <h4 className="text-lg font-medium text-gray-900">Novo PIN</h4>
            <p className="text-sm text-gray-500">
              Digite seu novo PIN de 4 dígitos
            </p>
          </div>
          <PinInput
            onSuccess={handleNewPinSuccess}
            onError={(message) => toast.error(message)}
          />
        </div>
      )}
    </div>
  );
}
