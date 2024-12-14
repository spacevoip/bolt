import { useState, useEffect } from 'react';
import { verifyQRCodePayment } from '../services/qrCodeService';
import type { QRCodePaymentStatus } from '../types/qrcode';
import { toast } from 'react-hot-toast';

export function useQRCodeStatus(txid: string | null) {
  const [status, setStatus] = useState<QRCodePaymentStatus>({
    status: 'pending',
    amount: 0,
    found: false
  });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!txid) return;

    let interval: NodeJS.Timeout;
    let progressInterval: NodeJS.Timeout;

    const checkStatus = async () => {
      try {
        const result = await verifyQRCodePayment(txid);
        
        if (result.status === 'paid') {
          setStatus(result);
          toast.success('Payment received successfully!');
          clearInterval(interval);
          clearInterval(progressInterval);
          setProgress(100);
        }
      } catch (error) {
        console.error('Error checking payment status:', error);
      }
    };

    // Check status every 5 seconds
    interval = setInterval(checkStatus, 5000);

    // Update progress bar
    progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) return prev;
        return prev + 10;
      });
    }, 3000);

    // Initial check
    checkStatus();

    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
    };
  }, [txid]);

  return { status, progress };
}