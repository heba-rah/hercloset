'use client';

import React, { useState } from 'react';
import { Check, Sparkles, Shirt, Scissors, EyeOff, Layers, ArrowLeft } from 'lucide-react';
import { ModestyProfile, Neckline, SleeveLength, Hemline } from '@/types/product';

interface CharacterSkin {
  id: string;
  name: string;
  staticImg: string;
  gifImg: string;
  categoryType: 'sleeve' | 'neckline' | 'bottom';
  isSelected: (p: ModestyProfile) => boolean;
  toggleRule: (prev: ModestyProfile) => ModestyProfile;
}

const STEP_SKINS: Record<1 | 2 | 3, CharacterSkin[]> = {
  // Step 1: Tops - Sleeve Criteria (Short Sleeve vs Long Sleeve)
  1: [
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
  // Step 2: Tops - Neckline Criteria (Crewneck vs High Neck)
  2: [
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
  // Step 3: Bottoms - Bottom Criteria (Maxi Skirt / Dress vs Pants / Trousers)
  3: [
    {
      id: 'skirt',
      name: 'Maxi Skirt / Dress',
      staticImg: '/avatars/skirt.png',
      gifImg: '/avatars/skirt.gif',
      categoryType: 'bottom',
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
      categoryType: 'bottom',
      isSelected: (p) => p.hemlines.includes('ankle'),
      toggleRule: (prev) => {
        const hasIt = prev.hemlines.includes('ankle');
        const newHems: Hemline[] = hasIt
          ? prev.hemlines.filter(h => h !== 'ankle')
          : Array.from(new Set([...prev.hemlines, 'ankle']));
        return { ...prev, hemlines: newHems.length > 0 ? newHems : ['ankle'] };
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
  // 5-Step Guided Wizard State: 1 | 2 | 3 | 4 | 5
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [hoveredSkinId, setHoveredSkinId] = useState<string | null>(null);

  const currentSkins = (step === 1 || step === 2 || step === 3) ? STEP_SKINS[step] : [];

  const handleBackStep = () => {
    if (step > 1) {
      setStep((step - 1) as 1 | 2 | 3 | 4 | 5);
    }
  };

  const handleToggleSkin = (skin: CharacterSkin) => {
    const updated = skin.toggleRule(profile);
    onChangeProfile(updated);
  };

  const handleAdvanceNextStep = () => {
    if (step < 5) {
      setStep((step + 1) as 1 | 2 | 3 | 4 | 5);
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

  // Format Labels for Summary Review (Step 5)
  const getSelectedSleevesText = () => {
    const sleeves: string[] = [];
    if (profile.sleeveLengths.includes('wrist')) sleeves.push('Long Sleeve');
    if (profile.sleeveLengths.includes('elbow') || profile.sleeveLengths.includes('3/4')) sleeves.push('Short Sleeve');
    return sleeves.length > 0 ? sleeves.join(', ') : 'Long Sleeve';
  };

  const getSelectedNecklinesText = () => {
    const necks: string[] = [];
    if (profile.necklines.includes('high')) necks.push('High Neck');
    if (profile.necklines.includes('crew')) necks.push('Crewneck');
    return necks.length > 0 ? necks.join(', ') : 'High Neck';
  };

  const getSelectedBottomsText = () => {
    const bottoms: string[] = [];
    if (profile.hemlines.includes('floor')) bottoms.push('Maxi Skirt / Dress');
    if (profile.hemlines.includes('ankle')) bottoms.push('Pants / Trousers');
    return bottoms.length > 0 ? bottoms.join(', ') : 'Maxi Skirt & Pants';
  };

  const stepSubtitle =
    step === 1
      ? 'Step 1 of 2 — Top Criteria'
      : step === 2
      ? 'Step 2 of 2 — Top Criteria'
      : step === 3
      ? 'Step 1 of 1 — Bottom Criteria'
      : step === 4
      ? 'Step 4 — Overall Filtering'
      : 'Your Modesty Filtering Overview';

  const stepButtonLabel =
    step === 1
      ? 'Select for Sleeve'
      : step === 2
      ? 'Select for Neckline'
      : 'Select for Bottom';

  return (
    <div className="min-h-screen w-full bg-[#F2EDE6] p-6 sm:p-10 md:p-12 flex flex-col justify-between font-sans selection:bg-[#B89A8E] selection:text-white">
      
      {/* 1. PERSISTENT TOP HEADER & BACK NAVIGATION */}
      <div className="w-full max-w-6xl mx-auto flex items-center justify-between mb-4">
        
        {/* Persistent Back Button */}
        {step > 1 ? (
          <button
            type="button"
            onClick={handleBackStep}
            className="flex items-center gap-2 text-xs font-bold text-[#8A6B5D] hover:text-[#3D312A] transition-colors cursor-pointer bg-[#FAF7F2] px-4 py-2 rounded-full border border-[#D6CFCE] shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
        ) : (
          <div className="w-20" />
        )}

        {/* Centered Main Title & Step Subtitle */}
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif italic text-[#3D312A] font-bold tracking-tight mb-1">
            {step === 5 ? 'Your modesty filtering overview' : "Let's set up your modesty profile"}
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-[#8A6B5D] uppercase tracking-wider">
            {stepSubtitle}
          </p>
        </div>

        <div className="w-20" /> {/* Spacer */}
      </div>

      {/* 2. DEDICATED STEP CONTENT SCREENS */}
      <div className="flex-1 max-w-6xl w-full mx-auto flex flex-col items-center justify-center my-4">
        
        {/* ================= STEP 1, STEP 2 & STEP 3: SUBSTANTIALLY ENLARGED FREESTANDING AVATARS ================= */}
        {(step === 1 || step === 2 || step === 3) && (
          <div className="w-full flex flex-col items-center justify-center relative my-2">
            
            {/* SUBSTANTIALLY ENLARGED FREESTANDING AVATARS CONTAINER */}
            <div className="flex flex-wrap items-center justify-center gap-16 md:gap-32 my-6">
              {currentSkins.map((skin) => {
                const selected = skin.isSelected(profile);
                const isHovered = hoveredSkinId === skin.id;

                return (
                  <div
                    key={skin.id}
                    onClick={() => handleToggleSkin(skin)}
                    onMouseEnter={() => setHoveredSkinId(skin.id)}
                    onMouseLeave={() => setHoveredSkinId(null)}
                    className={`flex flex-col items-center cursor-pointer transition-all duration-300 ${
                      selected
                        ? 'opacity-100 scale-100'
                        : 'opacity-35 scale-95 hover:opacity-75 hover:scale-98'
                    }`}
                  >
                    {/* SUBSTANTIALLY ENLARGED AVATAR SPRITE (w-[340px] h-[340px] md:w-[400px] md:h-[400px]) */}
                    <img
                      src={isHovered ? skin.gifImg : skin.staticImg}
                      alt={skin.name}
                      className="w-[340px] h-[340px] md:w-[400px] md:h-[400px] object-contain drop-shadow-2xl [image-rendering:pixelated]"
                    />

                    {/* PROPORTIONAL SOFT REALISTIC GROUND CONTACT SHADOW */}
                    <div className="w-48 h-4 bg-black/15 rounded-[100%] blur-[3px] mx-auto mt-[-12px]" />

                    {/* CLEAN TYPOGRAPHY & SELECTION BADGE UNDERNEATH */}
                    <div className="flex items-center gap-2 mt-5">
                      {selected && (
                        <div className="w-4 h-4 rounded-full bg-[#3D312A] text-white flex items-center justify-center shadow-xs">
                          <Check className="w-2.5 h-2.5 text-amber-200" />
                        </div>
                      )}
                      <span className={`text-sm md:text-base font-bold tracking-widest uppercase transition-colors ${
                        selected ? 'text-[#3D312A]' : 'text-[#8A6B5D]'
                      }`}>
                        {skin.name}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CLEAN STEP-SPECIFIC ACTION BUTTON (NO TRAILING ARROW) */}
            <div className="mt-8 flex flex-col items-center gap-2">
              <button
                type="button"
                onClick={handleAdvanceNextStep}
                className="bg-[#3D312A] hover:bg-[#2A211B] text-[#FAF7F2] px-12 py-4 rounded-full font-bold shadow-xl transition-all duration-300 cursor-pointer active:scale-95 text-base md:text-lg flex items-center justify-center hover:scale-105"
              >
                <span>{stepButtonLabel}</span>
              </button>
            </div>

          </div>
        )}

        {/* ================= STEP 4: OVERALL FILTERING ================= */}
        {step === 4 && (
          <div className="w-full max-w-lg bg-[#FAF7F2] p-8 sm:p-10 rounded-3xl border border-[#D6CFCE] shadow-md space-y-6">
            <h3 className="text-xl font-serif italic text-[#3D312A] font-bold text-center">
              Configure Hard Coverage Rules
            </h3>

            <div className="space-y-4">
              {/* Checkbox 1: No Slits */}
              <button
                type="button"
                onClick={() => onChangeProfile({ ...profile, noSlits: !profile.noSlits })}
                className={`w-full p-4 rounded-2xl border text-sm font-bold flex items-center justify-between transition-all cursor-pointer ${
                  profile.noSlits
                    ? 'bg-white border-[#3D312A] text-[#3D312A] shadow-xs'
                    : 'bg-[#F2EDE6]/60 border-[#D6CFCE] text-[#8A6B5D]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Scissors className="w-5 h-5 text-rose-600 shrink-0" />
                  <span>No Slits</span>
                </div>
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center border ${
                  profile.noSlits ? 'bg-[#3D312A] border-[#3D312A] text-white' : 'border-[#D6CFCE] bg-white'
                }`}>
                  {profile.noSlits && <Check className="w-4 h-4 text-white" />}
                </div>
              </button>

              {/* Checkbox 2: No Cutouts */}
              <button
                type="button"
                onClick={() => onChangeProfile({ ...profile, noOpenBack: !profile.noOpenBack })}
                className={`w-full p-4 rounded-2xl border text-sm font-bold flex items-center justify-between transition-all cursor-pointer ${
                  profile.noOpenBack
                    ? 'bg-white border-[#3D312A] text-[#3D312A] shadow-xs'
                    : 'bg-[#F2EDE6]/60 border-[#D6CFCE] text-[#8A6B5D]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <EyeOff className="w-5 h-5 text-[#8A6B5D] shrink-0" />
                  <span>No Cutouts</span>
                </div>
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center border ${
                  profile.noOpenBack ? 'bg-[#3D312A] border-[#3D312A] text-white' : 'border-[#D6CFCE] bg-white'
                }`}>
                  {profile.noOpenBack && <Check className="w-4 h-4 text-white" />}
                </div>
              </button>

              {/* Checkbox 3: 100% Opaque */}
              <button
                type="button"
                onClick={() => onChangeProfile({ ...profile, isOpaque: !profile.isOpaque })}
                className={`w-full p-4 rounded-2xl border text-sm font-bold flex items-center justify-between transition-all cursor-pointer ${
                  profile.isOpaque
                    ? 'bg-white border-[#3D312A] text-[#3D312A] shadow-xs'
                    : 'bg-[#F2EDE6]/60 border-[#D6CFCE] text-[#8A6B5D]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Layers className="w-5 h-5 text-[#8A6B5D] shrink-0" />
                  <span>100% Opaque</span>
                </div>
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center border ${
                  profile.isOpaque ? 'bg-[#3D312A] border-[#3D312A] text-white' : 'border-[#D6CFCE] bg-white'
                }`}>
                  {profile.isOpaque && <Check className="w-4 h-4 text-white" />}
                </div>
              </button>
            </div>

            {/* DONE BUTTON */}
            <button
              type="button"
              onClick={() => setStep(5)}
              className="w-full py-4 rounded-2xl bg-[#3D312A] hover:bg-[#2A211B] text-[#FAF7F2] font-bold text-sm md:text-base shadow-lg transition-all cursor-pointer active:scale-95 flex items-center justify-center gap-2"
            >
              <span>Done</span>
            </button>
          </div>
        )}

        {/* ================= STEP 5: REDESIGNED EDITABLE SUMMARY REVIEW ================= */}
        {step === 5 && (
          <div className="w-full max-w-5xl mx-auto space-y-10">
            
            {/* THREE EXPANDED SIDE-BY-SIDE SUMMARY CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-4">
              
              {/* 1. TOPS CARD */}
              <div className="bg-[#FAF7F2] p-8 rounded-3xl border border-[#D6CFCE] shadow-md flex flex-col justify-between space-y-6 relative hover:shadow-lg transition-shadow">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Shirt className="w-6 h-6 text-[#8A6B5D]" />
                    <h3 className="text-xl md:text-2xl font-serif italic text-[#3D312A] font-bold">
                      Tops Criteria
                    </h3>
                  </div>
                  <div className="space-y-3 text-sm md:text-base leading-relaxed text-[#6E5D53] font-medium">
                    <p><strong className="text-[#3D312A]">Sleeves:</strong> {getSelectedSleevesText()}</p>
                    <p><strong className="text-[#3D312A]">Neckline:</strong> {getSelectedNecklinesText()}</p>
                  </div>
                </div>
                
                {/* Clean Pencil Action Button */}
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex items-center gap-2 text-sm font-bold text-[#8A6B5D] hover:text-[#3D312A] cursor-pointer pt-4 border-t border-[#D6CFCE] transition-colors"
                >
                  <span>✎ Edit Tops</span>
                </button>
              </div>

              {/* 2. BOTTOMS CARD */}
              <div className="bg-[#FAF7F2] p-8 rounded-3xl border border-[#D6CFCE] shadow-md flex flex-col justify-between space-y-6 relative hover:shadow-lg transition-shadow">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Sparkles className="w-6 h-6 text-[#8A6B5D]" />
                    <h3 className="text-xl md:text-2xl font-serif italic text-[#3D312A] font-bold">
                      Bottoms Criteria
                    </h3>
                  </div>
                  <div className="space-y-3 text-sm md:text-base leading-relaxed text-[#6E5D53] font-medium">
                    <p><strong className="text-[#3D312A]">Styles:</strong> {getSelectedBottomsText()}</p>
                    <p><strong className="text-[#3D312A]">Coverage:</strong> Ankle &amp; Floor Length</p>
                  </div>
                </div>

                {/* Clean Pencil Action Button */}
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="flex items-center gap-2 text-sm font-bold text-[#8A6B5D] hover:text-[#3D312A] cursor-pointer pt-4 border-t border-[#D6CFCE] transition-colors"
                >
                  <span>✎ Edit Bottoms</span>
                </button>
              </div>

              {/* 3. RULES CARD */}
              <div className="bg-[#FAF7F2] p-8 rounded-3xl border border-[#D6CFCE] shadow-md flex flex-col justify-between space-y-6 relative hover:shadow-lg transition-shadow">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Scissors className="w-6 h-6 text-[#8A6B5D]" />
                    <h3 className="text-xl md:text-2xl font-serif italic text-[#3D312A] font-bold">
                      Rules Criteria
                    </h3>
                  </div>
                  <div className="space-y-2 text-sm md:text-base leading-relaxed text-[#6E5D53] font-medium">
                    <p>{profile.noSlits ? '✓ No Slits' : '• Slits Allowed'}</p>
                    <p>{profile.noOpenBack ? '✓ No Cutouts' : '• Cutouts Allowed'}</p>
                    <p>{profile.isOpaque ? '✓ 100% Opaque' : '• Sheer Fine'}</p>
                  </div>
                </div>

                {/* Clean Pencil Action Button */}
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="flex items-center gap-2 text-sm font-bold text-[#8A6B5D] hover:text-[#3D312A] cursor-pointer pt-4 border-t border-[#D6CFCE] transition-colors"
                >
                  <span>✎ Edit Rules</span>
                </button>
              </div>

            </div>

            {/* CENTERED CONFIRM AND ENTER CTA (NO TRAILING ARROW) */}
            <div className="flex justify-center pt-2">
              <button
                type="button"
                onClick={handleFinalConfirm}
                className="bg-[#3D312A] hover:bg-[#2A211B] text-[#FAF7F2] py-4 px-12 text-lg font-semibold rounded-2xl shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center cursor-pointer active:scale-95 ring-4 ring-amber-300/40"
              >
                <span>Confirm and Enter</span>
              </button>
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
