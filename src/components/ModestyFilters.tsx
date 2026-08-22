'use client';

import React from 'react';
import { ShieldCheck, RotateCcw, Filter, Check, EyeOff, Layers, Scissors, HeartHandshake } from 'lucide-react';
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
    <div className="bg-[#FAF7F2] border border-[#D6CFCE] rounded-2xl p-5 text-[#4B3F38] shadow-sm space-y-6">
      {/* Header & Title */}
      <div className="flex items-center justify-between border-b border-[#D6CFCE] pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-[#F2EDE6] border border-[#B89A8E] text-[#8A6B5D]">
            <Filter className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-base tracking-tight text-[#4B3F38]">Modesty Criteria</h3>
            <p className="text-xs text-[#8A6B5D]">Personalized visual rules</p>
          </div>
        </div>

        {isMobileDrawer && onCloseMobileDrawer && (
          <button
            onClick={onCloseMobileDrawer}
            className="text-xs text-[#4B3F38] bg-[#D6CFCE]/40 px-2.5 py-1 rounded-lg hover:bg-[#D6CFCE]"
          >
            Done
          </button>
        )}
      </div>

      {/* Quick Presets */}
      <div>
        <label className="text-xs font-semibold text-[#8A6B5D] uppercase tracking-wider block mb-2.5">
          Quick Modesty Presets
        </label>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={onApplyStrictPreset}
            className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#8A6B5D] hover:bg-[#4B3F38] text-white text-xs font-semibold transition-all shadow-sm"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Strict Coverage</span>
          </button>
          
          <button
            onClick={onApplySmartPreset}
            className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#B89A8E] hover:bg-[#8A6B5D] text-white text-xs font-semibold transition-all shadow-sm"
          >
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>Smart Casual</span>
          </button>
        </div>
      </div>

      {/* Hard Constraints Checkboxes */}
      <div className="space-y-2.5 bg-[#F2EDE6] p-3.5 rounded-xl border border-[#D6CFCE]">
        <label className="text-xs font-semibold text-[#8A6B5D] uppercase tracking-wider block mb-1">
          Hard Constraints (Must Pass)
        </label>
        
        {/* No Slits */}
        <label className="flex items-center justify-between p-2 rounded-lg hover:bg-white cursor-pointer transition-all">
          <div className="flex items-center gap-2.5">
            <Scissors className="w-4 h-4 text-rose-700 shrink-0" />
            <span className="text-xs font-medium text-[#4B3F38]">No Slits (Thigh or Back)</span>
          </div>
          <input
            type="checkbox"
            checked={filters.noSlits}
            onChange={(e) => onFilterChange({ noSlits: e.target.checked })}
            className="w-4 h-4 rounded border-[#D6CFCE] bg-white text-[#8A6B5D] focus:ring-[#8A6B5D]"
          />
        </label>

        {/* No Open Back */}
        <label className="flex items-center justify-between p-2 rounded-lg hover:bg-white cursor-pointer transition-all">
          <div className="flex items-center gap-2.5">
            <EyeOff className="w-4 h-4 text-[#8A6B5D] shrink-0" />
            <span className="text-xs font-medium text-[#4B3F38]">No Open Back / Cutouts</span>
          </div>
          <input
            type="checkbox"
            checked={filters.noOpenBack}
            onChange={(e) => onFilterChange({ noOpenBack: e.target.checked })}
            className="w-4 h-4 rounded border-[#D6CFCE] bg-white text-[#8A6B5D] focus:ring-[#8A6B5D]"
          />
        </label>

        {/* 100% Opaque */}
        <label className="flex items-center justify-between p-2 rounded-lg hover:bg-white cursor-pointer transition-all">
          <div className="flex items-center gap-2.5">
            <Layers className="w-4 h-4 text-[#B89A8E] shrink-0" />
            <span className="text-xs font-medium text-[#4B3F38]">100% Opaque (No Sheer)</span>
          </div>
          <input
            type="checkbox"
            checked={filters.isOpaque}
            onChange={(e) => onFilterChange({ isOpaque: e.target.checked })}
            className="w-4 h-4 rounded border-[#D6CFCE] bg-white text-[#8A6B5D] focus:ring-[#8A6B5D]"
          />
        </label>
      </div>

      {/* Neckline Selector */}
      <div>
        <label className="text-xs font-semibold text-[#8A6B5D] uppercase tracking-wider block mb-2">
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
                    ? 'bg-[#8A6B5D] border-[#8A6B5D] text-white font-semibold'
                    : 'bg-white border-[#D6CFCE] text-[#4B3F38] hover:bg-[#F2EDE6]'
                }`}
              >
                {selected && <Check className="w-3 h-3 text-white" />}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sleeve Length Selector */}
      <div>
        <label className="text-xs font-semibold text-[#8A6B5D] uppercase tracking-wider block mb-2">
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
                    ? 'bg-[#8A6B5D] border-[#8A6B5D] text-white font-semibold'
                    : 'bg-white border-[#D6CFCE] text-[#4B3F38] hover:bg-[#F2EDE6]'
                }`}
              >
                {selected && <Check className="w-3 h-3 text-white" />}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Hemline Selector */}
      <div>
        <label className="text-xs font-semibold text-[#8A6B5D] uppercase tracking-wider block mb-2">
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
                    ? 'bg-[#8A6B5D] border-[#8A6B5D] text-white font-semibold'
                    : 'bg-white border-[#D6CFCE] text-[#4B3F38] hover:bg-[#F2EDE6]'
                }`}
              >
                {selected && <Check className="w-3 h-3 text-white" />}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Fit Selector */}
      <div>
        <label className="text-xs font-semibold text-[#8A6B5D] uppercase tracking-wider block mb-2">
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
                    ? 'bg-[#8A6B5D] border-[#8A6B5D] text-white font-semibold'
                    : 'bg-white border-[#D6CFCE] text-[#4B3F38] hover:bg-[#F2EDE6]'
                }`}
              >
                {selected && <Check className="w-3 h-3 text-white" />}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Reset Filters Button */}
      <div className="pt-2 border-t border-[#D6CFCE]">
        <button
          onClick={onReset}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-[#F2EDE6] border border-[#D6CFCE] text-xs font-semibold text-[#4B3F38] transition-all"
        >
          <RotateCcw className="w-3.5 h-3.5 text-[#8A6B5D]" />
          <span>Reset All Filters</span>
        </button>
      </div>

    </div>
  );
};
