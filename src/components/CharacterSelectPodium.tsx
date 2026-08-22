'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Check, Sparkles, Shirt, Scissors, EyeOff, Layers, ArrowLeft, ArrowRight } from 'lucide-react';
import { ModestyProfile } from '@/types/product';

interface CharacterSkin {
  id: string;
  name: string;
  staticImg: string;
  gifImg: string;
  categoryType: 'sleeve' | 'neckline' | 'skirt' | 'pants';
  applyRule: (prev: ModestyProfile) => ModestyProfile;
}

const SKINS: Record<'sleeve' | 'neckline' | 'skirt' | 'pants', CharacterSkin[]> = {
  sleeve: [
    {
      id: 'short-sleeve',
      name: 'Short Sleeve',
      staticImg: '/avatars/short-sleeve.png',
      gifImg: '/avatars/short-sleeve.gif',
      categoryType: 'sleeve',
      applyRule: (prev) => ({ ...prev, sleeveLengths: ['elbow', '3/4', 'wrist'] })
    },
    {
      id: 'long-sleeve',
      name: 'Long Sleeve',
      staticImg: '/avatars/long-sleeve.png',
      gifImg: '/avatars/long-sleeve.gif',
      categoryType: 'sleeve',
      applyRule: (prev) => ({ ...prev, sleeveLengths: ['wrist'] })
    }
  ],
  neckline: [
    {
      id: 'crewneck',
      name: 'Crewneck',
      staticImg: '/avatars/crewneck.png',
      gifImg: '/avatars/crewneck.gif',
      categoryType: 'neckline',
      applyRule: (prev) => ({ ...prev, necklines: ['crew', 'high'] })
    },
    {
      id: 'highneck',
      name: 'High Neck',
      staticImg: '/avatars/highneck.png',
      gifImg: '/avatars/highneck.gif',
      categoryType: 'neckline',
      applyRule: (prev) => ({ ...prev, necklines: ['high'] })
    }
  ],
  skirt: [
    {
      id: 'skirt',
      name: 'Maxi Skirt / Dress',
      staticImg: '/avatars/skirt.png',
      gifImg: '/avatars/skirt.gif',
      categoryType: 'skirt',
      applyRule: (prev) => ({ ...prev, hemlines: ['floor'] })
    }
  ],
  pants: [
    {
      id: 'pants',
      name: 'Pants / Trousers',
      staticImg: '/avatars/pants.png',
      gifImg: '/avatars/pants.gif',
      categoryType: 'pants',
      applyRule: (prev) => ({ ...prev, hemlines: ['ankle'] })
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

  const currentSkins = SKINS[subTab] || SKINS.sleeve;
  const activeSkin = currentSkins[skinIndex % currentSkins.length];
  const prevSkin = currentSkins[(skinIndex - 1 + currentSkins.length) % currentSkins.length];
  const nextSkin = currentSkins[(skinIndex + 1) % currentSkins.length];

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

  const handleSelectCurrentSkin = () => {
    const updated = activeSkin.applyRule(profile);
    onChangeProfile(updated);
    setSelectedNotice(`Selected ${activeSkin.name}!`);
    setTimeout(() => setSelectedNotice(''), 1500);

    // STEP-BY-STEP AUTOMATIC PROGRESSION FLOW
    if (currentStep === 1) {
      // Step 1 (Tops -> Sleeve) -> Auto-advance to Step 2 (Tops -> Neckline)
      setTimeout(() => goToStep(2), 300);
    } else if (currentStep === 2) {
      // Step 2 (Tops -> Neckline) -> Auto-switch to Bottoms and advance to Step 3 (Bottoms -> Skirt)
      setTimeout(() => goToStep(3), 300);
    } else if (currentStep === 3) {
      // Step 3 (Bottoms -> Skirt) -> Auto-advance to Step 4 (Bottoms -> Pants)
      setTimeout(() => goToStep(4), 300);
    }
  };

  const categoryStepLabel =
    currentStep === 1
      ? 'Sleeve'
      : currentStep === 2
      ? 'Neckline'
      : currentStep === 3
      ? 'Skirt'
      : 'Pants';

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

          {/* BOTTOM MAIN CTA: CONFIRM AND ENTER CLOSET */}
          <button
            type="button"
            onClick={onConfirm}
            className={`w-full py-4 px-6 rounded-2xl font-bold text-sm shadow-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer active:scale-95 ${
              currentStep === 4
                ? 'bg-[#3D312A] hover:bg-[#2A211B] text-[#FAF7F2] ring-4 ring-amber-300/50 scale-102'
                : 'bg-[#3D312A] hover:bg-[#2A211B] text-[#FAF7F2]'
            }`}
          >
            <span>Confirm and Enter Closet</span>
            <ArrowRight className="w-4 h-4 text-amber-200" />
          </button>

        </div>

        {/* RIGHT COLUMN: CENTER/RIGHT CHARACTER PODIUM & STEPPER */}
        <div className="flex flex-col items-center justify-center bg-[#FAF7F2] p-6 sm:p-8 rounded-3xl border border-[#D6CFCE] shadow-sm relative min-h-[480px]">
          
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

            {/* STEPPER SUB-PILLS */}
            <div className="flex items-center gap-2 bg-[#F2EDE6] p-1.5 rounded-full border border-[#D6CFCE]">
              <button
                type="button"
                onClick={() => goToStep(1)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
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
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  currentStep === 2
                    ? 'bg-[#3D312A] text-white shadow-xs'
                    : 'text-[#8A6B5D] hover:bg-white'
                }`}
              >
                Neckline
              </button>

              <button
                type="button"
                onClick={() => goToStep(3)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
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
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  currentStep === 4
                    ? 'bg-[#3D312A] text-white shadow-xs'
                    : 'text-[#8A6B5D] hover:bg-white'
                }`}
              >
                Pants
              </button>
            </div>

            <div className="w-12" /> {/* Spacer */}
          </div>

          {/* 3D CHARACTER PODIUM STAGE */}
          <div className="relative w-full max-w-lg h-72 flex items-center justify-center my-4">
            
            {/* OVERHEAD RADIAL SPOTLIGHT GLOW */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-64 pointer-events-none rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(230,194,128,0.35) 0%, transparent 70%)'
              }}
            />

            {/* ADJACENT PREVIEW (LEFT) */}
            <div className="absolute left-4 top-6 z-0 scale-75 opacity-40 blur-[0.5px] pointer-events-none transition-all duration-300 hidden sm:block">
              <img
                src={prevSkin.staticImg}
                alt={prevSkin.name}
                className="w-24 h-24 object-contain"
              />
            </div>

            {/* CENTER ACTIVE CHARACTER */}
            <div
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="relative z-10 flex flex-col items-center group cursor-pointer transition-transform duration-300 hover:scale-105"
            >
              {/* Sprite Image */}
              <img
                src={isHovered ? activeSkin.gifImg : activeSkin.staticImg}
                alt={activeSkin.name}
                className="w-[136px] h-[136px] object-contain drop-shadow-xl [image-rendering:pixelated]"
              />

              {/* 3D OVAL PODIUM BASE */}
              <div className="w-44 h-8 mx-auto -mt-3 rounded-[100%] bg-gradient-to-b from-[#D6CFCE] via-[#B89A8E] to-[#8A6B5D] shadow-md border-t border-white/60 flex items-center justify-center">
                <span className="text-[10px] font-mono font-bold text-[#FAF7F2] uppercase tracking-widest drop-shadow-xs">
                  {activeSkin.name}
                </span>
              </div>
            </div>

            {/* ADJACENT PREVIEW (RIGHT) */}
            <div className="absolute right-4 top-6 z-0 scale-75 opacity-40 blur-[0.5px] pointer-events-none transition-all duration-300 hidden sm:block">
              <img
                src={nextSkin.staticImg}
                alt={nextSkin.name}
                className="w-24 h-24 object-contain"
              />
            </div>

            {/* ARROWS */}
            {currentSkins.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={handlePrevSkin}
                  className="absolute left-2 z-20 p-2.5 rounded-full bg-white/90 hover:bg-white text-[#3D312A] border border-[#D6CFCE] shadow-md transition-all cursor-pointer hover:scale-110 active:scale-95"
                >
                  <ChevronLeft className="w-5 h-5 text-[#8A6B5D]" />
                </button>

                <button
                  type="button"
                  onClick={handleNextSkin}
                  className="absolute right-2 z-20 p-2.5 rounded-full bg-white/90 hover:bg-white text-[#3D312A] border border-[#D6CFCE] shadow-md transition-all cursor-pointer hover:scale-110 active:scale-95"
                >
                  <ChevronRight className="w-5 h-5 text-[#8A6B5D]" />
                </button>
              </>
            )}

          </div>

          {/* PRIMARY STEP SELECT BUTTON WITH AUTO PROGRESSION */}
          <div className="mt-4 flex flex-col items-center gap-2">
            <button
              type="button"
              onClick={handleSelectCurrentSkin}
              className="bg-[#3D312A] hover:bg-[#2A211B] text-[#FAF7F2] px-8 py-3 rounded-full font-bold shadow-md transition-all cursor-pointer active:scale-95 flex items-center gap-2 text-xs md:text-sm"
            >
              <Check className="w-4 h-4 text-amber-200" />
              <span>✓ Select for {categoryStepLabel}</span>
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
