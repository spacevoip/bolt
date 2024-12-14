import React from 'react';
import MobileNavItem from './MobileNavItem';
import { navigationItems } from './config';

export default function MobileNavigation() {
  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 z-50">
      <nav className="flex items-center justify-around h-16 px-4">
        {navigationItems.map((item) => (
          <MobileNavItem
            key={item.to}
            to={item.to}
            icon={item.icon}
            label={item.label}
          />
        ))}
      </nav>
    </div>
  );
}