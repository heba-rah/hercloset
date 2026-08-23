'use client';

import React, { useState } from 'react';

interface ModestyStylistAvatarProps {
  onOpenFilters: () => void;
  activeFilterCount?: number;
  userName?: string;
}

export const ModestyStylistAvatar: React.FC<ModestyStylistAvatarProps> = ({
  onOpenFilters,
  userName
}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Extract first name cleanly or fallback to "A Beautiful Guest" for guest shoppers
  const displayName = userName && userName.trim() !== '' && !/^guest$/i.test(userName.trim())
    ? userName.split(' ')[0]
    : 'A Beautiful Guest';

  return (
    <div className="break-inside-avoid mb-4 inline-block w-full font-sans bg-transparent p-2">

      {/* Inner flex column for borderless tile items */}
      <div className="flex flex-col items-center justify-between w-full h-full space-y-3">
        
        {/* Top of Tile: Borderless Floating Name Typography */}
        <h3 className="text-xl md:text-2xl font-serif italic text-[#3D312A] text-center tracking-wide mb-2 font-bold">
          {displayName}
        </h3>

        {/* Middle of Tile: Interactive Freestanding Persona Avatar with Hover Animation & Foot Shadow */}
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative flex flex-col items-center group cursor-pointer transition-transform duration-300 hover:scale-105 my-2"
        >
          {/* Crisp Avatar Display */}
          <img
            src={isHovered ? '/avatars/default.gif' : '/avatars/default.png'}
            alt={`${displayName}'s Modesty Stylist Avatar`}
            className="w-[160px] h-[160px] md:w-[190px] md:h-[190px] object-contain drop-shadow-xl [image-rendering:pixelated] mx-auto"
          />

          {/* Soft Ground Contact Shadow */}
          <div className="w-28 h-3 bg-black/10 rounded-[100%] blur-[2px] mx-auto mt-[-8px]" />
        </div>

        {/* Bottom of Tile: Clean Dark Mocha Brown Adjust Filters Session Button */}
        <button
          type="button"
          onClick={onOpenFilters}
          className="w-full bg-[#7A5C4D] hover:bg-[#684C3F] text-[#FAF7F2] py-3 px-5 rounded-2xl text-xs font-semibold tracking-wide text-center transition-all shadow-sm cursor-pointer active:scale-95"
        >
          <span>Adjust Filters for This Session</span>
        </button>

      </div>

    </div>
  );
};
