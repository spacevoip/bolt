class RateLimiter {
  private requests: Map<string, number[]>;
  private windowMs: number;
  private maxRequests: number;

  constructor(windowMs = 60000, maxRequests = 100) {
    this.requests = new Map();
    this.windowMs = windowMs;
    this.maxRequests = maxRequests;
  }

  isRateLimited(key: string): boolean {
    const now = Date.now();
    const timestamps = this.requests.get(key) || [];
    
    // Remove old timestamps
    const validTimestamps = timestamps.filter(
      timestamp => now - timestamp < this.windowMs
    );
    
    if (validTimestamps.length >= this.maxRequests) {
      return true;
    }
    
    validTimestamps.push(now);
    this.requests.set(key, validTimestamps);
    return false;
  }

  clearExpired(): void {
    const now = Date.now();
    for (const [key, timestamps] of this.requests.entries()) {
      const validTimestamps = timestamps.filter(
        timestamp => now - timestamp < this.windowMs
      );
      if (validTimestamps.length === 0) {
        this.requests.delete(key);
      } else {
        this.requests.set(key, validTimestamps);
      }
    }
  }
}

export const rateLimiter = new RateLimiter();

// Clean up expired entries every minute
setInterval(() => rateLimiter.clearExpired(), 60000);