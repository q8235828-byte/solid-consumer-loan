"use client";

import React, { useState } from "react";
import { 
  Building2, 
  ChevronDown, 
  Menu, 
  X, 
  Lock, 
  Search, 
  PhoneCall, 
  ShieldCheck, 
  ArrowRight 
} from "lucide-react";

interface NavbarProps {
  onOpenApply?: (loanType?: string) => void;
}

export default function Navbar({ onOpenApply }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loansDropdownOpen, setLoansDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-sterling-navy-deep shadow-md border-b border-sterling-navy-light/40">
      {/* Top micro-bar */}
      <div className="bg-sterling-navy-dark text-slate-300 text-xs py-1.5 px-4 sm:px-8 border-b border-white/10 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-sterling-gold-light">
              <ShieldCheck className="w-3.5 h-3.5" />
              A Proud Member of BancNet | Regulated by Bangko Sentral ng Pilipinas
            </span>
            <span className="text-slate-400">|</span>
            <span className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
              <PhoneCall className="w-3 h-3 text-sterling-gold" />
              Customer Service: (02) 8535-6168
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#tracker" className="hover:text-sterling-gold transition-colors">
              Track Loan Status
            </a>
            <span className="text-slate-500">|</span>
            <a href="#rates" className="hover:text-sterling-gold transition-colors">
              Rates & Fees
            </a>
            <span className="text-slate-500">|</span>
            <a href="#branches" className="hover:text-sterling-gold transition-colors">
              Branches & ATMs
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-sterling-gold via-sterling-gold-light to-sterling-gold-dark flex items-center justify-center shadow-lg shadow-sterling-gold/20">
              <Building2 className="w-6 h-6 text-sterling-navy-deep stroke-[2.2]" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-white font-display">
                STERLING BANK
              </span>
              <span className="text-[10px] tracking-[0.25em] text-sterling-gold uppercase font-semibold">
                OF ASIA • A Savings Bank
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            <div 
              className="relative"
              onMouseEnter={() => setLoansDropdownOpen(true)}
              onMouseLeave={() => setLoansDropdownOpen(false)}
            >
              <button className="flex items-center gap-1.5 text-white/90 hover:text-sterling-gold font-medium text-sm transition-colors py-2">
                Consumer Loans
                <ChevronDown className="w-4 h-4 text-sterling-gold" />
              </button>

              {/* Loans Dropdown */}
              {loansDropdownOpen && (
                <div className="absolute top-full left-0 w-72 bg-white rounded-xl shadow-2xl border border-slate-100 py-3 mt-1 animate-in fade-in slide-in-from-top-2 z-50">
                  <div className="px-4 py-2 border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Retail Loan Products
                  </div>
                  <a 
                    href="#calculator" 
                    className="block px-4 py-2.5 hover:bg-slate-50 text-slate-800 transition-colors"
                  >
                    <div className="text-sm font-semibold text-sterling-navy">Persona Personal Loan</div>
                    <div className="text-xs text-slate-500">Unsecured multi-purpose cash loan</div>
                  </a>
                  <a 
                    href="#products" 
                    className="block px-4 py-2.5 hover:bg-slate-50 text-slate-800 transition-colors"
                  >
                    <div className="text-sm font-semibold text-sterling-navy">Ultima Auto Loan</div>
                    <div className="text-xs text-slate-500">Brand new & pre-owned vehicle financing</div>
                  </a>
                  <a 
                    href="#products" 
                    className="block px-4 py-2.5 hover:bg-slate-50 text-slate-800 transition-colors"
                  >
                    <div className="text-sm font-semibold text-sterling-navy">Discovery Home Loan</div>
                    <div className="text-xs text-slate-500">Purchase, construction & refinancing</div>
                  </a>
                  <a 
                    href="#products" 
                    className="block px-4 py-2.5 hover:bg-slate-50 text-slate-800 transition-colors"
                  >
                    <div className="text-sm font-semibold text-sterling-navy">AvanceCash Salary Loan</div>
                    <div className="text-xs text-slate-500">Payroll emergency financial assistance</div>
                  </a>
                </div>
              )}
            </div>

            <a href="#how-it-works" className="text-white/90 hover:text-sterling-gold font-medium text-sm transition-colors">
              How It Works
            </a>
            <a href="#calculator" className="text-white/90 hover:text-sterling-gold font-medium text-sm transition-colors">
              Loan Calculator
            </a>
            <a href="#tracker" className="text-white/90 hover:text-sterling-gold font-medium text-sm transition-colors">
              Track Status
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <button 
              onClick={() => onOpenApply?.("persona")}
              className="bg-gradient-to-r from-sterling-gold via-sterling-gold-light to-sterling-gold text-sterling-navy-deep hover:shadow-lg hover:shadow-sterling-gold/30 hover:scale-[1.02] active:scale-[0.98] font-bold text-sm px-5 py-2.5 rounded-lg transition-all flex items-center gap-2"
            >
              Apply Online
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>

            <a 
              href="https://sterlingbankonline-personal.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-medium text-sm px-4 py-2.5 rounded-lg transition-all flex items-center gap-2"
            >
              <Lock className="w-3.5 h-3.5 text-sterling-gold" />
              Online Banking
            </a>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-white hover:bg-white/10"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-sterling-navy-deep border-t border-white/10 px-4 pt-4 pb-6 space-y-4">
          <div className="space-y-1">
            <a 
              href="#calculator" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-white hover:bg-white/10 rounded-md"
            >
              Persona Personal Loan
            </a>
            <a 
              href="#products" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-white hover:bg-white/10 rounded-md"
            >
              Ultima Auto Loan
            </a>
            <a 
              href="#products" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-white hover:bg-white/10 rounded-md"
            >
              Discovery Home Loan
            </a>
            <a 
              href="#how-it-works" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-white hover:bg-white/10 rounded-md"
            >
              How It Works
            </a>
            <a 
              href="#tracker" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-white hover:bg-white/10 rounded-md"
            >
              Track Status
            </a>
          </div>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenApply?.("persona");
              }}
              className="w-full bg-sterling-gold text-sterling-navy-deep font-bold py-3 rounded-lg text-center shadow-md"
            >
              Apply Online Now
            </button>
            <a
              href="https://sterlingbankonline-personal.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-white/10 text-white font-medium py-2.5 rounded-lg text-center flex items-center justify-center gap-2 border border-white/20"
            >
              <Lock className="w-4 h-4 text-sterling-gold" />
              Online Banking Login
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
