'use client';

import React from 'react';
import { AlertTriangle, ShieldCheck, ArrowRight } from 'lucide-react';
import { ModestyFilterState } from '@/types/product';

interface DemoBannerProps {
  filters: ModestyFilterState;
  onFilterChange: (updates: Partial<ModestyFilterState>) => void;
}

export const DemoBanner: React.FC<DemoBannerProps> = ({ filters, onFilterChange }) => {
  const isAiMode = filters.demoMode === 'ai_search';

  return (
    <div className={`my-3 rounded-xl border px-4 py-2.5 transition-all shadow-md flex items-center justify-between gap-3 text-xs ${
      isAiMode
        ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-200'
        : 'bg-rose-950/40 border-rose-800/60 text-rose-200'
    }`}>
      {/* Left: Compact status message */}
      <div className="flex items-center gap-2.5">
        <div className={`p-1.5 rounded-lg border ${
          isAiMode ? 'bg-emerald-900/60 border-emerald-700 text-emerald-400' : 'bg-rose-900/60 border-rose-700 text-rose-400'
        }`}>
          {isAiMode ? <ShieldCheck className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
        </div>
        
        <div>
          <span className="font-bold text-slate-100">
            {isAiMode ? '✨ AI Vision Audit Active:' : '⚠️ Broken Retailer Keyword Search Active:'}
          </span>
          <span className="text-slate-300 ml-1.5 hidden sm:inline">
            {isAiMode
              ? 'Computer vision scanning leg slits, cutouts, opacity & sleeve lengths.'
              : 'Keyword search misses hidden slits and open back cutouts.'}
          </span>
        </div>
      </div>

      {/* Right: Switch Mode Button */}
      <button
        onClick={() => onFilterChange({ demoMode: isAiMode ? 'broken_keyword' : 'ai_search' })}
        className={`px-3 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1.5 border transition-all shrink-0 ${
          isAiMode
            ? 'bg-rose-950/80 hover:bg-rose-900 text-rose-200 border-rose-800'
            : 'bg-emerald-950/80 hover:bg-emerald-900 text-emerald-200 border-emerald-700'
        }`}
      >
        <span>Switch to {isAiMode ? 'Broken Mode' : 'AI Vision Mode'}</span>
        <ArrowRight className="w-3 h-3" />
      </button>
    </div>
  );
};
