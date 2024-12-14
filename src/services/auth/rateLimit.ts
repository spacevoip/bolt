import { securityConfig } from '../../config/security.config';

interface RateLimitEntry {
  count: number;
  firstAttempt: number;
}

class RateLimiter {
  private attempts = new Map<string, RateLimitEntry>();
  private readonly window = securityConfig.rateLimit.window;
  private readonly maxRequests = securityConfig.rateLimit.maxRequests;

  isRateLimited(key: string): boolean {
    const entry = this.attempts.get(key);
    const now = Date.now();

    if (!entry) {
      this.attempts.set(key, { count: 1, firstAttempt: now });
      return false;
    }

    if (now - entry.firstAttempt > this.window) {
      this.attempts.set(key, { count: 1, firstAttempt: now });
      return false;
    }

    if (entry.count >= this.maxRequests) {
      return true;
    }

    entry.count++;
    return false;
  }

  clearEntry(key: string): void {
    this.attempts.delete(key);
  }

  getRemainingAttempts(key: string): number {
    const entry = this.attempts.get(key);
    if (!entry) return this.maxRequests;
    return Math.max(0, this.maxRequests - entry.count);
  }
}

export const rateLimiter = new RateLimiter();