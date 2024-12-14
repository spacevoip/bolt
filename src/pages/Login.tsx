import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { Mail, Lock, AlertCircle } from 'lucide-react';
import { useLocale } from '../hooks/useLocale';
import AuthLayout from '../components/auth/AuthLayout';
import FormInput from '../components/auth/FormInput';

export default function Login() {
  const { t } = useLocale();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      await login(email, password);
    } catch (error: any) {
      console.error('Login failed:', error);
      if (error.code === 'invalid_credentials') {
        setError('E-mail ou senha inválidos.');
      } else {
        setError('Falha no login. Por favor, tente novamente.');
      }
    }
  };

  return (
    <AuthLayout subtitle="Sistema Bancário Digital">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white/90 backdrop-blur-lg shadow-xl rounded-2xl p-8">
          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 flex items-start space-x-2">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-red-700">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <FormInput
              label="E-mail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={Mail}
              placeholder="seu@email.com"
              required
            />

            <FormInput
              label="Senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={Lock}
              placeholder="••••••••"
              required
            />

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3.5 rounded-xl font-medium 
                hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 
                focus:ring-offset-2 transition-all duration-150 transform hover:scale-[1.02]"
            >
              Entrar
            </button>

            <p className="text-center text-sm text-gray-600">
              Não tem uma conta?{' '}
              <Link 
                to="/register" 
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                Criar conta
              </Link>
            </p>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
}