import { LayoutDashboard, SendHorizontal, Receipt, QrCode, User } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface NavItem {
  to: string;
  icon: LucideIcon;
  label: string;
}

export const navigationItems: NavItem[] = [
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