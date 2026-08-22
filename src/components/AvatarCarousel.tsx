'use client';

import React, { useState } from 'react';
import { Scissors, Layers } from 'lucide-react';
import { ModestyProfile } from '@/types/product';

interface AvatarCarouselProps {
  profile: ModestyProfile;
  onChangeProfile: (updated: Partial<ModestyProfile>) => void;
}

export const AvatarCarousel: React.FC<AvatarCarouselProps> = ({
  profile,
  onChangeProfile
}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <div className="space-y-4 font-sans">
      
      {/* WARM GREETING HEADER */}
      <div className="text-center">
        <h3 className="text-2xl font-serif italic text-[#3D312A] text-center mb-1 font-bold">
          Hey Beautiful
        </h3>
        <p className="text-xs text-[#8A6B5D] text-center mb-4 font-medium">
          Your Modesty Stylist &amp; Custom Coverage Rules
        </p>
      </div>

      {/* FREESTANDING AVATAR STAGE (NO CARDS, NO ARROWS, NO PILL) */}
      <div className="flex flex-col items-center justify-center my-2">
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative flex flex-col items-center group cursor-pointer transition-transform duration-300 hover:scale-105"
        >
          {/* ENLARGED AVATAR (w-[200px] h-[200px]) */}
          <img
            src={isHovered ? '/avatars/default.gif' : '/avatars/default.png'}
            alt="Modesty Stylist Avatar"
            className="w-[200px] h-[200px] object-contain drop-shadow-xl [image-rendering:pixelated]"
          />

          {/* SUBTLE SOFT FOOT SHADOW */}
          <div className="w-28 h-3 bg-black/10 rounded-[100%] blur-[2px] mx-auto mt-[-8px]" />
        </div>
      </div>

      {/* 
        SECONDARY TOGGLES: SLITS & SHEER/OPACITY 
      */}
      <div className="grid grid-cols-2 gap-3 pt-2">
        
        {/* Slits Toggle */}
        <div className="p-3 rounded-xl bg-white border border-[#D6CFCE] space-y-1.5 shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A6B5D] flex items-center gap-1">
            <Scissors className="w-3.5 h-3.5 text-rose-600" /> Thigh Slits
          </span>
          <div className="grid grid-cols-2 gap-1">
            <button
              type="button"
              onClick={() => onChangeProfile({ noSlits: true })}
              className={`py-1.5 px-2 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                profile.noSlits
                  ? 'bg-[#3D312A] text-[#FAF7F2] shadow-xs'
                  : 'bg-[#F2EDE6] text-[#3D312A] hover:bg-[#FAF7F2]'
              }`}
            >
              No Slits
            </button>

            <button
              type="button"
              onClick={() => onChangeProfile({ noSlits: false })}
              className={`py-1.5 px-2 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                !profile.noSlits
                  ? 'bg-[#3D312A] text-[#FAF7F2] shadow-xs'
                  : 'bg-[#F2EDE6] text-[#3D312A] hover:bg-[#FAF7F2]'
              }`}
            >
              Slits Fine
            </button>
          </div>
        </div>

        {/* Sheer / Opacity Toggle */}
        <div className="p-3 rounded-xl bg-white border border-[#D6CFCE] space-y-1.5 shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A6B5D] flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-[#8A6B5D]" /> Opacity
          </span>
          <div className="grid grid-cols-2 gap-1">
            <button
              type="button"
              onClick={() => onChangeProfile({ isOpaque: true })}
              className={`py-1.5 px-2 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                profile.isOpaque
                  ? 'bg-[#3D312A] text-[#FAF7F2] shadow-xs'
                  : 'bg-[#F2EDE6] text-[#3D312A] hover:bg-[#FAF7F2]'
              }`}
            >
              Opaque
            </button>

            <button
              type="button"
              onClick={() => onChangeProfile({ isOpaque: false })}
              className={`py-1.5 px-2 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                !profile.isOpaque
                  ? 'bg-[#3D312A] text-[#FAF7F2] shadow-xs'
                  : 'bg-[#F2EDE6] text-[#3D312A] hover:bg-[#FAF7F2]'
              }`}
            >
              Sheer Fine
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
