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
    <div className={`my-3 rounded-xl border px-4 py-2.5 transition-all shadow-sm flex items-center justify-between gap-3 text-xs ${isAiMode
        ? 'bg-[#FAF7F2] border-[#D6CFCE] text-[#4B3F38]'
        : 'bg-rose-50 border-rose-200 text-rose-900'
      }`}>
      {/* Left: Compact status message */}
      <div className="flex items-center gap-2.5">
        <div className={`p-1.5 rounded-lg border ${isAiMode ? 'bg-[#F2EDE6] border-[#B89A8E] text-[#8A6B5D]' : 'bg-rose-100 border-rose-300 text-rose-700'
          }`}>
          {isAiMode ? <ShieldCheck className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
        </div>

        <div>
          <span className="font-bold text-[#4B3F38]">
            {isAiMode ? '✨ AI Vision Audit Active:' : '⚠️ Broken Retailer Keyword Search Active:'}
          </span>
          <span className="text-[#4B3F38]/80 ml-1.5 hidden sm:inline">
            {isAiMode
              ? 'Computer vision scanning leg slits, cutouts, opacity & sleeve lengths.'
              : 'Keyword search misses hidden slits and open back cutouts.'}
          </span>
        </div>
      </div>

      {/* Right: Switch Mode Button */}
      <button
        onClick={() => onFilterChange({ demoMode: isAiMode ? 'broken_keyword' : 'ai_search' })}
        className={`px-3 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1.5 border transition-all shrink-0 ${isAiMode
            ? 'bg-[#8A6B5D] hover:bg-[#4B3F38] text-white border-[#8A6B5D]'
            : 'bg-rose-800 hover:bg-rose-900 text-white border-rose-800'
          }`}
      >
        <span>Switch to {isAiMode ? 'Broken Mode' : 'AI Vision Mode'}</span>
        <ArrowRight className="w-3 h-3" />
      </button>
    </div>
  );
};
