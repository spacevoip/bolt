import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function Logo({ className = '', size = 'md' }: LogoProps) {
  // Calculate height based on aspect ratio 300:173
  const sizes = {
    sm: 'w-32 h-[18.4px]',
    md: 'w-48 h-[27.7px]',
    lg: 'w-64 h-[36.9px]',
    xl: 'w-[300px] h-[173px]'
  };

  return (
    <img
      src="https://i.imgur.com/WUknFHc.png"
      alt="PixFlow Logo"
      className={`${sizes[size]} object-contain ${className}`}
    />
  );
}