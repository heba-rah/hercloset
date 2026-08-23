'use client';

import React, { useState } from 'react';
import { ShieldCheck, X, Check, Save, UserCheck, Scissors, EyeOff, Layers, LogOut, Users } from 'lucide-react';
import { ModestyProfile, Neckline, SleeveLength, Hemline, TargetDemographic } from '@/types/product';
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

  const demographicOptions: { id: TargetDemographic; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'women', label: 'Women' },
    { id: 'men', label: 'Men' },
    { id: 'girls', label: 'Girls' },
    { id: 'boys', label: 'Boys' },
    { id: 'kids', label: 'All Kids' },
  ];

  // Exact 4 Setup Categories
  const necklines: { id: Neckline; label: string; ids: Neckline[] }[] = [
    { id: 'high', label: 'High Neck', ids: ['high'] },
    { id: 'crew', label: 'Crewneck', ids: ['crew'] }
  ];

  const sleeveLengths: { id: string; label: string; ids: SleeveLength[] }[] = [
    { id: 'long', label: 'Long Sleeve', ids: ['wrist'] },
    { id: 'short', label: 'Short Sleeve', ids: ['elbow', '3/4', 'short'] }
  ];

  const hemlines: { id: string; label: string; ids: Hemline[] }[] = [
    { id: 'skirt', label: 'Maxi Skirt / Dress', ids: ['floor'] },
    { id: 'pants', label: 'Pants / Trousers', ids: ['ankle'] }
  ];

  const isSleeveSelected = (ids: SleeveLength[]) => ids.some(id => profile.sleeveLengths.includes(id));
  const isNecklineSelected = (ids: Neckline[]) => ids.some(id => profile.necklines.includes(id));
  const isHemlineSelected = (ids: Hemline[]) => ids.some(id => profile.hemlines.includes(id));

  const toggleSleeveOption = (ids: SleeveLength[]) => {
    const isSelected = isSleeveSelected(ids);
    let updated = [...profile.sleeveLengths];
    if (isSelected) {
      updated = updated.filter(s => !ids.includes(s));
    } else {
      updated = Array.from(new Set([...updated, ...ids]));
    }
    setProfile(prev => ({ ...prev, sleeveLengths: updated.length > 0 ? updated : ['wrist'] }));
  };

  const toggleNecklineOption = (ids: Neckline[]) => {
    const isSelected = isNecklineSelected(ids);
    let updated = [...profile.necklines];
    if (isSelected) {
      updated = updated.filter(n => !ids.includes(n));
    } else {
      updated = Array.from(new Set([...updated, ...ids]));
    }
    setProfile(prev => ({ ...prev, necklines: updated.length > 0 ? updated : ['high'] }));
  };

  const toggleHemlineOption = (ids: Hemline[]) => {
    const isSelected = isHemlineSelected(ids);
    let updated = [...profile.hemlines];
    if (isSelected) {
      updated = updated.filter(h => !ids.includes(h));
    } else {
      updated = Array.from(new Set([...updated, ...ids]));
    }
    setProfile(prev => ({ ...prev, hemlines: updated.length > 0 ? updated : ['floor'] }));
  };

  const handleSave = () => {
    const updated = { ...profile, isProfileComplete: true };
    try {
      localStorage.setItem('user_modesty_profile', JSON.stringify(updated));
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
      <div className="relative w-full max-w-xl bg-[#FAF7F2] border border-[#D6CFCE] rounded-3xl shadow-2xl overflow-hidden flex flex-col text-[#3D312A] max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 border-b border-[#D6CFCE] bg-[#F2EDE6] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-white border border-[#B89A8E] text-[#8A6B5D] shadow-sm">
              <UserCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif italic font-bold text-xl text-[#3D312A]">
                Permanent Modesty Profile
              </h3>
              <p className="text-xs text-[#8A6B5D] font-sans font-medium">
                These settings are saved to your account and automatically applied whenever you log in.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white text-[#3D312A] hover:bg-[#FAF7F2] border border-[#D6CFCE] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* STYLIST AVATAR & WARM GREETING CONTAINER */}
          <div className="bg-[#F2EDE6] p-6 rounded-3xl border border-[#D6CFCE]">
            <AvatarCarousel
              profile={profile}
              onChangeProfile={(updated) => setProfile(prev => ({ ...prev, ...updated }))}
            />
          </div>

          {/* Default Shopping Audience (Who Are We Shopping For?) */}
          <div>
            <label className="text-[11px] font-bold text-[#8A6B5D] uppercase tracking-wider flex items-center justify-between mb-2">
              <span className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[#8A6B5D]" /> Default Shopping Audience
              </span>
              <span className="text-[10px] text-[#8A6B5D]/80 font-normal capitalize">
                {profile.targetDemographic === 'all' || !profile.targetDemographic ? 'Everyone' : profile.targetDemographic}
              </span>
            </label>

            <div className="grid grid-cols-3 gap-2">
              {demographicOptions.map((opt) => {
                const isSelected = (!profile.targetDemographic && opt.id === 'all') || profile.targetDemographic === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setProfile(prev => ({ ...prev, targetDemographic: opt.id }))}
                    className={`py-2.5 px-2 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1 cursor-pointer ${
                      isSelected
                        ? 'bg-[#3D312A] border-[#3D312A] text-white shadow-sm'
                        : 'bg-white border-[#D6CFCE] text-[#6E5D53] hover:bg-[#F2EDE6]'
                    }`}
                  >
                    <span>{opt.label}</span>
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
            <div className="grid grid-cols-2 gap-2">
              {sleeveLengths.map((item) => {
                const selected = isSleeveSelected(item.ids);
                return (
                  <button
                    key={item.id}
                    onClick={() => toggleSleeveOption(item.ids)}
                    className={`px-3 py-2.5 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      selected
                        ? 'bg-[#3D312A] border-[#3D312A] text-[#FAF7F2] shadow-sm'
                        : 'bg-white border-[#D6CFCE] text-[#6E5D53] hover:bg-[#F2EDE6]'
                    }`}
                  >
                    {selected && <Check className="w-3.5 h-3.5 text-amber-200" />}
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Neckline Preferred */}
          <div>
            <label className="text-[11px] font-bold text-[#8A6B5D] uppercase tracking-wider block mb-2">
              Default Necklines
            </label>
            <div className="grid grid-cols-2 gap-2">
              {necklines.map((item) => {
                const selected = isNecklineSelected(item.ids);
                return (
                  <button
                    key={item.id}
                    onClick={() => toggleNecklineOption(item.ids)}
                    className={`px-3 py-2.5 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      selected
                        ? 'bg-[#3D312A] border-[#3D312A] text-[#FAF7F2] shadow-sm'
                        : 'bg-white border-[#D6CFCE] text-[#6E5D53] hover:bg-[#F2EDE6]'
                    }`}
                  >
                    {selected && <Check className="w-3.5 h-3.5 text-amber-200" />}
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottoms Preferred */}
          <div>
            <label className="text-[11px] font-bold text-[#8A6B5D] uppercase tracking-wider block mb-2">
              Default Bottoms Styles
            </label>
            <div className="grid grid-cols-2 gap-2">
              {hemlines.map((item) => {
                const selected = isHemlineSelected(item.ids);
                return (
                  <button
                    key={item.id}
                    onClick={() => toggleHemlineOption(item.ids)}
                    className={`px-3 py-2.5 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      selected
                        ? 'bg-[#3D312A] border-[#3D312A] text-[#FAF7F2] shadow-sm'
                        : 'bg-white border-[#D6CFCE] text-[#6E5D53] hover:bg-[#F2EDE6]'
                    }`}
                  >
                    {selected && <Check className="w-3.5 h-3.5 text-amber-200" />}
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Hard Constraints Checkboxes */}
          <div className="space-y-2 bg-[#F2EDE6] p-4 rounded-2xl border border-[#D6CFCE]">
            <label className="text-[11px] font-bold text-[#8A6B5D] uppercase tracking-wider block mb-1">
              Hard Coverage Constraints
            </label>

            <button
              type="button"
              onClick={() => setProfile(prev => ({ ...prev, noSlits: !prev.noSlits }))}
              className={`w-full p-2.5 rounded-xl border text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                profile.noSlits
                  ? 'bg-white border-[#3D312A] text-[#3D312A] shadow-xs'
                  : 'bg-[#F2EDE6] border-transparent text-[#6E5D53]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Scissors className="w-4 h-4 text-rose-600 shrink-0" />
                <span>No Slits</span>
              </div>
              <div className={`w-4 h-4 rounded flex items-center justify-center border ${
                profile.noSlits ? 'bg-[#3D312A] border-[#3D312A] text-white' : 'border-[#D6CFCE] bg-white'
              }`}>
                {profile.noSlits && <Check className="w-3 h-3 text-white" />}
              </div>
            </button>

            <button
              type="button"
              onClick={() => setProfile(prev => ({ ...prev, noOpenBack: !prev.noOpenBack }))}
              className={`w-full p-2.5 rounded-xl border text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                profile.noOpenBack
                  ? 'bg-white border-[#3D312A] text-[#3D312A] shadow-xs'
                  : 'bg-[#F2EDE6] border-transparent text-[#6E5D53]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <EyeOff className="w-4 h-4 text-[#8A6B5D] shrink-0" />
                <span>No Cutouts</span>
              </div>
              <div className={`w-4 h-4 rounded flex items-center justify-center border ${
                profile.noOpenBack ? 'bg-[#3D312A] border-[#3D312A] text-white' : 'border-[#D6CFCE] bg-white'
              }`}>
                {profile.noOpenBack && <Check className="w-3 h-3 text-white" />}
              </div>
            </button>

            <button
              type="button"
              onClick={() => setProfile(prev => ({ ...prev, isOpaque: !profile.isOpaque }))}
              className={`w-full p-2.5 rounded-xl border text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                profile.isOpaque
                  ? 'bg-white border-[#3D312A] text-[#3D312A] shadow-xs'
                  : 'bg-[#F2EDE6] border-transparent text-[#6E5D53]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Layers className="w-4 h-4 text-[#8A6B5D] shrink-0" />
                <span>100% Opaque</span>
              </div>
              <div className={`w-4 h-4 rounded flex items-center justify-center border ${
                profile.isOpaque ? 'bg-[#3D312A] border-[#3D312A] text-white' : 'border-[#D6CFCE] bg-white'
              }`}>
                {profile.isOpaque && <Check className="w-3 h-3 text-white" />}
              </div>
            </button>
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
              className="px-4 py-2.5 rounded-xl bg-white border border-[#D6CFCE] text-xs font-semibold text-[#3D312A] hover:bg-[#FAF7F2] transition-all cursor-pointer"
            >
              Cancel
            </button>
          )}

          <button
            onClick={handleSave}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#3D312A] hover:bg-[#2A211B] text-[#FAF7F2] font-bold text-xs shadow-md transition-all cursor-pointer"
          >
            {savedSuccess ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>Modesty Profile Saved!</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4 text-amber-200" />
                <span>Save Profile Preferences</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
