'use client';

import React, { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { Filter, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { CustomBreadcrumb } from '@/components/ui/custom-breadcrumb';
import { PageContainer } from '@/components/layout/PageContainer';
import { ProductCard } from '@/components/domain/ProductCard';
import { products, categories } from '@/data/mockData';

const sortOptions = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Customer Rating' },
  { value: 'delivery', label: 'Delivery Time' },
];

const priceRanges = [
  { value: 'all', label: 'All Prices', min: 0, max: Infinity },
  { value: '0-100', label: '₹0 - ₹100', min: 0, max: 100 },
  { value: '100-300', label: '₹100 - ₹300', min: 100, max: 300 },
  { value: '300-500', label: '₹300 - ₹500', min: 300, max: 500 },
  { value: '500+', label: '₹500+', min: 500, max: Infinity },
];

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [sortBy, setSortBy] = useState('relevance');
  const [priceFilter, setPriceFilter] = useState('all');
  const viewMode = 'grid';
  
  // Find the category
  const category = categories.find(cat => 
    cat.name.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and') === slug
  );
  
  // Filter products by category
  const categoryProducts = products.filter(product => 
    product.category === category?.name || product.subcategory === category?.name
  );
  
  // Apply filters and sorting
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...categoryProducts];
    
    // Apply price filter
    if (priceFilter !== 'all') {
      const range = priceRanges.find(r => r.value === priceFilter);
      if (range) {
        filtered = filtered.filter(p => p.price >= range.min && p.price <= range.max);
      }
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'delivery':
        filtered.sort((a, b) => 
          parseInt(a.deliveryTime) - parseInt(b.deliveryTime)
        );
        break;
      default:
        // Keep original order for relevance
        break;
    }
    
    return filtered;
  }, [categoryProducts, sortBy, priceFilter]);

  if (!category) {
    return (
      <PageContainer>
        <div className="text-center py-16">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Category Not Found</h1>
          <p className="text-gray-600">The category you&apos;re looking for doesn&apos;t exist.</p>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <CustomBreadcrumb 
          items={[{ label: category.name }]}
          className="mb-6"
        />

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{category.name}</h1>
          <p className="text-gray-600">{filteredAndSortedProducts.length} items available</p>
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex flex-wrap gap-3">
            {/* Price Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Price
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {priceRanges.map((range) => (
                  <DropdownMenuItem
                    key={range.value}
                    onClick={() => setPriceFilter(range.value)}
                    className={priceFilter === range.value ? 'bg-blinkit-green/10' : ''}
                  >
                    {range.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Active Filters */}
            {priceFilter !== 'all' && (
              <Badge 
                variant="secondary" 
                className="cursor-pointer"
                onClick={() => setPriceFilter('all')}
              >
                {priceRanges.find(r => r.value === priceFilter)?.label} ×
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Sort Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4" />
                  Sort: {sortOptions.find(opt => opt.value === sortBy)?.label}
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {sortOptions.map((option) => (
                  <DropdownMenuItem
                    key={option.value}
                    onClick={() => setSortBy(option.value)}
                    className={sortBy === option.value ? 'bg-blinkit-green/10' : ''}
                  >
                    {option.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* View Mode Toggle */}
            {/* <div className="flex rounded-lg border">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-r-none"
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-l-none"
              >
                <List className="w-4 h-4" />
              </Button>
            </div> */}
          </div>
        </div>

        {/* Products Grid */}
        {filteredAndSortedProducts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-600">No products found matching your filters.</p>
            <Button 
              variant="outline" 
              onClick={() => setPriceFilter('all')}
              className="mt-4"
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className={`grid gap-4 ${
            viewMode === 'grid' 
              ? 'grid-cols- sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5' 
              : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
          }`}>
            {filteredAndSortedProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product}
              />
            ))}
          </div>
        )}
      </div>
    </PageContainer>
  );
}
