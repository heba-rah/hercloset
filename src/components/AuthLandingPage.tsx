'use client';

import React, { useState, useEffect } from 'react';
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
  noCropped: true,
  isOpaque: true,
  selectedRetailers: ['Urban Planet', 'Ardene'],
  selectedOccasions: ['gymwear', 'graduation', 'wedding', 'workwear', 'school', 'casual', 'eid'],
  isProfileComplete: true
};

export const AuthLandingPage: React.FC<AuthLandingPageProps> = ({
  onCompleteAuth,
  onSkipGuest
}) => {
  // Page Load Entrance Transition State
  const [isMounted, setIsMounted] = useState<boolean>(false);

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

  useEffect(() => {
    // Reveal logo & text at 1100ms right as clothes start parting
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 1100);
    return () => clearTimeout(timer);
  }, []);

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
        id: `user_${Date.now()}`,
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
      id: `user_google_${Date.now()}`,
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
      id: `user_${Date.now()}`,
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
      <div className="relative w-full max-w-5xl min-h-screen flex flex-col items-center justify-center bg-transparent p-6 text-center">
        
        {/* SLIDING PANELS CONTAINER */}
        <div className="relative z-20 w-full flex-1 flex items-center justify-center px-2 overflow-hidden">
          
          {/* 
            PANEL A: LANDING HERO CONTENT WITH SMOOTH PAGE-LOAD ENTRANCE TRANSITION
          */}
          <div className={`w-full max-w-3xl flex flex-col items-center justify-center text-center transition-all duration-700 ease-in-out ${
            panelState === 'entered'
              ? '-translate-x-full opacity-0 pointer-events-none absolute'
              : 'translate-x-0 opacity-100 relative pointer-events-auto'
          }`}>
            
            {/* GRAND STATEMENT HANGER LOGO EMBLEM WITH SMOOTH ENTRANCE */}
            <img
              src="/logo/logo.png"
              alt="hercloset logo"
              className={`w-36 h-36 md:w-52 md:h-52 object-contain mb-6 drop-shadow-md mx-auto transition-all duration-700 ease-out transform ${
                isMounted ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'
              }`}
            />

            {/* DUAL-COLOR HERCLOSET WORDMARK WITH STAGGERED FADE-IN */}
            <h1 className={`flex items-baseline justify-center tracking-tight mb-2 transition-all duration-700 ease-out delay-75 transform ${
              isMounted ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'
            }`}>
              <span className="font-serif italic font-normal text-5xl md:text-7xl text-[#7A5C4D]">
                her
              </span>
              <span className="font-serif not-italic font-normal text-5xl md:text-7xl text-[#3D312A] tracking-tight">
                closet
              </span>
            </h1>
            
            {/* SUBTITLE WITH STAGGERED DELAY */}
            <p className={`text-xs md:text-sm tracking-[0.25em] text-[#8A6B5D] font-sans font-semibold uppercase mt-3 mb-8 text-center transition-all duration-700 ease-out delay-150 transform ${
              isMounted ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'
            }`}>
              FASHION CURATED FOR YOUR COVERAGE.
            </p>

            {/* REFINED ENTER BUTTON WITH STAGGERED DELAY */}
            <div className={`transition-all duration-700 ease-out delay-250 transform ${
              isMounted ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'
            }`}>
              <button
                onClick={() => setPanelState('entered')}
                className="bg-[#7A5C4D] hover:bg-[#684C3F] text-[#FAF7F2] rounded-full px-10 py-3 text-sm font-semibold uppercase tracking-widest shadow-md hover:shadow-xl transition-all duration-300 flex items-center gap-3 mx-auto cursor-pointer active:scale-95 group hover:scale-105"
              >
                <span>ENTER →</span>
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
                className={`text-sm font-bold pb-2 transition-all cursor-pointer ${
                  authMode === 'register'
                    ? 'text-[#3D312A] border-b-2 border-[#3D312A]'
                    : 'text-[#8A6B5D] hover:text-[#3D312A]'
                }`}
              >
                Create Account
              </button>
              <button
                type="button"
                onClick={() => {
                  setAuthMode('login');
                  setErrorMsg('');
                }}
                className={`text-sm font-bold pb-2 transition-all cursor-pointer ${
                  authMode === 'login'
                    ? 'text-[#3D312A] border-b-2 border-[#3D312A]'
                    : 'text-[#8A6B5D] hover:text-[#3D312A]'
                }`}
              >
                Sign In
              </button>
            </div>

            {/* Error Feedback Message */}
            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-700 text-center animate-in fade-in">
                {errorMsg}
              </div>
            )}

            {/* GOOGLE SIGN IN CTA BUTTON */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full py-3 px-4 rounded-2xl bg-white border border-[#D6CFCE] text-[#3D312A] font-bold text-xs shadow-sm hover:bg-[#FAF7F2] transition-all flex items-center justify-center gap-3 mb-4 cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z" />
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.27v3.14C3.25 21.27 7.31 24 12 24z" />
                <path fill="#FBBC05" d="M5.28 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.62H1.27C.46 8.23 0 10.06 0 12s.46 3.77 1.27 5.38l4.01-3.14z" />
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.73 1.27 6.62l4.01 3.14c.95-2.85 3.6-4.96 6.72-4.96z" />
              </svg>
              <span>Continue with Google</span>
            </button>

            <div className="flex items-center gap-3 my-4">
              <div className="flex-1 h-[1px] bg-[#D6CFCE]" />
              <span className="text-[10px] font-bold text-[#8A6B5D] uppercase tracking-wider">or email</span>
              <div className="flex-1 h-[1px] bg-[#D6CFCE]" />
            </div>

            {/* CREDENTIALS FORM */}
            <form onSubmit={handleCredentialSubmit} className="space-y-4">
              
              {authMode === 'register' && (
                <div>
                  <label className="text-[11px] font-bold text-[#8A6B5D] uppercase tracking-wider block mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#8A6B5D] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="e.g. Amina Syed"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border border-[#D6CFCE] text-xs font-semibold text-[#3D312A] focus:outline-none focus:border-[#3D312A]"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="text-[11px] font-bold text-[#8A6B5D] uppercase tracking-wider block mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#8A6B5D] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    placeholder="you@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border border-[#D6CFCE] text-xs font-semibold text-[#3D312A] focus:outline-none focus:border-[#3D312A]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#8A6B5D] uppercase tracking-wider block mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#8A6B5D] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border border-[#D6CFCE] text-xs font-semibold text-[#3D312A] focus:outline-none focus:border-[#3D312A]"
                  />
                </div>
              </div>

              {/* ACTION BUTTON */}
              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-2xl bg-[#3D312A] hover:bg-[#2A211B] text-[#FAF7F2] font-bold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 mt-4"
              >
                {authMode === 'register' ? (
                  <>
                    <UserPlus className="w-4 h-4 text-amber-200" />
                    <span>Create Account &amp; Set Up Modesty Profile →</span>
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4 text-amber-200" />
                    <span>Sign In &amp; Enter Closet →</span>
                  </>
                )}
              </button>

            </form>

            {/* GUEST SKIP BUTTON */}
            {onSkipGuest && (
              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={onSkipGuest}
                  className="text-xs font-semibold text-[#8A6B5D] hover:text-[#3D312A] underline cursor-pointer"
                >
                  Continue as Guest
                </button>
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};
