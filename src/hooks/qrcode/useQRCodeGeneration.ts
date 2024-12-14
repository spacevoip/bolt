import { useState } from 'react';
import { generateQRCode } from '../../services/qrCodeService';
import type { QRCodeRequest, QRCodeResponse } from '../../types/qrcode';
import { toast } from 'react-hot-toast';

interface UseQRCodeGenerationProps {
  onSuccess: (data: QRCodeResponse) => void;
}

export function useQRCodeGeneration({ onSuccess }: UseQRCodeGenerationProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generate = async (params: QRCodeRequest) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await generateQRCode(params);
      onSuccess(data);
    } catch (error: any) {
      setError(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    generate,
    isLoading,
    error
  };
}