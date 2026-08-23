'use client';

import React, { useState } from 'react';
import { X, ShieldCheck, Sparkles, CheckCircle2, XCircle, Scan, ExternalLink, FileText, ShoppingBag, ArrowRight } from 'lucide-react';
import { Product } from '@/types/product';
import { resolveSleeveLength, resolveHemline } from '@/utils/filterEngine';

interface AuditModalProps {
  product: Product | null;
  onClose: () => void;
  hasActiveFilters?: boolean;
  onOpenFilters?: () => void;
}

export const AuditModal: React.FC<AuditModalProps> = ({
  product,
  onClose,
  hasActiveFilters = true,
  onOpenFilters
}) => {
  const [imgSrc, setImgSrc] = useState<string>(product?.imageUrl || '');

  if (!product) return null;

  const { modestyAudit } = product;

  const handleImageError = () => {
    setImgSrc('https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80');
  };

  const displayPrice = typeof product.price === 'string' && product.price.startsWith('$')
    ? product.price
    : `$${product.price}`;

  const getStatusBadge = (condition: boolean, label: string, failNote: string, passNote: string) => {
    if (condition) {
      return (
        <div className="flex items-start gap-2 p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-xs">
          <XCircle className="w-4 h-4 text-rose-700 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-rose-900 block">{label}: FAILED</span>
            <span className="text-rose-800/80 text-[11px]">{failNote}</span>
          </div>
        </div>
      );
    }
    return (
      <div className="flex items-start gap-2 p-2.5 rounded-xl bg-[#F2EDE6] border border-[#B89A8E] text-xs">
        <CheckCircle2 className="w-4 h-4 text-[#8A6B5D] shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-[#4B3F38] block">{label}: PASSED</span>
          <span className="text-[#8A6B5D] text-[11px]">{passNote}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#4B3F38]/60 backdrop-blur-md animate-in fade-in duration-200">

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#FAF7F2] border border-[#D6CFCE] rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row text-[#4B3F38]">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white hover:bg-[#F2EDE6] text-[#4B3F38] border border-[#D6CFCE] transition-all shadow-sm cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* LEFT PANEL: Image + Vision Scanner Overlays */}
        <div className="lg:w-1/2 relative bg-[#F2EDE6] p-6 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-[#D6CFCE] overflow-hidden">

          {/* Scanner Header */}
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#D6CFCE] text-xs font-mono text-[#8A6B5D] shadow-sm">
            <Scan className="w-3.5 h-3.5 animate-spin text-[#8A6B5D]" />
            <span>AI Vision Bounding Scan</span>
          </div>

          {/* Garment Image Container */}
          <div className="relative aspect-[3/4] w-full max-w-sm rounded-2xl overflow-hidden border border-[#D6CFCE] shadow-md bg-white">
            <img
              src={imgSrc || product.imageUrl}
              alt={product.name}
              onError={handleImageError}
              className="h-full w-full object-cover object-center"
            />

            {/* Bounding Box Highlights Overlays */}
            {modestyAudit.boundingBoxes?.map((box) => {
              const isFail = box.type === 'fail';
              const isWarning = box.type === 'warning';
              const borderColor = isFail
                ? 'border-rose-500 bg-rose-500/10'
                : isWarning
                  ? 'border-amber-500 bg-amber-500/10'
                  : 'border-[#8A6B5D] bg-[#8A6B5D]/10';

              const badgeColor = isFail
                ? 'bg-rose-600 text-white font-bold'
                : isWarning
                  ? 'bg-amber-600 text-white font-bold'
                  : 'bg-[#8A6B5D] text-white font-bold';

              return (
                <div
                  key={box.id}
                  style={{
                    top: `${box.top}%`,
                    left: `${box.left}%`,
                    width: `${box.width}%`,
                    height: `${box.height}%`
                  }}
                  className={`absolute border-2 rounded-lg transition-all animate-pulse ${borderColor}`}
                >
                  <span className={`absolute -top-3 left-1 px-1.5 py-0.2 rounded text-[9px] uppercase tracking-wider ${badgeColor}`}>
                    {box.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Direct Retailer Purchase Button */}
          <div className="mt-4 w-full max-w-sm">
            <a
              href={product.originalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-[#8A6B5D] hover:bg-[#4B3F38] text-white font-extrabold text-sm transition-all shadow-md hover:scale-105 active:scale-95 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Buy Item at {product.brand} Store</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

        </div>

        {/* RIGHT PANEL: Audit Findings & Checklist */}
        <div className="lg:w-1/2 p-6 overflow-y-auto space-y-6 max-h-[85vh] lg:max-h-[90vh]">

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#8A6B5D]">
                {product.brand}
              </span>
              <span className="text-[#D6CFCE]">•</span>
              <span className="text-xs text-[#4B3F38]/70 capitalize">{product.category}</span>
            </div>

            <h2 className="text-xl font-bold text-[#4B3F38] mt-1">{product.name}</h2>
            <p className="text-sm font-semibold text-[#8A6B5D] mt-1">{displayPrice}</p>
          </div>

          {/* MODESTY MATCH SCORE CONTAINER (PROMPTS GUEST WHEN NO FILTERS ARE SET) */}
          {hasActiveFilters ? (
            <div className="p-4 rounded-2xl bg-[#F2EDE6] border border-[#D6CFCE] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#4B3F38] uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#8A6B5D]" />
                  Base AI Modesty Score
                </span>
                <span className="font-mono font-bold text-lg text-[#8A6B5D]">
                  {modestyAudit.modestyScore}/100
                </span>
              </div>

              <div className="w-full h-2.5 rounded-full bg-white overflow-hidden border border-[#D6CFCE]">
                <div
                  style={{ width: `${modestyAudit.modestyScore}%` }}
                  className={`h-full rounded-full transition-all duration-1000 ${modestyAudit.modestyScore >= 90
                    ? 'bg-[#8A6B5D]'
                    : modestyAudit.modestyScore >= 75
                      ? 'bg-[#B89A8E]'
                      : 'bg-rose-500'
                    }`}
                />
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-700" />
                  Personal Modesty Match Score
                </span>
                <span className="font-mono font-bold text-lg text-amber-800">
                  0 / 100
                </span>
              </div>

              <div className="w-full h-2.5 rounded-full bg-amber-200/60 overflow-hidden border border-amber-300">
                <div className="h-full rounded-full w-0 bg-amber-500" />
              </div>

              <div className="flex items-start gap-2 pt-1">
                <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-900 font-medium leading-relaxed">
                  No modesty requirements set yet. Set your coverage rules or session filters to calculate your personal match percentage.
                </p>
              </div>

              {onOpenFilters && (
                <button
                  onClick={onOpenFilters}
                  className="w-full py-2.5 px-4 bg-[#7A5C4D] hover:bg-[#684C3F] text-white rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-95 mt-2"
                >
                  <span>Set Your Modesty Preferences</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}

          <div className="space-y-3">
            {modestyAudit.retailerDescriptionText && (
              <div className="p-3.5 rounded-xl bg-white border border-[#D6CFCE]">
                <h4 className="text-xs font-semibold text-[#8A6B5D] flex items-center gap-1.5 mb-1">
                  <FileText className="w-3.5 h-3.5 text-[#8A6B5D]" /> Retailer Catalog Claim
                </h4>
                <p className="text-xs text-[#4B3F38] italic">
                  &quot;{modestyAudit.retailerDescriptionText}&quot;
                </p>
              </div>
            )}

            {modestyAudit.auditSummary && (
              <div className="p-3.5 rounded-xl bg-[#F2EDE6] border border-[#B89A8E]">
                <h4 className="text-xs font-semibold text-[#8A6B5D] flex items-center gap-1.5 mb-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#8A6B5D]" /> AI Computer Vision Finding
                </h4>
                <p className="text-xs text-[#4B3F38] leading-relaxed">
                  {modestyAudit.auditSummary}
                </p>
              </div>
            )}
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#8A6B5D] uppercase tracking-wider">
              7-Point Verified Modesty Audit
            </h4>

            {hasActiveFilters ? (
              <>
                {getStatusBadge(
                  modestyAudit.hasSlit,
                  '1. Leg Slits Test',
                  'AI detected open thigh/side leg slit',
                  'Zero thigh or side leg slits detected'
                )}

                {getStatusBadge(
                  modestyAudit.isOpenBack,
                  '2. Open Back / Cutout Test',
                  'AI detected exposed open back cutout',
                  'Full rear torso coverage verified'
                )}

                {getStatusBadge(
                  modestyAudit.isSheer,
                  '3. Fabric Opacity Test',
                  'AI detected sheer/transparent unlined fabric layer',
                  '100% opaque fabric density verified'
                )}

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-3 rounded-xl bg-white border border-[#D6CFCE]">
                    <span className="text-[#8A6B5D] block text-[10px] uppercase font-semibold">4. Neckline</span>
                    <span className="font-bold text-[#4B3F38] uppercase">{modestyAudit.neckline}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-[#D6CFCE]">
                    <span className="text-[#8A6B5D] block text-[10px] uppercase font-semibold">5. Sleeve Length</span>
                    <span className="font-bold text-[#4B3F38] capitalize">
                      {product ? resolveSleeveLength(product) : modestyAudit.sleeveLength}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-[#D6CFCE]">
                    <span className="text-[#8A6B5D] block text-[10px] uppercase font-semibold">6. Hemline</span>
                    <span className="font-bold text-[#4B3F38] capitalize">
                      {product ? resolveHemline(product) : modestyAudit.hemline}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-[#D6CFCE]">
                    <span className="text-[#8A6B5D] block text-[10px] uppercase font-semibold">7. Silhouette Fit</span>
                    <span className="font-bold text-[#4B3F38] capitalize">{modestyAudit.fit}</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="p-6 rounded-2xl border-2 border-dashed border-[#D6CFCE] bg-[#F2EDE6]/40 text-center space-y-3">
                <ShieldCheck className="w-8 h-8 text-[#8A6B5D]/60 mx-auto" />
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-[#4B3F38]">7-Point Audit Uncalculated</h4>
                  <p className="text-xs text-[#8A6B5D] max-w-sm mx-auto leading-relaxed">
                    Set your custom modesty rules or session filters to run the 7-Point AI Audit against your personal coverage preferences.
                  </p>
                </div>
                {onOpenFilters && (
                  <button
                    onClick={onOpenFilters}
                    className="px-5 py-2 bg-[#7A5C4D] hover:bg-[#684C3F] text-white rounded-full text-xs font-bold transition-all shadow-sm cursor-pointer inline-flex items-center gap-2"
                  >
                    <span>Configure Modesty Audit</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};
