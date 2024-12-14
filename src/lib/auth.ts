import { supabase } from './supabase';
import type { User } from '../types/user';
import { generateAccountNumber } from '../utils/account';
import { cryptoService } from '../services/cryptoService';

export async function loginUser(email: string, password: string): Promise<User> {
  // Busca o usuário pelo email
  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (userError || !userData) {
    throw { code: 'invalid_credentials' };
  }

  // Verifica a senha
  const isPasswordValid = await cryptoService.verifyPassword(password, userData.password);
  if (!isPasswordValid) {
    throw { code: 'invalid_credentials' };
  }

  // Busca o saldo
  const { data: balanceData, error: balanceError } = await supabase
    .from('saldo')
    .select('saldo')
    .eq('account', userData.account)
    .single();

  if (balanceError) {
    console.error('Error fetching balance:', balanceError);
    throw balanceError;
  }

  return {
    id: userData.id,
    name: userData.name,
    email: userData.email,
    balance: balanceData?.saldo || 0,
    avatar: userData.avatar_url,
    account: userData.account,
  };
}

export async function registerUser(name: string, email: string, password: string): Promise<void> {
  // Verifica se o email já existe
  const { data: existingUser } = await supabase
    .from('users')
    .select('id')
    .eq('email', email)
    .single();

  if (existingUser) {
    throw new Error('Email already registered');
  }

  // Gera o hash da senha
  const hashedPassword = await cryptoService.hashPassword(password);

  // Gera o número da conta
  const account = generateAccountNumber();

  // Cria o usuário
  const { error: createError } = await supabase
    .from('users')
    .insert({
      name,
      email,
      password: hashedPassword,
      account,
      avatar_url: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`,
    });

  if (createError) {
    console.error('Registration error:', createError);
    throw new Error('Failed to create user account');
  }

  // Inicializa o saldo
  const { error: balanceError } = await supabase
    .from('saldo')
    .insert({
      account,
      saldo: 0,
    });

  if (balanceError) {
    console.error('Balance initialization error:', balanceError);
    throw new Error('Failed to initialize account balance');
  }
}

export async function updateUserProfile(userId: string, data: Partial<User>): Promise<void> {
  const { error } = await supabase
    .from('users')
    .update({
      name: data.name,
      avatar_url: data.avatar,
    })
    .eq('id', userId);

  if (error) throw error;
}

export async function changeUserPassword(userId: string, oldPassword: string, newPassword: string): Promise<void> {
  // Busca o usuário
  const { data: user, error: userError } = await supabase
    .from('users')
    .select('password')
    .eq('id', userId)
    .single();

  if (userError || !user) {
    throw new Error('User not found');
  }

  // Verifica a senha antiga
  const isOldPasswordValid = await cryptoService.verifyPassword(oldPassword, user.password);
  if (!isOldPasswordValid) {
    throw new Error('Invalid old password');
  }

  // Gera o hash da nova senha
  const hashedPassword = await cryptoService.hashPassword(newPassword);

  // Atualiza a senha
  const { error: updateError } = await supabase
    .from('users')
    .update({ password: hashedPassword })
    .eq('id', userId);

  if (updateError) {
    throw new Error('Failed to update password');
  }
}