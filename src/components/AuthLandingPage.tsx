'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, ShieldCheck, ArrowRight, User, Mail, Lock, Check, Store, Scissors, EyeOff, Layers, LogIn, UserPlus, Lightbulb } from 'lucide-react';
import { UserAccount, ModestyProfile, Neckline, SleeveLength, Hemline } from '@/types/product';

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
  // Cinematic Intro Stages: 'closed' -> 'opening' -> 'flicker' -> 'ready' -> 'entered'
  const [introStage, setIntroStage] = useState<'closed' | 'opening' | 'flicker' | 'ready' | 'entered'>('closed');
  
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

  // Auto-play the closet doors & flickering light animation sequence on mount
  useEffect(() => {
    // 1. Doors start opening after 300ms
    const timer1 = setTimeout(() => {
      setIntroStage('opening');
    }, 300);

    // 2. Lightbulb begins flickering after doors open (1300ms)
    const timer2 = setTimeout(() => {
      setIntroStage('flicker');
    }, 1300);

    // 3. ENTER button appears after flicker stabilizes (2600ms)
    const timer3 = setTimeout(() => {
      setIntroStage('ready');
    }, 2600);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

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
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0D0B0A] font-sans selection:bg-[#B89A8E] selection:text-white overflow-hidden p-4">
      
      {/* 3D CLOSET STAGE CONTAINER */}
      <div className="relative w-full max-w-5xl h-[650px] overflow-hidden rounded-3xl border border-[#4B3F38]/40 shadow-2xl flex flex-col items-center justify-start bg-[#070605] [perspective:1200px]">
        
        {/* 1. LEFT CLOSET DOOR PANEL */}
        <div className={`absolute top-0 left-0 w-1/2 h-full bg-[#1C1613] border-r-2 border-[#8A6B5D]/40 z-30 origin-left transition-transform duration-1000 ease-out shadow-2xl ${
          introStage !== 'closed' ? '[transform:rotateY(-105deg)]' : '[transform:rotateY(0deg)]'
        }`}>
          <div className="w-full h-full p-8 flex flex-col justify-center items-end bg-gradient-to-r from-[#140F0D] to-[#241D18] relative">
            <div className="w-3 h-20 rounded-full bg-gradient-to-b from-[#B89A8E] via-[#8A6B5D] to-[#4B3F38] border border-[#FAF7F2]/30 shadow-lg absolute right-4 top-1/2 -translate-y-1/2" />
            <div className="w-full h-full border-r border-[#8A6B5D]/20 opacity-40" />
          </div>
        </div>

        {/* 2. RIGHT CLOSET DOOR PANEL */}
        <div className={`absolute top-0 right-0 w-1/2 h-full bg-[#1C1613] border-l-2 border-[#8A6B5D]/40 z-30 origin-right transition-transform duration-1000 ease-out shadow-2xl ${
          introStage !== 'closed' ? '[transform:rotateY(105deg)]' : '[transform:rotateY(0deg)]'
        }`}>
          <div className="w-full h-full p-8 flex flex-col justify-center items-start bg-gradient-to-l from-[#140F0D] to-[#241D18] relative">
            <div className="w-3 h-20 rounded-full bg-gradient-to-b from-[#B89A8E] via-[#8A6B5D] to-[#4B3F38] border border-[#FAF7F2]/30 shadow-lg absolute left-4 top-1/2 -translate-y-1/2" />
            <div className="w-full h-full border-l border-[#8A6B5D]/20 opacity-40" />
          </div>
        </div>

        {/* 
          ========================================================================
          PINNED TOP CENTER VINTAGE LIGHTBULB FIXTURE & AMBIENT SPOTLIGHT
          ========================================================================
        */}
        <div className="relative z-20 flex flex-col items-center pt-2 shrink-0">
          {/* Hanging Wire */}
          <div className="w-0.5 h-10 bg-[#4B3F38]" />
          
          {/* Lightbulb Fixture Icon */}
          <div className={`p-2.5 rounded-full border transition-all duration-300 ${
            introStage === 'flicker' || introStage === 'ready' || introStage === 'entered'
              ? 'bg-amber-400/20 border-amber-400 text-amber-300 shadow-[0_0_50px_rgba(251,191,36,0.9)] animate-pulse'
              : 'bg-[#241D18] border-[#4B3F38] text-amber-700/40'
          }`}>
            <Lightbulb className="w-7 h-7" />
          </div>

          {/* Spotlight Glow Effect Cone */}
          <div className={`absolute top-16 w-[550px] h-96 bg-gradient-to-b from-amber-200/20 via-amber-400/10 to-transparent blur-3xl rounded-full pointer-events-none transition-opacity duration-700 ${
            introStage === 'flicker' || introStage === 'ready' || introStage === 'entered' ? 'opacity-100' : 'opacity-0'
          }`} />
        </div>

        {/* 
          ========================================================================
          SLIDING PANELS CONTAINER (Directly under the pinned lightbulb)
          ========================================================================
        */}
        <div className="relative z-20 w-full flex-1 flex items-center justify-center px-4 overflow-hidden">
          
          {/* 
            PANEL A: LANDING HERO CONTENT (HERCLOSET LOGO, SLOGAN & ENTER BUTTON)
            Slides smoothly out to the left (-translate-x-full opacity-0) on "ENTER" click.
          */}
          <div className={`w-full max-w-lg flex flex-col items-center justify-center text-center transition-all duration-700 ease-in-out ${
            introStage === 'entered'
              ? '-translate-x-full opacity-0 pointer-events-none absolute'
              : introStage === 'flicker' || introStage === 'ready'
                ? 'translate-x-0 opacity-100 relative pointer-events-auto'
                : 'translate-x-0 opacity-0 relative pointer-events-none'
          }`}>
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8A6B5D]/20 border border-[#8A6B5D]/40 text-[#B89A8E] text-xs font-mono mb-4">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>AI Vision Modesty Search</span>
            </div>

            <h1 className="font-serif italic font-bold text-5xl md:text-6xl tracking-tight text-[#FAF7F2] drop-shadow-[0_4px_25px_rgba(251,191,36,0.3)]">
              hercloset
            </h1>
            
            {/* UPDATED SLOGAN TEXT */}
            <p className="font-serif italic text-sm md:text-base text-[#D6CFCE]/80 tracking-wide text-center uppercase mt-3">
              Fashion curated for your coverage.
            </p>

            {/* ENTER BUTTON */}
            <div className={`mt-8 transition-all duration-700 ${
              introStage === 'ready'
                ? 'opacity-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 translate-y-4 pointer-events-none'
            }`}>
              <button
                onClick={() => setIntroStage('entered')}
                className="group relative px-10 py-3.5 rounded-2xl bg-gradient-to-r from-[#8A6B5D] via-[#B89A8E] to-[#8A6B5D] hover:from-[#6e5346] hover:to-[#6e5346] text-[#FAF7F2] font-serif font-bold text-sm tracking-widest uppercase shadow-[0_0_35px_rgba(138,107,93,0.7)] transition-all hover:scale-105 active:scale-95 flex items-center gap-2.5 cursor-pointer"
              >
                <span>ENTER</span>
                <ArrowRight className="w-4 h-4 text-amber-200 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>

          {/* 
            PANEL B: SIGN IN / REGISTER CARD (GLASSMORPHISM STYLE)
            Slides smoothly in from the right (translate-x-0 opacity-100) under the lightbulb.
          */}
          <div className={`w-full max-w-md bg-[#1C1613]/90 backdrop-blur-xl border border-[#8A6B5D]/40 rounded-3xl p-6 md:p-8 text-[#FAF7F2] shadow-2xl transition-all duration-700 ease-in-out max-h-[500px] overflow-y-auto ${
            introStage === 'entered'
              ? 'translate-x-0 opacity-100 relative pointer-events-auto'
              : 'translate-x-full opacity-0 pointer-events-none absolute'
          }`}>
            
            {/* Mode Switcher Tabs */}
            {step === 'credentials' && (
              <div className="flex max-w-xs mx-auto bg-[#070605]/80 p-1 rounded-xl border border-[#8A6B5D]/30 mb-5">
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('register');
                    setErrorMsg('');
                  }}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                    authMode === 'register'
                      ? 'bg-[#8A6B5D] text-white shadow-sm'
                      : 'text-[#D6CFCE]/70 hover:text-[#FAF7F2]'
                  }`}
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Register</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('login');
                    setErrorMsg('');
                  }}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                    authMode === 'login'
                      ? 'bg-[#8A6B5D] text-white shadow-sm'
                      : 'text-[#D6CFCE]/70 hover:text-[#FAF7F2]'
                  }`}
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Log In</span>
                </button>
              </div>
            )}

            {/* STEP 1: CREDENTIALS (NAME & GMAIL) */}
            {step === 'credentials' && (
              <form onSubmit={handleCredentialSubmit} className="space-y-4">
                
                {errorMsg && (
                  <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-800 text-xs font-semibold text-rose-200 text-center">
                    {errorMsg}
                  </div>
                )}

                {/* Quick Google Sign In Button */}
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#FAF7F2] hover:bg-white text-[#4B3F38] text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span>Continue with Google (Gmail)</span>
                </button>

                <div className="relative flex py-0.5 items-center">
                  <div className="flex-grow border-t border-[#8A6B5D]/30"></div>
                  <span className="flex-shrink mx-3 text-[10px] text-[#B89A8E] uppercase font-bold tracking-wider">
                    Or sign in with email
                  </span>
                  <div className="flex-grow border-t border-[#8A6B5D]/30"></div>
                </div>

                {/* Name Input (Register Mode Only) */}
                {authMode === 'register' && (
                  <div>
                    <label className="text-[11px] font-bold text-[#B89A8E] uppercase tracking-wider block mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B89A8E]" />
                      <input
                        type="text"
                        required
                        placeholder="Amina Syed"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full bg-[#070605]/60 border border-[#8A6B5D]/40 rounded-xl pl-9 pr-3 py-2 text-xs text-[#FAF7F2] placeholder-[#8A6B5D] focus:outline-none focus:ring-1 focus:ring-[#B89A8E]"
                      />
                    </div>
                  </div>
                )}

                {/* Gmail Input */}
                <div>
                  <label className="text-[11px] font-bold text-[#B89A8E] uppercase tracking-wider block mb-1">
                    Gmail / Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B89A8E]" />
                    <input
                      type="email"
                      required
                      placeholder="amina@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#070605]/60 border border-[#8A6B5D]/40 rounded-xl pl-9 pr-3 py-2 text-xs text-[#FAF7F2] placeholder-[#8A6B5D] focus:outline-none focus:ring-1 focus:ring-[#B89A8E]"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <label className="text-[11px] font-bold text-[#B89A8E] uppercase tracking-wider block mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B89A8E]" />
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-[#070605]/60 border border-[#8A6B5D]/40 rounded-xl pl-9 pr-3 py-2 text-xs text-[#FAF7F2] placeholder-[#8A6B5D] focus:outline-none focus:ring-1 focus:ring-[#B89A8E]"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-[#8A6B5D] hover:bg-[#B89A8E] text-white font-bold text-xs transition-all shadow-md flex items-center justify-center gap-2 mt-2"
                >
                  <span>{authMode === 'register' ? 'Set Up Modesty Profile' : 'Sign In & Explore Feed'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {onSkipGuest && (
                  <div className="text-center pt-1">
                    <button
                      type="button"
                      onClick={onSkipGuest}
                      className="text-[11px] font-semibold text-[#B89A8E] hover:underline"
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
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 flex items-center justify-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Modesty Profile Setup
                  </span>
                  <h3 className="font-serif italic font-bold text-lg text-[#FAF7F2] mt-0.5">
                    Welcome, {fullName || 'Fashion Lover'}!
                  </h3>
                </div>

                {/* Stores Selector */}
                <div>
                  <label className="text-[10px] font-bold text-[#B89A8E] uppercase tracking-wider block mb-1.5">
                    Preferred Retailers
                  </label>
                  <div className="grid grid-cols-2 gap-2">
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
                          className={`p-2 rounded-lg border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                            selected
                              ? 'bg-[#8A6B5D] border-[#8A6B5D] text-white'
                              : 'bg-[#070605]/60 border-[#8A6B5D]/40 text-[#D6CFCE] hover:bg-[#8A6B5D]/20'
                          }`}
                        >
                          <Store className="w-3.5 h-3.5" />
                          <span>{store}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Hard Constraints */}
                <div className="space-y-1.5 bg-[#070605]/80 p-3 rounded-xl border border-[#8A6B5D]/30">
                  <label className="text-[10px] font-bold text-[#B89A8E] uppercase tracking-wider block mb-0.5">
                    Hard Coverage Rules
                  </label>

                  <label className="flex items-center justify-between p-1.5 rounded-lg hover:bg-[#8A6B5D]/20 cursor-pointer transition-all">
                    <div className="flex items-center gap-2">
                      <Scissors className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                      <span className="text-xs font-medium text-[#FAF7F2]">No Thigh or Leg Slits</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={profile.noSlits}
                      onChange={(e) => setProfile(prev => ({ ...prev, noSlits: e.target.checked }))}
                      className="w-3.5 h-3.5 rounded border-[#8A6B5D] bg-[#070605] text-[#8A6B5D]"
                    />
                  </label>

                  <label className="flex items-center justify-between p-1.5 rounded-lg hover:bg-[#8A6B5D]/20 cursor-pointer transition-all">
                    <div className="flex items-center gap-2">
                      <EyeOff className="w-3.5 h-3.5 text-[#B89A8E] shrink-0" />
                      <span className="text-xs font-medium text-[#FAF7F2]">No Open Back / Cutouts</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={profile.noOpenBack}
                      onChange={(e) => setProfile(prev => ({ ...prev, noOpenBack: e.target.checked }))}
                      className="w-3.5 h-3.5 rounded border-[#8A6B5D] bg-[#070605] text-[#8A6B5D]"
                    />
                  </label>

                  <label className="flex items-center justify-between p-1.5 rounded-lg hover:bg-[#8A6B5D]/20 cursor-pointer transition-all">
                    <div className="flex items-center gap-2">
                      <Layers className="w-3.5 h-3.5 text-[#B89A8E] shrink-0" />
                      <span className="text-xs font-medium text-[#FAF7F2]">100% Opaque (No Sheer)</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={profile.isOpaque}
                      onChange={(e) => setProfile(prev => ({ ...prev, isOpaque: e.target.checked }))}
                      className="w-3.5 h-3.5 rounded border-[#8A6B5D] bg-[#070605] text-[#8A6B5D]"
                    />
                  </label>
                </div>

                {/* Necklines */}
                <div>
                  <label className="text-[10px] font-bold text-[#B89A8E] uppercase tracking-wider block mb-1">
                    Necklines Preferred
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {necklines.map((item) => {
                      const selected = profile.necklines.includes(item.id);
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setProfile(prev => ({ ...prev, necklines: toggleArrayItem(prev.necklines, item.id) }))}
                          className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all flex items-center gap-1 border ${
                            selected
                              ? 'bg-[#8A6B5D] border-[#8A6B5D] text-white font-semibold'
                              : 'bg-[#070605]/60 border-[#8A6B5D]/40 text-[#D6CFCE] hover:bg-[#8A6B5D]/20'
                          }`}
                        >
                          {selected && <Check className="w-3 h-3 text-white" />}
                          <span>{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Finish Registration Button */}
                <div className="pt-3 border-t border-[#8A6B5D]/30 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => setStep('credentials')}
                    className="px-3 py-1.5 rounded-lg bg-[#070605]/60 border border-[#8A6B5D]/40 text-xs font-semibold text-[#D6CFCE]"
                  >
                    Back
                  </button>

                  <button
                    type="button"
                    onClick={handleFinishProfileSetup}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-[#8A6B5D] hover:bg-[#B89A8E] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Save Profile &amp; Start Shopping</span>
                    <ArrowRight className="w-3.5 h-3.5" />
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
