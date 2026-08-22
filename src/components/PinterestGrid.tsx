'use client';

import React from 'react';
import { CalculatedMatch, Product } from '@/types/product';
import { PinterestCard } from './PinterestCard';
import { AlertCircle } from 'lucide-react';

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
      <div className="p-12 text-center bg-[#FAF7F2] border border-[#D6CFCE] rounded-3xl space-y-4 my-8 max-w-xl mx-auto text-[#4B3F38]">
        <div className="mx-auto w-12 h-12 rounded-full bg-[#F2EDE6] border border-[#B89A8E] flex items-center justify-center text-[#8A6B5D]">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-[#4B3F38]">No Matching Garments Found</h3>
        <p className="text-sm text-[#8A6B5D]">
          Try relaxing your modesty constraints or selecting a different occasion tab above.
        </p>
      </div>
    );
  }

  return (
    <div className="my-2 w-full">
      {/* TRUE CSS MULTI-COLUMN MASONRY CONTAINER */}
      <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 xl:columns-6 gap-4 space-y-4 w-full">
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
