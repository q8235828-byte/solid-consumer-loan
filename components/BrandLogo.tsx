"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";

interface BrandLogoProps {
  className?: string;
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
}

export default function BrandLogo({ className = "", variant = "dark", size = "md" }: BrandLogoProps) {
  const { isFrench } = useLanguage();
  const isDark = variant === "dark"; // dark text for light navbar, light text for dark footer

  return (
    <Link 
      href="/" 
      rel="home" 
      className={`inline-flex items-center gap-2 sm:gap-3 group select-none transition-transform hover:opacity-95 max-w-full ${className}`}
      aria-label="Loan Commercial Group - Prêts Privés & Facilités de Capital"
    >
      {/* Precision Swiss-Grade Geometric Shield Emblem */}
      <div className="relative w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 shrink-0 drop-shadow-sm">
        <svg 
          viewBox="0 0 100 100" 
          className="w-full h-full"
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Ultra-Luxe Metallic Gold Gradient */}
            <linearGradient id="lcgGoldMain" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FDE68A" />
              <stop offset="30%" stopColor="#D4AF37" />
              <stop offset="70%" stopColor="#AA771C" />
              <stop offset="100%" stopColor="#F5D77F" />
            </linearGradient>

            {/* Deep Executive Midnight Navy Gradient */}
            <linearGradient id="lcgNavyBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0B1B3D" />
              <stop offset="60%" stopColor="#051026" />
              <stop offset="100%" stopColor="#020814" />
            </linearGradient>

            {/* Subtle Inner Glow */}
            <radialGradient id="lcgCenterGlow" cx="50%" cy="45%" r="55%">
              <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#051026" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Exterior Shield Frame with Precision Double Edge */}
          <path 
            d="M50 4 L88 20 V50 C88 73 50 96 50 96 C50 96 12 73 12 50 V20 Z" 
            fill="url(#lcgNavyBg)" 
            stroke="url(#lcgGoldMain)" 
            strokeWidth="3.5" 
            strokeLinejoin="round"
          />

          {/* Backlight Glow inside Shield */}
          <ellipse cx="50" cy="46" rx="28" ry="28" fill="url(#lcgCenterGlow)" />

          {/* Interior Inset Gold Border */}
          <path 
            d="M50 11 L81 24 V48 C81 67 50 87 50 87 C50 87 19 67 19 48 V24 Z" 
            fill="none" 
            stroke="url(#lcgGoldMain)" 
            strokeWidth="1" 
            strokeOpacity="0.6" 
          />

          {/* Top Diamond Star of Trust & Capital */}
          <polygon 
            points="50,18 52.5,23.5 58,24 53.8,28 55,33.5 50,30.5 45,33.5 46.2,28 42,24 47.5,23.5" 
            fill="url(#lcgGoldMain)" 
          />

          {/* Monogram L - Bold Architectural Pillar */}
          <path 
            d="M28 36 H35 V58 H46 V64 H28 Z" 
            fill="url(#lcgGoldMain)" 
          />

          {/* Monogram C - Interlocking Curved Vault */}
          <path 
            d="M68 42 C64 36 53 36 49 42 C45 47 45 54 49 59 C53 64 64 64 68 59 V53 H58 V48 H73 V62 C67 69 52 69 44 62 C38 55 38 45 44 38 C52 31 67 31 73 38 Z" 
            fill="url(#lcgGoldMain)" 
          />

          {/* Fine Vertical Accent Spine */}
          <line x1="50" y1="36" x2="50" y2="64" stroke="#FFF4D0" strokeWidth="1" strokeOpacity="0.4" />
        </svg>
      </div>

      {/* Brand Name Typography Lockup - Fully Responsive & Non-Breaking */}
      <div className="flex flex-col justify-center leading-none min-w-0 shrink-0">
        
        {/* Main Title Row: Clean Single Line with Unified Proportions */}
        <div className="flex items-baseline gap-1 sm:gap-1.5 whitespace-nowrap">
          <span className={`text-[13px] xs:text-[14px] sm:text-[18px] md:text-[20px] font-black tracking-tight uppercase font-display ${
            isDark ? "text-[#002244]" : "text-white"
          }`}>
            LOAN COMMERCIAL
          </span>
          <span className="text-[13px] xs:text-[14px] sm:text-[18px] md:text-[20px] font-black tracking-tight uppercase font-display text-[#C89D3C] drop-shadow-xs">
            GROUP
          </span>
        </div>

        {/* Tagline Row: Refined Private Banking Subtitle */}
        <div className="flex items-center gap-1.5 mt-1 sm:mt-1.5 whitespace-nowrap overflow-hidden">
          <span className="h-[1px] w-2 sm:w-3 bg-[#C89D3C]/70 inline-block shrink-0" />
          <span className={`text-[7px] xs:text-[8px] sm:text-[9.5px] font-bold tracking-[0.14em] sm:tracking-[0.22em] uppercase font-sans truncate ${
            isDark ? "text-[#7B6127]" : "text-amber-200/90"
          }`}>
            {isFrench ? "PRÊTS PRIVÉS & CAPITAL" : "PRIVATE LENDING & CAPITAL"}
          </span>
          <span className="h-[1px] w-2 sm:w-3 bg-[#C89D3C]/70 inline-block shrink-0" />
        </div>

      </div>
    </Link>
  );
}
