"use client";

import React from "react";
import { 
  Sliders, 
  FileText, 
  UploadCloud, 
  Banknote, 
  ArrowRight, 
  Clock, 
  CheckCircle2 
} from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Simulez Votre Crédit",
      description: "Choisissez le montant et la durée adaptés à votre budget mensuel. Visualisez immédiatement votre TAEG fixe et vos mensualités sans engagement.",
      icon: Sliders,
      eta: "1 Minute",
    },
    {
      number: "02",
      title: "Remplissez le Formulaire",
      description: "Saisissez vos informations personnelles et professionnelles en quelques clics grâce à notre parcours simplifié et sécurisé.",
      icon: FileText,
      eta: "3-5 Minutes",
    },
    {
      number: "03",
      title: "Téléversez vos Justificatifs",
      description: "Prenez en photo votre pièce d'identité (CNI/Passeport), vos bulletins de paie et votre RIB depuis votre smartphone.",
      icon: UploadCloud,
      eta: "Instantané",
    },
    {
      number: "04",
      title: "Fonds Versés sous 48h",
      description: "Après étude et signature électronique de votre contrat, vos fonds sont transférés directement par virement SEPA sur votre compte bancaire.",
      icon: Banknote,
      eta: "48 Heures",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-sterling-gold uppercase tracking-wider bg-sterling-navy/5 px-3 py-1 rounded-full">
            <Clock className="w-3.5 h-3.5" />
            Parcours 100% Digital
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-sterling-navy font-display tracking-tight">
            Comment Obtenir Votre Crédit en 4 Étapes Simples
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Fini les rendez-vous en agence, les dossiers papier interminables et les délais d&apos;attente. Gérez votre demande entièrement à distance.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="bg-slate-50/80 rounded-2xl p-6 border border-slate-200/80 hover:border-sterling-gold/50 hover:bg-white hover:shadow-xl transition-all duration-300 relative group flex flex-col justify-between"
              >
                <div>
                  {/* Step Number & Time Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-black text-slate-300 group-hover:text-sterling-gold transition-colors font-display">
                      {step.number}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500 bg-white px-2.5 py-1 rounded-full border border-slate-200 shadow-sm flex items-center gap-1">
                      <Clock className="w-3 h-3 text-sterling-gold" />
                      {step.eta}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-sterling-navy text-sterling-gold flex items-center justify-center mb-5 shadow-md group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 stroke-[2]" />
                  </div>

                  {/* Title & Body */}
                  <h3 className="text-lg font-bold text-sterling-navy mb-2.5">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {step.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/60 flex items-center gap-1 text-[11px] font-bold text-sterling-gold-dark">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sterling-gold" />
                  <span>Canal Bancaire Sécurisé</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-14 bg-gradient-to-r from-sterling-navy-deep to-sterling-navy rounded-2xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg font-bold text-sterling-gold-light">
              Vous avez déjà déposé un dossier de crédit ?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Consultez l&apos;état d&apos;avancement de votre demande en temps réel à l&apos;aide de votre référence dossier.
            </p>
          </div>
          <a
            href="#tracker"
            className="shrink-0 bg-white hover:bg-slate-100 text-sterling-navy-deep font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition-all shadow-md flex items-center gap-2"
          >
            Suivre Mon Dossier
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </a>
        </div>
      </div>
    </section>
  );
}
