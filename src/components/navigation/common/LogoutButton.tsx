import React from 'react';
import { LogOut } from 'lucide-react';
import { useAuthStore } from '../../../store/useAuthStore';

export default function LogoutButton() {
  const { logout } = useAuthStore();

  return (
    <div className="p-4 border-t">
      <button
        onClick={logout}
        className="flex items-center space-x-3 p-3 rounded-lg text-red-600 hover:bg-red-50 w-full transition-colors"
      >
        <LogOut size={20} />
        <span>Logout</span>
      </button>
    </div>
  );
}