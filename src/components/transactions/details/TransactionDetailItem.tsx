import React from 'react';
import { formatDocument } from '../../../utils/document';

interface TransactionDetailItemProps {
  label: string;
  value: string | number;
  type?: 'document' | 'default';
}

export default function TransactionDetailItem({ 
  label, 
  value, 
  type = 'default' 
}: TransactionDetailItemProps) {
  const displayValue = type === 'document' 
    ? (value ? formatDocument(value.toString()) : 'Not provided')
    : value;

  return (
    <div className="flex justify-between items-start">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-sm font-medium text-gray-900 text-right">{displayValue}</span>
    </div>
  );
}