"use client";

import React, { useState } from "react";
import { 
  Building2, 
  ChevronDown, 
  Menu, 
  X, 
  Lock, 
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
      {/* Top Notice Bar */}
      <div className="bg-sterling-navy-dark text-slate-300 text-xs py-1.5 px-4 sm:px-8 border-b border-white/10 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-sterling-gold-light">
              <ShieldCheck className="w-3.5 h-3.5" />
              Établissement agréé par l&apos;ACPR • Banque de France (Code Banque 10248)
            </span>
            <span className="text-slate-400">|</span>
            <span className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
              <PhoneCall className="w-3 h-3 text-sterling-gold" />
              Service Client (Paris) : 01 89 54 22 10 (Appel non surtaxé)
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#tracker" className="hover:text-sterling-gold transition-colors">
              Suivi de Demande
            </a>
            <span className="text-slate-500">|</span>
            <a href="#rates" className="hover:text-sterling-gold transition-colors">
              Barème & TAEG
            </a>
            <span className="text-slate-500">|</span>
            <span className="text-sterling-gold font-semibold flex items-center gap-1">
              🇫🇷 France (EUR €)
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-sterling-gold via-sterling-gold-light to-sterling-gold-dark flex items-center justify-center shadow-lg shadow-sterling-gold/20">
              <Building2 className="w-6 h-6 text-sterling-navy-deep stroke-[2.2]" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-white font-display">
                STERLING BANK
              </span>
              <span className="text-[10px] tracking-[0.25em] text-sterling-gold uppercase font-semibold">
                FRANCE • CRÉDIT & BANQUE EN LIGNE
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            <div 
              className="relative"
              onMouseEnter={() => setLoansDropdownOpen(true)}
              onMouseLeave={() => setLoansDropdownOpen(false)}
            >
              <button className="flex items-center gap-1.5 text-white/90 hover:text-sterling-gold font-medium text-sm transition-colors py-2">
                Nos Crédits
                <ChevronDown className="w-4 h-4 text-sterling-gold" />
              </button>

              {/* Loans Dropdown */}
              {loansDropdownOpen && (
                <div className="absolute top-full left-0 w-80 bg-white rounded-xl shadow-2xl border border-slate-100 py-3 mt-1 animate-in fade-in slide-in-from-top-2 z-50">
                  <div className="px-4 py-2 border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Crédits aux Particuliers
                  </div>
                  <a 
                    href="#calculator" 
                    className="block px-4 py-2.5 hover:bg-slate-50 text-slate-800 transition-colors"
                  >
                    <div className="text-sm font-semibold text-sterling-navy">Prêt Personnel</div>
                    <div className="text-xs text-slate-500">De 1 000 € à 75 000 € sans justificatif d&apos;utilisation</div>
                  </a>
                  <a 
                    href="#products" 
                    className="block px-4 py-2.5 hover:bg-slate-50 text-slate-800 transition-colors"
                  >
                    <div className="text-sm font-semibold text-sterling-navy">Prêt Auto & Moto</div>
                    <div className="text-xs text-slate-500">Véhicules neufs ou d&apos;occasion, bonus écologique</div>
                  </a>
                  <a 
                    href="#products" 
                    className="block px-4 py-2.5 hover:bg-slate-50 text-slate-800 transition-colors"
                  >
                    <div className="text-sm font-semibold text-sterling-navy">Prêt Travaux & Immobilier</div>
                    <div className="text-xs text-slate-500">Rénovation, achat immobilier, jusqu&apos;à 25 ans</div>
                  </a>
                  <a 
                    href="#products" 
                    className="block px-4 py-2.5 hover:bg-slate-50 text-slate-800 transition-colors"
                  >
                    <div className="text-sm font-semibold text-sterling-navy">Rachat de Crédits</div>
                    <div className="text-xs text-slate-500">Regroupez vos mensualités pour alléger votre budget</div>
                  </a>
                </div>
              )}
            </div>

            <a href="#how-it-works" className="text-white/90 hover:text-sterling-gold font-medium text-sm transition-colors">
              Comment ça marche
            </a>
            <a href="#calculator" className="text-white/90 hover:text-sterling-gold font-medium text-sm transition-colors">
              Simulateur
            </a>
            <a href="#testimonials" className="text-white/90 hover:text-sterling-gold font-medium text-sm transition-colors">
              Avis Clients
            </a>
            <a href="#tracker" className="text-white/90 hover:text-sterling-gold font-medium text-sm transition-colors">
              Suivi de Dossier
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <button 
              onClick={() => onOpenApply?.("personnel")}
              className="bg-gradient-to-r from-sterling-gold via-sterling-gold-light to-sterling-gold text-sterling-navy-deep hover:shadow-lg hover:shadow-sterling-gold/30 hover:scale-[1.02] active:scale-[0.98] font-bold text-sm px-5 py-2.5 rounded-lg transition-all flex items-center gap-2"
            >
              Demande en Ligne
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>

            <a 
              href="#login" 
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-medium text-sm px-4 py-2.5 rounded-lg transition-all flex items-center gap-2"
            >
              <Lock className="w-3.5 h-3.5 text-sterling-gold" />
              Espace Client
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
              Prêt Personnel
            </a>
            <a 
              href="#products" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-white hover:bg-white/10 rounded-md"
            >
              Prêt Auto & Véhicule
            </a>
            <a 
              href="#products" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-white hover:bg-white/10 rounded-md"
            >
              Prêt Travaux & Immobilier
            </a>
            <a 
              href="#how-it-works" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-white hover:bg-white/10 rounded-md"
            >
              Comment ça marche
            </a>
            <a 
              href="#testimonials" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-white hover:bg-white/10 rounded-md"
            >
              Avis Clients Vérifiés
            </a>
            <a 
              href="#tracker" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-white hover:bg-white/10 rounded-md"
            >
              Suivi de Demande
            </a>
          </div>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenApply?.("personnel");
              }}
              className="w-full bg-sterling-gold text-sterling-navy-deep font-bold py-3 rounded-lg text-center shadow-md"
            >
              Faire une Simulation Immédiate
            </button>
            <a
              href="#login"
              className="w-full bg-white/10 text-white font-medium py-2.5 rounded-lg text-center flex items-center justify-center gap-2 border border-white/20"
            >
              <Lock className="w-4 h-4 text-sterling-gold" />
              Connexion Espace Client
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
