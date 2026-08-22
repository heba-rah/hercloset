'use client';

import React, { useState } from 'react';
import { Sparkles, SlidersHorizontal } from 'lucide-react';

interface ModestyStylistAvatarProps {
  onOpenFilters: () => void;
  activeFilterCount: number;
}

export const ModestyStylistAvatar: React.FC<ModestyStylistAvatarProps> = ({
  onOpenFilters,
  activeFilterCount
}) => {
  const [imgError, setImgError] = useState<boolean>(false);

  return (
    <div className="w-72 shrink-0 sticky top-24 self-start flex flex-col items-center gap-3 hidden md:flex">
      
      {/* 1. TOP SIMS-STYLE NAME CARD / PLUMBOB */}
      <div className="bg-[#FAF7F2] border border-[#D6CFCE] px-4 py-1.5 rounded-full shadow-sm flex items-center gap-2 text-center">
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
        <div className="flex items-center gap-1.5">
          <span className="font-serif italic text-xs font-bold text-[#4B3F38]">
            Amina&apos;s Stylist
          </span>
          <span className="text-[10px] text-[#8A6B5D] font-mono font-medium">
            (Modesty: Custom)
          </span>
        </div>
      </div>

      {/* 2. AVATAR STANDALONE TRANSPARENT CUTOUT (No White Box Card) */}
      <div className="w-full flex items-center justify-center py-2 relative group">
        {!imgError ? (
          <img
            src="/avatar.png"
            alt="Stylist Avatar"
            onError={() => setImgError(true)}
            className="w-full h-auto object-contain drop-shadow-md max-h-[380px] transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          /* High-Fashion Transparent SVG Mannequin Fallback */
          <div className="w-full h-72 flex flex-col items-center justify-center p-4 text-[#8A6B5D] space-y-2">
            <svg
              viewBox="0 0 100 160"
              className="w-40 h-56 stroke-[#8A6B5D] fill-none stroke-[1.8] drop-shadow-sm"
            >
              {/* Turban/Hijab Silhouette Outline */}
              <path d="M 50 15 C 38 15, 30 25, 30 38 C 30 50, 40 54, 50 54 C 60 54, 70 50, 70 38 C 70 25, 62 15, 50 15 Z" fill="#FAF7F2" stroke="#8A6B5D" strokeWidth="1.8" />
              <path d="M 32 30 C 45 20, 55 20, 68 30" />
              <path d="M 30 38 C 45 42, 55 42, 70 38" />

              {/* Elegant Neck & Shoulders */}
              <path d="M 45 54 L 45 64 C 32 68, 22 76, 18 90 L 18 150" />
              <path d="M 55 54 L 55 64 C 68 68, 78 76, 82 90 L 82 150" />

              {/* Modest Long Dress Lines */}
              <path d="M 35 90 C 45 100, 55 100, 65 90" />
              <path d="M 24 120 L 76 120" strokeDasharray="3 3" />
              <path d="M 18 150 L 82 150" />

              <circle cx="50" cy="35" r="2.5" fill="#8A6B5D" />
            </svg>
            <span className="text-[10px] text-[#8A6B5D] font-mono italic">
              (Drop avatar.png into /public)
            </span>
          </div>
        )}
      </div>

      {/* 3. BOTTOM "UPDATE SHOPPING PREFERENCES" BUTTON */}
      <button
        onClick={onOpenFilters}
        className="w-full bg-[#8A6B5D] hover:bg-[#6e5346] text-[#FAF7F2] font-sans text-xs font-semibold py-2.5 px-4 rounded-xl shadow-sm transition-all text-center cursor-pointer flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
      >
        <Sparkles className="w-4 h-4 text-[#FAF7F2]" />
        <span>Update Shopping Preferences</span>
        {activeFilterCount > 0 && (
          <span className="px-2 py-0.5 rounded-full bg-[#FAF7F2] text-[#8A6B5D] font-mono text-[10px] font-bold">
            {activeFilterCount}
          </span>
        )}
      </button>

    </div>
  );
};
