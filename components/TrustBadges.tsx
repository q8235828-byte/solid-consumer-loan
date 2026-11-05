"use client";

import React from "react";
import { ShieldCheck, Lock, Award, Building } from "lucide-react";

export default function TrustBadges() {
  const badges = [
    {
      title: "ACPR • Banque de France",
      subtitle: "Établissement de Crédit Agréé",
      description: "Sterling Bank est agréée et contrôlée par l'Autorité de Contrôle Prudentiel et de Résolution (Code Banque 10248).",
      icon: Building,
    },
    {
      title: "Garantie FGDR",
      subtitle: "Protection des Avoirs",
      description: "Adhérent au Fonds de Garantie des Dépôts et de Résolution, vos comptes sont couverts jusqu'à 100 000 € par déposant.",
      icon: Award,
    },
    {
      title: "Conformité RGPD",
      subtitle: "Protection des Données Personnelles",
      description: "Vos informations sont traitées dans le strict respect de la réglementation européenne et de la CNIL.",
      icon: ShieldCheck,
    },
    {
      title: "Sécurité & E-Signature eIDAS",
      subtitle: "Chiffrement Bancaire 256-bit",
      description: "Protocole TLS 1.3 certifié et signature électronique qualifiée conforme aux normes bancaires de l'Union Européenne.",
      icon: Lock,
    },
  ];

  return (
    <section className="py-14 bg-slate-100/70 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {badges.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex items-start gap-4 hover:border-sterling-gold/50 transition-colors"
              >
                <div className="w-11 h-11 rounded-xl bg-sterling-navy/5 flex items-center justify-center text-sterling-gold shrink-0 mt-0.5">
                  <Icon className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-sterling-navy leading-tight">
                    {badge.title}
                  </h4>
                  <div className="text-[11px] font-semibold text-sterling-gold-dark mt-0.5 mb-1.5">
                    {badge.subtitle}
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    {badge.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
