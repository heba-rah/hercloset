'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { ModestyFilterState, ModestyProfile, Product } from '@/types/product';
import { mockProducts } from '@/data/mockProducts';
import { filterAndScoreProducts } from '@/utils/filterEngine';

import { Header } from '@/components/Header';
import { ClosetTopShelf } from '@/components/ClosetTopShelf';
import { PinterestGrid } from '@/components/PinterestGrid';
import { ModestyFilters } from '@/components/ModestyFilters';
import { AuditModal } from '@/components/AuditModal';
import { OnboardingWizard } from '@/components/OnboardingWizard';
import { PermanentProfileModal } from '@/components/PermanentProfileModal';
import { HamperDrawer } from '@/components/HamperDrawer';
import { HamperButton } from '@/components/HamperButton';
import { Sparkles, ShieldCheck, X, ChevronLeft, ChevronRight } from 'lucide-react';

// 35 items + 1 avatar tile = 36 total grid items (perfect multiple of 6, 4, 3, 2 columns)
const ITEMS_PER_PAGE = 35;

const INITIAL_PROFILE: ModestyProfile = {
  name: 'My Custom Modesty Rules',
  necklines: ['high', 'crew'],
  sleeveLengths: ['wrist', '3/4'],
  hemlines: ['floor', 'ankle'],
  fits: [],
  noSlits: true,
  noOpenBack: true,
  isOpaque: true,
  selectedRetailers: ['Urban Planet', 'Ardene'],
  selectedOccasions: ['gymwear', 'graduation', 'wedding', 'workwear', 'school', 'casual', 'eid'],
  isProfileComplete: false
};

const INITIAL_FILTERS: ModestyFilterState = {
  necklines: ['high', 'crew'],
  sleeveLengths: ['wrist', '3/4'],
  hemlines: ['floor', 'ankle'],
  fits: [],
  noSlits: true,
  noOpenBack: true,
  isOpaque: true,
  minModestyScore: 70,
  searchQuery: '',
  selectedCategory: 'all',
  selectedRetailer: 'all',
  selectedOccasion: 'all',
  demoMode: 'ai_search'
};

export default function Home() {
  const [profile, setProfile] = useState<ModestyProfile>(INITIAL_PROFILE);
  const [filters, setFilters] = useState<ModestyFilterState>(INITIAL_FILTERS);
  const [selectedAuditProduct, setSelectedAuditProduct] = useState<Product | null>(null);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState<boolean>(false);
  const [isFiltersDrawerOpen, setIsFiltersDrawerOpen] = useState<boolean>(false);
  const [isPermanentProfileModalOpen, setIsPermanentProfileModalOpen] = useState<boolean>(false);
  const [showWizardModal, setShowWizardModal] = useState<boolean>(false);

  const [hamper, setHamper] = useState<Product[]>([]);
  const [isHamperOpen, setIsHamperOpen] = useState<boolean>(false);

  // Pagination State
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Load permanent profile from localStorage on mount if available
  useEffect(() => {
    try {
      const stored = localStorage.getItem('hercloset_permanent_profile');
      if (stored) {
        const parsed = JSON.parse(stored);
        setProfile(parsed);
        setFilters(prev => ({
          ...prev,
          necklines: parsed.necklines || prev.necklines,
          sleeveLengths: parsed.sleeveLengths || prev.sleeveLengths,
          hemlines: parsed.hemlines || prev.hemlines,
          fits: parsed.fits || prev.fits,
          noSlits: parsed.noSlits ?? prev.noSlits,
          noOpenBack: parsed.noOpenBack ?? prev.noOpenBack,
          isOpaque: parsed.isOpaque ?? prev.isOpaque,
        }));
      }
    } catch {
      // fallback
    }
  }, []);

  // Automatically reset to Page 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const handleSaveProfile = (newProfile: ModestyProfile) => {
    setProfile(newProfile);
    setFilters(prev => ({
      ...prev,
      necklines: newProfile.necklines,
      sleeveLengths: newProfile.sleeveLengths,
      hemlines: newProfile.hemlines,
      fits: newProfile.fits,
      noSlits: newProfile.noSlits,
      noOpenBack: newProfile.noOpenBack,
      isOpaque: newProfile.isOpaque,
      selectedRetailer: 'all'
    }));
    setShowWizardModal(false);
    setIsPermanentProfileModalOpen(false);
  };

  const handleFilterChange = (updates: Partial<ModestyFilterState>) => {
    setFilters(prev => ({ ...prev, ...updates }));
  };

  const handleResetFilters = () => {
    setFilters(INITIAL_FILTERS);
  };

  const handleApplyStrictPreset = () => {
    setFilters(prev => ({
      ...prev,
      necklines: ['high'],
      sleeveLengths: ['wrist'],
      hemlines: ['floor'],
      fits: ['loose', 'relaxed'],
      noSlits: true,
      noOpenBack: true,
      isOpaque: true,
      demoMode: 'ai_search'
    }));
  };

  const handleApplySmartPreset = () => {
    setFilters(prev => ({
      ...prev,
      necklines: ['high', 'crew'],
      sleeveLengths: ['wrist', '3/4'],
      hemlines: ['floor', 'ankle', 'midi'],
      fits: [],
      noSlits: true,
      noOpenBack: true,
      isOpaque: true,
      demoMode: 'ai_search'
    }));
  };

  const handleToggleHamper = (product: Product) => {
    setHamper(prev => {
      const exists = prev.some(p => p.id === product.id);
      if (exists) {
        return prev.filter(p => p.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const calculatedMatches = useMemo(() => {
    return filterAndScoreProducts(mockProducts, filters);
  }, [filters]);

  const averageMatchScore = useMemo(() => {
    if (calculatedMatches.length === 0) return 0;
    const sum = calculatedMatches.reduce((acc, m) => acc + m.matchPercentage, 0);
    return Math.round(sum / calculatedMatches.length);
  }, [calculatedMatches]);

  const totalPages = Math.ceil(calculatedMatches.length / ITEMS_PER_PAGE) || 1;

  const paginatedMatches = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return calculatedMatches.slice(start, start + ITEMS_PER_PAGE);
  }, [calculatedMatches, currentPage]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.noSlits) count++;
    if (filters.noOpenBack) count++;
    if (filters.isOpaque) count++;
    if (filters.necklines.length > 0) count += filters.necklines.length;
    if (filters.sleeveLengths.length > 0) count += filters.sleeveLengths.length;
    if (filters.hemlines.length > 0) count += filters.hemlines.length;
    if (filters.fits.length > 0) count += filters.fits.length;
    return count;
  }, [filters]);

  return (
    <div className="min-h-screen bg-[#F2EDE6] text-[#4B3F38] flex flex-col font-sans selection:bg-[#B89A8E] selection:text-white">
      
      {/* Onboarding Profile Wizard Modal */}
      {(!profile.isProfileComplete || showWizardModal) && (
        <OnboardingWizard
          initialProfile={profile}
          onSaveProfile={handleSaveProfile}
          isEditing={profile.isProfileComplete}
          onClose={() => setShowWizardModal(false)}
        />
      )}

      {/* Permanent Modesty Profile Modal (Triggered by top-right square card) */}
      {isPermanentProfileModalOpen && (
        <PermanentProfileModal
          initialProfile={profile}
          onSaveProfile={handleSaveProfile}
          onClose={() => setIsPermanentProfileModalOpen(false)}
        />
      )}

      {/* Top Header Navigation */}
      <Header
        filters={filters}
        onFilterChange={handleFilterChange}
        onToggleMobileFilters={() => setIsMobileFiltersOpen(true)}
        totalMatchesCount={calculatedMatches.length}
        onOpenProfileModal={() => setIsPermanentProfileModalOpen(true)}
      />

      {/* FULL-WIDTH HOLLOW WARDROBE TOP SHELF */}
      <ClosetTopShelf
        selectedOccasion={filters.selectedOccasion}
        onSelectOccasion={(occ) => handleFilterChange({ selectedOccasion: occ })}
        selectedStore={filters.selectedRetailer}
        onSelectStore={(store) => handleFilterChange({ selectedRetailer: store })}
        averageMatchScore={averageMatchScore}
        totalItemsCount={calculatedMatches.length}
      />

      {/* Main Full-Width Content Area with Persistent Stylist Tile in Position #1 */}
      <main className="flex-1 max-w-[1800px] w-full mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        
        {/* FULL-WIDTH EDGE-TO-EDGE PINTEREST MASONRY GRID (PERSISTENT STYLIST TILE AT POSITION #1 ON EVERY PAGE) */}
        <PinterestGrid
          matches={paginatedMatches}
          isAiMode={filters.demoMode === 'ai_search'}
          onOpenAuditModal={(prod) => setSelectedAuditProduct(prod)}
          onAddToHamper={handleToggleHamper}
          hamperProductIds={hamper.map(p => p.id)}
          onOpenFilters={() => setIsFiltersDrawerOpen(true)}
          activeFilterCount={activeFilterCount}
        />

        {/* CLEAN PAGINATION CONTROLS */}
        {calculatedMatches.length > 0 && (
          <div className="mt-8 pt-6 border-t border-[#D6CFCE] flex flex-col sm:flex-row items-center justify-between gap-4 font-sans">
            <span className="text-xs text-[#4B3F38] font-semibold">
              Page <span className="font-bold text-[#8A6B5D]">{currentPage}</span> of{' '}
              <span className="font-bold text-[#8A6B5D]">{totalPages}</span> — Showing{' '}
              <span className="font-mono text-[#8A6B5D]">
                {paginatedMatches.length} of {calculatedMatches.length}
              </span>{' '}
              Canadian garments
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setCurrentPage(prev => Math.max(1, prev - 1));
                  window.scrollTo({ top: 300, behavior: 'smooth' });
                }}
                disabled={currentPage === 1}
                className="bg-[#8A6B5D] hover:bg-[#6e5346] text-[#FAF7F2] font-sans text-xs font-semibold px-4 py-2 rounded-xl shadow-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5"
              >
                <ChevronLeft className="w-4 h-4 text-white" />
                <span>Previous</span>
              </button>

              <span className="px-3 py-1.5 rounded-lg bg-[#FAF7F2] border border-[#D6CFCE] text-xs font-mono font-bold text-[#4B3F38]">
                {currentPage} / {totalPages}
              </span>

              <button
                onClick={() => {
                  setCurrentPage(prev => Math.min(totalPages, prev + 1));
                  window.scrollTo({ top: 300, behavior: 'smooth' });
                }}
                disabled={currentPage === totalPages}
                className="bg-[#8A6B5D] hover:bg-[#6e5346] text-[#FAF7F2] font-sans text-xs font-semibold px-4 py-2 rounded-xl shadow-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        )}

      </main>

      {/* SLIDE-OVER MODESTY FILTERS DRAWER (For Current Session Tweaks) */}
      {isFiltersDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-[#4B3F38]/60 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-md h-full bg-[#FAF7F2] border-l border-[#D6CFCE] shadow-2xl flex flex-col justify-between text-[#4B3F38]">
            
            {/* Drawer Header */}
            <div className="p-5 border-b border-[#D6CFCE] flex items-center justify-between bg-[#F2EDE6]">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-white border border-[#B89A8E] text-[#8A6B5D]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif italic font-bold text-base text-[#4B3F38]">Session Filter Tweaks</h3>
                  <p className="text-xs text-[#8A6B5D]">Temporary adjustment for this search</p>
                </div>
              </div>

              <button
                onClick={() => setIsFiltersDrawerOpen(false)}
                className="p-2 rounded-full bg-white text-[#4B3F38] hover:bg-[#FAF7F2] border border-[#D6CFCE]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Filters Body */}
            <div className="flex-1 overflow-y-auto p-5">
              <ModestyFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                onReset={handleResetFilters}
                onApplyStrictPreset={handleApplyStrictPreset}
                onApplySmartPreset={handleApplySmartPreset}
              />
            </div>

            {/* Footer */}
            <div className="p-4 bg-[#F2EDE6] border-t border-[#D6CFCE] flex items-center justify-between">
              <span className="text-xs text-[#8A6B5D] font-semibold">
                {calculatedMatches.length} items match
              </span>
              <button
                onClick={() => setIsFiltersDrawerOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-[#8A6B5D] hover:bg-[#4B3F38] text-[#FAF7F2] font-bold text-xs shadow-md transition-all"
              >
                Apply to Feed
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Floating Aesthetic Woven Laundry Hamper Button */}
      <HamperButton
        itemCount={hamper.length}
        onClick={() => setIsHamperOpen(true)}
      />

      {/* Hamper Drawer */}
      <HamperDrawer
        isOpen={isHamperOpen}
        onClose={() => setIsHamperOpen(false)}
        hamperItems={hamper}
        onRemoveFromHamper={(id) => setHamper(prev => prev.filter(p => p.id !== id))}
        onClearHamper={() => setHamper([])}
      />

      {/* Mobile Filters Drawer */}
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end bg-[#4B3F38]/60 backdrop-blur-md">
          <div className="max-h-[85vh] overflow-y-auto p-4 bg-[#FAF7F2] rounded-t-3xl border-t border-[#D6CFCE]">
            <ModestyFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onReset={handleResetFilters}
              onApplyStrictPreset={handleApplyStrictPreset}
              onApplySmartPreset={handleApplySmartPreset}
              isMobileDrawer
              onCloseMobileDrawer={() => setIsMobileFiltersOpen(false)}
            />
          </div>
        </div>
      )}

      {/* AI Audit Modal */}
      <AuditModal
        product={selectedAuditProduct}
        onClose={() => setSelectedAuditProduct(null)}
      />

      {/* Footer */}
      <footer className="mt-auto border-t border-[#D6CFCE] bg-[#FAF7F2] py-8 text-xs text-[#8A6B5D]">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-lg bg-[#F2EDE6] border border-[#B89A8E] flex items-center justify-center text-[#8A6B5D]">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <span className="font-serif italic font-semibold text-[#4B3F38]">hercloset</span>
            <span>— AI-powered visual fashion search engine</span>
          </div>

          <div className="flex items-center gap-4 text-[#4B3F38]">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#8A6B5D]" /> Urban Planet &amp; Ardene Live Catalog
            </span>
          </div>
        </div>
      </footer>

    </div>
  );
}
