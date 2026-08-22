'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Check, Sparkles, Shirt, Scissors, EyeOff, Layers, ArrowLeft, ArrowRight } from 'lucide-react';
import { ModestyProfile, Neckline, SleeveLength, Hemline } from '@/types/product';

interface CharacterSkin {
  id: string;
  name: string;
  staticImg: string;
  gifImg: string;
  categoryType: 'sleeve' | 'neckline' | 'skirt' | 'pants';
  isSelected: (p: ModestyProfile) => boolean;
  toggleRule: (prev: ModestyProfile) => ModestyProfile;
}

const SKINS: Record<'sleeve' | 'neckline' | 'skirt' | 'pants', CharacterSkin[]> = {
  sleeve: [
    {
      id: 'short-sleeve',
      name: 'Short Sleeve',
      staticImg: '/avatars/short-sleeve.png',
      gifImg: '/avatars/short-sleeve.gif',
      categoryType: 'sleeve',
      isSelected: (p) => p.sleeveLengths.includes('elbow') || p.sleeveLengths.includes('3/4'),
      toggleRule: (prev) => {
        const hasIt = prev.sleeveLengths.includes('elbow');
        const newSleeves: SleeveLength[] = hasIt
          ? prev.sleeveLengths.filter(s => s !== 'elbow' && s !== '3/4' && s !== 'short')
          : Array.from(new Set([...prev.sleeveLengths, 'elbow', '3/4', 'wrist']));
        return { ...prev, sleeveLengths: newSleeves.length > 0 ? newSleeves : ['wrist'] };
      }
    },
    {
      id: 'long-sleeve',
      name: 'Long Sleeve',
      staticImg: '/avatars/long-sleeve.png',
      gifImg: '/avatars/long-sleeve.gif',
      categoryType: 'sleeve',
      isSelected: (p) => p.sleeveLengths.includes('wrist'),
      toggleRule: (prev) => {
        const hasIt = prev.sleeveLengths.includes('wrist');
        const newSleeves: SleeveLength[] = hasIt
          ? prev.sleeveLengths.filter(s => s !== 'wrist')
          : Array.from(new Set([...prev.sleeveLengths, 'wrist']));
        return { ...prev, sleeveLengths: newSleeves.length > 0 ? newSleeves : ['wrist'] };
      }
    }
  ],
  neckline: [
    {
      id: 'crewneck',
      name: 'Crewneck',
      staticImg: '/avatars/crewneck.png',
      gifImg: '/avatars/crewneck.gif',
      categoryType: 'neckline',
      isSelected: (p) => p.necklines.includes('crew'),
      toggleRule: (prev) => {
        const hasIt = prev.necklines.includes('crew');
        const newNecks: Neckline[] = hasIt
          ? prev.necklines.filter(n => n !== 'crew')
          : Array.from(new Set([...prev.necklines, 'crew']));
        return { ...prev, necklines: newNecks.length > 0 ? newNecks : ['high'] };
      }
    },
    {
      id: 'highneck',
      name: 'High Neck',
      staticImg: '/avatars/highneck.png',
      gifImg: '/avatars/highneck.gif',
      categoryType: 'neckline',
      isSelected: (p) => p.necklines.includes('high'),
      toggleRule: (prev) => {
        const hasIt = prev.necklines.includes('high');
        const newNecks: Neckline[] = hasIt
          ? prev.necklines.filter(n => n !== 'high')
          : Array.from(new Set([...prev.necklines, 'high']));
        return { ...prev, necklines: newNecks.length > 0 ? newNecks : ['high'] };
      }
    }
  ],
  skirt: [
    {
      id: 'skirt',
      name: 'Maxi Skirt / Dress',
      staticImg: '/avatars/skirt.png',
      gifImg: '/avatars/skirt.gif',
      categoryType: 'skirt',
      isSelected: (p) => p.hemlines.includes('floor'),
      toggleRule: (prev) => {
        const hasIt = prev.hemlines.includes('floor');
        const newHems: Hemline[] = hasIt
          ? prev.hemlines.filter(h => h !== 'floor')
          : Array.from(new Set([...prev.hemlines, 'floor']));
        return { ...prev, hemlines: newHems.length > 0 ? newHems : ['floor'] };
      }
    },
    {
      id: 'pants',
      name: 'Pants / Trousers',
      staticImg: '/avatars/pants.png',
      gifImg: '/avatars/pants.gif',
      categoryType: 'skirt',
      isSelected: (p) => p.hemlines.includes('ankle'),
      toggleRule: (prev) => {
        const hasIt = prev.hemlines.includes('ankle');
        const newHems: Hemline[] = hasIt
          ? prev.hemlines.filter(h => h !== 'ankle')
          : Array.from(new Set([...prev.hemlines, 'ankle']));
        return { ...prev, hemlines: newHems.length > 0 ? newHems : ['ankle'] };
      }
    }
  ],
  pants: [
    {
      id: 'pants',
      name: 'Pants / Trousers',
      staticImg: '/avatars/pants.png',
      gifImg: '/avatars/pants.gif',
      categoryType: 'pants',
      isSelected: (p) => p.hemlines.includes('ankle'),
      toggleRule: (prev) => {
        const hasIt = prev.hemlines.includes('ankle');
        const newHems: Hemline[] = hasIt
          ? prev.hemlines.filter(h => h !== 'ankle')
          : Array.from(new Set([...prev.hemlines, 'ankle']));
        return { ...prev, hemlines: newHems.length > 0 ? newHems : ['ankle'] };
      }
    },
    {
      id: 'skirt',
      name: 'Maxi Skirt / Dress',
      staticImg: '/avatars/skirt.png',
      gifImg: '/avatars/skirt.gif',
      categoryType: 'pants',
      isSelected: (p) => p.hemlines.includes('floor'),
      toggleRule: (prev) => {
        const hasIt = prev.hemlines.includes('floor');
        const newHems: Hemline[] = hasIt
          ? prev.hemlines.filter(h => h !== 'floor')
          : Array.from(new Set([...prev.hemlines, 'floor']));
        return { ...prev, hemlines: newHems.length > 0 ? newHems : ['floor'] };
      }
    }
  ]
};

interface CharacterSelectPodiumProps {
  profile: ModestyProfile;
  onChangeProfile: (updated: ModestyProfile) => void;
  onConfirm: () => void;
}

export const CharacterSelectPodium: React.FC<CharacterSelectPodiumProps> = ({
  profile,
  onChangeProfile,
  onConfirm
}) => {
  // Stepper State (1: Tops/Sleeve, 2: Tops/Neckline, 3: Bottoms/Skirt, 4: Bottoms/Pants)
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [mainTab, setMainTab] = useState<'tops' | 'bottoms'>('tops');
  const [subTab, setSubTab] = useState<'sleeve' | 'neckline' | 'skirt' | 'pants'>('sleeve');
  const [skinIndex, setSkinIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [selectedNotice, setSelectedNotice] = useState<string>('');
  
  // Track completed steps for conditional CTA reveal
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const currentSkins = SKINS[subTab] || SKINS.sleeve;
  const activeSkin = currentSkins[skinIndex % currentSkins.length];
  const isSkinActiveSelected = activeSkin.isSelected(profile);

  const goToStep = (stepNum: 1 | 2 | 3 | 4) => {
    setCurrentStep(stepNum);
    setSkinIndex(0);
    if (stepNum === 1) {
      setMainTab('tops');
      setSubTab('sleeve');
    } else if (stepNum === 2) {
      setMainTab('tops');
      setSubTab('neckline');
    } else if (stepNum === 3) {
      setMainTab('bottoms');
      setSubTab('skirt');
    } else if (stepNum === 4) {
      setMainTab('bottoms');
      setSubTab('pants');
    }
  };

  const handlePrevSkin = () => {
    setSkinIndex((prev) => (prev - 1 + currentSkins.length) % currentSkins.length);
  };

  const handleNextSkin = () => {
    setSkinIndex((prev) => (prev + 1) % currentSkins.length);
  };

  const handleBackStep = () => {
    if (currentStep > 1) {
      goToStep((currentStep - 1) as 1 | 2 | 3 | 4);
    }
  };

  const handleToggleCurrentSkin = () => {
    const updated = activeSkin.toggleRule(profile);
    onChangeProfile(updated);
    
    const isNowSelected = activeSkin.isSelected(updated);
    setSelectedNotice(isNowSelected ? `Selected ${activeSkin.name}!` : `Deselected ${activeSkin.name}`);
    setTimeout(() => setSelectedNotice(''), 1500);

    setCompletedSteps(prev => Array.from(new Set([...prev, currentStep])));

    // STEP-BY-STEP AUTOMATIC PROGRESSION FLOW
    if (currentStep === 1) {
      setTimeout(() => goToStep(2), 350);
    } else if (currentStep === 2) {
      setTimeout(() => goToStep(3), 350);
    } else if (currentStep === 3) {
      setTimeout(() => goToStep(4), 350);
    }
  };

  const handleFinalConfirm = () => {
    try {
      localStorage.setItem('user_modesty_profile', JSON.stringify(profile));
    } catch {
      // ignore
    }
    onConfirm();
  };

  const categoryStepLabel =
    currentStep === 1
      ? 'Sleeve'
      : currentStep === 2
      ? 'Neckline'
      : currentStep === 3
      ? 'Skirt'
      : 'Pants';

  // CTA Reveal Logic: Keep "Confirm and Enter Closet →" hidden until Bottoms step completed (step 3 or 4 completed)
  const isCtaRevealed = completedSteps.includes(3) || completedSteps.includes(4) || currentStep === 4;

  return (
    <div className="min-h-screen w-full bg-[#F2EDE6] p-6 sm:p-10 md:p-12 flex flex-col justify-between font-sans selection:bg-[#B89A8E] selection:text-white">
      
      {/* 1. TOP CENTERED TITLE */}
      <div className="w-full text-center mb-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif italic text-[#3D312A] font-bold tracking-tight mb-2">
          Let&apos;s set up your modesty profile
        </h1>
        <p className="text-xs sm:text-sm font-medium text-[#8A6B5D] uppercase tracking-wider">
          Step {currentStep} of 4 — {categoryStepLabel} Selection
        </p>
      </div>

      {/* 2. FULL-SCREEN 2-COLUMN MAIN CONTENT STAGE */}
      <div className="flex-1 max-w-6xl w-full mx-auto grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8 items-start my-4">
        
        {/* LEFT COLUMN: NAVIGATION & RULE CHECKLISTS */}
        <div className="space-y-6">
          
          {/* PRIMARY CATEGORY BOX ("CATEGORY") */}
          <div className="bg-[#FAF7F2] p-4 rounded-3xl border border-[#D6CFCE] shadow-sm space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#8A6B5D] block mb-2 px-1">
              CATEGORY
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => goToStep(1)}
                className={`py-3 px-4 rounded-2xl text-xs font-bold border transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  mainTab === 'tops'
                    ? 'bg-[#3D312A] border-[#3D312A] text-white shadow-md'
                    : 'bg-white border-[#D6CFCE] text-[#3D312A] hover:bg-[#F2EDE6]'
                }`}
              >
                <Shirt className="w-4 h-4" />
                <span>Tops</span>
              </button>

              <button
                type="button"
                onClick={() => goToStep(3)}
                className={`py-3 px-4 rounded-2xl text-xs font-bold border transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  mainTab === 'bottoms'
                    ? 'bg-[#3D312A] border-[#3D312A] text-white shadow-md'
                    : 'bg-white border-[#D6CFCE] text-[#3D312A] hover:bg-[#F2EDE6]'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>Bottoms</span>
              </button>
            </div>
          </div>

          {/* RULE CHECKLISTS (INTERACTIVE CHECKBOX TOGGLES) */}
          <div className="bg-[#FAF7F2] p-5 rounded-3xl border border-[#D6CFCE] shadow-sm space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#8A6B5D] block mb-1">
              HARD MODESTY RULES
            </span>

            {/* Checkbox 1: No Slits */}
            <button
              type="button"
              onClick={() => onChangeProfile({ ...profile, noSlits: !profile.noSlits })}
              className={`w-full p-3.5 rounded-2xl border text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                profile.noSlits
                  ? 'bg-white border-[#3D312A] text-[#3D312A] shadow-xs'
                  : 'bg-[#F2EDE6]/60 border-[#D6CFCE] text-[#8A6B5D]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Scissors className="w-4 h-4 text-rose-600 shrink-0" />
                <span>No Slits</span>
              </div>
              <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                profile.noSlits ? 'bg-[#3D312A] border-[#3D312A] text-white' : 'border-[#D6CFCE] bg-white'
              }`}>
                {profile.noSlits && <Check className="w-3.5 h-3.5 text-white" />}
              </div>
            </button>

            {/* Checkbox 2: No Cutouts */}
            <button
              type="button"
              onClick={() => onChangeProfile({ ...profile, noOpenBack: !profile.noOpenBack })}
              className={`w-full p-3.5 rounded-2xl border text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                profile.noOpenBack
                  ? 'bg-white border-[#3D312A] text-[#3D312A] shadow-xs'
                  : 'bg-[#F2EDE6]/60 border-[#D6CFCE] text-[#8A6B5D]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <EyeOff className="w-4 h-4 text-[#8A6B5D] shrink-0" />
                <span>No Cutouts</span>
              </div>
              <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                profile.noOpenBack ? 'bg-[#3D312A] border-[#3D312A] text-white' : 'border-[#D6CFCE] bg-white'
              }`}>
                {profile.noOpenBack && <Check className="w-3.5 h-3.5 text-white" />}
              </div>
            </button>

            {/* Checkbox 3: 100% Opaque */}
            <button
              type="button"
              onClick={() => onChangeProfile({ ...profile, isOpaque: !profile.isOpaque })}
              className={`w-full p-3.5 rounded-2xl border text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                profile.isOpaque
                  ? 'bg-white border-[#3D312A] text-[#3D312A] shadow-xs'
                  : 'bg-[#F2EDE6]/60 border-[#D6CFCE] text-[#8A6B5D]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Layers className="w-4 h-4 text-[#8A6B5D] shrink-0" />
                <span>100% Opaque</span>
              </div>
              <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                profile.isOpaque ? 'bg-[#3D312A] border-[#3D312A] text-white' : 'border-[#D6CFCE] bg-white'
              }`}>
                {profile.isOpaque && <Check className="w-3.5 h-3.5 text-white" />}
              </div>
            </button>
          </div>

          {/* BOTTOM MAIN CTA: CONFIRM AND ENTER CLOSET (SMOOTHLY REVEALED ONCE BOTTOMS COMPLETED) */}
          <div className={`transition-all duration-500 ${
            isCtaRevealed
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 translate-y-4 pointer-events-none'
          }`}>
            <button
              type="button"
              onClick={handleFinalConfirm}
              className="w-full py-4 px-6 rounded-2xl font-bold text-sm bg-[#3D312A] hover:bg-[#2A211B] text-[#FAF7F2] shadow-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer active:scale-95 ring-4 ring-amber-300/40"
            >
              <span>Confirm and Enter Closet &rarr;</span>
            </button>
          </div>

        </div>

        {/* RIGHT COLUMN: CENTER/RIGHT CHARACTER PODIUM & STEPPER */}
        <div className="flex flex-col items-center justify-center bg-[#FAF7F2] p-6 sm:p-8 rounded-3xl border border-[#D6CFCE] shadow-sm relative min-h-[520px]">
          
          {/* TOP STEPPER PILLS & BACK BUTTON */}
          <div className="w-full flex items-center justify-between mb-6 px-2">
            
            {/* BACK BUTTON */}
            <button
              type="button"
              onClick={handleBackStep}
              disabled={currentStep === 1}
              className="flex items-center gap-1.5 text-xs font-bold text-[#8A6B5D] hover:text-[#3D312A] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            {/* DYNAMIC SUBCATEGORY FILTER PILLS (SHOW ONLY TOPS OR BOTTOMS PILLS) */}
            <div className="flex items-center gap-2 bg-[#F2EDE6] p-1.5 rounded-full border border-[#D6CFCE]">
              {mainTab === 'tops' ? (
                <>
                  <button
                    type="button"
                    onClick={() => goToStep(1)}
                    className={`px-5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      currentStep === 1
                        ? 'bg-[#3D312A] text-white shadow-xs'
                        : 'text-[#8A6B5D] hover:bg-white'
                    }`}
                  >
                    Sleeve
                  </button>

                  <button
                    type="button"
                    onClick={() => goToStep(2)}
                    className={`px-5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      currentStep === 2
                        ? 'bg-[#3D312A] text-white shadow-xs'
                        : 'text-[#8A6B5D] hover:bg-white'
                    }`}
                  >
                    Neckline
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => goToStep(3)}
                    className={`px-5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      currentStep === 3
                        ? 'bg-[#3D312A] text-white shadow-xs'
                        : 'text-[#8A6B5D] hover:bg-white'
                    }`}
                  >
                    Skirt
                  </button>

                  <button
                    type="button"
                    onClick={() => goToStep(4)}
                    className={`px-5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      currentStep === 4
                        ? 'bg-[#3D312A] text-white shadow-xs'
                        : 'text-[#8A6B5D] hover:bg-white'
                    }`}
                  >
                    Pants
                  </button>
                </>
              )}
            </div>

            <div className="w-12" /> {/* Spacer */}
          </div>

          {/* CLEAN CENTER STAGE: SINGLE HIGHLIGHTED AVATAR CENTERED WITH SPOTLIGHT (NO GHOST PREVIEWS) */}
          <div className="relative w-full max-w-lg h-80 flex items-center justify-center my-4">
            
            {/* OVERHEAD RADIAL SPOTLIGHT GLOW */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-72 pointer-events-none rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(230,194,128,0.4) 0%, transparent 70%)'
              }}
            />

            {/* SINGLE CENTERED ACTIVE CHARACTER (WITH MULTI-SELECTION HIGHLIGHT GLOW & BADGE) */}
            <div
              onClick={handleToggleCurrentSkin}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className={`relative z-10 flex flex-col items-center group cursor-pointer transition-all duration-300 p-2 rounded-3xl ${
                isSkinActiveSelected
                  ? 'ring-4 ring-[#8A6B5D] bg-[#8A6B5D]/10 shadow-[0_0_30px_rgba(138,107,93,0.4)] scale-105'
                  : 'hover:scale-102'
              }`}
            >
              {/* Selected Badge Indicator */}
              {isSkinActiveSelected && (
                <div className="absolute -top-3 z-20 px-3 py-1 rounded-full bg-[#3D312A] text-[#FAF7F2] text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-md animate-in fade-in">
                  <Check className="w-3 h-3 text-amber-200" />
                  <span>Selected</span>
                </div>
              )}

              {/* Sprite Image (.png by default, .gif on hover) */}
              <img
                src={isHovered ? activeSkin.gifImg : activeSkin.staticImg}
                alt={activeSkin.name}
                className="w-[204px] h-[204px] object-contain drop-shadow-2xl [image-rendering:pixelated]"
              />

              {/* 3D OVAL PODIUM BASE */}
              <div className="w-56 h-10 mx-auto -mt-4 rounded-[100%] bg-gradient-to-b from-[#D6CFCE] via-[#B89A8E] to-[#8A6B5D] shadow-lg border-t border-white/70 flex items-center justify-center">
                <span className="text-[11px] font-mono font-bold text-[#FAF7F2] uppercase tracking-widest drop-shadow-xs">
                  {activeSkin.name}
                </span>
              </div>
            </div>

            {/* CAROUSEL CHEVRON ARROWS TO TOGGLE STRICTLY BETWEEN CATEGORY OPTIONS */}
            {currentSkins.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={handlePrevSkin}
                  className="absolute left-4 z-20 p-3 rounded-full bg-white/95 hover:bg-white text-[#3D312A] border border-[#D6CFCE] shadow-md transition-all cursor-pointer hover:scale-110 active:scale-95"
                  aria-label="Previous Option"
                >
                  <ChevronLeft className="w-6 h-6 text-[#8A6B5D]" />
                </button>

                <button
                  type="button"
                  onClick={handleNextSkin}
                  className="absolute right-4 z-20 p-3 rounded-full bg-white/95 hover:bg-white text-[#3D312A] border border-[#D6CFCE] shadow-md transition-all cursor-pointer hover:scale-110 active:scale-95"
                  aria-label="Next Option"
                >
                  <ChevronRight className="w-6 h-6 text-[#8A6B5D]" />
                </button>
              </>
            )}

          </div>

          {/* PRIMARY TOGGLE SELECT BUTTON */}
          <div className="mt-4 flex flex-col items-center gap-2">
            <button
              type="button"
              onClick={handleToggleCurrentSkin}
              className={`px-8 py-3 rounded-full font-bold shadow-md transition-all cursor-pointer active:scale-95 flex items-center gap-2 text-xs md:text-sm ${
                isSkinActiveSelected
                  ? 'bg-[#8A6B5D] hover:bg-[#6E5346] text-white ring-2 ring-amber-300'
                  : 'bg-[#3D312A] hover:bg-[#2A211B] text-[#FAF7F2]'
              }`}
            >
              <span>{isSkinActiveSelected ? '✓ Selected for' : 'Select for'} {categoryStepLabel}</span>
            </button>

            {selectedNotice && (
              <span className="text-xs font-bold text-emerald-700 animate-in fade-in">
                ✓ {selectedNotice}
              </span>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
