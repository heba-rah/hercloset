'use client';

import React, { useState } from 'react';
import { Sparkles, ShieldCheck, ArrowRight, Check, Scissors, EyeOff, Layers, Store, Calendar } from 'lucide-react';
import { ModestyProfile, Neckline, SleeveLength, Hemline, Occasion } from '@/types/product';

interface OnboardingWizardProps {
  initialProfile: ModestyProfile;
  onSaveProfile: (profile: ModestyProfile) => void;
  onClose?: () => void;
  isEditing?: boolean;
}

export const OnboardingWizard: React.FC<OnboardingWizardProps> = ({
  initialProfile,
  onSaveProfile,
  isEditing = false
}) => {
  const [step, setStep] = useState<number>(1);
  const [profile, setProfile] = useState<ModestyProfile>(initialProfile);

  const availableStores = ['Urban Planet', 'Ardene'];
  const availableOccasions: { id: Occasion; label: string; icon: string }[] = [
    { id: 'gymwear', label: 'Gymwear & Activewear', icon: '👟' },
    { id: 'casual', label: 'Everyday Casual', icon: '☕' },
    { id: 'workwear', label: 'Work & Professional', icon: '💼' },
    { id: 'school', label: 'School & Campus', icon: '📚' },
    { id: 'graduation', label: 'Graduation', icon: '🎓' },
    { id: 'wedding', label: 'Weddings & Formal', icon: '🥂' },
  ];

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

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      onSaveProfile({ ...profile, isProfileComplete: true });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-lg animate-in fade-in duration-300">
      
      {/* Wizard Card Container */}
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Top Branding Header */}
        <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 p-6 border-b border-slate-800 text-center relative">
          <div className="mx-auto w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-500 via-teal-400 to-amber-200 p-0.5 shadow-lg shadow-purple-950/60 mb-3">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-purple-400 animate-pulse" />
            </div>
          </div>

          <h2 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-purple-300 via-indigo-200 to-teal-200 bg-clip-text text-transparent">
            hercloset
          </h2>
          <p className="text-sm text-slate-300 mt-1 font-medium">
            {isEditing ? 'Update Your Modesty Profile' : 'Build Your Modesty Shopping Profile'}
          </p>

          {/* Progress Steps Indicator */}
          <div className="flex items-center justify-center gap-2 mt-4">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`h-2 rounded-full transition-all duration-500 ${
                  s === step
                    ? 'w-10 bg-purple-400'
                    : s < step
                      ? 'w-4 bg-purple-800'
                      : 'w-4 bg-slate-800'
                }`}
              />
            ))}
          </div>
        </div>

        {/* STEP CONTENT BODY */}
        <div className="p-6 md:p-8 space-y-6 max-h-[65vh] overflow-y-auto">
          
          {/* STEP 1: RETAILERS */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="text-center">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center justify-center gap-1">
                  <Store className="w-4 h-4" /> Step 1 of 4: Online Stores &amp; Brands
                </span>
                <h3 className="text-lg font-bold text-slate-100 mt-1">Select Online Clothing Stores You Shop At</h3>
                <p className="text-xs text-slate-400 mt-1">
                  hercloset will filter items across live Urban Planet &amp; Ardene Canada catalogs.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                {availableStores.map((store) => {
                  const selected = profile.selectedRetailers.includes(store);
                  return (
                    <button
                      key={store}
                      onClick={() => setProfile(prev => ({
                        ...prev,
                        selectedRetailers: toggleArrayItem(prev.selectedRetailers, store)
                      }))}
                      className={`p-4 rounded-2xl border text-sm font-bold flex flex-col items-center justify-center gap-2 transition-all ${
                        selected
                          ? 'bg-purple-950/80 border-purple-600 text-purple-300 shadow-lg shadow-purple-950/50'
                          : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${
                        selected ? 'bg-purple-500/20 border-purple-400 text-purple-400' : 'bg-slate-900 border-slate-800 text-slate-500'
                      }`}>
                        {selected ? <Check className="w-4 h-4" /> : <Store className="w-4 h-4" />}
                      </div>
                      <span>{store}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: COVERAGE STANDARDS */}
          {step === 2 && (
            <div className="space-y-5">
              <div className="text-center">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center justify-center gap-1">
                  <ShieldCheck className="w-4 h-4" /> Step 2 of 4: Coverage Requirements
                </span>
                <h3 className="text-lg font-bold text-slate-100 mt-1">Select Minimum Neckline, Sleeve &amp; Hemline Coverage</h3>
              </div>

              {/* Neckline */}
              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                  Neckline Coverage
                </label>
                <div className="flex flex-wrap gap-2">
                  {necklines.map((item) => {
                    const selected = profile.necklines.includes(item.id);
                    return (
                      <button
                        key={item.id}
                        onClick={() => setProfile(prev => ({
                          ...prev,
                          necklines: toggleArrayItem(prev.necklines, item.id)
                        }))}
                        className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all border flex items-center gap-1.5 ${
                          selected
                            ? 'bg-purple-950/90 border-purple-600 text-purple-300'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {selected && <Check className="w-3.5 h-3.5 text-purple-400" />}
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sleeve */}
              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                  Sleeve Length
                </label>
                <div className="flex flex-wrap gap-2">
                  {sleeveLengths.map((item) => {
                    const selected = profile.sleeveLengths.includes(item.id);
                    return (
                      <button
                        key={item.id}
                        onClick={() => setProfile(prev => ({
                          ...prev,
                          sleeveLengths: toggleArrayItem(prev.sleeveLengths, item.id)
                        }))}
                        className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all border flex items-center gap-1.5 ${
                          selected
                            ? 'bg-purple-950/90 border-purple-600 text-purple-300'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {selected && <Check className="w-3.5 h-3.5 text-purple-400" />}
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Hemline */}
              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                  Hemline Length
                </label>
                <div className="flex flex-wrap gap-2">
                  {hemlines.map((item) => {
                    const selected = profile.hemlines.includes(item.id);
                    return (
                      <button
                        key={item.id}
                        onClick={() => setProfile(prev => ({
                          ...prev,
                          hemlines: toggleArrayItem(prev.hemlines, item.id)
                        }))}
                        className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all border flex items-center gap-1.5 ${
                          selected
                            ? 'bg-purple-950/90 border-purple-600 text-purple-300'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {selected && <Check className="w-3.5 h-3.5 text-purple-400" />}
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

          {/* STEP 3: DEALBREAKER CONSTRAINTS */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="text-center">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center justify-center gap-1">
                  <Scissors className="w-4 h-4" /> Step 3 of 4: Hard Dealbreaker Rules
                </span>
                <h3 className="text-lg font-bold text-slate-100 mt-1">Set Strict Non-Negotiable Rules</h3>
                <p className="text-xs text-slate-400 mt-1">
                  hercloset AI Vision scan will automatically eliminate items that fail these tests.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <label className="flex items-center justify-between p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 cursor-pointer transition-all">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-rose-950/80 border border-rose-800 text-rose-400">
                      <Scissors className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-bold text-sm text-slate-100 block">No Thigh or Side Slits</span>
                      <span className="text-xs text-slate-400">Eliminate dresses with high leg openings</span>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={profile.noSlits}
                    onChange={(e) => setProfile(prev => ({ ...prev, noSlits: e.target.checked }))}
                    className="w-5 h-5 rounded border-slate-700 bg-slate-900 text-purple-500 focus:ring-purple-500"
                  />
                </label>

                <label className="flex items-center justify-between p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 cursor-pointer transition-all">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-amber-950/80 border border-amber-800 text-amber-400">
                      <EyeOff className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-bold text-sm text-slate-100 block">No Open Back / Cutouts</span>
                      <span className="text-xs text-slate-400">Eliminate backless tops &amp; cutouts</span>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={profile.noOpenBack}
                    onChange={(e) => setProfile(prev => ({ ...prev, noOpenBack: e.target.checked }))}
                    className="w-5 h-5 rounded border-slate-700 bg-slate-900 text-purple-500 focus:ring-purple-500"
                  />
                </label>

                <label className="flex items-center justify-between p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 cursor-pointer transition-all">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-teal-950/80 border border-teal-800 text-teal-400">
                      <Layers className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-bold text-sm text-slate-100 block">100% Opaque (No Sheer Fabric)</span>
                      <span className="text-xs text-slate-400">Eliminate transparent unlined mesh layer</span>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={profile.isOpaque}
                    onChange={(e) => setProfile(prev => ({ ...prev, isOpaque: e.target.checked }))}
                    className="w-5 h-5 rounded border-slate-700 bg-slate-900 text-purple-500 focus:ring-purple-500"
                  />
                </label>
              </div>
            </div>
          )}

          {/* STEP 4: OCCASIONS */}
          {step === 4 && (
            <div className="space-y-4">
              <div className="text-center">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center justify-center gap-1">
                  <Calendar className="w-4 h-4" /> Step 4 of 4: Shopping Occasions
                </span>
                <h3 className="text-lg font-bold text-slate-100 mt-1">What Occasions Are You Shopping For?</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {availableOccasions.map((occ) => {
                  const selected = profile.selectedOccasions.includes(occ.id);
                  return (
                    <button
                      key={occ.id}
                      onClick={() => setProfile(prev => ({
                        ...prev,
                        selectedOccasions: toggleArrayItem(prev.selectedOccasions, occ.id)
                      }))}
                      className={`p-4 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                        selected
                          ? 'bg-purple-950/80 border-purple-600 text-purple-300 shadow-md'
                          : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                      }`}
                    >
                      <span className="text-2xl">{occ.icon}</span>
                      <div className="flex-1">
                        <span className="font-bold text-sm block">{occ.label}</span>
                      </div>
                      {selected && <Check className="w-4 h-4 text-purple-400" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

        </div>

        {/* BOTTOM NAVIGATION FOOTER */}
        <div className="p-6 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-300 transition-all"
            >
              Back
            </button>
          ) : (
            <div />
          )}

          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm transition-all shadow-lg shadow-purple-950/60 hover:scale-105 active:scale-95"
          >
            <span>{step === 4 ? 'Save Profile & Explore Store' : 'Next Step'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
};
