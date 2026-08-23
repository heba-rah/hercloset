'use client';

import React from 'react';
import { Tag, Store, Sparkles, Layers, Users } from 'lucide-react';
import { TargetDemographic } from '@/types/product';

interface ClosetTopShelfProps {
  selectedOccasion: string;
  onSelectOccasion: (occasion: string) => void;
  selectedStore: string;
  onSelectStore: (store: string) => void;
  selectedSubcategory?: string;
  onSelectSubcategory?: (sub: string) => void;
  targetDemographic?: TargetDemographic;
  onSelectDemographic?: (demo: TargetDemographic) => void;
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
  targetDemographic = 'all',
  onSelectDemographic,
  passingItemsCount,
  totalItemsCount,
  hasActiveFilters = false
}) => {
  const demographics: { id: TargetDemographic; label: string }[] = [
    { id: 'all', label: 'All Demographics' },
    { id: 'women', label: 'Women' },
    { id: 'men', label: 'Men' },
    { id: 'girls', label: 'Girls (Kids & Teens)' },
    { id: 'boys', label: 'Boys (Kids & Teens)' },
    { id: 'kids', label: 'All Kids (Girls & Boys)' },
  ];

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
        text: 'text-emerald-700',
        badgeBg: 'bg-emerald-100 border-emerald-300 text-emerald-800',
        label: 'High Modesty'
      };
    }
    if (pct >= 35) {
      return {
        stroke: '#D97706',
        text: 'text-amber-700',
        badgeBg: 'bg-amber-100 border-amber-300 text-amber-800',
        label: 'Moderate Match'
      };
    }
    return {
      stroke: '#EA580C',
      text: 'text-orange-700',
      badgeBg: 'bg-orange-100 border-orange-300 text-orange-800',
      label: 'Strict Curation'
    };
  };

  const gaugeTheme = getGaugeColor(matchPercentage);

  // SVG Circular Gauge parameters
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (matchPercentage / 100) * circumference;

  return (
    <div className="w-full bg-[#EAE2D8] border-y-4 border-[#8A6B5D]/40 shadow-[inset_0_6px_12px_rgba(75,63,56,0.15)] py-4 px-4 md:px-8 border-t-[#8A6B5D] border-b-[#4B3F38]/20 my-4 space-y-4">

      {/* 4-Compartment Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center max-w-[1700px] mx-auto">

        {/* COMPARTMENT 1 — "WHO ARE WE SHOPPING FOR?" */}
        <div className="bg-[#FAF7F2] rounded-xl border border-[#D6CFCE] p-3.5 shadow-[0_4px_6px_rgba(75,63,56,0.08),inset_0_2px_4px_rgba(255,255,255,0.8)] flex flex-col items-center">
          <div className="w-8 h-1.5 bg-[#8A6B5D]/60 rounded-full mx-auto mb-1.5" />

          <div className="flex items-center gap-1.5 mb-1.5">
            <Users className="w-3.5 h-3.5 text-[#8A6B5D]" />
            <h3 className="text-[10px] font-bold tracking-[0.2em] text-[#8A6B5D] uppercase text-center">
              SHOPPING FOR
            </h3>
          </div>

          <select
            value={targetDemographic}
            onChange={(e) => onSelectDemographic && onSelectDemographic(e.target.value as TargetDemographic)}
            className="w-full bg-white border border-[#B89A8E]/60 rounded-lg px-3 py-2 text-xs font-bold text-[#4B3F38] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#8A6B5D] shadow-inner"
          >
            {demographics.map((demo) => (
              <option key={demo.id} value={demo.id}>
                {demo.label}
              </option>
            ))}
          </select>
        </div>

        {/* COMPARTMENT 2 — "OCCASION" */}
        <div className="bg-[#FAF7F2] rounded-xl border border-[#D6CFCE] p-3.5 shadow-[0_4px_6px_rgba(75,63,56,0.08),inset_0_2px_4px_rgba(255,255,255,0.8)] flex flex-col items-center">
          <div className="w-8 h-1.5 bg-[#8A6B5D]/60 rounded-full mx-auto mb-1.5" />

          <div className="flex items-center gap-1.5 mb-1.5">
            <Tag className="w-3.5 h-3.5 text-[#8A6B5D]" />
            <h3 className="text-[10px] font-bold tracking-[0.2em] text-[#8A6B5D] uppercase text-center">
              OCCASION
            </h3>
          </div>

          <select
            value={selectedOccasion}
            onChange={(e) => onSelectOccasion(e.target.value)}
            className="w-full bg-white border border-[#B89A8E]/60 rounded-lg px-3 py-2 text-xs font-bold text-[#4B3F38] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#8A6B5D] shadow-inner"
          >
            {occasions.map((occ) => (
              <option key={occ.id} value={occ.id}>
                {occ.label}
              </option>
            ))}
          </select>
        </div>

        {/* COMPARTMENT 3 — "LIVE MODESTY GAUGE" */}
        <div className="bg-[#FAF7F2]/90 border border-[#D6CFCE] rounded-xl p-3 shadow-sm flex items-center justify-center gap-3">
          {hasActiveFilters ? (
            <>
              <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 80 80">
                  <circle
                    cx="40"
                    cy="40"
                    r={radius}
                    className="stroke-[#D6CFCE]/50"
                    strokeWidth="5"
                    fill="transparent"
                  />
                  <circle
                    cx="40"
                    cy="40"
                    r={radius}
                    stroke={gaugeTheme.stroke}
                    strokeWidth="5"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    fill="transparent"
                    className="transition-all duration-700 ease-out"
                  />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className={`text-base font-extrabold font-mono ${gaugeTheme.text}`}>
                    {matchPercentage}%
                  </span>
                </div>
              </div>

              <div className="space-y-0.5 min-w-0">
                <div className="flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#8A6B5D]" />
                  <span className="font-serif italic text-base font-bold text-[#4B3F38] truncate">
                    Modest Match
                  </span>
                </div>

                <div className={`inline-block px-2 py-0.5 rounded-full text-[9px] font-extrabold border ${gaugeTheme.badgeBg}`}>
                  {gaugeTheme.label}
                </div>

                <p className="text-[10px] text-[#8A6B5D] font-semibold truncate">
                  {passingItemsCount} of {totalItemsCount} items pass
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="w-16 h-16 rounded-full border-2 border-dashed border-[#D6CFCE] flex items-center justify-center shrink-0 bg-[#F2EDE6]/40">
                <span className="text-lg font-bold font-mono text-[#8A6B5D]">—</span>
              </div>

              <div className="space-y-0.5 min-w-0">
                <div className="flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#8A6B5D]/60" />
                  <span className="font-serif italic text-base font-bold text-[#4B3F38] truncate">
                    Modest Match
                  </span>
                </div>

                <div className="inline-block px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-[#EAE4DC] text-[#7A5C4D] border border-[#D6CFCE]/60">
                  No Filters Set
                </div>

                <p className="text-[10px] text-[#8A6B5D] font-semibold truncate">
                  Showing {totalItemsCount} items
                </p>
              </div>
            </>
          )}
        </div>

        {/* COMPARTMENT 4 — "STORES" */}
        <div className="bg-[#FAF7F2] rounded-xl border border-[#D6CFCE] p-3.5 shadow-[0_4px_6px_rgba(75,63,56,0.08),inset_0_2px_4px_rgba(255,255,255,0.8)] flex flex-col items-center">
          <div className="w-8 h-1.5 bg-[#8A6B5D]/60 rounded-full mx-auto mb-1.5" />

          <div className="flex items-center gap-1.5 mb-1.5">
            <Store className="w-3.5 h-3.5 text-[#8A6B5D]" />
            <h3 className="text-[10px] font-bold tracking-[0.2em] text-[#8A6B5D] uppercase text-center">
              STORES
            </h3>
          </div>

          <select
            value={selectedStore}
            onChange={(e) => onSelectStore(e.target.value)}
            className="w-full bg-white border border-[#B89A8E]/60 rounded-lg px-3 py-2 text-xs font-bold text-[#4B3F38] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#8A6B5D] shadow-inner"
          >
            {stores.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* SUBCATEGORY QUICK-FILTER BANNER */}
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
