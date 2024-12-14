import React from 'react';
import UserInfoCard from './UserInfoCard';
import TaxRateCard from './cards/TaxRateCard';
import { 
  User, 
  Mail, 
  Building2, 
  CreditCard,
  Calendar,
  Lock,
  UserCheck
} from 'lucide-react';
import type { User as UserType } from '../../../types/user';

interface UserInfoSectionProps {
  user: UserType;
}

export default function UserInfoSection({ user }: UserInfoSectionProps) {
  const infoCards = [
    { icon: User, label: 'Full Name', value: user.name },
    { icon: Mail, label: 'Email', value: user.email },
    { icon: CreditCard, label: 'Account Number', value: user.account },
    { icon: Building2, label: 'CNPJ', value: user.cnpj || 'Not provided' },
    { icon: Lock, label: 'PIN', value: '••••' },
    { icon: UserCheck, label: 'Account Status', value: !user.is_locked, type: 'status' as const },
    { icon: Calendar, label: 'Member Since', value: user.created_at, type: 'date' as const }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Account Information</h3>
        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
          {user.account_type || 'Standard'}
        </span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {infoCards.map((card, index) => (
          <UserInfoCard
            key={index}
            icon={card.icon}
            label={card.label}
            value={card.value}
            type={card.type}
          />
        ))}
        <TaxRateCard accountNumber={user.account} />
      </div>
    </div>
  );
}