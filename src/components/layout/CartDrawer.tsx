'use client';

import React from 'react';
import Image from 'next/image';
import { X, ShoppingBag, ArrowRight } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { QuantityStepper } from '@/components/ui/quantity-stepper';
import { PriceTag } from '@/components/ui/price-tag';
import { useCart } from '@/context/CartContext';

export function CartDrawer() {
  const { 
    isOpen, 
    closeCart, 
    items, 
    totalItems, 
    totalPrice, 
    updateQuantity, 
    removeItem 
  } = useCart();

  const deliveryFee = totalPrice > 5000 ? 0 : 500;
  const finalTotal = totalPrice + deliveryFee;

  return (
    <Sheet open={isOpen} onOpenChange={closeCart}>
      <SheetContent side="right" className="w-full sm:w-96 p-0">
        <div className="flex flex-col h-full">
          <SheetHeader className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <SheetTitle className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-blinkit-green" />
                My Cart ({totalItems} items)
              </SheetTitle>
              {/* <Button variant="ghost" size="sm" onClick={closeCart}>
                <X className="w-4 h-4" />
              </Button> */}
            </div>
          </SheetHeader>

          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <ShoppingBag className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
              <p className="text-gray-500 mb-4">Add some services to get started</p>
              <Button onClick={closeCart} className="bg-blinkit-green hover:bg-blinkit-green-dark">
                Start Booking
              </Button>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-4">
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex items-start gap-3 bg-white">
                        <div className="relative w-16 h-16 flex-shrink-0">
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            fill
                            className="object-cover rounded-lg"
                          />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-900 line-clamp-2">
                            {item.product.name}
                          </h4>
                          <p className="text-xs text-gray-500 mb-1">
                            {item.product.weight}
                          </p>
                          <div className="flex items-center justify-between">
                            <PriceTag 
                              price={item.product.price * item.quantity}
                              className="text-sm"
                            />
                            <QuantityStepper
                              value={item.quantity}
                              onChange={(quantity) => updateQuantity(item.product.id, quantity)}
                              className="scale-90"
                            />
                          </div>
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.product.id)}
                          className="flex-shrink-0 text-gray-400 hover:text-red-500 p-1"
                          title="Remove item"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Cart Summary */}
              <div className="border-t border-gray-200 bg-white">
                <div className="p-4">
                  {/* Bill Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>₹{totalPrice}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="flex items-center gap-1">
                        Service fee
                        {totalPrice > 5000 && (
                          <span className="text-xs text-blinkit-green">(Free above ₹5000)</span>
                        )}
                      </span>
                      <span className={deliveryFee === 0 ? 'text-blinkit-green' : ''}>
                        {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                      </span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>₹{finalTotal}</span>
                    </div>
                  </div>

                  {/* Free Delivery Progress */}
                  {totalPrice < 5000 && (
                    <div className="mb-4 p-3 bg-blinkit-yellow-light rounded-lg">
                      <p className="text-xs text-blinkit-gray-800 mb-2">
                        Add ₹{5000 - totalPrice} more for free service
                      </p>
                      <div className="w-full bg-white rounded-full h-2">
                        <div 
                          className="bg-blinkit-green h-2 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min((totalPrice / 5000) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Checkout Button */}
                  <Button 
                    className="w-full bg-blinkit-green hover:bg-blinkit-green-dark text-white font-medium py-3"
                    onClick={() => {
                      // Handle checkout
                      console.log('Proceeding to checkout...');
                    }}
                  >
                    <span className="flex items-center justify-center gap-2">
                      Book Services
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </Button>

                  <p className="text-xs text-gray-500 text-center mt-2">
                    Service booking confirmation
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
