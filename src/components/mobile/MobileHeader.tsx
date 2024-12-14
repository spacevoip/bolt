import React from 'react';
import { Menu } from 'lucide-react';
import Logo from '../common/Logo';

interface MobileHeaderProps {
  userName: string;
  onMenuClick: () => void;
}

export default function MobileHeader({ userName, onMenuClick }: MobileHeaderProps) {
  const firstName = userName.split(' ')[0];

  return (
    <div className="px-4 h-16 flex items-center justify-between bg-white">
      <button
        onClick={onMenuClick}
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        aria-label="Open menu"
      >
        <Menu size={24} />
      </button>
      <Logo size="sm" />
      <div className="w-10" /> {/* Spacer for alignment */}
    </div>
  );
}