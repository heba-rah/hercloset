'use client';

import React from 'react';
import { Sparkles, SlidersHorizontal } from 'lucide-react';

interface ModestyStylistAvatarProps {
  onOpenFilters: () => void;
  activeFilterCount?: number;
  userName?: string;
}

export const ModestyStylistAvatar: React.FC<ModestyStylistAvatarProps> = ({
  onOpenFilters,
  activeFilterCount = 0,
  userName = "Amina"
}) => {
  return (
    <div className="break-inside-avoid mb-4 inline-flex flex-col items-center justify-between w-full p-4 rounded-3xl bg-[#FAF7F2] border border-[#D6CFCE] shadow-sm hover:shadow-md transition-all">
      
      {/* 1. Sims-Style Floating Nameplate Pill */}
      <div className="w-full flex justify-center mb-3">
        <div className="bg-[#F2EDE6] border border-[#D6CFCE] px-3.5 py-1.5 rounded-full shadow-xs flex items-center gap-2 max-w-full">
          {/* Glowing Gem Sparkle Icon */}
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse shrink-0" />
          <span className="font-serif italic font-bold text-xs text-[#4B3F38] truncate">
            {userName}&apos;s Stylist
          </span>
          <span className="text-[10px] text-[#8A6B5D] font-sans font-medium shrink-0">
            • Modesty: Custom
          </span>
        </div>
      </div>

      {/* 2. Standalone Transparent PNG Avatar Display */}
      <div className="relative w-full flex flex-col items-center justify-center my-2 group min-h-[260px]">
        {/* Soft Radial Ambient Spotlight Glow */}
        <div className="absolute inset-0 bg-radial from-[#B89A8E]/15 via-transparent to-transparent blur-xl pointer-events-none" />
        
        {/* Transparent Avatar Graphic Image with Fallback */}
        <img
          src="/avatar.png"
          alt="Virtual Modesty Stylist Avatar"
          className="max-h-[300px] w-auto object-contain z-10 drop-shadow-md transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            // Fallback placeholder if avatar.png is not found
            e.currentTarget.style.display = 'none';
            const parent = e.currentTarget.parentElement;
            if (parent) {
              const fallback = parent.querySelector('.avatar-fallback');
              if (fallback) fallback.classList.remove('hidden');
            }
          }}
        />

        {/* Fallback Vector Silhouette Avatar */}
        <div className="avatar-fallback hidden flex-col items-center justify-center text-center p-6 bg-[#F2EDE6] rounded-2xl border border-[#D6CFCE] z-10 w-full">
          <div className="w-20 h-20 rounded-full bg-[#FAF7F2] border border-[#B89A8E] flex items-center justify-center shadow-inner mb-2">
            <Sparkles className="w-10 h-10 text-[#8A6B5D]" />
          </div>
          <span className="font-serif italic font-bold text-sm text-[#4B3F38]">
            Virtual Closet Persona
          </span>
          <span className="text-[11px] text-[#8A6B5D] mt-1 font-sans">
            Transparent PNG ready
          </span>
        </div>
      </div>

      {/* 3. Bottom of Tile: RESTYLED "Adjust Filters for This Session" BUTTON MATCHING DARK ESPRESSO BANNER TONE */}
      <div className="w-full mt-2 pt-2 border-t border-[#D6CFCE]/60">
        <button
          onClick={onOpenFilters}
          className="w-full py-2.5 px-3 bg-[#181311] hover:bg-[#241D1A] text-[#FAF7F2] border border-[#4B3F38]/60 shadow-sm transition-all duration-200 text-xs font-semibold rounded-xl text-center flex items-center justify-center gap-1.5 cursor-pointer font-sans"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Adjust Filters for This Session</span>
          {activeFilterCount > 0 && (
            <span className="px-1.5 py-0.5 rounded-full bg-[#8A6B5D] text-white font-mono text-[10px] font-bold">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

    </div>
  );
};
