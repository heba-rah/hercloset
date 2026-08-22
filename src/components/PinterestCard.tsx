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
    ? 'bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-800'
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
    <div className="break-inside-avoid mb-6 group relative bg-[#FAF7F2] dark:bg-[#2D2522] border border-[#D6CFCE] dark:border-[#443732] hover:border-[#B89A8E] dark:hover:border-[#8A6B5D] rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col">
      
      {/* Garment Image */}
      <div className={`relative w-full bg-[#F2EDE6] dark:bg-[#181412] overflow-hidden ${aspectClass}`}>
        <img
          src={imgSrc}
          alt={product.name}
          onError={handleImageError}
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
          <span className="px-2.5 py-1 rounded-full bg-[#FAF7F2]/90 dark:bg-[#181412]/90 backdrop-blur-md text-[11px] font-extrabold text-[#4B3F38] dark:text-[#F2EDE6] border border-[#D6CFCE] dark:border-[#443732] shadow-sm uppercase tracking-wider flex items-center gap-1">
            <ShoppingBag className="w-3 h-3 text-[#8A6B5D] dark:text-[#C4A497]" />
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
            <span className="px-2 py-0.5 rounded-full bg-rose-100/90 dark:bg-rose-950/90 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-800 text-[10px] font-bold shadow-sm">
              🚨 Leg Slit
            </span>
          )}
          {modestyAudit.isOpenBack && (
            <span className="px-2 py-0.5 rounded-full bg-rose-100/90 dark:bg-rose-950/90 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-800 text-[10px] font-bold shadow-sm">
              🚨 Open Back
            </span>
          )}
          {modestyAudit.isSheer && (
            <span className="px-2 py-0.5 rounded-full bg-amber-100/90 dark:bg-amber-950/90 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-800 text-[10px] font-bold shadow-sm">
              👁️ Sheer Layer
            </span>
          )}
          {!modestyAudit.hasSlit && !modestyAudit.isOpenBack && !modestyAudit.isSheer && (
            <span className="px-2 py-0.5 rounded-full bg-[#F2EDE6]/90 dark:bg-[#181412]/90 text-[#8A6B5D] dark:text-[#C4A497] border border-[#B89A8E] dark:border-[#8A6B5D] text-[10px] font-bold shadow-sm flex items-center gap-1">
              <Check className="w-3 h-3 text-[#8A6B5D] dark:text-[#C4A497]" /> Modest Verified
            </span>
          )}
        </div>
      </div>

      {/* Card Content & Action Buttons */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-sm text-[#4B3F38] dark:text-[#F2EDE6] line-clamp-2 leading-snug group-hover:text-[#8A6B5D] dark:group-hover:text-[#C4A497] transition-colors">
              {product.name}
            </h3>
            <span className="font-bold text-sm text-[#8A6B5D] dark:text-[#C4A497] shrink-0">{displayPrice}</span>
          </div>

          <div className="flex flex-wrap gap-1.5 mt-2">
            {product.occasion && (
              <span className="px-2 py-0.5 rounded-full bg-[#F2EDE6] dark:bg-[#181412] text-[#8A6B5D] dark:text-[#C4A497] border border-[#D6CFCE] dark:border-[#443732] text-[10px] font-semibold uppercase">
                {product.occasion}
              </span>
            )}
            <span className="px-2 py-0.5 rounded-full bg-[#F2EDE6] dark:bg-[#181412] text-[#4B3F38]/70 dark:text-[#F2EDE6]/70 border border-[#D6CFCE] dark:border-[#443732] text-[10px]">
              {modestyAudit.neckline} neck
            </span>
            <span className="px-2 py-0.5 rounded-full bg-[#F2EDE6] dark:bg-[#181412] text-[#4B3F38]/70 dark:text-[#F2EDE6]/70 border border-[#D6CFCE] dark:border-[#443732] text-[10px]">
              {modestyAudit.sleeveLength}
            </span>
          </div>

          {isAiMode && warnings.length > 0 && (
            <div className="mt-2 p-2 rounded-xl bg-rose-50 dark:bg-rose-950/80 border border-rose-200 dark:border-rose-800 text-[11px] text-rose-800 dark:text-rose-300">
              <span className="line-clamp-1">{warnings[0]}</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="pt-2 border-t border-[#D6CFCE]/80 dark:border-[#443732] flex items-center justify-between gap-2">
          <button
            onClick={() => onOpenAuditModal(product)}
            className="flex-1 px-3 py-2 rounded-full bg-[#FAF7F2] dark:bg-[#181412] hover:bg-[#F2EDE6] dark:hover:bg-[#241E1B] border border-[#D6CFCE] dark:border-[#443732] text-[#4B3F38] dark:text-[#F2EDE6] text-xs font-semibold tracking-wide transition-all text-center flex items-center justify-center gap-1"
          >
            <Eye className="w-3.5 h-3.5 text-[#8A6B5D] dark:text-[#C4A497]" />
            <span>view item</span>
          </button>

          <button
            onClick={() => onAddToHamper(product)}
            className={`flex-1 px-3 py-2 rounded-full text-xs font-bold tracking-wide transition-all text-center flex items-center justify-center gap-1 shadow-sm ${
              isInHamper
                ? 'bg-[#B89A8E] text-white border border-[#B89A8E]'
                : 'bg-[#8A6B5D] hover:bg-[#4B3F38] dark:hover:bg-[#A38071] text-white hover:scale-105 active:scale-95'
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
