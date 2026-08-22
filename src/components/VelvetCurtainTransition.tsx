'use client';

import React, { useEffect, useState } from 'react';

export type CurtainState = 'initial_closed' | 'opening' | 'opened' | 'closing' | 'closed' | 'reopening' | 'done';

interface VelvetCurtainTransitionProps {
  state: CurtainState;
}

export const VelvetCurtainTransition: React.FC<VelvetCurtainTransitionProps> = ({ state }) => {
  const [rings, setRings] = useState<number[]>([]);

  useEffect(() => {
    setRings(Array.from({ length: 24 }, (_, i) => i));
  }, []);

  if (state === 'done' || state === 'opened') {
    return (
      /* Pinned Gold Rod & Rings across top of screen */
      <div className="fixed top-0 left-0 right-0 h-3.5 bg-gradient-to-b from-[#E6C280] via-[#C99E56] to-[#8C6527] shadow-md z-[70] pointer-events-none flex items-center justify-between px-2">
        <div className="w-4 h-5 -ml-2 rounded-full bg-gradient-to-r from-[#C99E56] via-[#FCE8B1] to-[#8C6527] border border-[#FAF7F2]/40" />
        <div className="flex-1 flex justify-around px-4">
          {rings.map((r) => (
            <div key={r} className="w-2.5 h-3 rounded-full border border-[#C99E56] bg-transparent" />
          ))}
        </div>
        <div className="w-4 h-5 -mr-2 rounded-full bg-gradient-to-r from-[#8C6527] via-[#FCE8B1] to-[#C99E56] border border-[#FAF7F2]/40" />
      </div>
    );
  }

  const isClosed = state === 'initial_closed' || state === 'closing' || state === 'closed';

  return (
    <div className="fixed inset-0 z-[60] pointer-events-none overflow-hidden font-sans">
      
      {/* 
        ========================================================================
        BRASS / GOLD CURTAIN ROD & RINGS (FIXED TOP OF SCREEN)
        ========================================================================
      */}
      <div className="fixed top-0 left-0 right-0 h-3.5 bg-gradient-to-b from-[#E6C280] via-[#C99E56] to-[#8C6527] shadow-md z-[70] flex items-center justify-between px-2">
        {/* Left Brass Finial */}
        <div className="w-4 h-5 -ml-2 rounded-full bg-gradient-to-r from-[#C99E56] via-[#FCE8B1] to-[#8C6527] border border-[#FAF7F2]/40" />
        
        {/* Gold Hanging Rings */}
        <div className="flex-1 flex justify-around px-4">
          {rings.map((r) => (
            <div
              key={r}
              className="w-2.5 h-3 rounded-full border border-[#E6C280] bg-gradient-to-b from-[#C99E56] to-[#8C6527]"
            />
          ))}
        </div>

        {/* Right Brass Finial */}
        <div className="w-4 h-5 -mr-2 rounded-full bg-gradient-to-r from-[#8C6527] via-[#FCE8B1] to-[#C99E56] border border-[#FAF7F2]/40" />
      </div>

      {/* 
        ========================================================================
        LEFT & RIGHT VELVET CURTAIN PANELS (FULL SCREEN SLIDING REVEAL)
        ========================================================================
      */}
      <div className="relative w-full h-full pt-3.5 flex">
        
        {/* LEFT CURTAIN PANEL */}
        <div
          className={`w-1/2 h-full bg-[#2B221E] shadow-2xl relative transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isClosed ? 'translate-x-0' : '-translate-x-full'
          }`}
          style={{
            backgroundImage: `repeating-linear-gradient(90deg, #1E1714 0px, #2B221E 30px, #3A2E28 60px, #2B221E 90px)`
          }}
        >
          {/* Gold Tassel Tieback Detail */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 w-3.5 h-24 rounded-full bg-gradient-to-b from-[#E6C280] via-[#C99E56] to-[#8C6527] border border-[#FAF7F2]/30 shadow-xl opacity-80" />
          <div className="w-full h-full bg-gradient-to-r from-black/40 via-transparent to-black/30 pointer-events-none" />
        </div>

        {/* RIGHT CURTAIN PANEL */}
        <div
          className={`w-1/2 h-full bg-[#2B221E] shadow-2xl relative transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isClosed ? 'translate-x-0' : 'translate-x-full'
          }`}
          style={{
            backgroundImage: `repeating-linear-gradient(90deg, #1E1714 0px, #2B221E 30px, #3A2E28 60px, #2B221E 90px)`
          }}
        >
          {/* Gold Tassel Tieback Detail */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-24 rounded-full bg-gradient-to-b from-[#E6C280] via-[#C99E56] to-[#8C6527] border border-[#FAF7F2]/30 shadow-xl opacity-80" />
          <div className="w-full h-full bg-gradient-to-l from-black/40 via-transparent to-black/30 pointer-events-none" />
        </div>

      </div>

    </div>
  );
};
