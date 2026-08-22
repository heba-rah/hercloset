'use client';

import React, { useState } from 'react';
import { ShieldCheck, ArrowRight, User, Mail, Lock, Check, Store, Scissors, EyeOff, Layers, LogIn, UserPlus } from 'lucide-react';
import { UserAccount, ModestyProfile, Neckline, SleeveLength, Hemline } from '@/types/product';
import { PartingClothesReveal } from '@/components/PartingClothesReveal';

interface AuthLandingPageProps {
  onCompleteAuth: (account: UserAccount) => void;
  onSkipGuest?: () => void;
}

const DEFAULT_PROFILE: ModestyProfile = {
  name: 'My Modesty Rules',
  necklines: ['high', 'crew'],
  sleeveLengths: ['wrist', '3/4'],
  hemlines: ['floor', 'ankle'],
  fits: [],
  noSlits: true,
  noOpenBack: true,
  isOpaque: true,
  selectedRetailers: ['Urban Planet', 'Ardene'],
  selectedOccasions: ['gymwear', 'graduation', 'wedding', 'workwear', 'school', 'casual', 'eid'],
  isProfileComplete: true
};

export const AuthLandingPage: React.FC<AuthLandingPageProps> = ({
  onCompleteAuth,
  onSkipGuest
}) => {
  // Intro Panel Stage: 'hero' | 'entered'
  const [panelState, setPanelState] = useState<'hero' | 'entered'>('hero');
  
  // Auth Mode: 'register' | 'login'
  const [authMode, setAuthMode] = useState<'register' | 'login'>('register');
  const [step, setStep] = useState<'credentials' | 'profile_setup'>('credentials');

  // Form State
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  // Modesty Profile State
  const [profile, setProfile] = useState<ModestyProfile>(DEFAULT_PROFILE);

  const availableStores = ['Urban Planet', 'Ardene'];
  
  const necklines: { id: Neckline; label: string }[] = [
    { id: 'high', label: 'High Neck / Mock Neck' },
    { id: 'crew', label: 'Crew Neck' },
    { id: 'scoop', label: 'Scoop Neck' },
    { id: 'v-neck', label: 'V-Neck' },
  ];

  const sleeveLengths: { id: SleeveLength; label: string }[] = [
    { id: 'wrist', label: 'Full Wrist Sleeve' },
    { id: '3/4', label: '3/4 Sleeve' },
    { id: 'elbow', label: 'Elbow Sleeve' },
  ];

  const hemlines: { id: Hemline; label: string }[] = [
    { id: 'floor', label: 'Floor Maxi' },
    { id: 'ankle', label: 'Ankle Length' },
    { id: 'midi', label: 'Midi Length' },
  ];

  const toggleArrayItem = <T extends string>(current: T[], item: T): T[] => {
    return current.includes(item)
      ? current.filter(x => x !== item)
      : [...current, item];
  };

  const handleCredentialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !email.includes('@')) {
      setErrorMsg('Please enter a valid Gmail / Email address.');
      return;
    }

    if (authMode === 'register') {
      if (!fullName.trim()) {
        setErrorMsg('Please enter your full name.');
        return;
      }
      setStep('profile_setup');
    } else {
      const user: UserAccount = {
        name: fullName || email.split('@')[0] || 'Amina Syed',
        email: email,
        isLoggedIn: true,
        profile: { ...profile, name: `${fullName || 'My'} Modesty Rules`, isProfileComplete: true }
      };
      localStorage.setItem('hercloset_user_account', JSON.stringify(user));
      onCompleteAuth(user);
    }
  };

  const handleGoogleSignIn = () => {
    const googleUser: UserAccount = {
      name: 'Amina Syed',
      email: 'amina.syed@gmail.com',
      isLoggedIn: true,
      profile: { ...profile, name: "Amina's Modesty Rules", isProfileComplete: true }
    };
    localStorage.setItem('hercloset_user_account', JSON.stringify(googleUser));
    onCompleteAuth(googleUser);
  };

  const handleFinishProfileSetup = () => {
    const finalUser: UserAccount = {
      name: fullName.trim() || 'Amina Syed',
      email: email.trim(),
      isLoggedIn: true,
      profile: {
        ...profile,
        name: `${fullName.trim()}'s Modesty Rules`,
        isProfileComplete: true
      }
    };
    localStorage.setItem('hercloset_user_account', JSON.stringify(finalUser));
    onCompleteAuth(finalUser);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#F2EDE6] font-sans selection:bg-[#B89A8E] selection:text-white overflow-hidden p-4">
      
      {/* PARTING HANGING CLOTHES WARDROBE REVEAL OVERLAY */}
      <PartingClothesReveal />

      {/* SOFT WARM LIGHTING GLOW BACKDROP */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#FAF7F2] via-[#F2EDE6] to-[#E5DCD3] pointer-events-none" />

      {/* CLEAN LINEN STAGE CONTAINER (NO WHITE CARD WRAPPER / BORDERS / CARD SHADOWS) */}
      <div className="relative w-full max-w-5xl h-[650px] overflow-hidden flex flex-col items-center justify-center bg-transparent p-6 md:p-10">
        
        {/* SLIDING PANELS CONTAINER */}
        <div className="relative z-20 w-full flex-1 flex items-center justify-center px-4 overflow-hidden">
          
          {/* 
            PANEL A: LANDING HERO CONTENT (SITS DIRECTLY ON #F2EDE6 CANVAS WITH NO WHITE BOX CARD)
          */}
          <div className={`w-full max-w-3xl flex flex-col items-center justify-center text-center transition-all duration-700 ease-in-out ${
            panelState === 'entered'
              ? '-translate-x-full opacity-0 pointer-events-none absolute'
              : 'translate-x-0 opacity-100 relative pointer-events-auto'
          }`}>
            
            {/* ENLARGED HERCLOSET DEEP ESPRESSO HEADING */}
            <h1 className="text-7xl md:text-9xl font-serif italic font-bold text-[#3D312A] tracking-tight drop-shadow-sm mb-3">
              hercloset
            </h1>
            
            {/* SLOGAN TEXT */}
            <p className="font-serif italic text-lg md:text-xl text-[#6E5D53] tracking-wide text-center uppercase mt-3">
              Fashion curated for your coverage.
            </p>

            {/* REFINED ENTER BUTTON */}
            <div className="mt-10">
              <button
                onClick={() => setPanelState('entered')}
                className="bg-[#3D312A] hover:bg-[#2A211B] text-[#FAF7F2] px-10 py-4 rounded-full font-medium tracking-widest text-sm md:text-base uppercase shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 mx-auto cursor-pointer active:scale-95 group"
              >
                <span>ENTER</span>
                <ArrowRight className="w-5 h-5 text-amber-200 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>

          {/* 
            PANEL B: STREAMLINED EXPANDED AUTH FORM CONTAINER
          */}
          <div className={`w-full max-w-lg md:max-w-xl mx-auto p-8 md:p-10 rounded-3xl bg-[#FAF7F2]/95 border border-[#D6CFCE] shadow-2xl text-[#3D312A] transition-all duration-700 ease-in-out max-h-[520px] overflow-y-auto ${
            panelState === 'entered'
              ? 'translate-x-0 opacity-100 relative pointer-events-auto'
              : 'translate-x-full opacity-0 pointer-events-none absolute'
          }`}>
            
            {/* STREAMLINED BORDERLESS TOGGLE TABS */}
            {step === 'credentials' && (
              <div className="flex justify-center gap-8 mb-6 border-b border-[#D6CFCE] pb-3">
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('register');
                    setErrorMsg('');
                  }}
                  className={`transition-colors flex items-center gap-2 text-sm cursor-pointer ${
                    authMode === 'register'
                      ? 'text-[#3D312A] font-serif font-bold border-b-2 border-[#3D312A] pb-3 -mb-3.5'
                      : 'text-[#8A6B5D]/70 hover:text-[#3D312A] font-sans'
                  }`}
                >
                  <UserPlus className="w-4 h-4 text-[#8A6B5D]" />
                  <span>Register</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('login');
                    setErrorMsg('');
                  }}
                  className={`transition-colors flex items-center gap-2 text-sm cursor-pointer ${
                    authMode === 'login'
                      ? 'text-[#3D312A] font-serif font-bold border-b-2 border-[#3D312A] pb-3 -mb-3.5'
                      : 'text-[#8A6B5D]/70 hover:text-[#3D312A] font-sans'
                  }`}
                >
                  <LogIn className="w-4 h-4 text-[#8A6B5D]" />
                  <span>Log In</span>
                </button>
              </div>
            )}

            {/* STEP 1: CREDENTIALS (NAME & GMAIL) */}
            {step === 'credentials' && (
              <form onSubmit={handleCredentialSubmit} className="space-y-4">
                
                {errorMsg && (
                  <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-700 text-center">
                    {errorMsg}
                  </div>
                )}

                {/* Quick Google Sign In Button */}
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  className="w-full py-3.5 px-4 rounded-xl bg-white hover:bg-[#F2EDE6] text-[#3D312A] border border-[#D6CFCE] text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span>Continue with Google (Gmail)</span>
                </button>

                <div className="relative flex py-1 items-center">
                  <div className="flex-grow border-t border-[#D6CFCE]"></div>
                  <span className="flex-shrink mx-3 text-[10px] text-[#8A6B5D] uppercase font-bold tracking-wider">
                    Or sign in with email
                  </span>
                  <div className="flex-grow border-t border-[#D6CFCE]"></div>
                </div>

                {/* Name Input (Register Mode Only) */}
                {authMode === 'register' && (
                  <div>
                    <label className="text-xs font-bold text-[#8A6B5D] uppercase tracking-wider block mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A6B5D]" />
                      <input
                        type="text"
                        required
                        placeholder="Amina Syed"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="py-3.5 px-4 pl-10 rounded-xl bg-white border border-[#D6CFCE] text-[#3D312A] placeholder-[#8A6B5D]/60 focus:border-[#8A6B5D] focus:outline-none w-full text-sm font-sans shadow-inner"
                      />
                    </div>
                  </div>
                )}

                {/* Gmail Input */}
                <div>
                  <label className="text-xs font-bold text-[#8A6B5D] uppercase tracking-wider block mb-1">
                    Gmail / Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A6B5D]" />
                    <input
                      type="email"
                      required
                      placeholder="amina@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="py-3.5 px-4 pl-10 rounded-xl bg-white border border-[#D6CFCE] text-[#3D312A] placeholder-[#8A6B5D]/60 focus:border-[#8A6B5D] focus:outline-none w-full text-sm font-sans shadow-inner"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <label className="text-xs font-bold text-[#8A6B5D] uppercase tracking-wider block mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A6B5D]" />
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="py-3.5 px-4 pl-10 rounded-xl bg-white border border-[#D6CFCE] text-[#3D312A] placeholder-[#8A6B5D]/60 focus:border-[#8A6B5D] focus:outline-none w-full text-sm font-sans shadow-inner"
                    />
                  </div>
                </div>

                {/* Primary CTA Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#3D312A] hover:bg-[#2A211B] text-[#FAF7F2] font-semibold text-sm transition-all shadow-md mt-2 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{authMode === 'register' ? 'Set Up Modesty Profile' : 'Sign In & Explore Feed'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {onSkipGuest && (
                  <div className="text-center pt-2">
                    <button
                      type="button"
                      onClick={onSkipGuest}
                      className="text-xs font-semibold text-[#8A6B5D] hover:underline cursor-pointer"
                    >
                      Continue as Guest Preview &rarr;
                    </button>
                  </div>
                )}

              </form>
            )}

            {/* STEP 2: MODESTY PROFILE SETUP */}
            {step === 'profile_setup' && (
              <div className="space-y-4">
                <div className="text-center">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#8A6B5D] flex items-center justify-center gap-1">
                    <ShieldCheck className="w-4 h-4" /> Modesty Profile Setup
                  </span>
                  <h3 className="font-serif italic font-bold text-xl text-[#3D312A] mt-1">
                    Welcome, {fullName || 'Fashion Lover'}!
                  </h3>
                </div>

                {/* Stores Selector */}
                <div>
                  <label className="text-xs font-bold text-[#8A6B5D] uppercase tracking-wider block mb-2">
                    Preferred Retailers
                  </label>
                  <div className="grid grid-cols-2 gap-2.5">
                    {availableStores.map((store) => {
                      const selected = profile.selectedRetailers.includes(store);
                      return (
                        <button
                          key={store}
                          type="button"
                          onClick={() => setProfile(prev => ({
                            ...prev,
                            selectedRetailers: toggleArrayItem(prev.selectedRetailers, store)
                          }))}
                          className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                            selected
                              ? 'bg-[#3D312A] border-[#3D312A] text-white shadow-sm'
                              : 'bg-white border-[#D6CFCE] text-[#3D312A] hover:bg-[#F2EDE6]'
                          }`}
                        >
                          <Store className="w-4 h-4" />
                          <span>{store}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Hard Constraints */}
                <div className="space-y-2 bg-[#F2EDE6] p-4 rounded-2xl border border-[#D6CFCE]">
                  <label className="text-xs font-bold text-[#8A6B5D] uppercase tracking-wider block mb-1">
                    Hard Coverage Rules
                  </label>

                  <label className="flex items-center justify-between p-2 rounded-xl hover:bg-white cursor-pointer transition-all">
                    <div className="flex items-center gap-2.5">
                      <Scissors className="w-4 h-4 text-rose-700 shrink-0" />
                      <span className="text-xs font-medium text-[#3D312A]">No Thigh or Leg Slits</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={profile.noSlits}
                      onChange={(e) => setProfile(prev => ({ ...prev, noSlits: e.target.checked }))}
                      className="w-4 h-4 rounded border-[#D6CFCE] bg-white text-[#3D312A]"
                    />
                  </label>

                  <label className="flex items-center justify-between p-2 rounded-xl hover:bg-white cursor-pointer transition-all">
                    <div className="flex items-center gap-2.5">
                      <EyeOff className="w-4 h-4 text-[#8A6B5D] shrink-0" />
                      <span className="text-xs font-medium text-[#3D312A]">No Open Back / Cutouts</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={profile.noOpenBack}
                      onChange={(e) => setProfile(prev => ({ ...prev, noOpenBack: e.target.checked }))}
                      className="w-4 h-4 rounded border-[#D6CFCE] bg-white text-[#3D312A]"
                    />
                  </label>

                  <label className="flex items-center justify-between p-2 rounded-xl hover:bg-white cursor-pointer transition-all">
                    <div className="flex items-center gap-2.5">
                      <Layers className="w-4 h-4 text-[#8A6B5D] shrink-0" />
                      <span className="text-xs font-medium text-[#3D312A]">100% Opaque (No Sheer Mesh)</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={profile.isOpaque}
                      onChange={(e) => setProfile(prev => ({ ...prev, isOpaque: e.target.checked }))}
                      className="w-4 h-4 rounded border-[#D6CFCE] bg-white text-[#3D312A]"
                    />
                  </label>
                </div>

                {/* Necklines */}
                <div>
                  <label className="text-xs font-bold text-[#8A6B5D] uppercase tracking-wider block mb-1.5">
                    Necklines Preferred
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {necklines.map((item) => {
                      const selected = profile.necklines.includes(item.id);
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setProfile(prev => ({ ...prev, necklines: toggleArrayItem(prev.necklines, item.id) }))}
                          className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 border cursor-pointer ${
                            selected
                              ? 'bg-[#3D312A] border-[#3D312A] text-white font-semibold'
                              : 'bg-white border-[#D6CFCE] text-[#3D312A] hover:bg-[#F2EDE6]'
                          }`}
                        >
                          {selected && <Check className="w-3.5 h-3.5 text-white" />}
                          <span>{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Finish Registration Button */}
                <div className="pt-4 border-t border-[#D6CFCE] flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setStep('credentials')}
                    className="px-4 py-2 rounded-xl bg-white border border-[#D6CFCE] text-xs font-semibold text-[#3D312A] cursor-pointer"
                  >
                    Back
                  </button>

                  <button
                    type="button"
                    onClick={handleFinishProfileSetup}
                    className="flex-1 py-3 px-4 rounded-xl bg-[#3D312A] hover:bg-[#2A211B] text-white font-semibold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Save Profile &amp; Start Shopping</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
