"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { CategoryCarousel } from "@/components/domain/CategoryCarousel";
import { ProductCard } from "@/components/domain/ProductCard";
import { OfferBanner } from "@/components/domain/OfferBanner";
import { Button } from "@/components/ui/button";
import { categories, products, deals } from "@/data/mockData";

export default function HomePage() {
  // Filter products for different sections
  const recommendedProducts = products.slice(0, 8);
  const weddingDecorations = products.filter((p) => p.category === "Wedding Decoration");

  return (
    <PageContainer>
      <section className="py-4 sm:py-6 lg:py-8 overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="relative h-40 sm:h-48 md:h-56 lg:h-64 xl:h-72 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1920"
              alt="Event planning and decoration services"
              fill
              className="object-cover object-center"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
            />
            <div className="absolute inset-0 bg-black/20 sm:bg-black/10"></div>
            
            {/* Hero Content Overlay (optional) */}
            <div className="absolute inset-0 flex items-center justify-center sm:justify-start">
              <div className="text-center sm:text-left px-4 sm:px-6 lg:px-12">
                <h1 className="text-lg sm:text-2xl lg:text-4xl xl:text-5xl font-bold text-white mb-2 sm:mb-4 drop-shadow-lg">
                  <span className="block sm:hidden">Event Services</span>
                  <span className="hidden sm:block">Premium Event Services</span>
                </h1>
                <p className="text-xs sm:text-sm lg:text-lg text-white/90 drop-shadow-md max-w-md">
                  <span className="block sm:hidden">Weddings • Birthdays</span>
                  <span className="hidden sm:block">Complete event planning and decoration services</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <CategoryCarousel categories={categories} />

      {/* Deals Carousel */}
      <section className="py-8 sm:py-12 overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 gap-4 sm:gap-0">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
              Today&apos;s Event Deals
            </h2>
            <Link href="/deals">
              <Button variant="outline" className="flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-start">
                View All
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {deals.map((deal) => (
              <OfferBanner key={deal.id} deal={deal} />
            ))}
          </div>
        </div>
      </section>

      {/* Recommended Services */}
      <section className="py-8 sm:py-12 bg-gray-50 overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center mb-6 sm:mb-8 text-gray-900">
            Recommended Services
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-5">
            {recommendedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Wedding Decorations Section */}
      <section className="py-8 sm:py-12 overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 gap-4 sm:gap-0">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
              Wedding Decorations
            </h2>
            <Link href="/category/wedding-decoration">
              <Button variant="outline" className="flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-start">
                View All
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-5">
            {weddingDecorations.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </PageContainer>
  );
}
