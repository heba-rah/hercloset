'use client';

import React from 'react';
import { ShieldCheck, Edit3, Sparkles, Store, Calendar, CheckCircle2 } from 'lucide-react';
import { ModestyProfile } from '@/types/product';

interface ProfileBadgeBarProps {
  profile: ModestyProfile;
  onEditProfile: () => void;
}

export const ProfileBadgeBar: React.FC<ProfileBadgeBarProps> = ({ profile, onEditProfile }) => {
  return (
    <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-4 my-4 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      
      <div className="flex items-start gap-3">
        <div className="p-2.5 rounded-xl bg-emerald-950 border border-emerald-700/80 text-emerald-400 shrink-0">
          <ShieldCheck className="w-5 h-5" />
        </div>

        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-bold text-sm text-slate-100 flex items-center gap-1.5">
              <span>Active Modesty Profile:</span>
              <span className="text-emerald-400 font-semibold">{profile.name}</span>
            </h3>
            <span className="px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-800 text-[10px] font-semibold">
              Enforced across catalog
            </span>
          </div>

          <div className="flex items-center gap-2 flex-wrap mt-1.5 text-xs text-slate-300">
            <span className="flex items-center gap-1 font-medium bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 text-emerald-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              {profile.necklines.length > 0 ? profile.necklines.join('/') : 'High'} Neck
            </span>

            <span className="flex items-center gap-1 font-medium bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 text-emerald-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              {profile.sleeveLengths.length > 0 ? profile.sleeveLengths.join('/') : 'Wrist'} Sleeve
            </span>

            <span className="flex items-center gap-1 font-medium bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 text-emerald-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              {profile.hemlines.length > 0 ? profile.hemlines.join('/') : 'Floor'} Hem
            </span>

            {profile.noSlits && (
              <span className="bg-rose-950/60 text-rose-300 border border-rose-800/80 px-2.5 py-1 rounded-lg font-semibold">
                No Slits
              </span>
            )}
            {profile.noOpenBack && (
              <span className="bg-amber-950/60 text-amber-300 border border-amber-800/80 px-2.5 py-1 rounded-lg font-semibold">
                No Open Back
              </span>
            )}
            {profile.isOpaque && (
              <span className="bg-teal-950/60 text-teal-300 border border-teal-800/80 px-2.5 py-1 rounded-lg font-semibold">
                100% Opaque
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Edit Profile CTA */}
      <button
        onClick={onEditProfile}
        className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-200 text-xs font-semibold transition-all shrink-0 shadow-sm"
      >
        <Edit3 className="w-3.5 h-3.5 text-emerald-400" />
        <span>Edit Modesty Profile</span>
      </button>

    </div>
  );
};
