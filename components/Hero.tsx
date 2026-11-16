"use client";

import React from "react";
import { 
  CheckCircle,
  FileCheck2,
  TrendingDown,
  Clock,
  Star,
  ShieldCheck,
  Mail,
  MessageCircle,
  DollarSign,
  ArrowRight,
  Globe2,
  Briefcase
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Official Announcement & Financing Details */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Valid Loan Offer Pill Tag */}
            <div className="inline-flex items-center gap-2 bg-sterling-gold/20 border border-sterling-gold/40 px-4 py-1.5 rounded-full shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-black tracking-wider text-sterling-gold uppercase">
                BIENVENUE CHEZ LOAN COMMERCIAL GROUP
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.15] font-display text-white">
              Votre Partenaire de Confiance en Banque, Prêts &{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sterling-gold via-sterling-gold-light to-amber-200">
                Opportunités d'Investissement International
              </span>
            </h1>

            {/* Mission Statement Banner */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-slate-100 text-xs sm:text-sm leading-relaxed space-y-2">
              <p>
                Chez <strong className="text-sterling-gold">Loan Commercial Group</strong>, nous croyons que chacun mérite une opportunité d'atteindre ses objectifs financiers. Nous offrons un accès au financement par emprunt, aux fonds immobiliers, au développement d'entreprises et aux opportunités internationales d'investissement privé.
              </p>
              <p className="text-slate-300">
                Notre mission est de connecter les particuliers, entrepreneurs et entreprises avec des solutions financières qui transforment leurs ambitions en réalité.
              </p>
            </div>

            {/* Official Announcement Statement Box */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-xs font-extrabold uppercase tracking-wider text-sterling-gold flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-sterling-gold" />
                  Avis Officiel de Prêt & Financement
                </span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 px-2 py-0.5 rounded-full font-bold">
                  Candidats Éligibles dans le Monde Entier
                </span>
              </div>

              <div className="text-xs sm:text-sm text-slate-200 space-y-2.5 leading-relaxed font-normal">
                <p className="font-semibold text-white">
                  Chers Investisseurs et Demandeurs de Financement,
                </p>
                <p>
                  Nous sommes une société enregistrée d'investissement privé et de prêt offrant des solutions de financement aux particuliers et aux entreprises du monde entier en quête d'une assistance financière pour des projets commerciaux ou d'investissement légitimes.
                </p>
                <p>
                  Nous proposons des facilités de crédit assorties de durées de remboursement allant de <strong>1 an à 25 ans</strong>, selon le profil financier de l'emprunteur, la nature du projet et les conditions contractuelles convenues.
                </p>
              </div>

              {/* Key Parameters Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="bg-sterling-navy-deep/70 border border-white/10 rounded-xl p-3.5 space-y-1">
                  <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
                    Montants de Prêt Disponibles
                  </div>
                  <div className="text-lg sm:text-xl font-black text-sterling-gold font-mono">
                    100 000 $ à 500 000 000 $ USD / €
                  </div>
                  <div className="text-[10px] text-slate-300">
                    Capacité de structuration en capital élevé (jusqu'à 5 Mrds $ pour partenariats)
                  </div>
                </div>

                <div className="bg-sterling-navy-deep/70 border border-white/10 rounded-xl p-3.5 space-y-1">
                  <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
                    Devises Disponibles
                  </div>
                  <div className="text-lg sm:text-xl font-black text-emerald-400 font-mono flex items-center gap-2">
                    <span>USD ($)</span>
                    <span className="text-slate-500">•</span>
                    <span>Euro (€)</span>
                  </div>
                  <div className="text-[10px] text-slate-300">
                    Flexibilité bi-devise intégrale
                  </div>
                </div>
              </div>

              {/* Due Diligence & Regulatory Compliance */}
              <p className="text-[11px] text-slate-300 leading-relaxed italic border-t border-white/10 pt-3">
                &ldquo;Nos facilités de financement sont rigoureusement structurées avec une exigence absolue de sécurité, de transparence et d'intégrité documentaire. Chaque demande fait l'objet des vérifications requises, d'une procédure complète de due diligence, d'une approbation de crédit et du respect strict des réglementations en vigueur.&rdquo;
              </p>

              {/* Direct Contact CTAs via WhatsApp & Email */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                <a
                  href="https://wa.me/?text=Bonjour%2C%20je%20suis%20int%C3%A9ress%C3%A9%28e%29%20par%20votre%20offre%20de%20financement%20et%20souhaite%20obtenir%20des%20renseignements%20et%20les%20conditions%20d%27%C3%A9ligibilit%C3%A9."
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-3 px-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Contacter via WhatsApp</span>
                </a>

                <a
                  href="mailto:customer.experience@loancommercialgroup.com?subject=Demande%20de%20Financement%20(USD%2FEUR)&body=Madame%2C%20Monsieur%2C%0A%0AJe%20souhaite%20obtenir%20un%20financement%20pour%20un%20projet%20professionnel%2Fpersonnel.%20Merci%20de%20me%20transmettre%20le%20dossier%20et%20les%20conditions."
                  className="flex-1 bg-white/10 hover:bg-white/20 text-white border border-white/30 font-bold text-xs py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <Mail className="w-4 h-4 text-sterling-gold" />
                  <span>Contacter par E-mail</span>
                </a>

                <button
                  type="button"
                  onClick={() => onOpenApply?.("persona")}
                  className="bg-gradient-to-r from-sterling-gold via-sterling-gold-light to-sterling-gold text-sterling-navy-deep font-black text-xs py-3 px-4 rounded-xl shadow-md hover:scale-[1.02] transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Demander un Prêt</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
                </button>
              </div>

            </div>

            {/* Advisor Real Human Trust Badge */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex items-center gap-4">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=160&q=80"
                alt="Emily Vance - Responsable Financement Senior"
                className="w-13 h-13 rounded-full object-cover ring-2 ring-sterling-gold shrink-0 shadow-md"
              />
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">Emily Vance</span>
                  <span className="text-[10px] text-sterling-gold bg-sterling-navy-deep px-2 py-0.5 rounded-full border border-sterling-gold/30 font-semibold">
                    Spécialiste Senior en Financement & Crédit
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 italic">
                  Évaluation humaine dédiée, analyse approfondie et structuration d'échéanciers sur mesure.
                </p>
                <div className="flex items-center gap-1 text-[10px] text-amber-300 font-semibold">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400 stroke-none" />
                    ))}
                  </div>
                  <span>4.9/5 selon la satisfaction certifiée de nos clients internationaux</span>
                </div>
              </div>
            </div>

            {/* Quick Guarantees Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="bg-white/5 border border-white/10 rounded-xl p-3 backdrop-blur-sm">
                <div className="w-7 h-7 rounded-lg bg-sterling-gold/20 flex items-center justify-center text-sterling-gold mb-1.5">
                  <Clock className="w-3.5 h-3.5" />
                </div>
                <div className="text-white font-bold text-xs">Traitement Rapide</div>
                <div className="text-[10px] text-slate-300 mt-0.5">Évaluation préliminaire sous 24h</div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-3 backdrop-blur-sm">
                <div className="w-7 h-7 rounded-lg bg-sterling-gold/20 flex items-center justify-center text-sterling-gold mb-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <div className="text-white font-bold text-xs">Transparence Totale</div>
                <div className="text-[10px] text-slate-300 mt-0.5">Zéro frais cachés & accord clair</div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-3 backdrop-blur-sm">
                <div className="w-7 h-7 rounded-lg bg-sterling-gold/20 flex items-center justify-center text-sterling-gold mb-1.5">
                  <Globe2 className="w-3.5 h-3.5" />
                </div>
                <div className="text-white font-bold text-xs">Disponible en USD & EUR</div>
                <div className="text-[10px] text-slate-300 mt-0.5">Amortissements de 1 à 25 ans</div>
              </div>
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
