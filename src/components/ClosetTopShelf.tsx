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
    { id: 'modanisa', label: 'Modanisa' },
    { id: 'gymshark', label: 'Gymshark' },
  ];

  // Dynamic Color Coding based on score
  const getGaugeColor = (score: number) => {
    if (score >= 80) {
      return {
        stroke: '#10B981',
        text: 'text-[#059669]',
        badgeBg: 'bg-emerald-50 border-emerald-300 text-emerald-800',
        label: 'High Modesty'
      };
    }
    if (score >= 60) {
      return {
        stroke: '#F59E0B',
        text: 'text-[#D97706]',
        badgeBg: 'bg-amber-50 border-amber-300 text-amber-800',
        label: 'Moderate Modesty'
      };
    }
    return {
      stroke: '#EF4444',
      text: 'text-[#DC2626]',
      badgeBg: 'bg-rose-50 border-rose-300 text-rose-800',
      label: 'Low Modesty'
    };
  };

  const gaugeTheme = getGaugeColor(averageMatchScore);

  // SVG Circular Gauge parameters
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (averageMatchScore / 100) * circumference;

  return (
    <div className="bg-[#FAF7F2] border border-[#D6CFCE] rounded-3xl p-5 sm:p-6 my-6 shadow-sm transition-all">
      
      {/* 3-Section Closet Top Shelf Grid Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        
        {/* LEFT DRAWER / BASKET: OCCASION */}
        <div className="bg-[#F2EDE6] border border-[#B89A8E]/40 rounded-2xl p-4 flex flex-col items-center justify-center space-y-2 shadow-inner group">
          {/* Subtle Woven Drawer Handle */}
          <div className="w-10 h-1.5 rounded-full bg-[#B89A8E]/60 group-hover:bg-[#8A6B5D] transition-colors" />
          
          <div className="flex items-center gap-1.5 text-[#4B3F38]">
            <Tag className="w-3.5 h-3.5 text-[#8A6B5D]" />
            <span className="text-[11px] font-extrabold tracking-widest uppercase">
              OCCASION
            </span>
          </div>

          {/* Inset Label Plate Dropdown Selector */}
          <select
            value={selectedOccasion}
            onChange={(e) => onSelectOccasion(e.target.value)}
            className="w-full bg-white border border-[#B89A8E] rounded-xl px-3.5 py-2 text-xs font-bold text-[#4B3F38] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#8A6B5D] shadow-sm"
          >
            {occasions.map((occ) => (
              <option key={occ.id} value={occ.id}>
                {occ.label}
              </option>
            ))}
          </select>
        </div>

        {/* CENTER: INTERACTIVE "MODEST MATCH" CIRCULAR METER */}
        <div className="flex items-center justify-center gap-4 bg-[#FAF7F2] py-2 px-4 rounded-2xl">
          
          {/* SVG Circular Progress Ring */}
          <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              {/* Background Track Circle */}
              <circle
                cx="50"
                cy="50"
                r={radius}
                className="stroke-[#D6CFCE]/50"
                strokeWidth="7"
                fill="transparent"
              />
              {/* Dynamic Animated Progress Circle */}
              <circle
                cx="50"
                cy="50"
                r={radius}
                stroke={gaugeTheme.stroke}
                strokeWidth="7"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-700 ease-out"
              />
            </svg>

            {/* Inner Percentage Value */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className={`text-xl font-extrabold font-mono ${gaugeTheme.text}`}>
                {averageMatchScore}%
              </span>
            </div>
          </div>

          {/* Right Meter Label & Title */}
          <div className="space-y-1">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#8A6B5D]" />
              <span className="font-serif italic text-lg sm:text-xl font-bold text-[#4B3F38]">
                Modest Match
              </span>
            </div>

            <div className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${gaugeTheme.badgeBg}`}>
              {gaugeTheme.label}
            </div>

            <p className="text-[11px] text-[#8A6B5D] font-semibold">
              Live feed average for {totalItemsCount} Canadian items
            </p>
          </div>

        </div>

        {/* RIGHT DRAWER / BASKET: STORES */}
        <div className="bg-[#F2EDE6] border border-[#B89A8E]/40 rounded-2xl p-4 flex flex-col items-center justify-center space-y-2 shadow-inner group">
          {/* Subtle Woven Drawer Handle */}
          <div className="w-10 h-1.5 rounded-full bg-[#B89A8E]/60 group-hover:bg-[#8A6B5D] transition-colors" />

          <div className="flex items-center gap-1.5 text-[#4B3F38]">
            <Store className="w-3.5 h-3.5 text-[#8A6B5D]" />
            <span className="text-[11px] font-extrabold tracking-widest uppercase">
              STORES
            </span>
          </div>

          {/* Inset Label Plate Dropdown Selector */}
          <select
            value={selectedStore}
            onChange={(e) => onSelectStore(e.target.value)}
            className="w-full bg-white border border-[#B89A8E] rounded-xl px-3.5 py-2 text-xs font-bold text-[#4B3F38] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#8A6B5D] shadow-sm"
          >
            {stores.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

      </div>

    </div>
  );
};
