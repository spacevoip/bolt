import { useState, useEffect } from 'react';
import { checkPaymentStatus } from '../services/statusService';
import { verifyQRCodePayment } from '../services/qrCodeService';
import { toast } from 'react-hot-toast';

export function usePaymentStatus(txid: string | null) {
  const [status, setStatus] = useState<'pending' | 'paid' | 'cancelled'>('pending');
  const [error, setError] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (txid) {
      const checkStatus = async () => {
        try {
          setIsChecking(true);
          
          // Check both pending status and pagamentos_recebidos table
          const [pendingStatus, isReceived] = await Promise.all([
            checkPaymentStatus(txid),
            verifyQRCodePayment(txid)
          ]);
          
          if (isReceived || pendingStatus === 'pay') {
            setStatus('paid');
            clearInterval(interval);
            toast.success('Payment received successfully!');
          } else if (pendingStatus === 'cancelled') {
            setStatus('cancelled');
            clearInterval(interval);
          } else {
            setStatus('pending');
          }
        } catch (err) {
          setError('Failed to check payment status');
          clearInterval(interval);
        } finally {
          setIsChecking(false);
        }
      };

      // Initial check
      checkStatus();

      // Set up interval for periodic checks
      interval = setInterval(checkStatus, 5000);

      // Cleanup function
      return () => {
        if (interval) clearInterval(interval);
      };
    }
  }, [txid]);

  return { status, error, isChecking };
}