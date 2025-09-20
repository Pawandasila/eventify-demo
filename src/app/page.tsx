"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { CategoryCarousel } from "@/components/domain/CategoryCarousel";
import { BannerCarousel } from "@/components/domain/BannerCarousel";
import { ProductCard } from "@/components/domain/ProductCard";
import { OfferBanner } from "@/components/domain/OfferBanner";
import { Button } from "@/components/ui/button";
import { categories, products, deals } from "@/data/mockData";

export default function HomePage() {
  // Filter products for different sections
  const recommendedProducts = products.slice(0, 8);
  const weddingDecorations = products.filter(
    (p) => p.category === "Wedding Decoration"
  );

  // Banner carousel data
  const banners = [
    {
      id: "1",
      image: "/assets/banner-05.png",
      alt: "Event planning and decoration services",
    },
    {
      id: "2",
      image: "/assets/banner-06.png",
      alt: "Premium event planning services",
    },
  ];

  return (
    <PageContainer>
      <section className="py-4 sm:py-6 lg:py-8 overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <BannerCarousel banners={banners} />
        </div>
      </section>

      {/* Categories Section */}
      <CategoryCarousel categories={categories} />

      {/* Deals Carousel */}
      {/* <section className="py-8 sm:py-12 overflow-hidden">
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
      </section> */}

      {/* Recommended Services */}
      <section className="py-8 sm:py-12 bg-gray-50 overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center mb-6 sm:mb-8 text-gray-900">
            Recommended Services
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
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
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 mb-4">
            {weddingDecorations.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <Link href="/category/wedding-decoration">
            <Button
              variant="outline"
              className="flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-start"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
    </PageContainer>
  );
}
