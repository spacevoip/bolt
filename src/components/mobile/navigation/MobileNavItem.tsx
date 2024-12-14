import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '../../../utils/styles';
import type { MobileNavItemProps } from './types';

export default function MobileNavItem({ to, icon: Icon, label }: MobileNavItemProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => cn(
        'flex flex-col items-center justify-center space-y-1 transition-colors',
        isActive ? 'text-blue-600' : 'text-gray-500 hover:text-gray-900'
      )}
    >
      <Icon size={24} className="transition-colors" />
      <span className="text-xs font-medium">{label}</span>
    </NavLink>
  );
}