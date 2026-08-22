'use client';

import React from 'react';
import { Sparkles, Shirt } from 'lucide-react';

interface GlassmorphismLoadingScreenProps {
  isLoading: boolean;
}

export const GlassmorphismLoadingScreen: React.FC<GlassmorphismLoadingScreenProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#F2EDE6]/80 backdrop-blur-xl flex flex-col items-center justify-center transition-all duration-500 animate-in fade-in">
      
      {/* GLOWING AMBIENT EMBLEM */}
      <div className="relative mb-6 flex items-center justify-center">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-[#8A6B5D] via-[#B89A8E] to-[#3D312A] p-0.5 shadow-xl animate-pulse">
          <div className="w-full h-full bg-[#FAF7F2] rounded-[22px] flex items-center justify-center">
            <Shirt className="w-9 h-9 text-[#8A6B5D]" />
          </div>
        </div>
        <Sparkles className="w-6 h-6 text-amber-500 absolute -top-2 -right-2 animate-bounce" />
      </div>

      {/* GLOWING LOGO */}
      <h2 className="font-serif italic text-4xl md:text-5xl font-bold text-[#3D312A] tracking-tight drop-shadow-sm mb-3">
        hercloset
      </h2>

      {/* PULSING STATUS TEXT */}
      <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8A6B5D]/10 border border-[#8A6B5D]/20">
        <div className="w-2 h-2 rounded-full bg-[#8A6B5D] animate-ping" />
        <span className="font-sans text-sm font-medium text-[#6E5D53] animate-pulse tracking-wide">
          Preparing your modest closet...
        </span>
      </div>

    </div>
  );
};
