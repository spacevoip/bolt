import { useState, useEffect } from 'react';
import { verifyQRCodePayment } from '../../services/qrCodeService';
import type { QRCodePaymentStatus } from '../../types/qrcode';
import { toast } from 'react-hot-toast';

const VERIFICATION_INTERVAL = 5000; // 5 seconds
const PROGRESS_INTERVAL = 3000; // 3 seconds

export function useQRCodeStatus(txid: string | null) {
  const [status, setStatus] = useState<QRCodePaymentStatus>({
    status: 'pending',
    amount: 0,
    found: false
  });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!txid) return;

    let statusInterval: NodeJS.Timeout;
    let progressInterval: NodeJS.Timeout;

    const checkStatus = async () => {
      try {
        const result = await verifyQRCodePayment(txid);
        
        if (result.status === 'paid') {
          setStatus(result);
          toast.success('Payment received successfully!');
          clearInterval(statusInterval);
          clearInterval(progressInterval);
          setProgress(100);
        }
      } catch (error) {
        console.error('Error checking payment status:', error);
      }
    };

    statusInterval = setInterval(checkStatus, VERIFICATION_INTERVAL);
    progressInterval = setInterval(() => {
      setProgress(prev => Math.min(prev + 10, 90));
    }, PROGRESS_INTERVAL);

    // Initial check
    checkStatus();

    return () => {
      clearInterval(statusInterval);
      clearInterval(progressInterval);
    };
  }, [txid]);

  return { status, progress };
}