'use client';

import React, { useEffect, useState } from 'react';

export const PartingClothesReveal: React.FC = () => {
  const [isParted, setIsParted] = useState<boolean>(false);
  const [isDone, setIsDone] = useState<boolean>(false);

  useEffect(() => {
    // 1. Initial 600ms pause so the user registers the dense closet rack
    const timer1 = setTimeout(() => {
      setIsParted(true);
    }, 600);

    // 2. Fade out and unmount overlay after 2.6s (600ms pause + 2.0s slide)
    const timer2 = setTimeout(() => {
      setIsDone(true);
    }, 2800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  if (isDone) return null;

  // Garment Data for 20 dense overlapping items
  const leftGarments = [
    { color: '#2A201C', height: 'h-[580px]', width: 'w-36', name: 'Espresso Abaya', offset: 'ml-0' },
    { color: '#B38E65', height: 'h-[520px]', width: 'w-32', name: 'Camel Trench Coat', offset: '-ml-8' },
    { color: '#5A5D4A', height: 'h-[490px]', width: 'w-30', name: 'Olive Duster', offset: '-ml-8' },
    { color: '#332E2C', height: 'h-[560px]', width: 'w-36', name: 'Charcoal Maxi Dress', offset: '-ml-8' },
    { color: '#E2D9CE', height: 'h-[450px]', width: 'w-28', name: 'Cream Linen Cardigan', offset: '-ml-8' },
    { color: '#2A201C', height: 'h-[570px]', width: 'w-36', name: 'Dark Velvet Coat', offset: '-ml-8' },
    { color: '#B38E65', height: 'h-[510px]', width: 'w-32', name: 'Mocha Pleated Dress', offset: '-ml-8' },
    { color: '#5A5D4A', height: 'h-[480px]', width: 'w-30', name: 'Sage Overcoat', offset: '-ml-8' },
    { color: '#332E2C', height: 'h-[550px]', width: 'w-34', name: 'Midnight Maxi', offset: '-ml-8' },
    { color: '#E2D9CE', height: 'h-[460px]', width: 'w-28', name: 'Ivory Knit Top', offset: '-ml-8' },
  ];

  const rightGarments = [
    { color: '#E2D9CE', height: 'h-[460px]', width: 'w-28', name: 'Ivory Knit Top', offset: 'mr-0' },
    { color: '#332E2C', height: 'h-[550px]', width: 'w-34', name: 'Midnight Maxi', offset: '-mr-8' },
    { color: '#5A5D4A', height: 'h-[480px]', width: 'w-30', name: 'Sage Overcoat', offset: '-mr-8' },
    { color: '#B38E65', height: 'h-[510px]', width: 'w-32', name: 'Mocha Pleated Dress', offset: '-mr-8' },
    { color: '#2A201C', height: 'h-[570px]', width: 'w-36', name: 'Dark Velvet Coat', offset: '-mr-8' },
    { color: '#E2D9CE', height: 'h-[450px]', width: 'w-28', name: 'Cream Linen Cardigan', offset: '-mr-8' },
    { color: '#332E2C', height: 'h-[560px]', width: 'w-36', name: 'Charcoal Maxi Dress', offset: '-mr-8' },
    { color: '#5A5D4A', height: 'h-[490px]', width: 'w-30', name: 'Olive Duster', offset: '-mr-8' },
    { color: '#B38E65', height: 'h-[520px]', width: 'w-32', name: 'Camel Trench Coat', offset: '-mr-8' },
    { color: '#2A201C', height: 'h-[580px]', width: 'w-36', name: 'Espresso Abaya', offset: '-mr-8' },
  ];

  return (
    <div className={`fixed inset-0 z-40 pointer-events-none overflow-hidden font-sans transition-opacity duration-700 ${
      isParted ? 'opacity-90' : 'opacity-100'
    }`}>
      
      {/* WOODEN CLOSET RACK BAR AT TOP */}
      <div className="absolute top-0 left-0 right-0 h-4 bg-[#4B3F38] shadow-md z-20 flex items-center justify-around">
        {Array.from({ length: 32 }).map((_, i) => (
          <div key={i} className="w-1.5 h-3 bg-[#8A6B5D] rounded-b-xs opacity-70" />
        ))}
      </div>

      {/* 
        LEFT CLUSTER (10 OVERLAPPING GARMENTS CONCEALED AT CENTER)
      */}
      <div
        className={`absolute top-0 left-0 w-1/2 h-full flex items-start justify-end pr-2 transition-all duration-[2000ms] ease-[cubic-bezier(0.25,1,0.35,1)] ${
          isParted
            ? '-translate-x-[125%] rotate-[-3deg]'
            : 'translate-x-0 rotate-0'
        }`}
      >
        <div className="flex items-start pt-3">
          {leftGarments.map((g, idx) => (
            <div
              key={idx}
              className={`${g.width} ${g.height} ${g.offset} rounded-b-3xl shadow-2xl relative flex flex-col items-center p-2 border-t-4 border-[#8A6B5D] shrink-0 transition-transform duration-500`}
              style={{
                backgroundColor: g.color,
                zIndex: idx + 1
              }}
            >
              {/* Wooden Hanger Neck */}
              <div className="w-8 h-4 border-t-2 border-[#E2D9CE]/70 rounded-t-full mb-1" />
              {/* Collar Accent */}
              <div className="w-full h-10 bg-black/20 rounded-md mb-2" />
              {/* Garment Body Gradient */}
              <div className="w-full flex-1 bg-gradient-to-b from-transparent via-black/10 to-black/40 rounded-b-2xl" />
            </div>
          ))}
        </div>
      </div>

      {/* 
        RIGHT CLUSTER (10 OVERLAPPING GARMENTS CONCEALED AT CENTER)
      */}
      <div
        className={`absolute top-0 right-0 w-1/2 h-full flex items-start justify-start pl-2 transition-all duration-[2000ms] ease-[cubic-bezier(0.25,1,0.35,1)] ${
          isParted
            ? 'translate-x-[125%] rotate-[3deg]'
            : 'translate-x-0 rotate-0'
        }`}
      >
        <div className="flex items-start pt-3">
          {rightGarments.map((g, idx) => (
            <div
              key={idx}
              className={`${g.width} ${g.height} ${g.offset} rounded-b-3xl shadow-2xl relative flex flex-col items-center p-2 border-t-4 border-[#8A6B5D] shrink-0 transition-transform duration-500`}
              style={{
                backgroundColor: g.color,
                zIndex: rightGarments.length - idx
              }}
            >
              {/* Wooden Hanger Neck */}
              <div className="w-8 h-4 border-t-2 border-[#E2D9CE]/70 rounded-t-full mb-1" />
              {/* Collar Accent */}
              <div className="w-full h-10 bg-black/20 rounded-md mb-2" />
              {/* Garment Body Gradient */}
              <div className="w-full flex-1 bg-gradient-to-b from-transparent via-black/10 to-black/40 rounded-b-2xl" />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
