'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';

interface OccasionHeaderProps {
  selectedOccasion: string;
  onSelectOccasion: (occasion: string) => void;
}

export const OccasionHeader: React.FC<OccasionHeaderProps> = ({
  selectedOccasion,
  onSelectOccasion
}) => {
  const occasions: { id: string; label: string; icon: string }[] = [
    { id: 'all', label: 'All Occasions', icon: '✨' },
    { id: 'gymwear', label: 'Gymwear', icon: '👟' },
    { id: 'graduation', label: 'Graduation', icon: '🎓' },
    { id: 'wedding', label: 'Wedding', icon: '🥂' },
    { id: 'workwear', label: 'Work / Professional', icon: '💼' },
    { id: 'school', label: 'School & Campus', icon: '📚' },
    { id: 'casual', label: 'Everyday Casual', icon: '☕' },
    { id: 'eid', label: 'Eid & Holidays', icon: '🌙' },
  ];

  return (
    <div className="text-center my-6 space-y-3">
      {/* Title matching hand sketch font styling */}
      <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#4B3F38] dark:text-[#F2EDE6] font-serif italic flex items-center justify-center gap-2">
        <Sparkles className="w-5 h-5 text-[#8A6B5D] dark:text-[#C4A497] not-italic" />
        <span>what&apos;s the occasion?</span>
      </h2>

      {/* Occasion Pills Row */}
      <div className="flex items-center justify-center gap-2 flex-wrap max-w-4xl mx-auto px-4">
        {occasions.map((occ) => {
          const isSelected = selectedOccasion === occ.id;
          return (
            <button
              key={occ.id}
              onClick={() => onSelectOccasion(occ.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all shadow-sm flex items-center gap-1.5 border ${
                isSelected
                  ? 'bg-[#8A6B5D] text-white border-[#8A6B5D] shadow-md scale-105'
                  : 'bg-[#FAF7F2] dark:bg-[#241E1B] text-[#4B3F38] dark:text-[#F2EDE6] border-[#D6CFCE] dark:border-[#443732] hover:bg-[#F2EDE6] dark:hover:bg-[#2D2522]'
              }`}
            >
              <span>{occ.icon}</span>
              <span>{occ.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
