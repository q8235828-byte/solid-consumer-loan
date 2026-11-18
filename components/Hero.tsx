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
import { useLanguage } from "@/lib/LanguageContext";

interface HeroProps {
  onOpenApply?: (loanType?: string) => void;
}

export default function Hero({ onOpenApply }: HeroProps) {
  const { t } = useLanguage();

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
                {t("BIENVENUE CHEZ LOAN COMMERCIAL GROUP", "WELCOME TO LOAN COMMERCIAL GROUP")}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.15] font-display text-white">
              {t(
                "Votre Partenaire de Confiance en Banque, Prêts & ",
                "Your Trusted Partner in Banking, Loans & "
              )}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sterling-gold via-sterling-gold-light to-amber-200">
                {t("Opportunités d'Investissement International", "Global Investment Opportunities")}
              </span>
            </h1>

            {/* Mission Statement Banner */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-slate-100 text-xs sm:text-sm leading-relaxed space-y-2">
              <p>
                {t(
                  "Chez ",
                  "At "
                )}
                <strong className="text-sterling-gold">Loan Commercial Group</strong>
                {t(
                  ", nous croyons que chacun mérite une opportunité d'atteindre ses objectifs financiers. Nous offrons un accès au financement par emprunt, aux fonds immobiliers, au développement d'entreprises et aux opportunités internationales d'investissement privé.",
                  ", we believe everyone deserves an opportunity to achieve their financial goals. We provide access to loan financing, real estate funding, business development, and international private investment opportunities."
                )}
              </p>
              <p className="text-slate-300">
                {t(
                  "Notre mission est de connecter les particuliers, entrepreneurs et entreprises avec des solutions financières qui transforment leurs ambitions en réalité.",
                  "Our mission is to connect individuals, entrepreneurs, and businesses with financial solutions that help turn their dreams into reality."
                )}
              </p>
            </div>

            {/* Official Announcement Statement Box */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-xs font-extrabold uppercase tracking-wider text-sterling-gold flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-sterling-gold" />
                  {t("Avis Officiel de Prêt & Financement", "Official Lending & Investment Notice")}
                </span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 px-2 py-0.5 rounded-full font-bold">
                  {t("Candidats Éligibles dans le Monde Entier", "Eligible Worldwide Applicants")}
                </span>
              </div>

              <div className="text-xs sm:text-sm text-slate-200 space-y-2.5 leading-relaxed font-normal">
                <p className="font-semibold text-white">
                  {t(
                    "Chers Investisseurs et Demandeurs de Financement,",
                    "Dear Investors and Financing Applicants,"
                  )}
                </p>
                <p>
                  {t(
                    "Nous sommes une société enregistrée d'investissement privé et de prêt offrant des solutions de financement aux particuliers et aux entreprises du monde entier en quête d'une assistance financière pour des projets commerciaux ou d'investissement légitimes.",
                    "We are a registered private investment and loan company providing financial solutions to individuals and businesses worldwide seeking financial assistance for genuine commercial or investment projects."
                  )}
                </p>
                <p>
                  {t(
                    "Nous proposons des facilités de crédit assorties de durées de remboursement allant de 1 an à 25 ans, selon le profil financier de l'emprunteur, la nature du projet et les conditions contractuelles convenues.",
                    "We offer loan facilities with flexible repayment terms spanning from 1 year to 25 years, depending on borrower financial profile, project evaluation, and agreed financing terms."
                  )}
                </p>
              </div>

              {/* Key Parameters Cards: Minimum $100,000 to $500,000,000 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="bg-sterling-navy-deep/70 border border-white/10 rounded-xl p-3.5 space-y-1">
                  <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
                    {t("Montants de Prêt Disponibles", "Available Loan Amounts")}
                  </div>
                  <div className="text-lg sm:text-xl font-black text-sterling-gold font-mono">
                    $100,000 – $500,000,000 USD / €
                  </div>
                  <div className="text-[10px] text-slate-300">
                    {t(
                      "Capacité de structuration en capital élevé (jusqu'à 5 Mrds $ pour partenariats mondiaux)",
                      "High-capacity capital structuring (up to $5,000,000,000+ for global partnerships)"
                    )}
                  </div>
                </div>

                <div className="bg-sterling-navy-deep/70 border border-white/10 rounded-xl p-3.5 space-y-1">
                  <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
                    {t("Devises Disponibles", "Settlement Currencies")}
                  </div>
                  <div className="text-lg sm:text-xl font-black text-emerald-400 font-mono flex items-center gap-2">
                    <span>USD ($)</span>
                    <span className="text-slate-500">•</span>
                    <span>EUR (€)</span>
                  </div>
                  <div className="text-[10px] text-slate-300">
                    {t("Flexibilité bi-devise intégrale", "Dual-currency full flexibility")}
                  </div>
                </div>
              </div>

              {/* Due Diligence & Regulatory Compliance */}
              <p className="text-[11px] text-slate-300 leading-relaxed italic border-t border-white/10 pt-3">
                {t(
                  "« Nos facilités de financement sont rigoureusement structurées avec une exigence absolue de sécurité, de transparence et d'intégrité documentaire. Chaque demande fait l'objet des vérifications requises, d'une procédure complète de due diligence, d'une approbation de crédit et du respect strict des réglementations en vigueur. »",
                  "“Our financing facilities are strictly structured with absolute security, transparency, and procedural integrity. Each application undergoes due diligence, credit assessment, and strict adherence to international lending standards.”"
                )}
              </p>

              {/* Direct Contact CTAs via WhatsApp & Email */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                <a
                  href="https://wa.me/?text=Hello%2C%20I%20am%20interested%20in%20your%20financing%20offer%20and%20would%20like%20to%20learn%20more."
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-3 px-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{t("Contacter via WhatsApp", "Contact via WhatsApp")}</span>
                </a>

                <a
                  href="mailto:customer.experience@loancommercialgroup.com?subject=Financing%20Inquiry%20(USD%2FEUR)&body=Dear%20Loan%20Commercial%20Group%20Team%2C%0A%0AI%20would%20like%20to%20apply%20for%20financing%20for%20a%20project.%20Please%20send%20the%20application%20details."
                  className="flex-1 bg-white/10 hover:bg-white/20 text-white border border-white/30 font-bold text-xs py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <Mail className="w-4 h-4 text-sterling-gold" />
                  <span>{t("Contacter par E-mail", "Contact via Email")}</span>
                </a>

                <button
                  type="button"
                  onClick={() => onOpenApply?.("persona")}
                  className="bg-gradient-to-r from-sterling-gold via-sterling-gold-light to-sterling-gold text-sterling-navy-deep font-black text-xs py-3 px-4 rounded-xl shadow-md hover:scale-[1.02] transition-all flex items-center justify-center gap-1.5"
                >
                  <span>{t("Demander un Prêt", "Apply for a Loan")}</span>
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
                    {t("Spécialiste Senior en Financement & Crédit", "Senior Financing & Credit Specialist")}
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 italic">
                  {t(
                    "Évaluation humaine dédiée, analyse approfondie et structuration d'échéanciers sur mesure.",
                    "Dedicated human evaluation, comprehensive project analysis, and bespoke schedule structuring."
                  )}
                </p>
                <div className="flex items-center gap-1 text-[10px] text-amber-300 font-semibold">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400 stroke-none" />
                    ))}
                  </div>
                  <span>{t("4.9/5 selon la satisfaction certifiée de nos clients internationaux", "4.9/5 verified client satisfaction rating")}</span>
                </div>
              </div>
            </div>

            {/* Quick Guarantees Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="bg-white/5 border border-white/10 rounded-xl p-3 backdrop-blur-sm">
                <div className="w-7 h-7 rounded-lg bg-sterling-gold/20 flex items-center justify-center text-sterling-gold mb-1.5">
                  <Clock className="w-3.5 h-3.5" />
                </div>
                <div className="text-white font-bold text-xs">{t("Traitement Rapide", "Swift Processing")}</div>
                <div className="text-[10px] text-slate-300 mt-0.5">{t("Évaluation préliminaire sous 24h", "Initial review within 24 hours")}</div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-3 backdrop-blur-sm">
                <div className="w-7 h-7 rounded-lg bg-sterling-gold/20 flex items-center justify-center text-sterling-gold mb-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <div className="text-white font-bold text-xs">{t("Transparence Totale", "Full Transparency")}</div>
                <div className="text-[10px] text-slate-300 mt-0.5">{t("Zéro frais cachés & accord clair", "No hidden fees & clear agreements")}</div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-3 backdrop-blur-sm">
                <div className="w-7 h-7 rounded-lg bg-sterling-gold/20 flex items-center justify-center text-sterling-gold mb-1.5">
                  <Globe2 className="w-3.5 h-3.5" />
                </div>
                <div className="text-white font-bold text-xs">{t("Disponible en USD & EUR", "Available in USD & EUR")}</div>
                <div className="text-[10px] text-slate-300 mt-0.5">{t("Amortissements de 1 à 25 ans", "Amortization terms 1 to 25 yrs")}</div>
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
