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
    ? 'bg-rose-950/90 text-rose-300 border-rose-800'
    : isHighMatch
      ? 'bg-emerald-950/90 text-emerald-300 border-emerald-700'
      : 'bg-amber-950/90 text-amber-300 border-amber-800';

  const handleImageError = () => {
    setImgSrc('https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80');
  };

  const displayPrice = typeof product.price === 'string' && product.price.startsWith('$')
    ? product.price
    : `$${product.price}`;

  return (
    <div className="break-inside-avoid mb-6 group relative bg-slate-900/90 border border-slate-800/80 hover:border-purple-500/50 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-purple-950/40 transition-all duration-300 flex flex-col">
      
      {/* Garment Image */}
      <div className={`relative w-full bg-slate-950 overflow-hidden ${aspectClass}`}>
        <img
          src={imgSrc}
          alt={product.name}
          onError={handleImageError}
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
          <span className="px-2.5 py-1 rounded-full bg-slate-950/90 backdrop-blur-md text-[11px] font-extrabold text-slate-100 border border-slate-700 shadow-md uppercase tracking-wider flex items-center gap-1">
            <ShoppingBag className="w-3 h-3 text-purple-400" />
            {product.brand}
          </span>

          <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full backdrop-blur-md text-xs font-bold border shadow-lg ${badgeBg}`}>
            {passedFilters ? (
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            ) : (
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
            )}
            <span>{matchPercentage}% Match</span>
          </div>
        </div>

        {/* Bottom Feature Overlay */}
        <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1">
          {modestyAudit.hasSlit && (
            <span className="px-2 py-0.5 rounded-full bg-rose-950/90 text-rose-300 border border-rose-800 text-[10px] font-bold shadow-md">
              🚨 Leg Slit
            </span>
          )}
          {modestyAudit.isOpenBack && (
            <span className="px-2 py-0.5 rounded-full bg-rose-950/90 text-rose-300 border border-rose-800 text-[10px] font-bold shadow-md">
              🚨 Open Back
            </span>
          )}
          {modestyAudit.isSheer && (
            <span className="px-2 py-0.5 rounded-full bg-amber-950/90 text-amber-300 border border-amber-800 text-[10px] font-bold shadow-md">
              👁️ Sheer Layer
            </span>
          )}
          {!modestyAudit.hasSlit && !modestyAudit.isOpenBack && !modestyAudit.isSheer && (
            <span className="px-2 py-0.5 rounded-full bg-emerald-950/90 text-emerald-300 border border-emerald-800 text-[10px] font-bold shadow-md flex items-center gap-1">
              <Check className="w-3 h-3 text-emerald-400" /> Modest Verified
            </span>
          )}
        </div>
      </div>

      {/* Card Content & Action Buttons */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-sm text-slate-100 line-clamp-2 leading-snug group-hover:text-purple-300 transition-colors">
              {product.name}
            </h3>
            <span className="font-bold text-sm text-slate-100 shrink-0">{displayPrice}</span>
          </div>

          <div className="flex flex-wrap gap-1.5 mt-2">
            {product.occasion && (
              <span className="px-2 py-0.5 rounded-full bg-slate-950 text-purple-300 border border-slate-800 text-[10px] font-semibold uppercase">
                {product.occasion}
              </span>
            )}
            <span className="px-2 py-0.5 rounded-full bg-slate-950 text-slate-400 border border-slate-800 text-[10px]">
              {modestyAudit.neckline} neck
            </span>
            <span className="px-2 py-0.5 rounded-full bg-slate-950 text-slate-400 border border-slate-800 text-[10px]">
              {modestyAudit.sleeveLength}
            </span>
          </div>

          {isAiMode && warnings.length > 0 && (
            <div className="mt-2 p-2 rounded-xl bg-rose-950/40 border border-rose-900/60 text-[11px] text-rose-300">
              <span className="line-clamp-1">{warnings[0]}</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2">
          <button
            onClick={() => onOpenAuditModal(product)}
            className="flex-1 px-3 py-2 rounded-full bg-slate-950 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold tracking-wide transition-all text-center flex items-center justify-center gap-1"
          >
            <Eye className="w-3.5 h-3.5 text-slate-400" />
            <span>view item</span>
          </button>

          <button
            onClick={() => onAddToHamper(product)}
            className={`flex-1 px-3 py-2 rounded-full text-xs font-bold tracking-wide transition-all text-center flex items-center justify-center gap-1 shadow-md ${
              isInHamper
                ? 'bg-purple-950 text-purple-300 border border-purple-700'
                : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-purple-950/60 hover:scale-105 active:scale-95'
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
