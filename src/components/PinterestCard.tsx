'use client';

import React, { useState } from 'react';
import { ShieldCheck, AlertTriangle, ExternalLink, Eye, ShoppingBag, Check } from 'lucide-react';
import { CalculatedMatch, Product } from '@/types/product';

interface PinterestCardProps {
  match: CalculatedMatch;
  isAiMode: boolean;
  onOpenAuditModal: (product: Product) => void;
  onAddToHamper: (product: Product) => void;
  isInHamper: boolean;
  cardIndex?: number;
}

export const PinterestCard: React.FC<PinterestCardProps> = ({
  match,
  isAiMode,
  onOpenAuditModal,
  onAddToHamper,
  isInHamper,
  cardIndex = 0
}) => {
  const { product, matchPercentage, passedFilters } = match;
  const { modestyAudit } = product;
  const [imgSrc, setImgSrc] = useState<string>(product.imageUrl);

  const handleImageError = () => {
    setImgSrc('https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80');
  };

  const displayPrice = typeof product.price === 'string' && product.price.startsWith('$')
    ? product.price
    : `$${product.price}`;

  const isHighMatch = matchPercentage >= 90 && passedFilters;

  // DYNAMIC ASYMMETRICAL ASPECT RATIOS BASED ON INDEX
  const getDynamicAspectClass = (idx: number) => {
    const mod = idx % 4;
    if (mod === 0) return 'aspect-[3/5]';  // Tall editorial portrait
    if (mod === 1) return 'aspect-[4/5]';  // Standard portrait
    if (mod === 2) return 'aspect-[2/3]';  // Medium long shot
    return 'aspect-[1/1]';                // Square/close-up crop
  };

  const aspectClass = getDynamicAspectClass(cardIndex);

  return (
    <div className="break-inside-avoid mb-4 group relative rounded-2xl overflow-hidden transition-all duration-300 flex flex-col bg-transparent font-serif">
      
      {/* GARMENT IMAGE & HOVER OVERLAY CONTAINER WITH BORDERLESS SOFT SHADOW */}
      <div className={`relative w-full ${aspectClass} rounded-2xl overflow-hidden bg-[#FAF7F2] border-none shadow-sm group-hover:shadow-md transition-all duration-300`}>
        <img
          src={imgSrc}
          alt={product.name}
          onError={handleImageError}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 block"
        />

        {/* PINTEREST-STYLE HOVER OVERLAY (Translucent dark backdrop on hover) */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-between p-3 pointer-events-none group-hover:pointer-events-auto">
          
          {/* TOP HOVER BAR: Compact Modesty % Match Chip (Left) + Warm-Earth "Add to Hamper" Pill Button (Right) */}
          <div className="flex items-center justify-between gap-2">
            {/* Top-Left: Compact Modesty % Match Chip */}
            <div className={`px-2.5 py-1 rounded-full text-[11px] font-bold backdrop-blur-md shadow-md flex items-center gap-1 ${
              !passedFilters || matchPercentage < 70
                ? 'bg-rose-900/90 text-rose-100'
                : isHighMatch
                  ? 'bg-[#8A6B5D]/90 text-white'
                  : 'bg-[#B89A8E]/90 text-white'
            }`}>
              {passedFilters ? <ShieldCheck className="w-3 h-3 text-emerald-300" /> : <AlertTriangle className="w-3 h-3 text-rose-300" />}
              <span>{matchPercentage}% Match</span>
            </div>

            {/* Top-Right: Warm-Earth Rose "Add to Hamper" Action Pill Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddToHamper(product);
              }}
              className={`bg-[#8A6B5D] hover:bg-[#6e5346] text-[#FAF7F2] font-serif text-xs font-semibold px-3.5 py-1.5 rounded-full shadow-md transition-all flex items-center gap-1.5 ${
                isInHamper ? 'bg-[#4B3F38]' : ''
              }`}
            >
              {isInHamper ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-300" />
                  <span>In Hamper</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5 text-[#FAF7F2]" />
                  <span>Add to Hamper</span>
                </>
              )}
            </button>
          </div>

          {/* BOTTOM HOVER BAR: Product Name, CAD Price & View AI Audit */}
          <div className="space-y-2">
            {/* Warning callout on hover if failed rules */}
            {!passedFilters && modestyAudit.hasSlit && (
              <span className="px-2.5 py-1 rounded-md bg-rose-950/90 text-rose-200 text-[10px] font-bold block backdrop-blur-md">
                🚨 Leg Slit Detected
              </span>
            )}
            {!passedFilters && modestyAudit.isOpenBack && (
              <span className="px-2.5 py-1 rounded-md bg-rose-950/90 text-rose-200 text-[10px] font-bold block backdrop-blur-md">
                🚨 Open Back Cutout
              </span>
            )}

            <div className="flex items-center gap-1.5">
              {/* View AI Audit CTA */}
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

              {/* Direct Store Buy Link CTA */}
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
      </div>

      {/* DISCREET BOTTOM METADATA UNDERNEATH IMAGE */}
      <div className="mt-2 px-1 flex items-start justify-between gap-2 text-[#4B3F38]">
        <div className="min-w-0">
          <span className="text-[10px] font-bold text-[#8A6B5D] uppercase tracking-wider block">
            {product.brand}
          </span>
          <h4 className="text-xs font-semibold text-[#4B3F38] truncate leading-tight mt-0.5 font-serif">
            {product.name}
          </h4>
        </div>
        <span className="text-xs font-bold text-[#8A6B5D] shrink-0 mt-0.5">{displayPrice}</span>
      </div>

    </div>
  );
};
