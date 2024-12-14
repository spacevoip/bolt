import { API_ENDPOINTS, createFetchOptions, handleApiResponse } from '../../../config/api';

interface VerifyResponse {
  status: string;
}

export async function verifyQRCodeAPI(txid: string): Promise<VerifyResponse> {
  try {
    const response = await fetch(
      `${API_ENDPOINTS.CHECK_STATUS}/${txid}`,
      createFetchOptions('GET')
    );

    return handleApiResponse<VerifyResponse>(response);
  } catch (error) {
    console.error('QR code verification error:', error);
    return { status: 'pending' };
  }
}