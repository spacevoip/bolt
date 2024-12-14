import { generateQRCodeAPI } from './api/qrcode';
import { verifyQRCodePaymentDB, cancelQRCodeDB } from './database/qrcode';
import type { QRCodeRequest, QRCodeResponse, QRCodePaymentStatus } from '../types/qrcode';
import { toast } from 'react-hot-toast';

export async function generateQRCode(params: QRCodeRequest): Promise<QRCodeResponse> {
  try {
    const data = await generateQRCodeAPI(params);
    return data;
  } catch (error: any) {
    const errorMessage = error.message || 'Failed to generate QR code';
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
}

export async function verifyQRCodePayment(txid: string): Promise<QRCodePaymentStatus> {
  if (!txid) {
    return { status: 'pending', amount: 0, found: false };
  }
  return verifyQRCodePaymentDB(txid);
}

export async function cancelQRCode(txid: string): Promise<void> {
  try {
    await cancelQRCodeDB(txid);
    toast.success('QR code cancelled successfully');
  } catch (error) {
    toast.error('Failed to cancel QR code');
    throw error;
  }
}