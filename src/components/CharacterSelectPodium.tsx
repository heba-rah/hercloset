'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Check, Sparkles, Shirt, Scissors, EyeOff, Layers } from 'lucide-react';
import { ModestyProfile, Neckline, SleeveLength, Hemline } from '@/types/product';

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
      id: 'long-sleeve',
      name: 'Long Sleeve (Wrist)',
      staticImg: '/avatars/long-sleeve.png',
      gifImg: '/avatars/long-sleeve.gif',
      categoryType: 'sleeve',
      applyRule: (prev) => ({ ...prev, sleeveLengths: ['wrist'] })
    },
    {
      id: 'short-sleeve',
      name: 'Short / Elbow Sleeve',
      staticImg: '/avatars/short-sleeve.png',
      gifImg: '/avatars/short-sleeve.gif',
      categoryType: 'sleeve',
      applyRule: (prev) => ({ ...prev, sleeveLengths: ['elbow', '3/4', 'wrist'] })
    }
  ],
  neckline: [
    {
      id: 'highneck',
      name: 'High Neck / Turtle',
      staticImg: '/avatars/highneck.png',
      gifImg: '/avatars/highneck.gif',
      categoryType: 'neckline',
      applyRule: (prev) => ({ ...prev, necklines: ['high'] })
    },
    {
      id: 'crewneck',
      name: 'Crewneck',
      staticImg: '/avatars/crewneck.png',
      gifImg: '/avatars/crewneck.gif',
      categoryType: 'neckline',
      applyRule: (prev) => ({ ...prev, necklines: ['crew', 'high'] })
    }
  ],
  skirt: [
    {
      id: 'skirt',
      name: 'Maxi Skirts & Dresses',
      staticImg: '/avatars/skirt.png',
      gifImg: '/avatars/skirt.gif',
      categoryType: 'skirt',
      applyRule: (prev) => ({ ...prev, hemlines: ['floor'] })
    },
    {
      id: 'default',
      name: 'Ankle / Midi Skirt',
      staticImg: '/avatars/default.png',
      gifImg: '/avatars/default.gif',
      categoryType: 'skirt',
      applyRule: (prev) => ({ ...prev, hemlines: ['floor', 'ankle'] })
    }
  ],
  pants: [
    {
      id: 'pants',
      name: 'Pants & Trousers',
      staticImg: '/avatars/pants.png',
      gifImg: '/avatars/pants.gif',
      categoryType: 'pants',
      applyRule: (prev) => ({ ...prev, hemlines: ['ankle'] })
    },
    {
      id: 'default-pants',
      name: 'Wide Leg Trousers',
      staticImg: '/avatars/default.png',
      gifImg: '/avatars/default.gif',
      categoryType: 'pants',
      applyRule: (prev) => ({ ...prev, hemlines: ['ankle', 'midi'] })
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
  // Navigation State
  const [mainTab, setMainTab] = useState<'tops' | 'bottoms'>('tops');
  const [subTab, setSubTab] = useState<'sleeve' | 'neckline' | 'skirt' | 'pants'>('sleeve');
  const [skinIndex, setSkinIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [selectedNotice, setSelectedNotice] = useState<string>('');

  const currentSkins = SKINS[subTab] || SKINS.sleeve;
  const activeSkin = currentSkins[skinIndex % currentSkins.length];
  const prevSkin = currentSkins[(skinIndex - 1 + currentSkins.length) % currentSkins.length];
  const nextSkin = currentSkins[(skinIndex + 1) % currentSkins.length];

  const handleMainTabChange = (tab: 'tops' | 'bottoms') => {
    setMainTab(tab);
    const newSub = tab === 'tops' ? 'sleeve' : 'skirt';
    setSubTab(newSub);
    setSkinIndex(0);
  };

  const handleSubTabChange = (sub: 'sleeve' | 'neckline' | 'skirt' | 'pants') => {
    setSubTab(sub);
    setSkinIndex(0);
  };

  const handlePrevSkin = () => {
    setSkinIndex((prev) => (prev - 1 + currentSkins.length) % currentSkins.length);
  };

  const handleNextSkin = () => {
    setSkinIndex((prev) => (prev + 1) % currentSkins.length);
  };

  const handleSelectSkin = () => {
    const updated = activeSkin.applyRule(profile);
    onChangeProfile(updated);
    setSelectedNotice(`Selected ${activeSkin.name}!`);
    setTimeout(() => setSelectedNotice(''), 2000);
  };

  const categoryName =
    subTab === 'sleeve'
      ? 'Sleeves'
      : subTab === 'neckline'
      ? 'Necklines'
      : subTab === 'skirt'
      ? 'Skirts & Dresses'
      : 'Pants & Trousers';

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 font-sans">
      
      {/* 1. TITLE HEADER */}
      <h2 className="text-2xl md:text-3xl font-serif italic text-[#3D312A] text-center mb-6 font-bold">
        Let&apos;s set up your modesty profile
      </h2>

      {/* 2-COLUMN PODIUM SETUP */}
      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 items-start">
        
        {/* LEFT COLUMN: PRIMARY GROUP TOGGLE */}
        <div className="flex md:flex-col gap-2.5 bg-[#FAF7F2] p-3 rounded-2xl border border-[#D6CFCE] shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A6B5D] px-2 block mb-1 hidden md:block">
            Category
          </span>
          <button
            type="button"
            onClick={() => handleMainTabChange('tops')}
            className={`flex-1 md:w-full px-5 py-3 rounded-xl text-sm font-semibold border transition-all cursor-pointer flex items-center justify-center gap-2 ${
              mainTab === 'tops'
                ? 'bg-[#3D312A] border-[#3D312A] text-[#FAF7F2] shadow-md'
                : 'bg-white border-[#D6CFCE] text-[#3D312A] hover:bg-[#F2EDE6]'
            }`}
          >
            <Shirt className="w-4 h-4" />
            <span>Tops</span>
          </button>

          <button
            type="button"
            onClick={() => handleMainTabChange('bottoms')}
            className={`flex-1 md:w-full px-5 py-3 rounded-xl text-sm font-semibold border transition-all cursor-pointer flex items-center justify-center gap-2 ${
              mainTab === 'bottoms'
                ? 'bg-[#3D312A] border-[#3D312A] text-[#FAF7F2] shadow-md'
                : 'bg-white border-[#D6CFCE] text-[#3D312A] hover:bg-[#F2EDE6]'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Bottoms</span>
          </button>
        </div>

        {/* RIGHT CENTER STAGE: CHARACTER PODIUM & SUB-PILLS */}
        <div className="flex flex-col items-center">
          
          {/* SUB-CATEGORY FILTER PILLS */}
          <div className="flex items-center gap-2 mb-6 bg-[#FAF7F2] p-1.5 rounded-full border border-[#D6CFCE] shadow-inner">
            {mainTab === 'tops' ? (
              <>
                <button
                  type="button"
                  onClick={() => handleSubTabChange('sleeve')}
                  className={`px-5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    subTab === 'sleeve'
                      ? 'bg-[#8A6B5D] text-white shadow-xs'
                      : 'text-[#8A6B5D] hover:bg-[#F2EDE6]'
                  }`}
                >
                  Sleeve Length
                </button>
                <button
                  type="button"
                  onClick={() => handleSubTabChange('neckline')}
                  className={`px-5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    subTab === 'neckline'
                      ? 'bg-[#8A6B5D] text-white shadow-xs'
                      : 'text-[#8A6B5D] hover:bg-[#F2EDE6]'
                  }`}
                >
                  Neckline
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => handleSubTabChange('skirt')}
                  className={`px-5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    subTab === 'skirt'
                      ? 'bg-[#8A6B5D] text-white shadow-xs'
                      : 'text-[#8A6B5D] hover:bg-[#F2EDE6]'
                  }`}
                >
                  Skirts &amp; Dresses
                </button>
                <button
                  type="button"
                  onClick={() => handleSubTabChange('pants')}
                  className={`px-5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    subTab === 'pants'
                      ? 'bg-[#8A6B5D] text-white shadow-xs'
                      : 'text-[#8A6B5D] hover:bg-[#F2EDE6]'
                  }`}
                >
                  Pants &amp; Trousers
                </button>
              </>
            )}
          </div>

          {/* 3D CHARACTER SELECT PODIUM STAGE */}
          <div className="relative w-full max-w-lg h-72 flex items-center justify-center my-2">
            
            {/* OVERHEAD WARM SPOTLIGHT GLOW */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-60 pointer-events-none rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(230,194,128,0.35) 0%, rgba(242,237,230,0) 70%)'
              }}
            />

            {/* ADJACENT PREVIEW SKIN (LEFT) */}
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
              {/* Active Character Sprite */}
              <img
                src={isHovered ? activeSkin.gifImg : activeSkin.staticImg}
                alt={activeSkin.name}
                className="w-[136px] h-[136px] object-contain drop-shadow-xl [image-rendering:pixelated]"
              />

              {/* ELLIPTICAL 3D STAGE PLATFORM BASE */}
              <div className="w-44 h-8 mx-auto -mt-3 rounded-[100%] bg-gradient-to-b from-[#D6CFCE] via-[#B89A8E] to-[#8A6B5D] shadow-lg border-t border-white/70 flex items-center justify-center">
                <span className="text-[10px] font-mono font-bold text-[#FAF7F2] uppercase tracking-widest drop-shadow-xs">
                  {activeSkin.name}
                </span>
              </div>
            </div>

            {/* ADJACENT PREVIEW SKIN (RIGHT) */}
            <div className="absolute right-4 top-6 z-0 scale-75 opacity-40 blur-[0.5px] pointer-events-none transition-all duration-300 hidden sm:block">
              <img
                src={nextSkin.staticImg}
                alt={nextSkin.name}
                className="w-24 h-24 object-contain"
              />
            </div>

            {/* CAROUSEL ARROWS */}
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

          </div>

          {/* SELECT ACTION BUTTON */}
          <div className="mt-4 flex flex-col items-center gap-2">
            <button
              type="button"
              onClick={handleSelectSkin}
              className="bg-[#3D312A] hover:bg-[#2A211B] text-[#FAF7F2] px-8 py-2.5 rounded-full font-medium shadow-md transition-all cursor-pointer active:scale-95 flex items-center gap-2 text-xs"
            >
              <Check className="w-4 h-4 text-amber-200" />
              <span>Select for {categoryName}</span>
            </button>

            {selectedNotice && (
              <span className="text-xs font-bold text-emerald-700 animate-in fade-in">
                ✓ {selectedNotice}
              </span>
            )}
          </div>

          {/* HARD CONSTRAINT TOGGLES */}
          <div className="w-full grid grid-cols-3 gap-2 mt-6 bg-[#FAF7F2] p-3 rounded-2xl border border-[#D6CFCE]">
            <button
              type="button"
              onClick={() => onChangeProfile({ ...profile, noSlits: !profile.noSlits })}
              className={`p-2 rounded-xl text-[11px] font-bold border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                profile.noSlits
                  ? 'bg-[#3D312A] border-[#3D312A] text-white'
                  : 'bg-white border-[#D6CFCE] text-[#3D312A]'
              }`}
            >
              <Scissors className="w-3.5 h-3.5 text-rose-500" />
              <span>{profile.noSlits ? 'No Slits' : 'Slits Fine'}</span>
            </button>

            <button
              type="button"
              onClick={() => onChangeProfile({ ...profile, noOpenBack: !profile.noOpenBack })}
              className={`p-2 rounded-xl text-[11px] font-bold border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                profile.noOpenBack
                  ? 'bg-[#3D312A] border-[#3D312A] text-white'
                  : 'bg-white border-[#D6CFCE] text-[#3D312A]'
              }`}
            >
              <EyeOff className="w-3.5 h-3.5 text-[#8A6B5D]" />
              <span>{profile.noOpenBack ? 'No Cutouts' : 'Cutouts Fine'}</span>
            </button>

            <button
              type="button"
              onClick={() => onChangeProfile({ ...profile, isOpaque: !profile.isOpaque })}
              className={`p-2 rounded-xl text-[11px] font-bold border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                profile.isOpaque
                  ? 'bg-[#3D312A] border-[#3D312A] text-white'
                  : 'bg-white border-[#D6CFCE] text-[#3D312A]'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-[#8A6B5D]" />
              <span>{profile.isOpaque ? '100% Opaque' : 'Sheer Fine'}</span>
            </button>
          </div>

          {/* CONFIRM & ENTER MY CLOSET MAIN CTA */}
          <div className="mt-6 pt-4 border-t border-[#D6CFCE] w-full flex justify-center">
            <button
              type="button"
              onClick={onConfirm}
              className="bg-[#3D312A] hover:bg-[#2A211B] text-[#FAF7F2] px-10 py-3.5 rounded-full font-bold text-xs md:text-sm shadow-xl transition-all duration-300 flex items-center gap-2 cursor-pointer active:scale-95 group"
            >
              <span>Confirm &amp; Enter My Closet</span>
              <Sparkles className="w-4 h-4 text-amber-200 group-hover:rotate-12 transition-transform" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
