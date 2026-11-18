"use client";

import React from "react";
import Link from "next/link";
import { 
  UserCheck, 
  Car, 
  Home, 
  ArrowRight, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  ExternalLink 
} from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

interface ProductCardsProps {
  onOpenApply?: (loanType: string) => void;
}

export default function ProductCards({ onOpenApply }: ProductCardsProps) {
  const { t } = useLanguage();

  return (
    <section id="services" className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-sterling-gold-dark px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-sterling-gold" />
            {t("Services Bancaires & Allocation de Capital", "Banking Services & Capital Allocation")}
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-sterling-navy tracking-tight font-display">
            {t("NOS SERVICES FINANCIERS", "OUR FINANCIAL SERVICES")}
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            {t(
              "Faciliter l'accès aux capitaux pour les particuliers, les entrepreneurs et les entreprises internationales grâce à des facilités sur mesure et des partenariats d'investissement d'excellence.",
              "Connecting individuals, entrepreneurs, and businesses with structured capital facilities and global investment partnerships that turn ambitions into reality."
            )}
          </p>
        </div>

        {/* Primary Services Grid: 1 & 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          
          {/* Service 1: Personal & Business Loans */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 hover:border-sterling-gold/60 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-bl-full pointer-events-none" />
            
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-sterling-gold bg-sterling-navy px-3 py-1 rounded-full">
                  {t("Service 01", "Service 01")}
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full font-mono">
                  $100,000 – $500,000,000
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-black text-sterling-navy font-display">
                  {t("1. PRÊTS PERSONNELS & PROFESSIONNELS", "1. PERSONAL & BUSINESS LOANS")}
                </h3>
                <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                  {t(
                    "Accédez à des opportunités de financement pour vos besoins personnels, le développement de votre entreprise, l'acquisition immobilière et tout autre projet financier approuvé.",
                    "Access financing opportunities for personal needs, business expansion, property purchases, and other approved financial projects."
                  )}
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500 font-medium">{t("Fourchette de Financement :", "Funding Range:")}</span>
                  <span className="font-bold text-sterling-navy font-mono">$100,000 – $500,000,000 USD / €</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500 font-medium">{t("Durée d'Amortissement :", "Repayment Term:")}</span>
                  <span className="font-bold text-sterling-navy font-mono">{t("1 à 25 Ans (12 à 300 Mois)", "1 to 25 Years (12 to 300 Months)")}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500 font-medium">{t("Devises Supportées :", "Supported Currencies:")}</span>
                  <span className="font-bold text-emerald-600 font-mono">USD ($) & EUR (€)</span>
                </div>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{t("Capitaux de grande capacité pour la croissance commerciale, la trésorerie et les projets personnels.", "High-capacity capital for commercial growth, liquidity, and personal goals.")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{t("Structures de remboursement adaptées au profil de flux financier certifié de chaque emprunteur.", "Tailored repayment structures aligned with certified cash flow profiles.")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{t("Accords de financement transparents avec documentation contractuelle claire et sans frais cachés.", "Transparent financing agreements with clear legal documentation and zero hidden costs.")}</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 border-t border-slate-100 mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => onOpenApply?.("persona")}
                className="flex-1 py-3 px-4 bg-sterling-navy hover:bg-sterling-navy-deep text-white font-bold text-xs rounded-xl shadow transition-all flex items-center justify-center gap-2 group-hover:bg-sterling-gold group-hover:text-sterling-navy-deep"
              >
                <span>{t("Demander un Prêt", "Apply for a Loan")}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <Link
                href="/apply"
                className="py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors"
              >
                {t("Détails Complets", "View Details")}
              </Link>
            </div>
          </div>

          {/* Service 2: Housing & Construction Financing */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 hover:border-sterling-gold/60 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-bl-full pointer-events-none" />
            
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-sterling-gold bg-sterling-navy px-3 py-1 rounded-full">
                  {t("Service 02", "Service 02")}
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full font-mono">
                  $100,000 – $500,000,000
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-black text-sterling-navy font-display">
                  {t("2. FINANCEMENT DE L'HABITAT & DE LA CONSTRUCTION", "2. HOUSING & CONSTRUCTION FINANCING")}
                </h3>
                <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                  {t(
                    "Vous envisagez de construire la maison de vos rêves ou de développer un bien immobilier ? Nous offrons aux candidats éligibles des opportunités de financement pour la construction de maisons, le développement immobilier et les projets de bâtiments commerciaux, selon l'accord de financement convenu.",
                    "Planning to build your dream home or develop a property? We offer eligible applicants opportunities to secure funding for house construction, real estate development, and commercial building projects, depending on the financing agreement."
                  )}
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500 font-medium">{t("Fourchette de Financement :", "Funding Range:")}</span>
                  <span className="font-bold text-sterling-navy font-mono">$100,000 – $500,000,000 USD / €</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500 font-medium">{t("Options de Durée :", "Tenor Options:")}</span>
                  <span className="font-bold text-sterling-navy font-mono">{t("Jusqu'à 25 Ans (300 Mois)", "Up to 25 Years (300 Months)")}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500 font-medium">{t("Déblocage des Fonds :", "Fund Release:")}</span>
                  <span className="font-bold text-emerald-600 font-mono">{t("Versements Progressifs par Jalons", "Progressive Milestone Disbursements")}</span>
                </div>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{t("Financement d'habitations individuelles, de domaines privés et de promotions commerciales d'envergure.", "Funding for luxury single-family homes, private estates, and large-scale developments.")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{t("Décaissements cadencés selon les certifications d'architectes et étapes d'avancement des travaux.", "Staged drawdowns synchronized with certified architectural milestones.")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{t("Taux fixe et amortissement à long terme jusqu'à 25 ans en USD ($) et Euro (€).", "Long-term fixed amortization up to 25 years in USD ($) and Euro (€).")}</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 border-t border-slate-100 mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => onOpenApply?.("home")}
                className="flex-1 py-3 px-4 bg-sterling-navy hover:bg-sterling-navy-deep text-white font-bold text-xs rounded-xl shadow transition-all flex items-center justify-center gap-2 group-hover:bg-sterling-gold group-hover:text-sterling-navy-deep"
              >
                <span>{t("Financement Construction", "Apply for Construction Loan")}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <Link
                href="/apply"
                className="py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors"
              >
                {t("Détails Complets", "View Details")}
              </Link>
            </div>
          </div>

        </div>

        {/* Highlighted Service 3: International Investment Opportunities */}
        <div className="bg-gradient-to-br from-sterling-navy-deep via-sterling-navy to-[#03234D] text-white rounded-3xl p-8 sm:p-12 border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-sterling-gold/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs font-black uppercase tracking-wider text-sterling-navy bg-sterling-gold px-3.5 py-1 rounded-full shadow-sm">
                {t("Service 03 • Partenariats Internationaux", "Service 03 • Global Partnerships")}
              </span>
              <span className="text-xs sm:text-sm font-black text-sterling-gold bg-white/10 border border-sterling-gold/30 px-3.5 py-1 rounded-full font-mono">
                {t("De 100 000 $ à 5 000 000 000 $ et Au-Delà !", "From $100,000 to $5,000,000,000 and Beyond!")}
              </span>
            </div>

            <div className="max-w-4xl space-y-3">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black font-display tracking-tight text-white">
                {t("3. OPPORTUNITÉS D'INVESTISSEMENT INTERNATIONAL", "3. INTERNATIONAL INVESTMENT OPPORTUNITIES")}
              </h3>
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                {t(
                  "Accédez à des Partenariats d'Investissement Potentiels De 100 000 $ à 5 000 000 000 $ et Au-Delà ! Nous facilitons la mise en relation avec des investisseurs privés et des partenaires d'investissement internationaux intéressés par le financement de projets prometteurs dans différentes parties du monde.",
                  "Access Potential Investment Partnerships From $100,000 to $5,000,000,000 and Beyond! We facilitate connections with private investors and international investment partners interested in financing promising projects across different parts of the world."
                )}
              </p>
            </div>

            {/* 6 Investment Opportunity Asset Classes */}
            <div className="pt-2">
              <div className="text-xs font-bold uppercase tracking-wider text-sterling-gold mb-3">
                {t("Nos Opportunités d'Investissement Peuvent Inclure :", "Our Investment Opportunities May Include:")}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  { 
                    title: t("Investissements en Liquidités", "Cash Investments"), 
                    desc: t("Injections directes de capital de trésorerie et prises de participation.", "Direct cash injections, equity funding, and expansion financing.") 
                  },
                  { 
                    title: t("Or & Actifs Physiques", "Gold & Physical Assets"), 
                    desc: t("Réserves de métaux précieux et allocations de matières premières adossées.", "Precious metals backing, commodities, and tangible physical assets.") 
                  },
                  { 
                    title: t("Investissements en Crypto-Actifs", "Cryptocurrency Investments"), 
                    desc: t("Allocations d'actifs numériques, liquidité institutionnelle et écosystèmes Web3.", "Digital asset allocations, institutional liquidity, and Web3 infrastructure.") 
                  },
                  { 
                    title: t("Financement du Développement d'Entreprise", "Business Development Funding"), 
                    desc: t("Croissance d'entreprise, expansion de marché, acquisitions et fonds de roulement.", "Corporate growth, market expansion, acquisitions, and working capital.") 
                  },
                  { 
                    title: t("Projets Immobiliers & Construction", "Real Estate & Construction Projects"), 
                    desc: t("Tours commerciales, complexes hôteliers et programmes résidentiels.", "Commercial towers, hospitality resorts, and master-planned residential estates.") 
                  },
                  { 
                    title: t("Investissements Commerciaux d'Envergure", "Large-Scale Commercial Investments"), 
                    desc: t("Infrastructures majeures, logistique maritime, usines industrielles et énergie.", "Major global infrastructure, maritime shipping, industrial facilities, and clean energy.") 
                  },
                ].map((item, idx) => (
                  <div key={idx} className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-sterling-gold" />
                      <span className="text-xs sm:text-sm font-extrabold text-white">{item.title}</span>
                    </div>
                    <p className="text-[11px] text-slate-300 pl-4 leading-normal">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Connection and In-Person Meetings Box */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3 text-xs sm:text-sm text-slate-200 leading-relaxed">
              <p>
                {t(
                  "Selon votre proposition de projet et vos exigences de financement, les candidats qualifiés peuvent être mis en relation avec des investisseurs adaptés pour des échanges d'investissement approfondis.",
                  "Depending on your project proposal and funding requirements, qualified applicants may be connected with suitable investors for investment discussions."
                )}
              </p>
              <p className="text-sterling-gold-light font-semibold">
                {t(
                  "Pour les candidats qui remplissent les critères requis, des opportunités peuvent également être ouvertes pour organiser des rencontres en face-à-face avec des investisseurs potentiels afin d'étudier les propositions et de négocier les accords d'investissement.",
                  "For applicants who meet the necessary requirements, opportunities may also be available to arrange face-to-face meetings with prospective investors to discuss proposals and negotiate investment agreements."
                )}
              </p>
              <p className="text-[11px] text-slate-400 italic">
                * {t(
                  "Les montants d'investissement dépendent de l'évaluation rigoureuse du projet, de la capacité vérifiée des investisseurs et de l'allocation de capital disponible.",
                  "Investment amounts depend on project evaluation, verified investor capacity, and available capital allocation."
                )}
              </p>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => onOpenApply?.("ecosolutions")}
                className="py-3.5 px-6 bg-gradient-to-r from-sterling-gold via-sterling-gold-light to-sterling-gold text-sterling-navy-deep font-black text-xs sm:text-sm rounded-xl shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
              >
                <span>{t("Soumettre une Proposition d'Investissement", "SUBMIT AN INVESTMENT PROPOSAL")}</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
              <a
                href="mailto:customer.experience@loancommercialgroup.com?subject=Investment%20Partnership%20Proposal&body=Dear%20Investment%20Committee%2C%0A%0AWe%20wish%20to%20submit%20an%20investment%20proposal.%0A%0AProject%20Title%3A%0AFunding%20Required%3A%0AAsset%20Class%3A"
                className="py-3.5 px-6 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm rounded-xl border border-white/20 transition-all flex items-center justify-center gap-2"
              >
                <span>{t("Transmettre le Dossier par E-mail", "CONTACT OUR FINANCIAL TEAM")}</span>
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
