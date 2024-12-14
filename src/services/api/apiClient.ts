import { env } from '../../config/env';

interface RequestConfig extends RequestInit {
  timeout?: number;
}

class ApiClient {
  private baseUrl: string;
  private defaultTimeout: number;

  constructor(baseUrl: string, defaultTimeout = 30000) {
    this.baseUrl = baseUrl;
    this.defaultTimeout = defaultTimeout;
  }

  private async fetchWithTimeout(
    url: string,
    options: RequestConfig = {}
  ): Promise<Response> {
    const { timeout = this.defaultTimeout, ...fetchOptions } = options;
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        ...fetchOptions,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'X-Content-Type-Options': 'nosniff',
          ...fetchOptions.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response;
    } finally {
      clearTimeout(timeoutId);
    }
  }

  async get<T>(endpoint: string, options?: RequestConfig): Promise<T> {
    const response = await this.fetchWithTimeout(
      `${this.baseUrl}${endpoint}`,
      { ...options, method: 'GET' }
    );
    return response.json();
  }

  async post<T>(endpoint: string, data: unknown, options?: RequestConfig): Promise<T> {
    const response = await this.fetchWithTimeout(
      `${this.baseUrl}${endpoint}`,
      {
        ...options,
        method: 'POST',
        body: JSON.stringify(data),
      }
    );
    return response.json();
  }
}

export const apiClient = new ApiClient(env.api.baseUrl);