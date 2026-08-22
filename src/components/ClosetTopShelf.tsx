'use client';

import React from 'react';
import { Tag, Store, Sparkles } from 'lucide-react';

interface ClosetTopShelfProps {
  selectedOccasion: string;
  onSelectOccasion: (occasion: string) => void;
  selectedStore: string;
  onSelectStore: (store: string) => void;
  averageMatchScore: number;
  totalItemsCount: number;
}

export const ClosetTopShelf: React.FC<ClosetTopShelfProps> = ({
  selectedOccasion,
  onSelectOccasion,
  selectedStore,
  onSelectStore,
  averageMatchScore,
  totalItemsCount
}) => {
  const occasions = [
    { id: 'all', label: 'All Occasions' },
    { id: 'gymwear', label: 'Gymwear' },
    { id: 'graduation', label: 'Graduation' },
    { id: 'wedding', label: 'Wedding' },
    { id: 'workwear', label: 'Work / Professional' },
    { id: 'school', label: 'School & Campus' },
    { id: 'casual', label: 'Everyday Casual' },
    { id: 'eid', label: 'Eid & Holidays' },
  ];

  const stores = [
    { id: 'all', label: 'All Stores' },
    { id: 'urban planet', label: 'Urban Planet' },
    { id: 'ardene', label: 'Ardene' },
  ];

  // Dynamic Color Coding based on score for Dark Cinematic Aesthetics
  const getGaugeColor = (score: number) => {
    if (score >= 80) {
      return {
        stroke: '#10B981',
        text: 'text-emerald-300 font-bold text-base md:text-lg',
        badgeBg: 'bg-emerald-950/80 text-emerald-300 border border-emerald-700/50 px-2.5 py-0.5 rounded-full text-xs font-bold',
        label: 'High Coverage'
      };
    }
    if (score >= 60) {
      return {
        stroke: '#F59E0B',
        text: 'text-amber-300 font-bold text-base md:text-lg',
        badgeBg: 'bg-amber-950/80 text-amber-300 border border-amber-700/50 px-2.5 py-0.5 rounded-full text-xs font-bold',
        label: 'Moderate Coverage'
      };
    }
    return {
      stroke: '#FF5A52',
      text: 'text-[#FF7A66] font-bold text-base md:text-lg',
      badgeBg: 'bg-[#FF5A52]/20 text-[#FFA494] border border-[#FF5A52]/40 px-2.5 py-0.5 rounded-full text-xs font-medium',
      label: 'Low Modesty'
    };
  };

  const gaugeTheme = getGaugeColor(averageMatchScore);

  // SVG Circular Gauge parameters
  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (averageMatchScore / 100) * circumference;

  return (
    <div className="w-full bg-[#181311] border-b border-[#3A2E28] py-4 px-4 md:px-8 shadow-xl font-sans my-2">
      
      {/* 3-Compartment Layout */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 items-center max-w-[1700px] mx-auto">
        
        {/* LEFT COMPARTMENT — "OCCASION" STORAGE BASKET/BIN */}
        <div className="bg-[#241D1A]/90 border border-[#4B3F38]/60 shadow-lg backdrop-blur-md rounded-2xl p-4 text-[#FAF7F2] flex flex-col items-center">
          {/* Top Detail: Small Handle Accent */}
          <div className="w-8 h-1.5 bg-[#8A6B5D]/60 rounded-full mx-auto mb-2" />
          
          <div className="flex items-center gap-1.5 mb-2">
            <Tag className="w-3.5 h-3.5 text-[#B89A8E]" />
            <h3 className="text-[#D6CFCE] font-sans text-xs tracking-widest uppercase font-semibold text-center">
              OCCASION
            </h3>
          </div>

          {/* Dark Inset Select Box */}
          <select
            value={selectedOccasion}
            onChange={(e) => onSelectOccasion(e.target.value)}
            className="w-full bg-[#181311] border border-[#4B3F38] rounded-xl px-3 py-2 text-xs font-semibold text-[#FAF7F2] cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#8A6B5D] shadow-inner"
          >
            {occasions.map((occ) => (
              <option key={occ.id} value={occ.id} className="bg-[#181311] text-[#FAF7F2]">
                {occ.label}
              </option>
            ))}
          </select>
        </div>

        {/* CENTER COMPARTMENT — "LIVE MODESTY GAUGE" */}
        <div className="bg-[#241D1A]/90 border border-[#4B3F38]/60 rounded-2xl p-4 sm:px-6 shadow-lg backdrop-blur-md flex items-center justify-center gap-5 text-[#FAF7F2]">
          
          {/* Circular SVG Gauge with Dark Track */}
          <div className="relative w-20 h-20 flex items-center justify-center shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 90 90">
              {/* Soft Dark Espresso Background Track */}
              <circle
                cx="45"
                cy="45"
                r={radius}
                className="stroke-[#3A2E28]"
                strokeWidth="6"
                fill="transparent"
              />
              {/* Vibrant Glowing Progress Stroke */}
              <circle
                cx="45"
                cy="45"
                r={radius}
                stroke={gaugeTheme.stroke}
                strokeWidth="6"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-700 ease-out"
              />
            </svg>

            {/* Percentage Number Inside Circle */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className={`font-mono ${gaugeTheme.text}`}>
                {averageMatchScore}%
              </span>
            </div>
          </div>

          {/* Focal Text & Label */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span className="text-[#FAF7F2] font-serif italic font-bold text-lg md:text-xl">
                Modest Match
              </span>
            </div>

            <div className={gaugeTheme.badgeBg}>
              {gaugeTheme.label}
            </div>

            <p className="text-[#A89F91] text-xs font-sans mt-0.5">
              Live score across {totalItemsCount} Canadian items
            </p>
          </div>

        </div>

        {/* RIGHT COMPARTMENT — "STORES" STORAGE BASKET/BIN */}
        <div className="bg-[#241D1A]/90 border border-[#4B3F38]/60 shadow-lg backdrop-blur-md rounded-2xl p-4 text-[#FAF7F2] flex flex-col items-center">
          {/* Top Detail: Small Handle Accent */}
          <div className="w-8 h-1.5 bg-[#8A6B5D]/60 rounded-full mx-auto mb-2" />

          <div className="flex items-center gap-1.5 mb-2">
            <Store className="w-3.5 h-3.5 text-[#B89A8E]" />
            <h3 className="text-[#D6CFCE] font-sans text-xs tracking-widest uppercase font-semibold text-center">
              STORES
            </h3>
          </div>

          {/* Dark Inset Select Box */}
          <select
            value={selectedStore}
            onChange={(e) => onSelectStore(e.target.value)}
            className="w-full bg-[#181311] border border-[#4B3F38] rounded-xl px-3 py-2 text-xs font-semibold text-[#FAF7F2] cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#8A6B5D] shadow-inner"
          >
            {stores.map((s) => (
              <option key={s.id} value={s.id} className="bg-[#181311] text-[#FAF7F2]">
                {s.label}
              </option>
            ))}
          </select>
        </div>

      </div>

    </div>
  );
};
