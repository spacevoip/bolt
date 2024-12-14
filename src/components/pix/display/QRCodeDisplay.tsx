import React, { useState } from 'react';
import { Copy, Check, Timer, RefreshCw } from 'lucide-react';
import { toast } from 'react-hot-toast';
import type { QRCodeResponse } from '../../../types/qrcode';
import { formatTime } from '../../../utils/time';

interface QRCodeDisplayProps {
  qrCodeData: QRCodeResponse;
  timeLeft: number;
  onReset: () => void;
}

export function QRCodeDisplay({ qrCodeData, timeLeft, onReset }: QRCodeDisplayProps) {
  const [copied, setCopied] = useState(false);

  const copyQRCode = async () => {
    if (!qrCodeData?.QRCodeText) return;
    
    try {
      await navigator.clipboard.writeText(qrCodeData.QRCodeText);
      setCopied(true);
      toast.success('PIX code copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy PIX code');
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-6 rounded-xl">
        <div className="flex flex-col items-center justify-center space-y-4">
          {timeLeft > 0 ? (
            <>
              <div className="bg-white p-4 rounded-lg shadow-inner">
                <img
                  src={qrCodeData.QRCodeLink}
                  alt="PIX QR Code"
                  className="w-64 h-64"
                />
              </div>
              <div className="flex items-center space-x-2 text-gray-500">
                <Timer size={16} />
                <span>Expires in {formatTime(timeLeft)}</span>
              </div>
            </>
          ) : (
            <div className="w-64 h-64 bg-gray-100 rounded-lg flex items-center justify-center">
              <p className="text-gray-500 text-center">QR Code expired</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={copyQRCode}
          disabled={timeLeft === 0}
          className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-lg font-medium transition-all ${
            timeLeft === 0
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg'
          }`}
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

        <button
          onClick={onReset}
          className="flex items-center justify-center space-x-2 py-3 px-6 rounded-lg font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
        >
          <RefreshCw size={20} />
          <span>Generate New QR Code</span>
        </button>
      </div>
    </div>
  );
}