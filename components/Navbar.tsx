"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Building2, 
  ChevronDown, 
  Menu, 
  X, 
  Lock, 
  PhoneCall, 
  ShieldCheck, 
  ArrowRight,
  UserCheck,
  ShieldAlert,
  SlidersHorizontal,
  Home,
  FileText
} from "lucide-react";
import GoogleTranslate from "./GoogleTranslate";

interface NavbarProps {
  onOpenApply?: (loanType?: string) => void;
}

export default function Navbar({ onOpenApply }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loansDropdownOpen, setLoansDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-sterling-navy-deep shadow-md border-b border-sterling-navy-light/40">
      {/* Top Notice Bar with ACPR & Google Translate widget */}
      <div className="bg-sterling-navy-dark text-slate-300 text-xs py-1.5 px-4 sm:px-8 border-b border-white/10 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-sterling-gold-light">
              <ShieldCheck className="w-3.5 h-3.5" />
              Registered Investment & Lending Company • USD & EUR Facilities
            </span>
            <span className="text-slate-400">|</span>
            <a 
              href="https://wa.me/?text=Hello%2C%20I%20am%20interested%20in%20your%20Loan%20Offer." 
              target="_blank" 
              rel="noreferrer" 
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
            >
              WhatsApp Assistance
            </a>
            <span className="text-slate-400">|</span>
            <a 
              href="mailto:contact@sterlingbank.fr?subject=Financing%20Application%20Inquiry" 
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              Email : contact@sterlingbank.fr
            </a>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="hover:text-sterling-gold transition-colors flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-sterling-gold" />
              Connexion
            </Link>
            <span className="text-slate-500">|</span>
            <Link href="/register" className="hover:text-sterling-gold transition-colors flex items-center gap-1">
              <UserCheck className="w-3.5 h-3.5 text-sterling-gold" />
              Créer un Compte
            </Link>
            <span className="text-slate-500">|</span>
            <Link href="/dashboard" className="hover:text-sterling-gold transition-colors">
              Espace Client
            </Link>
            <span className="text-slate-500">|</span>
            {/* Currency Indicator (USD & EUR Only) */}
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/10 text-sterling-gold font-bold text-[11px] border border-sterling-gold/30">
              USD ($) & EUR (€)
            </span>
            <span className="text-slate-500">|</span>
            {/* Google Translate Europe Top 5 Language Switcher */}
            <GoogleTranslate />
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-sterling-gold via-sterling-gold-light to-sterling-gold-dark flex items-center justify-center shadow-lg shadow-sterling-gold/20 group-hover:scale-105 transition-transform">
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
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            <Link 
              href="/" 
              className="text-white/90 hover:text-sterling-gold font-medium text-sm transition-colors flex items-center gap-1"
            >
              <Home className="w-4 h-4 text-sterling-gold/80" />
              Accueil
            </Link>

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
                  <div className="px-4 py-2 border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Solutions de Financement Particuliers
                  </div>
                  <Link 
                    href="/personal-loans" 
                    className="block px-4 py-2.5 hover:bg-slate-50 text-slate-800 transition-colors border-l-2 border-sterling-gold bg-amber-50/40"
                  >
                    <div className="text-sm font-semibold text-sterling-navy flex items-center gap-1.5">
                      <span>Prêt Personnel (Persona)</span>
                      <span className="text-[9px] bg-sterling-gold text-sterling-navy-deep px-1.5 py-0.5 rounded font-bold">Populaire</span>
                    </div>
                    <div className="text-xs text-slate-500">Sans justificatif d&apos;utilisation, de 1 000 € à 75 000 €</div>
                  </Link>
                  <Link 
                    href="/auto-loans" 
                    className="block px-4 py-2.5 hover:bg-slate-50 text-slate-800 transition-colors"
                  >
                    <div className="text-sm font-semibold text-sterling-navy">Prêt Auto & Mobilité Propre (Ultima)</div>
                    <div className="text-xs text-slate-500">Véhicules neufs ou d&apos;occasion, bonus écologique</div>
                  </Link>
                  <Link 
                    href="/home-loans" 
                    className="block px-4 py-2.5 hover:bg-slate-50 text-slate-800 transition-colors"
                  >
                    <div className="text-sm font-semibold text-sterling-navy">Prêt Travaux & Immobilier (Discovery)</div>
                    <div className="text-xs text-slate-500">Panneaux solaires, pompes à chaleur, jusqu&apos;à 25 ans</div>
                  </Link>
                  <Link 
                    href="/tracker" 
                    className="block px-4 py-2.5 hover:bg-slate-50 text-slate-800 transition-colors"
                  >
                    <div className="text-sm font-semibold text-sterling-navy">Suivi de Demande en Direct</div>
                    <div className="text-xs text-slate-500">Suivez l&apos;instruction de votre dossier en temps réel</div>
                  </Link>
                </div>
              )}
            </div>

            <Link href="/personal-loans" className="text-white/90 hover:text-sterling-gold font-medium text-sm transition-colors">
              Prêt Personnel Dédié
            </Link>

            <a href="/#calculator" className="text-white/90 hover:text-sterling-gold font-medium text-sm transition-colors">
              Simulateur
            </a>

            <Link href="/dashboard" className="text-white/90 hover:text-sterling-gold font-medium text-sm transition-colors flex items-center gap-1">
              <UserCheck className="w-3.5 h-3.5 text-sterling-gold" />
              Espace Client
            </Link>
          </nav>

          {/* Action CTAs & Mobile Lang */}
          <div className="hidden sm:flex items-center gap-3">
            <button 
              onClick={() => onOpenApply?.("personnel")}
              className="bg-gradient-to-r from-sterling-gold via-sterling-gold-light to-sterling-gold text-sterling-navy-deep hover:shadow-lg hover:shadow-sterling-gold/30 hover:scale-[1.02] active:scale-[0.98] font-bold text-sm px-5 py-2.5 rounded-lg transition-all flex items-center gap-2 shadow-md"
            >
              Demande en Ligne
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>

            <Link 
              href="/login" 
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-medium text-sm px-4 py-2.5 rounded-lg transition-all flex items-center gap-2"
            >
              <Lock className="w-3.5 h-3.5 text-sterling-gold" />
              Connexion
            </Link>
          </div>

          {/* Mobile elements */}
          <div className="flex lg:hidden items-center gap-2">
            <GoogleTranslate />
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
            <Link 
              href="/" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-white hover:bg-white/10 rounded-md"
            >
              Accueil
            </Link>
            <Link 
              href="/personal-loans" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-semibold text-sterling-gold hover:bg-white/10 rounded-md"
            >
              Prêt Personnel Dédié (Persona)
            </Link>
            <a 
              href="/#calculator" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-white hover:bg-white/10 rounded-md"
            >
              Simulateur de Mensualités
            </a>
            <Link 
              href="/login" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-white hover:bg-white/10 rounded-md flex items-center gap-2"
            >
              <Lock className="w-4 h-4 text-sterling-gold" />
              Se Connecter (Connexion)
            </Link>
            <Link 
              href="/register" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-emerald-400 hover:bg-white/10 rounded-md flex items-center gap-2"
            >
              <UserCheck className="w-4 h-4 text-emerald-400" />
              Ouvrir un Compte (Inscription)
            </Link>
            <Link 
              href="/dashboard" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-white hover:bg-white/10 rounded-md flex items-center gap-2"
            >
              <UserCheck className="w-4 h-4 text-sterling-gold" />
              Espace Client (Dashboard)
            </Link>
          </div>

          <div className="pt-4 border-t border-white/10 space-y-2">
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenApply?.("personnel");
              }}
              className="w-full bg-sterling-gold hover:bg-sterling-gold-light text-sterling-navy-deep font-bold text-center py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              Faire une Demande en Direct
              <ArrowRight className="w-4 h-4" />
            </button>
            <Link 
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full bg-white/10 text-white font-medium text-center py-2.5 rounded-lg transition-colors block"
            >
              Accéder à mon Espace Client
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
