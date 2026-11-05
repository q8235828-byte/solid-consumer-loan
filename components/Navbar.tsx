"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Building2, 
  ChevronDown, 
  ChevronRight,
  Menu, 
  X, 
  Lock, 
  Search,
  PhoneCall, 
  ShieldCheck, 
  ArrowRight,
  UserCheck,
  ShieldAlert,
  SlidersHorizontal,
  Home,
  FileText,
  CreditCard,
  Briefcase,
  TrendingUp,
  Smartphone,
  Landmark,
  PiggyBank,
  Car,
  Percent,
  CheckCircle2,
  ExternalLink
} from "lucide-react";
import GoogleTranslate from "./GoogleTranslate";

interface NavbarProps {
  onOpenApply?: (loanType?: string) => void;
}

export default function Navbar({ onOpenApply }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [onlineBankingOpen, setOnlineBankingOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileAccordion, setMobileAccordion] = useState<{ [key: string]: boolean }>({
    personal: true,
    business: false,
    investment: false,
    ebanking: false,
  });

  const megaMenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (menu: string) => {
    if (megaMenuTimeoutRef.current) {
      clearTimeout(megaMenuTimeoutRef.current);
    }
    setActiveMegaMenu(menu);
  };

  const handleMouseLeave = () => {
    megaMenuTimeoutRef.current = setTimeout(() => {
      setActiveMegaMenu(null);
    }, 200);
  };

  const toggleMobileCategory = (cat: string) => {
    setMobileAccordion(prev => ({
      ...prev,
      [cat]: !prev[cat]
    }));
  };

  const searchResults = [
    { title: "Personal Loans (Persona)", url: "/personal-loans", category: "Loans", desc: "Unsecured personal loan from $1,000 to $75,000 in USD/EUR." },
    { title: "Auto Loans", url: "/auto-loans", category: "Loans", desc: "Up to 100% vehicle financing for brand new & pre-owned cars." },
    { title: "Home Loans & Renovation", url: "/home-loans", category: "Loans", desc: "Home improvement and construction financing up to 25 years." },
    { title: "Private Investment & Corporate Lending", url: "/apply", category: "Corporate", desc: "USD $100k to $500M financing with 1 to 25 year terms." },
    { title: "Loan Monthly Payment Calculator", url: "/#calculator", category: "Tools", desc: "Simulate monthly installments in USD ($) and EUR (€)." },
    { title: "Loan Application Tracker", url: "/tracker", category: "Services", desc: "Track your submitted loan dossier in real-time." },
    { title: "Client Online Banking Area", url: "/dashboard", category: "Portal", desc: "Access your statements, payment schedule and advisor chat." },
  ].filter(item => 
    !searchQuery.trim() || 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <header role="banner" className="sticky top-0 z-50 w-full bg-white shadow-md border-b border-slate-200">
      
      {/* =========================================================================
          TOP TIER: SECONDARY NAVIGATION & UTILITIES
          ========================================================================= */}
      <div className="bg-[#002244] text-slate-200 text-xs py-2 px-4 sm:px-8 border-b border-slate-700/60">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          
          {/* Secondary Nav Links (About Us, Calculator, Careers, ATMs, Contact) */}
          <nav aria-label="Secondary Menu" className="hidden lg:flex items-center gap-5 text-[11px] font-medium tracking-wide">
            <Link href="/" className="hover:text-sterling-gold transition-colors">
              About Us
            </Link>
            <span className="text-slate-500">|</span>
            <a href="/#calculator" className="hover:text-sterling-gold transition-colors">
              Loan Calculator
            </a>
            <span className="text-slate-500">|</span>
            <a 
              href="https://sterlingbankasia.com/careers" 
              target="_blank" 
              rel="noreferrer" 
              className="hover:text-sterling-gold transition-colors inline-flex items-center gap-1"
            >
              Careers <ExternalLink className="w-2.5 h-2.5 opacity-70" />
            </a>
            <span className="text-slate-500">|</span>
            <Link href="/personal-loans" className="hover:text-sterling-gold transition-colors">
              Branches and ATMs
            </Link>
            <span className="text-slate-500">|</span>
            <a href="mailto:contact@sterlingbank.fr" className="hover:text-sterling-gold transition-colors">
              Contact Us
            </a>
            <span className="text-slate-500">|</span>
            <a 
              href="https://wa.me/?text=Hello%2C%20I%20am%20interested%20in%20your%20Loan%20Offer." 
              target="_blank" 
              rel="noreferrer" 
              className="text-emerald-400 hover:text-emerald-300 font-bold transition-colors inline-flex items-center gap-1"
            >
              WhatsApp Support
            </a>
          </nav>

          {/* Quick Notice on Mobile */}
          <div className="lg:hidden text-[11px] font-semibold text-sterling-gold-light truncate">
            Sterling Bank • Private Investment & Consumer Lending
          </div>

          {/* Secondary Right: Currency, Search, Language, Auth */}
          <div className="flex items-center gap-3">
            {/* Search Toggle Button */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/10 hover:bg-white/15 text-slate-200 hover:text-white transition-colors text-[11px]"
              aria-label="Search site"
            >
              <Search className="w-3.5 h-3.5 text-sterling-gold" />
              <span>Search</span>
            </button>

            <span className="text-slate-600 hidden sm:inline">|</span>

            {/* Currency Badge: USD & EUR Only */}
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-sterling-gold/20 text-sterling-gold font-bold text-[10px] border border-sterling-gold/30">
              USD ($) & EUR (€)
            </span>

            <span className="text-slate-600 hidden sm:inline">|</span>

            {/* Language Switcher */}
            <GoogleTranslate />
          </div>

        </div>
      </div>

      {/* =========================================================================
          MAIN TIER: BRAND LOGO + PRIMARY NAVIGATION + ONLINE BANKING CTA
          ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Official Sterling Bank of Asia Brand Logo */}
          <div className="flex items-center gap-4">
            <Link href="/" rel="home" className="flex items-center group py-1">
              <Image 
                src="/logo.png" 
                alt="Sterling Bank of Asia - A Savings Bank" 
                width={190} 
                height={65} 
                className="h-11 sm:h-12 w-auto object-contain transition-transform group-hover:scale-[1.02]"
                priority
              />
            </Link>
          </div>

          {/* Desktop Primary Navigation Bar */}
          <nav 
            role="navigation" 
            aria-label="Main navigation" 
            className="hidden lg:flex items-center gap-8 text-[15px] font-bold text-[#002855]"
            onMouseLeave={handleMouseLeave}
          >
            {/* Category 1: Personal */}
            <div 
              className="relative py-7 cursor-pointer"
              onMouseEnter={() => handleMouseEnter("personal")}
            >
              <button 
                type="button"
                className={`flex items-center gap-1 tracking-tight transition-colors ${
                  activeMegaMenu === "personal" ? "text-sterling-gold" : "hover:text-sterling-gold"
                }`}
              >
                <span>Personal</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeMegaMenu === "personal" ? "rotate-180 text-sterling-gold" : "text-slate-400"}`} />
              </button>
            </div>

            {/* Category 2: Business */}
            <div 
              className="relative py-7 cursor-pointer"
              onMouseEnter={() => handleMouseEnter("business")}
            >
              <button 
                type="button"
                className={`flex items-center gap-1 tracking-tight transition-colors ${
                  activeMegaMenu === "business" ? "text-sterling-gold" : "hover:text-sterling-gold"
                }`}
              >
                <span>Business</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeMegaMenu === "business" ? "rotate-180 text-sterling-gold" : "text-slate-400"}`} />
              </button>
            </div>

            {/* Category 3: Investment */}
            <div 
              className="relative py-7 cursor-pointer"
              onMouseEnter={() => handleMouseEnter("investment")}
            >
              <button 
                type="button"
                className={`flex items-center gap-1 tracking-tight transition-colors ${
                  activeMegaMenu === "investment" ? "text-sterling-gold" : "hover:text-sterling-gold"
                }`}
              >
                <span>Investment</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeMegaMenu === "investment" ? "rotate-180 text-sterling-gold" : "text-slate-400"}`} />
              </button>
            </div>

            {/* Category 4: eBanking */}
            <div 
              className="relative py-7 cursor-pointer"
              onMouseEnter={() => handleMouseEnter("ebanking")}
            >
              <button 
                type="button"
                className={`flex items-center gap-1 tracking-tight transition-colors ${
                  activeMegaMenu === "ebanking" ? "text-sterling-gold" : "hover:text-sterling-gold"
                }`}
              >
                <span>eBanking</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeMegaMenu === "ebanking" ? "rotate-180 text-sterling-gold" : "text-slate-400"}`} />
              </button>
            </div>
          </nav>

          {/* Action CTAs: Online Banking Dropdown + Fast Apply */}
          <div className="hidden sm:flex items-center gap-3">
            
            {/* Secure Online Banking Login Trigger */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setOnlineBankingOpen(!onlineBankingOpen)}
                className="px-4 py-2.5 rounded-xl border-2 border-[#002855] text-[#002855] hover:bg-[#002855] hover:text-white font-extrabold text-xs sm:text-sm transition-all flex items-center gap-2 shadow-sm"
              >
                <Lock className="w-4 h-4 text-sterling-gold" />
                <span>Online Banking</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${onlineBankingOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Online Banking Popover Submenu */}
              {onlineBankingOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setOnlineBankingOpen(false)} />
                  <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 p-4 space-y-3 animate-in fade-in zoom-in-95">
                    <div className="border-b border-slate-100 pb-2">
                      <div className="text-xs font-black text-[#002855] uppercase tracking-wider">
                        Portail Bancaire Sécurisé
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Chiffrement SSL 256-Bit • eIDAS Compliant
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="p-3 bg-slate-50 rounded-xl hover:bg-amber-50/50 border border-slate-100 transition-colors">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-xs text-[#002855]">Personal Banking</span>
                          <span className="text-[10px] text-emerald-600 font-bold bg-emerald-100 px-2 py-0.5 rounded-full">Particuliers</span>
                        </div>
                        <div className="flex flex-col gap-1 text-[11px]">
                          <Link 
                            href="/login" 
                            onClick={() => setOnlineBankingOpen(false)}
                            className="text-sterling-navy hover:text-sterling-gold font-semibold flex items-center justify-between"
                          >
                            <span>Connexion Espace Client</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                          <Link 
                            href="/register" 
                            onClick={() => setOnlineBankingOpen(false)}
                            className="text-slate-500 hover:text-slate-800"
                          >
                            Pas encore inscrit ? Ouvrir un compte
                          </Link>
                        </div>
                      </div>

                      <div className="p-3 bg-slate-50 rounded-xl hover:bg-slate-100/70 border border-slate-100 transition-colors">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-xs text-[#002855]">Corporate & Business</span>
                          <span className="text-[10px] text-indigo-600 font-bold bg-indigo-100 px-2 py-0.5 rounded-full">Entreprises</span>
                        </div>
                        <Link 
                          href="/login" 
                          onClick={() => setOnlineBankingOpen(false)}
                          className="text-xs text-slate-700 hover:text-sterling-navy font-semibold flex items-center justify-between mt-1"
                        >
                          <span>Accès Optima Online</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>

                      <div className="pt-1">
                        <Link
                          href="/tracker"
                          onClick={() => setOnlineBankingOpen(false)}
                          className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg block text-center transition-colors"
                        >
                          Suivre ma Demande de Crédit en Direct
                        </Link>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Quick Online Application CTA Button */}
            <Link
              href="/apply"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-sterling-gold via-sterling-gold-light to-sterling-gold text-sterling-navy-deep font-extrabold text-xs sm:text-sm shadow-md hover:shadow-sterling-gold/30 hover:scale-[1.02] transition-all flex items-center gap-1.5"
            >
              <span>Online Application</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </Link>

          </div>

          {/* Mobile Right Controls: Search Icon + Hamburger Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100"
              aria-label="Search"
            >
              <Search className="w-6 h-6 text-[#002855]" />
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-800 hover:bg-slate-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-7 h-7 text-[#002855]" /> : <Menu className="w-7 h-7 text-[#002855]" />}
            </button>
          </div>

        </div>
      </div>

      {/* =========================================================================
          DESKTOP MEGA MENUS (RENDERED AS FULL-WIDTH ACCURATE OVERLAYS)
          ========================================================================= */}
      
      {/* 1. PERSONAL MEGA MENU */}
      {activeMegaMenu === "personal" && (
        <div 
          className="absolute left-0 right-0 top-full bg-white border-b-2 border-sterling-gold shadow-2xl z-40 py-8 animate-in fade-in slide-in-from-top-2 duration-150"
          onMouseEnter={() => handleMouseEnter("personal")}
          onMouseLeave={handleMouseLeave}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-4 gap-8">
              
              {/* Column 1: Deposit */}
              <div className="space-y-4">
                <div className="border-b border-slate-200 pb-2 flex items-center gap-2">
                  <PiggyBank className="w-5 h-5 text-sterling-gold" />
                  <h3 className="text-sm font-black text-[#002855] uppercase tracking-wider">Deposit</h3>
                </div>
                <div className="space-y-2.5 text-xs text-slate-600">
                  <div className="font-bold text-[#002855] text-xs pt-1">Savings Account</div>
                  <ul className="space-y-1.5 pl-2 border-l border-slate-100">
                    <li><Link href="/personal-loans" className="hover:text-sterling-gold transition-colors">Solo Savings Account</Link></li>
                    <li><Link href="/personal-loans" className="hover:text-sterling-gold transition-colors">Solo Basic Savings Account</Link></li>
                    <li><Link href="/personal-loans" className="hover:text-sterling-gold transition-colors font-medium text-sterling-gold-dark">Solo Dollar Savings Account (USD)</Link></li>
                    <li><Link href="/personal-loans" className="hover:text-sterling-gold transition-colors">Solo Euro Savings Account (EUR)</Link></li>
                    <li><Link href="/personal-loans" className="hover:text-sterling-gold transition-colors">Neo Kiddie Savings Account</Link></li>
                    <li><Link href="/personal-loans" className="hover:text-sterling-gold transition-colors">Bayani OFW Savings Account</Link></li>
                  </ul>
                  <div className="font-bold text-[#002855] text-xs pt-1">Checking & Time Deposit</div>
                  <ul className="space-y-1.5 pl-2 border-l border-slate-100">
                    <li><Link href="/personal-loans" className="hover:text-sterling-gold transition-colors">Duo Checking Account</Link></li>
                    <li><Link href="/personal-loans" className="hover:text-sterling-gold transition-colors">Prima Time Deposit (Short-Term)</Link></li>
                    <li><Link href="/personal-loans" className="hover:text-sterling-gold transition-colors">Maxima 3 & 5-Year Time Deposit</Link></li>
                  </ul>
                </div>
              </div>

              {/* Column 2: Loans (Featured Category) */}
              <div className="space-y-4 bg-amber-50/40 p-4 rounded-2xl border border-sterling-gold/30">
                <div className="border-b border-sterling-gold/40 pb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Percent className="w-5 h-5 text-sterling-gold" />
                    <h3 className="text-sm font-black text-[#002855] uppercase tracking-wider">Consumer Loans</h3>
                  </div>
                  <span className="text-[10px] font-extrabold bg-sterling-gold text-sterling-navy-deep px-2 py-0.5 rounded-full">RAPID APPROVAL</span>
                </div>
                <ul className="space-y-2 text-xs">
                  <li>
                    <Link 
                      href="/personal-loans" 
                      onClick={() => setActiveMegaMenu(null)}
                      className="block p-2 rounded-xl hover:bg-white transition-all group"
                    >
                      <div className="font-bold text-[#002855] group-hover:text-sterling-gold flex items-center justify-between">
                        <span>Personal Loan (Persona)</span>
                        <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="text-[11px] text-slate-500">Unsecured credit up to 75,000 $ / € • Fixed 2.85% TAEG</div>
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/auto-loans" 
                      onClick={() => setActiveMegaMenu(null)}
                      className="block p-2 rounded-xl hover:bg-white transition-all group"
                    >
                      <div className="font-bold text-[#002855] group-hover:text-sterling-gold flex items-center justify-between">
                        <span>Auto Loan</span>
                        <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="text-[11px] text-slate-500">New & used vehicle financing up to 60,000 $ / €</div>
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/home-loans" 
                      onClick={() => setActiveMegaMenu(null)}
                      className="block p-2 rounded-xl hover:bg-white transition-all group"
                    >
                      <div className="font-bold text-[#002855] group-hover:text-sterling-gold flex items-center justify-between">
                        <span>Home Loan (Renovation & Habitat)</span>
                        <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="text-[11px] text-slate-500">Financing up to 150,000 $ / € with terms up to 25 years</div>
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/apply" 
                      onClick={() => setActiveMegaMenu(null)}
                      className="block p-2 rounded-xl bg-gradient-to-r from-sterling-navy-deep to-sterling-navy text-white hover:shadow-md transition-all"
                    >
                      <div className="font-bold text-sterling-gold text-[11px] flex items-center justify-between">
                        <span>Private Investment & Corporate ($100k-$500M)</span>
                        <ArrowRight className="w-3 h-3 text-sterling-gold" />
                      </div>
                      <div className="text-[10px] text-slate-300">USD & EUR facilities • Fast processing</div>
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Column 3: Cards */}
              <div className="space-y-4">
                <div className="border-b border-slate-200 pb-2 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-sterling-gold" />
                  <h3 className="text-sm font-black text-[#002855] uppercase tracking-wider">Cards</h3>
                </div>
                <div className="space-y-3 text-xs text-slate-600">
                  <div className="p-3 bg-slate-50 rounded-xl hover:bg-slate-100/80 transition-colors">
                    <div className="font-bold text-[#002855]">ShopNPay Visa Debit Card</div>
                    <p className="text-[11px] text-slate-500 mt-0.5">Contactless worldwide payments with real-time zero-fee alerts.</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl hover:bg-slate-100/80 transition-colors">
                    <div className="font-bold text-[#002855]">ShopNPay Visa Prepaid Card</div>
                    <p className="text-[11px] text-slate-500 mt-0.5">Budget control card, reloadable online anytime with 3D Secure.</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl hover:bg-slate-100/80 transition-colors">
                    <div className="font-bold text-[#002855]">Digital Virtual Cards</div>
                    <p className="text-[11px] text-slate-500 mt-0.5">Instant generation in mobile app for safe online e-commerce.</p>
                  </div>
                </div>
              </div>

              {/* Column 4: Personal Trust & Advisory */}
              <div className="space-y-4">
                <div className="border-b border-slate-200 pb-2 flex items-center gap-2">
                  <Landmark className="w-5 h-5 text-sterling-gold" />
                  <h3 className="text-sm font-black text-[#002855] uppercase tracking-wider">Personal Trust</h3>
                </div>
                <div className="space-y-2 text-xs text-slate-600">
                  <p className="text-xs leading-relaxed text-slate-500">
                    Protégez et transmettez votre patrimoine sereinement grâce à nos services fiduciaires et d&apos;ingénierie patrimoniale.
                  </p>
                  <ul className="space-y-2 pt-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Living Trust & Gestion de Fortune</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Investment Management Accounts (IMA)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Unit Investment Trust Fund (UITF)</span>
                    </li>
                  </ul>
                  <div className="pt-4">
                    <Link 
                      href="/apply" 
                      onClick={() => setActiveMegaMenu(null)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-sterling-navy hover:text-sterling-gold transition-colors"
                    >
                      Prendre rendez-vous avec un conseiller <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* 2. BUSINESS MEGA MENU */}
      {activeMegaMenu === "business" && (
        <div 
          className="absolute left-0 right-0 top-full bg-white border-b-2 border-sterling-gold shadow-2xl z-40 py-8 animate-in fade-in slide-in-from-top-2 duration-150"
          onMouseEnter={() => handleMouseEnter("business")}
          onMouseLeave={handleMouseLeave}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-4 gap-8">
              
              <div className="space-y-3">
                <div className="border-b border-slate-200 pb-2 flex items-center gap-2">
                  <PiggyBank className="w-5 h-5 text-sterling-gold" />
                  <h3 className="text-sm font-black text-[#002855] uppercase tracking-wider">Business Deposit</h3>
                </div>
                <ul className="space-y-2 text-xs text-slate-600">
                  <li><Link href="/personal-loans" className="hover:text-sterling-gold transition-colors font-medium">Business Savings Account</Link></li>
                  <li><Link href="/personal-loans" className="hover:text-sterling-gold transition-colors">Duo Business Checking</Link></li>
                  <li><Link href="/personal-loans" className="hover:text-sterling-gold transition-colors font-semibold text-sterling-gold-dark">Solo Dollar & Euro Accounts (USD/EUR)</Link></li>
                  <li><Link href="/personal-loans" className="hover:text-sterling-gold transition-colors">Commercial Time Deposits</Link></li>
                </ul>
              </div>

              <div className="space-y-3">
                <div className="border-b border-slate-200 pb-2 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-sterling-gold" />
                  <h3 className="text-sm font-black text-[#002855] uppercase tracking-wider">Business Loans</h3>
                </div>
                <ul className="space-y-2 text-xs text-slate-600">
                  <li><Link href="/apply" className="hover:text-sterling-gold transition-colors font-medium">Working Capital Facilities</Link></li>
                  <li><Link href="/apply" className="hover:text-sterling-gold transition-colors font-medium">Commercial Real Estate Loans</Link></li>
                  <li><Link href="/apply" className="hover:text-sterling-gold transition-colors font-medium">Equipment & Fleet Financing</Link></li>
                  <li><Link href="/apply" className="hover:text-sterling-gold transition-colors font-bold text-emerald-700">Valid Loan Offer ($100k-$500M)</Link></li>
                </ul>
              </div>

              <div className="space-y-3">
                <div className="border-b border-slate-200 pb-2 flex items-center gap-2">
                  <SlidersHorizontal className="w-5 h-5 text-sterling-gold" />
                  <h3 className="text-sm font-black text-[#002855] uppercase tracking-wider">Optima Business Solutions</h3>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  <li><Link href="/dashboard" className="hover:text-sterling-gold transition-colors">Payroll System & Crediting</Link></li>
                  <li><Link href="/dashboard" className="hover:text-sterling-gold transition-colors">Financial & Accounting System</Link></li>
                  <li><Link href="/dashboard" className="hover:text-sterling-gold transition-colors">Check Writing & Warehousing System</Link></li>
                  <li><Link href="/dashboard" className="hover:text-sterling-gold transition-colors">Merchant Point-of-Sale (POS)</Link></li>
                  <li><Link href="/dashboard" className="hover:text-sterling-gold transition-colors">Cash Deposit Machine Services</Link></li>
                </ul>
              </div>

              <div className="space-y-3">
                <div className="border-b border-slate-200 pb-2 flex items-center gap-2">
                  <Landmark className="w-5 h-5 text-sterling-gold" />
                  <h3 className="text-sm font-black text-[#002855] uppercase tracking-wider">Corporate Trust</h3>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Institutional trusteeship, escrow arrangements, and collateral trusteeship under ACPR framework.
                </p>
                <div className="pt-2">
                  <Link 
                    href="/apply" 
                    onClick={() => setActiveMegaMenu(null)}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200 block text-xs hover:border-sterling-gold transition-colors"
                  >
                    <span className="font-bold text-[#002855] block">Optima Online Corporate Banking</span>
                    <span className="text-[11px] text-slate-500">Multi-tier approval workflows & SEPA batch payments.</span>
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* 3. INVESTMENT MEGA MENU */}
      {activeMegaMenu === "investment" && (
        <div 
          className="absolute left-0 right-0 top-full bg-white border-b-2 border-sterling-gold shadow-2xl z-40 py-8 animate-in fade-in slide-in-from-top-2 duration-150"
          onMouseEnter={() => handleMouseEnter("investment")}
          onMouseLeave={handleMouseLeave}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-3 gap-8">
              
              <div className="space-y-3">
                <div className="border-b border-slate-200 pb-2 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-sterling-gold" />
                  <h3 className="text-sm font-black text-[#002855] uppercase tracking-wider">Treasury Services</h3>
                </div>
                <ul className="space-y-2 text-xs text-slate-600">
                  <li><Link href="/apply" className="hover:text-sterling-gold transition-colors font-medium">Foreign Exchange Dealing (USD & EUR)</Link></li>
                  <li><Link href="/apply" className="hover:text-sterling-gold transition-colors">Government Securities & Sovereign Bonds</Link></li>
                  <li><Link href="/apply" className="hover:text-sterling-gold transition-colors">Corporate Fixed Income Instruments</Link></li>
                  <li><Link href="/apply" className="hover:text-sterling-gold transition-colors">Hedging & Interest Rate Derivatives</Link></li>
                </ul>
              </div>

              <div className="space-y-3">
                <div className="border-b border-slate-200 pb-2 flex items-center gap-2">
                  <Landmark className="w-5 h-5 text-sterling-gold" />
                  <h3 className="text-sm font-black text-[#002855] uppercase tracking-wider">Trust Services</h3>
                </div>
                <ul className="space-y-2 text-xs text-slate-600">
                  <li><Link href="/apply" className="hover:text-sterling-gold transition-colors">Unit Investment Trust Funds (UITF)</Link></li>
                  <li><Link href="/apply" className="hover:text-sterling-gold transition-colors">Investment Management Accounts</Link></li>
                  <li><Link href="/apply" className="hover:text-sterling-gold transition-colors">Employee Benefit & Retirement Trusts</Link></li>
                  <li><Link href="/apply" className="hover:text-sterling-gold transition-colors">Auxiliary Custodianship & Safekeeping</Link></li>
                </ul>
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                <div className="text-xs font-black text-[#002855] uppercase tracking-wider">
                  Private Investment Offering
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Registered lending facilities from <strong>$100,000 to $500,000,000</strong> available in <strong>USD ($)</strong> and <strong>Euro (€)</strong> with flexible repayment from 1 to 25 years.
                </p>
                <Link
                  href="/apply"
                  onClick={() => setActiveMegaMenu(null)}
                  className="px-4 py-2 bg-sterling-navy hover:bg-sterling-navy-light text-white text-xs font-bold rounded-xl inline-flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <span>Submit Financial Prospectus</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* 4. EBANKING MEGA MENU */}
      {activeMegaMenu === "ebanking" && (
        <div 
          className="absolute left-0 right-0 top-full bg-white border-b-2 border-sterling-gold shadow-2xl z-40 py-8 animate-in fade-in slide-in-from-top-2 duration-150"
          onMouseEnter={() => handleMouseEnter("ebanking")}
          onMouseLeave={handleMouseLeave}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-4 gap-6">
              
              <Link 
                href="/login" 
                onClick={() => setActiveMegaMenu(null)}
                className="p-4 rounded-2xl border border-slate-200 hover:border-sterling-gold hover:shadow-lg transition-all group bg-slate-50/50"
              >
                <div className="w-10 h-10 rounded-xl bg-sterling-navy/5 text-sterling-navy flex items-center justify-center group-hover:bg-[#002855] group-hover:text-sterling-gold transition-colors mb-3">
                  <Lock className="w-5 h-5" />
                </div>
                <div className="font-bold text-[#002855] text-sm">Personal Online Banking</div>
                <p className="text-xs text-slate-500 mt-1">24/7 web access to account balances, wire transfers, and loan schedules.</p>
              </Link>

              <Link 
                href="/dashboard" 
                onClick={() => setActiveMegaMenu(null)}
                className="p-4 rounded-2xl border border-slate-200 hover:border-sterling-gold hover:shadow-lg transition-all group bg-slate-50/50"
              >
                <div className="w-10 h-10 rounded-xl bg-sterling-navy/5 text-sterling-navy flex items-center justify-center group-hover:bg-[#002855] group-hover:text-sterling-gold transition-colors mb-3">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div className="font-bold text-[#002855] text-sm">Mobile Banking App</div>
                <p className="text-xs text-slate-500 mt-1">Biometric login, instant notifications, and card freeze on iOS & Android.</p>
              </Link>

              <Link 
                href="/personal-loans" 
                onClick={() => setActiveMegaMenu(null)}
                className="p-4 rounded-2xl border border-slate-200 hover:border-sterling-gold hover:shadow-lg transition-all group bg-slate-50/50"
              >
                <div className="w-10 h-10 rounded-xl bg-sterling-navy/5 text-sterling-navy flex items-center justify-center group-hover:bg-[#002855] group-hover:text-sterling-gold transition-colors mb-3">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div className="font-bold text-[#002855] text-sm">Sterling QR Pay & SEPA</div>
                <p className="text-xs text-slate-500 mt-1">Scan to pay merchants or transfer instant SEPA funds in seconds.</p>
              </Link>

              <Link 
                href="/personal-loans" 
                onClick={() => setActiveMegaMenu(null)}
                className="p-4 rounded-2xl border border-slate-200 hover:border-sterling-gold hover:shadow-lg transition-all group bg-slate-50/50"
              >
                <div className="w-10 h-10 rounded-xl bg-sterling-navy/5 text-sterling-navy flex items-center justify-center group-hover:bg-[#002855] group-hover:text-sterling-gold transition-colors mb-3">
                  <Landmark className="w-5 h-5" />
                </div>
                <div className="font-bold text-[#002855] text-sm">ATM Banking Network</div>
                <p className="text-xs text-slate-500 mt-1">Fee-free cash withdrawals & automated deposit cash machines nationwide.</p>
              </Link>

            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          INTERACTIVE SEARCH MODAL OVERLAY
          ========================================================================= */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200">
            <div className="p-4 sm:p-6 border-b border-slate-100 flex items-center gap-3">
              <Search className="w-5 h-5 text-sterling-gold shrink-0" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, loans, rates, calculator, or tracker..."
                className="w-full text-sm sm:text-base outline-none text-slate-800 placeholder-slate-400 font-medium"
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="max-h-96 overflow-y-auto p-4 divide-y divide-slate-100">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 pb-2">
                Suggested Search Results
              </div>
              {searchResults.length === 0 ? (
                <div className="p-6 text-center text-xs text-slate-400">
                  No matching services found for &quot;{searchQuery}&quot;. Try &quot;personal loans&quot;, &quot;calculator&quot;, or &quot;tracker&quot;.
                </div>
              ) : (
                searchResults.map((item, idx) => (
                  <Link
                    key={idx}
                    href={item.url}
                    onClick={() => setSearchOpen(false)}
                    className="p-3 rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-between group"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs sm:text-sm text-[#002855] group-hover:text-sterling-gold transition-colors">
                          {item.title}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-semibold">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">{item.desc}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-sterling-gold transition-colors" />
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MOBILE SLIDE-OUT DRAWER MENU
          ========================================================================= */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-4 pt-4 pb-8 space-y-4 shadow-xl max-h-[85vh] overflow-y-auto">
          
          {/* Quick Action Buttons on Top of Mobile Drawer */}
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-100">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-xl border border-[#002855] text-[#002855] font-bold text-xs flex items-center justify-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5 text-sterling-gold" />
              <span>Online Banking</span>
            </Link>
            <Link
              href="/apply"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-xl bg-sterling-gold text-sterling-navy-deep font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-sm"
            >
              <span>Apply Online</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Accordion 1: Personal */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <button
              type="button"
              onClick={() => toggleMobileCategory("personal")}
              className="w-full p-3.5 bg-slate-50 flex items-center justify-between text-xs font-bold text-[#002855]"
            >
              <span className="flex items-center gap-2">
                <PiggyBank className="w-4 h-4 text-sterling-gold" />
                Personal
              </span>
              <ChevronDown className={`w-4 h-4 transition-transform ${mobileAccordion.personal ? "rotate-180" : ""}`} />
            </button>
            {mobileAccordion.personal && (
              <div className="p-3 bg-white space-y-2 text-xs border-t border-slate-100">
                <div className="font-bold text-sterling-gold-dark text-[11px] uppercase tracking-wider">Consumer Loans</div>
                <div className="space-y-1.5 pl-2">
                  <Link href="/personal-loans" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-slate-700 hover:text-sterling-gold">
                    • Personal Loan (Persona)
                  </Link>
                  <Link href="/auto-loans" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-slate-700 hover:text-sterling-gold">
                    • Auto Loan
                  </Link>
                  <Link href="/home-loans" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-slate-700 hover:text-sterling-gold">
                    • Home Loan (Renovation)
                  </Link>
                  <Link href="/apply" onClick={() => setMobileMenuOpen(false)} className="block py-1 font-bold text-emerald-700">
                    • Private Investment ($100k-$500M in USD/EUR)
                  </Link>
                </div>

                <div className="font-bold text-sterling-gold-dark text-[11px] uppercase tracking-wider pt-2">Deposit & Accounts</div>
                <div className="space-y-1.5 pl-2">
                  <Link href="/personal-loans" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-slate-700">
                    • Solo Savings Account (USD / EUR)
                  </Link>
                  <Link href="/personal-loans" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-slate-700">
                    • Duo Checking Account
                  </Link>
                  <Link href="/personal-loans" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-slate-700">
                    • Time Deposits
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Accordion 2: Business */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <button
              type="button"
              onClick={() => toggleMobileCategory("business")}
              className="w-full p-3.5 bg-slate-50 flex items-center justify-between text-xs font-bold text-[#002855]"
            >
              <span className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-sterling-gold" />
                Business
              </span>
              <ChevronDown className={`w-4 h-4 transition-transform ${mobileAccordion.business ? "rotate-180" : ""}`} />
            </button>
            {mobileAccordion.business && (
              <div className="p-3 bg-white space-y-2 text-xs border-t border-slate-100 pl-4">
                <Link href="/apply" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-slate-700">
                  • Business Loans & Commercial Financing
                </Link>
                <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-slate-700">
                  • Optima Payroll & Cash Solutions
                </Link>
                <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-slate-700">
                  • Corporate Trust Services
                </Link>
              </div>
            )}
          </div>

          {/* Accordion 3: Investment */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <button
              type="button"
              onClick={() => toggleMobileCategory("investment")}
              className="w-full p-3.5 bg-slate-50 flex items-center justify-between text-xs font-bold text-[#002855]"
            >
              <span className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-sterling-gold" />
                Investment
              </span>
              <ChevronDown className={`w-4 h-4 transition-transform ${mobileAccordion.investment ? "rotate-180" : ""}`} />
            </button>
            {mobileAccordion.investment && (
              <div className="p-3 bg-white space-y-2 text-xs border-t border-slate-100 pl-4">
                <Link href="/apply" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-slate-700">
                  • Treasury & Forex Dealing (USD/EUR)
                </Link>
                <Link href="/apply" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-slate-700">
                  • Unit Investment Trust Funds (UITF)
                </Link>
              </div>
            )}
          </div>

          {/* Accordion 4: eBanking */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <button
              type="button"
              onClick={() => toggleMobileCategory("ebanking")}
              className="w-full p-3.5 bg-slate-50 flex items-center justify-between text-xs font-bold text-[#002855]"
            >
              <span className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-sterling-gold" />
                eBanking
              </span>
              <ChevronDown className={`w-4 h-4 transition-transform ${mobileAccordion.ebanking ? "rotate-180" : ""}`} />
            </button>
            {mobileAccordion.ebanking && (
              <div className="p-3 bg-white space-y-2 text-xs border-t border-slate-100 pl-4">
                <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-slate-700">
                  • Online Banking Portal
                </Link>
                <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-slate-700">
                  • Mobile App Features
                </Link>
                <Link href="/tracker" onClick={() => setMobileMenuOpen(false)} className="block py-1 font-bold text-sterling-navy">
                  • Dossier Tracking Portal
                </Link>
              </div>
            )}
          </div>

          {/* Direct Secondary Links */}
          <div className="pt-2 border-t border-slate-100 space-y-1 text-xs">
            <a href="/#calculator" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 text-slate-600 hover:text-sterling-navy">
              Simulateur de Mensualités (Calculator)
            </a>
            <Link href="/tracker" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 text-slate-600 hover:text-sterling-navy">
              Suivi de Demande en Direct (Tracker)
            </Link>
            <a href="https://wa.me/?text=Hello%20I%20am%20interested%20in%20your%20Loan%20Offer" target="_blank" rel="noreferrer" className="block py-1.5 text-emerald-600 font-bold">
              Assistance Directe WhatsApp
            </a>
          </div>

        </div>
      )}

    </header>
  );
}
