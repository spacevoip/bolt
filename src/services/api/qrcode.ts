import { API_ENDPOINTS } from '../../config/api';
import type { QRCodeRequest, QRCodeResponse } from '../../types/qrcode';

export async function generateQRCodeAPI(params: QRCodeRequest): Promise<QRCodeResponse> {
  const response = await fetch(API_ENDPOINTS.CREATE_PAYMENT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      ...params,
      valor: Number(params.valor.toFixed(2))
    })
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `Failed to generate QR code (${response.status})`);
  }

  const data = await response.json();
  return data;
}