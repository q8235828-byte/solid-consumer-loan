"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function PageLoader() {
  const [loading, setLoading] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Smooth initial entrance and fast exit
    const timer = setTimeout(() => {
      setFading(true);
      setTimeout(() => setLoading(false), 450);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div
      className={`fixed inset-0 z-[99999] bg-[#071329] flex flex-col items-center justify-center transition-opacity duration-500 ease-out ${
        fading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.12)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative flex flex-col items-center gap-6 animate-scale-up">
        {/* Animated Gold Ring & Crest */}
        <div className="relative w-24 h-24 flex items-center justify-center">
          {/* Outer Pulsing Glow */}
          <div className="absolute inset-0 rounded-full bg-sterling-gold/20 animate-ping opacity-60" />

          {/* Rotating Dashed Ring */}
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-sterling-gold border-r-amber-400 animate-spin" />

          {/* Inner Static Glow Ring */}
          <div className="absolute inset-1.5 rounded-full border border-sterling-gold/30" />

          {/* Crest Emblem */}
          <div className="relative w-14 h-14 rounded-2xl bg-slate-900 border border-sterling-gold/40 flex items-center justify-center shadow-xl shadow-sterling-gold/20 overflow-hidden">
            <Image
              src="/favicon.png"
              alt="Loan Commercial Group"
              width={46}
              height={46}
              className="object-contain drop-shadow"
              priority
            />
          </div>
        </div>

        {/* Brand Typography */}
        <div className="text-center space-y-2">
          <div className="text-sm sm:text-base font-black tracking-wider text-white uppercase font-display">
            Loan <span className="text-sterling-gold">Commercial</span> Group
          </div>
          <div className="flex items-center justify-center gap-2 text-[11px] font-semibold tracking-widest text-slate-400 uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Private Lending & Capital Facilities</span>
          </div>
        </div>

        {/* Loading Progress Bar */}
        <div className="w-48 h-1 bg-slate-800 rounded-full overflow-hidden border border-white/5">
          <div className="h-full bg-gradient-to-r from-sterling-gold via-amber-300 to-sterling-gold rounded-full animate-progress" />
        </div>
      </div>
    </div>
  );
}
