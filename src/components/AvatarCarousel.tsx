'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Check, Sparkles, Scissors, EyeOff, Layers } from 'lucide-react';
import { ModestyProfile, Neckline, SleeveLength, Hemline } from '@/types/product';

export interface AvatarPreset {
  id: string;
  label: string;
  staticImg: string;
  gifImg: string;
  description: string;
  presets: {
    necklines: Neckline[];
    sleeveLengths: SleeveLength[];
    hemlines: Hemline[];
  };
}

export const AVATAR_PRESETS: AvatarPreset[] = [
  {
    id: 'default',
    label: 'Balanced Modest',
    staticImg: '/avatars/default.png',
    gifImg: '/avatars/default.gif',
    description: 'High/crew neck, wrist/3-4 sleeve, maxi/ankle coverage',
    presets: {
      necklines: ['high', 'crew'],
      sleeveLengths: ['wrist', '3/4'],
      hemlines: ['floor', 'ankle']
    }
  },
  {
    id: 'highneck',
    label: 'High Neck / Turtle',
    staticImg: '/avatars/highneck.png',
    gifImg: '/avatars/highneck.gif',
    description: 'Strict high mock neck and full wrist coverage',
    presets: {
      necklines: ['high'],
      sleeveLengths: ['wrist', '3/4'],
      hemlines: ['floor', 'ankle']
    }
  },
  {
    id: 'crewneck',
    label: 'Crewneck Only',
    staticImg: '/avatars/crewneck.png',
    gifImg: '/avatars/crewneck.gif',
    description: 'Modest crewneck tops with wrist & 3/4 sleeves',
    presets: {
      necklines: ['crew'],
      sleeveLengths: ['wrist', '3/4'],
      hemlines: ['floor', 'ankle']
    }
  },
  {
    id: 'long-sleeve',
    label: 'Long Sleeve Only',
    staticImg: '/avatars/long-sleeve.png',
    gifImg: '/avatars/long-sleeve.gif',
    description: '100% full-wrist long sleeve garments',
    presets: {
      necklines: ['high', 'crew'],
      sleeveLengths: ['wrist'],
      hemlines: ['floor', 'ankle']
    }
  },
  {
    id: 'short-sleeve',
    label: 'Short Sleeve Allowed',
    staticImg: '/avatars/short-sleeve.png',
    gifImg: '/avatars/short-sleeve.gif',
    description: 'Elbow, 3/4 & short sleeve options',
    presets: {
      necklines: ['high', 'crew', 'scoop'],
      sleeveLengths: ['elbow', '3/4', 'wrist'],
      hemlines: ['floor', 'ankle']
    }
  },
  {
    id: 'pants',
    label: 'Pants & Trousers',
    staticImg: '/avatars/pants.png',
    gifImg: '/avatars/pants.gif',
    description: 'Tailored trousers, wide leg & modesty pants',
    presets: {
      necklines: ['high', 'crew'],
      sleeveLengths: ['wrist', '3/4'],
      hemlines: ['ankle']
    }
  },
  {
    id: 'skirt',
    label: 'Maxi Skirts & Dresses',
    staticImg: '/avatars/skirt.png',
    gifImg: '/avatars/skirt.gif',
    description: 'Floor-length maxi dresses & flowing skirts',
    presets: {
      necklines: ['high', 'crew'],
      sleeveLengths: ['wrist', '3/4'],
      hemlines: ['floor']
    }
  }
];

interface AvatarCarouselProps {
  profile: ModestyProfile;
  onChangeProfile: (updated: Partial<ModestyProfile>) => void;
}

export const AvatarCarousel: React.FC<AvatarCarouselProps> = ({
  profile,
  onChangeProfile
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const currentAvatar = AVATAR_PRESETS[currentIndex];

  const handlePrev = () => {
    const nextIdx = (currentIndex - 1 + AVATAR_PRESETS.length) % AVATAR_PRESETS.length;
    setCurrentIndex(nextIdx);
    applyAvatarPreset(AVATAR_PRESETS[nextIdx]);
  };

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % AVATAR_PRESETS.length;
    setCurrentIndex(nextIdx);
    applyAvatarPreset(AVATAR_PRESETS[nextIdx]);
  };

  const applyAvatarPreset = (avatar: AvatarPreset) => {
    onChangeProfile({
      necklines: avatar.presets.necklines,
      sleeveLengths: avatar.presets.sleeveLengths,
      hemlines: avatar.presets.hemlines,
    });
  };

  return (
    <div className="space-y-4 font-sans">
      
      {/* 
        INTERACTIVE AVATAR CAROUSEL FRAME 
      */}
      <div className="text-center">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#8A6B5D] flex items-center justify-center gap-1 mb-1">
          <Sparkles className="w-3.5 h-3.5" /> Stylist Avatar &amp; Modesty Presets
        </span>
        <h4 className="font-serif italic font-bold text-lg text-[#3D312A]">
          {currentAvatar.label}
        </h4>
        <p className="text-xs text-[#8A6B5D] font-medium">
          {currentAvatar.description}
        </p>
      </div>

      {/* CAROUSEL CARD WITH HOVER ANIMATION (.png -> .gif) */}
      <div className="relative flex items-center justify-center">
        
        {/* Previous Button */}
        <button
          type="button"
          onClick={handlePrev}
          className="absolute left-0 z-10 p-2 rounded-full bg-white/90 hover:bg-white text-[#3D312A] border border-[#D6CFCE] shadow-md transition-all cursor-pointer hover:scale-110 active:scale-95"
          aria-label="Previous Avatar"
        >
          <ChevronLeft className="w-5 h-5 text-[#8A6B5D]" />
        </button>

        {/* Avatar Display Card */}
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="w-56 h-64 mx-auto rounded-2xl bg-[#FAF7F2] border border-[#D6CFCE] shadow-sm relative overflow-hidden flex items-center justify-center p-3 group cursor-pointer"
        >
          {/* Animated Hover Badge */}
          <div className="absolute top-2 right-2 z-10 px-2 py-0.5 rounded-full bg-[#3D312A]/80 text-[#FAF7F2] text-[9px] font-mono font-bold tracking-wider backdrop-blur-xs opacity-80 group-hover:opacity-100 transition-opacity">
            {isHovered ? 'ANIMATING ✨' : 'HOVER TO ANIMATE'}
          </div>

          <img
            src={isHovered ? currentAvatar.gifImg : currentAvatar.staticImg}
            alt={currentAvatar.label}
            className="w-full h-full object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Next Button */}
        <button
          type="button"
          onClick={handleNext}
          className="absolute right-0 z-10 p-2 rounded-full bg-white/90 hover:bg-white text-[#3D312A] border border-[#D6CFCE] shadow-md transition-all cursor-pointer hover:scale-110 active:scale-95"
          aria-label="Next Avatar"
        >
          <ChevronRight className="w-5 h-5 text-[#8A6B5D]" />
        </button>
      </div>

      {/* Primary Select Button */}
      <button
        type="button"
        onClick={() => applyAvatarPreset(currentAvatar)}
        className="w-full py-2.5 rounded-xl bg-[#8A6B5D] hover:bg-[#6E5346] text-[#FAF7F2] font-semibold text-xs transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
      >
        <Check className="w-4 h-4 text-amber-200" />
        <span>Select {currentAvatar.label} Preset</span>
      </button>

      {/* 
        SECONDARY TOGGLES: SLITS & SHEER/OPACITY 
      */}
      <div className="grid grid-cols-2 gap-3 pt-2">
        
        {/* Slits Toggle */}
        <div className="p-3 rounded-xl bg-white border border-[#D6CFCE] space-y-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A6B5D] flex items-center gap-1">
            <Scissors className="w-3.5 h-3.5 text-rose-700" /> Thigh Slits
          </span>
          <div className="grid grid-cols-2 gap-1">
            <button
              type="button"
              onClick={() => onChangeProfile({ noSlits: true })}
              className={`py-1.5 px-2 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                profile.noSlits
                  ? 'bg-[#3D312A] text-white shadow-xs'
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
                  ? 'bg-[#3D312A] text-white shadow-xs'
                  : 'bg-[#F2EDE6] text-[#3D312A] hover:bg-[#FAF7F2]'
              }`}
            >
              Slits Fine
            </button>
          </div>
        </div>

        {/* Sheer / Opacity Toggle */}
        <div className="p-3 rounded-xl bg-white border border-[#D6CFCE] space-y-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A6B5D] flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-[#8A6B5D]" /> Opacity
          </span>
          <div className="grid grid-cols-2 gap-1">
            <button
              type="button"
              onClick={() => onChangeProfile({ isOpaque: true })}
              className={`py-1.5 px-2 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                profile.isOpaque
                  ? 'bg-[#3D312A] text-white shadow-xs'
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
                  ? 'bg-[#3D312A] text-white shadow-xs'
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
