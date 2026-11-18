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
import { useLanguage } from "@/lib/LanguageContext";

interface WhyChooseUsProps {
  onOpenApply?: (loanType?: string) => void;
}

export default function WhyChooseUs({ onOpenApply }: WhyChooseUsProps) {
  const { t } = useLanguage();

  const reasons = [
    {
      title: t("Opportunités d'Investissement International", "International Investment Opportunities"),
      desc: t(
        "Accès direct aux investisseurs privés fortunés, family offices et partenaires en capital transfrontalier.",
        "Direct access to private investors, international family offices, and cross-border investment partners."
      ),
      icon: Globe2,
    },
    {
      title: t("Financement de Projets d'Envergure", "Substantial Project Financing"),
      desc: t(
        "Capacité financière robuste allant de 100 000 $ à 500 000 000 $, et jusqu'à 5 milliards de dollars pour les structures institutionnelles qualifiées.",
        "Robust capital deployment ranging from $100,000 to $500,000,000, and up to $5,000,000,000+ for qualified partners."
      ),
      icon: Banknote,
    },
    {
      title: t("Financement d'Entreprises & Immobilier", "Business & Real Estate Funding"),
      desc: t(
        "Structures spécialisées pour les acquisitions d'entreprises, l'expansion commerciale, les infrastructures et le développement immobilier.",
        "Dedicated facilities for commercial acquisitions, business expansion, infrastructure, and real estate development."
      ),
      icon: Building,
    },
    {
      title: t("Assistance Financière Professionnelle", "Professional Financial Assistance"),
      desc: t(
        "Spécialistes du crédit dédiés accompagnant chaque candidat tout au long de la due diligence, de l'évaluation des risques et du formalisme contractuel.",
        "Dedicated credit officers guiding every applicant through due diligence, risk assessment, and contractual structuring."
      ),
      icon: UserCheck,
    },
    {
      title: t("Procédures de Candidature Confidentielles", "Confidential Application Procedures"),
      desc: t(
        "Protocoles stricts de non-divulgation, chiffrement 256 bits de bout en bout et discrétion absolue pour chaque client professionnel et particulier.",
        "Strict non-disclosure protocols, end-to-end 256-bit encryption, and executive discretion for every applicant."
      ),
      icon: Lock,
    },
    {
      title: t("Accords de Financement Transparents", "Transparent Financing Agreements"),
      desc: t(
        "Clauses contractuelles claires, échéanciers prévisibles, absence totale de frais dissimulés et contrats mutuellement validés.",
        "Clear contractual terms, transparent schedules, zero hidden charges, and mutually agreed legal agreements."
      ),
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
              {t("Avantages Stratégiques", "Strategic Advantages")}
            </div>
            <h2 className="text-3xl sm:text-4xl font-black font-display tracking-tight text-white uppercase">
              {t("POURQUOI NOUS CHOISIR ?", "WHY CHOOSE US?")}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {t(
                "Nous relions les initiatives financières ambitieuses à une liquidité de premier ordre grâce à des standards rigoureux, une portée mondiale et une exécution sur mesure.",
                "We connect ambitious financial initiatives with world-class liquidity through rigorous standards, global reach, and tailored execution."
              )}
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
              {t("Soutenir les Projets Visionnaires à Travers le Monde", "Empowering Visionary Projects Worldwide")}
            </span>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black font-display tracking-tight text-white uppercase">
              {t("VOTRE RÊVE. VOTRE OPPORTUNITÉ. NOTRE ENGAGEMENT.", "YOUR DREAM. YOUR OPPORTUNITY. OUR COMMITMENT.")}
            </h3>
            <p className="text-slate-200 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed">
              {t(
                "Que vous ayez besoin d'un prêt personnel, de capitaux pour votre entreprise, d'un financement de construction ou d'un partenaire d'investissement international, nous vous invitons à explorer les opportunités offertes par notre plateforme.",
                "Whether you need a personal loan, business capital, construction financing, or an international investment partner, we welcome you to explore the opportunities available through our platform."
              )}
            </p>
            <p className="text-sterling-gold font-bold text-base sm:text-lg">
              {t(
                "Votre vision mérite la bonne opportunité financière.",
                "Your vision deserves the right financial opportunity."
              )}
            </p>
          </div>

          {/* Action CTAs: APPLY TODAY */}
          <div className="space-y-4 pt-2">
            <div className="text-xs font-black uppercase tracking-wider text-slate-300">
              {t("POSTULEZ DÈS AUJOURD'HUI", "APPLY TODAY")}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              {/* Button 1: APPLY FOR A LOAN */}
              <button
                type="button"
                onClick={() => onOpenApply?.("persona")}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-sterling-gold via-sterling-gold-light to-sterling-gold text-sterling-navy-deep font-black text-xs sm:text-sm shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
              >
                <span>{t("DEMANDER UN PRÊT", "APPLY FOR A LOAN")}</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              {/* Button 2: SUBMIT AN INVESTMENT PROPOSAL */}
              <button
                type="button"
                onClick={() => onOpenApply?.("ecosolutions")}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/25 transition-all flex items-center justify-center gap-2"
              >
                <span>{t("SOUMETTRE UNE PROPOSITION D'INVESTISSEMENT", "SUBMIT AN INVESTMENT PROPOSAL")}</span>
                <ArrowRight className="w-4 h-4 text-sterling-gold" />
              </button>

              {/* Button 3: CONTACT OUR FINANCIAL TEAM */}
              <a
                href="mailto:customer.experience@loancommercialgroup.com?subject=Contact%20Financial%20Team&body=Dear%20Loan%20Commercial%20Group%20Advisors%2C%0A%0AI%20would%20like%20to%20consult%20regarding%20a%20financing%20facility%20or%20investment%20proposal."
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{t("CONTACTER NOTRE ÉQUIPE FINANCIÈRE", "CONTACT OUR FINANCIAL TEAM")}</span>
              </a>
            </div>
          </div>

          {/* Legal Regulatory Disclosure Disclaimer */}
          <div className="pt-6 border-t border-white/10 max-w-4xl mx-auto">
            <p className="text-[11px] text-slate-300 leading-relaxed italic text-left sm:text-center">
              {t(
                "Tous les montants d'investissement représentent des fourchettes de financement indicatives pour les projets et ne constituent pas un capital garanti. Toutes les demandes, mises en relation avec des investisseurs et montages financiers sont soumises à l'éligibilité, à la vérification, à la diligence raisonnable, à l'approbation des investisseurs, aux exigences réglementaires et à des accords juridiques mutuellement convenus.",
                "All investment figures represent indicative project funding ranges and are not guaranteed available capital. All applications, investor introductions, and financing arrangements are subject to eligibility, verification, due diligence, investor approval, regulatory requirements, and mutually agreed legal agreements."
              )}
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
