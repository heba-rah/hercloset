'use client';

import React from 'react';
import { Sparkles, Search, SlidersHorizontal, ShieldCheck, AlertTriangle, Store, Sun, Moon } from 'lucide-react';
import { ModestyFilterState } from '@/types/product';

interface HeaderProps {
  filters: ModestyFilterState;
  onFilterChange: (updates: Partial<ModestyFilterState>) => void;
  onToggleMobileFilters: () => void;
  totalMatchesCount: number;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  filters,
  onFilterChange,
  onToggleMobileFilters,
  totalMatchesCount,
  isDarkMode,
  onToggleTheme
}) => {
  const stores = [
    { id: 'all', label: 'All Stores' },
    { id: 'urban planet', label: 'Urban Planet' },
    { id: 'ardene', label: 'Ardene' },
  ];

  const isAiMode = filters.demoMode === 'ai_search';

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 dark:bg-[#241E1B]/95 backdrop-blur-md border-b border-[#D6CFCE] dark:border-[#443732] text-[#4B3F38] dark:text-[#F2EDE6] shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-2xl bg-gradient-to-tr from-[#8A6B5D] via-[#B89A8E] to-[#4B3F38] dark:to-[#C4A497] p-0.5 shadow-md">
              <div className="h-full w-full bg-[#FAF7F2] dark:bg-[#241E1B] rounded-[14px] flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-[#8A6B5D] dark:text-[#C4A497]" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-2xl tracking-tight bg-gradient-to-r from-[#8A6B5D] via-[#B89A8E] to-[#4B3F38] dark:to-[#F2EDE6] bg-clip-text text-transparent">
                  hercloset
                </span>
                <span className="text-[10px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-[#B89A8E]/20 dark:bg-[#8A6B5D]/30 text-[#8A6B5D] dark:text-[#C4A497] border border-[#B89A8E]/40 dark:border-[#8A6B5D]/50">
                  AI Fashion Engine
                </span>
              </div>
              <p className="text-xs text-[#8A6B5D] dark:text-[#C4A497] hidden sm:block">
                Modesty search across live Urban Planet &amp; Ardene Canada catalogs
              </p>
            </div>
          </div>

          {/* Search Input */}
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A6B5D] dark:text-[#C4A497]" />
              <input
                type="text"
                placeholder="Search Urban Planet &amp; Ardene items..."
                value={filters.searchQuery}
                onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
                className="w-full bg-white dark:bg-[#181412] border border-[#D6CFCE] dark:border-[#443732] rounded-xl pl-10 pr-10 py-2.5 text-sm text-[#4B3F38] dark:text-[#F2EDE6] placeholder-[#B89A8E] dark:placeholder-[#8A6B5D] focus:outline-none focus:ring-2 focus:ring-[#8A6B5D]/40 shadow-inner"
              />
              {filters.searchQuery && (
                <button
                  onClick={() => onFilterChange({ searchQuery: '' })}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8A6B5D] dark:text-[#C4A497] hover:text-[#4B3F38]"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Controls: Demo Switch + Theme Toggle */}
          <div className="flex items-center gap-2.5">
            {/* Dark/Light Mode Theme Toggle Button */}
            <button
              onClick={onToggleTheme}
              className="p-2.5 rounded-xl bg-white dark:bg-[#181412] border border-[#D6CFCE] dark:border-[#443732] text-[#8A6B5D] dark:text-[#C4A497] hover:bg-[#F2EDE6] dark:hover:bg-[#2D2522] transition-all shadow-sm"
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Demo Mode Toggle Switch */}
            <div className="hidden xl:flex items-center gap-2 bg-[#F2EDE6] dark:bg-[#181412] p-1.5 rounded-xl border border-[#D6CFCE] dark:border-[#443732]">
              <button
                onClick={() => onFilterChange({ demoMode: 'broken_keyword' })}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  !isAiMode
                    ? 'bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-800 shadow-sm'
                    : 'text-[#4B3F38]/70 dark:text-[#F2EDE6]/70 hover:text-[#4B3F38]'
                }`}
              >
                <AlertTriangle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                <span>Broken Keyword Search</span>
              </button>

              <button
                onClick={() => onFilterChange({ demoMode: 'ai_search' })}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  isAiMode
                    ? 'bg-[#8A6B5D] text-white shadow-sm'
                    : 'text-[#4B3F38]/70 dark:text-[#F2EDE6]/70 hover:text-[#4B3F38]'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#F2EDE6]" />
                <span>AI Vision Modesty Search</span>
              </button>
            </div>

            <button
              onClick={onToggleMobileFilters}
              className="lg:hidden p-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#241E1B] border border-[#D6CFCE] dark:border-[#443732] text-[#4B3F38] dark:text-[#F2EDE6] hover:bg-[#F2EDE6]"
              aria-label="Open Filters"
            >
              <SlidersHorizontal className="w-5 h-5" />
            </button>
          </div>

        </div>

        {/* Mobile Search Bar */}
        <div className="pb-3 md:hidden">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A6B5D] dark:text-[#C4A497]" />
            <input
              type="text"
              placeholder="Search modest fashion..."
              value={filters.searchQuery}
              onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
              className="w-full bg-white dark:bg-[#181412] border border-[#D6CFCE] dark:border-[#443732] rounded-xl pl-10 pr-4 py-2 text-sm text-[#4B3F38] dark:text-[#F2EDE6] placeholder-[#B89A8E]"
            />
          </div>
        </div>

        {/* Store Navigation Pills Bar */}
        <div className="flex items-center gap-2 overflow-x-auto py-2.5 border-t border-[#D6CFCE] dark:border-[#443732] scrollbar-none">
          <span className="text-[11px] font-bold text-[#8A6B5D] dark:text-[#C4A497] uppercase tracking-wider flex items-center gap-1 mr-1 shrink-0">
            <Store className="w-3.5 h-3.5" /> Stores:
          </span>
          {stores.map((s) => (
            <button
              key={s.id}
              onClick={() => onFilterChange({ selectedRetailer: s.id })}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                filters.selectedRetailer === s.id
                  ? 'bg-[#8A6B5D] text-white border border-[#8A6B5D] shadow-sm'
                  : 'bg-white dark:bg-[#181412] text-[#4B3F38] dark:text-[#F2EDE6] border border-[#D6CFCE] dark:border-[#443732] hover:bg-[#F2EDE6] dark:hover:bg-[#2D2522]'
              }`}
            >
              {s.label}
            </button>
          ))}
          <span className="ml-auto text-xs text-[#8A6B5D] dark:text-[#C4A497] font-mono hidden sm:block">
            {totalMatchesCount} Canadian items
          </span>
        </div>

      </div>
    </header>
  );
};
