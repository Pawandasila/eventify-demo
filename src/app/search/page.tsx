"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CustomBreadcrumb } from "@/components/ui/custom-breadcrumb";
import { PageContainer } from "@/components/layout/PageContainer";
import { ProductCard } from "@/components/domain/ProductCard";
import { products } from "@/data/mockData";

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams?.get("q") || "";

  const [localQuery, setLocalQuery] = useState(query);

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];

    const searchTerm = query.toLowerCase();
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm) ||
        product.subcategory.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.brand.toLowerCase().includes(searchTerm)
    );
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (localQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(localQuery)}`;
    }
  };

  return (
    <PageContainer>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <CustomBreadcrumb
          items={[{ label: `Search results for "${query}"` }]}
          className="mb-6"
        />

        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Search Results
          </h1>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search for products..."
                value={localQuery}
                onChange={(e) => setLocalQuery(e.target.value)}
                className="pl-12 pr-4 py-3 text-base border-2 border-gray-300 focus:border-blinkit-green focus:ring-blinkit-green"
              />
            </div>
          </form>
        </div>

        {/* Results */}
        {query.trim() ? (
          <div>
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                {searchResults.length} result
                {searchResults.length !== 1 ? "s" : ""} found for &quot;{query}
                &quot;
              </p>

              {searchResults.length > 0 && (
                <Button variant="outline" className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4" />
                  Filter & Sort
                </Button>
              )}
            </div>

            {searchResults.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6">
                {searchResults.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No products found
                </h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  We couldn&apos;t find any products matching &quot;{query}
                  &quot;. Try searching with different keywords.
                </p>
                <div className="space-y-2 text-sm text-gray-500">
                  <p>• Check your spelling</p>
                  <p>• Try more general keywords</p>
                  <p>• Browse our categories instead</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Start searching
            </h3>
            <p className="text-gray-600">
              Enter a product name, category, or brand to find what you&apos;re
              looking for.
            </p>
          </div>
        )}
      </div>
    </PageContainer>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <PageContainer>
          <div className="flex justify-center items-center min-h-[50vh]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        </PageContainer>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
