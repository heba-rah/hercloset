'use client';

import React, { useState } from 'react';
import { ArrowRight, User, Mail, Lock, LogIn, UserPlus } from 'lucide-react';
import { UserAccount, ModestyProfile } from '@/types/product';
import { PartingClothesReveal } from '@/components/PartingClothesReveal';
import { CharacterSelectPodium } from '@/components/CharacterSelectPodium';

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
    const finalProfile: ModestyProfile = {
      ...profile,
      name: `${fullName.trim() || 'My'}'s Modesty Rules`,
      isProfileComplete: true
    };
    const finalUser: UserAccount = {
      name: fullName.trim() || 'Amina Syed',
      email: email.trim(),
      isLoggedIn: true,
      profile: finalProfile
    };
    try {
      localStorage.setItem('user_modesty_profile', JSON.stringify(finalProfile));
      localStorage.setItem('hercloset_user_account', JSON.stringify(finalUser));
    } catch {
      // ignore
    }
    onCompleteAuth(finalUser);
  };

  // FULL-SCREEN CHARACTER SELECT SETUP STAGE
  if (step === 'profile_setup') {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto bg-[#F2EDE6]">
        <CharacterSelectPodium
          profile={profile}
          onChangeProfile={(updated) => setProfile(updated)}
          onConfirm={handleFinishProfileSetup}
        />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#F2EDE6] font-sans selection:bg-[#B89A8E] selection:text-white overflow-hidden p-4">
      
      {/* PARTING HANGING CLOTHES WARDROBE REVEAL OVERLAY */}
      <PartingClothesReveal />

      {/* SOFT WARM LIGHTING GLOW BACKDROP */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#FAF7F2] via-[#F2EDE6] to-[#E5DCD3] pointer-events-none" />

      {/* CLEAN LINEN STAGE CONTAINER */}
      <div className="relative w-full max-w-5xl h-[680px] overflow-hidden flex flex-col items-center justify-center bg-transparent p-4 md:p-8">
        
        {/* SLIDING PANELS CONTAINER */}
        <div className="relative z-20 w-full flex-1 flex items-center justify-center px-2 overflow-hidden">
          
          {/* 
            PANEL A: LANDING HERO CONTENT
          */}
          <div className={`w-full max-w-3xl flex flex-col items-center justify-center text-center transition-all duration-700 ease-in-out ${
            panelState === 'entered'
              ? '-translate-x-full opacity-0 pointer-events-none absolute'
              : 'translate-x-0 opacity-100 relative pointer-events-auto'
          }`}>
            
            {/* LARGE CENTERED HANGER LOGO EMBLEM */}
            <img
              src="/logo/logo.png"
              alt="hercloset logo"
              className="w-24 h-24 md:w-32 md:h-32 object-contain mb-4 drop-shadow-sm mx-auto"
            />

            {/* DUAL-COLOR HERCLOSET WORDMARK */}
            <h1 className="flex items-baseline justify-center tracking-tight mb-2">
              <span className="font-serif italic font-normal text-5xl md:text-7xl text-[#7A5C4D]">
                her
              </span>
              <span className="font-serif not-italic font-normal text-5xl md:text-7xl text-[#3D312A] tracking-tight">
                closet
              </span>
            </h1>
            
            {/* SUBTITLE */}
            <p className="text-xs md:text-sm tracking-[0.25em] text-[#8A6B5D] font-sans font-semibold uppercase mt-3 mb-8 text-center">
              FASHION CURATED FOR YOUR COVERAGE.
            </p>

            {/* REFINED ENTER BUTTON */}
            <div>
              <button
                onClick={() => setPanelState('entered')}
                className="bg-[#7A5C4D] hover:bg-[#684C3F] text-[#FAF7F2] px-10 py-3 rounded-full text-sm font-semibold tracking-widest uppercase shadow-md transition-all duration-300 flex items-center gap-3 mx-auto cursor-pointer active:scale-95 group"
              >
                <span>ENTER</span>
                <ArrowRight className="w-4 h-4 text-amber-200 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>

          {/* 
            PANEL B: STREAMLINED AUTH CREDENTIALS FORM CONTAINER
          */}
          <div className={`w-full max-w-lg md:max-w-xl mx-auto p-8 md:p-10 rounded-3xl bg-[#FAF7F2]/95 border border-[#D6CFCE] shadow-2xl text-[#3D312A] transition-all duration-700 ease-in-out max-h-[560px] overflow-y-auto ${
            panelState === 'entered'
              ? 'translate-x-0 opacity-100 relative pointer-events-auto'
              : 'translate-x-full opacity-0 pointer-events-none absolute'
          }`}>
            
            {/* STREAMLINED BORDERLESS TOGGLE TABS */}
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

            {/* STEP 1: CREDENTIALS (NAME & GMAIL) */}
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

          </div>

        </div>

      </div>
    </div>
  );
};
