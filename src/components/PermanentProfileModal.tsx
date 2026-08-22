'use client';

import React, { useState } from 'react';
import { ShieldCheck, X, Check, Save, UserCheck, HeartHandshake, Scissors, EyeOff, Layers, LogOut } from 'lucide-react';
import { ModestyProfile, Neckline, SleeveLength, Hemline } from '@/types/product';
import { AvatarCarousel } from '@/components/AvatarCarousel';

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
          
          {/* AVATAR CAROUSEL WITH MODESTY PRESET SYNC */}
          <div className="bg-[#F2EDE6] p-4 rounded-2xl border border-[#D6CFCE]">
            <AvatarCarousel
              profile={profile}
              onChangeProfile={(updated) => setProfile(prev => ({ ...prev, ...updated }))}
            />
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
                    onClick={() => setProfile(prev => ({
                      ...prev,
                      necklines: toggleArrayItem(prev.necklines, item.id)
                    }))}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all flex items-center gap-1.5 cursor-pointer ${
                      selected
                        ? 'bg-[#8A6B5D] border-[#8A6B5D] text-white shadow-sm font-semibold'
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

          {/* Sleeve Length Preferred */}
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
                    onClick={() => setProfile(prev => ({
                      ...prev,
                      sleeveLengths: toggleArrayItem(prev.sleeveLengths, item.id)
                    }))}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all flex items-center gap-1.5 cursor-pointer ${
                      selected
                        ? 'bg-[#8A6B5D] border-[#8A6B5D] text-white shadow-sm font-semibold'
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

          {/* Hemline Length Preferred */}
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
                    onClick={() => setProfile(prev => ({
                      ...prev,
                      hemlines: toggleArrayItem(prev.hemlines, item.id)
                    }))}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all flex items-center gap-1.5 cursor-pointer ${
                      selected
                        ? 'bg-[#8A6B5D] border-[#8A6B5D] text-white shadow-sm font-semibold'
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

        {/* Footer Actions */}
        <div className="p-6 border-t border-[#D6CFCE] bg-[#F2EDE6] flex items-center justify-between gap-4">
          {onSignOut ? (
            <button
              onClick={onSignOut}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-semibold transition-all cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          ) : (
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-white border border-[#D6CFCE] text-xs font-semibold text-[#4B3F38] hover:bg-[#FAF7F2] transition-all cursor-pointer"
            >
              Cancel
            </button>
          )}

          <button
            onClick={handleSave}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#8A6B5D] hover:bg-[#4B3F38] text-white font-bold text-xs shadow-md transition-all cursor-pointer"
          >
            {savedSuccess ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>Modesty Profile Saved!</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Profile Preferences</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
