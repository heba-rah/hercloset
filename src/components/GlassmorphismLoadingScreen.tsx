'use client';

import React, { useEffect, useState } from 'react';

interface GlassmorphismLoadingScreenProps {
  isLoading: boolean;
}

export const GlassmorphismLoadingScreen: React.FC<GlassmorphismLoadingScreenProps> = ({ isLoading }) => {
  const [shouldRender, setShouldRender] = useState<boolean>(isLoading);

  useEffect(() => {
    if (isLoading) {
      setShouldRender(true);
    } else {
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 700); // 700ms fade-out duration matching transition-opacity
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#F2EDE6] backdrop-blur-md transition-opacity duration-700 font-sans ${
        isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Centered Logo Emblem with Delicate Rotating Mocha Ring */}
      <div className="relative flex items-center justify-center">
        {/* Rotating Mocha Accent Ring */}
        <div className="absolute w-36 h-36 md:w-44 md:h-44 rounded-full border-2 border-[#D6CFCE]/40 border-t-[#7A5C4D] animate-spin" />

        {/* Hanger Emblem Icon */}
        <img
          src="/logo/logo.png"
          alt="hercloset logo"
          className="w-24 h-24 md:w-32 md:h-32 object-contain relative z-10 drop-shadow-sm"
        />
      </div>
    </div>
  );
};
