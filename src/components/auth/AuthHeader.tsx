import React from 'react';
import Logo from '../common/Logo';

interface AuthHeaderProps {
  subtitle: string;
}

export default function AuthHeader({ subtitle }: AuthHeaderProps) {
  return (
    <div className="text-center mb-8">
      <div className="inline-block mb-2">
        <Logo size="xl" className="drop-shadow-lg" />
      </div>
      <p className="text-blue-100 text-lg">{subtitle}</p>
    </div>
  );
}