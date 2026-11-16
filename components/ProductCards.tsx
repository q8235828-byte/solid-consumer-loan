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

interface ProductCardsProps {
  onOpenApply?: (loanType: string) => void;
}

export default function ProductCards({ onOpenApply }: ProductCardsProps) {
  return (
    <section id="services" className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-sterling-gold-dark px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-sterling-gold" />
            Services Bancaires & Allocation de Capital
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-sterling-navy tracking-tight font-display">
            NOS SERVICES FINANCIERS
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Faciliter l'accès aux capitaux pour les particuliers, les entrepreneurs et les entreprises internationales grâce à des facilités sur mesure et des partenariats d'investissement d'excellence.
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
                  Service 01
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                  100 000 $ à 500 000 000 $
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-black text-sterling-navy font-display">
                  1. PRÊTS PERSONNELS & PROFESSIONNELS
                </h3>
                <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                  Accédez à des opportunités de financement pour vos besoins personnels, le développement de votre entreprise, l'acquisition immobilière et tout autre projet financier approuvé.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500 font-medium">Fourchette de Financement :</span>
                  <span className="font-bold text-sterling-navy font-mono">100 000 $ – 500 000 000 $</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500 font-medium">Durée d'Amortissement :</span>
                  <span className="font-bold text-sterling-navy font-mono">1 à 25 Ans (12 à 300 Mois)</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500 font-medium">Devises Supportées :</span>
                  <span className="font-bold text-emerald-600 font-mono">USD ($) & EUR (€)</span>
                </div>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Capitaux de grande capacité pour la croissance commerciale, la trésorerie et les projets personnels.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Structures de remboursement adaptées au profil de flux financier certifié de chaque emprunteur.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Accords de financement transparents avec documentation contractuelle claire et sans frais cachés.</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 border-t border-slate-100 mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => onOpenApply?.("persona")}
                className="flex-1 py-3 px-4 bg-sterling-navy hover:bg-sterling-navy-deep text-white font-bold text-xs rounded-xl shadow transition-all flex items-center justify-center gap-2 group-hover:bg-sterling-gold group-hover:text-sterling-navy-deep"
              >
                <span>Demander un Prêt</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <Link
                href="/apply"
                className="py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors"
              >
                Détails Complets
              </Link>
            </div>
          </div>

          {/* Service 2: Housing & Construction Financing */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 hover:border-sterling-gold/60 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-bl-full pointer-events-none" />
            
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-sterling-gold bg-sterling-navy px-3 py-1 rounded-full">
                  Service 02
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                  100 000 $ à 500 000 000 $
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-black text-sterling-navy font-display">
                  2. FINANCEMENT DE L'HABITAT & DE LA CONSTRUCTION
                </h3>
                <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                  Vous envisagez de construire la maison de vos rêves ou de développer un bien immobilier ? Nous offrons aux candidats éligibles des opportunités de financement pour la construction de maisons, le développement immobilier et les projets de bâtiments commerciaux, selon l'accord de financement convenu.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500 font-medium">Fourchette de Financement :</span>
                  <span className="font-bold text-sterling-navy font-mono">100 000 $ – 500 000 000 $</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500 font-medium">Options de Durée :</span>
                  <span className="font-bold text-sterling-navy font-mono">Jusqu'à 25 Ans (300 Mois)</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500 font-medium">Déblocage des Fonds :</span>
                  <span className="font-bold text-emerald-600 font-mono">Versements Progressifs par Jalons</span>
                </div>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Financement d'habitations individuelles, de domaines privés et de promotions commerciales d'envergure.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Décaissements cadencés selon les certifications d'architectes et étapes d'avancement des travaux.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Taux fixe et amortissement à long terme jusqu'à 25 ans en USD ($) et Euro (€).</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 border-t border-slate-100 mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => onOpenApply?.("home")}
                className="flex-1 py-3 px-4 bg-sterling-navy hover:bg-sterling-navy-deep text-white font-bold text-xs rounded-xl shadow transition-all flex items-center justify-center gap-2 group-hover:bg-sterling-gold group-hover:text-sterling-navy-deep"
              >
                <span>Financement Construction</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <Link
                href="/apply"
                className="py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors"
              >
                Détails Complets
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
                Service 03 • Partenariats Internationaux
              </span>
              <span className="text-xs sm:text-sm font-black text-sterling-gold bg-white/10 border border-sterling-gold/30 px-3.5 py-1 rounded-full">
                De 100 000 $ à 5 000 000 000 $ et Au-Delà !
              </span>
            </div>

            <div className="max-w-4xl space-y-3">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black font-display tracking-tight text-white">
                3. OPPORTUNITÉS D'INVESTISSEMENT INTERNATIONAL
              </h3>
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                Accédez à des Partenariats d'Investissement Potentiels <strong>De 100 000 $ à 5 000 000 000 $ et Au-Delà !</strong> Nous facilitons la mise en relation avec des investisseurs privés et des partenaires d'investissement internationaux intéressés par le financement de projets prometteurs dans différentes parties du monde.
              </p>
            </div>

            {/* 6 Investment Opportunity Asset Classes */}
            <div className="pt-2">
              <div className="text-xs font-bold uppercase tracking-wider text-sterling-gold mb-3">
                Nos Opportunités d'Investissement Peuvent Inclure :
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  { title: "Investissements en Liquidités", desc: "Injections directes de capital de trésorerie et prises de participation." },
                  { title: "Or & Actifs Physiques", desc: "Réserves de métaux précieux et allocations de matières premières adossées." },
                  { title: "Investissements en Crypto-Actifs", desc: "Allocations d'actifs numériques, liquidité institutionnelle et écosystèmes Web3." },
                  { title: "Financement du Développement d'Entreprise", desc: "Croissance d'entreprise, expansion de marché, acquisitions et fonds de roulement." },
                  { title: "Projets Immobiliers & Construction", desc: "Tours commerciales, complexes hôteliers et programmes résidentiels." },
                  { title: "Investissements Commerciaux d'Envergure", desc: "Infrastructures majeures, logistique maritime, usines industrielles et énergie." },
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
                Selon votre proposition de projet et vos exigences de financement, les candidats qualifiés peuvent être mis en relation avec des investisseurs adaptés pour des échanges d'investissement approfondis.
              </p>
              <p className="text-sterling-gold-light font-semibold">
                Pour les candidats qui remplissent les critères requis, des opportunités peuvent également être ouvertes pour organiser des rencontres en face-à-face avec des investisseurs potentiels afin d'étudier les propositions et de négocier les accords d'investissement.
              </p>
              <p className="text-[11px] text-slate-400 italic">
                * Les montants d'investissement dépendent de l'évaluation rigoureuse du projet, de la capacité vérifiée des investisseurs et de l'allocation de capital disponible.
              </p>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => onOpenApply?.("ecosolutions")}
                className="py-3.5 px-6 bg-gradient-to-r from-sterling-gold via-sterling-gold-light to-sterling-gold text-sterling-navy-deep font-black text-xs sm:text-sm rounded-xl shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
              >
                <span>Soumettre une Proposition d'Investissement</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
              <a
                href="mailto:customer.experience@loancommercialgroup.com?subject=Proposition%20de%20Partenariat%20d%27Investissement&body=Madame%2C%20Monsieur%20les%20Membres%20du%20Comit%C3%A9%20d%27Investissement%2C%0A%0ANous%20souhaitons%20soumettre%20une%20proposition%20de%20projet.%0A%0AProjet%20%3A%0ACapital%20Requis%20%3A%0AClasse%20d%27Actifs%20%3A"
                className="py-3.5 px-6 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm rounded-xl border border-white/20 transition-all flex items-center justify-center gap-2"
              >
                <span>Transmettre le Dossier par E-mail</span>
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
