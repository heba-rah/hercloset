'use client';

import React from 'react';
import { X, ShoppingBag, ExternalLink, Trash2 } from 'lucide-react';
import { Product } from '@/types/product';

interface HamperDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  hamperItems: Product[];
  onRemoveFromHamper: (productId: string) => void;
  onClearHamper: () => void;
}

export const HamperDrawer: React.FC<HamperDrawerProps> = ({
  isOpen,
  onClose,
  hamperItems,
  onRemoveFromHamper,
  onClearHamper
}) => {
  if (!isOpen) return null;

  const parsePrice = (price: string | number): number => {
    if (typeof price === 'number') return price;
    return parseFloat(price.replace(/[^0-9.]/g, '')) || 0;
  };

  const totalPrice = hamperItems.reduce((acc, p) => acc + parsePrice(p.price), 0);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-[#4B3F38]/60 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Drawer Container */}
      <div className="relative w-full max-w-md h-full bg-[#FAF7F2] border-l border-[#D6CFCE] shadow-2xl flex flex-col justify-between text-[#4B3F38]">
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#D6CFCE] flex items-center justify-between bg-[#F2EDE6]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-white border border-[#B89A8E] text-[#8A6B5D]">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-[#4B3F38] flex items-center gap-2">
                <span>My Closet Hamper</span>
                <span className="px-2 py-0.5 rounded-full bg-[#8A6B5D] text-white text-xs">
                  {hamperItems.length}
                </span>
              </h3>
              <p className="text-xs text-[#8A6B5D]">Saved items fitting your modesty profile</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white text-[#4B3F38] hover:bg-[#FAF7F2] border border-[#D6CFCE]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Item List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {hamperItems.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="mx-auto w-12 h-12 rounded-2xl bg-[#F2EDE6] border border-[#D6CFCE] flex items-center justify-center text-[#8A6B5D]">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-[#4B3F38]">Your Hamper is Empty</p>
              <p className="text-xs text-[#8A6B5D] max-w-xs mx-auto">
                Click &quot;add to hamper&quot; on any garment card to save it to your shopping hamper.
              </p>
            </div>
          ) : (
            hamperItems.map((prod) => (
              <div
                key={prod.id}
                className="p-3.5 rounded-2xl bg-white border border-[#D6CFCE] flex items-center gap-3 shadow-sm hover:border-[#B89A8E] transition-all"
              >
                <img
                  src={prod.imageUrl}
                  alt={prod.name}
                  className="w-16 h-20 object-cover rounded-xl border border-[#D6CFCE] shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold text-[#8A6B5D] uppercase tracking-wider block">
                    {prod.brand}
                  </span>
                  <h4 className="text-xs font-semibold text-[#4B3F38] truncate">{prod.name}</h4>
                  <p className="text-xs font-bold text-[#8A6B5D] mt-0.5">
                    {typeof prod.price === 'string' && prod.price.startsWith('$') ? prod.price : `$${prod.price}`}
                  </p>

                  <div className="flex items-center gap-2 mt-2">
                    <a
                      href={prod.originalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 rounded-lg bg-[#8A6B5D] hover:bg-[#4B3F38] text-white font-extrabold text-[10px] flex items-center gap-1 shadow-sm transition-all"
                    >
                      <span>Buy at {prod.brand}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <button
                  onClick={() => onRemoveFromHamper(prod.id)}
                  className="p-2 text-[#8A6B5D] hover:text-rose-600 transition-colors"
                  title="Remove from Hamper"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        {hamperItems.length > 0 && (
          <div className="p-5 bg-[#F2EDE6] border-t border-[#D6CFCE] space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#4B3F38] font-semibold">Total Estimated Value:</span>
              <span className="font-extrabold text-base text-[#8A6B5D]">${totalPrice.toFixed(2)} CAD</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onClearHamper}
                className="px-3 py-2.5 rounded-xl bg-white text-[#4B3F38] hover:text-rose-700 border border-[#D6CFCE] text-xs font-semibold"
              >
                Clear
              </button>

              <button
                onClick={onClose}
                className="flex-1 py-2.5 rounded-xl bg-[#8A6B5D] hover:bg-[#4B3F38] text-white font-bold text-xs text-center transition-all shadow-sm"
              >
                Continue Browsing
              </button>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
