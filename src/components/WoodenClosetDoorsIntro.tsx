'use client';

import React, { useEffect, useState } from 'react';

export const WoodenClosetDoorsIntro: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDone, setIsDone] = useState<boolean>(false);

  useEffect(() => {
    // 1. Doors start closed, then swing open after 200ms
    const timer1 = setTimeout(() => {
      setIsOpen(true);
    }, 200);

    // 2. Unmount after doors swing fully open (1400ms)
    const timer2 = setTimeout(() => {
      setIsDone(true);
    }, 1400);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  if (isDone) return null;

  return (
    <div className="fixed inset-0 z-[70] pointer-events-none overflow-hidden font-sans [perspective:1200px]">
      
      {/* LEFT WOODEN CLOSET DOOR PANEL */}
      <div
        className={`w-1/2 h-full bg-[#2A2320] border-r-2 border-[#8A6B5D]/40 shadow-2xl relative transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? '-translate-x-full [transform:rotateY(-100deg)]' : 'translate-x-0 [transform:rotateY(0deg)]'
        }`}
        style={{
          backgroundImage: `repeating-linear-gradient(90deg, #1C1613 0px, #2A2320 30px, #362E2A 60px, #2A2320 90px)`
        }}
      >
        <div className="w-full h-full p-8 flex flex-col justify-center items-end bg-gradient-to-r from-black/40 via-transparent to-black/30 relative">
          {/* Brass Door Handle at Center Seam */}
          <div className="w-3.5 h-24 rounded-full bg-gradient-to-b from-[#B89A8E] via-[#8A6B5D] to-[#4B3F38] border border-[#FAF7F2]/40 shadow-xl absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center">
            <div className="w-1 h-12 rounded-full bg-[#FAF7F2]/30" />
          </div>
        </div>
      </div>

      {/* RIGHT WOODEN CLOSET DOOR PANEL */}
      <div
        className={`w-1/2 h-full bg-[#2A2320] border-l-2 border-[#8A6B5D]/40 shadow-2xl relative transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? 'translate-x-full [transform:rotateY(100deg)]' : 'translate-x-0 [transform:rotateY(0deg)]'
        }`}
        style={{
          backgroundImage: `repeating-linear-gradient(90deg, #1C1613 0px, #2A2320 30px, #362E2A 60px, #2A2320 90px)`
        }}
      >
        <div className="w-full h-full p-8 flex flex-col justify-center items-start bg-gradient-to-l from-black/40 via-transparent to-black/30 relative">
          {/* Brass Door Handle at Center Seam */}
          <div className="w-3.5 h-24 rounded-full bg-gradient-to-b from-[#B89A8E] via-[#8A6B5D] to-[#4B3F38] border border-[#FAF7F2]/40 shadow-xl absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center">
            <div className="w-1 h-12 rounded-full bg-[#FAF7F2]/30" />
          </div>
        </div>
      </div>

    </div>
  );
};
