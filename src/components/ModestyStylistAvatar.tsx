'use client';

import React, { useState } from 'react';
import { Sparkles, SlidersHorizontal, UserCheck } from 'lucide-react';

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
    <div className="w-72 lg:w-80 shrink-0 sticky top-24 self-start space-y-4 hidden md:flex flex-col items-center">
      
      {/* SPEECH BUBBLE CTA BUTTON (Top) */}
      <button
        onClick={onOpenFilters}
        className="w-full bg-[#FAF7F2] border-2 border-[#8A6B5D] rounded-2xl p-3.5 shadow-md hover:bg-[#F2EDE6] transition-all cursor-pointer relative group text-left"
      >
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#8A6B5D] shrink-0 animate-pulse" />
            <span className="font-bold text-xs text-[#4B3F38] tracking-wide">
              Update Modesty Preferences
            </span>
          </div>

          {activeFilterCount > 0 ? (
            <span className="px-2 py-0.5 rounded-full bg-[#8A6B5D] text-white font-mono text-[10px] font-extrabold shadow-sm">
              {activeFilterCount}
            </span>
          ) : (
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#8A6B5D]" />
          )}
        </div>

        {/* Speech Bubble Pointer Tail (Pointing downward to avatar) */}
        <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-[#8A6B5D]" />
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-[#FAF7F2] group-hover:border-t-[#F2EDE6]" />
      </button>

      {/* STYLIST AVATAR PLACEHOLDER CARD (Bottom) */}
      <div className="w-full aspect-[3/5] bg-[#FAF7F2] rounded-3xl border-2 border-[#D6CFCE] shadow-sm flex flex-col items-center justify-between p-5 text-center overflow-hidden relative group hover:border-[#8A6B5D] transition-all">
        
        {/* Top Header Badge */}
        <div className="px-3 py-1 rounded-full bg-[#F2EDE6] border border-[#B89A8E]/40 text-[10px] font-bold text-[#8A6B5D] uppercase tracking-wider flex items-center gap-1">
          <UserCheck className="w-3 h-3 text-[#8A6B5D]" />
          <span>AI Modesty Stylist</span>
        </div>

        {/* Swappable Avatar Image with SVG Mannequin Fallback */}
        <div className="relative w-full flex-1 my-3 flex items-center justify-center overflow-hidden rounded-2xl bg-[#F2EDE6]/60 border border-[#D6CFCE]/40">
          {!imgError ? (
            <img
              src="/avatar.png"
              alt="AI Modesty Stylist"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            /* High-Fashion Illustrated Silhouette Mannequin SVG Fallback */
            <div className="w-full h-full flex flex-col items-center justify-center p-4 text-[#8A6B5D] space-y-2">
              <svg
                viewBox="0 0 100 160"
                className="w-32 h-44 stroke-[#8A6B5D] fill-none stroke-[1.5]"
              >
                {/* Turban/Hijab Silhouette Outline */}
                <path d="M 50 15 C 38 15, 30 25, 30 38 C 30 50, 40 54, 50 54 C 60 54, 70 50, 70 38 C 70 25, 62 15, 50 15 Z" fill="#F2EDE6" stroke="#8A6B5D" strokeWidth="1.5" />
                <path d="M 32 30 C 45 20, 55 20, 68 30" />
                <path d="M 30 38 C 45 42, 55 42, 70 38" />

                {/* Elegant Neck & Shoulders */}
                <path d="M 45 54 L 45 64 C 32 68, 22 76, 18 90 L 18 150" />
                <path d="M 55 54 L 55 64 C 68 68, 78 76, 82 90 L 82 150" />

                {/* Modest Long Silhouette Dress Lines */}
                <path d="M 35 90 C 45 100, 55 100, 65 90" />
                <path d="M 24 120 L 76 120" strokeDasharray="3 3" />
                <path d="M 18 150 L 82 150" />

                {/* Sparkle Accent */}
                <circle cx="50" cy="35" r="2" fill="#8A6B5D" />
              </svg>
              <span className="text-[10px] text-[#8A6B5D] font-mono italic">
                (Drop avatar.png into /public)
              </span>
            </div>
          )}
        </div>

        {/* Caption Label below Avatar */}
        <div>
          <span className="font-serif italic text-xs font-semibold text-[#8A6B5D] block">
            Your AI Modesty Stylist
          </span>
          <span className="text-[10px] text-[#4B3F38]/70 block mt-0.5">
            Personalized Coverage Filter Active
          </span>
        </div>

      </div>

    </div>
  );
};
