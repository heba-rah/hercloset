'use client';

import React, { useState } from 'react';

interface HamperButtonProps {
  itemCount: number;
  onClick: () => void;
  isHidden?: boolean;
}

export const HamperButton: React.FC<HamperButtonProps> = ({ itemCount, onClick, isHidden }) => {
  const [imgError, setImgError] = useState<boolean>(false);

  return (
    <div className={`fixed bottom-6 right-6 z-30 group cursor-pointer transition-all duration-300 ${
      isHidden ? 'opacity-0 pointer-events-none' : 'opacity-100'
    }`}>
      {/* Tooltip on Hover */}
      <div className="absolute -top-9 right-0 whitespace-nowrap pointer-events-none text-xs font-bold bg-[#3D312A] text-[#FAF7F2] px-3 py-1 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-1 group-hover:translate-y-0">
        Open My Modest Hamper
      </div>

      {/* Main Woven Hamper Icon Button */}
      <button
        onClick={onClick}
        aria-label="Open Modest Hamper"
        className="relative p-3.5 rounded-full bg-[#FAF7F2] border-2 border-[#8A6B5D] shadow-xl hover:bg-[#F2EDE6] transition-all duration-200 hover:scale-110 active:scale-95 flex items-center justify-center"
      >
        {!imgError ? (
          <img
            src="/hamper.png"
            alt="Modest Laundry Hamper"
            onError={() => setImgError(true)}
            className="w-8 h-8 object-contain"
          />
        ) : (
          /* SVG Wicker Laundry Hamper Graphic Fallback */
          <svg className="w-8 h-8 stroke-[#8A6B5D] fill-none stroke-[1.8]" viewBox="0 0 48 48">
            {/* Woven Hamper Basket Body */}
            <path d="M 10 16 L 13 40 C 13 42, 15 44, 18 44 L 30 44 C 33 44, 35 42, 35 40 L 38 16 Z" fill="#F2EDE6" stroke="#8A6B5D" />
            
            {/* Hamper Lid */}
            <path d="M 8 16 L 40 16 A 2 2 0 0 0 40 12 L 8 12 A 2 2 0 0 0 8 16 Z" fill="#8A6B5D" stroke="#8A6B5D" />
            <path d="M 21 12 C 21 9, 27 9, 27 12" stroke="#8A6B5D" />

            {/* Wicker Weave Texture Lines */}
            <line x1="12" y1="23" x2="36" y2="23" stroke="#B89A8E" strokeDasharray="3 2" />
            <line x1="13" y1="30" x2="35" y2="30" stroke="#B89A8E" strokeDasharray="3 2" />
            <line x1="14" y1="37" x2="34" y2="37" stroke="#B89A8E" strokeDasharray="3 2" />
            
            <line x1="20" y1="16" x2="18" y2="44" stroke="#B89A8E" />
            <line x1="28" y1="16" x2="30" y2="44" stroke="#B89A8E" />
          </svg>
        )}

        {/* Item Counter Notification Bubble */}
        <span className="absolute -top-1 -right-1 bg-[#8A6B5D] text-[#FAF7F2] text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-md border-2 border-[#F2EDE6]">
          {itemCount}
        </span>
      </button>
    </div>
  );
};
