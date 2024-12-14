import React from 'react';
import { Check, XCircle, Timer } from 'lucide-react';
import type { QRCodeResponse } from '../../types/qrcode';

interface PaymentStatusProps {
  qrCodeData: QRCodeResponse;
  qrStatus: 'pending' | 'paid' | 'cancelled';
}

export default function PaymentStatus({ qrCodeData, qrStatus }: PaymentStatusProps) {
  const statusConfig = {
    paid: {
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-800',
      accentColor: 'text-green-600',
      bgAccent: 'bg-green-100',
      title: 'Payment Received',
      icon: Check
    },
    cancelled: {
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      textColor: 'text-red-800',
      accentColor: 'text-red-600',
      bgAccent: 'bg-red-100',
      title: 'Cancelled',
      icon: XCircle
    },
    pending: {
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      textColor: 'text-orange-800',
      accentColor: 'text-orange-600',
      bgAccent: 'bg-orange-100',
      title: 'Awaiting Payment',
      icon: Timer
    }
  };

  const config = statusConfig[qrStatus];
  const Icon = config.icon;

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-fit">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900">Payment Status</h2>
      </div>
      <div className="p-6">
        <div className="space-y-6">
          <div className={`p-4 rounded-lg ${config.bgColor} border ${config.borderColor}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${config.textColor}`}>
                  Status
                </p>
                <p className={`text-2xl font-bold mt-1 ${config.accentColor}`}>
                  {config.title}
                </p>
              </div>
              <div className={`p-3 rounded-full ${config.bgAccent}`}>
                <Icon className={`w-6 h-6 ${config.accentColor}`} />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-500">Transaction ID</span>
              <span className="font-mono text-sm">{qrCodeData.txid}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}