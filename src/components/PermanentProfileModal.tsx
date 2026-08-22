'use client';

import React, { useState } from 'react';
import { ShieldCheck, X, Check, Save, UserCheck, HeartHandshake, Scissors, EyeOff, Layers, LogOut } from 'lucide-react';
import { ModestyProfile, Neckline, SleeveLength, Hemline } from '@/types/product';

interface PermanentProfileModalProps {
  initialProfile: ModestyProfile;
  onSaveProfile: (profile: ModestyProfile) => void;
  onClose: () => void;
  onSignOut?: () => void;
}

export const PermanentProfileModal: React.FC<PermanentProfileModalProps> = ({
  initialProfile,
  onSaveProfile,
  onClose,
  onSignOut
}) => {
  const [profile, setProfile] = useState<ModestyProfile>(initialProfile);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  const necklines: { id: Neckline; label: string }[] = [
    { id: 'high', label: 'High Neck' },
    { id: 'crew', label: 'Crew' },
    { id: 'scoop', label: 'Scoop' },
    { id: 'v-neck', label: 'V-Neck' },
    { id: 'plunge', label: 'Plunge' },
  ];

  const sleeveLengths: { id: SleeveLength; label: string }[] = [
    { id: 'wrist', label: 'Full Wrist' },
    { id: '3/4', label: '3/4 Sleeve' },
    { id: 'elbow', label: 'Elbow' },
    { id: 'short', label: 'Short Sleeve' },
    { id: 'sleeveless', label: 'Sleeveless' },
  ];

  const hemlines: { id: Hemline; label: string }[] = [
    { id: 'floor', label: 'Floor Maxi' },
    { id: 'ankle', label: 'Ankle' },
    { id: 'midi', label: 'Midi' },
    { id: 'knee', label: 'Knee' },
    { id: 'mini', label: 'Mini' },
  ];

  const toggleArrayItem = <T extends string>(current: T[], item: T): T[] => {
    return current.includes(item)
      ? current.filter(x => x !== item)
      : [...current, item];
  };

  const handleApplyStrictPreset = () => {
    setProfile(prev => ({
      ...prev,
      name: 'Strict Coverage Default',
      necklines: ['high'],
      sleeveLengths: ['wrist'],
      hemlines: ['floor'],
      fits: ['loose', 'relaxed'],
      noSlits: true,
      noOpenBack: true,
      isOpaque: true
    }));
  };

  const handleApplySmartPreset = () => {
    setProfile(prev => ({
      ...prev,
      name: 'Smart Casual Default',
      necklines: ['high', 'crew'],
      sleeveLengths: ['wrist', '3/4'],
      hemlines: ['floor', 'ankle', 'midi'],
      fits: [],
      noSlits: true,
      noOpenBack: true,
      isOpaque: true
    }));
  };

  const handleSave = () => {
    const updated = { ...profile, isProfileComplete: true };
    try {
      localStorage.setItem('hercloset_permanent_profile', JSON.stringify(updated));
    } catch {
      // ignore
    }
    onSaveProfile(updated);
    setSavedSuccess(true);
    setTimeout(() => {
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#4B3F38]/60 backdrop-blur-md animate-in fade-in duration-200 font-sans">
      <div className="relative w-full max-w-xl bg-[#FAF7F2] border border-[#D6CFCE] rounded-3xl shadow-2xl overflow-hidden flex flex-col text-[#4B3F38] max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 border-b border-[#D6CFCE] bg-[#F2EDE6] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-white border border-[#B89A8E] text-[#8A6B5D] shadow-sm">
              <UserCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif italic font-bold text-xl text-[#4B3F38]">
                Permanent Modesty Profile
              </h3>
              <p className="text-xs text-[#8A6B5D] font-sans">
                These settings are saved to your account and automatically applied whenever you log in.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white text-[#4B3F38] hover:bg-[#FAF7F2] border border-[#D6CFCE] transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Preset Selector */}
          <div>
            <label className="text-[11px] font-bold text-[#8A6B5D] uppercase tracking-wider block mb-2.5">
              Account Preset Defaults
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleApplyStrictPreset}
                className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-[#8A6B5D] hover:bg-[#4B3F38] text-white text-xs font-semibold transition-all shadow-sm"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Strict Coverage Preset</span>
              </button>

              <button
                onClick={handleApplySmartPreset}
                className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-[#B89A8E] hover:bg-[#8A6B5D] text-white text-xs font-semibold transition-all shadow-sm"
              >
                <HeartHandshake className="w-4 h-4" />
                <span>Smart Casual Preset</span>
              </button>
            </div>
          </div>

          {/* Hard Constraints */}
          <div className="space-y-2.5 bg-[#F2EDE6] p-4 rounded-2xl border border-[#D6CFCE]">
            <label className="text-[11px] font-bold text-[#8A6B5D] uppercase tracking-wider block mb-1">
              Hard Coverage Constraints (Default Rules)
            </label>

            <label className="flex items-center justify-between p-2.5 rounded-xl hover:bg-white cursor-pointer transition-all">
              <div className="flex items-center gap-2.5">
                <Scissors className="w-4 h-4 text-rose-700 shrink-0" />
                <span className="text-xs font-medium text-[#4B3F38]">No Slits (Thigh or Back Slits)</span>
              </div>
              <input
                type="checkbox"
                checked={profile.noSlits}
                onChange={(e) => setProfile(prev => ({ ...prev, noSlits: e.target.checked }))}
                className="w-4 h-4 rounded border-[#D6CFCE] bg-white text-[#8A6B5D] focus:ring-[#8A6B5D]"
              />
            </label>

            <label className="flex items-center justify-between p-2.5 rounded-xl hover:bg-white cursor-pointer transition-all">
              <div className="flex items-center gap-2.5">
                <EyeOff className="w-4 h-4 text-[#8A6B5D] shrink-0" />
                <span className="text-xs font-medium text-[#4B3F38]">No Open Back / Back Cutouts</span>
              </div>
              <input
                type="checkbox"
                checked={profile.noOpenBack}
                onChange={(e) => setProfile(prev => ({ ...prev, noOpenBack: e.target.checked }))}
                className="w-4 h-4 rounded border-[#D6CFCE] bg-white text-[#8A6B5D] focus:ring-[#8A6B5D]"
              />
            </label>

            <label className="flex items-center justify-between p-2.5 rounded-xl hover:bg-white cursor-pointer transition-all">
              <div className="flex items-center gap-2.5">
                <Layers className="w-4 h-4 text-[#B89A8E] shrink-0" />
                <span className="text-xs font-medium text-[#4B3F38]">100% Opaque (No Sheer Fabrics)</span>
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
            <label className="text-[11px] font-bold text-[#8A6B5D] uppercase tracking-wider block mb-2">
              Default Necklines
            </label>
            <div className="flex flex-wrap gap-2">
              {necklines.map((item) => {
                const selected = profile.necklines.includes(item.id);
                return (
                  <button
                    key={item.id}
                    onClick={() => setProfile(prev => ({ ...prev, necklines: toggleArrayItem(prev.necklines, item.id) }))}
                    className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 border ${selected
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
            <label className="text-[11px] font-bold text-[#8A6B5D] uppercase tracking-wider block mb-2">
              Default Sleeve Lengths
            </label>
            <div className="flex flex-wrap gap-2">
              {sleeveLengths.map((item) => {
                const selected = profile.sleeveLengths.includes(item.id);
                return (
                  <button
                    key={item.id}
                    onClick={() => setProfile(prev => ({ ...prev, sleeveLengths: toggleArrayItem(prev.sleeveLengths, item.id) }))}
                    className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 border ${selected
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
            <label className="text-[11px] font-bold text-[#8A6B5D] uppercase tracking-wider block mb-2">
              Default Hemline Lengths
            </label>
            <div className="flex flex-wrap gap-2">
              {hemlines.map((item) => {
                const selected = profile.hemlines.includes(item.id);
                return (
                  <button
                    key={item.id}
                    onClick={() => setProfile(prev => ({ ...prev, hemlines: toggleArrayItem(prev.hemlines, item.id) }))}
                    className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 border ${selected
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

        </div>

        {/* Footer Action Bar */}
        <div className="p-5 bg-[#F2EDE6] border-t border-[#D6CFCE] flex items-center justify-between gap-3">
          {onSignOut ? (
            <button
              onClick={() => {
                onClose();
                onSignOut();
              }}
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-rose-50 border border-[#D6CFCE] hover:border-rose-300 text-xs font-semibold text-rose-700 transition-all flex items-center gap-1.5"
            >
              <LogOut className="w-4 h-4 text-rose-600" />
              <span>Sign Out</span>
            </button>
          ) : (
            <span className="text-xs text-[#8A6B5D] font-semibold">
              {savedSuccess ? '✅ Profile Saved!' : 'Auto-applies on login'}
            </span>
          )}

          <button
            onClick={handleSave}
            className="px-6 py-3 rounded-2xl bg-[#8A6B5D] hover:bg-[#4B3F38] text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save as My Permanent Default</span>
          </button>
        </div>

      </div>
    </div>
  );
};
