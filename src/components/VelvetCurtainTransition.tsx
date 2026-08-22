'use client';

import React from 'react';

export type CurtainState = 'initial_closed' | 'opening' | 'opened' | 'closing' | 'closed' | 'reopening' | 'done';

interface VelvetCurtainTransitionProps {
  state: CurtainState;
}

export const VelvetCurtainTransition: React.FC<VelvetCurtainTransitionProps> = ({ state }) => {
  if (state === 'done' || state === 'opened') {
    return null;
  }

  const isClosed = state === 'initial_closed' || state === 'closing' || state === 'closed';

  return (
    <div className="fixed inset-0 z-[60] pointer-events-none overflow-hidden font-sans">
      
      {/* 
        ========================================================================
        FULL-BLEED EDGE-TO-EDGE VELVET CURTAIN PANELS (NO TOP HARDWARE)
        ========================================================================
      */}
      <div className="relative w-full h-full flex">
        
        {/* LEFT CURTAIN PANEL */}
        <div
          className={`w-1/2 h-full bg-[#2B221E] shadow-2xl relative transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isClosed ? 'translate-x-0' : '-translate-x-full'
          }`}
          style={{
            backgroundImage: `repeating-linear-gradient(90deg, #1E1714 0px, #2B221E 30px, #3A2E28 60px, #2B221E 90px)`
          }}
        >
          {/* Subtle Warm Tassel Accent */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 w-3.5 h-24 rounded-full bg-gradient-to-b from-[#B89A8E] via-[#8A6B5D] to-[#4B3F38] border border-[#FAF7F2]/30 shadow-xl opacity-80" />
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
          {/* Subtle Warm Tassel Accent */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-24 rounded-full bg-gradient-to-b from-[#B89A8E] via-[#8A6B5D] to-[#4B3F38] border border-[#FAF7F2]/30 shadow-xl opacity-80" />
          <div className="w-full h-full bg-gradient-to-l from-black/40 via-transparent to-black/30 pointer-events-none" />
        </div>

      </div>

    </div>
  );
};
