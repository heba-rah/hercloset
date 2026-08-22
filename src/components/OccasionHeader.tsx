'use client';

import React from 'react';
import { Occasion } from '@/types/product';
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
      <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-100 font-serif italic flex items-center justify-center gap-2">
        <Sparkles className="w-5 h-5 text-emerald-400 animate-pulse not-italic" />
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
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all shadow-md flex items-center gap-1.5 border ${
                isSelected
                  ? 'bg-gradient-to-r from-purple-900 via-purple-800 to-indigo-900 text-purple-200 border-purple-500/80 ring-2 ring-purple-500/40 shadow-purple-950/60 scale-105'
                  : 'bg-slate-900/90 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white hover:bg-slate-800'
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
