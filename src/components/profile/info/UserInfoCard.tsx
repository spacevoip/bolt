import React from 'react';
import { LucideIcon } from 'lucide-react';

interface UserInfoCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number | boolean | null;
  type?: 'default' | 'date' | 'currency' | 'percent' | 'status';
}

export default function UserInfoCard({ icon: Icon, label, value, type = 'default' }: UserInfoCardProps) {
  const formatValue = () => {
    if (value === null || value === undefined) return 'Not provided';
    
    switch (type) {
      case 'date':
        return new Date(value.toString()).toLocaleDateString('pt-BR');
      case 'currency':
        return new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(Number(value));
      case 'percent':
        return new Intl.NumberFormat('pt-BR', {
          style: 'percent',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }).format(Number(value) / 100);
      case 'status':
        return Boolean(value) ? 'Active' : 'Inactive';
      default:
        return value.toString();
    }
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg space-y-2">
      <div className="flex items-center space-x-2 text-gray-500">
        <Icon className="w-5 h-5" />
        <span className="text-sm">{label}</span>
      </div>
      <p className="font-medium text-gray-900">{formatValue()}</p>
    </div>
  );
}