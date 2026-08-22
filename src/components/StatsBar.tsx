'use client';

import React from 'react';
import { CalculatedMatch } from '@/types/product';
import { ShieldCheck, AlertTriangle, Sparkles, Filter } from 'lucide-react';

interface StatsBarProps {
  matches: CalculatedMatch[];
  isAiMode: boolean;
}

export const StatsBar: React.FC<StatsBarProps> = ({ matches, isAiMode }) => {
  const total = matches.length;
  const highMatches = matches.filter(m => m.matchPercentage >= 90 && m.passedFilters).length;
  const failedMatches = matches.filter(m => !m.passedFilters || m.matchPercentage < 70).length;
  const avgScore = total > 0
    ? Math.round(matches.reduce((acc, m) => acc + m.matchPercentage, 0) / total)
    : 0;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4 text-[#4B3F38]">

      {/* Total Scanned */}
      <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#D6CFCE] shadow-sm flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-[#F2EDE6] text-[#8A6B5D] border border-[#D6CFCE]">
          <Filter className="w-4 h-4" />
        </div>
        <div>
          <span className="text-[11px] text-[#4B3F38]/70 font-medium block">Total Scanned</span>
          <span className="font-bold text-lg text-[#4B3F38]">{total} items</span>
        </div>
      </div>

      {/* High Coverage Match */}
      <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#D6CFCE] shadow-sm flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-[#F2EDE6] text-[#8A6B5D] border border-[#B89A8E]">
          <ShieldCheck className="w-4 h-4" />
        </div>
        <div>
          <span className="text-[11px] text-[#4B3F38]/70 font-medium block">90%+ Modest Match</span>
          <span className="font-bold text-lg text-[#8A6B5D]">{highMatches} items</span>
        </div>
      </div>

      {/* Average Match % */}
      <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#D6CFCE] shadow-sm flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-[#F2EDE6] text-[#B89A8E] border border-[#D6CFCE]">
          <Sparkles className="w-4 h-4" />
        </div>
        <div>
          <span className="text-[11px] text-[#4B3F38]/70 font-medium block">Average Match %</span>
          <span className="font-bold text-lg text-[#8A6B5D]">{avgScore}%</span>
        </div>
      </div>

      {/* Flagged Deficiencies */}
      <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#D6CFCE] shadow-sm flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-rose-50 text-rose-700 border border-rose-200">
          <AlertTriangle className="w-4 h-4" />
        </div>
        <div>
          <span className="text-[11px] text-[#4B3F38]/70 font-medium block">Rule Failures</span>
          <span className="font-bold text-lg text-rose-800">
            {isAiMode ? `${failedMatches} items` : '0 (Ignored)'}
          </span>
        </div>
      </div>

    </div>
  );
};
