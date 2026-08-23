'use client';

import React from 'react';
import { X, Printer, CheckCircle2, ShoppingBag, ExternalLink, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';
import { Product } from '@/types/product';

interface ReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: Product[];
  userName?: string;
  onClearHamper?: () => void;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({
  isOpen,
  onClose,
  items,
  userName = 'Guest Shopper',
  onClearHamper
}) => {
  if (!isOpen) return null;

  const parsePrice = (price: string | number): number => {
    if (typeof price === 'number') return price;
    return parseFloat(String(price).replace(/[^0-9.]/g, '')) || 0;
  };

  const subtotal = items.reduce((acc, p) => acc + parsePrice(p.price), 0);
  const estimatedTax = subtotal * 0.13; // 13% tax estimate
  const grandTotal = subtotal + estimatedTax;

  const receiptId = `HC-${Math.floor(100000 + Math.random() * 900000)}`;
  const currentDate = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const handlePrint = () => {
    window.print();
  };

  const handleFinish = () => {
    if (onClearHamper) onClearHamper();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#4B3F38]/70 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-lg max-h-[92vh] flex flex-col items-center">

        {/* Floating Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 p-2.5 rounded-full bg-white text-[#4B3F38] hover:bg-[#FAF7F2] border border-[#D6CFCE] shadow-lg transition-all cursor-pointer z-20"
          title="Close Receipt"
        >
          <X className="w-5 h-5" />
        </button>

        {/* THERMAL PAPER RECEIPT CARD */}
        <div className="w-full bg-[#FCFBF9] text-[#2B231F] font-mono shadow-2xl rounded-2xl border border-[#D6CFCE] overflow-hidden flex flex-col max-h-[85vh]">

          {/* Top Decorative Receipt Header */}
          <div className="p-6 text-center border-b-2 border-dashed border-[#D6CFCE] bg-[#FAF7F2] space-y-2 relative">
            
            {/* Stamp Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-[10px] font-sans font-bold uppercase tracking-wider mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>100% Verified Modest Order</span>
            </div>

            <h2 className="font-serif italic font-bold text-2xl text-[#3D312A] tracking-tight">
              her closet
            </h2>
            <p className="text-[11px] font-sans font-semibold text-[#8A6B5D] uppercase tracking-widest">
              Curated Shopping Receipt
            </p>

            <div className="pt-2 text-[10px] text-[#7A5C4D] space-y-0.5 font-mono">
              <p>REF NO: {receiptId}</p>
              <p>DATE: {currentDate}</p>
              <p>SHOPPER: {userName}</p>
            </div>
          </div>

          {/* Receipt Scrollable Itemized List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 text-xs">

            <div className="flex justify-between font-bold text-[10px] uppercase text-[#8A6B5D] border-b border-[#E8E2D9] pb-1 font-sans">
              <span>Item Description</span>
              <span>Price</span>
            </div>

            {items.length === 0 ? (
              <p className="text-center py-6 text-[#8A6B5D] italic">No items in your closet hamper.</p>
            ) : (
              items.map((prod, index) => {
                const itemP = parsePrice(prod.price);
                return (
                  <div key={`${prod.id}-${index}`} className="space-y-1 pb-3 border-b border-dashed border-[#E8E2D9] last:border-none">
                    <div className="flex items-start justify-between gap-3 font-semibold">
                      <div className="min-w-0 flex-1">
                        <span className="text-[9px] font-sans font-bold text-[#8A6B5D] uppercase tracking-wider block">
                          [{prod.brand}]
                        </span>
                        <p className="font-sans font-bold text-[#3D312A] truncate">{prod.name}</p>
                        <p className="text-[10px] font-sans text-emerald-700 font-medium flex items-center gap-1 mt-0.5">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600 inline" /> Verified Modest Fit
                        </p>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="font-mono font-bold text-[#3D312A]">${itemP.toFixed(2)}</span>
                        <a
                          href={prod.originalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1 block text-[10px] font-sans font-extrabold text-[#8A6B5D] hover:text-[#4B3F38] underline flex items-center justify-end gap-0.5"
                        >
                          <span>Store Link</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })
            )}

            {/* Calculations Breakdown */}
            <div className="pt-2 space-y-1.5 border-t-2 border-dashed border-[#D6CFCE] font-mono">
              <div className="flex justify-between text-[#6E5D53]">
                <span>SUBTOTAL ({items.length} items):</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#6E5D53]">
                <span>ESTIMATED TAX (13% HST):</span>
                <span>${estimatedTax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#6E5D53]">
                <span>SHIPPING & HANDLING:</span>
                <span className="text-emerald-700 font-bold">FREE (RETAILER DIRECT)</span>
              </div>

              <div className="flex justify-between font-bold text-sm text-[#2B231F] pt-2 border-t border-[#D6CFCE]">
                <span>TOTAL ESTIMATED COST:</span>
                <span className="text-[#7A5C4D]">${grandTotal.toFixed(2)} CAD</span>
              </div>
            </div>

            {/* Barcode Visual */}
            <div className="pt-4 text-center space-y-1.5 border-t border-dashed border-[#D6CFCE]">
              <div className="h-10 w-full bg-[repeating-linear-gradient(90deg,#3D312A_0,#3D312A_2px,transparent_2px,transparent_4px,#3D312A_4px,#3D312A_7px,transparent_7px,transparent_9px)] opacity-80 rounded" />
              <p className="text-[10px] text-[#8A6B5D] font-mono tracking-widest">
                *{receiptId}-MODESTY-VERIFIED*
              </p>
            </div>

          </div>

          {/* Receipt Actions Footer */}
          <div className="p-4 bg-[#FAF7F2] border-t border-[#D6CFCE] flex flex-col sm:flex-row gap-2.5 font-sans">
            <button
              onClick={handlePrint}
              className="flex-1 py-2.5 px-3 rounded-xl bg-white border border-[#D6CFCE] text-xs font-bold text-[#3D312A] hover:bg-[#EAE4DC] transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Printer className="w-4 h-4 text-[#8A6B5D]" />
              <span>Print / Save Receipt</span>
            </button>

            <button
              onClick={handleFinish}
              className="flex-1 py-2.5 px-3 rounded-xl bg-[#7A5C4D] hover:bg-[#684C3F] text-white text-xs font-extrabold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
            >
              <span>Complete & Clear</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
