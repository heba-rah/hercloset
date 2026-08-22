'use client';

import React from 'react';
import { ExternalLink, ShieldCheck, AlertTriangle, Sparkles, Check, Eye, ShoppingBag } from 'lucide-react';
import { CalculatedMatch, Product } from '@/types/product';

interface ProductCardProps {
  match: CalculatedMatch;
  isAiMode: boolean;
  onOpenAuditModal: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  match,
  isAiMode,
  onOpenAuditModal
}) => {
  const { product, matchPercentage, passedFilters, warnings } = match;
  const { modestyAudit } = product;

  const isHighMatch = matchPercentage >= 90 && passedFilters;

  const badgeBg = !passedFilters || matchPercentage < 70
    ? 'bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-800'
    : isHighMatch
      ? 'bg-[#8A6B5D] text-white border-[#8A6B5D]'
      : 'bg-[#B89A8E] text-white border-[#B89A8E]';

  const displayPrice = typeof product.price === 'string' && product.price.startsWith('$')
    ? product.price
    : `$${product.price}`;

  return (
    <div className="group relative bg-[#FAF7F2] dark:bg-[#2D2522] border border-[#D6CFCE] dark:border-[#443732] hover:border-[#B89A8E] dark:hover:border-[#8A6B5D] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col">
      
      {/* Garment Image & Overlay Badges */}
      <div className="relative aspect-[3/4] w-full bg-[#F2EDE6] dark:bg-[#181412] overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
          {/* Retailer Store Badge */}
          <span className="px-2.5 py-1 rounded-lg bg-[#FAF7F2]/90 dark:bg-[#181412]/90 backdrop-blur-md text-[11px] font-extrabold text-[#4B3F38] dark:text-[#F2EDE6] border border-[#D6CFCE] dark:border-[#443732] shadow-sm uppercase tracking-wider flex items-center gap-1">
            <ShoppingBag className="w-3 h-3 text-[#8A6B5D] dark:text-[#C4A497]" />
            {product.brand}
          </span>

          {/* Modesty Match % Badge */}
          <div className={`flex items-center gap-1.5 px-3 py-1 rounded-xl backdrop-blur-md text-xs font-bold border shadow-sm ${badgeBg}`}>
            {passedFilters ? (
              <ShieldCheck className="w-4 h-4 text-emerald-300 shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
            )}
            <span>{matchPercentage}% Match</span>
          </div>
        </div>

        {/* Bottom Image AI Feature Badges */}
        <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1">
          {modestyAudit.hasSlit && (
            <span className="px-2 py-0.5 rounded-md bg-rose-100/90 dark:bg-rose-950/90 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-800 text-[10px] font-bold shadow-sm flex items-center gap-1">
              <AlertTriangle className="w-3 h-3 text-rose-600" /> Leg Slit
            </span>
          )}
          {modestyAudit.isOpenBack && (
            <span className="px-2 py-0.5 rounded-md bg-rose-100/90 dark:bg-rose-950/90 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-800 text-[10px] font-bold shadow-sm flex items-center gap-1">
              <AlertTriangle className="w-3 h-3 text-rose-600" /> Open Back
            </span>
          )}
          {modestyAudit.isSheer && (
            <span className="px-2 py-0.5 rounded-md bg-amber-100/90 dark:bg-amber-950/90 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-800 text-[10px] font-bold shadow-sm flex items-center gap-1">
              <Eye className="w-3 h-3 text-amber-700" /> Sheer Fabric
            </span>
          )}
          {!modestyAudit.hasSlit && !modestyAudit.isOpenBack && !modestyAudit.isSheer && (
            <span className="px-2 py-0.5 rounded-md bg-[#F2EDE6]/90 dark:bg-[#181412]/90 text-[#8A6B5D] dark:text-[#C4A497] border border-[#B89A8E] dark:border-[#8A6B5D] text-[10px] font-bold shadow-sm flex items-center gap-1">
              <Check className="w-3 h-3 text-[#8A6B5D] dark:text-[#C4A497]" /> Modest Coverage
            </span>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Title & Price */}
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-sm text-[#4B3F38] dark:text-[#F2EDE6] line-clamp-2 leading-snug group-hover:text-[#8A6B5D] dark:group-hover:text-[#C4A497] transition-colors">
              {product.name}
            </h3>
            <div className="text-right shrink-0">
              <span className="font-bold text-base text-[#8A6B5D] dark:text-[#C4A497]">{displayPrice}</span>
            </div>
          </div>

          {/* Key Attributes & Occasion */}
          <div className="flex flex-wrap gap-1.5 mt-2.5">
            {product.occasion && (
              <span className="px-2 py-0.5 rounded-md bg-[#F2EDE6] dark:bg-[#181412] text-[#8A6B5D] dark:text-[#C4A497] border border-[#D6CFCE] dark:border-[#443732] text-[10px] font-semibold uppercase">
                {product.occasion}
              </span>
            )}
            <span className="px-2 py-0.5 rounded-md bg-[#F2EDE6] dark:bg-[#181412] text-[#4B3F38]/70 dark:text-[#F2EDE6]/70 border border-[#D6CFCE] dark:border-[#443732] text-[10px] font-medium">
              Neck: {modestyAudit.neckline.toUpperCase()}
            </span>
            <span className="px-2 py-0.5 rounded-md bg-[#F2EDE6] dark:bg-[#181412] text-[#4B3F38]/70 dark:text-[#F2EDE6]/70 border border-[#D6CFCE] dark:border-[#443732] text-[10px] font-medium">
              Sleeve: {modestyAudit.sleeveLength}
            </span>
            <span className="px-2 py-0.5 rounded-md bg-[#F2EDE6] dark:bg-[#181412] text-[#4B3F38]/70 dark:text-[#F2EDE6]/70 border border-[#D6CFCE] dark:border-[#443732] text-[10px] font-medium">
              Hem: {modestyAudit.hemline}
            </span>
          </div>

          {/* Warnings in AI mode */}
          {isAiMode && warnings.length > 0 && (
            <div className="mt-2.5 p-2 rounded-lg bg-rose-50 dark:bg-rose-950/80 border border-rose-200 dark:border-rose-800 text-[11px] text-rose-800 dark:text-rose-300 space-y-0.5">
              {warnings.slice(0, 2).map((w, idx) => (
                <div key={idx} className="flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-rose-600 dark:bg-rose-400 shrink-0" />
                  <span className="line-clamp-1">{w}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="pt-2 border-t border-[#D6CFCE]/80 dark:border-[#443732] grid grid-cols-2 gap-2">
          {/* Primary CTA: Direct Purchase at Retailer */}
          <a
            href={product.originalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="col-span-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-[#8A6B5D] hover:bg-[#4B3F38] dark:hover:bg-[#A38071] text-white font-extrabold text-xs transition-all shadow-sm hover:scale-105 active:scale-95"
          >
            <span>Buy at {product.brand}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          {/* Secondary CTA: View AI Audit */}
          <button
            onClick={() => onOpenAuditModal(product)}
            className="col-span-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#181412] hover:bg-[#F2EDE6] dark:hover:bg-[#241E1B] border border-[#D6CFCE] dark:border-[#443732] text-[#4B3F38] dark:text-[#F2EDE6] text-xs font-semibold transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#8A6B5D] dark:text-[#C4A497]" />
            <span>AI Audit</span>
          </button>
        </div>

      </div>

    </div>
  );
};
