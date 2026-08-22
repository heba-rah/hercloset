'use client';

import React, { useState } from 'react';
import { ShieldCheck, AlertTriangle, Sparkles, Check, ShoppingBag, Eye } from 'lucide-react';
import { CalculatedMatch, Product } from '@/types/product';

interface PinterestCardProps {
  match: CalculatedMatch;
  isAiMode: boolean;
  onOpenAuditModal: (product: Product) => void;
  onAddToHamper: (product: Product) => void;
  isInHamper: boolean;
}

export const PinterestCard: React.FC<PinterestCardProps> = ({
  match,
  isAiMode,
  onOpenAuditModal,
  onAddToHamper,
  isInHamper
}) => {
  const { product, matchPercentage, passedFilters, warnings } = match;
  const { modestyAudit } = product;
  const [imgSrc, setImgSrc] = useState<string>(product.imageUrl);

  const aspectClass = product.aspectRatio === 'tall'
    ? 'aspect-[2/3]'
    : product.aspectRatio === 'square'
      ? 'aspect-square'
      : product.aspectRatio === 'wide'
        ? 'aspect-[4/3]'
        : 'aspect-[3/4]';

  const isHighMatch = matchPercentage >= 90 && passedFilters;
  const badgeBg = !passedFilters || matchPercentage < 70
    ? 'bg-rose-100 text-rose-800 border-rose-300'
    : isHighMatch
      ? 'bg-[#8A6B5D] text-white border-[#8A6B5D]'
      : 'bg-[#B89A8E] text-white border-[#B89A8E]';

  const handleImageError = () => {
    setImgSrc('https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80');
  };

  const displayPrice = typeof product.price === 'string' && product.price.startsWith('$')
    ? product.price
    : `$${product.price}`;

  return (
    <div className="break-inside-avoid mb-6 group relative bg-[#FAF7F2] border border-[#D6CFCE] hover:border-[#B89A8E] rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col">
      
      {/* Garment Image */}
      <div className={`relative w-full bg-[#F2EDE6] overflow-hidden ${aspectClass}`}>
        <img
          src={imgSrc}
          alt={product.name}
          onError={handleImageError}
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
          <span className="px-2.5 py-1 rounded-full bg-[#FAF7F2]/90 backdrop-blur-md text-[11px] font-extrabold text-[#4B3F38] border border-[#D6CFCE] shadow-sm uppercase tracking-wider flex items-center gap-1">
            <ShoppingBag className="w-3 h-3 text-[#8A6B5D]" />
            {product.brand}
          </span>

          <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full backdrop-blur-md text-xs font-bold border shadow-sm ${badgeBg}`}>
            {passedFilters ? (
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
            ) : (
              <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
            )}
            <span>{matchPercentage}% Match</span>
          </div>
        </div>

        {/* Bottom Feature Overlay (Soft Warm-Earth Aesthetic) */}
        <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1">
          {modestyAudit.hasSlit && (
            <span className="px-2 py-0.5 rounded-full bg-rose-100/90 text-rose-800 border border-rose-300 text-[10px] font-bold shadow-sm">
              🚨 Leg Slit
            </span>
          )}
          {modestyAudit.isOpenBack && (
            <span className="px-2 py-0.5 rounded-full bg-rose-100/90 text-rose-800 border border-rose-300 text-[10px] font-bold shadow-sm">
              🚨 Open Back
            </span>
          )}
          {modestyAudit.isSheer && (
            <span className="px-2 py-0.5 rounded-full bg-amber-100/90 text-amber-900 border border-amber-300 text-[10px] font-bold shadow-sm">
              👁️ Sheer Layer
            </span>
          )}
          {!modestyAudit.hasSlit && !modestyAudit.isOpenBack && !modestyAudit.isSheer && (
            <span className="px-2 py-0.5 rounded-full bg-[#F2EDE6]/90 text-[#8A6B5D] border border-[#B89A8E] text-[10px] font-bold shadow-sm flex items-center gap-1">
              <Check className="w-3 h-3 text-[#8A6B5D]" /> Modest Verified
            </span>
          )}
        </div>
      </div>

      {/* Card Content & Action Buttons */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-sm text-[#4B3F38] line-clamp-2 leading-snug group-hover:text-[#8A6B5D] transition-colors">
              {product.name}
            </h3>
            <span className="font-bold text-sm text-[#8A6B5D] shrink-0">{displayPrice}</span>
          </div>

          <div className="flex flex-wrap gap-1.5 mt-2">
            {product.occasion && (
              <span className="px-2 py-0.5 rounded-full bg-[#F2EDE6] text-[#8A6B5D] border border-[#D6CFCE] text-[10px] font-semibold uppercase">
                {product.occasion}
              </span>
            )}
            <span className="px-2 py-0.5 rounded-full bg-[#F2EDE6] text-[#4B3F38]/70 border border-[#D6CFCE] text-[10px]">
              {modestyAudit.neckline} neck
            </span>
            <span className="px-2 py-0.5 rounded-full bg-[#F2EDE6] text-[#4B3F38]/70 border border-[#D6CFCE] text-[10px]">
              {modestyAudit.sleeveLength}
            </span>
          </div>

          {isAiMode && warnings.length > 0 && (
            <div className="mt-2 p-2 rounded-xl bg-rose-50 border border-rose-200 text-[11px] text-rose-800">
              <span className="line-clamp-1">{warnings[0]}</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="pt-2 border-t border-[#D6CFCE]/80 flex items-center justify-between gap-2">
          <button
            onClick={() => onOpenAuditModal(product)}
            className="flex-1 px-3 py-2 rounded-full bg-[#FAF7F2] hover:bg-[#F2EDE6] border border-[#D6CFCE] text-[#4B3F38] text-xs font-semibold tracking-wide transition-all text-center flex items-center justify-center gap-1"
          >
            <Eye className="w-3.5 h-3.5 text-[#8A6B5D]" />
            <span>view item</span>
          </button>

          <button
            onClick={() => onAddToHamper(product)}
            className={`flex-1 px-3 py-2 rounded-full text-xs font-bold tracking-wide transition-all text-center flex items-center justify-center gap-1 shadow-sm ${
              isInHamper
                ? 'bg-[#B89A8E] text-white border border-[#B89A8E]'
                : 'bg-[#8A6B5D] hover:bg-[#4B3F38] text-white hover:scale-105 active:scale-95'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isInHamper ? 'in hamper ✓' : 'add to hamper'}</span>
          </button>
        </div>

      </div>

    </div>
  );
};
