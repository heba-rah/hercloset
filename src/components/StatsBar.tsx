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
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4 text-[#4B3F38] dark:text-[#F2EDE6]">
      
      {/* Total Scanned */}
      <div className="p-3.5 rounded-2xl bg-[#FAF7F2] dark:bg-[#241E1B] border border-[#D6CFCE] dark:border-[#443732] shadow-sm flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-[#F2EDE6] dark:bg-[#181412] text-[#8A6B5D] dark:text-[#C4A497] border border-[#D6CFCE] dark:border-[#443732]">
          <Filter className="w-4 h-4" />
        </div>
        <div>
          <span className="text-[11px] text-[#4B3F38]/70 dark:text-[#F2EDE6]/70 font-medium block">Total Scanned</span>
          <span className="font-bold text-lg text-[#4B3F38] dark:text-[#F2EDE6]">{total} items</span>
        </div>
      </div>

      {/* High Coverage Match */}
      <div className="p-3.5 rounded-2xl bg-[#FAF7F2] dark:bg-[#241E1B] border border-[#D6CFCE] dark:border-[#443732] shadow-sm flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-[#F2EDE6] dark:bg-[#181412] text-[#8A6B5D] dark:text-[#C4A497] border border-[#B89A8E] dark:border-[#8A6B5D]">
          <ShieldCheck className="w-4 h-4" />
        </div>
        <div>
          <span className="text-[11px] text-[#4B3F38]/70 dark:text-[#F2EDE6]/70 font-medium block">90%+ Modest Match</span>
          <span className="font-bold text-lg text-[#8A6B5D] dark:text-[#C4A497]">{highMatches} items</span>
        </div>
      </div>

      {/* Average Match % */}
      <div className="p-3.5 rounded-2xl bg-[#FAF7F2] dark:bg-[#241E1B] border border-[#D6CFCE] dark:border-[#443732] shadow-sm flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-[#F2EDE6] dark:bg-[#181412] text-[#B89A8E] dark:text-[#C4A497] border border-[#D6CFCE] dark:border-[#443732]">
          <Sparkles className="w-4 h-4" />
        </div>
        <div>
          <span className="text-[11px] text-[#4B3F38]/70 dark:text-[#F2EDE6]/70 font-medium block">Average Match %</span>
          <span className="font-bold text-lg text-[#8A6B5D] dark:text-[#C4A497]">{avgScore}%</span>
        </div>
      </div>

      {/* Flagged Deficiencies */}
      <div className="p-3.5 rounded-2xl bg-[#FAF7F2] dark:bg-[#241E1B] border border-[#D6CFCE] dark:border-[#443732] shadow-sm flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
          <AlertTriangle className="w-4 h-4" />
        </div>
        <div>
          <span className="text-[11px] text-[#4B3F38]/70 dark:text-[#F2EDE6]/70 font-medium block">Rule Failures</span>
          <span className="font-bold text-lg text-rose-800 dark:text-rose-300">
            {isAiMode ? `${failedMatches} items` : '0 (Ignored)'}
          </span>
        </div>
      </div>

    </div>
  );
};
