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
  const products = [
    {
      id: "personnel",
      name: "Prêt Personnel Tous Projets",
      badge: "Le Plus Populaire",
      category: "Crédit Sans Justificatif",
      icon: UserCheck,
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
      amount: "De 1 000 € à 75 000 €",
      terms: "12 à 84 Mois",
      rate: "TAEG fixe dès 3,90%",
      features: [
        "Sans justificatif d'utilisation des fonds",
        "Mensualités modulables à la hausse ou à la baisse",
        "Aucun frais de dossier ni pénalité de remboursement anticipé",
        "Remboursement par prélèvement SEPA automatique",
      ],
      cta: "Simuler mon Prêt Personnel",
      popular: true,
    },
    {
      id: "auto",
      name: "Prêt Auto & Mobilité Propre",
      badge: "Bonus Éco Inclus",
      category: "Financement Véhicule",
      icon: Car,
      image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80",
      amount: "Jusqu'à 60 000 €",
      terms: "12 à 84 Mois",
      rate: "TAEG fixe dès 3,20%",
      features: [
        "Véhicules neufs ou occasions (particulier ou concessionnaire)",
        "Taux préférentiel pour voitures électriques & hybrides",
        "Possibilité de financer 100% de la carte grise et accessoires",
        "Report de la première mensualité jusqu'à 3 mois",
      ],
      cta: "Simuler mon Prêt Auto",
      popular: false,
    },
    {
      id: "immo",
      name: "Prêt Travaux & Éco-Rénovation",
      badge: "Jusqu'à 15 Ans",
      category: "Rénovation & Habitat",
      icon: Home,
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=600&q=80",
      amount: "Jusqu'à 150 000 €",
      terms: "24 à 180 Mois",
      rate: "TAEG fixe dès 2,85%",
      features: [
        "Travaux d'isolation, panneaux solaires, cuisine ou agrandissement",
        "Compatible avec les aides de l'État (MaPrimeRénov')",
        "Déblocage des fonds en une ou plusieurs fois selon factures",
        "Assurance emprunteur facultative et personnalisée",
      ],
      cta: "Simuler mon Prêt Travaux",
      popular: false,
    },
  ];

  return (
    <section id="products" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-sterling-gold-dark px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-sterling-gold" />
            Gamme Crédits Sterling Bank France
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-sterling-navy tracking-tight font-display">
            Des Solutions de Financement Conçues pour Vous
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Choisissez l&apos;offre adaptée à votre situation en toute clarté. Profitez d&apos;un taux fixe garanti sur toute la durée de votre prêt.
          </p>
        </div>

        {/* Product Cards Grid with Real People Photography */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {products.map((product) => (
            <div
              key={product.id}
              className={`rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-300 relative ${
                product.popular
                  ? "bg-white border-2 border-sterling-gold shadow-2xl scale-105 z-10"
                  : "bg-white border border-slate-200 shadow-lg hover:shadow-xl hover:-translate-y-1"
              }`}
            >
              {/* Card Image Banner - Authentic Human Photography */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />
                
                {/* Popular Pill */}
                {product.badge && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-sterling-gold to-sterling-gold-light text-sterling-navy-deep font-extrabold text-[11px] px-3.5 py-1 rounded-full shadow-md uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-sterling-navy-deep" />
                    {product.badge}
                  </div>
                )}

                <div className="absolute bottom-3 left-4 text-white">
                  <span className="text-[11px] font-semibold text-sterling-gold uppercase tracking-wider block">
                    {product.category}
                  </span>
                  <span className="text-lg font-bold font-display leading-tight">
                    {product.name}
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  {/* Highlights Box */}
                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 mb-6 space-y-2">
                    <div className="flex justify-between items-baseline text-xs">
                      <span className="text-slate-500 font-medium">Montant empruntable :</span>
                      <span className="font-bold text-sterling-navy text-sm">{product.amount}</span>
                    </div>
                    <div className="flex justify-between items-baseline text-xs">
                      <span className="text-slate-500 font-medium">Durée de prêt :</span>
                      <span className="font-bold text-slate-800">{product.terms}</span>
                    </div>
                    <div className="flex justify-between items-baseline text-xs">
                      <span className="text-slate-500 font-medium">Taux garanti :</span>
                      <span className="font-bold text-emerald-700">{product.rate}</span>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 mb-8">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Avantages Clés :
                    </div>
                    {product.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-600 leading-relaxed">
                        <div className="p-0.5 rounded-full bg-emerald-50 text-emerald-600 mt-0.5 shrink-0">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="space-y-2">
                  <button
                    onClick={() => onOpenApply?.(product.id)}
                    className={`w-full py-3.5 px-5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                      product.popular
                        ? "bg-sterling-gold hover:bg-sterling-gold-dark text-sterling-navy-deep shadow-md hover:shadow-lg"
                        : "bg-sterling-navy hover:bg-sterling-navy-light text-white shadow-sm"
                    }`}
                  >
                    {product.cta}
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </button>

                  {product.id === "personnel" && (
                    <Link
                      href="/personal-loans"
                      className="w-full py-2 px-3 text-xs font-semibold text-sterling-navy hover:text-sterling-gold text-center block transition-colors border border-slate-200 rounded-lg bg-slate-50 hover:bg-slate-100"
                    >
                      Consulter la page détaillée Prêt Personnel →
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
