import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { Mail, Lock, User, AlertCircle } from 'lucide-react';
import { validatePassword } from '../../utils/validation';
import FormInput from './FormInput';

export default function RegisterForm() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { register } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate password
    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    try {
      await register(name, email, password);
      navigate('/');
    } catch (error: any) {
      console.error('Registration failed:', error);
      if (error.message?.includes('already registered')) {
        setError('Este e-mail já está registrado. Por favor, faça login.');
      } else {
        setError('Falha no registro. Por favor, tente novamente.');
      }
    }
  };

  return (
    <div className="w-full">
      {error && (
        <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 flex items-start space-x-2">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <span className="text-sm text-red-700">{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <FormInput
          label="Nome Completo"
          type="text"
          value={name}
          onChange={setName}
          icon={User}
          placeholder="Seu nome completo"
          required
        />

        <FormInput
          label="E-mail"
          type="email"
          value={email}
          onChange={setEmail}
          icon={Mail}
          placeholder="seu@email.com"
          required
        />

        <FormInput
          label="Senha"
          type="password"
          value={password}
          onChange={setPassword}
          icon={Lock}
          placeholder="••••••••"
          required
          minLength={8}
        />

        <FormInput
          label="Confirmar Senha"
          type="password"
          value={confirmPassword}
          onChange={setConfirmPassword}
          icon={Lock}
          placeholder="••••••••"
          required
          minLength={8}
        />

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-150"
        >
          Criar Conta
        </button>

        <p className="text-center text-sm text-gray-600">
          Já tem uma conta?{' '}
          <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
            Entrar
          </Link>
        </p>
      </form>
    </div>
  );
}