"use client";

import React from "react";
import Link from "next/link";
import { 
  Globe2, 
  Banknote, 
  Building, 
  UserCheck, 
  Lock, 
  FileCheck2, 
  ArrowRight, 
  Mail, 
  MessageCircle,
  Sparkles,
  ShieldAlert
} from "lucide-react";

interface WhyChooseUsProps {
  onOpenApply?: (loanType?: string) => void;
}

export default function WhyChooseUs({ onOpenApply }: WhyChooseUsProps) {
  const reasons = [
    {
      title: "Opportunités d'Investissement International",
      desc: "Accès direct aux investisseurs privés fortunés, family offices et partenaires en capital transfrontalier.",
      icon: Globe2,
    },
    {
      title: "Financement de Projets d'Envergure",
      desc: "Capacité financière robuste allant de 100 000 $ à 500 000 000 $, et jusqu'à 5 milliards de dollars pour les structures institutionnelles qualifiées.",
      icon: Banknote,
    },
    {
      title: "Financement d'Entreprises & Immobilier",
      desc: "Structures spécialisées pour les acquisitions d'entreprises, l'expansion commerciale, les infrastructures et le développement immobilier.",
      icon: Building,
    },
    {
      title: "Assistance Financière Professionnelle",
      desc: "Spécialistes du crédit dédiés accompagnant chaque candidat tout au long de la due diligence, de l'évaluation des risques et du formalisme contractuel.",
      icon: UserCheck,
    },
    {
      title: "Procédures de Candidature Confidentielles",
      desc: "Protocoles stricts de non-divulgation, chiffrement 256 bits de bout en bout et discrétion absolue pour chaque client professionnel et particulier.",
      icon: Lock,
    },
    {
      title: "Accords de Financement Transparents",
      desc: "Clauses contractuelles claires, échéanciers prévisibles, absence totale de frais dissimulés et contrats mutuellement validés.",
      icon: FileCheck2,
    },
  ];

  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-sterling-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* =========================================================================
            SECTION: WHY CHOOSE US?
            ========================================================================= */}
        <div className="space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sterling-gold/20 text-sterling-gold text-xs font-bold uppercase tracking-wider border border-sterling-gold/30">
              <Sparkles className="w-3.5 h-3.5" />
              Avantages Stratégiques
            </div>
            <h2 className="text-3xl sm:text-4xl font-black font-display tracking-tight text-white">
              POURQUOI NOUS CHOISIR ?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Nous relions les initiatives financières ambitieuses à une liquidité de premier ordre grâce à des standards rigoureux, une portée mondiale et une exécution sur mesure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reasons.map((r, i) => {
              const Icon = r.icon;
              return (
                <div 
                  key={i}
                  className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-sterling-gold/40 hover:bg-white/[0.08] transition-all space-y-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-sterling-gold/20 flex items-center justify-center text-sterling-gold">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-extrabold text-white">
                    * {r.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {r.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* =========================================================================
            SECTION: YOUR DREAM. YOUR OPPORTUNITY. OUR COMMITMENT.
            ========================================================================= */}
        <div className="bg-gradient-to-r from-sterling-navy-deep via-sterling-navy to-[#051C3E] rounded-3xl p-8 sm:p-12 border border-sterling-gold/30 shadow-2xl space-y-8 text-center max-w-5xl mx-auto">
          <div className="space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-sterling-gold font-mono">
              Soutenir les Projets Visionnaires à Travers le Monde
            </span>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black font-display tracking-tight text-white uppercase">
              VOTRE RÊVE. VOTRE OPPORTUNITÉ. NOTRE ENGAGEMENT.
            </h3>
            <p className="text-slate-200 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed">
              Que vous ayez besoin d'un prêt personnel, de capitaux pour votre entreprise, d'un financement de construction ou d'un partenaire d'investissement international, nous vous invitons à explorer les opportunités offertes par notre plateforme.
            </p>
            <p className="text-sterling-gold font-bold text-base sm:text-lg">
              Votre vision mérite la bonne opportunité financière.
            </p>
          </div>

          {/* Action CTAs: APPLY TODAY */}
          <div className="space-y-4 pt-2">
            <div className="text-xs font-black uppercase tracking-wider text-slate-300">
              POSTULEZ DÈS AUJOURD'HUI
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              {/* Button 1: APPLY FOR A LOAN */}
              <button
                type="button"
                onClick={() => onOpenApply?.("persona")}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-sterling-gold via-sterling-gold-light to-sterling-gold text-sterling-navy-deep font-black text-xs sm:text-sm shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
              >
                <span>DEMANDER UN PRÊT</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              {/* Button 2: SUBMIT AN INVESTMENT PROPOSAL */}
              <button
                type="button"
                onClick={() => onOpenApply?.("ecosolutions")}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/25 transition-all flex items-center justify-center gap-2"
              >
                <span>SOUMETTRE UNE PROPOSITION D'INVESTISSEMENT</span>
                <ArrowRight className="w-4 h-4 text-sterling-gold" />
              </button>

              {/* Button 3: CONTACT OUR FINANCIAL TEAM */}
              <a
                href="mailto:customer.experience@loancommercialgroup.com?subject=Contact%20Equipe%20Financiere&body=Madame%2C%20Monsieur%20de%20l%27%C3%A9quipe%20financi%C3%A8re%2C%0A%0AJe%20souhaite%20obtenir%20des%20conseils%20concernant%20un%20financement%20ou%20une%20proposition%20d%27investissement."
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow"
              >
                <MessageCircle className="w-4 h-4" />
                <span>CONTACTER NOTRE ÉQUIPE FINANCIÈRE</span>
              </a>
            </div>
          </div>

          {/* Legal Regulatory Disclosure Disclaimer */}
          <div className="pt-6 border-t border-white/10 max-w-4xl mx-auto">
            <p className="text-[11px] text-slate-300 leading-relaxed italic text-left sm:text-center">
              Tous les montants d'investissement représentent des fourchettes de financement indicatives pour les projets et ne constituent pas un capital garanti. Toutes les demandes, mises en relation avec des investisseurs et montages financiers sont soumises à l'éligibilité, à la vérification, à la diligence raisonnable, à l'approbation des investisseurs, aux exigences réglementaires et à des accords juridiques mutuellement convenus.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
