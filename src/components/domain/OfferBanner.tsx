"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Deal } from "@/types";

interface OfferBannerProps {
  deal: Deal;
  className?: string;
}

export function OfferBanner({ deal, className }: OfferBannerProps) {
  return (
    <Link href={`/deals/${deal.id}`}>
      <div className={`group cursor-pointer ${className}`}>
        <div className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 hover:border-blinkit-green/20">
          {/* Image Container */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-gray-50 mb-3">
            <Image
              src={deal.image}
              alt={deal.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            
            {/* Discount Badge */}
            {deal.discount && (
              <div className="absolute top-3 left-3 bg-blinkit-yellow text-blinkit-gray-900 text-xs font-bold px-2 py-1 rounded-md">
                {deal.discount}% OFF
              </div>
            )}
          </div>
          
          {/* Text Content */}
          <div className="space-y-1">
            <h3 className="font-semibold text-gray-900 text-sm group-hover:text-blinkit-green transition-colors">
              {deal.title}
            </h3>
            <p className="text-gray-600 text-xs leading-relaxed">
              {deal.description}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
