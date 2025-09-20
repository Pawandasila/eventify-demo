"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Clock, ShoppingCart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { QuantityStepper } from "@/components/ui/quantity-stepper";
import { PriceTag } from "@/components/ui/price-tag";
import { Button } from "@/components/ui/button";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { items, addItem, updateQuantity, openCart } = useCart();

  const cartItem = items.find((item) => item.product.id === product.id);
  const quantity = cartItem?.quantity || 0;

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > 0 && !cartItem) {
      addItem(product);

      // Show success toast when adding to cart
      toast.success(`${product.name} added to cart!`, {
        description: `₹${product.price.toLocaleString()} • ${product.category}`,
        action: {
          label: "View Cart",
          onClick: () => {
            openCart();
          },
        },
      });
    } else {
      updateQuantity(product.id, newQuantity);
    }
  };

  return (
    <Card
      className={`group hover:shadow-lg transition-all duration-200 cursor-pointer border border-gray-100 hover:border-blinkit-green/30 ${className}`}
    >
      <CardContent className="p-2">
        <Link href={`/product/${product.id}`} className="block">
          <div className="relative aspect-square mb-2 overflow-hidden rounded-md ">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-200"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
            />

            {/* Discount Badge */}
            {product.discount && (
              <div className="absolute top-1 left-1">
                <Badge
                  variant="destructive"
                  className="bg-red-500 text-white text-xs px-1 py-0 h-4 text-[10px]"
                >
                  {product.discount}% OFF
                </Badge>
              </div>
            )}

            {/* Delivery Time */}
            <div className="absolute top-1 right-1">
              <Badge
                variant="secondary"
                className="bg-gray-800 text-white text-xs flex items-center gap-1 px-1 py-0 h-4"
              >
                <Clock className="w-2 h-2" />
                <span className="text-[10px]">{product.deliveryTime}</span>
              </Badge>
            </div>

            {/* Stock Status */}
            {!product.inStock && (
              <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center">
                <Badge
                  variant="secondary"
                  className="bg-gray-800 text-white text-xs"
                >
                  Out of Stock
                </Badge>
              </div>
            )}
          </div>
        </Link>

        {/* Product Info */}
        <div className="space-y-1">
          <Link href={`/product/${product.id}`}>
            <h3 className="font-medium text-xs sm:text-sm md:text-base text-gray-900 line-clamp-2 group-hover:text-blinkit-green transition-colors leading-tight">
              {product.name}
            </h3>
          </Link>

          <p className="text-[10px] sm:text-xs text-gray-500">
            {product.weight} | {product.brand}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1">
            <div className="flex items-center gap-0.5">
              <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-yellow-400 text-yellow-400" />
              <span className="text-[10px] sm:text-xs text-gray-600">
                {product.rating}
              </span>
            </div>
            <span className="text-[10px] sm:text-xs text-gray-400">
              ({product.reviewCount})
            </span>
          </div>

          <div className="flex items-center justify-between pt-2 gap-2">
            <div className="flex-1 flex flex-col">
              <span className="font-bold text-sm sm:text-base mb-2 md:text-lg text-gray-900 leading-none">
                ₹{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-gray-500 line-through leading-none mt-0.5">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            <div className="flex-shrink-0">
              {product.inStock ? (
                quantity > 0 ? (
                  <QuantityStepper
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="w-18 sm:w-22 md:w-26 h-6 sm:h-7 md:h-8"
                  />
                ) : (
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      handleQuantityChange(1);
                    }}
                    className="bg-blinkit-green hover:bg-blinkit-green/90 text-white px-2 sm:px-3 md:px-4 py-1 h-6 sm:h-7 md:h-8 text-xs sm:text-sm font-bold rounded border border-blinkit-green flex items-center justify-center gap-1 w-14 sm:w-16 md:w-18"
                  >
                    <ShoppingCart className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    ADD
                  </Button>
                )
              ) : (
                <div className="px-3 sm:px-4 py-1 h-6 sm:h-7 md:h-8 bg-gray-100 rounded border border-gray-200 flex items-center justify-center w-12 sm:w-14 md:w-16">
                  <span className="text-xs sm:text-sm text-gray-500 font-medium">
                    N/A
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
