import { API_ENDPOINTS, createFetchOptions, handleApiResponse } from '../../../config/api';
import type { QRCodeRequest, QRCodeResponse } from '../../../types/qrcode';
import { validateQRCodeData } from '../../../utils/qrcode';

export async function generateQRCodeAPI(params: QRCodeRequest): Promise<QRCodeResponse> {
  try {
    const response = await fetch(
      API_ENDPOINTS.CREATE_PAYMENT,
      createFetchOptions('POST', {
        code: params.code,
        valor: Number(params.valor.toFixed(2)),
        ...(params.description && { description: params.description })
      })
    );

    const data = await handleApiResponse<QRCodeResponse>(response);

    if (!validateQRCodeData(data)) {
      throw new Error('Invalid QR code response from server');
    }

    return data;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Network error';
    throw new Error(`QR Code generation failed: ${errorMessage}`);
  }
}