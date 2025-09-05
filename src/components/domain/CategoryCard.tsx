"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Category } from "@/types";

interface CategoryCardProps {
  category: Category;
  className?: string;
}

export function CategoryCard({ category, className }: CategoryCardProps) {
  return (
    <Link href={`/category/${category.slug}`}>
      <div className={`group text-center cursor-pointer ${className}`}>
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-3 overflow-hidden rounded-full bg-gray-50 border border-gray-100 shadow-sm group-hover:scale-105 group-hover:shadow-md transition-all duration-200">
          <Image
            src={category.image}
            alt={category.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 80px, 96px"
          />
        </div>

        <div className="space-y-0.5">
          <h3 className="font-medium text-gray-900 text-sm leading-tight group-hover:text-blinkit-green transition-colors duration-200">
            {category.name}
          </h3>
          <p className="text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {category.subcategories.length} items
          </p>
        </div>
      </div>
    </Link>
  );
}
