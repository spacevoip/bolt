export const validatePassword = (password: string): string => {
  if (password.length < 8) {
    return 'A senha deve ter pelo menos 8 caracteres';
  }
  if (!/[A-Z]/.test(password)) {
    return 'A senha deve conter pelo menos uma letra maiúscula';
  }
  if (!/[a-z]/.test(password)) {
    return 'A senha deve conter pelo menos uma letra minúscula';
  }
  if (!/[0-9]/.test(password)) {
    return 'A senha deve conter pelo menos um número';
  }
  if (!/[!@#$%^&*]/.test(password)) {
    return 'A senha deve conter pelo menos um caractere especial (!@#$%^&*)';
  }
  return '';
};

export const validatePin = (pin: string): string => {
  if (!/^\d{4}$/.test(pin)) {
    return 'O PIN deve conter exatamente 4 dígitos';
  }
  return '';
};

export const validateAmount = (amount: number): string => {
  if (amount < 5) {
    return 'O valor mínimo é R$ 5,00';
  }
  if (amount > 100000) {
    return 'O valor máximo é R$ 100.000,00';
  }
  return '';
};

export const validatePixKey = (key: string): string => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\+?[\d\s-]{10,}$/;
  const cpfRegex = /^\d{11}$/;
  const cnpjRegex = /^\d{14}$/;
  
  if (!key.trim()) {
    return 'A chave PIX é obrigatória';
  }
  
  if (!emailRegex.test(key) && 
      !phoneRegex.test(key) && 
      !cpfRegex.test(key) && 
      !cnpjRegex.test(key)) {
    return 'Formato de chave PIX inválido';
  }
  
  return '';
};