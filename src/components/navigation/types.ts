import type { LucideIcon } from 'lucide-react';

export interface NavigationItem {
  to: string;
  icon: LucideIcon;
  label: string;
}

export interface MobileNavItemProps extends NavigationItem {}