import React from 'react';
import { LogOut } from 'lucide-react';
import { useAuthStore } from '../../../store/useAuthStore';

export default function MobileLogoutButton() {
  const { logout } = useAuthStore();

  return (
    <button
      onClick={logout}
      className="flex flex-col items-center justify-center space-y-1 text-red-600"
      aria-label="Logout"
    >
      <LogOut size={24} />
      <span className="text-xs font-medium">Logout</span>
    </button>
  );
}