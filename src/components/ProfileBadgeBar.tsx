'use client';

import React from 'react';
import { ShieldCheck, Edit3 } from 'lucide-react';
import { ModestyProfile } from '@/types/product';

interface ProfileBadgeBarProps {
  profile: ModestyProfile;
  onEditProfile: () => void;
}

export const ProfileBadgeBar: React.FC<ProfileBadgeBarProps> = ({ profile, onEditProfile }) => {
  return (
    <div className="bg-[#FAF7F2] border border-[#D6CFCE] rounded-2xl p-4 my-4 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[#4B3F38]">

      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-[#F2EDE6] text-[#8A6B5D] border border-[#B89A8E]">
          <ShieldCheck className="w-5 h-5" />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm text-[#4B3F38]">Active Modesty Profile</span>
            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-[#8A6B5D] text-white">
              Verified
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 mt-1 text-xs text-[#8A6B5D]">
            <span>{profile.selectedRetailers.join(', ')}</span>
            <span>•</span>
            <span>{profile.necklines.join('/')} neck</span>
            <span>•</span>
            <span>{profile.sleeveLengths.join('/')} sleeves</span>
            {profile.noSlits && <span>• No Slits</span>}
            {profile.noOpenBack && <span>• No Open Back</span>}
            {profile.isOpaque && <span>• 100% Opaque</span>}
          </div>
        </div>
      </div>

      <button
        onClick={onEditProfile}
        className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-[#F2EDE6] border border-[#D6CFCE] text-xs font-semibold text-[#4B3F38] transition-all shadow-sm shrink-0"
      >
        <Edit3 className="w-3.5 h-3.5 text-[#8A6B5D]" />
        <span>Edit Profile</span>
      </button>

    </div>
  );
};
