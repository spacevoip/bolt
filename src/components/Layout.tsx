import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import DesktopSidebar from './navigation/desktop/DesktopSidebar';
import MobileNavigation from './navigation/mobile/MobileNavigation';

export default function Layout() {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Desktop Sidebar - Hidden on mobile */}
      <div className="hidden lg:block lg:w-[280px]">
        <DesktopSidebar />
      </div>

      {/* Main content */}
      <main className="flex-1 overflow-x-hidden px-4 py-4 lg:py-8 lg:px-8 pb-20 lg:pb-8">
        <div className="max-w-[2000px] mx-auto">
          <Outlet />
        </div>
      </main>

      {/* Mobile Navigation */}
      <MobileNavigation />
    </div>
  );
}