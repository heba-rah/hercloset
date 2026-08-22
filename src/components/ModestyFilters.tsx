'use client';

import React from 'react';
import { ShieldCheck, RotateCcw, Sparkles, Filter, Check, EyeOff, Layers, Scissors, HeartHandshake } from 'lucide-react';
import { ModestyFilterState, Neckline, SleeveLength, Hemline, GarmentFit } from '@/types/product';

interface ModestyFiltersProps {
  filters: ModestyFilterState;
  onFilterChange: (updates: Partial<ModestyFilterState>) => void;
  onReset: () => void;
  onApplyStrictPreset: () => void;
  onApplySmartPreset: () => void;
  isMobileDrawer?: boolean;
  onCloseMobileDrawer?: () => void;
}

export const ModestyFilters: React.FC<ModestyFiltersProps> = ({
  filters,
  onFilterChange,
  onReset,
  onApplyStrictPreset,
  onApplySmartPreset,
  isMobileDrawer,
  onCloseMobileDrawer
}) => {
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

  const fits: { id: GarmentFit; label: string }[] = [
    { id: 'loose', label: 'Loose' },
    { id: 'relaxed', label: 'Relaxed' },
    { id: 'fitted', label: 'Fitted' },
    { id: 'bodycon', label: 'Bodycon' },
  ];

  const toggleArrayItem = <T extends string>(current: T[], item: T): T[] => {
    return current.includes(item)
      ? current.filter(x => x !== item)
      : [...current, item];
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 text-slate-100 shadow-xl space-y-6">
      {/* Header & Title */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-400">
            <Filter className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-base tracking-tight text-slate-100">Modesty Criteria</h3>
            <p className="text-xs text-slate-400">Personalized visual rules</p>
          </div>
        </div>

        {isMobileDrawer && onCloseMobileDrawer && (
          <button
            onClick={onCloseMobileDrawer}
            className="text-xs text-slate-400 hover:text-slate-200 px-2 py-1 bg-slate-800 rounded-lg"
          >
            Done
          </button>
        )}
      </div>

      {/* Quick Presets */}
      <div>
        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2.5">
          Quick Modesty Presets
        </label>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={onApplyStrictPreset}
            className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-800/80 text-emerald-300 text-xs font-semibold transition-all shadow-sm"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Strict Full Coverage</span>
          </button>
          
          <button
            onClick={onApplySmartPreset}
            className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 text-teal-300 text-xs font-semibold transition-all shadow-sm"
          >
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>Smart Casual</span>
          </button>
        </div>
      </div>

      {/* Hard Constraints Checkboxes */}
      <div className="space-y-2.5 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80">
        <label className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block mb-1">
          Hard Constraints (Must Pass)
        </label>
        
        {/* No Slits */}
        <label className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-900 cursor-pointer transition-all">
          <div className="flex items-center gap-2.5">
            <Scissors className="w-4 h-4 text-rose-400 shrink-0" />
            <span className="text-xs font-medium text-slate-200">No Slits (Thigh or Back)</span>
          </div>
          <input
            type="checkbox"
            checked={filters.noSlits}
            onChange={(e) => onFilterChange({ noSlits: e.target.checked })}
            className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-emerald-500 focus:ring-emerald-500/40"
          />
        </label>

        {/* No Open Back */}
        <label className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-900 cursor-pointer transition-all">
          <div className="flex items-center gap-2.5">
            <EyeOff className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="text-xs font-medium text-slate-200">No Open Back / Cutouts</span>
          </div>
          <input
            type="checkbox"
            checked={filters.noOpenBack}
            onChange={(e) => onFilterChange({ noOpenBack: e.target.checked })}
            className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-emerald-500 focus:ring-emerald-500/40"
          />
        </label>

        {/* 100% Opaque */}
        <label className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-900 cursor-pointer transition-all">
          <div className="flex items-center gap-2.5">
            <Layers className="w-4 h-4 text-teal-400 shrink-0" />
            <span className="text-xs font-medium text-slate-200">100% Opaque (No Sheer)</span>
          </div>
          <input
            type="checkbox"
            checked={filters.isOpaque}
            onChange={(e) => onFilterChange({ isOpaque: e.target.checked })}
            className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-emerald-500 focus:ring-emerald-500/40"
          />
        </label>
      </div>

      {/* Neckline Selector */}
      <div>
        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
          Neckline Preferred
        </label>
        <div className="flex flex-wrap gap-1.5">
          {necklines.map((item) => {
            const selected = filters.necklines.includes(item.id);
            return (
              <button
                key={item.id}
                onClick={() => onFilterChange({ necklines: toggleArrayItem(filters.necklines, item.id) })}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1 border ${
                  selected
                    ? 'bg-emerald-500/20 border-emerald-500/60 text-emerald-300 font-semibold'
                    : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:text-slate-200'
                }`}
              >
                {selected && <Check className="w-3 h-3 text-emerald-400" />}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sleeve Length Selector */}
      <div>
        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
          Sleeve Length
        </label>
        <div className="flex flex-wrap gap-1.5">
          {sleeveLengths.map((item) => {
            const selected = filters.sleeveLengths.includes(item.id);
            return (
              <button
                key={item.id}
                onClick={() => onFilterChange({ sleeveLengths: toggleArrayItem(filters.sleeveLengths, item.id) })}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1 border ${
                  selected
                    ? 'bg-emerald-500/20 border-emerald-500/60 text-emerald-300 font-semibold'
                    : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:text-slate-200'
                }`}
              >
                {selected && <Check className="w-3 h-3 text-emerald-400" />}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Hemline Selector */}
      <div>
        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
          Hemline Length
        </label>
        <div className="flex flex-wrap gap-1.5">
          {hemlines.map((item) => {
            const selected = filters.hemlines.includes(item.id);
            return (
              <button
                key={item.id}
                onClick={() => onFilterChange({ hemlines: toggleArrayItem(filters.hemlines, item.id) })}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1 border ${
                  selected
                    ? 'bg-emerald-500/20 border-emerald-500/60 text-emerald-300 font-semibold'
                    : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:text-slate-200'
                }`}
              >
                {selected && <Check className="w-3 h-3 text-emerald-400" />}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Fit Selector */}
      <div>
        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
          Silhouette Fit
        </label>
        <div className="flex flex-wrap gap-1.5">
          {fits.map((item) => {
            const selected = filters.fits.includes(item.id);
            return (
              <button
                key={item.id}
                onClick={() => onFilterChange({ fits: toggleArrayItem(filters.fits, item.id) })}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1 border ${
                  selected
                    ? 'bg-emerald-500/20 border-emerald-500/60 text-emerald-300 font-semibold'
                    : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:text-slate-200'
                }`}
              >
                {selected && <Check className="w-3 h-3 text-emerald-400" />}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Reset Filters Button */}
      <div className="pt-2 border-t border-slate-800">
        <button
          onClick={onReset}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-400 hover:text-slate-200 transition-all"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset All Filters</span>
        </button>
      </div>

    </div>
  );
};
