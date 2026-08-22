'use client';

import React, { useEffect, useState } from 'react';

// Detailed SVG Realistic Garment Vector Silhouette Renderer
const RealisticGarmentSvg: React.FC<{ type: 'trench' | 'abaya' | 'dress' | 'cardigan' | 'duster'; color: string; height: string; width: string }> = ({ type, color, height, width }) => {
  return (
    <div className={`relative ${height} ${width} drop-shadow-2xl shrink-0 transition-transform duration-500`}>
      {/* Wooden Hanger Hook */}
      <svg className="w-12 h-8 mx-auto block mb-[-2px]" viewBox="0 0 40 28" fill="none">
        <path d="M20 18 C15 14, 12 10, 16 5 C19 1, 24 2, 23 7 C22 10, 20 12, 20 18 Z" stroke="#C99E56" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M4 25 L20 18 L36 25 L32 27 L20 20 L8 27 Z" fill="#8A6B5D" stroke="#4B3F38" strokeWidth="1" />
      </svg>

      {/* Garment Silhouette with Folds & Tailoring Details */}
      <svg className="w-full h-[calc(100%-26px)] overflow-visible" viewBox="0 0 140 600" fill="none">
        <defs>
          <linearGradient id={`grad-${type}-${color.replace('#','')}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color} />
            <stop offset="60%" stopColor={color} />
            <stop offset="100%" stopColor="#140F0D" stopOpacity="0.75" />
          </linearGradient>
        </defs>

        {type === 'trench' && (
          <g>
            <path d="M40 0 L100 0 L128 75 L138 580 L2 580 L12 75 Z" fill={`url(#grad-${type}-${color.replace('#','')})`} />
            <path d="M40 0 L70 70 L20 45 Z" fill="#FAF7F2" fillOpacity="0.25" />
            <path d="M100 0 L70 70 L120 45 Z" fill="#FAF7F2" fillOpacity="0.25" />
            <rect x="22" y="240" width="96" height="18" rx="3" fill="#140F0D" fillOpacity="0.6" />
            <rect x="62" y="235" width="16" height="28" rx="2" stroke="#E6C280" strokeWidth="2" fill="none" />
            <circle cx="48" cy="130" r="4.5" fill="#E6C280" />
            <circle cx="92" cy="130" r="4.5" fill="#E6C280" />
            <circle cx="48" cy="190" r="4.5" fill="#E6C280" />
            <circle cx="92" cy="190" r="4.5" fill="#E6C280" />
            <path d="M35 270 Q45 420 20 580" stroke="#000" strokeOpacity="0.3" strokeWidth="4" />
            <path d="M105 270 Q95 420 120 580" stroke="#000" strokeOpacity="0.3" strokeWidth="4" />
          </g>
        )}

        {type === 'abaya' && (
          <g>
            <path d="M45 0 L95 0 L132 95 L140 590 C100 605, 40 605, 0 590 L8 95 Z" fill={`url(#grad-${type}-${color.replace('#','')})`} />
            <path d="M45 0 Q70 28 95 0" stroke="#E6C280" strokeWidth="3.5" fill="none" />
            <line x1="70" y1="0" x2="70" y2="590" stroke="#E6C280" strokeWidth="2.5" strokeDasharray="6 4" opacity="0.7" />
            <path d="M28 110 Q50 360 18 590" stroke="#000" strokeOpacity="0.35" strokeWidth="5" />
            <path d="M112 110 Q90 360 122 590" stroke="#000" strokeOpacity="0.35" strokeWidth="5" />
            <path d="M70 170 Q75 380 65 590" stroke="#000" strokeOpacity="0.25" strokeWidth="4" />
          </g>
        )}

        {type === 'dress' && (
          <g>
            <path d="M48 0 L92 0 L118 70 L138 570 C90 585, 50 585, 2 570 L22 70 Z" fill={`url(#grad-${type}-${color.replace('#','')})`} />
            <rect x="50" y="0" width="40" height="14" rx="2" fill={color} stroke="#000" strokeOpacity="0.25" />
            <path d="M32 170 Q70 180 108 170" stroke="#000" strokeOpacity="0.35" strokeWidth="4" fill="none" />
            <line x1="42" y1="175" x2="25" y2="575" stroke="#000" strokeOpacity="0.25" strokeWidth="2.5" />
            <line x1="70" y1="180" x2="70" y2="580" stroke="#000" strokeOpacity="0.25" strokeWidth="2.5" />
            <line x1="98" y1="175" x2="115" y2="575" stroke="#000" strokeOpacity="0.25" strokeWidth="2.5" />
          </g>
        )}

        {type === 'cardigan' && (
          <g>
            <path d="M40 0 L100 0 L124 75 L132 540 L8 540 L16 75 Z" fill={`url(#grad-${type}-${color.replace('#','')})`} />
            <path d="M54 0 L54 540 M86 0 L86 540" stroke="#000" strokeOpacity="0.25" strokeWidth="2.5" />
            <line x1="28" y1="90" x2="28" y2="540" stroke="#FAF7F2" strokeOpacity="0.18" strokeWidth="2.5" />
            <line x1="112" y1="90" x2="112" y2="540" stroke="#FAF7F2" strokeOpacity="0.18" strokeWidth="2.5" />
          </g>
        )}

        {type === 'duster' && (
          <g>
            <path d="M36 0 L104 0 L130 80 L140 595 L0 595 L10 80 Z" fill={`url(#grad-${type}-${color.replace('#','')})`} />
            <path d="M36 0 L68 80 L8 55 Z" fill="#000" fillOpacity="0.25" />
            <path d="M104 0 L72 80 L132 55 Z" fill="#000" fillOpacity="0.25" />
            <rect x="18" y="280" width="34" height="40" rx="3" fill="#000" fillOpacity="0.2" />
            <rect x="88" y="280" width="34" height="40" rx="3" fill="#000" fillOpacity="0.2" />
            <path d="M70 80 Q65 340 70 595" stroke="#000" strokeOpacity="0.35" strokeWidth="4" />
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
    // 1. Initial 700ms pause so dense wardrobe rack is clearly registered
    const timer1 = setTimeout(() => {
      setIsParted(true);
    }, 700);

    // 2. Unmount overlay completely after animation finishes (2.8s) so no pointer-events block clicks
    const timer2 = setTimeout(() => {
      setIsDone(true);
    }, 2900);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  if (isDone) return null;

  // High-Fashion Editorial Colors: Espresso (#241B18), Camel (#A67C52), Olive (#424637), Burgundy (#4A2129), Ivory (#D8CEBE), Slate (#2D3136)
  // ORGANIC DENSE OVERLAPPING GARMENTS (Extended h-[720px] and h-[660px] to conceal "hercloset" text completely)
  const leftClusterItems: { type: 'trench' | 'abaya' | 'dress' | 'cardigan' | 'duster'; color: string; height: string; width: string; offset: string; vOffset: string }[] = [
    { type: 'trench', color: '#A67C52', height: 'h-[680px]', width: 'w-44', offset: 'ml-0', vOffset: 'pt-0' },
    { type: 'abaya', color: '#241B18', height: 'h-[740px]', width: 'w-48', offset: '-ml-16', vOffset: 'pt-4' },
    { type: 'dress', color: '#4A2129', height: 'h-[660px]', width: 'w-40', offset: '-ml-14', vOffset: 'pt-1' },
    { type: 'duster', color: '#424637', height: 'h-[720px]', width: 'w-44', offset: '-ml-16', vOffset: 'pt-5' },
    { type: 'cardigan', color: '#D8CEBE', height: 'h-[620px]', width: 'w-40', offset: '-ml-14', vOffset: 'pt-2' },
    { type: 'trench', color: '#2D3136', height: 'h-[700px]', width: 'w-44', offset: '-ml-16', vOffset: 'pt-0' },
    { type: 'abaya', color: '#241B18', height: 'h-[750px]', width: 'w-48', offset: '-ml-16', vOffset: 'pt-6' },
    { type: 'dress', color: '#A67C52', height: 'h-[650px]', width: 'w-40', offset: '-ml-14', vOffset: 'pt-3' },
    { type: 'duster', color: '#4A2129', height: 'h-[710px]', width: 'w-44', offset: '-ml-16', vOffset: 'pt-1' },
    { type: 'cardigan', color: '#424637', height: 'h-[630px]', width: 'w-40', offset: '-ml-14', vOffset: 'pt-4' },
  ];

  const rightClusterItems: { type: 'trench' | 'abaya' | 'dress' | 'cardigan' | 'duster'; color: string; height: string; width: string; offset: string; vOffset: string }[] = [
    { type: 'cardigan', color: '#D8CEBE', height: 'h-[630px]', width: 'w-40', offset: 'mr-0', vOffset: 'pt-4' },
    { type: 'duster', color: '#424637', height: 'h-[710px]', width: 'w-44', offset: '-mr-14', vOffset: 'pt-1' },
    { type: 'dress', color: '#A67C52', height: 'h-[650px]', width: 'w-40', offset: '-mr-14', vOffset: 'pt-3' },
    { type: 'abaya', color: '#241B18', height: 'h-[750px]', width: 'w-48', offset: '-mr-16', vOffset: 'pt-6' },
    { type: 'trench', color: '#2D3136', height: 'h-[700px]', width: 'w-44', offset: '-mr-16', vOffset: 'pt-0' },
    { type: 'cardigan', color: '#4A2129', height: 'h-[620px]', width: 'w-40', offset: '-mr-14', vOffset: 'pt-2' },
    { type: 'duster', color: '#424637', height: 'h-[720px]', width: 'w-44', offset: '-mr-16', vOffset: 'pt-5' },
    { type: 'dress', color: '#D8CEBE', height: 'h-[660px]', width: 'w-40', offset: '-mr-14', vOffset: 'pt-1' },
    { type: 'abaya', color: '#241B18', height: 'h-[740px]', width: 'w-48', offset: '-mr-16', vOffset: 'pt-4' },
    { type: 'trench', color: '#A67C52', height: 'h-[680px]', width: 'w-44', offset: '-mr-14', vOffset: 'pt-0' },
  ];

  return (
    <div className={`fixed inset-0 z-40 pointer-events-none overflow-hidden font-sans transition-opacity duration-700 ${
      isParted ? 'opacity-90' : 'opacity-100'
    }`}>
      
      {/* 
        NO TOP POLE OR RAIL — GARMENTS HANG FREELY FROM TOP OF VIEWPORT DOWN PAST CENTER (h-screen coverage)
      */}

      {/* 
        LEFT CLUSTER (10 ORGANIC HIGH-FIDELITY LAYERED GARMENTS COVERING CENTER)
      */}
      <div
        className={`absolute top-0 left-0 w-1/2 h-full flex items-start justify-end pr-1 transition-all duration-[2200ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isParted
            ? '-translate-x-[125%] rotate-[-3deg]'
            : 'translate-x-0 rotate-0'
        }`}
      >
        <div className="flex items-start">
          {leftClusterItems.map((item, idx) => (
            <div
              key={idx}
              className={`${item.offset} ${item.vOffset} shrink-0`}
              style={{ zIndex: idx + 1 }}
            >
              <RealisticGarmentSvg type={item.type} color={item.color} height={item.height} width={item.width} />
            </div>
          ))}
        </div>
      </div>

      {/* 
        RIGHT CLUSTER (10 ORGANIC HIGH-FIDELITY LAYERED GARMENTS COVERING CENTER)
      */}
      <div
        className={`absolute top-0 right-0 w-1/2 h-full flex items-start justify-start pl-1 transition-all duration-[2200ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isParted
            ? 'translate-x-[125%] rotate-[3deg]'
            : 'translate-x-0 rotate-0'
        }`}
      >
        <div className="flex items-start">
          {rightClusterItems.map((item, idx) => (
            <div
              key={idx}
              className={`${item.offset} ${item.vOffset} shrink-0`}
              style={{ zIndex: rightClusterItems.length - idx }}
            >
              <RealisticGarmentSvg type={item.type} color={item.color} height={item.height} width={item.width} />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
