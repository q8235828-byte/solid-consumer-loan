"use client";

import React, { useState } from "react";
import { 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Calculator, 
  ShieldCheck,
  Check,
  HelpCircle
} from "lucide-react";
import { formatEUR } from "@/lib/utils";

interface EligibilityQuizProps {
  onOpenApply?: (loanType?: string) => void;
}

export default function EligibilityQuiz({ onOpenApply }: EligibilityQuizProps) {
  const [age, setAge] = useState(32);
  const [employment, setEmployment] = useState("cdi");
  const [income, setIncome] = useState(3000);
  const [existingDebt, setExistingDebt] = useState(300);
  const [calculated, setCalculated] = useState(false);

  // Debt-to-income (DTI) calculation according to French banking standards (HCSF 35% max)
  const maxAllowablePayment = (income * 0.35) - existingDebt;
  const isEligible = age >= 18 && age <= 75 && maxAllowablePayment > 100 && (employment === "cdi" || employment === "fonctionnaire" || employment === "liberal");
  const estimatedCapacity = Math.max(1000, Math.floor((maxAllowablePayment * 48 * 0.92) / 1000) * 1000);

  const handleTestEligibility = (e: React.FormEvent) => {
    e.preventDefault();
    setCalculated(true);
  };

  return (
    <section className="py-16 bg-white border-y border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-gradient-to-br from-slate-900 via-sterling-navy-deep to-sterling-navy rounded-3xl p-6 sm:p-10 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-sterling-gold/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left intro (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sterling-gold/20 text-sterling-gold text-xs font-bold border border-sterling-gold/30">
                <Sparkles className="w-3.5 h-3.5" />
                Test d&apos;Éligibilité Immédiat (30 sec)
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display leading-tight">
                Vérifiez votre Capacité d&apos;Emprunt
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Sans aucun impact sur votre dossier bancaire, évaluez immédiatement votre éligibilité selon les critères officiels du HCSF (Haut Conseil de Stabilité Financière).
              </p>

              <div className="pt-2 text-xs text-slate-300 space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Calcul d&apos;endettement plafonné à 35%</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Aucun justificatif demandé pour ce test</span>
                </div>
              </div>
            </div>

            {/* Right form (7 cols) */}
            <div className="lg:col-span-7 bg-white text-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
              <form onSubmit={handleTestEligibility} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Votre Âge : {age} ans</label>
                    <input
                      type="range"
                      min={18}
                      max={75}
                      value={age}
                      onChange={(e) => setAge(Number(e.target.value))}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Situation Professionnelle</label>
                    <select
                      value={employment}
                      onChange={(e) => setEmployment(e.target.value)}
                      className="w-full p-2 rounded-lg border border-slate-200 text-xs font-medium bg-slate-50 outline-none"
                    >
                      <option value="cdi">Salarié en CDI</option>
                      <option value="fonctionnaire">Fonctionnaire titulaire</option>
                      <option value="liberal">Profession Libérale / Artisan</option>
                      <option value="retraite">Retraité</option>
                      <option value="cdd">Salarié en CDD / Intérim</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Revenu Net Mensuel (€)</label>
                    <input
                      type="number"
                      step={100}
                      value={income}
                      onChange={(e) => setIncome(Number(e.target.value))}
                      className="w-full p-2.5 rounded-lg border border-slate-200 text-sm font-bold text-sterling-navy bg-slate-50 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Autres Crédits en Cours (€/mois)</label>
                    <input
                      type="number"
                      step={50}
                      value={existingDebt}
                      onChange={(e) => setExistingDebt(Number(e.target.value))}
                      className="w-full p-2.5 rounded-lg border border-slate-200 text-sm font-bold text-slate-700 bg-slate-50 outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-sterling-navy hover:bg-sterling-navy-light text-white font-extrabold text-xs transition-all flex items-center justify-center gap-2 shadow-md"
                >
                  <Calculator className="w-4 h-4 text-sterling-gold" />
                  Calculer mon Éligibilité
                </button>
              </form>

              {/* Quiz Result */}
              {calculated && (
                <div className={`p-4 rounded-xl border text-xs space-y-2 animate-in fade-in duration-200 ${
                  isEligible ? "bg-emerald-50 border-emerald-200 text-emerald-900" : "bg-amber-50 border-amber-200 text-amber-900"
                }`}>
                  <div className="flex items-center justify-between font-bold">
                    <span className="flex items-center gap-1.5 text-sm">
                      {isEligible ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <AlertCircle className="w-4 h-4 text-amber-600" />}
                      {isEligible ? "Profil Favorable • Pré-Éligible !" : "Profil à Étudier par un Conseiller"}
                    </span>
                    {isEligible && (
                      <span className="text-emerald-700 font-mono text-sm">
                        Jusqu&apos;à {formatEUR(estimatedCapacity)}
                      </span>
                    )}
                  </div>

                  <p className="text-[11px] leading-relaxed">
                    {isEligible 
                      ? `Votre capacité mensuelle disponible est estimée à environ ${formatEUR(maxAllowablePayment)} / mois (taux d'effort respectant le seuil de 35%). Vous pouvez déposer votre demande en toute confiance.`
                      : "Votre ratio d'endettement actuel ou votre statut professionnel nécessite un examen approfondi par nos analystes pour vous proposer une solution adaptée (regroupement de crédits ou co-emprunteur)."}
                  </p>

                  {isEligible && (
                    <button
                      onClick={() => onOpenApply?.("persona")}
                      className="mt-2 w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      Déposer ma demande avec ce profil
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              )}

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
