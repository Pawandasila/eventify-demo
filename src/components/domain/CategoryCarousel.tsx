'use client';

import React, { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CategoryCard } from '@/components/domain/CategoryCard';
import { Category } from '@/types';

interface CategoryCarouselProps {
  categories: Category[];
}

export function CategoryCarousel({ categories }: CategoryCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.7;
      scrollContainerRef.current.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      });
      setTimeout(checkScrollButtons, 150);
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.7;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
      setTimeout(checkScrollButtons, 150);
    }
  };

  React.useEffect(() => {
    checkScrollButtons();
    
    const handleResize = () => checkScrollButtons();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="py-8 sm:py-12 bg-white overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
            Browse Services
          </h2>
        </div>
        
        <div 
          ref={scrollContainerRef}
          className="flex gap-2 sm:gap-4 lg:gap-6 overflow-x-auto pb-4 scroll-smooth mb-4"
          onScroll={checkScrollButtons}
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex-shrink-0 w-1/4 min-w-[25%] sm:w-40 sm:min-w-[10rem] lg:w-48 lg:min-w-[12rem]"
            >
              <CategoryCard category={category} compact />
            </div>
          ))}
        </div>

        {/* Navigation buttons at the end */}
        <div className="flex gap-2 justify-center">
          <Button 
            variant="outline" 
            size="sm" 
            className={`w-8 h-8 sm:w-10 sm:h-10 p-0 rounded-full bg-white/90 backdrop-blur-sm border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 ${
              !canScrollLeft ? 'opacity-40 cursor-not-allowed' : 'opacity-100 hover:bg-gray-50'
            }`}
            onClick={scrollLeft}
            disabled={!canScrollLeft}
          >
            <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className={`w-8 h-8 sm:w-10 sm:h-10 p-0 rounded-full bg-white/90 backdrop-blur-sm border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 ${
              !canScrollRight ? 'opacity-40 cursor-not-allowed' : 'opacity-100 hover:bg-gray-50'
            }`}
            onClick={scrollRight}
            disabled={!canScrollRight}
          >
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
          </Button>
        </div>
      </div>
      
      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
