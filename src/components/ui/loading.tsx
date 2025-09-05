import React from 'react';
import { cn } from '@/lib/utils';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Spinner({ size = 'md', className }: SpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  return (
    <div
      className={cn(
        'animate-spin rounded-full border-2 border-gray-200 border-t-blinkit-green',
        sizeClasses[size],
        className
      )}
    />
  );
}

interface LoadingProps {
  text?: string;
  className?: string;
}

export function Loading({ text = 'Loading...', className }: LoadingProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-12', className)}>
      <Spinner size="lg" className="mb-4" />
      <p className="text-gray-600 text-sm animate-pulse">{text}</p>
    </div>
  );
}
