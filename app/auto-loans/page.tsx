"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuickApplyModal from "@/components/QuickApplyModal";
import { formatEUR } from "@/lib/utils";
import { 
  Car, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Sparkles, 
  FileText, 
  Clock, 
  Calculator, 
  ChevronRight,
  Award,
  Leaf,
  Settings
} from "lucide-react";

export default function AutoLoansPage() {
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [vehicleType, setVehicleType] = useState<"new" | "used" | "electric">("electric");
  const [vehiclePrice, setVehiclePrice] = useState(32000);
  const [downpaymentPct, setDownpaymentPct] = useState(20);
  const [tenorMonths, setTenorMonths] = useState(48);

  // Calculations
  const downpaymentAmount = (vehiclePrice * downpaymentPct) / 100;
  const loanAmount = Math.max(1000, vehiclePrice - downpaymentAmount);
  
  // Rate based on vehicle type
  const annualRate = vehicleType === "electric" ? 0.0310 : vehicleType === "new" ? 0.0340 : 0.0390;
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
            <span className="font-semibold text-sterling-navy">Ultima Prêt Auto & Éco-Mobilité</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-sterling-navy-deep via-sterling-navy to-[#03234D] text-white py-16 lg:py-24 overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C89D35_1px,transparent_1px)] [background-size:24px_24px]" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold tracking-wide">
                  <Leaf className="w-4 h-4 text-emerald-400" />
                  Ultima Auto • Bonus Véhicule Vert 3,10% TAEG Fixe
                </div>

                <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display text-white leading-tight">
                  Prenez le volant de votre <br />
                  <span className="bg-gradient-to-r from-sterling-gold via-sterling-gold-light to-amber-200 bg-clip-text text-transparent">
                    Nouveau Véhicule
                  </span>
                </h1>

                <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl">
                  Véhicule neuf, d&apos;occasion ou 100% électrique : financez jusqu&apos;à 100% de votre voiture avec ou sans apport personnel. Profitez d&apos;un taux préférentiel et d&apos;une réponse de principe immédiate.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                    <div className="text-xl font-bold text-sterling-gold">Jusqu&apos;à 60 000 $ / €</div>
                    <div className="text-xs text-slate-300">USD & EUR • Neuf & Occasion</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                    <div className="text-xl font-bold text-sterling-gold">0 $ / € Apport</div>
                    <div className="text-xs text-slate-300">Financement à 100% possible</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10 col-span-2 sm:col-span-1">
                    <div className="text-xl font-bold text-sterling-gold">Dès 3,10%</div>
                    <div className="text-xs text-slate-300">TAEG fixe bonifié éco</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 pt-4">
                  <button
                    onClick={() => setApplyModalOpen(true)}
                    className="bg-gradient-to-r from-sterling-gold via-sterling-gold-light to-sterling-gold text-sterling-navy-deep font-bold px-7 py-3.5 rounded-xl shadow-lg hover:shadow-sterling-gold/30 hover:scale-[1.02] transition-all flex items-center gap-2"
                  >
                    Demander mon Prêt Auto
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </button>
                  <a
                    href="#auto-calculator"
                    className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3.5 rounded-xl border border-white/20 transition-all flex items-center gap-2"
                  >
                    <Calculator className="w-4 h-4 text-sterling-gold" />
                    Simulateur Véhicule
                  </a>
                </div>
              </div>

              {/* Real Human / Vehicle Photography */}
              <div className="lg:col-span-5 relative">
                <div className="relative mx-auto max-w-md rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 bg-slate-800">
                  <img
                    src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80"
                    alt="Voiture électrique en recharge"
                    className="w-full h-80 sm:h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-xs font-semibold uppercase tracking-wider text-sterling-gold">Financement Éco-Mobilité</span>
                    </div>
                    <div className="text-lg font-bold">Compatible Bonus Écologique & Prime à la Conversion</div>
                    <div className="text-xs text-slate-300">Financez également votre borne de recharge à domicile à taux zéro additionnel.</div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Specialized Auto Loan Simulator Section */}
        <section id="auto-calculator" className="py-20 bg-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-sterling-gold bg-sterling-navy/5 px-3 py-1 rounded-full">
                Simulateur Ultima Auto
              </span>
              <h2 className="text-3xl font-extrabold text-sterling-navy font-display">
                Personnalisez votre Financement Auto
              </h2>
              <p className="text-xs text-slate-500">
                Ajustez le prix d&apos;achat, votre apport éventuel et la durée de remboursement.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 space-y-8">
              
              {/* Vehicle Type Tabs */}
              <div className="grid grid-cols-3 gap-2 p-1.5 bg-slate-100 rounded-2xl text-xs font-bold">
                {[
                  { id: "electric", label: "Électrique / Hybride", rate: "3,10% TAEG", icon: Zap },
                  { id: "new", label: "Véhicule Neuf", rate: "3,40% TAEG", icon: Sparkles },
                  { id: "used", label: "Véhicule d'Occasion", rate: "3,90% TAEG", icon: Car },
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setVehicleType(t.id as any)}
                    className={`py-3 px-2 rounded-xl transition-all flex flex-col items-center gap-1 ${
                      vehicleType === t.id
                        ? "bg-white text-sterling-navy shadow-sm"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    <t.icon className={`w-4 h-4 ${vehicleType === t.id ? "text-sterling-gold" : "text-slate-400"}`} />
                    <span>{t.label}</span>
                    <span className="text-[10px] text-emerald-600 font-semibold">{t.rate}</span>
                  </button>
                ))}
              </div>

              {/* Sliders */}
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold text-slate-700">Prix du Véhicule (€)</label>
                    <span className="text-xl font-black text-sterling-navy font-mono">{formatEUR(vehiclePrice)}</span>
                  </div>
                  <input
                    type="range"
                    min={5000}
                    max={60000}
                    step={1000}
                    value={vehiclePrice}
                    onChange={(e) => setVehiclePrice(Number(e.target.value))}
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>5 000 €</span>
                    <span>60 000 €</span>
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
                    max={50}
                    step={5}
                    value={downpaymentPct}
                    onChange={(e) => setDownpaymentPct(Number(e.target.value))}
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>0% (Sans apport)</span>
                    <span>50%</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold text-slate-700">Durée du Financement</label>
                    <span className="text-base font-bold text-sterling-navy font-mono">{tenorMonths} Mois ({tenorMonths / 12} ans)</span>
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {[12, 24, 36, 48, 60, 72, 84].slice(0, 5).map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setTenorMonths(m)}
                        className={`py-2 rounded-xl text-xs font-bold border transition-colors ${
                          tenorMonths === m
                            ? "bg-sterling-navy text-white border-sterling-navy"
                            : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        {m} m.
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Calculated Result Box */}
              <div className="bg-gradient-to-br from-slate-50 to-amber-50/40 rounded-2xl p-6 border border-amber-100 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-1">
                    Mensualité Estimée (hors assurance)
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
                  Valider ce Financement
                  <ArrowRight className="w-4 h-4 stroke-[3]" />
                </button>
              </div>

            </div>
          </div>
        </section>

        {/* Required Documents for Auto Loan */}
        <section className="py-16 bg-white border-t border-slate-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-sterling-gold bg-sterling-navy/5 px-3 py-1 rounded-full">
                Justificatifs Auto
              </span>
              <h3 className="text-2xl font-bold text-sterling-navy">
                Documents Requis pour votre Dossier Auto
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                <FileText className="w-6 h-6 text-sterling-gold" />
                <h4 className="text-sm font-bold text-sterling-navy">Bon de Commande ou Devis</h4>
                <p className="text-xs text-slate-600">
                  Émis par le concessionnaire (ou certificat de non-gage + copie de carte grise si achat à un particulier).
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                <FileText className="w-6 h-6 text-sterling-gold" />
                <h4 className="text-sm font-bold text-sterling-navy">Justificatifs de Revenus</h4>
                <p className="text-xs text-slate-600">
                  Vos 3 derniers bulletins de paie et votre dernier avis d&apos;imposition sur le revenu.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                <FileText className="w-6 h-6 text-sterling-gold" />
                <h4 className="text-sm font-bold text-sterling-navy">Pièce d&apos;Identité & RIB</h4>
                <p className="text-xs text-slate-600">
                  CNI ou Passeport en cours de validité + RIB à votre nom pour la mise en place du prélèvement SEPA.
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
        defaultLoanType="auto"
        defaultAmount={loanAmount}
        defaultTenor={tenorMonths}
      />
    </div>
  );
}
