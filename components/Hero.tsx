"use client";

import React from "react";
import { 
  CheckCircle,
  FileCheck2,
  TrendingDown,
  Clock,
  Star,
  ShieldCheck
} from "lucide-react";
import LoanCalculator from "./LoanCalculator";

interface HeroProps {
  onOpenApply?: (loanType?: string) => void;
}

export default function Hero({ onOpenApply }: HeroProps) {
  return (
    <section className="relative bg-gradient-to-b from-sterling-navy-deep via-sterling-navy to-[#03234D] text-white pt-8 pb-20 overflow-hidden">
      {/* Decorative background glow accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-sterling-gold/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline, Real Person Profile & Key USPs */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 bg-sterling-gold/15 border border-sterling-gold/30 px-3.5 py-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-sterling-gold animate-pulse" />
              <span className="text-xs font-bold text-sterling-gold uppercase tracking-wider">
                Crédit en ligne rapide & 100% sécurisé en France
              </span>
            </div>

            {/* Bold Banking Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] font-display text-white">
              Financez vos projets en toute{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sterling-gold via-sterling-gold-light to-amber-200">
                Sérénité
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed">
              Obtenez votre prêt personnel, auto ou travaux avec **Sterling Bank France**. Simulez votre mensualité sans engagement, signez votre contrat en ligne et recevez vos fonds sous 48h.
            </p>

            {/* Real Human Trust Card with Authentic Photo */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 flex items-center gap-4 max-w-xl">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=160&q=80"
                alt="Émilie Bernard - Conseillère Sterling Bank France"
                className="w-14 h-14 rounded-full object-cover ring-2 ring-sterling-gold shrink-0 shadow-md"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">Émilie Bernard</span>
                  <span className="text-[10px] text-sterling-gold bg-sterling-navy-deep px-2 py-0.5 rounded-full border border-sterling-gold/30 font-semibold">
                    Conseillère Crédit Particuliers • Paris
                  </span>
                </div>
                <p className="text-xs text-slate-200 italic">
                  &ldquo;Une démarche 100% humaine et digitalisée : nos conseillers parisiens vous accompagnent à chaque étape de votre crédit.&rdquo;
                </p>
                <div className="flex items-center gap-1.5 text-[11px] text-amber-300 font-semibold">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400 stroke-none" />
                    ))}
                  </div>
                  <span>4.9/5 basé sur 4 820+ avis clients vérifiés</span>
                </div>
              </div>
            </div>

            {/* Key Benefits Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
                <div className="w-8 h-8 rounded-lg bg-sterling-gold/20 flex items-center justify-center text-sterling-gold mb-2.5">
                  <TrendingDown className="w-4 h-4 stroke-[2.5]" />
                </div>
                <div className="text-white font-bold text-sm">TAEG Dès 2.85%</div>
                <div className="text-xs text-slate-300 mt-0.5">Taux fixe sans frais de dossier cachés</div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
                <div className="w-8 h-8 rounded-lg bg-sterling-gold/20 flex items-center justify-center text-sterling-gold mb-2.5">
                  <Clock className="w-4 h-4 stroke-[2.5]" />
                </div>
                <div className="text-white font-bold text-sm">Réponse Immédiate</div>
                <div className="text-xs text-slate-300 mt-0.5">Accord de principe en 3 minutes en ligne</div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
                <div className="w-8 h-8 rounded-lg bg-sterling-gold/20 flex items-center justify-center text-sterling-gold mb-2.5">
                  <FileCheck2 className="w-4 h-4 stroke-[2.5]" />
                </div>
                <div className="text-white font-bold text-sm">Zéro Papier</div>
                <div className="text-xs text-slate-300 mt-0.5">Dépôt des pièces et e-signature sécurisée</div>
              </div>
            </div>

            {/* Quick Proof Checklist */}
            <div className="pt-2 flex flex-wrap gap-y-2 gap-x-6 text-xs text-slate-300">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-sterling-gold" />
                Déblocage des fonds sous 48h
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-sterling-gold" />
                Délai légal de rétractation de 14 jours
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-sterling-gold" />
                Régulé par l&apos;ACPR & Banque de France
              </span>
            </div>
          </div>

          {/* Right Column: Floating Interactive Loan Calculator */}
          <div className="lg:col-span-5">
            <LoanCalculator onApply={(loanType) => onOpenApply?.(loanType)} />
          </div>

        </div>
      </div>
    </section>
  );
}
