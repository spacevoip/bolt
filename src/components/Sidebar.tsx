import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Receipt, 
  SendHorizontal,
  QrCode, 
  User,
  LogOut,
  X,
  Eye,
  EyeOff,
  Wallet
} from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useRealtimeBalance } from '../hooks/useRealtimeBalance';

interface SidebarProps {
  onClose?: () => void;
}

export default function Sidebar({ onClose }: SidebarProps) {
  const { user, logout } = useAuthStore();
  const [showBalance, setShowBalance] = useState(false);
  useRealtimeBalance();

  const formatBalance = (balance: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(balance);
  };

  const navigationItems = [
    {
      to: "/",
      icon: LayoutDashboard,
      label: "Dashboard"
    },
    {
      to: "/transactions",
      icon: Receipt,
      label: "Transactions"
    },
    {
      to: "/pix",
      icon: SendHorizontal,
      label: "PIX Transfer"
    },
    {
      to: "/pix-qr",
      icon: QrCode,
      label: "PIX QR Code"
    },
    {
      to: "/profile",
      icon: User,
      label: "Profile"
    }
  ];

  return (
    <div className="w-full h-full bg-white shadow-lg flex flex-col">
      {/* Profile Section */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <img
              src={user?.avatar}
              alt={user?.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="overflow-hidden">
              <h2 className="font-semibold truncate">{user?.name}</h2>
              <p className="text-sm text-gray-500 truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Account Info */}
        <div className="space-y-2">
          <div className="bg-gray-50 rounded-lg p-2">
            <p className="text-sm text-gray-600">Account</p>
            <p className="font-mono font-medium text-blue-600 break-all">{user?.account}</p>
          </div>

          {/* Balance Display */}
          <div className="bg-blue-50 rounded-lg p-2">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center space-x-2">
                <Wallet size={16} className="text-blue-600" />
                <p className="text-sm text-blue-600">Available Balance</p>
              </div>
              <button
                onClick={() => setShowBalance(!showBalance)}
                className="p-1 hover:bg-blue-100 rounded-full transition-colors"
                aria-label={showBalance ? 'Hide balance' : 'Show balance'}
              >
                {showBalance ? (
                  <EyeOff size={16} className="text-blue-600" />
                ) : (
                  <Eye size={16} className="text-blue-600" />
                )}
              </button>
            </div>
            <p className="font-mono font-medium text-blue-700">
              {showBalance ? formatBalance(user?.balance || 0) : '••••••'}
            </p>
          </div>
        </div>
      </div>
      
      {/* Navigation Menu */}
      <nav className="flex-1 p-4 overflow-y-auto">
        {navigationItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center space-x-3 p-3 rounded-lg mb-1 transition-colors ${
                isActive 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`
            }
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t">
        <button
          onClick={() => {
            onClose?.();
            logout();
          }}
          className="flex items-center space-x-3 p-3 rounded-lg text-red-600 hover:bg-red-50 w-full transition-colors"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}