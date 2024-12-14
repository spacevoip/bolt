import React from 'react';
import { Link } from 'react-router-dom';
import { useLocale } from '../../hooks/useLocale';
import { SendHorizontal, QrCode, Receipt } from 'lucide-react';

export default function MobileQuickActions() {
  const { t } = useLocale();

  const actions = [
    {
      to: '/pix',
      icon: SendHorizontal,
      label: t('dashboard.quickActions.sendPix'),
      gradient: 'from-violet-500 to-purple-600'
    },
    {
      to: '/pix-qr',
      icon: QrCode,
      label: t('dashboard.quickActions.qrCode'),
      gradient: 'from-blue-500 to-indigo-600'
    },
    {
      to: '/transactions',
      icon: Receipt,
      label: t('dashboard.quickActions.transactions'),
      gradient: 'from-emerald-500 to-teal-600'
    }
  ];

  return (
    <div className="grid grid-cols-3 gap-3 px-4">
      {actions.map((action, index) => (
        <Link
          key={index}
          to={action.to}
          className={`bg-gradient-to-br ${action.gradient} p-4 rounded-xl flex flex-col items-center justify-center space-y-2 text-white`}
        >
          <action.icon size={24} />
          <span className="text-xs text-center font-medium">{action.label}</span>
        </Link>
      ))}
    </div>
  );
}