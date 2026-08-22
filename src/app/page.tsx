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
import { Sparkles, ShieldCheck, ShoppingBag } from 'lucide-react';

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
      selectedRetailer: 'all' // Always default to "All Stores" on load & profile setup
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

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-purple-500 selection:text-slate-950">
      
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
      />

      {/* Main Pinterest Feed Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        
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

        {/* PINTEREST-STYLE MASONRY GRID FEED */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Desktop Sidebar Filters */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-28">
              <ModestyFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                onReset={handleResetFilters}
                onApplyStrictPreset={handleApplyStrictPreset}
                onApplySmartPreset={handleApplySmartPreset}
              />
            </div>
          </div>

          {/* Pinterest Feed Columns */}
          <div className="lg:col-span-3">
            <PinterestGrid
              matches={calculatedMatches}
              isAiMode={filters.demoMode === 'ai_search'}
              onOpenAuditModal={(prod) => setSelectedAuditProduct(prod)}
              onAddToHamper={handleToggleHamper}
              hamperProductIds={hamper.map(p => p.id)}
            />
          </div>

        </div>

      </main>

      {/* Floating Hamper Button */}
      <button
        onClick={() => setIsHamperOpen(true)}
        className="fixed bottom-6 right-6 z-40 px-4 py-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold text-xs shadow-2xl shadow-purple-950 flex items-center gap-2.5 transition-all hover:scale-105 active:scale-95 border border-purple-400/40"
      >
        <ShoppingBag className="w-4 h-4" />
        <span>My Hamper</span>
        <span className="px-2 py-0.5 rounded-full bg-slate-950 text-purple-300 border border-purple-500/60 font-mono text-[11px]">
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
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end bg-slate-950/80 backdrop-blur-md">
          <div className="max-h-[85vh] overflow-y-auto p-4 bg-slate-900 rounded-t-3xl border-t border-slate-800">
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
      <footer className="mt-auto border-t border-slate-900 bg-slate-950 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-lg bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <span className="font-semibold text-slate-300">hercloset</span>
            <span>— AI-powered visual fashion search engine</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-400" /> Urban Planet &amp; Ardene Live Catalog
            </span>
          </div>
        </div>
      </footer>

    </div>
  );
}
