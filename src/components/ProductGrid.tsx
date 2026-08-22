'use client';

import React from 'react';
import { CalculatedMatch, Product } from '@/types/product';
import { ProductCard } from './ProductCard';
import { Sparkles, AlertCircle } from 'lucide-react';

interface ProductGridProps {
  matches: CalculatedMatch[];
  isAiMode: boolean;
  onOpenAuditModal: (product: Product) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  matches,
  isAiMode,
  onOpenAuditModal
}) => {
  if (matches.length === 0) {
    return (
      <div className="p-12 text-center bg-slate-900/60 border border-slate-800 rounded-3xl space-y-4">
        <div className="mx-auto w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center text-slate-400">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-slate-200">No Matching Garments Found</h3>
        <p className="text-sm text-slate-400 max-w-md mx-auto">
          Try relaxing your modesty constraints or clearing search filters to see more results.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Results Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>Garment Catalog ({matches.length})</span>
        </h2>
        <span className="text-xs text-slate-500 font-mono">
          Sorted by {isAiMode ? 'AI Modesty Match %' : 'Keyword relevance'}
        </span>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {matches.map((match) => (
          <ProductCard
            key={match.product.id}
            match={match}
            isAiMode={isAiMode}
            onOpenAuditModal={onOpenAuditModal}
          />
        ))}
      </div>
    </div>
  );
};
