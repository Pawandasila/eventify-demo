"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Category } from "@/types";

interface CategoryCardProps {
  category: Category;
  className?: string;
  compact?: boolean;
}

export function CategoryCard({ category, className, compact }: CategoryCardProps) {
  // Only show the first word of the category name
  const displayName = category.name.split(' ')[0];
  return (
    <Link href={`/category/${category.slug}`}>
      <div
        className={`group text-center cursor-pointer  border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 px-2 py-3 flex flex-col items-center ${compact ? 'gap-1' : 'gap-2'} ${className || ''}`}
      >
        <div className={`relative ${compact ? 'w-14 h-14' : 'w-20 h-20'} sm:w-20 sm:h-20 mb-2 overflow-hidden rounded-full  border border-gray-200 shadow group-hover:scale-105 transition-transform duration-200`}>
          <Image
            src={category.image}
            alt={category.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 56px, 80px"
          />
        </div>
        <div className="w-full flex flex-col items-center">
          <h3
            className={`font-semibold text-gray-900 ${compact ? 'text-xs' : 'text-sm'} leading-tight group-hover:text-blinkit-green transition-colors duration-200 break-words max-w-[90%]`}
            style={{ wordBreak: 'break-word', whiteSpace: 'normal' }}
          >
            {displayName}
          </h3>
          {!compact && (
            <p className="text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              {category.subcategories.length} items
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
