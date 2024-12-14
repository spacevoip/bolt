import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FormInputProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon: LucideIcon;
  placeholder: string;
  required?: boolean;
  error?: string;
}

export default function FormInput({
  label,
  type,
  value,
  onChange,
  icon: Icon,
  placeholder,
  required,
  error
}: FormInputProps) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon size={20} className="text-gray-400" />
        </div>
        <input
          type={type}
          value={value}
          onChange={onChange}
          className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors
            ${error 
              ? 'border-red-300 focus:ring-red-200 focus:border-red-300' 
              : 'border-gray-200 focus:ring-blue-200 focus:border-blue-300'}`}
          placeholder={placeholder}
          required={required}
        />
      </div>
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}