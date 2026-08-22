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
      <div className="p-12 text-center bg-[#FAF7F2] dark:bg-[#241E1B] border border-[#D6CFCE] dark:border-[#443732] rounded-3xl space-y-4 text-[#4B3F38] dark:text-[#F2EDE6]">
        <div className="mx-auto w-12 h-12 rounded-2xl bg-[#F2EDE6] dark:bg-[#181412] border border-[#B89A8E] flex items-center justify-center text-[#8A6B5D]">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-[#4B3F38] dark:text-[#F2EDE6]">No Matching Garments Found</h3>
        <p className="text-sm text-[#8A6B5D] dark:text-[#C4A497] max-w-md mx-auto">
          Try relaxing your modesty constraints or clearing search filters to see more results.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Results Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold uppercase tracking-wider text-[#8A6B5D] dark:text-[#C4A497] flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#8A6B5D] dark:text-[#C4A497]" />
          <span>Garment Catalog ({matches.length})</span>
        </h2>
        <span className="text-xs text-[#8A6B5D] dark:text-[#C4A497] font-mono">
          Sorted by {isAiMode ? 'AI Modesty Match %' : 'Keyword relevance'}
        </span>
      </div>

      {/* True Multi-Column Masonry Layout */}
      <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-4">
        {matches.map((match, idx) => (
          <ProductCard
            key={match.product.id}
            match={match}
            isAiMode={isAiMode}
            onOpenAuditModal={onOpenAuditModal}
            cardIndex={idx}
          />
        ))}
      </div>
    </div>
  );
};
