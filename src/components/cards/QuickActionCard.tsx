import React from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface QuickActionProps {
  icon: LucideIcon;
  title: string;
  description: string;
  to: string;
  gradient: string;
}

export default function QuickActionCard({ icon: Icon, title, description, to, gradient }: QuickActionProps) {
  return (
    <Link 
      to={to}
      className={`${gradient} p-6 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg backdrop-blur-sm bg-opacity-90 border border-white/10 group`}
    >
      <Icon size={24} className="text-white mb-3 group-hover:scale-110 transition-transform" />
      <h3 className="text-white font-semibold mb-1">{title}</h3>
      <p className="text-white/80 text-sm">{description}</p>
    </Link>
  );
}