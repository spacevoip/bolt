export interface User {
  id: string;
  name: string;
  email: string;
  balance: number;
  avatar?: string;
  account: string;
  cnpj?: string;
  tax_rate?: number;
  manager?: string;
  created_at: string;
  updated_at?: string;
  last_login?: string;
  auth_token?: string;
  pin?: string;
  security_level?: string;
  account_type?: string;
  failed_attempts?: number;
  is_locked?: boolean;
}

export interface ProfileUpdateData {
  name?: string;
  avatar?: string;
  email?: string;
}