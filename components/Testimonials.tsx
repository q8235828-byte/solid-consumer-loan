"use client";

import React from "react";
import { Star, Quote, CheckCircle2, ThumbsUp } from "lucide-react";

interface TestimonialsProps {
  onOpenApply?: (loanType?: string) => void;
}

export default function Testimonials({ onOpenApply }: TestimonialsProps = {}) {
  const reviews = [
    {
      name: "Julien Dupont",
      city: "Paris 11e",
      role: "Architecte d'intérieur",
      loanType: "Prêt Travaux (32 000 €)",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      rating: 5,
      date: "Avis vérifié • Octobre 2026",
      comment:
        "J'avais besoin de financer la rénovation de notre appartement haussmannien. Réponse de principe en quelques minutes et déblocage des fonds en 48 heures. Taux bien plus bas que ma banque traditionnelle.",
    },
    {
      name: "Claire Mercier",
      city: "Bordeaux",
      role: "Responsable Marketing",
      loanType: "Prêt Auto Électrique (24 500 €)",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
      rating: 5,
      date: "Avis vérifié • Septembre 2026",
      comment:
        "Expérience 100% fluide sur smartphone. J'ai simplement photographié mes fiches de paie et ma pièce d'identité. Aucun appel insistant, tout est clair, transparent et rapide.",
    },
    {
      name: "Alexandre & Sophie Martin",
      city: "Lyon",
      role: "Enseignants",
      loanType: "Prêt Personnel (15 000 €)",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      rating: 5,
      date: "Avis vérifié • Août 2026",
      comment:
        "Le simulateur donne exactement le montant de la mensualité finale sans surprise. Conseillère très courtoise et disponible par téléphone. Je recommande Sterling Bank les yeux fermés.",
    },
  ];

  return (
    <section id="testimonials" className="py-20 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-sterling-gold uppercase tracking-wider bg-sterling-navy/5 px-3 py-1 rounded-full">
            <ThumbsUp className="w-3.5 h-3.5" />
            Témoignages Clients Réels
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-sterling-navy font-display tracking-tight">
            Ils Ont Réalisé Leurs Projets avec Sterling Bank
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Découvrez les retours d&apos;expérience de nos clients en France métropolitaine. Note moyenne certifiée de **4.9 / 5**.
          </p>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-slate-50 rounded-3xl p-7 border border-slate-200/80 hover:border-sterling-gold/50 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Rating stars & Quote Icon */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 stroke-none" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-slate-300 stroke-[1.5]" />
                </div>

                {/* Comment */}
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic mb-6">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-slate-200/70 flex items-center gap-3.5">
                <img
                  src={rev.image}
                  alt={rev.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-sterling-gold shrink-0 shadow-sm"
                />
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-sterling-navy">{rev.name}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {rev.city} • <span className="font-semibold text-slate-700">{rev.loanType}</span>
                  </div>
                  <div className="text-[10px] text-slate-400">{rev.date}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trustpilot Banner */}
        <div className="mt-12 bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sterling-navy">Excellent</span>
            <div className="flex text-emerald-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-emerald-500 stroke-none" />
              ))}
            </div>
            <span>Score Trustpilot : 4.9 sur 5</span>
          </div>
          <div className="text-slate-500">
            Avis collectés conformément à la norme NF Service « Gestion des avis clients ».
          </div>
        </div>

      </div>
    </section>
  );
}
