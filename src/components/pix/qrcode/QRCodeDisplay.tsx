import React from 'react';
import { Timer, Copy, Check, XCircle } from 'lucide-react';
import type { QRCodeResponse } from '../../../types/qrcode';
import { useCountdown } from '../../../hooks/useCountdown';
import { toast } from 'react-hot-toast';

interface QRCodeDisplayProps {
  qrCodeData: QRCodeResponse;
  onExpire: () => void;
  onCancel: () => Promise<void>;
  onReset: () => void;
}

export default function QRCodeDisplay({ 
  qrCodeData, 
  onExpire,
  onCancel,
  onReset
}: QRCodeDisplayProps) {
  const { minutes, seconds } = useCountdown({ initialMinutes: 5, onExpire });
  const [copied, setCopied] = React.useState(false);
  const [isCancelling, setIsCancelling] = React.useState(false);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(qrCodeData.QRCodeText);
      setCopied(true);
      toast.success('PIX code copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy PIX code');
    }
  };

  const handleCancel = async () => {
    setIsCancelling(true);
    try {
      await onCancel();
      // Wait for 2 seconds before resetting
      setTimeout(() => {
        onReset();
      }, 2000);
    } catch (error) {
      setIsCancelling(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900">QR Code Payment</h2>
        <p className="text-sm text-gray-500">Scan this QR code to make a payment</p>
      </div>

      <div className="p-6 space-y-6">
        {/* QR Code Image */}
        <div className="flex flex-col items-center space-y-4">
          <div className="bg-gray-50 p-4 rounded-xl">
            <img
              src={qrCodeData.QRCodeLink}
              alt="Payment QR Code"
              className="w-64 h-64"
            />
          </div>

          {/* Timer */}
          <div className="flex items-center space-x-2 text-gray-500">
            <Timer size={16} />
            <span>
              Expires in {String(minutes).padStart(2, '0')}:
              {String(seconds).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleCopyCode}
            className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            {copied ? (
              <>
                <Check size={20} />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy size={20} />
                <span>Copy PIX Code</span>
              </>
            )}
          </button>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleCancel}
              disabled={isCancelling}
              className={`flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-colors ${
                isCancelling
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-red-50 text-red-600 hover:bg-red-100'
              }`}
            >
              <XCircle size={20} />
              <span>{isCancelling ? 'Cancelling...' : 'Cancel'}</span>
            </button>

            <button
              onClick={onReset}
              disabled={isCancelling}
              className={`py-3 px-4 rounded-lg font-medium transition-colors ${
                isCancelling
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              New QR Code
            </button>
          </div>
        </div>

        <p className="text-xs text-center text-gray-500">
          Transaction ID: {qrCodeData.txid}
        </p>
      </div>
    </div>
  );
}