'use client';

import React from 'react';
import { Sparkles, Search, SlidersHorizontal, UserCheck, LogIn, LogOut } from 'lucide-react';
import { ModestyFilterState, UserAccount } from '@/types/product';

interface HeaderProps {
  filters: ModestyFilterState;
  onFilterChange: (updates: Partial<ModestyFilterState>) => void;
  onToggleMobileFilters: () => void;
  totalMatchesCount: number;
  onOpenProfileModal: () => void;
  currentUser?: UserAccount | null;
  onOpenAuth?: () => void;
  onSignOut?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  filters,
  onFilterChange,
  onToggleMobileFilters,
  totalMatchesCount,
  onOpenProfileModal,
  currentUser,
  onOpenAuth,
  onSignOut
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#D6CFCE] text-[#4B3F38] shadow-sm">
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top Header Bar */}
        <div className="flex items-center justify-between h-20 gap-4">

          {/* Logo Component (Freestanding Icon & Mixed Typography Wordmark) */}
          <div className="flex items-center gap-3 cursor-pointer">
            <img
              src="/logo/logo.png"
              alt="hercloset logo"
              className="w-10 h-10 md:w-12 md:h-12 object-contain drop-shadow-xs"
            />
            <div className="flex items-baseline">
              <span className="font-serif italic font-normal text-3xl md:text-4xl text-[#3D312A]">
                her
              </span>
              <span className="font-serif not-italic font-medium text-3xl md:text-4xl text-[#3D312A] tracking-tight">
                closet
              </span>
            </div>
          </div>

          {/* Search Input */}
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A6B5D]" />
              <input
                type="text"
                placeholder="Search Urban Planet &amp; Ardene items..."
                value={filters.searchQuery}
                onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
                className="w-full bg-white border border-[#D6CFCE] rounded-xl pl-10 pr-10 py-2.5 text-sm font-sans text-[#4B3F38] placeholder-[#B89A8E] focus:outline-none focus:ring-2 focus:ring-[#8A6B5D]/40 shadow-inner"
              />
              {filters.searchQuery && (
                <button
                  onClick={() => onFilterChange({ searchQuery: '' })}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-sans text-[#8A6B5D] hover:text-[#4B3F38]"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Top-Right User Profile & Sign Out Controls */}
          <div className="flex items-center gap-3">
            {currentUser?.isLoggedIn ? (
              <div className="flex items-center gap-2.5">
                {/* User Name Badge (Hidden on mobile) */}
                <div className="hidden sm:flex flex-col items-end text-right">
                  <span className="text-xs font-bold text-[#4B3F38] leading-none">
                    {currentUser.name}
                  </span>
                  <span className="text-[10px] font-mono text-[#8A6B5D]">
                    {currentUser.email}
                  </span>
                </div>

                {/* Profile Card Button */}
                <button
                  onClick={onOpenProfileModal}
                  className="w-10 h-10 rounded-xl bg-[#FAF7F2] border border-[#D6CFCE] shadow-sm hover:border-[#8A6B5D] hover:shadow-md transition-all flex items-center justify-center cursor-pointer relative group"
                  title={`${currentUser.name} (${currentUser.email}) — Edit Modesty Profile`}
                >
                  <UserCheck className="w-5 h-5 text-[#8A6B5D]" />
                  {/* Green Status Dot: Active Profile Synced */}
                  <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#FAF7F2] shadow-sm animate-pulse" />

                  {/* Tooltip on Hover */}
                  <div className="absolute top-12 right-0 whitespace-nowrap pointer-events-none text-xs font-sans font-semibold bg-[#4B3F38] text-[#FAF7F2] px-3 py-1 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 z-50">
                    Edit Account Default Profile
                  </div>
                </button>

                {/* Sign Out Button */}
                {onSignOut && (
                  <button
                    onClick={onSignOut}
                    className="p-2.5 rounded-xl bg-[#FAF7F2] hover:bg-rose-50 border border-[#D6CFCE] hover:border-rose-300 text-[#8A6B5D] hover:text-rose-700 shadow-sm transition-all flex items-center gap-1.5 font-sans text-xs font-semibold cursor-pointer group"
                    title="Sign Out of Account"
                  >
                    <LogOut className="w-4 h-4 text-[#8A6B5D] group-hover:text-rose-700" />
                    <span className="hidden md:inline">Sign Out</span>
                  </button>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#8A6B5D] hover:bg-[#4B3F38] text-white font-sans text-xs font-bold shadow-md transition-all"
              >
                <LogIn className="w-4 h-4" />
                <span>Sign In / Register</span>
              </button>
            )}

            <button
              onClick={onToggleMobileFilters}
              className="lg:hidden p-2.5 rounded-xl bg-[#FAF7F2] border border-[#D6CFCE] text-[#4B3F38] hover:bg-[#F2EDE6]"
              aria-label="Open Filters"
            >
              <SlidersHorizontal className="w-5 h-5" />
            </button>
          </div>

        </div>

        {/* Mobile Search Bar */}
        <div className="pb-3 md:hidden">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A6B5D]" />
            <input
              type="text"
              placeholder="Search modest fashion..."
              value={filters.searchQuery}
              onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
              className="w-full bg-white border border-[#D6CFCE] rounded-xl pl-10 pr-4 py-2 text-sm font-sans text-[#4B3F38] placeholder-[#B89A8E]"
            />
          </div>
        </div>

      </div>
    </header>
  );
};
