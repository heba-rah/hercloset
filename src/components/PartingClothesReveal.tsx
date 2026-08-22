'use client';

import React, { useEffect, useState } from 'react';
import { Shirt } from 'lucide-react';

export const PartingClothesReveal: React.FC = () => {
  const [isParted, setIsParted] = useState<boolean>(false);
  const [isDone, setIsDone] = useState<boolean>(false);

  useEffect(() => {
    // Start parting the clothes rack after 250ms
    const timer1 = setTimeout(() => {
      setIsParted(true);
    }, 250);

    // Unmount overlay after animation completes (1500ms)
    const timer2 = setTimeout(() => {
      setIsDone(true);
    }, 1500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  if (isDone) return null;

  return (
    <div className="fixed inset-0 z-40 pointer-events-none overflow-hidden font-sans">
      
      {/* WOODEN CLOSET RACK BAR AT TOP */}
      <div className="absolute top-0 left-0 right-0 h-3 bg-[#4B3F38] shadow-md z-10 flex items-center justify-around">
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} className="w-1.5 h-3 bg-[#8A6B5D] rounded-b-sm opacity-60" />
        ))}
      </div>

      {/* 
        LEFT CLUSTER OF HANGING GARMENTS (Trench Coat, Abaya, Maxi Dress, Blouses)
      */}
      <div
        className={`absolute top-0 left-0 w-1/2 h-full flex items-start justify-end pr-4 transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isParted
            ? '-translate-x-[110%] rotate-[-4deg]'
            : 'translate-x-0 rotate-0'
        }`}
      >
        <div className="flex items-start gap-1 pt-3 opacity-95">
          {/* Garment 1: Long Mocha Trench Coat */}
          <div className="w-32 h-[520px] bg-[#3D312A] rounded-b-3xl shadow-2xl relative flex flex-col items-center p-2 border-t-4 border-[#8A6B5D]">
            <div className="w-8 h-4 border-t-2 border-[#D6CFCE] rounded-t-full mb-1" />
            <div className="w-full h-12 bg-[#2A211B] rounded-md mb-2 opacity-80" />
            <div className="w-full flex-1 bg-gradient-to-b from-[#3D312A] via-[#2A211B] to-[#1C1613] rounded-b-2xl" />
          </div>

          {/* Garment 2: Flowing Maxi Abaya */}
          <div className="w-36 h-[580px] bg-[#2A211B] rounded-b-3xl shadow-2xl relative flex flex-col items-center p-2 border-t-4 border-[#8A6B5D] -ml-6 z-10">
            <div className="w-8 h-4 border-t-2 border-[#D6CFCE] rounded-t-full mb-1" />
            <div className="w-full h-16 bg-[#1C1613] rounded-md mb-2 opacity-90" />
            <div className="w-full flex-1 bg-gradient-to-b from-[#2A211B] via-[#1C1613] to-[#140F0D] rounded-b-2xl" />
          </div>

          {/* Garment 3: Warm Taupe Pleated Blouse */}
          <div className="w-28 h-[440px] bg-[#8A6B5D] rounded-b-3xl shadow-2xl relative flex flex-col items-center p-2 border-t-4 border-[#B89A8E] -ml-6">
            <div className="w-8 h-4 border-t-2 border-[#FAF7F2] rounded-t-full mb-1" />
            <div className="w-full flex-1 bg-gradient-to-b from-[#8A6B5D] to-[#6E5D53] rounded-b-2xl" />
          </div>
        </div>
      </div>

      {/* 
        RIGHT CLUSTER OF HANGING GARMENTS (Floor Dress, Duster Coat, Layered Linen)
      */}
      <div
        className={`absolute top-0 right-0 w-1/2 h-full flex items-start justify-start pl-4 transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isParted
            ? 'translate-x-[110%] rotate-[4deg]'
            : 'translate-x-0 rotate-0'
        }`}
      >
        <div className="flex items-start gap-1 pt-3 opacity-95">
          {/* Garment 4: Cream Linen Layered Shirt */}
          <div className="w-30 h-[460px] bg-[#A89F91] rounded-b-3xl shadow-2xl relative flex flex-col items-center p-2 border-t-4 border-[#C4B5A5]">
            <div className="w-8 h-4 border-t-2 border-[#FAF7F2] rounded-t-full mb-1" />
            <div className="w-full flex-1 bg-gradient-to-b from-[#A89F91] to-[#8A6B5D] rounded-b-2xl" />
          </div>

          {/* Garment 5: Deep Espresso Duster Coat */}
          <div className="w-36 h-[590px] bg-[#1C1613] rounded-b-3xl shadow-2xl relative flex flex-col items-center p-2 border-t-4 border-[#8A6B5D] -ml-6 z-10">
            <div className="w-8 h-4 border-t-2 border-[#D6CFCE] rounded-t-full mb-1" />
            <div className="w-full h-16 bg-[#140F0D] rounded-md mb-2 opacity-90" />
            <div className="w-full flex-1 bg-gradient-to-b from-[#1C1613] via-[#140F0D] to-black rounded-b-2xl" />
          </div>

          {/* Garment 6: Mocha Pleated Skirt Suit */}
          <div className="w-32 h-[510px] bg-[#6E5D53] rounded-b-3xl shadow-2xl relative flex flex-col items-center p-2 border-t-4 border-[#8A6B5D] -ml-6">
            <div className="w-8 h-4 border-t-2 border-[#FAF7F2] rounded-t-full mb-1" />
            <div className="w-full flex-1 bg-gradient-to-b from-[#6E5D53] to-[#3D312A] rounded-b-2xl" />
          </div>
        </div>
      </div>

    </div>
  );
};
