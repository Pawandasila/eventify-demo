'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Clock, ShoppingCart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { QuantityStepper } from '@/components/ui/quantity-stepper';
import { PriceTag } from '@/components/ui/price-tag';
import { Button } from '@/components/ui/button';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { items, addItem, updateQuantity, openCart } = useCart();
  
  const cartItem = items.find(item => item.product.id === product.id);
  const quantity = cartItem?.quantity || 0;

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > 0 && !cartItem) {
      addItem(product);
      
      // Show success toast when adding to cart
      toast.success(
        `${product.name} added to cart!`,
        {
          description: `₹${product.price.toLocaleString()} • ${product.category}`,
          action: {
            label: "View Cart",
            onClick: () => {
              openCart();
            },
          },
        }
      );
    } else {
      updateQuantity(product.id, newQuantity);
    }
  };

  return (
    <Card className={`group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border-0 hover:border-blinkit-green/20 ${className}`}>
      <CardContent className="p-3">
        <Link href={`/product/${product.id}`} className="block">
          {/* Product Image */}
          <div className="relative aspect-square mb-3 overflow-hidden rounded-lg bg-gray-50">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
            />
            
            {/* Badges */}
            <div className="absolute top-2 left-2 flex flex-col gap-1">
              {product.discount && (
                <Badge variant="destructive" className="bg-blinkit-red text-xs">
                  {product.discount}% OFF
                </Badge>
              )}
              {product.isOrganic && (
                <Badge className="bg-green-600 text-xs">
                  Organic
                </Badge>
              )}
            </div>

            {/* Delivery Time */}
            <div className="absolute top-2 right-2">
              <Badge variant="secondary" className="bg-white/90 text-xs flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {product.deliveryTime}
              </Badge>
            </div>

            {/* Stock Status */}
            {!product.inStock && (
              <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center">
                <Badge variant="secondary" className="bg-gray-800 text-white">
                  Out of Stock
                </Badge>
              </div>
            )}
          </div>
        </Link>

        {/* Product Info */}
        <div className="space-y-2">
          <Link href={`/product/${product.id}`}>
            <h3 className="font-medium text-sm text-gray-900 line-clamp-2 group-hover:text-blinkit-green transition-colors">
              {product.name}
            </h3>
          </Link>
          
          <p className="text-xs text-gray-500">
            {product.weight} | {product.brand}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1">
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs text-gray-600">{product.rating}</span>
            </div>
            <span className="text-xs text-gray-400">({product.reviewCount})</span>
          </div>

          {/* Price and Add Button */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex-1">
              <PriceTag 
                price={product.price}
                originalPrice={product.originalPrice}
                discount={product.discount}
                className="text-sm"
              />
            </div>
            
            <div className="flex-shrink-0">
              {product.inStock ? (
                quantity > 0 ? (
                  <QuantityStepper
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="w-24"
                  />
                ) : (
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      handleQuantityChange(1);
                    }}
                    className="bg-blinkit-green hover:bg-blinkit-green/90 text-white px-3 py-1 h-8 text-sm rounded-md flex items-center gap-1"
                  >
                    <ShoppingCart className="w-3 h-3" />
                    ADD
                  </Button>
                )
              ) : (
                <div className="px-3 py-1 h-8 bg-gray-100 rounded-md flex items-center justify-center">
                  <span className="text-xs text-gray-500">Out of Stock</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
