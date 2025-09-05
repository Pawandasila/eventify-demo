'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MapPin, Search, User, ShoppingCart, Clock, ArrowDown, Check, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';

interface HeaderProps {
  className?: string;
}

const indianCities = [
  'Haldwani',
  'Delhi',
  'Mumbai',
  'Bangalore',
  'Hyderabad',
  'Chennai',
  'Kolkata',
  'Pune',
  'Ahmedabad',
  'Jaipur',
  'Surat',
  'Lucknow',
  'Kanpur',
  'Nagpur',
  'Indore',
  'Thane',
  'Bhopal',
  'Visakhapatnam',
  'Pimpri-Chinchwad',
  'Patna'
];

export function Header({ className }: HeaderProps) {
  const router = useRouter();
  const { totalItems, toggleCart } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('Haldwani');
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowCityDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setShowCityDropdown(false);
  };

  const handleCartClick = () => {
    setIsMobileMenuOpen(false); // Close mobile menu first
    toggleCart();
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={cn("sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm", className)}>
      {/* Delivery Time Bar */}
      <div className="bg-blinkit-green text-white py-1">
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-4">
          <div className="flex items-center justify-center text-xs">
            <Clock className="w-3 h-3 mr-1" />
            <span>Service available 24/7</span>
          </div>
        </div>
      </div>

      <div className="w-full mx-auto px-3 sm:px-4">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between h-16 min-w-0">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-1 flex-shrink-0">
            <div className="w-8 h-8 bg-blinkit-green rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <span className="text-sm sm:text-base font-bold text-gray-900">Mosomaau</span>
          </Link>

          {/* Search Bar - Mobile */}
          <div className="flex-1 mx-2 sm:mx-4 min-w-0">
            <form onSubmit={handleSearch} className="relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blinkit-green focus:border-blinkit-green text-sm"
                />
              </div>
            </form>
          </div>

          {/* Hamburger Menu */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="p-1 sm:p-2 flex-shrink-0 ml-1">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-80 p-0">
              <div className="flex flex-col h-full">
                <SheetHeader className="p-4 border-b border-gray-200">
                  <SheetTitle className="text-left">Menu</SheetTitle>
                </SheetHeader>
                
                <div className="flex-1 p-4 space-y-6">
                  {/* Location Selection */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-3">Service Location</h3>
                    
                    {/* Current Location Display */}
                    <div className="mb-3 p-3 bg-blinkit-green/10 rounded-lg border border-blinkit-green/20">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-blinkit-green" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{selectedCity}</div>
                          <div className="text-xs text-gray-500">Current location</div>
                        </div>
                      </div>
                    </div>

                    {/* Location Dropdown */}
                    <div className="relative">
                      <button
                        onClick={() => setShowCityDropdown(!showCityDropdown)}
                        className="w-full flex items-center justify-between p-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors"
                      >
                        <span className="text-sm text-gray-700">Change location</span>
                        <ArrowDown className={cn("w-4 h-4 text-gray-400 transition-transform", showCityDropdown && "rotate-180")} />
                      </button>
                      
                      {showCityDropdown && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                          {indianCities.map((city) => (
                            <button
                              key={city}
                              onClick={() => {
                                handleCitySelect(city);
                                closeMobileMenu();
                              }}
                              className={cn(
                                "w-full text-left px-4 py-3 text-sm transition-colors hover:bg-gray-50 flex items-center justify-between",
                                selectedCity === city && "bg-blinkit-green/5 text-blinkit-green"
                              )}
                            >
                              <span>{city}</span>
                              {selectedCity === city && <Check className="w-4 h-4" />}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* User Account */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-3">Account</h3>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start text-gray-700 hover:text-blinkit-green"
                      onClick={closeMobileMenu}
                    >
                      <User className="w-4 h-4 mr-3" />
                      My Profile
                    </Button>
                  </div>

                  {/* Cart Button */}
                  <div>
                    <Button
                      onClick={handleCartClick}
                      className="w-full bg-blinkit-green hover:bg-blinkit-green/90 text-white flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <ShoppingCart className="w-4 h-4 mr-3" />
                        My Cart
                      </div>
                      {totalItems > 0 && (
                        <Badge className="bg-white text-blinkit-green">
                          {totalItems > 99 ? '99+' : totalItems}
                        </Badge>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Header */}
        <div className="hidden md:flex items-center gap-2 justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 mr-6">
            <div className="w-8 h-8 bg-blinkit-green rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Mosomaau</span>
          </Link>

          {/* Location Dropdown and Search Bar - Unified Container */}
          <div 
            ref={dropdownRef}
            className="relative flex items-center flex-1 max-w-2xl border border-gray-300 rounded-lg bg-white focus-within:ring-2 focus-within:ring-blinkit-green focus-within:border-blinkit-green transition-all"
          >
            {/* Location Selector */}
            <div 
              className="flex items-center px-3 space-x-2 py-1 cursor-pointer transition-colors hover:bg-gray-50 min-w-[160px] border-r border-gray-200"
              onClick={() => setShowCityDropdown(!showCityDropdown)}
            >
              <MapPin className="w-4 h-4 text-gray-600" />
              <div className="text-left overflow-hidden">
                <div className="text-sm font-medium text-gray-900">{selectedCity}</div>
                <div className="text-xs text-gray-500">Select location</div>
              </div>
              <ArrowDown className={cn("w-3 h-3 text-gray-400 ml-auto transition-transform", showCityDropdown && "rotate-180")} />
            </div>

            {/* Cities Dropdown */}
            {showCityDropdown && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                {indianCities.map((city) => (
                  <div
                    key={city}
                    className={cn(
                      "flex items-center justify-between px-4 py-2 text-sm cursor-pointer hover:bg-gray-50",
                      selectedCity === city && "bg-blinkit-green/5 text-blinkit-green"
                    )}
                    onClick={() => handleCitySelect(city)}
                  >
                    <span>{city}</span>
                    {selectedCity === city && <Check className="w-4 h-4" />}
                  </div>
                ))}
              </div>
            )}

            {/* Search Bar */}
            <div className="flex-1">
              <form onSubmit={handleSearch} className="relative">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search for events & services..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full border-0 bg-transparent focus:ring-0 focus:outline-none"
                  />
                </div>
              </form>
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-6 ml-6">
            {/* User Account */}
            <Button variant="ghost" size="sm" className="flex items-center space-x-2 text-gray-700 hover:text-blinkit-green">
              <User className="w-4 h-4" />
              <span className="text-sm font-medium">User</span>
            </Button>

            {/* Cart */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleCart}
              className="relative flex items-center space-x-2 text-gray-700 hover:text-blinkit-green"
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-blinkit-green hover:bg-blinkit-green"
                  >
                    {totalItems > 99 ? '99+' : totalItems}
                  </Badge>
                )}
              </div>
              <span className="text-sm font-medium">My Cart</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
