'use client';

import React from 'react';
import { Search, X } from 'lucide-react';

interface AnythingSpecificSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const AnythingSpecificSearch: React.FC<AnythingSpecificSearchProps> = ({
  searchQuery,
  onSearchChange
}) => {
  const quickSuggestions = [
    'Cargo wide leg sweats',
    'High neck satin gown',
    'Graduation dress',
    'Linen blazer suit',
    'Modest abaya'
  ];

  return (
    <div className="max-w-2xl mx-auto my-6 text-center space-y-3 px-4">
      {/* Label matching hand sketch style */}
      <div className="flex items-center justify-center gap-3">
        <label className="text-xl sm:text-2xl font-bold tracking-tight text-slate-200 font-serif italic">
          anything specific?
        </label>

        {/* Rounded Pill Search Box matching sketch */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Cargo wide leg sweats..."
            className="w-full bg-slate-900/90 border-2 border-purple-900/60 focus:border-purple-500 rounded-full pl-11 pr-10 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-4 focus:ring-purple-500/20 shadow-lg shadow-purple-950/20 transition-all font-sans"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Quick pill search tags */}
      <div className="flex items-center justify-center gap-1.5 flex-wrap text-xs text-slate-400">
        <span className="text-[11px] font-semibold text-slate-500">Popular:</span>
        {quickSuggestions.map((tag) => (
          <button
            key={tag}
            onClick={() => onSearchChange(tag)}
            className="px-2.5 py-1 rounded-full bg-slate-900/60 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-purple-300 transition-all text-[11px]"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};
