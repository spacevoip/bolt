import React from 'react';
import Logo from '../../common/Logo';

interface MobileHeaderProps {
  userName: string;
}

export default function MobileHeader({ userName }: MobileHeaderProps) {
  return (
    <div className="px-4 h-16 flex items-center justify-center bg-white">
      <Logo size="sm" />
    </div>
  );
}