export function formatDocument(document: string): string {
  if (!document) return 'Não informado';
  
  const numbers = document.replace(/\D/g, '');
  
  if (numbers.length === 11) {
    return formatCPF(numbers);
  }
  
  if (numbers.length === 14) {
    return formatCNPJ(numbers);
  }
  
  return document;
}

export function formatCPF(cpf: string): string {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

export function formatCNPJ(cnpj: string): string {
  return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
}

export function validateDocument(document: string): boolean {
  const numbers = document.replace(/\D/g, '');
  return numbers.length === 11 || numbers.length === 14;
}