'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';

export type DoorTransitionState = 'idle' | 'closing' | 'closed' | 'opening' | 'done';

interface ClosetDoorTransitionProps {
  state: DoorTransitionState;
}

export const ClosetDoorTransition: React.FC<ClosetDoorTransitionProps> = ({ state }) => {
  if (state === 'idle' || state === 'done') return null;

  const isClosedOrClosing = state === 'closing' || state === 'closed';

  return (
    <div className="fixed inset-0 z-50 pointer-events-none flex overflow-hidden [perspective:1200px]">
      
      {/* LEFT CLOSET DOOR PANEL */}
      <div
        className={`w-1/2 h-full bg-[#1C1613] border-r-2 border-[#8A6B5D]/50 shadow-2xl relative transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isClosedOrClosing
            ? 'translate-x-0'
            : '-translate-x-full'
        }`}
      >
        <div className="w-full h-full p-8 flex flex-col justify-center items-end bg-gradient-to-r from-[#140F0D] via-[#1C1613] to-[#241D18] relative">
          {/* Brass Door Handle at Meeting Seam */}
          <div className="w-3.5 h-24 rounded-full bg-gradient-to-b from-[#B89A8E] via-[#8A6B5D] to-[#4B3F38] border border-[#FAF7F2]/40 shadow-xl absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center">
            <div className="w-1 h-12 rounded-full bg-[#FAF7F2]/30" />
          </div>
          {/* Plank texture lines */}
          <div className="w-full h-full border-r border-[#8A6B5D]/20 opacity-30" />
        </div>
      </div>

      {/* RIGHT CLOSET DOOR PANEL */}
      <div
        className={`w-1/2 h-full bg-[#1C1613] border-l-2 border-[#8A6B5D]/50 shadow-2xl relative transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isClosedOrClosing
            ? 'translate-x-0'
            : 'translate-x-full'
        }`}
      >
        <div className="w-full h-full p-8 flex flex-col justify-center items-start bg-gradient-to-l from-[#140F0D] via-[#1C1613] to-[#241D18] relative">
          {/* Brass Door Handle at Meeting Seam */}
          <div className="w-3.5 h-24 rounded-full bg-gradient-to-b from-[#B89A8E] via-[#8A6B5D] to-[#4B3F38] border border-[#FAF7F2]/40 shadow-xl absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center">
            <div className="w-1 h-12 rounded-full bg-[#FAF7F2]/30" />
          </div>
          {/* Plank texture lines */}
          <div className="w-full h-full border-l border-[#8A6B5D]/20 opacity-30" />
        </div>
      </div>

      {/* GENTLE LIGHT-GLOW BURST AT SEAM */}
      {state === 'opening' && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-full bg-gradient-to-r from-transparent via-amber-200/40 to-transparent blur-2xl animate-pulse pointer-events-none" />
      )}

      {/* CENTER BRAND EMBLEM WHILE CLOSED */}
      {state === 'closed' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 animate-in fade-in duration-200">
          <div className="p-3 rounded-2xl bg-[#8A6B5D]/30 border border-[#8A6B5D]/60 backdrop-blur-md shadow-2xl flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-amber-300 animate-spin" />
            <span className="font-serif italic font-bold text-2xl text-[#FAF7F2]">
              hercloset
            </span>
          </div>
        </div>
      )}

    </div>
  );
};
