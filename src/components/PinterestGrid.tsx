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
      <div className="p-12 text-center bg-[#FAF7F2] dark:bg-[#241E1B] border border-[#D6CFCE] dark:border-[#443732] rounded-3xl space-y-4 my-8 max-w-xl mx-auto text-[#4B3F38] dark:text-[#F2EDE6]">
        <div className="mx-auto w-12 h-12 rounded-full bg-[#F2EDE6] dark:bg-[#181412] border border-[#B89A8E] flex items-center justify-center text-[#8A6B5D]">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-[#4B3F38] dark:text-[#F2EDE6]">No Matching Garments Found</h3>
        <p className="text-sm text-[#8A6B5D] dark:text-[#C4A497]">
          Try relaxing your modesty constraints or selecting a different occasion tab above.
        </p>
      </div>
    );
  }

  return (
    <div className="my-6">
      {/* Grid Header */}
      <div className="flex items-center justify-between mb-4 px-1">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#8A6B5D] dark:text-[#C4A497] flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#8A6B5D] dark:text-[#C4A497]" />
          <span>Pinterest Modesty Feed ({matches.length} curated apparel matches)</span>
        </h3>
        <span className="text-xs text-[#8A6B5D] dark:text-[#C4A497] font-mono">Edge-to-Edge 6-Column Feed</span>
      </div>

      {/* FULL-WIDTH EDGE-TO-EDGE PINTEREST MASONRY COLUMNS LAYOUT */}
      <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 xl:columns-6 gap-4">
        {matches.map((match, idx) => (
          <PinterestCard
            key={match.product.id}
            match={match}
            isAiMode={isAiMode}
            onOpenAuditModal={onOpenAuditModal}
            onAddToHamper={onAddToHamper}
            isInHamper={hamperProductIds.includes(match.product.id)}
            cardIndex={idx}
          />
        ))}
      </div>
    </div>
  );
};
