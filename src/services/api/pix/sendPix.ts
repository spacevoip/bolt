import { API_ENDPOINTS, createFetchOptions, handleApiResponse } from '../../../config/api';
import type { PixResponse } from '../../../types/pix';

interface SendPixParams {
  pixKey: string;
  amount: number;
  code: string;
}

export async function sendPixAPI(params: SendPixParams): Promise<PixResponse> {
  try {
    const response = await fetch(
      API_ENDPOINTS.SEND_PIX,
      createFetchOptions('POST', {
        pixkey: params.pixKey,
        amount: params.amount.toFixed(2),
        code: params.code
      })
    );

    return handleApiResponse<PixResponse>(response);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to send PIX: ${error.message}`);
    }
    throw error;
  }
}