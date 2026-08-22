'use client';

import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

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
    <div className="break-inside-avoid mb-4 inline-flex flex-col items-center justify-between w-full p-4 rounded-3xl bg-[#FAF7F2]/80 border border-[#D6CFCE]/80 backdrop-blur-sm shadow-sm font-sans">
      
      {/* Top of Tile: Sims nameplate pill */}
      <div className="bg-[#FAF7F2] border border-[#D6CFCE] px-3.5 py-1.5 rounded-full shadow-sm flex items-center gap-1.5 text-center my-1">
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
        <span className="font-serif italic text-xs font-bold text-[#4B3F38]">
          Amina&apos;s Stylist
        </span>
        <span className="text-[10px] text-[#8A6B5D] font-mono font-semibold">
          • Modesty: Custom
        </span>
      </div>

      {/* Middle of Tile: Standalone Transparent Avatar Graphic */}
      <div className="w-full flex items-center justify-center my-2">
        {!imgError ? (
          <img
            src="/avatar.png"
            alt="Stylist Avatar"
            onError={() => setImgError(true)}
            className="w-full h-auto max-h-[320px] object-contain drop-shadow-sm transition-transform duration-300 hover:scale-105"
          />
        ) : (
          /* High-Fashion Transparent SVG Mannequin Fallback */
          <div className="w-full h-64 flex flex-col items-center justify-center p-2 text-[#8A6B5D] space-y-1">
            <svg
              viewBox="0 0 100 160"
              className="w-32 h-44 stroke-[#8A6B5D] fill-none stroke-[1.8] drop-shadow-sm"
            >
              <path d="M 50 15 C 38 15, 30 25, 30 38 C 30 50, 40 54, 50 54 C 60 54, 70 50, 70 38 C 70 25, 62 15, 50 15 Z" fill="#FAF7F2" stroke="#8A6B5D" strokeWidth="1.8" />
              <path d="M 32 30 C 45 20, 55 20, 68 30" />
              <path d="M 30 38 C 45 42, 55 42, 70 38" />

              <path d="M 45 54 L 45 64 C 32 68, 22 76, 18 90 L 18 150" />
              <path d="M 55 54 L 55 64 C 68 68, 78 76, 82 90 L 82 150" />

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

      {/* Bottom of Tile: Adjust Filters for This Session Button */}
      <button
        onClick={onOpenFilters}
        className="w-full py-2.5 px-3 bg-[#8A6B5D] hover:bg-[#6e5346] text-[#FAF7F2] text-xs font-semibold rounded-xl text-center shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
      >
        <Sparkles className="w-3.5 h-3.5 text-[#FAF7F2]" />
        <span>Adjust Filters for This Session</span>
        {activeFilterCount > 0 && (
          <span className="px-1.5 py-0.5 rounded-full bg-[#FAF7F2] text-[#8A6B5D] font-mono text-[10px] font-bold">
            {activeFilterCount}
          </span>
        )}
      </button>

    </div>
  );
};
