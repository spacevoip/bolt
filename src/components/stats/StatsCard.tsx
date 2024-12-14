import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  icon: LucideIcon;
  title: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down';
}

export default function StatsCard({ icon: Icon, title, value, change, trend }: StatsCardProps) {
  return (
    <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
      <div className="flex items-center justify-between">
        <div className="p-2 bg-white/10 rounded-lg">
          <Icon size={20} className="text-white" />
        </div>
        {change && (
          <span className={`text-sm ${
            trend === 'up' ? 'text-green-400' : 'text-red-400'
          }`}>
            {change}
          </span>
        )}
      </div>
      <h3 className="mt-4 text-lg font-medium text-white">{title}</h3>
      <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
    </div>
  );
}