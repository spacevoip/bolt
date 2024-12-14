import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Toast } from 'react-hot-toast';

interface SuccessToastProps {
  t: Toast;
  onClose: () => void;
}

export default function SuccessToast({ t, onClose }: SuccessToastProps) {
  return (
    <div
      className={`${
        t.visible ? 'animate-enter' : 'animate-leave'
      } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    >
      <div className="flex-1 w-0 p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 pt-0.5">
            <CheckCircle2 className="h-10 w-10 text-green-500" />
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-gray-900">
              Pagamento enviado com Sucesso
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Sua transferência está sendo processada
            </p>
          </div>
        </div>
      </div>
      <div className="flex border-l border-gray-200">
        <button
          onClick={onClose}
          className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-green-600 hover:text-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Fechar
        </button>
      </div>
    </div>
  );
}