export class AuthError extends Error {
  constructor(
    message: string,
    public code: string,
    public status: number = 400
  ) {
    super(message);
    this.name = 'AuthError';
  }

  static invalidCredentials() {
    return new AuthError(
      'Invalid email or password',
      'auth/invalid-credentials',
      401
    );
  }

  static emailInUse() {
    return new AuthError(
      'Email already registered',
      'auth/email-in-use',
      409
    );
  }

  static accountLocked() {
    return new AuthError(
      'Account locked due to too many failed attempts',
      'auth/account-locked',
      403
    );
  }

  static unauthorized() {
    return new AuthError(
      'Unauthorized access',
      'auth/unauthorized',
      401
    );
  }

  static sessionExpired() {
    return new AuthError(
      'Session expired',
      'auth/session-expired',
      401
    );
  }
}