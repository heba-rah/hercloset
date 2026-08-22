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
    ? 'bg-rose-950/90 text-rose-300 border-rose-800 shadow-rose-950/40'
    : isHighMatch
      ? 'bg-emerald-950/90 text-emerald-300 border-emerald-700 shadow-emerald-950/40'
      : 'bg-amber-950/90 text-amber-300 border-amber-800 shadow-amber-950/40';

  const displayPrice = typeof product.price === 'string' && product.price.startsWith('$')
    ? product.price
    : `$${product.price}`;

  return (
    <div className="group relative bg-slate-900/90 border border-slate-800/80 hover:border-slate-700 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col">
      
      {/* Garment Image & Overlay Badges */}
      <div className="relative aspect-[3/4] w-full bg-slate-950 overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
          {/* Retailer Store Badge */}
          <span className="px-2.5 py-1 rounded-lg bg-slate-950/90 backdrop-blur-md text-[11px] font-extrabold text-slate-100 border border-slate-700 shadow-md uppercase tracking-wider flex items-center gap-1">
            <ShoppingBag className="w-3 h-3 text-purple-400" />
            {product.brand}
          </span>

          {/* Modesty Match % Badge */}
          <div className={`flex items-center gap-1.5 px-3 py-1 rounded-xl backdrop-blur-md text-xs font-bold border shadow-lg ${badgeBg}`}>
            {passedFilters ? (
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
            )}
            <span>{matchPercentage}% Match</span>
          </div>
        </div>

        {/* Bottom Image AI Feature Badges */}
        <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1">
          {modestyAudit.hasSlit && (
            <span className="px-2 py-0.5 rounded-md bg-rose-950/90 text-rose-300 border border-rose-800 text-[10px] font-bold shadow-md flex items-center gap-1">
              <AlertTriangle className="w-3 h-3 text-rose-400" /> Leg Slit
            </span>
          )}
          {modestyAudit.isOpenBack && (
            <span className="px-2 py-0.5 rounded-md bg-rose-950/90 text-rose-300 border border-rose-800 text-[10px] font-bold shadow-md flex items-center gap-1">
              <AlertTriangle className="w-3 h-3 text-rose-400" /> Open Back
            </span>
          )}
          {modestyAudit.isSheer && (
            <span className="px-2 py-0.5 rounded-md bg-amber-950/90 text-amber-300 border border-amber-800 text-[10px] font-bold shadow-md flex items-center gap-1">
              <Eye className="w-3 h-3 text-amber-400" /> Sheer Fabric
            </span>
          )}
          {!modestyAudit.hasSlit && !modestyAudit.isOpenBack && !modestyAudit.isSheer && (
            <span className="px-2 py-0.5 rounded-md bg-emerald-950/90 text-emerald-300 border border-emerald-800 text-[10px] font-bold shadow-md flex items-center gap-1">
              <Check className="w-3 h-3 text-emerald-400" /> 100% Modest Coverage
            </span>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Title & Price */}
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-sm text-slate-100 line-clamp-2 leading-snug group-hover:text-emerald-300 transition-colors">
              {product.name}
            </h3>
            <div className="text-right shrink-0">
              <span className="font-bold text-base text-slate-100">{displayPrice}</span>
            </div>
          </div>

          {/* Key Attributes & Occasion */}
          <div className="flex flex-wrap gap-1.5 mt-2.5">
            {product.occasion && (
              <span className="px-2 py-0.5 rounded-md bg-slate-950 text-emerald-300 border border-slate-800 text-[10px] font-semibold uppercase">
                {product.occasion}
              </span>
            )}
            <span className="px-2 py-0.5 rounded-md bg-slate-950 text-slate-300 border border-slate-800 text-[10px] font-medium">
              Neck: {modestyAudit.neckline.toUpperCase()}
            </span>
            <span className="px-2 py-0.5 rounded-md bg-slate-950 text-slate-300 border border-slate-800 text-[10px] font-medium">
              Sleeve: {modestyAudit.sleeveLength}
            </span>
            <span className="px-2 py-0.5 rounded-md bg-slate-950 text-slate-300 border border-slate-800 text-[10px] font-medium">
              Hem: {modestyAudit.hemline}
            </span>
          </div>

          {/* Warnings in AI mode */}
          {isAiMode && warnings.length > 0 && (
            <div className="mt-2.5 p-2 rounded-lg bg-rose-950/40 border border-rose-900/60 text-[11px] text-rose-300 space-y-0.5">
              {warnings.slice(0, 2).map((w, idx) => (
                <div key={idx} className="flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-rose-400 shrink-0" />
                  <span className="line-clamp-1">{w}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="pt-2 border-t border-slate-800/80 grid grid-cols-2 gap-2">
          {/* Primary CTA: Direct Purchase at Retailer */}
          <a
            href={product.originalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="col-span-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-slate-950 font-extrabold text-xs transition-all shadow-md hover:scale-105 active:scale-95"
          >
            <span>Buy at {product.brand}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          {/* Secondary CTA: View AI Audit */}
          <button
            onClick={() => onOpenAuditModal(product)}
            className="col-span-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-200 hover:text-white text-xs font-semibold transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>AI Audit</span>
          </button>
        </div>

      </div>

    </div>
  );
};
