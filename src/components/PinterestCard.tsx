'use client';

import React, { useState } from 'react';
import { ShieldCheck, AlertTriangle, ExternalLink, Eye, BookmarkCheck, Bookmark } from 'lucide-react';
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

  return (
    <div className="break-inside-avoid mb-4 group relative rounded-2xl overflow-hidden transition-all duration-300 flex flex-col bg-transparent">
      
      {/* GARMENT IMAGE & HOVER OVERLAY CONTAINER */}
      <div className="relative w-full rounded-2xl overflow-hidden bg-[#FAF7F2] dark:bg-[#2D2522] border border-[#D6CFCE]/60 dark:border-[#443732]/60 shadow-sm group-hover:shadow-xl transition-all duration-300">
        <img
          src={imgSrc}
          alt={product.name}
          onError={handleImageError}
          className="w-full h-auto object-cover object-center group-hover:scale-105 transition-transform duration-500 block"
        />

        {/* PINTEREST-STYLE HOVER OVERLAY (Translucent dark backdrop on hover) */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-between p-3 pointer-events-none group-hover:pointer-events-auto">
          
          {/* TOP HOVER BAR: Modesty Badge (Left) + Pinterest Save Pill (Right) */}
          <div className="flex items-center justify-between gap-2">
            {/* Top-Left: Modesty Match Badge */}
            <div className={`px-2.5 py-1 rounded-full text-[11px] font-bold backdrop-blur-md border shadow-md flex items-center gap-1 ${
              !passedFilters || matchPercentage < 70
                ? 'bg-rose-900/90 text-rose-100 border-rose-700'
                : isHighMatch
                  ? 'bg-emerald-900/90 text-emerald-100 border-emerald-700'
                  : 'bg-amber-900/90 text-amber-100 border-amber-700'
            }`}>
              {passedFilters ? <ShieldCheck className="w-3 h-3 text-emerald-300" /> : <AlertTriangle className="w-3 h-3 text-rose-300" />}
              <span>{matchPercentage}% Match</span>
            </div>

            {/* Top-Right: Pinterest Red "Save to Hamper" Pill Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddToHamper(product);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shadow-lg flex items-center gap-1 ${
                isInHamper
                  ? 'bg-slate-900 text-white border border-slate-700'
                  : 'bg-[#E60023] hover:bg-[#AD001B] text-white'
              }`}
            >
              {isInHamper ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
              <span>{isInHamper ? 'Saved' : 'Save'}</span>
            </button>
          </div>

          {/* BOTTOM HOVER BAR: Action Buttons Overlay */}
          <div className="space-y-2">
            {/* Warning callout on hover if failed rules */}
            {!passedFilters && modestyAudit.hasSlit && (
              <span className="px-2.5 py-1 rounded-md bg-rose-950/90 text-rose-200 border border-rose-800 text-[10px] font-bold block backdrop-blur-md">
                🚨 Leg Slit Detected
              </span>
            )}
            {!passedFilters && modestyAudit.isOpenBack && (
              <span className="px-2.5 py-1 rounded-md bg-rose-950/90 text-rose-200 border border-rose-800 text-[10px] font-bold block backdrop-blur-md">
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
      <div className="mt-2 px-1 flex items-start justify-between gap-2 text-[#4B3F38] dark:text-[#F2EDE6]">
        <div className="min-w-0">
          <span className="text-[10px] font-bold text-[#8A6B5D] dark:text-[#C4A497] uppercase tracking-wider block">
            {product.brand}
          </span>
          <h4 className="text-xs font-semibold text-[#4B3F38] dark:text-[#F2EDE6] truncate leading-tight mt-0.5">
            {product.name}
          </h4>
        </div>
        <span className="text-xs font-bold text-[#8A6B5D] dark:text-[#C4A497] shrink-0 mt-0.5">{displayPrice}</span>
      </div>

    </div>
  );
};
