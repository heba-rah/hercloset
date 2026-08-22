'use client';

import React, { useState } from 'react';
import { ShieldCheck, RotateCcw, Filter, Check, EyeOff, Layers, Scissors, HeartHandshake, DollarSign, ArrowUpDown, Tag, Info } from 'lucide-react';
import { ModestyFilterState, Neckline, SleeveLength, Hemline } from '@/types/product';

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
  const [activeTab, setActiveTab] = useState<'modesty' | 'shopping'>('modesty');

  // Exact 4 Setup Categories (No granular redundant options)
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

  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'Tops', label: 'Tops & Shirts' },
    { id: 'Dresses', label: 'Dresses & Rompers' },
    { id: 'Skirts', label: 'Skirts' },
    { id: 'Pants', label: 'Pants & Trousers' },
    { id: 'Outerwear', label: 'Sweaters & Jackets' },
  ];

  const isSleeveSelected = (ids: SleeveLength[]) => ids.some(id => filters.sleeveLengths.includes(id));
  const isNecklineSelected = (ids: Neckline[]) => ids.some(id => filters.necklines.includes(id));
  const isHemlineSelected = (ids: Hemline[]) => ids.some(id => filters.hemlines.includes(id));

  const toggleSleeveOption = (ids: SleeveLength[]) => {
    const isSelected = isSleeveSelected(ids);
    let updated = [...filters.sleeveLengths];
    if (isSelected) {
      updated = updated.filter(s => !ids.includes(s));
    } else {
      updated = Array.from(new Set([...updated, ...ids]));
    }
    onFilterChange({ sleeveLengths: updated.length > 0 ? updated : ['wrist'] });
  };

  const toggleNecklineOption = (ids: Neckline[]) => {
    const isSelected = isNecklineSelected(ids);
    let updated = [...filters.necklines];
    if (isSelected) {
      updated = updated.filter(n => !ids.includes(n));
    } else {
      updated = Array.from(new Set([...updated, ...ids]));
    }
    onFilterChange({ necklines: updated.length > 0 ? updated : ['high'] });
  };

  const toggleHemlineOption = (ids: Hemline[]) => {
    const isSelected = isHemlineSelected(ids);
    let updated = [...filters.hemlines];
    if (isSelected) {
      updated = updated.filter(h => !ids.includes(h));
    } else {
      updated = Array.from(new Set([...updated, ...ids]));
    }
    onFilterChange({ hemlines: updated.length > 0 ? updated : ['floor'] });
  };

  return (
    <div className="bg-[#FAF7F2] border border-[#D6CFCE] rounded-2xl p-5 text-[#3D312A] shadow-sm space-y-5 font-sans pb-28">
      
      {/* Drawer Header & Title */}
      <div className="flex items-center justify-between border-b border-[#D6CFCE] pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-[#F2EDE6] border border-[#B89A8E] text-[#8A6B5D]">
            <Filter className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-serif italic font-bold text-base text-[#3D312A]">Session Preferences</h3>
            <p className="text-xs text-[#8A6B5D]">Temporary filters for current search</p>
          </div>
        </div>

        {isMobileDrawer && onCloseMobileDrawer && (
          <button
            onClick={onCloseMobileDrawer}
            className="text-xs font-bold text-[#3D312A] bg-[#D6CFCE]/40 px-3 py-1.5 rounded-lg hover:bg-[#D6CFCE] cursor-pointer"
          >
            Done
          </button>
        )}
      </div>

      {/* DUAL TAB SWITCHER BAR */}
      <div className="flex bg-[#F2EDE6] p-1 rounded-xl border border-[#D6CFCE]">
        <button
          onClick={() => setActiveTab('modesty')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'modesty'
              ? 'bg-[#3D312A] text-white shadow-sm'
              : 'text-[#6E5D53] hover:text-[#3D312A]'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Modesty Rules</span>
        </button>

        <button
          onClick={() => setActiveTab('shopping')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'shopping'
              ? 'bg-[#3D312A] text-white shadow-sm'
              : 'text-[#6E5D53] hover:text-[#3D312A]'
          }`}
        >
          <DollarSign className="w-3.5 h-3.5" />
          <span>Shopping Filters</span>
        </button>
      </div>

      {/* TAB 1: MODESTY RULES */}
      {activeTab === 'modesty' && (
        <div className="space-y-5 animate-in fade-in duration-200">
          
          {/* Quick Presets */}
          <div>
            <label className="text-[11px] font-bold text-[#8A6B5D] uppercase tracking-wider block mb-2">
              Quick Modesty Presets
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={onApplyStrictPreset}
                className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#3D312A] hover:bg-[#2A211B] text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-amber-200" />
                <span>Strict Coverage</span>
              </button>

              <button
                onClick={onApplySmartPreset}
                className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#8A6B5D] hover:bg-[#6E5D53] text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
              >
                <HeartHandshake className="w-3.5 h-3.5 text-amber-200" />
                <span>Smart Casual</span>
              </button>
            </div>
          </div>

          {/* Hard Constraints Checkboxes */}
          <div className="space-y-2 bg-[#F2EDE6] p-3.5 rounded-xl border border-[#D6CFCE]">
            <label className="text-[11px] font-bold text-[#8A6B5D] uppercase tracking-wider block mb-1">
              Hard Constraints (Must Pass)
            </label>

            <button
              type="button"
              onClick={() => onFilterChange({ noSlits: !filters.noSlits })}
              className={`w-full p-2.5 rounded-xl border text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                filters.noSlits
                  ? 'bg-white border-[#3D312A] text-[#3D312A] shadow-xs'
                  : 'bg-[#F2EDE6] border-transparent text-[#6E5D53]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Scissors className="w-4 h-4 text-rose-600 shrink-0" />
                <span>No Slits</span>
              </div>
              <div className={`w-4 h-4 rounded flex items-center justify-center border ${
                filters.noSlits ? 'bg-[#3D312A] border-[#3D312A] text-white' : 'border-[#D6CFCE] bg-white'
              }`}>
                {filters.noSlits && <Check className="w-3 h-3 text-white" />}
              </div>
            </button>

            <button
              type="button"
              onClick={() => onFilterChange({ noOpenBack: !filters.noOpenBack })}
              className={`w-full p-2.5 rounded-xl border text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                filters.noOpenBack
                  ? 'bg-white border-[#3D312A] text-[#3D312A] shadow-xs'
                  : 'bg-[#F2EDE6] border-transparent text-[#6E5D53]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <EyeOff className="w-4 h-4 text-[#8A6B5D] shrink-0" />
                <span>No Cutouts</span>
              </div>
              <div className={`w-4 h-4 rounded flex items-center justify-center border ${
                filters.noOpenBack ? 'bg-[#3D312A] border-[#3D312A] text-white' : 'border-[#D6CFCE] bg-white'
              }`}>
                {filters.noOpenBack && <Check className="w-3 h-3 text-white" />}
              </div>
            </button>

            <button
              type="button"
              onClick={() => onFilterChange({ isOpaque: !filters.isOpaque })}
              className={`w-full p-2.5 rounded-xl border text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                filters.isOpaque
                  ? 'bg-white border-[#3D312A] text-[#3D312A] shadow-xs'
                  : 'bg-[#F2EDE6] border-transparent text-[#6E5D53]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Layers className="w-4 h-4 text-[#8A6B5D] shrink-0" />
                <span>100% Opaque</span>
              </div>
              <div className={`w-4 h-4 rounded flex items-center justify-center border ${
                filters.isOpaque ? 'bg-[#3D312A] border-[#3D312A] text-white' : 'border-[#D6CFCE] bg-white'
              }`}>
                {filters.isOpaque && <Check className="w-3 h-3 text-white" />}
              </div>
            </button>
          </div>

          {/* Sleeve Length Selector (Espresso Active Theme) */}
          <div>
            <label className="text-[11px] font-bold text-[#8A6B5D] uppercase tracking-wider block mb-2">
              Sleeve Length
            </label>
            <div className="grid grid-cols-2 gap-2">
              {sleeveLengths.map((item) => {
                const selected = isSleeveSelected(item.ids);
                return (
                  <button
                    key={item.id}
                    onClick={() => toggleSleeveOption(item.ids)}
                    className={`px-3 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 border cursor-pointer ${
                      selected
                        ? 'bg-[#3D312A] border-[#3D312A] text-white shadow-sm'
                        : 'bg-[#FAF7F2] border-[#D6CFCE] text-[#6E5D53] hover:bg-[#F2EDE6]'
                    }`}
                  >
                    {selected && <Check className="w-3.5 h-3.5 text-amber-200" />}
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Neckline Selector (Espresso Active Theme) */}
          <div>
            <label className="text-[11px] font-bold text-[#8A6B5D] uppercase tracking-wider block mb-2">
              Neckline Preferred
            </label>
            <div className="grid grid-cols-2 gap-2">
              {necklines.map((item) => {
                const selected = isNecklineSelected(item.ids);
                return (
                  <button
                    key={item.id}
                    onClick={() => toggleNecklineOption(item.ids)}
                    className={`px-3 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 border cursor-pointer ${
                      selected
                        ? 'bg-[#3D312A] border-[#3D312A] text-white shadow-sm'
                        : 'bg-[#FAF7F2] border-[#D6CFCE] text-[#6E5D53] hover:bg-[#F2EDE6]'
                    }`}
                  >
                    {selected && <Check className="w-3.5 h-3.5 text-amber-200" />}
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottoms Selector (Espresso Active Theme) */}
          <div>
            <label className="text-[11px] font-bold text-[#8A6B5D] uppercase tracking-wider block mb-2">
              Bottoms Style
            </label>
            <div className="grid grid-cols-2 gap-2">
              {hemlines.map((item) => {
                const selected = isHemlineSelected(item.ids);
                return (
                  <button
                    key={item.id}
                    onClick={() => toggleHemlineOption(item.ids)}
                    className={`px-3 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 border cursor-pointer ${
                      selected
                        ? 'bg-[#3D312A] border-[#3D312A] text-white shadow-sm'
                        : 'bg-[#FAF7F2] border-[#D6CFCE] text-[#6E5D53] hover:bg-[#F2EDE6]'
                    }`}
                  >
                    {selected && <Check className="w-3.5 h-3.5 text-amber-200" />}
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: SHOPPING FILTERS */}
      {activeTab === 'shopping' && (
        <div className="space-y-5 animate-in fade-in duration-200">
          
          {/* Price Sort Order */}
          <div>
            <label className="text-[11px] font-bold text-[#8A6B5D] uppercase tracking-wider flex items-center gap-1 mb-2">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#8A6B5D]" /> Sort Catalog By
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => onFilterChange({ sortBy: 'relevance' })}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                  !filters.sortBy || filters.sortBy === 'relevance'
                    ? 'bg-[#3D312A] text-white border-[#3D312A]'
                    : 'bg-white border-[#D6CFCE] text-[#6E5D53] hover:bg-[#F2EDE6]'
                }`}
              >
                AI Relevance
              </button>

              <button
                onClick={() => onFilterChange({ sortBy: 'price_low' })}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                  filters.sortBy === 'price_low'
                    ? 'bg-[#3D312A] text-white border-[#3D312A]'
                    : 'bg-white border-[#D6CFCE] text-[#6E5D53] hover:bg-[#F2EDE6]'
                }`}
              >
                Price: Low to High
              </button>

              <button
                onClick={() => onFilterChange({ sortBy: 'price_high' })}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                  filters.sortBy === 'price_high'
                    ? 'bg-[#3D312A] text-white border-[#3D312A]'
                    : 'bg-white border-[#D6CFCE] text-[#6E5D53] hover:bg-[#F2EDE6]'
                }`}
              >
                Price: High to Low
              </button>
            </div>
          </div>

          {/* Max Price Range Filter Slider */}
          <div className="bg-[#F2EDE6] p-3.5 rounded-xl border border-[#D6CFCE] space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-bold text-[#8A6B5D] uppercase tracking-wider">
                Max Price Limit
              </label>
              <span className="text-xs font-mono font-bold text-[#8A6B5D]">
                {filters.maxPrice && filters.maxPrice > 0 ? `$${filters.maxPrice} CAD` : 'Any Price'}
              </span>
            </div>

            <input
              type="range"
              min="10"
              max="200"
              step="5"
              value={filters.maxPrice || 200}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                onFilterChange({ maxPrice: val >= 200 ? undefined : val });
              }}
              className="w-full accent-[#3D312A] cursor-pointer"
            />
            
            <div className="flex justify-between text-[10px] text-[#8A6B5D] font-mono">
              <span>$10 CAD</span>
              <span>$100 CAD</span>
              <span>$200+ CAD (No Limit)</span>
            </div>
          </div>

          {/* Garment Categories Selector */}
          <div>
            <label className="text-[11px] font-bold text-[#8A6B5D] uppercase tracking-wider flex items-center gap-1 mb-2">
              <Tag className="w-3.5 h-3.5 text-[#8A6B5D]" /> Garment Category
            </label>
            <div className="flex flex-wrap gap-1.5">
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => onFilterChange({ selectedCategory: c.id })}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
                    filters.selectedCategory === c.id
                      ? 'bg-[#3D312A] border-[#3D312A] text-white'
                      : 'bg-white border-[#D6CFCE] text-[#6E5D53] hover:bg-[#F2EDE6]'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* SUBTLE NOTE REGARDING PERMANENT VS SESSION FILTERS */}
      <div className="p-3 bg-[#F2EDE6]/80 border border-[#B89A8E]/40 rounded-xl text-[11px] text-[#8A6B5D] flex items-start gap-2">
        <Info className="w-4 h-4 text-[#8A6B5D] shrink-0 mt-0.5" />
        <p className="leading-snug">
          Changes here only apply to your current search. To update your permanent default rules, click your Profile icon in the top right.
        </p>
      </div>

      {/* Reset Filters Button */}
      <div className="pt-2 border-t border-[#D6CFCE]">
        <button
          onClick={onReset}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-[#F2EDE6] border border-[#D6CFCE] text-xs font-bold text-[#3D312A] transition-all cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5 text-[#8A6B5D]" />
          <span>Reset Session Filters</span>
        </button>
      </div>

    </div>
  );
};
