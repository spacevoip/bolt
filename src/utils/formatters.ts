import { format } from 'date-fns';

export function formatCNPJ(cnpj: string | null | undefined): string {
  if (!cnpj) return 'Not provided';
  return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
}

export function formatTaxRate(rate: number | null | undefined): string {
  if (!rate && rate !== 0) return 'Standard rate';
  return `${rate.toFixed(2)}%`;
}

export function formatDate(date: string | null | undefined): string {
  if (!date) return 'Not available';
  return format(new Date(date), 'dd/MM/yyyy');
}