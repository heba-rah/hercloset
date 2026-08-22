'use client';

import React, { useEffect, useState } from 'react';

// Detailed SVG Realistic Garment Vector Silhouette Renderer
const RealisticGarmentSvg: React.FC<{ type: 'trench' | 'abaya' | 'dress' | 'cardigan' | 'duster'; color: string; height: string }> = ({ type, color, height }) => {
  return (
    <div className={`relative ${height} w-36 drop-shadow-2xl shrink-0 transition-transform duration-500`}>
      {/* Wooden Hanger Hook */}
      <svg className="w-10 h-7 mx-auto block mb-[-2px]" viewBox="0 0 40 28" fill="none">
        <path d="M20 18 C15 14, 12 10, 16 5 C19 1, 24 2, 23 7 C22 10, 20 12, 20 18 Z" stroke="#C99E56" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M4 25 L20 18 L36 25 L32 27 L20 20 L8 27 Z" fill="#8A6B5D" stroke="#4B3F38" strokeWidth="1" />
      </svg>

      {/* Garment Silhouette with Folds & Tailoring Details */}
      <svg className="w-full h-[calc(100%-26px)] overflow-visible" viewBox="0 0 140 500" fill="none">
        <defs>
          <linearGradient id={`grad-${type}-${color.replace('#','')}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color} />
            <stop offset="50%" stopColor={color} />
            <stop offset="100%" stopColor="#140F0D" stopOpacity="0.6" />
          </linearGradient>
        </defs>

        {type === 'trench' && (
          <g>
            {/* Double-Breasted Trench Coat Body */}
            <path d="M40 0 L100 0 L125 70 L135 480 L5 480 L15 70 Z" fill={`url(#grad-${type}-${color.replace('#','')})`} />
            {/* Lapels */}
            <path d="M40 0 L70 60 L20 40 Z" fill="#FAF7F2" fillOpacity="0.2" />
            <path d="M100 0 L70 60 L120 40 Z" fill="#FAF7F2" fillOpacity="0.2" />
            {/* Belt */}
            <rect x="25" y="200" width="90" height="16" rx="3" fill="#140F0D" fillOpacity="0.5" />
            <rect x="62" y="196" width="16" height="24" rx="2" stroke="#E6C280" strokeWidth="2" fill="none" />
            {/* Buttons */}
            <circle cx="50" cy="110" r="4" fill="#E6C280" />
            <circle cx="90" cy="110" r="4" fill="#E6C280" />
            <circle cx="50" cy="160" r="4" fill="#E6C280" />
            <circle cx="90" cy="160" r="4" fill="#E6C280" />
            {/* Fabric Folds */}
            <path d="M35 230 Q45 350 20 480" stroke="#000" strokeOpacity="0.25" strokeWidth="3" />
            <path d="M105 230 Q95 350 120 480" stroke="#000" strokeOpacity="0.25" strokeWidth="3" />
          </g>
        )}

        {type === 'abaya' && (
          <g>
            {/* Flowing Full Maxi Abaya */}
            <path d="M45 0 L95 0 L130 90 L140 490 C100 500, 40 500, 0 490 L10 90 Z" fill={`url(#grad-${type}-${color.replace('#','')})`} />
            {/* Neckline Trim */}
            <path d="M45 0 Q70 25 95 0" stroke="#E6C280" strokeWidth="3" fill="none" />
            {/* Center Embroidery Placket */}
            <line x1="70" y1="0" x2="70" y2="490" stroke="#E6C280" strokeWidth="2" strokeDasharray="6 4" opacity="0.6" />
            {/* Flowing Drapes & Creases */}
            <path d="M30 100 Q50 300 20 490" stroke="#000" strokeOpacity="0.3" strokeWidth="4" />
            <path d="M110 100 Q90 300 120 490" stroke="#000" strokeOpacity="0.3" strokeWidth="4" />
            <path d="M70 150 Q75 320 65 490" stroke="#000" strokeOpacity="0.2" strokeWidth="3" />
          </g>
        )}

        {type === 'dress' && (
          <g>
            {/* High-Neck Pleated Maxi Dress */}
            <path d="M50 0 L90 0 L115 65 L135 470 C90 485, 50 485, 5 470 L25 65 Z" fill={`url(#grad-${type}-${color.replace('#','')})`} />
            {/* High Mock Neck */}
            <rect x="52" y="0" width="36" height="12" rx="2" fill={color} stroke="#000" strokeOpacity="0.2" />
            {/* Waist Seam */}
            <path d="M35 150 Q70 160 105 150" stroke="#000" strokeOpacity="0.3" strokeWidth="3" fill="none" />
            {/* Pleat Lines */}
            <line x1="45" y1="155" x2="30" y2="475" stroke="#000" strokeOpacity="0.2" strokeWidth="2" />
            <line x1="70" y1="160" x2="70" y2="480" stroke="#000" strokeOpacity="0.2" strokeWidth="2" />
            <line x1="95" y1="155" x2="110" y2="475" stroke="#000" strokeOpacity="0.2" strokeWidth="2" />
          </g>
        )}

        {type === 'cardigan' && (
          <g>
            {/* Long Ribbed Knit Cardigan */}
            <path d="M42 0 L98 0 L120 70 L128 440 L12 440 L20 70 Z" fill={`url(#grad-${type}-${color.replace('#','')})`} />
            {/* Open Front Placket */}
            <path d="M55 0 L55 440 M85 0 L85 440" stroke="#000" strokeOpacity="0.2" strokeWidth="2" />
            {/* Ribbed Texture Shadow Lines */}
            <line x1="30" y1="80" x2="30" y2="440" stroke="#FAF7F2" strokeOpacity="0.15" strokeWidth="2" />
            <line x1="110" y1="80" x2="110" y2="440" stroke="#FAF7F2" strokeOpacity="0.15" strokeWidth="2" />
          </g>
        )}

        {type === 'duster' && (
          <g>
            {/* Tailored Duster Overcoat */}
            <path d="M38 0 L102 0 L128 75 L138 495 L2 495 L12 75 Z" fill={`url(#grad-${type}-${color.replace('#','')})`} />
            {/* Wide Collar */}
            <path d="M38 0 L68 70 L10 50 Z" fill="#000" fillOpacity="0.2" />
            <path d="M102 0 L72 70 L130 50 Z" fill="#000" fillOpacity="0.2" />
            {/* Deep Pockets */}
            <rect x="20" y="240" width="30" height="35" rx="3" fill="#000" fillOpacity="0.15" />
            <rect x="90" y="240" width="30" height="35" rx="3" fill="#000" fillOpacity="0.15" />
            {/* Draping Fold Shadow */}
            <path d="M70 70 Q65 280 70 495" stroke="#000" strokeOpacity="0.3" strokeWidth="3" />
          </g>
        )}
      </svg>
    </div>
  );
};

export const PartingClothesReveal: React.FC = () => {
  const [isParted, setIsParted] = useState<boolean>(false);
  const [isDone, setIsDone] = useState<boolean>(false);

  useEffect(() => {
    // 1. Initial 700ms pause so the dense wardrobe rack texture is clearly visible
    const timer1 = setTimeout(() => {
      setIsParted(true);
    }, 700);

    // 2. Unmount overlay after 2.9s (700ms pause + 2.2s slide)
    const timer2 = setTimeout(() => {
      setIsDone(true);
    }, 3000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  if (isDone) return null;

  // High-Fashion Editorial Colors: Espresso (#241B18), Camel (#A67C52), Olive (#424637), Burgundy (#4A2129), Ivory (#D8CEBE), Slate (#2D3136)
  const leftClusterItems: { type: 'trench' | 'abaya' | 'dress' | 'cardigan' | 'duster'; color: string; height: string; offset: string }[] = [
    { type: 'trench', color: '#A67C52', height: 'h-[560px]', offset: 'ml-0' },
    { type: 'abaya', color: '#241B18', height: 'h-[600px]', offset: '-ml-12' },
    { type: 'dress', color: '#4A2129', height: 'h-[540px]', offset: '-ml-10' },
    { type: 'duster', color: '#424637', height: 'h-[580px]', offset: '-ml-12' },
    { type: 'cardigan', color: '#D8CEBE', height: 'h-[490px]', offset: '-ml-10' },
    { type: 'trench', color: '#2D3136', height: 'h-[570px]', offset: '-ml-12' },
    { type: 'abaya', color: '#241B18', height: 'h-[610px]', offset: '-ml-12' },
    { type: 'dress', color: '#A67C52', height: 'h-[530px]', offset: '-ml-10' },
    { type: 'duster', color: '#4A2129', height: 'h-[590px]', offset: '-ml-12' },
    { type: 'cardigan', color: '#424637', height: 'h-[500px]', offset: '-ml-10' },
  ];

  const rightClusterItems: { type: 'trench' | 'abaya' | 'dress' | 'cardigan' | 'duster'; color: string; height: string; offset: string }[] = [
    { type: 'cardigan', color: '#D8CEBE', height: 'h-[500px]', offset: 'mr-0' },
    { type: 'duster', color: '#424637', height: 'h-[590px]', offset: '-mr-10' },
    { type: 'dress', color: '#A67C52', height: 'h-[530px]', offset: '-mr-12' },
    { type: 'abaya', color: '#241B18', height: 'h-[610px]', offset: '-mr-12' },
    { type: 'trench', color: '#2D3136', height: 'h-[570px]', offset: '-mr-10' },
    { type: 'cardigan', color: '#4A2129', height: 'h-[490px]', offset: '-mr-12' },
    { type: 'duster', color: '#424637', height: 'h-[580px]', offset: '-mr-10' },
    { type: 'dress', color: '#D8CEBE', height: 'h-[540px]', offset: '-mr-12' },
    { type: 'abaya', color: '#241B18', height: 'h-[600px]', offset: '-mr-12' },
    { type: 'trench', color: '#A67C52', height: 'h-[560px]', offset: '-mr-10' },
  ];

  return (
    <div className={`fixed inset-0 z-40 pointer-events-none overflow-hidden font-sans transition-opacity duration-700 ${
      isParted ? 'opacity-90' : 'opacity-100'
    }`}>
      
      {/* 
        NO TOP POLE OR RAIL — GARMENTS HANG FREELY FROM THE TOP OF THE VIEWPORT
      */}

      {/* 
        LEFT CLUSTER (10 HIGH-FIDELITY LAYERED GARMENTS CONCEALED AT CENTER)
      */}
      <div
        className={`absolute top-0 left-0 w-1/2 h-full flex items-start justify-end pr-1 transition-all duration-[2200ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isParted
            ? '-translate-x-[120%] rotate-[-3deg]'
            : 'translate-x-0 rotate-0'
        }`}
      >
        <div className="flex items-start pt-1">
          {leftClusterItems.map((item, idx) => (
            <div
              key={idx}
              className={`${item.offset} shrink-0`}
              style={{ zIndex: idx + 1 }}
            >
              <RealisticGarmentSvg type={item.type} color={item.color} height={item.height} />
            </div>
          ))}
        </div>
      </div>

      {/* 
        RIGHT CLUSTER (10 HIGH-FIDELITY LAYERED GARMENTS CONCEALED AT CENTER)
      */}
      <div
        className={`absolute top-0 right-0 w-1/2 h-full flex items-start justify-start pl-1 transition-all duration-[2200ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isParted
            ? 'translate-x-[120%] rotate-[3deg]'
            : 'translate-x-0 rotate-0'
        }`}
      >
        <div className="flex items-start pt-1">
          {rightClusterItems.map((item, idx) => (
            <div
              key={idx}
              className={`${item.offset} shrink-0`}
              style={{ zIndex: rightClusterItems.length - idx }}
            >
              <RealisticGarmentSvg type={item.type} color={item.color} height={item.height} />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
