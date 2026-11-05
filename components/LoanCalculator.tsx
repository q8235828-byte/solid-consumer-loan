"use client";

import React, { useState, useMemo } from "react";
import { 
  Calculator, 
  ArrowRight, 
  Sparkles, 
  Table, 
  Car, 
  Home, 
  UserCheck,
  ShieldAlert
} from "lucide-react";
import { formatEUR } from "@/lib/utils";
import AmortizationModal from "./AmortizationModal";

interface LoanCalculatorProps {
  onApply?: (loanType: string, amount: number, tenor: number) => void;
}

export default function LoanCalculator({ onApply }: LoanCalculatorProps) {
  const [selectedProduct, setSelectedProduct] = useState<"personnel" | "auto" | "immo">("personnel");
  const [loanAmount, setLoanAmount] = useState<number>(15000);
  const [tenorMonths, setTenorMonths] = useState<number>(48);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Configuration limits and annual interest rates (TAEG) per product in France
  const config = useMemo(() => {
    switch (selectedProduct) {
      case "personnel":
        return {
          title: "Prêt Personnel Tous Projets",
          min: 1000,
          max: 75000,
          step: 500,
          annualRate: 3.90, // TAEG fixe compétitif en France
          tenors: [12, 24, 36, 48, 60, 72, 84],
          tagline: "Financez vos projets (voyages, mariage, imprévus) sans justificatif d'utilisation.",
        };
      case "auto":
        return {
          title: "Prêt Véhicule Neuf & Occasion",
          min: 3000,
          max: 60000,
          step: 500,
          annualRate: 3.20, // TAEG crédit auto
          tenors: [12, 24, 36, 48, 60, 72, 84],
          tagline: "Achetez votre voiture neuve ou d'occasion, thermique, hybride ou électrique.",
        };
      case "immo":
        return {
          title: "Prêt Travaux & Aménagement",
          min: 5000,
          max: 150000,
          step: 1000,
          annualRate: 2.85, // TAEG travaux / éco-rénovation
          tenors: [24, 36, 60, 84, 120, 180],
          tagline: "Rénovez ou agrandissez votre logement avec des mensualités souples et modulables.",
        };
    }
  }, [selectedProduct]);

  // Handle product switch
  const handleProductChange = (type: "personnel" | "auto" | "immo") => {
    setSelectedProduct(type);
    if (type === "personnel") {
      setLoanAmount(15000);
      setTenorMonths(48);
    } else if (type === "auto") {
      setLoanAmount(22000);
      setTenorMonths(60);
    } else {
      setLoanAmount(45000);
      setTenorMonths(84);
    }
  };

  // Standard Bank Amortization Formula
  const { monthlyAmortization, totalRepayment, totalInterest } = useMemo(() => {
    const monthlyRate = config.annualRate / 100 / 12;
    const factor = Math.pow(1 + monthlyRate, tenorMonths);
    const monthly = (loanAmount * monthlyRate * factor) / (factor - 1);
    const total = monthly * tenorMonths;
    const interest = total - loanAmount;

    return {
      monthlyAmortization: Math.round(monthly),
      totalRepayment: Math.round(total),
      totalInterest: Math.round(interest),
    };
  }, [loanAmount, tenorMonths, config.annualRate]);

  return (
    <div id="calculator" className="w-full bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden relative">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-sterling-navy-deep via-sterling-navy to-sterling-navy-light p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-sterling-gold/20 rounded-md text-sterling-gold">
              <Calculator className="w-5 h-5" />
            </span>
            <span className="font-bold text-sm tracking-wide uppercase text-sterling-gold-light">
              Simulateur de Crédit Rapide
            </span>
          </div>
          <span className="text-xs bg-white/10 px-2.5 py-1 rounded-full text-slate-200 border border-white/10 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-sterling-gold" />
            TAEG Fixe {config.annualRate.toFixed(2)}%
          </span>
        </div>

        {/* Product Selector Tabs */}
        <div className="grid grid-cols-3 gap-2 bg-black/20 p-1.5 rounded-xl border border-white/10">
          <button
            onClick={() => handleProductChange("personnel")}
            className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              selectedProduct === "personnel"
                ? "bg-sterling-gold text-sterling-navy-deep shadow-md"
                : "text-slate-300 hover:text-white hover:bg-white/5"
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            Personnel
          </button>
          <button
            onClick={() => handleProductChange("auto")}
            className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              selectedProduct === "auto"
                ? "bg-sterling-gold text-sterling-navy-deep shadow-md"
                : "text-slate-300 hover:text-white hover:bg-white/5"
            }`}
          >
            <Car className="w-3.5 h-3.5" />
            Auto & Moto
          </button>
          <button
            onClick={() => handleProductChange("immo")}
            className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              selectedProduct === "immo"
                ? "bg-sterling-gold text-sterling-navy-deep shadow-md"
                : "text-slate-300 hover:text-white hover:bg-white/5"
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            Travaux
          </button>
        </div>
      </div>

      <div className="p-6 sm:p-8 space-y-6">
        {/* Loan Amount Range Slider */}
        <div className="space-y-3">
          <div className="flex justify-between items-baseline">
            <label className="text-sm font-bold text-slate-700">
              Montant de votre projet
            </label>
            <div className="text-2xl font-black text-sterling-navy tracking-tight font-display">
              {formatEUR(loanAmount)}
            </div>
          </div>

          <input
            type="range"
            min={config.min}
            max={config.max}
            step={config.step}
            value={loanAmount}
            onChange={(e) => setLoanAmount(Number(e.target.value))}
            className="w-full accent-sterling-gold"
          />

          <div className="flex justify-between text-xs text-slate-400 font-medium">
            <span>Min : {formatEUR(config.min)}</span>
            <span>Max : {formatEUR(config.max)}</span>
          </div>
        </div>

        {/* Tenor Month Buttons */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-sm font-bold text-slate-700">
              Durée du remboursement
            </label>
            <span className="text-xs font-semibold text-sterling-gold-dark bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
              {tenorMonths >= 12 && tenorMonths % 12 === 0 
                ? `${tenorMonths} mois (${tenorMonths / 12} ans)` 
                : `${tenorMonths} mois`}
            </span>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5">
            {config.tenors.map((t) => (
              <button
                key={t}
                onClick={() => setTenorMonths(t)}
                className={`py-2 px-1 rounded-xl text-xs font-bold transition-all border text-center ${
                  tenorMonths === t
                    ? "bg-sterling-navy text-white border-sterling-navy shadow-sm"
                    : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                }`}
              >
                {t} m.
              </button>
            ))}
          </div>
        </div>

        {/* Calculated Monthly Amortization Display */}
        <div className="bg-gradient-to-br from-slate-50 to-amber-50/40 rounded-2xl p-5 border border-amber-100 shadow-inner">
          <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-1">
            Votre mensualité estimée
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-extrabold text-sterling-navy font-display tracking-tight">
              {formatEUR(monthlyAmortization)}
            </span>
            <span className="text-xs font-medium text-slate-500">/ mois</span>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200/70 grid grid-cols-2 gap-2 text-xs text-slate-600">
            <div>
              <span className="text-slate-400">Total intérêts : </span>
              <span className="font-semibold text-slate-700">{formatEUR(totalInterest)}</span>
            </div>
            <div>
              <span className="text-slate-400">Montant total dû : </span>
              <span className="font-semibold text-slate-700">{formatEUR(totalRepayment)}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => onApply?.(selectedProduct, loanAmount, tenorMonths)}
            className="w-full bg-gradient-to-r from-sterling-gold via-sterling-gold-light to-sterling-gold hover:from-sterling-gold-dark hover:to-sterling-gold text-sterling-navy-deep font-extrabold py-3.5 px-6 rounded-xl shadow-lg shadow-sterling-gold/25 hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
          >
            Faire ma demande en ligne (3 min)
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>

          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full bg-white hover:bg-slate-50 text-sterling-navy font-semibold text-xs py-2.5 px-4 rounded-xl border border-slate-200 transition-colors flex items-center justify-center gap-1.5"
          >
            <Table className="w-3.5 h-3.5 text-sterling-gold" />
            Consulter le tableau d&apos;amortissement complet
          </button>
        </div>

        {/* Mandatory French Consumer Credit Warning Notice */}
        <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-3 text-center">
          <p className="text-[11px] font-bold text-amber-900 leading-tight">
            ⚠️ Un crédit vous engage et doit être remboursé. Vérifiez vos capacités de remboursement avant de vous engager.
          </p>
        </div>
      </div>

      {/* Amortization Schedule Modal */}
      <AmortizationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        principal={loanAmount}
        monthlyPayment={monthlyAmortization}
        tenorMonths={tenorMonths}
        annualRatePct={config.annualRate}
        totalInterest={totalInterest}
        totalRepayment={totalRepayment}
      />
    </div>
  );
}
