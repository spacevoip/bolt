import React from 'react';

export default function AuthFooter() {
  return (
    <p className="text-center text-sm text-blue-100 mt-8">
      © {new Date().getFullYear()} PixFlow. Todos os direitos reservados.
    </p>
  );
}