"use client";

import React from "react";
import Link from "next/link";

interface BrandLogoProps {
  className?: string;
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
}

export default function BrandLogo({ className = "", variant = "dark", size = "md" }: BrandLogoProps) {
  const isDark = variant === "dark"; // dark text for white background

  const scaleClasses = {
    sm: "scale-90",
    md: "scale-100",
    lg: "scale-105 sm:scale-125"
  };

  return (
    <Link 
      href="/" 
      rel="home" 
      className={`inline-flex items-center gap-2 sm:gap-3.5 group select-none transition-transform hover:scale-[1.02] max-w-full ${scaleClasses[size]} ${className}`}
      aria-label="Loan Commercial Group - Private Lending & Capital Facilities"
    >
      {/* Precision Geometric SVG Crest Emblem */}
      <div className="relative w-8 h-8 sm:w-11 sm:h-11 md:w-12 md:h-12 shrink-0 filter drop-shadow-md">
        <svg 
          viewBox="0 0 100 100" 
          className="w-full h-full"
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Metallic Gold Gradient */}
            <linearGradient id="lcgGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F9E29D" />
              <stop offset="35%" stopColor="#D4AF37" />
              <stop offset="70%" stopColor="#AA771C" />
              <stop offset="100%" stopColor="#F5D77F" />
            </linearGradient>

            {/* Deep Executive Navy Gradient */}
            <linearGradient id="lcgNavy" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0B1B3D" />
              <stop offset="50%" stopColor="#051026" />
              <stop offset="100%" stopColor="#000A1A" />
            </linearGradient>

            {/* Glow Gradient */}
            <radialGradient id="crestGlow" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#000" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Outer Shield with Gold Edge */}
          <path 
            d="M50 4 L88 20 V50 C88 72 50 96 50 96 C50 96 12 72 12 50 V20 Z" 
            fill="url(#lcgNavy)" 
            stroke="url(#lcgGold)" 
            strokeWidth="3.5" 
            strokeLinejoin="round"
          />

          {/* Radial Center Backlight */}
          <ellipse cx="50" cy="48" rx="32" ry="32" fill="url(#crestGlow)" />

          {/* Inner Accent Line */}
          <path 
            d="M50 11 L81 24 V48 C81 66 50 87 50 87 C50 87 19 66 19 48 V24 Z" 
            fill="none" 
            stroke="url(#lcgGold)" 
            strokeWidth="1" 
            strokeOpacity="0.5" 
          />

          {/* Top Finance Diamond Star */}
          <polygon 
            points="50,21 52.8,26.5 59,27 54.3,31 55.7,37 50,33.5 44.3,37 45.7,31 41,27 47.2,26.5" 
            fill="url(#lcgGold)" 
          />

          {/* Stylized LCG Architectural Financial Monogram */}
          {/* L Pillar */}
          <path 
            d="M28 38 V64 H44 V58 H34.5 V38 Z" 
            fill="url(#lcgGold)" 
          />

          {/* C-G Interlocking Curves */}
          <path 
            d="M62 42 C56 36 46 36 41 42 C37 46 37 56 41 60 C46 66 56 66 62 60 V53 H50 V47 H62 Z" 
            fill="url(#lcgGold)" 
          />

          {/* Center Dynamic Growth Ascent Bar */}
          <rect x="47" y="40" width="3" height="14" rx="1.5" fill="#FFF4D0" />
        </svg>
      </div>

      {/* Brand Name Typography */}
      <div className="flex flex-col justify-center leading-none min-w-0">
        <div className="flex items-center gap-1 sm:gap-1.5 whitespace-nowrap">
          <span className={`text-[13px] xs:text-[15px] sm:text-[20px] md:text-[22px] font-black tracking-tight font-display uppercase whitespace-nowrap ${
            isDark ? "text-[#002D62]" : "text-white"
          }`}>
            LOAN COMMERCIAL
          </span>
          <span className="text-[13px] xs:text-[15px] sm:text-[20px] md:text-[22px] font-black tracking-tight font-display uppercase whitespace-nowrap bg-gradient-to-r from-amber-500 via-sterling-gold to-amber-600 bg-clip-text text-transparent">
            GROUP
          </span>
        </div>

        <div className="flex items-center gap-1 sm:gap-1.5 mt-1 sm:mt-1.5 whitespace-nowrap overflow-hidden">
          <span className="h-[1px] w-2 sm:w-3 bg-sterling-gold/70 inline-block shrink-0" />
          <span className={`text-[7px] sm:text-[9.5px] font-bold tracking-[0.14em] sm:tracking-[0.22em] uppercase font-sans truncate ${
            isDark ? "text-amber-800/90" : "text-amber-200/80"
          }`}>
            <span className="hidden sm:inline">PRIVATE LENDING & CAPITAL FACILITIES</span>
            <span className="sm:hidden">PRIVATE LENDING & FACILITIES</span>
          </span>
          <span className="h-[1px] w-2 sm:w-3 bg-sterling-gold/70 inline-block shrink-0" />
        </div>
      </div>
    </Link>
  );
}
