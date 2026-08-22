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
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <div className="break-inside-avoid mb-4 inline-block w-full font-sans bg-transparent p-2">

      {/* Inner flex column for borderless tile items */}
      <div className="flex flex-col items-center justify-between w-full h-full space-y-3">
        
        {/* Top of Tile: Status Nameplate Pill */}
        <div className="bg-[#FAF7F2] border border-[#D6CFCE] px-3.5 py-1.5 rounded-full shadow-sm flex items-center gap-1.5 text-center my-1">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
          <span className="font-serif italic text-xs font-bold text-[#3D312A]">
            Amina&apos;s Stylist
          </span>
          <span className="text-[10px] text-[#8A6B5D] font-mono font-semibold">
            • Modesty: Custom
          </span>
        </div>

        {/* Middle of Tile: Interactive Freestanding Persona Avatar with Hover Animation & Foot Shadow */}
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative flex flex-col items-center group cursor-pointer transition-transform duration-300 hover:scale-105 my-2"
        >
          {/* Crisp Avatar Display */}
          <img
            src={isHovered ? '/avatars/default.gif' : '/avatars/default.png'}
            alt="Amina's Modesty Stylist Avatar"
            className="w-[160px] h-[160px] md:w-[190px] md:h-[190px] object-contain drop-shadow-xl [image-rendering:pixelated] mx-auto"
          />

          {/* Soft Ground Contact Shadow */}
          <div className="w-28 h-3 bg-black/10 rounded-[100%] blur-[2px] mx-auto mt-[-8px]" />
        </div>

        {/* Bottom of Tile: Adjust Filters for This Session Pill Button */}
        <button
          type="button"
          onClick={onOpenFilters}
          className="w-full py-2.5 px-4 bg-[#3D312A] hover:bg-[#2A211B] text-[#FAF7F2] text-xs font-bold rounded-full text-center shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 group mt-2"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-200 group-hover:rotate-12 transition-transform" />
          <span>Adjust Filters for This Session</span>
          {activeFilterCount > 0 && (
            <span className="px-1.5 py-0.5 rounded-full bg-amber-200 text-[#3D312A] font-mono text-[10px] font-bold">
              {activeFilterCount}
            </span>
          )}
        </button>

      </div>

    </div>
  );
};
