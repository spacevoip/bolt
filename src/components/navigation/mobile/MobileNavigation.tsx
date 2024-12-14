import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, SendHorizontal, Receipt, QrCode, User, LogOut } from 'lucide-react';
import { cn } from '../../../utils/styles';
import { useAuthStore } from '../../../store/useAuthStore';

export default function MobileNavigation() {
  const { logout } = useAuthStore();
  const navItems = [
    { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/pix', icon: SendHorizontal, label: 'Send PIX' },
    { to: '/pix-qr', icon: QrCode, label: 'QR Code' },
    { to: '/transactions', icon: Receipt, label: 'History' },
    { to: '/profile', icon: User, label: 'Profile' }
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 z-50">
      <div className="flex items-center justify-around h-16">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => cn(
              'flex flex-col items-center justify-center space-y-1 px-3',
              isActive ? 'text-blue-600' : 'text-gray-500 hover:text-gray-900'
            )}
          >
            <Icon size={24} />
            <span className="text-xs font-medium">{label}</span>
          </NavLink>
        ))}
        <button
          onClick={logout}
          className="flex flex-col items-center justify-center space-y-1 px-3 text-red-500 hover:text-red-600"
        >
          <LogOut size={24} />
          <span className="text-xs font-medium">Sair</span>
        </button>
      </div>
    </nav>
  );
}