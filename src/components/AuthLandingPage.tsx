'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, ShieldCheck, ArrowRight, User, Mail, Lock, Check, Store, Scissors, EyeOff, Layers, LogIn, UserPlus, Lightbulb, ChevronDown } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-start bg-[#0D0B0A] font-sans selection:bg-[#B89A8E] selection:text-white overflow-y-auto">
      
      {/* 
        ========================================================================
        STAGE 1: CINEMATIC CLOSET DOORS & FLICKERING LIGHTBULB INTRO HERO
        ========================================================================
      */}
      <div className={`w-full min-h-screen relative flex flex-col items-center justify-center p-6 transition-all duration-700 ${
        introStage === 'entered' ? 'hidden' : 'block'
      }`}>
        
        {/* 3D CLOSET FRAME CONTAINER */}
        <div className="relative w-full max-w-4xl h-[550px] overflow-hidden rounded-3xl border border-[#4B3F38]/40 shadow-2xl flex items-center justify-center bg-[#070605] [perspective:1200px]">
          
          {/* LEFT CLOSET DOOR PANEL */}
          <div className={`absolute top-0 left-0 w-1/2 h-full bg-[#1C1613] border-r-2 border-[#8A6B5D]/40 z-20 origin-left transition-transform duration-1000 ease-out shadow-2xl ${
            introStage !== 'closed' ? '[transform:rotateY(-105deg)]' : '[transform:rotateY(0deg)]'
          }`}>
            <div className="w-full h-full p-8 flex flex-col justify-center items-end bg-gradient-to-r from-[#140F0D] to-[#241D18] relative">
              {/* Brass Door Handle */}
              <div className="w-3 h-20 rounded-full bg-gradient-to-b from-[#B89A8E] via-[#8A6B5D] to-[#4B3F38] border border-[#FAF7F2]/30 shadow-lg absolute right-4 top-1/2 -translate-y-1/2" />
              {/* Wooden Plank Carvings */}
              <div className="w-full h-full border-r border-[#8A6B5D]/20 opacity-40" />
            </div>
          </div>

          {/* RIGHT CLOSET DOOR PANEL */}
          <div className={`absolute top-0 right-0 w-1/2 h-full bg-[#1C1613] border-l-2 border-[#8A6B5D]/40 z-20 origin-right transition-transform duration-1000 ease-out shadow-2xl ${
            introStage !== 'closed' ? '[transform:rotateY(105deg)]' : '[transform:rotateY(0deg)]'
          }`}>
            <div className="w-full h-full p-8 flex flex-col justify-center items-start bg-gradient-to-l from-[#140F0D] to-[#241D18] relative">
              {/* Brass Door Handle */}
              <div className="w-3 h-20 rounded-full bg-gradient-to-b from-[#B89A8E] via-[#8A6B5D] to-[#4B3F38] border border-[#FAF7F2]/30 shadow-lg absolute left-4 top-1/2 -translate-y-1/2" />
              {/* Wooden Plank Carvings */}
              <div className="w-full h-full border-l border-[#8A6B5D]/20 opacity-40" />
            </div>
          </div>

          {/* 
            DARK CLOSET INTERIOR (Revealed inside when doors open)
          */}
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-8 bg-gradient-to-b from-[#0F0C0A] via-[#1A1411] to-[#0D0B0A] text-center">
            
            {/* VINTAGE PENDANT LIGHTBULB FIXTURE */}
            <div className="relative mb-6 flex flex-col items-center">
              {/* Hanging Wire */}
              <div className="w-0.5 h-16 bg-[#4B3F38]" />
              
              {/* Lightbulb Fixture Icon */}
              <div className={`p-3 rounded-full border transition-all duration-300 ${
                introStage === 'flicker' || introStage === 'ready'
                  ? 'bg-amber-400/20 border-amber-400 text-amber-300 shadow-[0_0_50px_rgba(251,191,36,0.8)] animate-pulse'
                  : 'bg-[#241D18] border-[#4B3F38] text-amber-700/40'
              }`}>
                <Lightbulb className="w-8 h-8" />
              </div>

              {/* Spotlight Glow Effect Cone */}
              <div className={`absolute top-24 w-96 h-64 bg-gradient-to-b from-amber-200/20 via-amber-400/10 to-transparent blur-2xl rounded-full pointer-events-none transition-opacity duration-700 ${
                introStage === 'flicker' || introStage === 'ready' ? 'opacity-100' : 'opacity-0'
              }`} />
            </div>

            {/* ILLUMINATED BRAND LOGO TEXT (Flickers into light) */}
            <div className={`transition-all duration-700 ${
              introStage === 'flicker' || introStage === 'ready'
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-95'
            }`}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8A6B5D]/20 border border-[#8A6B5D]/40 text-[#B89A8E] text-xs font-mono mb-3">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>AI Vision Modesty Search</span>
              </div>

              <h1 className="font-serif italic font-bold text-5xl md:text-6xl tracking-tight text-[#FAF7F2] drop-shadow-[0_4px_25px_rgba(251,191,36,0.3)]">
                hercloset
              </h1>
              
              <p className="font-sans text-xs md:text-sm text-[#B89A8E] font-medium tracking-widest uppercase mt-3">
                Personalized Modest Fashion • Urban Planet &amp; Ardene Canada
              </p>
            </div>

            {/* "ENTER" BUTTON (Appears once flicker animation completes) */}
            <div className={`mt-10 transition-all duration-700 ${
              introStage === 'ready'
                ? 'opacity-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 translate-y-6 pointer-events-none'
            }`}>
              <button
                onClick={() => {
                  setIntroStage('entered');
                  setTimeout(() => {
                    document.getElementById('auth-form-card')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className="group relative px-10 py-4 rounded-2xl bg-gradient-to-r from-[#8A6B5D] via-[#B89A8E] to-[#8A6B5D] hover:from-[#6e5346] hover:to-[#6e5346] text-[#FAF7F2] font-serif font-bold text-base tracking-widest uppercase shadow-[0_0_40px_rgba(138,107,93,0.7)] transition-all hover:scale-105 active:scale-95 flex items-center gap-3 cursor-pointer"
              >
                <span>ENTER</span>
                <ChevronDown className="w-5 h-5 text-amber-200 group-hover:translate-y-1 transition-transform" />
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* 
        ========================================================================
        STAGE 2: AUTHENTICATION FORM CARD (Revealed when ENTER button is clicked)
        ========================================================================
      */}
      <div
        id="auth-form-card"
        className={`w-full max-w-xl bg-[#FAF7F2] border border-[#D6CFCE] rounded-3xl shadow-2xl overflow-hidden flex flex-col text-[#4B3F38] my-8 transition-all duration-700 ${
          introStage === 'entered' ? 'opacity-100 translate-y-0' : 'opacity-90'
        }`}
      >
        
        {/* Top Fashion Brand Header */}
        <div className="bg-[#F2EDE6] p-8 border-b border-[#D6CFCE] text-center relative">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#8A6B5D] via-[#B89A8E] to-[#4B3F38] p-0.5 shadow-md mb-3">
            <div className="w-full h-full bg-[#FAF7F2] rounded-[14px] flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-[#8A6B5D]" />
            </div>
          </div>

          <h2 className="font-serif italic text-3xl font-bold tracking-tight text-[#4B3F38]">
            hercloset
          </h2>
          <p className="text-xs text-[#8A6B5D] font-sans font-semibold mt-1 tracking-wider uppercase">
            AI-Powered Modest Fashion Search Engine
          </p>

          {/* Mode Switcher Tabs */}
          {step === 'credentials' && (
            <div className="flex max-w-xs mx-auto bg-white p-1 rounded-xl border border-[#D6CFCE] mt-6">
              <button
                type="button"
                onClick={() => {
                  setAuthMode('register');
                  setErrorMsg('');
                }}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                  authMode === 'register'
                    ? 'bg-[#8A6B5D] text-white shadow-sm'
                    : 'text-[#4B3F38]/70 hover:text-[#4B3F38]'
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
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                  authMode === 'login'
                    ? 'bg-[#8A6B5D] text-white shadow-sm'
                    : 'text-[#4B3F38]/70 hover:text-[#4B3F38]'
                }`}
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Log In</span>
              </button>
            </div>
          )}
        </div>

        {/* STEP 1: CREDENTIALS (NAME & GMAIL LOGIN / REGISTER) */}
        {step === 'credentials' && (
          <form onSubmit={handleCredentialSubmit} className="p-8 space-y-5">
            
            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-700 text-center">
                {errorMsg}
              </div>
            )}

            {/* Quick Google Sign In Button */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full py-3 px-4 rounded-2xl bg-white hover:bg-[#F2EDE6] border border-[#D6CFCE] text-xs font-bold text-[#4B3F38] transition-all flex items-center justify-center gap-2 shadow-sm"
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
              <span className="flex-shrink mx-4 text-[11px] text-[#8A6B5D] uppercase font-bold tracking-wider">
                Or sign in with email
              </span>
              <div className="flex-grow border-t border-[#D6CFCE]"></div>
            </div>

            {/* Name Input (Register Mode Only) */}
            {authMode === 'register' && (
              <div>
                <label className="text-xs font-bold text-[#8A6B5D] uppercase tracking-wider block mb-1.5">
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
                    className="w-full bg-white border border-[#D6CFCE] rounded-xl pl-10 pr-4 py-2.5 text-sm font-sans text-[#4B3F38] placeholder-[#B89A8E] focus:outline-none focus:ring-2 focus:ring-[#8A6B5D]/40"
                  />
                </div>
              </div>
            )}

            {/* Gmail / Email Input */}
            <div>
              <label className="text-xs font-bold text-[#8A6B5D] uppercase tracking-wider block mb-1.5">
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
                  className="w-full bg-white border border-[#D6CFCE] rounded-xl pl-10 pr-4 py-2.5 text-sm font-sans text-[#4B3F38] placeholder-[#B89A8E] focus:outline-none focus:ring-2 focus:ring-[#8A6B5D]/40"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="text-xs font-bold text-[#8A6B5D] uppercase tracking-wider block mb-1.5">
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
                  className="w-full bg-white border border-[#D6CFCE] rounded-xl pl-10 pr-4 py-2.5 text-sm font-sans text-[#4B3F38] placeholder-[#B89A8E] focus:outline-none focus:ring-2 focus:ring-[#8A6B5D]/40"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-2xl bg-[#8A6B5D] hover:bg-[#4B3F38] text-white font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99]"
            >
              <span>{authMode === 'register' ? 'Set Up Modesty Profile' : 'Sign In & Explore Feed'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {onSkipGuest && (
              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={onSkipGuest}
                  className="text-xs font-semibold text-[#8A6B5D] hover:underline"
                >
                  Continue as Guest Preview &rarr;
                </button>
              </div>
            )}

          </form>
        )}

        {/* STEP 2: REGISTER MODESTY PROFILE SETUP */}
        {step === 'profile_setup' && (
          <div className="p-8 space-y-6">
            <div className="text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8A6B5D] flex items-center justify-center gap-1">
                <ShieldCheck className="w-4 h-4" /> Configure Your Permanent Modesty Profile
              </span>
              <h3 className="font-serif italic font-bold text-xl text-[#4B3F38] mt-1">
                Welcome, {fullName || 'Fashion Lover'}!
              </h3>
              <p className="text-xs text-[#8A6B5D] mt-1">
                Select your coverage criteria so our AI vision audit can filter garments to your exact standards.
              </p>
            </div>

            {/* Stores Selector */}
            <div>
              <label className="text-xs font-bold text-[#8A6B5D] uppercase tracking-wider block mb-2">
                Preferred Clothing Retailers
              </label>
              <div className="grid grid-cols-2 gap-3">
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
                      className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                        selected
                          ? 'bg-[#8A6B5D] border-[#8A6B5D] text-white shadow-sm'
                          : 'bg-white border-[#D6CFCE] text-[#4B3F38] hover:bg-[#F2EDE6]'
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
            <div className="space-y-2 bg-[#F2EDE6] p-4 rounded-2xl border border-[#D6CFCE]">
              <label className="text-[11px] font-bold text-[#8A6B5D] uppercase tracking-wider block mb-1">
                Non-Negotiable Hard Coverage Rules
              </label>

              <label className="flex items-center justify-between p-2 rounded-xl hover:bg-white cursor-pointer transition-all">
                <div className="flex items-center gap-2.5">
                  <Scissors className="w-4 h-4 text-rose-700 shrink-0" />
                  <span className="text-xs font-medium text-[#4B3F38]">No Thigh or Leg Slits</span>
                </div>
                <input
                  type="checkbox"
                  checked={profile.noSlits}
                  onChange={(e) => setProfile(prev => ({ ...prev, noSlits: e.target.checked }))}
                  className="w-4 h-4 rounded border-[#D6CFCE] bg-white text-[#8A6B5D] focus:ring-[#8A6B5D]"
                />
              </label>

              <label className="flex items-center justify-between p-2 rounded-xl hover:bg-white cursor-pointer transition-all">
                <div className="flex items-center gap-2.5">
                  <EyeOff className="w-4 h-4 text-[#8A6B5D] shrink-0" />
                  <span className="text-xs font-medium text-[#4B3F38]">No Open Back / Cutouts</span>
                </div>
                <input
                  type="checkbox"
                  checked={profile.noOpenBack}
                  onChange={(e) => setProfile(prev => ({ ...prev, noOpenBack: e.target.checked }))}
                  className="w-4 h-4 rounded border-[#D6CFCE] bg-white text-[#8A6B5D] focus:ring-[#8A6B5D]"
                />
              </label>

              <label className="flex items-center justify-between p-2 rounded-xl hover:bg-white cursor-pointer transition-all">
                <div className="flex items-center gap-2.5">
                  <Layers className="w-4 h-4 text-[#B89A8E] shrink-0" />
                  <span className="text-xs font-medium text-[#4B3F38]">100% Opaque (No Sheer Mesh)</span>
                </div>
                <input
                  type="checkbox"
                  checked={profile.isOpaque}
                  onChange={(e) => setProfile(prev => ({ ...prev, isOpaque: e.target.checked }))}
                  className="w-4 h-4 rounded border-[#D6CFCE] bg-white text-[#8A6B5D] focus:ring-[#8A6B5D]"
                />
              </label>
            </div>

            {/* Neckline Preferred */}
            <div>
              <label className="text-xs font-bold text-[#8A6B5D] uppercase tracking-wider block mb-2">
                Neckline Preferred
              </label>
              <div className="flex flex-wrap gap-2">
                {necklines.map((item) => {
                  const selected = profile.necklines.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setProfile(prev => ({ ...prev, necklines: toggleArrayItem(prev.necklines, item.id) }))}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1 border ${
                        selected
                          ? 'bg-[#8A6B5D] border-[#8A6B5D] text-white font-semibold'
                          : 'bg-white border-[#D6CFCE] text-[#4B3F38] hover:bg-[#F2EDE6]'
                      }`}
                    >
                      {selected && <Check className="w-3.5 h-3.5 text-white" />}
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sleeve Lengths */}
            <div>
              <label className="text-xs font-bold text-[#8A6B5D] uppercase tracking-wider block mb-2">
                Sleeve Lengths Preferred
              </label>
              <div className="flex flex-wrap gap-2">
                {sleeveLengths.map((item) => {
                  const selected = profile.sleeveLengths.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setProfile(prev => ({ ...prev, sleeveLengths: toggleArrayItem(prev.sleeveLengths, item.id) }))}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1 border ${
                        selected
                          ? 'bg-[#8A6B5D] border-[#8A6B5D] text-white font-semibold'
                          : 'bg-white border-[#D6CFCE] text-[#4B3F38] hover:bg-[#F2EDE6]'
                      }`}
                    >
                      {selected && <Check className="w-3.5 h-3.5 text-white" />}
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Hemlines */}
            <div>
              <label className="text-xs font-bold text-[#8A6B5D] uppercase tracking-wider block mb-2">
                Hemline Lengths Preferred
              </label>
              <div className="flex flex-wrap gap-2">
                {hemlines.map((item) => {
                  const selected = profile.hemlines.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setProfile(prev => ({ ...prev, hemlines: toggleArrayItem(prev.hemlines, item.id) }))}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1 border ${
                        selected
                          ? 'bg-[#8A6B5D] border-[#8A6B5D] text-white font-semibold'
                          : 'bg-white border-[#D6CFCE] text-[#4B3F38] hover:bg-[#F2EDE6]'
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
                className="px-4 py-2.5 rounded-xl bg-white hover:bg-[#FAF7F2] border border-[#D6CFCE] text-xs font-semibold text-[#4B3F38]"
              >
                Back
              </button>

              <button
                type="button"
                onClick={handleFinishProfileSetup}
                className="flex-1 py-3 px-4 rounded-2xl bg-[#8A6B5D] hover:bg-[#4B3F38] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Save Profile &amp; Start Shopping</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
