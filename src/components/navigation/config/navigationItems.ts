import { LayoutDashboard, SendHorizontal, Receipt, QrCode, User, LogOut } from 'lucide-react';
import type { NavigationItem } from '../types';

export const navigationItems: NavigationItem[] = [
  {
    to: '/',
    icon: LayoutDashboard,
    label: 'Dashboard'
  },
  {
    to: '/pix',
    icon: SendHorizontal,
    label: 'Send PIX'
  },
  {
    to: '/transactions',
    icon: Receipt,
    label: 'Transactions'
  },
  {
    to: '/pix-qr',
    icon: QrCode,
    label: 'QR Code'
  },
  {
    to: '/profile',
    icon: User,
    label: 'Profile'
  }
];