'use client';

import React from 'react';
import { Tag, Store, Sparkles, Layers } from 'lucide-react';

interface ClosetTopShelfProps {
  selectedOccasion: string;
  onSelectOccasion: (occasion: string) => void;
  selectedStore: string;
  onSelectStore: (store: string) => void;
  selectedSubcategory?: string;
  onSelectSubcategory?: (sub: string) => void;
  passingItemsCount: number;
  totalItemsCount: number;
  hasActiveFilters?: boolean;
}

export const ClosetTopShelf: React.FC<ClosetTopShelfProps> = ({
  selectedOccasion,
  onSelectOccasion,
  selectedStore,
  onSelectStore,
  selectedSubcategory = 'All Types',
  onSelectSubcategory,
  passingItemsCount,
  totalItemsCount,
  hasActiveFilters = false
}) => {
  const occasions = [
    { id: 'all', label: 'All Occasions' },
    { id: 'everyday', label: 'Everyday Wear' },
    { id: 'gymwear', label: 'Gymwear' },
    { id: 'sleepwear', label: 'Sleepwear' },
    { id: 'undergarments', label: 'Undergarments' },
    { id: 'going_out', label: 'Going Out' },
  ];

  const stores = [
    { id: 'all', label: 'All Stores' },
    { id: 'urban planet', label: 'Urban Planet' },
    { id: 'ardene', label: 'Ardene' },
  ];

  const subcategories = [
    'All Types',
    'Tops & Blouses',
    'Sweaters & Hoodies',
    'Pants & Jeans',
    'Skirts & Dresses',
    'Jackets & Outerwear',
    'Shoes & Sandals',
    'Accessories'
  ];

  // Ratio Formula Calculation: passingItems / totalItems * 100
  const matchPercentage = totalItemsCount > 0 
    ? Math.round((passingItemsCount / totalItemsCount) * 100) 
    : 0;

  // Dynamic Rating & Color Badges based on Pass Rate
  const getGaugeColor = (pct: number) => {
    if (pct >= 70) {
      return {
        stroke: '#059669',
        text: 'text-[#059669]',
        badgeBg: 'bg-emerald-50 border-emerald-300 text-emerald-800',
        label: 'High Modesty'
      };
    }
    if (pct >= 30) {
      return {
        stroke: '#D97706',
        text: 'text-[#D97706]',
        badgeBg: 'bg-amber-50 border-amber-300 text-amber-800',
        label: 'Moderate Match'
      };
    }
    if (pct > 0) {
      return {
        stroke: '#7A5C4D',
        text: 'text-[#7A5C4D]',
        badgeBg: 'bg-[#EAE4DC] border-[#D6CFCE] text-[#7A5C4D]',
        label: 'Strict Curation'
      };
    }
    return {
      stroke: '#9CA3AF',
      text: 'text-[#9CA3AF]',
      badgeBg: 'bg-gray-100 border-gray-300 text-gray-700',
      label: 'No Matches'
    };
  };

  const gaugeTheme = getGaugeColor(matchPercentage);

  // SVG Circular Gauge parameters
  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (matchPercentage / 100) * circumference;

  return (
    <div className="w-full bg-[#EAE2D8] border-y-4 border-[#8A6B5D]/40 shadow-[inset_0_6px_12px_rgba(75,63,56,0.15)] py-4 px-4 md:px-8 border-t-[#8A6B5D] border-b-[#4B3F38]/20 my-4 space-y-4">

      {/* 3-Compartment Layout */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 items-center max-w-[1700px] mx-auto">

        {/* LEFT COMPARTMENT — "OCCASION" STORAGE BASKET/BIN */}
        <div className="bg-[#FAF7F2] rounded-xl border border-[#D6CFCE] p-4 shadow-[0_4px_6px_rgba(75,63,56,0.08),inset_0_2px_4px_rgba(255,255,255,0.8)] flex flex-col items-center">
          {/* Top Detail: Small Leather/Wood Handle Icon */}
          <div className="w-8 h-1.5 bg-[#8A6B5D]/60 rounded-full mx-auto mb-2" />

          <div className="flex items-center gap-1.5 mb-2">
            <Tag className="w-3.5 h-3.5 text-[#8A6B5D]" />
            <h3 className="text-[11px] font-bold tracking-[0.25em] text-[#8A6B5D] uppercase text-center">
              OCCASION
            </h3>
          </div>

          {/* Inset Select Box */}
          <select
            value={selectedOccasion}
            onChange={(e) => onSelectOccasion(e.target.value)}
            className="w-full bg-white border border-[#B89A8E]/60 rounded-lg px-3.5 py-2 text-xs font-bold text-[#4B3F38] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#8A6B5D] shadow-inner"
          >
            {occasions.map((occ) => (
              <option key={occ.id} value={occ.id}>
                {occ.label}
              </option>
            ))}
          </select>
        </div>

        {/* CENTER COMPARTMENT — "LIVE MODESTY GAUGE" (WITH GUEST EMPTY STATE) */}
        <div className="bg-[#FAF7F2]/80 border border-[#D6CFCE] rounded-xl p-3 sm:px-6 shadow-sm flex items-center justify-center gap-4">

          {hasActiveFilters ? (
            /* ACTIVE FILTER STATE WITH LIVE RADIAL PROGRESS RING */
            <>
              <div className="relative w-20 h-20 flex items-center justify-center shrink-0">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 90 90">
                  <circle
                    cx="45"
                    cy="45"
                    r={radius}
                    className="stroke-[#D6CFCE]/50"
                    strokeWidth="6"
                    fill="transparent"
                  />
                  <circle
                    cx="45"
                    cy="45"
                    r={radius}
                    stroke={gaugeTheme.stroke}
                    strokeWidth="6"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    fill="transparent"
                    className="transition-all duration-700 ease-out"
                  />
                </svg>

                {/* Percentage Number Inside Circle */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className={`text-lg font-extrabold font-mono ${gaugeTheme.text}`}>
                    {matchPercentage}%
                  </span>
                </div>
              </div>

              {/* Focal Text & Label */}
              <div className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#8A6B5D]" />
                  <span className="font-serif italic text-lg font-bold text-[#4B3F38]">
                    Modest Match
                  </span>
                </div>

                <div className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${gaugeTheme.badgeBg}`}>
                  {gaugeTheme.label}
                </div>

                <p className="text-[11px] text-[#8A6B5D] font-semibold">
                  Live score across {passingItemsCount} of {totalItemsCount} items in this section
                </p>
              </div>
            </>
          ) : (
            /* GUEST / UNFILTERED EMPTY STATE WITH NEUTRAL DASHED TRACK */
            <>
              <div className="w-20 h-20 rounded-full border-2 border-dashed border-[#D6CFCE] flex items-center justify-center shrink-0 bg-[#F2EDE6]/40">
                <span className="text-xl font-bold font-mono text-[#8A6B5D]">—</span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#8A6B5D]/60" />
                  <span className="font-serif italic text-lg font-bold text-[#4B3F38]">
                    Modest Match
                  </span>
                </div>

                <div className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#EAE4DC] text-[#7A5C4D] border border-[#D6CFCE]/60">
                  No Filters Set
                </div>

                <p className="text-[11px] text-[#8A6B5D] font-semibold">
                  Showing all {totalItemsCount} items in this section
                </p>
              </div>
            </>
          )}

        </div>

        {/* RIGHT COMPARTMENT — "STORES" STORAGE BASKET/BIN */}
        <div className="bg-[#FAF7F2] rounded-xl border border-[#D6CFCE] p-4 shadow-[0_4px_6px_rgba(75,63,56,0.08),inset_0_2px_4px_rgba(255,255,255,0.8)] flex flex-col items-center">
          {/* Top Detail: Small Leather/Wood Handle Icon */}
          <div className="w-8 h-1.5 bg-[#8A6B5D]/60 rounded-full mx-auto mb-2" />

          <div className="flex items-center gap-1.5 mb-2">
            <Store className="w-3.5 h-3.5 text-[#8A6B5D]" />
            <h3 className="text-[11px] font-bold tracking-[0.25em] text-[#8A6B5D] uppercase text-center">
              STORES
            </h3>
          </div>

          {/* Inset Select Box */}
          <select
            value={selectedStore}
            onChange={(e) => onSelectStore(e.target.value)}
            className="w-full bg-white border border-[#B89A8E]/60 rounded-lg px-3.5 py-2 text-xs font-bold text-[#4B3F38] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#8A6B5D] shadow-inner"
          >
            {stores.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* SUBCATEGORY QUICK-FILTER BANNER (Placed Directly Below Occasion Selector) */}
      <div className="max-w-[1700px] mx-auto pt-3 border-t border-[#D6CFCE]/40">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <div className="flex items-center gap-1 text-[11px] font-bold text-[#8A6B5D] uppercase tracking-wider shrink-0 mr-1">
            <Layers className="w-3.5 h-3.5" />
            <span>Category:</span>
          </div>
          {subcategories.map((sub) => {
            const isSelected = (!selectedSubcategory && sub === 'All Types') || selectedSubcategory === sub;
            return (
              <button
                key={sub}
                type="button"
                onClick={() => onSelectSubcategory && onSelectSubcategory(sub)}
                className={
                  isSelected
                    ? 'bg-[#7A5C4D] text-[#FAF7F2] px-4 py-1.5 rounded-full text-xs font-semibold shadow-sm transition-all shrink-0 cursor-pointer'
                    : 'bg-[#FAF7F2] text-[#5C4A42] border border-[#D6CFCE]/70 px-4 py-1.5 rounded-full text-xs hover:bg-[#EAE4DC] transition-all shrink-0 cursor-pointer'
                }
              >
                {sub}
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
};
