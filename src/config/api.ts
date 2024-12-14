import { env } from './env';

// API Base URLs with environment variables
export const API_URL = env.api.baseUrl;
export const API_URL_PIX = env.api.pixUrl;

// Common headers with security best practices
const commonHeaders = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};
// API endpoints
export const API_ENDPOINTS = {
  CREATE_PAYMENT: `${API_URL}/criar-pagamento`,
  CHECK_STATUS: `${API_URL}/status`,
  SEND_PIX: `${API_URL_PIX}/create_cashout`,
} as const;

// Helper function to create fetch options with timeout
export function createFetchOptions(method: string, body?: unknown): RequestInit {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), env.api.timeout);

return {
  method,
  headers: {
    ...commonHeaders,
  },
  mode: 'cors' as const,
  signal: controller.signal,
  ...(body && { body: JSON.stringify(body) }),
  finally: () => clearTimeout(timeoutId),
};
}

// Helper function to handle API responses with error handling
export async function handleApiResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ 
      message: 'Network response was not ok',
      status: response.status,
    }));
    
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }

  const contentType = response.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    throw new Error('Invalid response format');
  }

  return response.json();
}