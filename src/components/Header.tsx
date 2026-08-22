'use client';

import React from 'react';
import { Sparkles, Search, SlidersHorizontal, ShieldCheck, AlertTriangle, Store } from 'lucide-react';
import { ModestyFilterState } from '@/types/product';

interface HeaderProps {
  filters: ModestyFilterState;
  onFilterChange: (updates: Partial<ModestyFilterState>) => void;
  onToggleMobileFilters: () => void;
  totalMatchesCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  filters,
  onFilterChange,
  onToggleMobileFilters,
  totalMatchesCount
}) => {
  const stores = [
    { id: 'all', label: 'All Stores' },
    { id: 'urban planet', label: 'Urban Planet' },
    { id: 'ardene', label: 'Ardene' },
  ];

  const isAiMode = filters.demoMode === 'ai_search';

  return (
    <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 text-slate-100 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-500 to-teal-400 p-0.5 shadow-lg shadow-purple-950/40">
              <div className="h-full w-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-purple-400 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-2xl tracking-tight bg-gradient-to-r from-purple-400 via-indigo-200 to-teal-200 bg-clip-text text-transparent">
                  hercloset
                </span>
                <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-purple-950/80 text-purple-300 border border-purple-800/60">
                  AI Fashion Engine
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Modesty search across live Urban Planet &amp; Ardene Canada catalogs
              </p>
            </div>
          </div>

          {/* Search Input */}
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400" />
              <input
                type="text"
                placeholder="Search Urban Planet &amp; Ardene items..."
                value={filters.searchQuery}
                onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
                className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-10 pr-10 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              />
              {filters.searchQuery && (
                <button
                  onClick={() => onFilterChange({ searchQuery: '' })}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-200"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Demo Mode Toggle Switch */}
          <div className="flex items-center gap-3">
            <div className="hidden xl:flex items-center gap-2 bg-slate-900/90 p-1.5 rounded-xl border border-slate-800">
              <button
                onClick={() => onFilterChange({ demoMode: 'broken_keyword' })}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  !isAiMode
                    ? 'bg-rose-950/80 text-rose-300 border border-rose-800/80 shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                <span>Broken Keyword Search</span>
              </button>

              <button
                onClick={() => onFilterChange({ demoMode: 'ai_search' })}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  isAiMode
                    ? 'bg-purple-950/90 text-purple-300 border border-purple-700/80 shadow-md shadow-purple-950'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                <span>AI Vision Modesty Search</span>
              </button>
            </div>

            <button
              onClick={onToggleMobileFilters}
              className="lg:hidden p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
              aria-label="Open Filters"
            >
              <SlidersHorizontal className="w-5 h-5" />
            </button>
          </div>

        </div>

        {/* Mobile Search Bar */}
        <div className="pb-3 md:hidden">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400" />
            <input
              type="text"
              placeholder="Search modest fashion..."
              value={filters.searchQuery}
              onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-sm text-slate-100 placeholder-slate-500"
            />
          </div>
        </div>

        {/* Store Navigation Pills Bar */}
        <div className="flex items-center gap-2 overflow-x-auto py-2.5 border-t border-slate-900 scrollbar-none">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 mr-1 shrink-0">
            <Store className="w-3.5 h-3.5 text-purple-400" /> Stores:
          </span>
          {stores.map((s) => (
            <button
              key={s.id}
              onClick={() => onFilterChange({ selectedRetailer: s.id })}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                filters.selectedRetailer === s.id
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/60'
                  : 'bg-slate-900/60 text-slate-400 border border-slate-800/60 hover:text-slate-200'
              }`}
            >
              {s.label}
            </button>
          ))}
          <span className="ml-auto text-xs text-slate-500 font-mono hidden sm:block">
            {totalMatchesCount} Canadian items
          </span>
        </div>

      </div>
    </header>
  );
};
