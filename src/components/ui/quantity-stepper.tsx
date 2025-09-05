import React from 'react';
import { cn } from '@/lib/utils';

interface QuantityStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  className?: string;
}

export function QuantityStepper({ 
  value, 
  onChange, 
  min = 0, 
  max = 99, 
  className 
}: QuantityStepperProps) {
  const handleDecrease = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleIncrease = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  if (value === 0) {
    return (
      <button
        onClick={handleIncrease}
        className={cn(
          "flex items-center justify-center w-20 h-8 bg-blinkit-green hover:bg-blinkit-green-dark text-white text-sm font-medium rounded-md transition-colors duration-200",
          className
        )}
      >
        ADD
      </button>
    );
  }

  return (
    <div className={cn("flex items-center border border-blinkit-green rounded-md", className)}>
      <button
        onClick={handleDecrease}
        className="flex items-center justify-center w-8 h-8 text-blinkit-green hover:bg-blinkit-green hover:text-white transition-colors duration-200 rounded-l-md"
        disabled={value <= min}
      >
        −
      </button>
      <span className="flex items-center justify-center min-w-8 h-8 px-2 bg-white text-blinkit-green font-medium text-sm">
        {value}
      </span>
      <button
        onClick={handleIncrease}
        className="flex items-center justify-center w-8 h-8 text-blinkit-green hover:bg-blinkit-green hover:text-white transition-colors duration-200 rounded-r-md"
        disabled={value >= max}
      >
        +
      </button>
    </div>
  );
}
