export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
}

export function parseCurrency(value: string): number {
  return Number(value.replace(/\D/g, '')) / 100;
}

export function calculateTax(amount: number): number {
  if (amount <= 25) {
    return amount <= 0 ? 0 : 0.50;
  }
  return amount * 0.028; // 2.8%
}

export function validateAmount(amount: number): string {
  if (amount < 5) {
    return 'O valor mínimo é R$ 5,00';
  }
  if (amount > 100000) {
    return 'O valor máximo é R$ 100.000,00';
  }
  return '';
}

export function getInsufficientBalanceMessage(requiredAmount: number): string {
  return `Saldo Insuficiente! Você precisa de ${formatCurrency(requiredAmount)}`;
}