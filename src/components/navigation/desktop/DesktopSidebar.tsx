import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuthStore } from '../../../store/useAuthStore';
import { navigationItems } from '../config/navigationItems';
import UserProfile from './UserProfile';
import LogoutButton from '../common/LogoutButton';

export default function DesktopSidebar() {
  return (
    <div className="w-full h-full bg-white shadow-lg flex flex-col">
      <UserProfile />
      
      {/* Navigation Menu */}
      <nav className="flex-1 p-4 overflow-y-auto">
        {navigationItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
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

      <LogoutButton />
    </div>
  );
}