'use client';

import React from 'react';
import { CalculatedMatch, Product } from '@/types/product';
import { PinterestCard } from './PinterestCard';
import { Sparkles, AlertCircle } from 'lucide-react';

interface PinterestGridProps {
  matches: CalculatedMatch[];
  isAiMode: boolean;
  onOpenAuditModal: (product: Product) => void;
  onAddToHamper: (product: Product) => void;
  hamperProductIds: string[];
}

export const PinterestGrid: React.FC<PinterestGridProps> = ({
  matches,
  isAiMode,
  onOpenAuditModal,
  onAddToHamper,
  hamperProductIds
}) => {
  if (matches.length === 0) {
    return (
      <div className="p-12 text-center bg-slate-900/60 border border-slate-800 rounded-3xl space-y-4 my-8 max-w-xl mx-auto">
        <div className="mx-auto w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-slate-200">No Matching Garments Found</h3>
        <p className="text-sm text-slate-400">
          Try relaxing your modesty constraints or selecting a different occasion tab above.
        </p>
      </div>
    );
  }

  return (
    <div className="my-8">
      {/* Grid Header */}
      <div className="flex items-center justify-between mb-4 px-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-purple-300 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span>Modesty Feed ({matches.length} curated matches)</span>
        </h3>
        <span className="text-xs text-slate-500 font-mono">Pinterest Masonry Feed</span>
      </div>

      {/* PINTEREST MASONRY COLUMNS LAYOUT */}
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
        {matches.map((match) => (
          <PinterestCard
            key={match.product.id}
            match={match}
            isAiMode={isAiMode}
            onOpenAuditModal={onOpenAuditModal}
            onAddToHamper={onAddToHamper}
            isInHamper={hamperProductIds.includes(match.product.id)}
          />
        ))}
      </div>
    </div>
  );
};
