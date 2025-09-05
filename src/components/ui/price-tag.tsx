import React from 'react';
import { cn } from '@/lib/utils';

interface PriceTagProps {
  price: number;
  originalPrice?: number;
  discount?: number;
  className?: string;
}

export function PriceTag({ price, originalPrice, discount, className }: PriceTagProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className="text-lg font-bold text-gray-900">₹{price}</span>
      {originalPrice && originalPrice > price && (
        <>
          <span className="text-sm text-gray-500 line-through">₹{originalPrice}</span>
          {discount && (
            <span className="bg-blinkit-yellow text-blinkit-gray-900 text-xs font-medium px-2 py-1 rounded">
              {discount}% OFF
            </span>
          )}
        </>
      )}
    </div>
  );
}
