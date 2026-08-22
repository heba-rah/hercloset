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
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4">
      
      {/* Total Scanned */}
      <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-md flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-slate-950 text-slate-300 border border-slate-800">
          <Filter className="w-4 h-4" />
        </div>
        <div>
          <span className="text-[11px] text-slate-400 font-medium block">Total Scanned</span>
          <span className="font-bold text-lg text-slate-100">{total} items</span>
        </div>
      </div>

      {/* High Coverage Match */}
      <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-md flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-800">
          <ShieldCheck className="w-4 h-4" />
        </div>
        <div>
          <span className="text-[11px] text-slate-400 font-medium block">90%+ Modest Match</span>
          <span className="font-bold text-lg text-emerald-400">{highMatches} items</span>
        </div>
      </div>

      {/* Average Match % */}
      <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-md flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-teal-950 text-teal-400 border border-teal-800">
          <Sparkles className="w-4 h-4" />
        </div>
        <div>
          <span className="text-[11px] text-slate-400 font-medium block">Average Match %</span>
          <span className="font-bold text-lg text-teal-300">{avgScore}%</span>
        </div>
      </div>

      {/* Flagged Deficiencies */}
      <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-md flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-rose-950 text-rose-400 border border-rose-800">
          <AlertTriangle className="w-4 h-4" />
        </div>
        <div>
          <span className="text-[11px] text-slate-400 font-medium block">Rule Failures</span>
          <span className="font-bold text-lg text-rose-400">
            {isAiMode ? `${failedMatches} items` : '0 (Ignored)'}
          </span>
        </div>
      </div>

    </div>
  );
};
