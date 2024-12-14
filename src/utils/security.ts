// Security utility functions
export function sanitizeInput(input: string): string {
  return input.replace(/[<>'"]/g, '');
}

export function validateTransactionAmount(amount: number): boolean {
  return amount > 0 && amount <= 100000 && Number.isFinite(amount);
}

export function validatePixKey(key: string): boolean {
  // Basic validation for email, phone, or CPF format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\+?[\d\s-]{10,}$/;
  const cpfRegex = /^\d{11}$/;
  
  return emailRegex.test(key) || phoneRegex.test(key) || cpfRegex.test(key);
}

export const MAX_LOGIN_ATTEMPTS = 5;
export const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes