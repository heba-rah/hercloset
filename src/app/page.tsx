'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { ModestyFilterState, ModestyProfile, Product, UserAccount } from '@/types/product';
import { mockProducts } from '@/data/mockProducts';
import { filterAndScoreProducts, passesStrictModestyFilter } from '@/utils/filterEngine';

import { Header } from '@/components/Header';
import { ClosetTopShelf } from '@/components/ClosetTopShelf';
import { PinterestGrid } from '@/components/PinterestGrid';
import { ModestyFilters } from '@/components/ModestyFilters';
import { AuditModal } from '@/components/AuditModal';
import { AuthLandingPage } from '@/components/AuthLandingPage';
import { PermanentProfileModal } from '@/components/PermanentProfileModal';
import { HamperDrawer } from '@/components/HamperDrawer';
import { HamperButton } from '@/components/HamperButton';
import { Sparkles, ShieldCheck, X, ChevronLeft, ChevronRight } from 'lucide-react';

// Helper function to produce truncated pagination numbers with ellipsis (e.g. [1, 2, 3, '...', 42])
const getPaginationRange = (currentPage: number, totalPages: number): (number | string)[] => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, '...', totalPages];
  }

  if (currentPage >= totalPages - 3) {
    return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  }

  return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
};

const ITEMS_PER_PAGE = 30;

const INITIAL_PROFILE: ModestyProfile = {
  name: 'My Custom Modesty Rules',
  necklines: ['high', 'crew'],
  sleeveLengths: ['wrist', '3/4'],
  hemlines: ['floor', 'ankle'],
  fits: [],
  noSlits: true,
  noOpenBack: true,
  noCropped: true,
  isOpaque: true,
  selectedRetailers: ['Urban Planet', 'Ardene'],
  selectedOccasions: ['gymwear', 'graduation', 'wedding', 'workwear', 'school', 'casual', 'eid'],
  isProfileComplete: false
};

const INITIAL_FILTERS: ModestyFilterState = {
  necklines: [],
  sleeveLengths: [],
  hemlines: [],
  fits: [],
  noSlits: false,
  noOpenBack: false,
  noCropped: false,
  isOpaque: false,
  minModestyScore: 0,
  searchQuery: '',
  selectedCategory: 'all',
  selectedRetailer: 'all',
  selectedOccasion: 'all',
  selectedSubcategory: 'All Types',
  demoMode: 'ai_search'
};

export default function Home() {
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(null);
  const [showAuthLandingPage, setShowAuthLandingPage] = useState<boolean>(true);
  
  // Clean Blur-to-Reveal Transition State for Main Feed
  const [isFeedRevealed, setIsFeedRevealed] = useState<boolean>(false);

  const [profile, setProfile] = useState<ModestyProfile>(INITIAL_PROFILE);
  const [filters, setFilters] = useState<ModestyFilterState>(INITIAL_FILTERS);
  const [selectedAuditProduct, setSelectedAuditProduct] = useState<Product | null>(null);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState<boolean>(false);
  const [isFiltersDrawerOpen, setIsFiltersDrawerOpen] = useState<boolean>(false);
  const [isPermanentProfileModalOpen, setIsPermanentProfileModalOpen] = useState<boolean>(false);

  const [hamper, setHamper] = useState<Product[]>([]);
  const [isHamperOpen, setIsHamperOpen] = useState<boolean>(false);

  // Pagination State
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Load permanent user account and modesty profile from localStorage on mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('hercloset_user_account');
      if (storedUser) {
        const parsedUser: UserAccount = JSON.parse(storedUser);
        setCurrentUser(parsedUser);
        const shouldShowLanding = !parsedUser.isLoggedIn;
        setShowAuthLandingPage(shouldShowLanding);
        if (!shouldShowLanding) {
          setTimeout(() => setIsFeedRevealed(true), 50);
        }

        const savedPermanentKey = `modesty_profile_${parsedUser.email}`;
        const savedPermanentRaw = localStorage.getItem(savedPermanentKey);
        const savedPermanent = savedPermanentRaw ? JSON.parse(savedPermanentRaw) : null;
        const activeProf = savedPermanent || parsedUser.profile || INITIAL_PROFILE;

        setProfile(activeProf);
        setFilters(prev => ({
          ...prev,
          necklines: activeProf.necklines || [],
          sleeveLengths: activeProf.sleeveLengths || [],
          hemlines: activeProf.hemlines || [],
          fits: activeProf.fits || [],
          noSlits: activeProf.noSlits ?? false,
          noOpenBack: activeProf.noOpenBack ?? false,
          isOpaque: activeProf.isOpaque ?? false,
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

  const handleOpenAuth = () => {
    setShowAuthLandingPage(true);
    setIsFeedRevealed(false);
  };

  const handleCompleteAuth = (account: UserAccount) => {
    setCurrentUser(account);

    const savedPermanentKey = `modesty_profile_${account.email}`;
    const savedPermanentRaw = localStorage.getItem(savedPermanentKey);
    const savedPermanent = savedPermanentRaw ? JSON.parse(savedPermanentRaw) : null;
    const activeProf = savedPermanent || account.profile || INITIAL_PROFILE;

    setProfile(activeProf);
    setFilters(prev => ({
      ...prev,
      necklines: activeProf.necklines || [],
      sleeveLengths: activeProf.sleeveLengths || [],
      hemlines: activeProf.hemlines || [],
      fits: activeProf.fits || [],
      noSlits: activeProf.noSlits ?? false,
      noOpenBack: activeProf.noOpenBack ?? false,
      isOpaque: activeProf.isOpaque ?? false,
    }));
    setShowAuthLandingPage(false);
    setIsFeedRevealed(false);
    setTimeout(() => setIsFeedRevealed(true), 50);
  };

  const handleSkipGuest = () => {
    setFilters(INITIAL_FILTERS);
    setShowAuthLandingPage(false);
    setIsFeedRevealed(false);
    setTimeout(() => setIsFeedRevealed(true), 50);
  };

  const handleSignOut = () => {
    localStorage.removeItem('hercloset_user_account');
    setCurrentUser(null);
    setShowAuthLandingPage(true);
    setIsPermanentProfileModalOpen(false);
  };

  const handleSaveProfile = (newProfile: ModestyProfile) => {
    setProfile(newProfile);
    if (currentUser) {
      const updatedUser = { ...currentUser, profile: newProfile };
      setCurrentUser(updatedUser);
      try {
        localStorage.setItem('hercloset_user_account', JSON.stringify(updatedUser));
      } catch {
        // ignore
      }
    }
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
    if (filters.selectedCategory !== 'all') count++;
    if (filters.selectedRetailer !== 'all') count++;
    if (filters.selectedOccasion !== 'all') count++;
    if (filters.maxPrice) count++;
    if (filters.searchQuery) count++;
    if (filters.noSlits) count++;
    if (filters.noOpenBack) count++;
    if (filters.isOpaque) count++;
    if (filters.necklines.length > 0) count += filters.necklines.length;
    if (filters.sleeveLengths.length > 0) count += filters.sleeveLengths.length;
    if (filters.hemlines.length > 0) count += filters.hemlines.length;
    if (filters.fits.length > 0) count += filters.fits.length;
    return count;
  }, [filters]);

  const scopedItemsCount = useMemo(() => {
    return mockProducts.filter(item =>
      passesStrictModestyFilter(item, null, filters.selectedOccasion, filters.selectedRetailer, filters.selectedSubcategory)
    ).length;
  }, [filters.selectedOccasion, filters.selectedRetailer, filters.selectedSubcategory]);

  const hasModestyRules = useMemo(() => {
    if (filters.noSlits || filters.noOpenBack || filters.noCropped || filters.isOpaque) return true;
    if (filters.necklines.length > 0 || filters.sleeveLengths.length > 0 || filters.hemlines.length > 0 || filters.fits.length > 0) return true;
    if (currentUser && currentUser.profile) {
      const p = currentUser.profile;
      if (p.noSlits || p.noOpenBack || p.noCropped || p.isOpaque) return true;
      if (p.necklines.length > 0 || p.sleeveLengths.length > 0 || p.hemlines.length > 0 || p.fits.length > 0) return true;
    }
    return false;
  }, [currentUser, filters]);

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#F2EDE6] text-[#4B3F38] flex flex-col font-sans selection:bg-[#B89A8E] selection:text-white">
      
      {/* STEP 1 & 2: LANDING HERO & AUTHENTICATION FLOW OR MAIN STORE FEED */}
      {showAuthLandingPage ? (
        <AuthLandingPage
          onCompleteAuth={handleCompleteAuth}
          onSkipGuest={handleSkipGuest}
        />
      ) : (
        /* CLEAN BLUR-TO-REVEAL TRANSITION CONTAINER */
        <div className={`flex-1 flex flex-col w-full max-w-full overflow-x-hidden transition-all duration-500 ease-out ${
          isFeedRevealed
            ? 'blur-0 opacity-100'
            : 'blur-md opacity-90'
        }`}>
          {/* Permanent Modesty Profile Modal (Triggered by top-right square card) */}
          {isPermanentProfileModalOpen && (
            <PermanentProfileModal
              initialProfile={profile}
              onSaveProfile={handleSaveProfile}
              onClose={() => setIsPermanentProfileModalOpen(false)}
              onSignOut={handleSignOut}
            />
          )}

          {/* Top Header Navigation */}
          <Header
            filters={filters}
            onFilterChange={handleFilterChange}
            onToggleMobileFilters={() => setIsMobileFiltersOpen(true)}
            totalMatchesCount={calculatedMatches.length}
            onOpenProfileModal={() => setIsPermanentProfileModalOpen(true)}
            currentUser={currentUser}
            onOpenAuth={handleOpenAuth}
            onSignOut={handleSignOut}
          />

          {/* FULL-WIDTH HOLLOW WARDROBE TOP SHELF */}
          <ClosetTopShelf
            selectedOccasion={filters.selectedOccasion}
            onSelectOccasion={(occ) => handleFilterChange({ selectedOccasion: occ })}
            selectedStore={filters.selectedRetailer}
            onSelectStore={(store) => handleFilterChange({ selectedRetailer: store })}
            selectedSubcategory={filters.selectedSubcategory}
            onSelectSubcategory={(sub) => handleFilterChange({ selectedSubcategory: sub })}
            passingItemsCount={calculatedMatches.length}
            totalItemsCount={scopedItemsCount}
            hasActiveFilters={hasModestyRules}
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
              userName={currentUser?.name}
            />

            {/* CLEAN TRUNCATED PAGINATION CONTROLS */}
            {calculatedMatches.length > 0 && (
              <div className="mt-12 mb-8 pt-8 border-t border-[#D6CFCE]/60 flex flex-col items-center justify-center gap-3 font-sans">
                <div className="flex items-center gap-2 flex-wrap justify-center">
                  <button
                    onClick={() => {
                      setCurrentPage(prev => Math.max(1, prev - 1));
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-xl bg-[#FAF7F2] hover:bg-[#EAE4DC] border border-[#D6CFCE]/80 text-xs font-semibold text-[#3D312A] disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shadow-xs flex items-center gap-1"
                  >
                    ← Previous
                  </button>

                  <div className="flex items-center gap-1.5">
                    {getPaginationRange(currentPage, totalPages).map((item, idx) => {
                      if (typeof item === 'string') {
                        return (
                          <span key={`ellipsis-${idx}`} className="w-10 h-10 flex items-center justify-center text-[#8A6B5D] font-mono text-xs select-none">
                            •••
                          </span>
                        );
                      }

                      const pageNum = item as number;
                      const isActive = currentPage === pageNum;

                      return (
                        <button
                          key={pageNum}
                          onClick={() => {
                            setCurrentPage(pageNum);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className={`w-10 h-10 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
                            isActive
                              ? 'bg-[#7A5C4D] text-[#FAF7F2] shadow-sm'
                              : 'bg-[#FAF7F2] hover:bg-[#EAE4DC] text-[#3D312A] border border-[#D6CFCE]/80'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => {
                      setCurrentPage(prev => Math.min(totalPages, prev + 1));
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-xl bg-[#FAF7F2] hover:bg-[#EAE4DC] border border-[#D6CFCE]/80 text-xs font-semibold text-[#3D312A] disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shadow-xs flex items-center gap-1"
                  >
                    Next →
                  </button>
                </div>

                <span className="text-xs text-[#8A6B5D] font-medium tracking-wide text-center">
                  Showing <span className="font-mono font-bold text-[#3D312A]">{paginatedMatches.length}</span> of{' '}
                  <span className="font-mono font-bold text-[#3D312A]">{calculatedMatches.length}</span> Canadian garments — Page{' '}
                  <span className="font-mono font-bold text-[#3D312A]">{currentPage}</span> of{' '}
                  <span className="font-mono font-bold text-[#3D312A]">{totalPages}</span>
                </span>
              </div>
            )}

          </main>

          {/* SLIDE-OVER MODESTY FILTERS DRAWER (For Current Session Tweaks) */}
          {isFiltersDrawerOpen && (
            <div className="fixed inset-0 z-[100] flex justify-end bg-[#4B3F38]/60 backdrop-blur-md animate-in fade-in duration-200">
              <div className="relative w-full max-w-md h-full bg-[#FAF7F2] border-l border-[#D6CFCE] shadow-2xl flex flex-col justify-between text-[#3D312A]">
                
                {/* Drawer Header */}
                <div className="p-5 border-b border-[#D6CFCE] flex items-center justify-between bg-[#F2EDE6]">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-white border border-[#B89A8E] text-[#8A6B5D]">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-serif italic font-bold text-base text-[#3D312A]">Session Filter Tweaks</h3>
                      <p className="text-xs text-[#8A6B5D]">Temporary adjustment for this search</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsFiltersDrawerOpen(false)}
                    className="p-2 rounded-full bg-[#FAF7F2] text-[#3D312A] hover:bg-[#FAF7F2] border border-[#D6CFCE] cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Scrollable Filters Body (pb-28 for clear scrolling) */}
                <div className="flex-1 overflow-y-auto p-5 pb-28">
                  <ModestyFilters
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    onReset={handleResetFilters}
                  />
                </div>

                {/* Footer Bar */}
                <div className="p-4 bg-[#F2EDE6] border-t border-[#D6CFCE] flex items-center justify-between z-20 relative shadow-lg">
                  <span className="text-xs text-[#8A6B5D] font-bold">
                    {calculatedMatches.length} items match
                  </span>
                  <button
                    onClick={() => setIsFiltersDrawerOpen(false)}
                    className="px-6 py-3 rounded-xl bg-[#3D312A] hover:bg-[#2A211B] text-[#FAF7F2] font-bold text-xs shadow-md transition-all cursor-pointer"
                  >
                    Apply to Feed
                  </button>
                </div>

              </div>
            </div>
          )}

          {/* Floating Aesthetic Woven Laundry Hamper Button (Hidden when any modal/drawer is open) */}
          <HamperButton
            itemCount={hamper.length}
            onClick={() => setIsHamperOpen(true)}
            isHidden={isFiltersDrawerOpen || isMobileFiltersOpen || isPermanentProfileModalOpen || isHamperOpen}
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
            hasActiveFilters={hasModestyRules}
            onOpenFilters={() => {
              setSelectedAuditProduct(null);
              setIsMobileFiltersOpen(true);
            }}
          />

          {/* Clean Brand Motto Footer */}
          <footer className="mt-auto border-t border-[#D6CFCE]/80 bg-[#FAF7F2] py-8 text-xs font-sans">
            <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center text-center">
              <div className="flex items-baseline justify-center gap-1.5 flex-wrap">
                <span className="font-serif italic font-normal text-base md:text-lg text-[#7A5C4D]">
                  her
                </span>
                <span className="font-serif not-italic font-medium text-base md:text-lg text-[#3D312A] tracking-tight">
                  closet
                </span>
                <span className="text-xs md:text-sm text-[#8A6B5D] uppercase tracking-[0.2em] font-semibold ml-1">
                  — Fashion Curated for Your Coverage
                </span>
              </div>
            </div>
          </footer>
        </div>
      )}

    </div>
  );
}
