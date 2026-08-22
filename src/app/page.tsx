'use client';

import React, { useState, useMemo } from 'react';
import { ModestyFilterState, ModestyProfile, Product } from '@/types/product';
import { mockProducts } from '@/data/mockProducts';
import { filterAndScoreProducts } from '@/utils/filterEngine';

import { Header } from '@/components/Header';
import { OccasionHeader } from '@/components/OccasionHeader';
import { PinterestGrid } from '@/components/PinterestGrid';
import { DemoBanner } from '@/components/DemoBanner';
import { StatsBar } from '@/components/StatsBar';
import { ModestyFilters } from '@/components/ModestyFilters';
import { AuditModal } from '@/components/AuditModal';
import { OnboardingWizard } from '@/components/OnboardingWizard';
import { ProfileBadgeBar } from '@/components/ProfileBadgeBar';
import { HamperDrawer } from '@/components/HamperDrawer';
import { Sparkles, ShieldCheck, ShoppingBag, X } from 'lucide-react';

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
  const [showWizardModal, setShowWizardModal] = useState<boolean>(false);

  const [hamper, setHamper] = useState<Product[]>([]);
  const [isHamperOpen, setIsHamperOpen] = useState<boolean>(false);

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

      {/* Top Header Navigation */}
      <Header
        filters={filters}
        onFilterChange={handleFilterChange}
        onToggleMobileFilters={() => setIsMobileFiltersOpen(true)}
        totalMatchesCount={calculatedMatches.length}
        onOpenFiltersDrawer={() => setIsFiltersDrawerOpen(true)}
        activeFilterCount={activeFilterCount}
      />

      {/* Main Full-Width Pinterest Feed Content Container */}
      <main className="flex-1 max-w-[1800px] w-full mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        
        {/* Active Profile Summary */}
        {profile.isProfileComplete && (
          <ProfileBadgeBar
            profile={profile}
            onEditProfile={() => setShowWizardModal(true)}
          />
        )}

        {/* Compact Demo Mode Explanation Banner */}
        <DemoBanner
          filters={filters}
          onFilterChange={handleFilterChange}
        />

        {/* "what's the occasion?" Header & Pills */}
        <OccasionHeader
          selectedOccasion={filters.selectedOccasion}
          onSelectOccasion={(occ) => handleFilterChange({ selectedOccasion: occ })}
        />

        {/* Live Match Statistics Bar */}
        <StatsBar
          matches={calculatedMatches}
          isAiMode={filters.demoMode === 'ai_search'}
        />

        {/* FULL-WIDTH EDGE-TO-EDGE PINTEREST MASONRY GRID */}
        <PinterestGrid
          matches={calculatedMatches}
          isAiMode={filters.demoMode === 'ai_search'}
          onOpenAuditModal={(prod) => setSelectedAuditProduct(prod)}
          onAddToHamper={handleToggleHamper}
          hamperProductIds={hamper.map(p => p.id)}
        />

      </main>

      {/* SLIDE-OVER MODESTY FILTERS DRAWER */}
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
                  <h3 className="font-extrabold text-base text-[#4B3F38]">Modesty Rules &amp; Filters</h3>
                  <p className="text-xs text-[#8A6B5D]">Customize your coverage requirements</p>
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
                className="px-5 py-2.5 rounded-xl bg-[#8A6B5D] hover:bg-[#4B3F38] text-white font-bold text-xs shadow-md transition-all"
              >
                Apply &amp; View Feed
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Floating Hamper Button */}
      <button
        onClick={() => setIsHamperOpen(true)}
        className="fixed bottom-6 right-6 z-40 px-4 py-3 rounded-full bg-[#8A6B5D] hover:bg-[#4B3F38] text-white font-extrabold text-xs shadow-xl flex items-center gap-2.5 transition-all hover:scale-105 active:scale-95 border border-[#B89A8E]"
      >
        <ShoppingBag className="w-4 h-4" />
        <span>My Hamper</span>
        <span className="px-2 py-0.5 rounded-full bg-white text-[#8A6B5D] font-mono text-[11px] font-bold">
          {hamper.length}
        </span>
      </button>

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
            <span className="font-semibold text-[#4B3F38]">hercloset</span>
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
