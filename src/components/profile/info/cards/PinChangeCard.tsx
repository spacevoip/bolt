import React, { useState } from 'react';
import { Lock } from 'lucide-react';
import PinInput from '../../../pix/pin/PinInput';
import { toast } from 'react-hot-toast';
import { pinService } from '../../../../services/auth/pinService';
import { useAuthStore } from '../../../../store/useAuthStore';

interface PinChangeCardProps {
  onClose: () => void;
}

export default function PinChangeCard({ onClose }: PinChangeCardProps) {
  const { user } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  const handlePinSuccess = async (newPin: string) => {
    if (!user?.id) return;
    
    setIsLoading(true);
    try {
      const result = await pinService.changePin(user.id, newPin);
      
      if (result.success) {
        toast.success('PIN alterado com sucesso');
        onClose();
      } else {
        toast.error(result.error || 'Erro ao alterar o PIN');
      }
    } catch (error) {
      console.error('Erro ao alterar PIN:', error);
      toast.error('Falha ao alterar o PIN');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePinError = (message: string) => {
    toast.error(message);
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <div className="text-center mb-6">
        <Lock className="w-12 h-12 text-blue-600 mx-auto mb-2" />
        <h4 className="text-lg font-medium text-gray-900">Alterar PIN</h4>
        <p className="text-sm text-gray-500">
          Digite seu novo PIN de 4 dígitos
        </p>
      </div>
      
      <PinInput
        onSuccess={handlePinSuccess}
        onError={handlePinError}
        isLoading={isLoading}
      />

      <button
        onClick={onClose}
        className="mt-4 w-full px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-700"
      >
        Cancelar
      </button>
    </div>
  );
}
