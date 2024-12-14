export function generateAccountNumber(): string {
  const randomDigits = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
  return `FXPAY${randomDigits}`;
}