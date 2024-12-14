import React, { ReactNode } from 'react';
import AuthHeader from './AuthHeader';
import AuthFooter from './AuthFooter';

interface AuthLayoutProps {
  subtitle: string;
  children: ReactNode;
}

export default function AuthLayout({ subtitle, children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <AuthHeader subtitle={subtitle} />
        
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 backdrop-blur-lg bg-opacity-95">
          {children}
        </div>

        <AuthFooter />
      </div>
    </div>
  );
}