import React from 'react';
import { CheckCircle2, Timer, XCircle } from 'lucide-react';
import type { QRCodePaymentStatus } from '../../../types/qrcode';

interface QRCodeStatusProps {
  status: QRCodePaymentStatus;
  progress: number;
  txid: string;
}

export default function QRCodeStatus({ status, progress, txid }: QRCodeStatusProps) {
  const statusConfig = {
    paid: {
      icon: CheckCircle2,
      title: 'Payment Received',
      description: 'The payment has been processed successfully',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      progressColor: 'bg-green-500'
    },
    pending: {
      icon: Timer,
      title: 'Awaiting Payment',
      description: 'Waiting for the payment to be processed',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      progressColor: 'bg-blue-500'
    },
    cancelled: {
      icon: XCircle,
      title: 'Payment Cancelled',
      description: 'This QR code has been cancelled',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      progressColor: 'bg-red-500'
    }
  };

  const config = statusConfig[status.status];
  const Icon = config.icon;

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900">Payment Status</h2>
      </div>

      <div className="p-6 space-y-6">
        <div className={`p-4 rounded-lg ${config.bgColor} border ${config.borderColor}`}>
          <div className="flex items-center space-x-3">
            <Icon className={config.color} size={24} />
            <div>
              <p className={`font-medium ${config.color}`}>{config.title}</p>
              <p className="text-sm text-gray-600">{config.description}</p>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${config.progressColor}`}
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-sm text-gray-500">
            <span>Verifying payment</span>
            <span>{progress}%</span>
          </div>
        </div>

        {status.status === 'paid' && (
          <div className="space-y-3 pt-3 border-t border-gray-100">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Amount Received</span>
              <span className="font-medium text-gray-900">
                R$ {status.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Transaction ID</span>
              <span className="font-mono text-xs text-gray-500">{txid}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}