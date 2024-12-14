import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useQRCodeStatus } from '../../hooks/useQRCodeStatus';
import { QRCodeForm } from './form/QRCodeForm';
import { QRCodeDisplay } from './display/QRCodeDisplay';
import PaymentStatus from './PaymentStatus';
import { generateQRCode } from '../../services/qrCodeService';
import type { User } from '../../types/user';
import type { QRCodeResponse } from '../../types/qrcode';

interface QRCodeGeneratorProps {
  user: User | null;
  qrCodeData: QRCodeResponse | null;
  setQrCodeData: (data: QRCodeResponse | null) => void;
  timeLeft: number;
  setTimeLeft: (time: number) => void;
  onReset: () => void;
}

export default function QRCodeGenerator({
  user,
  qrCodeData,
  setQrCodeData,
  timeLeft,
  setTimeLeft,
  onReset
}: QRCodeGeneratorProps) {
  const [amount, setAmount] = useState('');
  const [formattedAmount, setFormattedAmount] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const startTimer = () => {
    setTimeLeft(600); // 10 minutes
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleGenerateQRCode = async () => {
    if (!user?.account) {
      toast.error('User account not found');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const data = await generateQRCode({
        code: user.account,
        valor: parseFloat(amount),
        description: description || undefined,
      });

      setQrCodeData(data);
      startTimer();
      toast.success('QR Code generated successfully');
    } catch (error: any) {
      console.error('Error generating QR code:', error);
      setError(error.message || 'Failed to generate QR code. Please try again.');
      toast.error(error.message || 'Failed to generate QR code');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div>
        {!qrCodeData ? (
          <QRCodeForm
            amount={amount}
            formattedAmount={formattedAmount}
            description={description}
            isLoading={isLoading}
            error={error}
            setAmount={setAmount}
            setFormattedAmount={setFormattedAmount}
            setDescription={setDescription}
            onSubmit={handleGenerateQRCode}
          />
        ) : (
          <QRCodeDisplay
            qrCodeData={qrCodeData}
            timeLeft={timeLeft}
            onReset={onReset}
          />
        )}
      </div>

      {qrCodeData && (
        <PaymentStatus qrCodeData={qrCodeData} />
      )}
    </div>
  );
}