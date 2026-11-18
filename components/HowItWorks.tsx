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
import { useLanguage } from "@/lib/LanguageContext";

export default function HowItWorks() {
  const { t } = useLanguage();

  const steps = [
    {
      number: "01",
      title: t("1. Soumettez Votre Demande", "1. Submit Your Application"),
      description: t(
        "Présentez vos besoins financiers ou votre proposition commerciale via notre portail de candidature numérique sécurisé.",
        "Tell us about your financial needs or business proposal through our secure online portal."
      ),
      icon: FileText,
      tag: t("Initialisation", "Submission"),
    },
    {
      number: "02",
      title: t("2. Examen du Dossier", "2. Application Review"),
      description: t(
        "Notre équipe évalue votre projet, vos antécédents financiers et votre éligibilité avec rapidité et discrétion.",
        "Our team assesses your project, financial background, and eligibility swiftly and discreetly."
      ),
      icon: Sliders,
      tag: t("Évaluation", "Assessment"),
    },
    {
      number: "03",
      title: t("3. Mise en Relation Investisseurs", "3. Investor Connection"),
      description: t(
        "Les propositions qualifiées peuvent être associées à des partenaires d'investissement et investisseurs privés adaptés.",
        "Qualified proposals may be matched with suitable private investors and international capital partners."
      ),
      icon: UploadCloud,
      tag: t("Mise en Relation", "Matching"),
    },
    {
      number: "04",
      title: t("4. Accord Contractuel", "4. Agreement"),
      description: t(
        "Les deux parties examinent, négocient et conviennent mutuellement des termes détaillés, conditions et clauses contractuelles.",
        "Both parties discuss and agree on the investment terms, amortization schedules, and contractual conditions."
      ),
      icon: CheckCircle2,
      tag: t("Négociation", "Agreement"),
    },
    {
      number: "05",
      title: t("5. Financement & Versement", "5. Funding"),
      description: t(
        "Le déblocage du financement intervient après vérification complète, approbation formelle et conclusion de l'accord légal.",
        "Financing proceeds after successful verification, formal approval, due diligence, and executed legal contract."
      ),
      icon: Banknote,
      tag: t("Déblocage", "Disbursement"),
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-sterling-gold uppercase tracking-wider bg-sterling-navy/5 px-3 py-1 rounded-full">
            <Clock className="w-3.5 h-3.5" />
            {t("Procédure Claire & Accélérée", "Clear & Accelerated Process")}
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-sterling-navy font-display tracking-tight">
            {t("COMMENT ÇA FONCTIONNE ?", "HOW DOES IT WORK?")}
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            {t(
              "Un parcours transparent et professionnel en 5 étapes reliant votre vision aux capitaux institutionnels et à des partenaires d'investissement vérifiés.",
              "A transparent 5-step process connecting your vision with institutional capital and verified investment partners worldwide."
            )}
          </p>
        </div>

        {/* 5 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative bg-slate-50/80 rounded-3xl p-6 border border-slate-200/80 hover:border-sterling-gold/50 hover:bg-white hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Step Header */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-2xl font-black text-sterling-gold/40 group-hover:text-sterling-gold transition-colors">
                      {step.number}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-sterling-navy/5 text-sterling-navy font-mono">
                      {step.tag}
                    </span>
                  </div>

                  <div className="w-11 h-11 rounded-2xl bg-white shadow-sm border border-slate-200/80 flex items-center justify-center text-sterling-navy group-hover:bg-sterling-navy group-hover:text-sterling-gold transition-all duration-300">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="text-base font-bold text-sterling-navy font-display">
                    {step.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Step Footer */}
                <div className="pt-4 mt-5 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1.5 text-emerald-600 font-semibold text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5" /> {t(`Étape ${idx + 1} sur 5`, `Step ${idx + 1} of 5`)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
