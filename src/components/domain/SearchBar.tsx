'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, TrendingUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { products } from '@/data/mockData';

interface SearchBarProps {
  onSearch?: (query: string) => void;
  className?: string;
  placeholder?: string;
}

export function SearchBar({ onSearch, className, placeholder = "Search for products..." }: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const trendingSearches = [
    'Banana',
    'Milk',
    'Bread',
    'Apple',
    'Tomato',
    'Rice',
    'Eggs',
    'Onion'
  ];

  const handleInputChange = (value: string) => {
    setQuery(value);
    
    // Generate suggestions based on products
    if (value.length > 1) {
      const filteredSuggestions = products
        .filter(product => 
          product.name.toLowerCase().includes(value.toLowerCase()) ||
          product.category.toLowerCase().includes(value.toLowerCase())
        )
        .slice(0, 5)
        .map(product => product.name);
      
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSearch = (searchQuery?: string) => {
    const finalQuery = searchQuery || query;
    if (finalQuery.trim()) {
      // Navigate to search page
      router.push(`/search?q=${encodeURIComponent(finalQuery.trim())}`);
      onSearch?.(finalQuery.trim());
      setIsExpanded(false);
      setQuery(finalQuery);
    }
  };

  const clearSearch = () => {
    setQuery('');
    setSuggestions([]);
    setIsExpanded(false);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Main Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => setIsExpanded(true)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          className="pl-10 pr-10 py-3 w-full bg-gray-50 border-gray-200 focus:bg-white focus:border-blinkit-green rounded-lg"
        />
        
        {query && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearSearch}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-gray-100"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Search Dropdown */}
      {isExpanded && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsExpanded(false)}
          />
          
          {/* Dropdown Content */}
          <Card className="absolute top-full left-0 right-0 z-20 mt-2 shadow-lg border border-gray-200">
            <CardContent className="p-0">
              {/* Search Suggestions */}
              {suggestions.length > 0 && (
                <div className="border-b border-gray-100">
                  <div className="px-4 py-2">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Suggestions</h3>
                    <div className="space-y-1">
                      {suggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => handleSearch(suggestion)}
                          className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded text-sm flex items-center gap-2"
                        >
                          <Search className="w-3 h-3 text-gray-400" />
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Trending Searches */}
              {query.length === 0 && (
                <div className="p-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-blinkit-green" />
                    Trending Searches
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {trendingSearches.map((trend, index) => (
                      <button
                        key={index}
                        onClick={() => handleSearch(trend)}
                        className="px-3 py-1 bg-gray-100 hover:bg-blinkit-green hover:text-white text-sm rounded-full transition-colors"
                      >
                        {trend}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* No Results */}
              {query.length > 1 && suggestions.length === 0 && (
                <div className="p-4 text-center text-gray-500">
                  <p className="text-sm">No products found for &quot;{query}&quot;</p>
                  <p className="text-xs mt-1">Try searching for something else</p>
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
