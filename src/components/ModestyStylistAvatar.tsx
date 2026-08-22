'use client';

import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

interface ModestyStylistAvatarProps {
  onOpenFilters: () => void;
  activeFilterCount: number;
  userName?: string;
}

export const ModestyStylistAvatar: React.FC<ModestyStylistAvatarProps> = ({
  onOpenFilters,
  activeFilterCount,
  userName = 'Amina'
}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Extract first name cleanly
  const firstName = userName ? userName.split(' ')[0] : 'Amina';

  return (
    <div className="break-inside-avoid mb-4 inline-block w-full font-sans bg-transparent p-2">

      {/* Inner flex column for borderless tile items */}
      <div className="flex flex-col items-center justify-between w-full h-full space-y-3">
        
        {/* Top of Tile: Clean Rectangular Name Tag (Display ONLY Account Name) */}
        <div className="px-4 py-1.5 rounded-lg bg-[#FAF7F2] border border-[#D6CFCE]/80 shadow-xs inline-flex items-center justify-center my-1">
          <span className="text-sm font-serif italic font-medium text-[#3D312A] tracking-wide">
            {firstName}
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
            alt={`${firstName}'s Modesty Stylist Avatar`}
            className="w-[160px] h-[160px] md:w-[190px] md:h-[190px] object-contain drop-shadow-xl [image-rendering:pixelated] mx-auto"
          />

          {/* Soft Ground Contact Shadow */}
          <div className="w-28 h-3 bg-black/10 rounded-[100%] blur-[2px] mx-auto mt-[-8px]" />
        </div>

        {/* Bottom of Tile: Warm Dark Mocha Brown Adjust Filters Session Button */}
        <button
          type="button"
          onClick={onOpenFilters}
          className="w-full bg-[#7A5C4D] hover:bg-[#684C3F] text-[#FAF7F2] py-2.5 px-4 rounded-xl text-xs font-semibold shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 group mt-2"
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
