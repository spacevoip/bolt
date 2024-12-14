import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { generateQRCode, cancelQRCode } from '../services/qrCodeService';
import { useRealtimePayment } from '../hooks/realtime/useRealtimePayment';
import { useRealtimeProgress } from '../hooks/realtime/useRealtimeProgress';
import QRCodeDisplay from '../components/pix/qrcode/QRCodeDisplay';
import QRCodeStatus from '../components/pix/qrcode/QRCodeStatus';
import QRCodeForm from '../components/pix/qrcode/QRCodeForm';
import type { QRCodeResponse } from '../types/qrcode';
import { toast } from 'react-hot-toast';

export default function PixQRCode() {
  const { user } = useAuthStore();
  const [qrCodeData, setQrCodeData] = useState<QRCodeResponse | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'paid' | 'cancelled'>('pending');
  const [receivedAmount, setReceivedAmount] = useState(0);

  const { progress } = useRealtimeProgress({
    isActive: !!qrCodeData && paymentStatus === 'pending',
    duration: 300000 // 5 minutes
  });

  useRealtimePayment({
    txid: qrCodeData?.txid || null,
    onPaymentReceived: (amount) => {
      setPaymentStatus('paid');
      setReceivedAmount(amount);
    },
    onPaymentCancelled: () => {
      setPaymentStatus('cancelled');
    }
  });

  const handleGenerateQRCode = async (amount: number, description?: string) => {
    if (!user?.account) {
      toast.error('User account not found');
      return;
    }

    try {
      const data = await generateQRCode({
        code: user.account,
        valor: amount,
        description
      });

      setQrCodeData(data);
      setPaymentStatus('pending');
    } catch (error: any) {
      console.error('Error generating QR code:', error);
      toast.error(error.message || 'Failed to generate QR code');
    }
  };

  const handleCancel = async () => {
    if (!qrCodeData?.txid) return;

    try {
      await cancelQRCode(qrCodeData.txid);
      setPaymentStatus('cancelled');
      toast.success('QR code cancelled successfully');
    } catch (error: any) {
      console.error('Error cancelling QR code:', error);
      toast.error(error.message || 'Failed to cancel QR code');
      throw error;
    }
  };

  const handleReset = () => {
    setQrCodeData(null);
    setPaymentStatus('pending');
    setReceivedAmount(0);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          {!qrCodeData ? (
            <QRCodeForm onSubmit={handleGenerateQRCode} />
          ) : (
            <QRCodeDisplay
              qrCodeData={qrCodeData}
              onCancel={handleCancel}
              onReset={handleReset}
            />
          )}
        </div>

        {qrCodeData && (
          <QRCodeStatus
            status={{
              status: paymentStatus,
              amount: receivedAmount,
              found: true
            }}
            progress={progress}
            txid={qrCodeData.txid}
          />
        )}
      </div>
    </div>
  );
}