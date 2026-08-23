'use client';

import React from 'react';
import { ExternalLink, ShieldCheck, AlertTriangle, Eye, ShoppingBag } from 'lucide-react';
import { CalculatedMatch, Product } from '@/types/product';

interface ProductCardProps {
  match: CalculatedMatch;
  isAiMode: boolean;
  onOpenAuditModal: (product: Product) => void;
  cardIndex?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  match,
  isAiMode,
  onOpenAuditModal,
  cardIndex = 0
}) => {
  const { product, matchPercentage, passedFilters } = match;

  const isHighMatch = matchPercentage >= 90 && passedFilters;

  const badgeBg = !passedFilters || matchPercentage < 70
    ? 'bg-rose-100 text-rose-800'
    : isHighMatch
      ? 'bg-[#8A6B5D] text-white'
      : 'bg-[#B89A8E] text-white';

  // Strip "CAD" from all prices and format strictly as $XX.XX
  const rawPrice = String(product.price).replace(/CAD/gi, '').trim();
  const displayPrice = rawPrice.startsWith('$') ? rawPrice : `$${rawPrice}`;

  // DYNAMIC ASYMMETRICAL ASPECT RATIOS BASED ON INDEX % 5
  const getDynamicAspectClass = (idx: number) => {
    const mod = idx % 5;
    if (mod === 0) return 'aspect-[3/5]';  // Tall editorial crop
    if (mod === 1) return 'aspect-[4/5]';  // Standard portrait
    if (mod === 2) return 'aspect-[3/4]';  // Mid portrait
    if (mod === 3) return 'aspect-[2/3]';  // Editorial long shot
    return 'aspect-[1/1]';                // Square close-up
  };

  const aspectClass = getDynamicAspectClass(cardIndex);

  return (
    <div className="break-inside-avoid mb-4 inline-block w-full group relative bg-[#FAF7F2] border-none rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col font-sans">
      
      {/* Garment Image & Overlay Badges */}
      <div className={`relative w-full ${aspectClass} bg-[#F2EDE6] overflow-hidden rounded-2xl border-none`}>
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover object-center rounded-2xl group-hover:scale-105 transition-transform duration-500 block"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
          {/* Retailer Store Badge */}
          <span className="px-2.5 py-1 rounded-lg bg-[#FAF7F2]/90 backdrop-blur-md text-[11px] font-extrabold text-[#4B3F38] shadow-sm uppercase tracking-wider flex items-center gap-1">
            <ShoppingBag className="w-3 h-3 text-[#8A6B5D]" />
            {product.brand}
          </span>

          {/* Modesty Match % Badge */}
          <div className={`flex items-center gap-1.5 px-3 py-1 rounded-xl backdrop-blur-md text-xs font-bold shadow-sm ${badgeBg}`}>
            {passedFilters ? (
              <ShieldCheck className="w-4 h-4 text-emerald-300 shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
            )}
            <span>{matchPercentage}% Match</span>
          </div>
        </div>

        {/* Hover Overlay CTAs */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-3 pointer-events-none group-hover:pointer-events-auto">
          <div className="flex items-center gap-1.5">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenAuditModal(product);
              }}
              className="flex-1 px-3 py-1.5 rounded-full bg-white/95 hover:bg-white text-slate-900 font-bold text-[11px] shadow-md transition-all flex items-center justify-center gap-1"
            >
              <Eye className="w-3 h-3 text-[#8A6B5D]" />
              <span>AI Audit</span>
            </button>

            <a
              href={product.originalUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex-1 px-3 py-1.5 rounded-full bg-[#8A6B5D] hover:bg-[#4B3F38] text-white font-bold text-[11px] shadow-md transition-all flex items-center justify-center gap-1"
            >
              <span>Buy</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-3 flex-1 flex flex-col justify-between space-y-2">
        <div>
          {/* Title & Price */}
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-sans font-medium text-[13px] text-[#4B3F38] line-clamp-1 leading-snug group-hover:text-[#8A6B5D] transition-colors">
              {product.name}
            </h3>
            <div className="text-right shrink-0">
              <span className="font-sans font-semibold text-[13px] text-[#4B3F38]">{displayPrice}</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
