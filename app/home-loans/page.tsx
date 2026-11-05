"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuickApplyModal from "@/components/QuickApplyModal";
import { formatEUR } from "@/lib/utils";
import { 
  Home, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  FileText, 
  Clock, 
  Calculator, 
  ChevronRight,
  Hammer,
  Key
} from "lucide-react";

export default function HomeLoansPage() {
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [projectType, setProjectType] = useState<"acquisition" | "renovation" | "construction">("renovation");
  const [projectAmount, setProjectAmount] = useState(65000);
  const [downpaymentPct, setDownpaymentPct] = useState(15);
  const [tenorYears, setTenorYears] = useState(15);

  const downpaymentAmount = (projectAmount * downpaymentPct) / 100;
  const loanAmount = Math.max(5000, projectAmount - downpaymentAmount);
  
  // Rate based on project type
  const annualRate = projectType === "renovation" ? 0.0285 : 0.0345;
  const tenorMonths = tenorYears * 12;
  const monthlyRate = annualRate / 12;
  const monthlyPayment = (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -tenorMonths));
  const totalCost = monthlyPayment * tenorMonths;
  const totalInterest = totalCost - loanAmount;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-800">
      <Navbar onOpenApply={() => setApplyModalOpen(true)} />

      <main className="flex-1">
        {/* Breadcrumb Navigation */}
        <div className="bg-slate-100 border-b border-slate-200 py-2.5 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-slate-500">
            <Link href="/" className="hover:text-sterling-navy transition-colors">Accueil</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-400">Crédits Particuliers</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="font-semibold text-sterling-navy">Discovery Prêt Travaux & Immobilier</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-sterling-navy-deep via-sterling-navy to-[#03234D] text-white py-16 lg:py-24 overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C89D35_1px,transparent_1px)] [background-size:24px_24px]" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sterling-gold/20 border border-sterling-gold/40 text-sterling-gold text-xs font-bold tracking-wide">
                  <Home className="w-4 h-4" />
                  Discovery Habitat • TAEG Fixe dès 2,85%
                </div>

                <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display text-white leading-tight">
                  Construisez ou Rénovez <br />
                  <span className="bg-gradient-to-r from-sterling-gold via-sterling-gold-light to-amber-200 bg-clip-text text-transparent">
                    La Maison de Vos Rêves
                  </span>
                </h1>

                <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl">
                  Rénovation énergétique, extension, aménagement intérieur ou acquisition immobilière : bénéficiez d&apos;un prêt à taux fixe garanti sur une durée allant jusqu&apos;à 25 ans avec un accompagnement sur-mesure.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                    <div className="text-xl font-bold text-sterling-gold">Jusqu&apos;à 150 000 $ / €</div>
                    <div className="text-xs text-slate-300">USD & EUR • Travaux & Habitat</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                    <div className="text-xl font-bold text-sterling-gold">Jusqu&apos;à 25 Ans</div>
                    <div className="text-xs text-slate-300">Mensualités allégées</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10 col-span-2 sm:col-span-1">
                    <div className="text-xl font-bold text-sterling-gold">Dès 2,85%</div>
                    <div className="text-xs text-slate-300">TAEG fixe sans surprise</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 pt-4">
                  <button
                    onClick={() => setApplyModalOpen(true)}
                    className="bg-gradient-to-r from-sterling-gold via-sterling-gold-light to-sterling-gold text-sterling-navy-deep font-bold px-7 py-3.5 rounded-xl shadow-lg hover:shadow-sterling-gold/30 hover:scale-[1.02] transition-all flex items-center gap-2"
                  >
                    Faire ma Demande Travaux
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </button>
                  <a
                    href="#home-calculator"
                    className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3.5 rounded-xl border border-white/20 transition-all flex items-center gap-2"
                  >
                    <Calculator className="w-4 h-4 text-sterling-gold" />
                    Simuler le Financement
                  </a>
                </div>
              </div>

              {/* Real Home Renovation Photography */}
              <div className="lg:col-span-5 relative">
                <div className="relative mx-auto max-w-md rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 bg-slate-800">
                  <img
                    src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80"
                    alt="Rénovation appartement haussmannien à Paris"
                    className="w-full h-80 sm:h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-xs font-semibold uppercase tracking-wider text-sterling-gold">Éco-Rénovation & Habitat</span>
                    </div>
                    <div className="text-lg font-bold">Améliorez votre DPE & Réduisez vos factures</div>
                    <div className="text-xs text-slate-300">Isolation thermique, pompe à chaleur, double vitrage et cuisine équipée.</div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Specialized Mortgage / Renovation Calculator */}
        <section id="home-calculator" className="py-20 bg-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-sterling-gold bg-sterling-navy/5 px-3 py-1 rounded-full">
                Simulateur Discovery Habitat
              </span>
              <h2 className="text-3xl font-extrabold text-sterling-navy font-display">
                Calculez le Budget de vos Travaux
              </h2>
              <p className="text-xs text-slate-500">
                Ajustez le montant estimé des travaux, votre apport et la durée de l&apos;emprunt.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 space-y-8">
              
              {/* Project Type */}
              <div className="grid grid-cols-3 gap-2 p-1.5 bg-slate-100 rounded-2xl text-xs font-bold">
                {[
                  { id: "renovation", label: "Travaux & Rénovation", rate: "2,85% TAEG", icon: Hammer },
                  { id: "acquisition", label: "Achat & Aménagement", rate: "3,45% TAEG", icon: Key },
                  { id: "construction", label: "Agrandissement / Véranda", rate: "3,20% TAEG", icon: Home },
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setProjectType(t.id as any)}
                    className={`py-3 px-2 rounded-xl transition-all flex flex-col items-center gap-1 ${
                      projectType === t.id
                        ? "bg-white text-sterling-navy shadow-sm"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    <t.icon className={`w-4 h-4 ${projectType === t.id ? "text-sterling-gold" : "text-slate-400"}`} />
                    <span>{t.label}</span>
                    <span className="text-[10px] text-emerald-600 font-semibold">{t.rate}</span>
                  </button>
                ))}
              </div>

              {/* Sliders */}
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold text-slate-700">Montant Global du Projet (€)</label>
                    <span className="text-xl font-black text-sterling-navy font-mono">{formatEUR(projectAmount)}</span>
                  </div>
                  <input
                    type="range"
                    min={10000}
                    max={150000}
                    step={2500}
                    value={projectAmount}
                    onChange={(e) => setProjectAmount(Number(e.target.value))}
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>10 000 €</span>
                    <span>150 000 €</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold text-slate-700">Apport Personnel ({downpaymentPct}%)</label>
                    <span className="text-sm font-bold text-slate-600 font-mono">{formatEUR(downpaymentAmount)}</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={40}
                    step={5}
                    value={downpaymentPct}
                    onChange={(e) => setDownpaymentPct(Number(e.target.value))}
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>0% (Sans apport)</span>
                    <span>40%</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold text-slate-700">Durée du Prêt</label>
                    <span className="text-base font-bold text-sterling-navy font-mono">{tenorYears} Ans ({tenorMonths} Mois)</span>
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {[5, 7, 10, 15, 20].map((y) => (
                      <button
                        key={y}
                        type="button"
                        onClick={() => setTenorYears(y)}
                        className={`py-2 rounded-xl text-xs font-bold border transition-colors ${
                          tenorYears === y
                            ? "bg-sterling-navy text-white border-sterling-navy"
                            : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        {y} ans
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Calculated Result Box */}
              <div className="bg-gradient-to-br from-slate-50 to-amber-50/40 rounded-2xl p-6 border border-amber-100 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-1">
                    Mensualité Estimée
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black text-sterling-navy font-display">
                      {formatEUR(monthlyPayment)}
                    </span>
                    <span className="text-xs font-medium text-slate-500">/ mois</span>
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    Montant emprunté : <strong>{formatEUR(loanAmount)}</strong> • TAEG fixe : <strong>{(annualRate * 100).toFixed(2)}%</strong>
                  </div>
                </div>

                <button
                  onClick={() => setApplyModalOpen(true)}
                  className="w-full sm:w-auto bg-gradient-to-r from-sterling-gold via-sterling-gold-light to-sterling-gold text-sterling-navy-deep font-black py-4 px-8 rounded-xl shadow-lg hover:shadow-sterling-gold/30 transition-all flex items-center justify-center gap-2 text-sm"
                >
                  Déposer mon Dossier
                  <ArrowRight className="w-4 h-4 stroke-[3]" />
                </button>
              </div>

            </div>
          </div>
        </section>

        {/* Required Documents for Home/Travaux */}
        <section className="py-16 bg-white border-t border-slate-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-sterling-gold bg-sterling-navy/5 px-3 py-1 rounded-full">
                Pièces Requises
              </span>
              <h3 className="text-2xl font-bold text-sterling-navy">
                Documents Requis pour votre Financement Travaux
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                <FileText className="w-6 h-6 text-sterling-gold" />
                <h4 className="text-sm font-bold text-sterling-navy">Devis des Artisans / RGE</h4>
                <p className="text-xs text-slate-600">
                  Devis détaillés des travaux prévus émis par des professionnels certifiés RGE.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                <FileText className="w-6 h-6 text-sterling-gold" />
                <h4 className="text-sm font-bold text-sterling-navy">Titre de Propriété ou Bail</h4>
                <p className="text-xs text-slate-600">
                  Justificatif de propriété du bien immobilier à rénover (attestation notariée ou taxe foncière).
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                <FileText className="w-6 h-6 text-sterling-gold" />
                <h4 className="text-sm font-bold text-sterling-navy">Justificatifs de Revenus</h4>
                <p className="text-xs text-slate-600">
                  Vos 3 derniers bulletins de salaire et vos 2 derniers avis d&apos;imposition pour le calcul du taux d&apos;endettement.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mandatory warning */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="p-4 bg-amber-500/10 border border-amber-400/30 rounded-xl text-center">
            <p className="text-xs md:text-sm font-semibold text-amber-800 tracking-wide">
              « Un crédit vous engage et doit être remboursé. Vérifiez vos capacités de remboursement avant de vous engager. »
            </p>
          </div>
        </div>

      </main>

      <Footer />

      <QuickApplyModal
        isOpen={applyModalOpen}
        onClose={() => setApplyModalOpen(false)}
        defaultLoanType="home"
        defaultAmount={loanAmount}
        defaultTenor={tenorMonths}
      />
    </div>
  );
}
