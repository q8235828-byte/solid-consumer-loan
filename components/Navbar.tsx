"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import BrandLogo from "@/components/BrandLogo";
import GoogleTranslate from "@/components/GoogleTranslate";
import { useLanguage } from "@/lib/LanguageContext";
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

interface NavbarProps {
  onOpenApply?: (loanType?: string) => void;
}

export default function Navbar({ onOpenApply }: NavbarProps) {
  const { language, setLanguage, isFrench, t } = useLanguage();
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
    { 
      title: isFrench ? "Prêt Personnel (Persona)" : "Persona Personal Loan", 
      url: "/personal-loans", 
      category: isFrench ? "Crédits" : "Credit", 
      desc: isFrench ? "Financement personnel de 100 000 $ à 500 000 000 $ en USD/EUR." : "Personal financing from $100,000 to $500,000,000 in USD/EUR." 
    },
    { 
      title: isFrench ? "Prêt Auto & Mobilité" : "Auto & Vehicle Loan", 
      url: "/auto-loans", 
      category: isFrench ? "Crédits" : "Credit", 
      desc: isFrench ? "Financement jusqu'à 100% pour véhicules neufs et d'occasion." : "New and pre-owned vehicle financing up to 100%." 
    },
    { 
      title: isFrench ? "Prêt Immobilier & Rénovation" : "Home & Real Estate Loan", 
      url: "/home-loans", 
      category: isFrench ? "Crédits" : "Credit", 
      desc: isFrench ? "Financement de construction et rénovation jusqu'à 25 ans." : "Construction and renovation funding up to 25 years." 
    },
    { 
      title: isFrench ? "Investissement Privé & Financement Entreprise" : "Private Investment & Corporate Lending", 
      url: "/apply", 
      category: isFrench ? "Entreprises" : "Corporate", 
      desc: isFrench ? "Financement de 100k$ à 500M$ avec durées de 1 à 25 ans." : "Financing from $100k to $500M with terms from 1 to 25 years." 
    },
    { 
      title: isFrench ? "Simulateur de Mensualités de Prêt" : "Interactive Loan Calculator", 
      url: "/#calculator", 
      category: isFrench ? "Outils" : "Tools", 
      desc: isFrench ? "Simulez vos mensualités en USD ($) et Euro (€)." : "Calculate monthly amortizations in USD ($) and Euro (€)." 
    },
    { 
      title: isFrench ? "Suivi de Demande en Direct" : "Live Application Tracker", 
      url: "/tracker", 
      category: isFrench ? "Services" : "Services", 
      desc: isFrench ? "Suivez votre dossier de financement en temps réel." : "Track your credit dossier in real time." 
    },
    { 
      title: isFrench ? "Espace Client Sécurisé" : "Secure Client Portal", 
      url: "/dashboard", 
      category: isFrench ? "Portail" : "Portal", 
      desc: isFrench ? "Accédez à vos relevés, échéanciers et conseiller dédié." : "Access balances, wire transfers, and dedicated advisor." 
    },
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
      <div className="bg-[#002244] text-slate-200 text-xs py-1.5 sm:py-2 px-3 sm:px-6 lg:px-8 border-b border-slate-700/60 overflow-hidden">
        <div className="max-w-7xl mx-auto flex justify-between items-center gap-2">
          
          {/* Secondary Nav Links (About Us, Calculator, Careers, ATMs, Contact) */}
          <nav aria-label="Menu Secondaire" className="hidden lg:flex items-center gap-5 text-[11px] font-medium tracking-wide">
            <Link href="/" className="hover:text-sterling-gold transition-colors">
              {t("À Propos", "About Us")}
            </Link>
            <span className="text-slate-500">|</span>
            <a href="/#calculator" className="hover:text-sterling-gold transition-colors">
              {t("Simulateur de Prêt", "Loan Calculator")}
            </a>
            <span className="text-slate-500">|</span>
            <a 
              href="https://loancommercialgroup.com/careers" 
              target="_blank" 
              rel="noreferrer" 
              className="hover:text-sterling-gold transition-colors inline-flex items-center gap-1"
            >
              {t("Carrières", "Careers")} <ExternalLink className="w-2.5 h-2.5 opacity-70" />
            </a>
            <span className="text-slate-500">|</span>
            <Link href="/personal-loans" className="hover:text-sterling-gold transition-colors">
              {t("Agences & Distributeurs", "Branches & ATMs")}
            </Link>
            <span className="text-slate-500">|</span>
            <a href="mailto:customer.experience@loancommercialgroup.com" className="hover:text-sterling-gold transition-colors">
              {t("Contactez-nous", "Contact Us")}
            </a>
            <span className="text-slate-500">|</span>
            <a 
              href="https://wa.me/?text=Bonjour%2C%20je%20suis%20int%C3%A9ress%C3%A9%28e%29%20par%20votre%20offre%20de%20financement." 
              target="_blank" 
              rel="noreferrer" 
              className="text-emerald-400 hover:text-emerald-300 font-bold transition-colors inline-flex items-center gap-1"
            >
              {t("Support WhatsApp", "WhatsApp Support")}
            </a>
          </nav>

          {/* Quick Notice on Mobile */}
          <div className="lg:hidden text-[10px] sm:text-[11px] font-semibold text-sterling-gold-light truncate min-w-0 pr-1">
            <span className="hidden xs:inline">Loan Commercial Group • </span>
            {t("Investissement Privé & Prêts", "Private Investment & Lending")}
          </div>

          {/* Secondary Right: Currency, Search, Language, Auth */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Search Toggle Button */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/10 hover:bg-white/15 text-slate-200 hover:text-white transition-colors text-[11px]"
              aria-label={t("Recherche sur le site", "Search website")}
            >
              <Search className="w-3.5 h-3.5 text-sterling-gold" />
              <span>{t("Recherche", "Search")}</span>
            </button>

            <span className="text-slate-600 hidden sm:inline">|</span>

            {/* Currency Badge: USD & EUR Only */}
            <span className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-0.5 rounded-full bg-sterling-gold/20 text-sterling-gold font-bold text-[9px] sm:text-[10px] border border-sterling-gold/30 whitespace-nowrap shrink-0">
              {t("USD ($) & EUR (€) Uniquement", "USD ($) & EUR (€) Exclusively")}
            </span>

            {/* Language Selector */}
            <GoogleTranslate />
          </div>

        </div>
      </div>

      {/* =========================================================================
          MAIN TIER: BRAND LOGO + PRIMARY NAVIGATION + ONLINE BANKING CTA
          ========================================================================= */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2">
          
          {/* Official Loan Commercial Group Brand Logo */}
          <div className="flex items-center shrink-0 pr-1 sm:pr-2 min-w-0">
            <BrandLogo variant="dark" size="md" />
          </div>

          {/* Desktop Primary Navigation Bar */}
          <nav 
            role="navigation" 
            aria-label="Navigation principale" 
            className="hidden lg:flex items-center gap-8 text-[15px] font-bold text-[#002855]"
            onMouseLeave={handleMouseLeave}
          >
            {/* Category 1: Particuliers */}
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
                <span>{t("Particuliers", "Personal")}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeMegaMenu === "personal" ? "rotate-180 text-sterling-gold" : "text-slate-400"}`} />
              </button>
            </div>

            {/* Category 2: Entreprises */}
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
                <span>{t("Entreprises", "Business")}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeMegaMenu === "business" ? "rotate-180 text-sterling-gold" : "text-slate-400"}`} />
              </button>
            </div>

            {/* Category 3: Investissement */}
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
                <span>{t("Investissement", "Investment")}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeMegaMenu === "investment" ? "rotate-180 text-sterling-gold" : "text-slate-400"}`} />
              </button>
            </div>

            {/* Category 4: Banque en Ligne */}
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
                <span>{t("Banque en Ligne", "Online Banking")}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeMegaMenu === "ebanking" ? "rotate-180 text-sterling-gold" : "text-slate-400"}`} />
              </button>
            </div>
          </nav>

          {/* Action CTAs: Espace Client Dropdown + Demande en Ligne */}
          <div className="hidden sm:flex items-center gap-3">
            
            {/* Secure Online Banking Login Trigger */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setOnlineBankingOpen(!onlineBankingOpen)}
                className="px-4 py-2.5 rounded-xl border-2 border-[#002855] text-[#002855] hover:bg-[#002855] hover:text-white font-extrabold text-xs sm:text-sm transition-all flex items-center gap-2 shadow-sm"
              >
                <Lock className="w-4 h-4 text-sterling-gold" />
                <span>{t("Espace Client", "Client Portal")}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${onlineBankingOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Online Banking Popover Submenu */}
              {onlineBankingOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setOnlineBankingOpen(false)} />
                  <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 p-4 space-y-3 animate-in fade-in zoom-in-95">
                    <div className="border-b border-slate-100 pb-2">
                      <div className="text-xs font-black text-[#002855] uppercase tracking-wider">
                        {t("Portail Bancaire Sécurisé", "Secure Banking Portal")}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {t("Chiffrement SSL 256-Bit • Conforme eIDAS", "256-Bit SSL Encryption • eIDAS Compliant")}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="p-3 bg-slate-50 rounded-xl hover:bg-amber-50/50 border border-slate-100 transition-colors">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-xs text-[#002855]">{t("Banque des Particuliers", "Retail Banking")}</span>
                          <span className="text-[10px] text-emerald-600 font-bold bg-emerald-100 px-2 py-0.5 rounded-full">{t("Particuliers", "Personal")}</span>
                        </div>
                        <div className="flex flex-col gap-1 text-[11px]">
                          <Link 
                            href="/login" 
                            onClick={() => setOnlineBankingOpen(false)}
                            className="text-sterling-navy hover:text-sterling-gold font-semibold flex items-center justify-between"
                          >
                            <span>{t("Connexion Espace Client", "Client Portal Login")}</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                          <Link 
                            href="/register" 
                            onClick={() => setOnlineBankingOpen(false)}
                            className="text-slate-500 hover:text-slate-800"
                          >
                            {t("Nouveau client ? Ouvrir un compte", "New client? Open an account")}
                          </Link>
                        </div>
                      </div>

                      <div className="p-3 bg-slate-50 rounded-xl hover:bg-slate-100/70 border border-slate-100 transition-colors">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-xs text-[#002855]">{t("Entreprises & Institutionnels", "Corporate & Institutional")}</span>
                          <span className="text-[10px] text-indigo-600 font-bold bg-indigo-100 px-2 py-0.5 rounded-full">{t("Entreprises", "Corporate")}</span>
                        </div>
                        <Link 
                          href="/login" 
                          onClick={() => setOnlineBankingOpen(false)}
                          className="text-xs text-slate-700 hover:text-sterling-navy font-semibold flex items-center justify-between mt-1"
                        >
                          <span>{t("Accès Portail Optima", "Optima Portal Access")}</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>

                      <div className="pt-1">
                        <Link
                          href="/tracker"
                          onClick={() => setOnlineBankingOpen(false)}
                          className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg block text-center transition-colors"
                        >
                          {t("Suivre ma Demande de Prêt", "Track Loan Application")}
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
              <span>{t("Demande en Ligne", "Apply Online")}</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </Link>

          </div>

          {/* Mobile Right Controls: Search Icon + Hamburger Toggle */}
          <div className="flex items-center gap-1 sm:gap-2 lg:hidden shrink-0">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="p-1.5 sm:p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5 sm:w-6 sm:h-6 text-[#002855]" />
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 sm:p-2 rounded-xl text-slate-800 hover:bg-slate-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 sm:w-7 sm:h-7 text-[#002855]" /> : <Menu className="w-6 h-6 sm:w-7 sm:h-7 text-[#002855]" />}
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
                  <h3 className="text-sm font-black text-[#002855] uppercase tracking-wider">Dépôts & Épargne</h3>
                </div>
                <div className="space-y-2.5 text-xs text-slate-600">
                  <div className="font-bold text-[#002855] text-xs pt-1">Comptes d'Épargne</div>
                  <ul className="space-y-1.5 pl-2 border-l border-slate-100">
                    <li><Link href="/personal-loans" className="hover:text-sterling-gold transition-colors">Compte Épargne Solo</Link></li>
                    <li><Link href="/personal-loans" className="hover:text-sterling-gold transition-colors">Compte Épargne Solo Essentiel</Link></li>
                    <li><Link href="/personal-loans" className="hover:text-sterling-gold transition-colors font-medium text-sterling-gold-dark">Compte Épargne Dollar (USD)</Link></li>
                    <li><Link href="/personal-loans" className="hover:text-sterling-gold transition-colors">Compte Épargne Euro (EUR)</Link></li>
                    <li><Link href="/personal-loans" className="hover:text-sterling-gold transition-colors">Compte Neo Épargne Jeunes</Link></li>
                    <li><Link href="/personal-loans" className="hover:text-sterling-gold transition-colors">Compte Épargne Diaspora OFW</Link></li>
                  </ul>
                  <div className="font-bold text-[#002855] text-xs pt-1">Comptes Chèques & Dépôts à Terme</div>
                  <ul className="space-y-1.5 pl-2 border-l border-slate-100">
                    <li><Link href="/personal-loans" className="hover:text-sterling-gold transition-colors">Compte Chèques Duo</Link></li>
                    <li><Link href="/personal-loans" className="hover:text-sterling-gold transition-colors">Dépôt à Terme Prima (Court Terme)</Link></li>
                    <li><Link href="/personal-loans" className="hover:text-sterling-gold transition-colors">Dépôt à Terme Maxima 3 & 5 Ans</Link></li>
                  </ul>
                </div>
              </div>

              {/* Column 2: Loans (Featured Category) */}
              <div className="space-y-4 bg-amber-50/40 p-4 rounded-2xl border border-sterling-gold/30">
                <div className="border-b border-sterling-gold/40 pb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Percent className="w-5 h-5 text-sterling-gold" />
                    <h3 className="text-sm font-black text-[#002855] uppercase tracking-wider">Prêts aux Particuliers</h3>
                  </div>
                  <span className="text-[10px] font-extrabold bg-sterling-gold text-sterling-navy-deep px-2 py-0.5 rounded-full">ACCORD RAPIDE</span>
                </div>
                <ul className="space-y-2 text-xs">
                  <li>
                    <Link 
                      href="/personal-loans" 
                      onClick={() => setActiveMegaMenu(null)}
                      className="block p-2 rounded-xl hover:bg-white transition-all group"
                    >
                      <div className="font-bold text-[#002855] group-hover:text-sterling-gold flex items-center justify-between">
                        <span>Prêt Personnel (Persona)</span>
                        <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="text-[11px] text-slate-500">Financement de 100 000 $ à 500 000 000 $ • TAEG fixe de 2,85%</div>
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/auto-loans" 
                      onClick={() => setActiveMegaMenu(null)}
                      className="block p-2 rounded-xl hover:bg-white transition-all group"
                    >
                      <div className="font-bold text-[#002855] group-hover:text-sterling-gold flex items-center justify-between">
                        <span>Prêt Auto & Mobilité</span>
                        <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="text-[11px] text-slate-500">Véhicules neufs & occasion jusqu'à 60 000 $ / €</div>
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/home-loans" 
                      onClick={() => setActiveMegaMenu(null)}
                      className="block p-2 rounded-xl hover:bg-white transition-all group"
                    >
                      <div className="font-bold text-[#002855] group-hover:text-sterling-gold flex items-center justify-between">
                        <span>Prêt Habitat & Rénovation</span>
                        <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="text-[11px] text-slate-500">Financement jusqu'à 150 000 $ / € sur une durée maximale de 25 ans</div>
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/apply" 
                      onClick={() => setActiveMegaMenu(null)}
                      className="block p-2 rounded-xl bg-gradient-to-r from-sterling-navy-deep to-sterling-navy text-white hover:shadow-md transition-all"
                    >
                      <div className="font-bold text-sterling-gold text-[11px] flex items-center justify-between">
                        <span>Investissement Privé & Entreprise (100k$-500M$)</span>
                        <ArrowRight className="w-3 h-3 text-sterling-gold" />
                      </div>
                      <div className="text-[10px] text-slate-300">Facilités en USD et EUR • Traitement accéléré</div>
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Column 3: Cards */}
              <div className="space-y-4">
                <div className="border-b border-slate-200 pb-2 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-sterling-gold" />
                  <h3 className="text-sm font-black text-[#002855] uppercase tracking-wider">Cartes Bancaires</h3>
                </div>
                <div className="space-y-3 text-xs text-slate-600">
                  <div className="p-3 bg-slate-50 rounded-xl hover:bg-slate-100/80 transition-colors">
                    <div className="font-bold text-[#002855]">Carte Débit Visa ShopNPay</div>
                    <p className="text-[11px] text-slate-500 mt-0.5">Paiements sans contact mondiaux avec alertes instantanées sans frais.</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl hover:bg-slate-100/80 transition-colors">
                    <div className="font-bold text-[#002855]">Carte Prépayée Visa ShopNPay</div>
                    <p className="text-[11px] text-slate-500 mt-0.5">Maîtrise budgétaire, rechargeable en ligne 24/7 avec 3D Secure.</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl hover:bg-slate-100/80 transition-colors">
                    <div className="font-bold text-[#002855]">Cartes Virtuelles Numériques</div>
                    <p className="text-[11px] text-slate-500 mt-0.5">Génération immédiate dans l'application mobile pour achats sécurisés.</p>
                  </div>
                </div>
              </div>

              {/* Column 4: Personal Trust & Advisory */}
              <div className="space-y-4">
                <div className="border-b border-slate-200 pb-2 flex items-center gap-2">
                  <Landmark className="w-5 h-5 text-sterling-gold" />
                  <h3 className="text-sm font-black text-[#002855] uppercase tracking-wider">Gestion Privée & Fiducie</h3>
                </div>
                <div className="space-y-2 text-xs text-slate-600">
                  <p className="text-xs leading-relaxed text-slate-500">
                    Protégez et valorisez vos avoirs grâce à nos solutions institutionnelles de gestion de patrimoine et de fiducie privée.
                  </p>
                  <ul className="space-y-2 pt-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Fiducie Patrimoniale & Gestion Privée</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Comptes de Gestion d'Investissement (IMA)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Fonds Fiduciaire de Placement Collectif (UITF)</span>
                    </li>
                  </ul>
                  <div className="pt-4">
                    <Link 
                      href="/apply" 
                      onClick={() => setActiveMegaMenu(null)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-sterling-navy hover:text-sterling-gold transition-colors"
                    >
                      Consulter un conseiller patrimonial dédié <ArrowRight className="w-3.5 h-3.5" />
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
                  <h3 className="text-sm font-black text-[#002855] uppercase tracking-wider">Dépôts Professionnels</h3>
                </div>
                <ul className="space-y-2 text-xs text-slate-600">
                  <li><Link href="/personal-loans" className="hover:text-sterling-gold transition-colors font-medium">Compte Épargne Entreprise</Link></li>
                  <li><Link href="/personal-loans" className="hover:text-sterling-gold transition-colors">Compte Chèques Duo Entreprise</Link></li>
                  <li><Link href="/personal-loans" className="hover:text-sterling-gold transition-colors font-semibold text-sterling-gold-dark">Comptes Solo Dollar & Euro (USD/EUR)</Link></li>
                  <li><Link href="/personal-loans" className="hover:text-sterling-gold transition-colors">Dépôts à Terme Commerciaux</Link></li>
                </ul>
              </div>

              <div className="space-y-3">
                <div className="border-b border-slate-200 pb-2 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-sterling-gold" />
                  <h3 className="text-sm font-black text-[#002855] uppercase tracking-wider">Prêts Professionnels</h3>
                </div>
                <ul className="space-y-2 text-xs text-slate-600">
                  <li><Link href="/apply" className="hover:text-sterling-gold transition-colors font-medium">Lignes de Fonds de Roulement</Link></li>
                  <li><Link href="/apply" className="hover:text-sterling-gold transition-colors font-medium">Prêts Immobiliers Commerciaux</Link></li>
                  <li><Link href="/apply" className="hover:text-sterling-gold transition-colors font-medium">Financement d'Équipements & Flottes</Link></li>
                  <li><Link href="/apply" className="hover:text-sterling-gold transition-colors font-bold text-emerald-700">Offre de Prêt Validée (100k$ - 500M$)</Link></li>
                </ul>
              </div>

              <div className="space-y-3">
                <div className="border-b border-slate-200 pb-2 flex items-center gap-2">
                  <SlidersHorizontal className="w-5 h-5 text-sterling-gold" />
                  <h3 className="text-sm font-black text-[#002855] uppercase tracking-wider">Solutions Optima Entreprises</h3>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  <li><Link href="/dashboard" className="hover:text-sterling-gold transition-colors">Gestion de Paie & Virements de Salaires</Link></li>
                  <li><Link href="/dashboard" className="hover:text-sterling-gold transition-colors">Système Comptable & Trésorerie</Link></li>
                  <li><Link href="/dashboard" className="hover:text-sterling-gold transition-colors">Émission & Traitement Sécurisé des Chèques</Link></li>
                  <li><Link href="/dashboard" className="hover:text-sterling-gold transition-colors">Terminaux de Paiement Électronique (TPE)</Link></li>
                  <li><Link href="/dashboard" className="hover:text-sterling-gold transition-colors">Automates de Dépôt d'Espèces</Link></li>
                </ul>
              </div>

              <div className="space-y-3">
                <div className="border-b border-slate-200 pb-2 flex items-center gap-2">
                  <Landmark className="w-5 h-5 text-sterling-gold" />
                  <h3 className="text-sm font-black text-[#002855] uppercase tracking-wider">Fiducie d'Entreprise</h3>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Fiducie institutionnelle, comptes séquestres et gestion de garanties collatérales sous cadre ACPR.
                </p>
                <div className="pt-2">
                  <Link 
                    href="/apply" 
                    onClick={() => setActiveMegaMenu(null)}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200 block text-xs hover:border-sterling-gold transition-colors"
                  >
                    <span className="font-bold text-[#002855] block">Optima Banque en Ligne Entreprise</span>
                    <span className="text-[11px] text-slate-500">Circuits de validation multi-niveaux & virements SEPA groupés.</span>
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
                  <h3 className="text-sm font-black text-[#002855] uppercase tracking-wider">Services de Trésorerie</h3>
                </div>
                <ul className="space-y-2 text-xs text-slate-600">
                  <li><Link href="/apply" className="hover:text-sterling-gold transition-colors font-medium">Opérations de Change & Devises (USD & EUR)</Link></li>
                  <li><Link href="/apply" className="hover:text-sterling-gold transition-colors">Titres Publics & Obligations Souveraines</Link></li>
                  <li><Link href="/apply" className="hover:text-sterling-gold transition-colors">Instruments Obligataires d'Entreprise</Link></li>
                  <li><Link href="/apply" className="hover:text-sterling-gold transition-colors">Couverture & Dérivés de Taux d'Intérêt</Link></li>
                </ul>
              </div>

              <div className="space-y-3">
                <div className="border-b border-slate-200 pb-2 flex items-center gap-2">
                  <Landmark className="w-5 h-5 text-sterling-gold" />
                  <h3 className="text-sm font-black text-[#002855] uppercase tracking-wider">Services Fiduciaires</h3>
                </div>
                <ul className="space-y-2 text-xs text-slate-600">
                  <li><Link href="/apply" className="hover:text-sterling-gold transition-colors">Fonds Fiduciaires de Placement Collectif (UITF)</Link></li>
                  <li><Link href="/apply" className="hover:text-sterling-gold transition-colors">Comptes de Gestion d'Investissement Dédiés</Link></li>
                  <li><Link href="/apply" className="hover:text-sterling-gold transition-colors">Fonds de Retraite & Avantages Collaborateurs</Link></li>
                  <li><Link href="/apply" className="hover:text-sterling-gold transition-colors">Conservation d'Actifs & Dépôt Sécurisé</Link></li>
                </ul>
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                <div className="text-xs font-black text-[#002855] uppercase tracking-wider">
                  Offre d'Investissement Privé
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Facilités de financement enregistrées de <strong>100 000 $ à 500 000 000 $</strong> disponibles en <strong>USD ($)</strong> et <strong>Euro (€)</strong> avec remboursement modulable de 1 à 25 ans.
                </p>
                <Link
                  href="/apply"
                  onClick={() => setActiveMegaMenu(null)}
                  className="px-4 py-2 bg-sterling-navy hover:bg-sterling-navy-light text-white text-xs font-bold rounded-xl inline-flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <span>Soumettre une Proposition Financière</span>
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
                <div className="font-bold text-[#002855] text-sm">Espace Client Particuliers</div>
                <p className="text-xs text-slate-500 mt-1">Accès web 24/7 aux soldes, virements bancaires et échéanciers de prêt.</p>
              </Link>

              <Link 
                href="/dashboard" 
                onClick={() => setActiveMegaMenu(null)}
                className="p-4 rounded-2xl border border-slate-200 hover:border-sterling-gold hover:shadow-lg transition-all group bg-slate-50/50"
              >
                <div className="w-10 h-10 rounded-xl bg-sterling-navy/5 text-sterling-navy flex items-center justify-center group-hover:bg-[#002855] group-hover:text-sterling-gold transition-colors mb-3">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div className="font-bold text-[#002855] text-sm">Application Mobile</div>
                <p className="text-xs text-slate-500 mt-1">Connexion biométrique, alertes en temps réel et verrouillage de carte sur iOS & Android.</p>
              </Link>

              <Link 
                href="/personal-loans" 
                onClick={() => setActiveMegaMenu(null)}
                className="p-4 rounded-2xl border border-slate-200 hover:border-sterling-gold hover:shadow-lg transition-all group bg-slate-50/50"
              >
                <div className="w-10 h-10 rounded-xl bg-sterling-navy/5 text-sterling-navy flex items-center justify-center group-hover:bg-[#002855] group-hover:text-sterling-gold transition-colors mb-3">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div className="font-bold text-[#002855] text-sm">Paiements QR & SEPA</div>
                <p className="text-xs text-slate-500 mt-1">Payez vos commerçants ou émettez des virements SEPA instantanés en quelques secondes.</p>
              </Link>

              <Link 
                href="/personal-loans" 
                onClick={() => setActiveMegaMenu(null)}
                className="p-4 rounded-2xl border border-slate-200 hover:border-sterling-gold hover:shadow-lg transition-all group bg-slate-50/50"
              >
                <div className="w-10 h-10 rounded-xl bg-sterling-navy/5 text-sterling-navy flex items-center justify-center group-hover:bg-[#002855] group-hover:text-sterling-gold transition-colors mb-3">
                  <Landmark className="w-5 h-5" />
                </div>
                <div className="font-bold text-[#002855] text-sm">Réseau de Distributeurs</div>
                <p className="text-xs text-slate-500 mt-1">Retraits d'espèces sans commission et automates de dépôt dans l'ensemble du réseau.</p>
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
                placeholder="Rechercher des produits, prêts, simulateur ou suivi de dossier..."
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
                Résultats Suggérés
              </div>
              {searchResults.length === 0 ? (
                <div className="p-6 text-center text-xs text-slate-400">
                  Aucun service correspondant trouvé pour &quot;{searchQuery}&quot;. Essayez &quot;prêt personnel&quot;, &quot;simulateur&quot; ou &quot;suivi&quot;.
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
              <span>Espace Client</span>
            </Link>
            <Link
              href="/apply"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-xl bg-sterling-gold text-sterling-navy-deep font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-sm"
            >
              <span>Demande en Ligne</span>
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
                Particuliers
              </span>
              <ChevronDown className={`w-4 h-4 transition-transform ${mobileAccordion.personal ? "rotate-180" : ""}`} />
            </button>
            {mobileAccordion.personal && (
              <div className="p-3 bg-white space-y-2 text-xs border-t border-slate-100">
                <div className="font-bold text-sterling-gold-dark text-[11px] uppercase tracking-wider">Prêts aux Particuliers</div>
                <div className="space-y-1.5 pl-2">
                  <Link href="/personal-loans" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-slate-700 hover:text-sterling-gold">
                    • Prêt Personnel (Persona)
                  </Link>
                  <Link href="/auto-loans" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-slate-700 hover:text-sterling-gold">
                    • Prêt Auto & Mobilité
                  </Link>
                  <Link href="/home-loans" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-slate-700 hover:text-sterling-gold">
                    • Prêt Habitat & Rénovation
                  </Link>
                  <Link href="/apply" onClick={() => setMobileMenuOpen(false)} className="block py-1 font-bold text-emerald-700">
                    • Investissement Privé (100k$ - 500M$ en USD/EUR)
                  </Link>
                </div>

                <div className="font-bold text-sterling-gold-dark text-[11px] uppercase tracking-wider pt-2">Dépôts & Comptes</div>
                <div className="space-y-1.5 pl-2">
                  <Link href="/personal-loans" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-slate-700">
                    • Compte Épargne Solo (USD / EUR)
                  </Link>
                  <Link href="/personal-loans" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-slate-700">
                    • Compte Chèques Duo
                  </Link>
                  <Link href="/personal-loans" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-slate-700">
                    • Dépôts à Terme
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
                Entreprises
              </span>
              <ChevronDown className={`w-4 h-4 transition-transform ${mobileAccordion.business ? "rotate-180" : ""}`} />
            </button>
            {mobileAccordion.business && (
              <div className="p-3 bg-white space-y-2 text-xs border-t border-slate-100 pl-4">
                <Link href="/apply" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-slate-700">
                  • Prêts Professionnels & Financement Commercial
                </Link>
                <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-slate-700">
                  • Gestion de Paie & Solutions de Trésorerie Optima
                </Link>
                <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-slate-700">
                  • Services Fiduciaires d'Entreprise
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
                Investissement
              </span>
              <ChevronDown className={`w-4 h-4 transition-transform ${mobileAccordion.investment ? "rotate-180" : ""}`} />
            </button>
            {mobileAccordion.investment && (
              <div className="p-3 bg-white space-y-2 text-xs border-t border-slate-100 pl-4">
                <Link href="/apply" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-slate-700">
                  • Trésorerie & Opérations de Change (USD/EUR)
                </Link>
                <Link href="/apply" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-slate-700">
                  • Fonds Fiduciaires de Placement Collectif (UITF)
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
                Banque en Ligne
              </span>
              <ChevronDown className={`w-4 h-4 transition-transform ${mobileAccordion.ebanking ? "rotate-180" : ""}`} />
            </button>
            {mobileAccordion.ebanking && (
              <div className="p-3 bg-white space-y-2 text-xs border-t border-slate-100 pl-4">
                <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-slate-700">
                  • Portail Espace Client Sécurisé
                </Link>
                <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-slate-700">
                  • Fonctionnalités Application Mobile
                </Link>
                <Link href="/tracker" onClick={() => setMobileMenuOpen(false)} className="block py-1 font-bold text-sterling-navy">
                  • Portail de Suivi de Demande en Direct
                </Link>
              </div>
            )}
          </div>

          {/* Direct Secondary Links */}
          <div className="pt-2 border-t border-slate-100 space-y-1 text-xs">
            <a href="/#calculator" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 text-slate-600 hover:text-sterling-navy">
              Simulateur & Calculateur de Prêt
            </a>
            <Link href="/tracker" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 text-slate-600 hover:text-sterling-navy">
              Suivi de Demande en Direct
            </Link>
            <a href="https://wa.me/?text=Bonjour%2C%20je%20suis%20int%C3%A9ress%C3%A9%28e%29%20par%20votre%20offre%20de%20financement." target="_blank" rel="noreferrer" className="block py-1.5 text-emerald-600 font-bold">
              Support WhatsApp Direct
            </a>
          </div>

        </div>
      )}

    </header>
  );
}
