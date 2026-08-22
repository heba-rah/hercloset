'use client';

import React from 'react';
import { AlertTriangle, ShieldCheck, Sparkles, Eye, CheckCircle2, ArrowRight } from 'lucide-react';
import { ModestyFilterState } from '@/types/product';

interface DemoBannerProps {
  filters: ModestyFilterState;
  onFilterChange: (updates: Partial<ModestyFilterState>) => void;
}

export const DemoBanner: React.FC<DemoBannerProps> = ({ filters, onFilterChange }) => {
  const isAiMode = filters.demoMode === 'ai_search';

  return (
    <div className={`my-6 rounded-2xl border p-5 transition-all shadow-xl ${
      isAiMode
        ? 'bg-gradient-to-r from-emerald-950/80 via-slate-900 to-teal-950/60 border-emerald-800/60 text-emerald-100'
        : 'bg-gradient-to-r from-rose-950/80 via-slate-900 to-amber-950/60 border-rose-800/60 text-rose-100'
    }`}>
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-xl border ${
            isAiMode
              ? 'bg-emerald-900/40 border-emerald-700/60 text-emerald-300'
              : 'bg-rose-900/40 border-rose-700/60 text-rose-300'
          }`}>
            {isAiMode ? (
              <ShieldCheck className="w-7 h-7 animate-bounce" />
            ) : (
              <AlertTriangle className="w-7 h-7 animate-pulse" />
            )}
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="font-bold text-lg tracking-tight">
                {isAiMode ? '✨ Demo Active: hercloset AI Vision Modesty Audit' : '⚠️ Demo Active: Traditional Retailer Keyword Search'}
              </h2>
              <span className={`text-[11px] font-mono px-2.5 py-0.5 rounded-full font-bold uppercase border ${
                isAiMode
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
              }`}>
                {isAiMode ? 'Computer Vision Mode' : 'Retailer Keyword Mode'}
              </span>
            </div>

            <p className="text-sm mt-1 text-slate-300 max-w-3xl leading-relaxed">
              {isAiMode ? (
                <>
                  <strong className="text-emerald-300 font-semibold">AI Vision Mode: </strong>
                  Every garment is scanned by computer vision to detect hidden 18-inch thigh slits, keyhole back cutouts, fabric transparency/sheerness, sleeve length, and neckline depth. Fails are flagged dynamically!
                </>
              ) : (
                <>
                  <strong className="text-rose-300 font-semibold">Broken Retailer Search: </strong>
                  Simulates standard e-commerce sites (ASOS, Zara). Searches text tags like &quot;modest&quot; or &quot;maxi&quot;, but <span className="underline decoration-rose-400 font-semibold">completely misses hidden back cutouts, thigh slits, and sheer linings</span> hidden in product photos.
                </>
              )}
            </p>

            <div className="flex items-center gap-4 mt-3 text-xs flex-wrap">
              {isAiMode ? (
                <>
                  <span className="flex items-center gap-1 text-emerald-400 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Hard Slit &amp; Backless Detection
                  </span>
                  <span className="flex items-center gap-1 text-teal-300 font-medium">
                    <Eye className="w-3.5 h-3.5" /> Fabric Sheerness Analysis
                  </span>
                  <span className="flex items-center gap-1 text-amber-300 font-medium">
                    <Sparkles className="w-3.5 h-3.5" /> Dynamic Personalized Match %
                  </span>
                </>
              ) : (
                <>
                  <span className="flex items-center gap-1 text-rose-300 font-medium">
                    ❌ Ignores 18-inch Thigh Slits
                  </span>
                  <span className="flex items-center gap-1 text-rose-300 font-medium">
                    ❌ Ignores Open Back Keyholes
                  </span>
                  <span className="flex items-center gap-1 text-rose-300 font-medium">
                    ❌ Falsely Boosts Items Tagged &quot;Modest&quot;
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Action button to switch */}
        <div className="shrink-0">
          <button
            onClick={() => onFilterChange({ demoMode: isAiMode ? 'broken_keyword' : 'ai_search' })}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 border transition-all shadow-lg hover:scale-105 active:scale-95 ${
              isAiMode
                ? 'bg-rose-950/80 hover:bg-rose-900 text-rose-200 border-rose-800'
                : 'bg-emerald-950/90 hover:bg-emerald-900 text-emerald-200 border-emerald-700'
            }`}
          >
            <span>Switch to {isAiMode ? 'Broken Keyword Mode' : 'AI Modesty Mode'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
