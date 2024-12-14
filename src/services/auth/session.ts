import { securityConfig } from '../../config/security.config';

class SessionManager {
  private readonly storageKey = 'auth_session';
  private readonly expirationKey = 'auth_expiration';

  constructor(private readonly timeout = securityConfig.auth.sessionTimeout) {}

  setSession(token: string): void {
    const expiration = Date.now() + this.timeout;
    localStorage.setItem(this.storageKey, token);
    localStorage.setItem(this.expirationKey, expiration.toString());
  }

  getSession(): string | null {
    const token = localStorage.getItem(this.storageKey);
    const expiration = localStorage.getItem(this.expirationKey);

    if (!token || !expiration) {
      return null;
    }

    if (Date.now() > parseInt(expiration, 10)) {
      this.clearSession();
      return null;
    }

    return token;
  }

  clearSession(): void {
    localStorage.removeItem(this.storageKey);
    localStorage.removeItem(this.expirationKey);
  }

  refreshSession(): void {
    const token = this.getSession();
    if (token) {
      this.setSession(token);
    }
  }

  isAuthenticated(): boolean {
    return this.getSession() !== null;
  }
}

export const sessionManager = new SessionManager();