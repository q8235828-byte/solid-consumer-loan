"use client";

import React, { useState, useMemo } from "react";
import { 
  Calculator, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Table, 
  Info,
  Car,
  Home,
  UserCheck
} from "lucide-react";
import { formatPHP } from "@/lib/utils";
import AmortizationModal from "./AmortizationModal";

interface LoanCalculatorProps {
  onApply?: (loanType: string, amount: number, tenor: number) => void;
}

export default function LoanCalculator({ onApply }: LoanCalculatorProps) {
  const [selectedProduct, setSelectedProduct] = useState<"persona" | "auto" | "home">("persona");
  const [loanAmount, setLoanAmount] = useState<number>(300000);
  const [tenorMonths, setTenorMonths] = useState<number>(36);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Configuration limits and annual interest rates per product
  const config = useMemo(() => {
    switch (selectedProduct) {
      case "persona":
        return {
          title: "Persona Personal Loan",
          min: 30000,
          max: 1000000,
          step: 10000,
          annualRate: 14.4, // ~1.2% add-on / month
          tenors: [12, 18, 24, 36],
          tagline: "Unsecured multi-purpose loan. No collateral or co-maker required.",
        };
      case "auto":
        return {
          title: "Ultima Auto Loan",
          min: 150000,
          max: 4000000,
          step: 25000,
          annualRate: 8.88, // competitive vehicle lending rate
          tenors: [12, 24, 36, 48, 60],
          tagline: "Own your brand-new or pre-owned car with low downpayment options.",
        };
      case "home":
        return {
          title: "Discovery Home Loan",
          min: 500000,
          max: 15000000,
          step: 50000,
          annualRate: 6.75, // residential mortgage indicative rate
          tenors: [60, 120, 180, 240, 300], // 5, 10, 15, 20, 25 years
          tagline: "Finance your house, lot, condo or construction with up to 25 years tenor.",
        };
    }
  }, [selectedProduct]);

  // Handle product switch and adjust default amounts
  const handleProductChange = (type: "persona" | "auto" | "home") => {
    setSelectedProduct(type);
    if (type === "persona") {
      setLoanAmount(300000);
      setTenorMonths(36);
    } else if (type === "auto") {
      setLoanAmount(900000);
      setTenorMonths(48);
    } else {
      setLoanAmount(2500000);
      setTenorMonths(180);
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
              Interactive Loan Calculator
            </span>
          </div>
          <span className="text-xs bg-white/10 px-2.5 py-1 rounded-full text-slate-200 border border-white/10 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-sterling-gold" />
            Indicative Amortization
          </span>
        </div>

        {/* Product Selector Tabs */}
        <div className="grid grid-cols-3 gap-2 bg-black/20 p-1.5 rounded-xl border border-white/10">
          <button
            onClick={() => handleProductChange("persona")}
            className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              selectedProduct === "persona"
                ? "bg-sterling-gold text-sterling-navy-deep shadow-md"
                : "text-slate-300 hover:text-white hover:bg-white/5"
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            Personal
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
            Auto
          </button>
          <button
            onClick={() => handleProductChange("home")}
            className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              selectedProduct === "home"
                ? "bg-sterling-gold text-sterling-navy-deep shadow-md"
                : "text-slate-300 hover:text-white hover:bg-white/5"
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            Home
          </button>
        </div>
      </div>

      <div className="p-6 sm:p-8 space-y-6">
        {/* Loan Amount Range Slider */}
        <div className="space-y-3">
          <div className="flex justify-between items-baseline">
            <label className="text-sm font-bold text-slate-700">
              Target Loan Amount
            </label>
            <div className="text-2xl font-black text-sterling-navy tracking-tight font-display">
              {formatPHP(loanAmount)}
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
            <span>Min: {formatPHP(config.min)}</span>
            <span>Max: {formatPHP(config.max)}</span>
          </div>
        </div>

        {/* Tenor Month Buttons */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-sm font-bold text-slate-700">
              Payment Term (Tenor)
            </label>
            <span className="text-xs font-semibold text-sterling-gold-dark bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
              {tenorMonths >= 12 && tenorMonths % 12 === 0 
                ? `${tenorMonths} Mos (${tenorMonths / 12} Yrs)` 
                : `${tenorMonths} Months`}
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {config.tenors.map((t) => (
              <button
                key={t}
                onClick={() => setTenorMonths(t)}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                  tenorMonths === t
                    ? "bg-sterling-navy text-white border-sterling-navy shadow-sm"
                    : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                }`}
              >
                {t >= 24 && t % 12 === 0 && selectedProduct === "home"
                  ? `${t / 12} Yrs`
                  : `${t} Mos`}
              </button>
            ))}
          </div>
        </div>

        {/* Calculated Monthly Amortization Display */}
        <div className="bg-gradient-to-br from-slate-50 to-amber-50/40 rounded-2xl p-5 border border-amber-100 shadow-inner">
          <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-1">
            Estimated Monthly Payment
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-extrabold text-sterling-navy font-display tracking-tight">
              {formatPHP(monthlyAmortization)}
            </span>
            <span className="text-xs font-medium text-slate-500">/ month</span>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200/70 grid grid-cols-2 gap-2 text-xs text-slate-600">
            <div>
              <span className="text-slate-400">Total Interest: </span>
              <span className="font-semibold text-slate-700">{formatPHP(totalInterest)}</span>
            </div>
            <div>
              <span className="text-slate-400">Total Financed: </span>
              <span className="font-semibold text-slate-700">{formatPHP(totalRepayment)}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => onApply?.(selectedProduct, loanAmount, tenorMonths)}
            className="w-full bg-gradient-to-r from-sterling-gold via-sterling-gold-light to-sterling-gold hover:from-sterling-gold-dark hover:to-sterling-gold text-sterling-navy-deep font-extrabold py-3.5 px-6 rounded-xl shadow-lg shadow-sterling-gold/25 hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
          >
            Apply Online Now
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>

          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full bg-white hover:bg-slate-50 text-sterling-navy font-semibold text-xs py-2.5 px-4 rounded-xl border border-slate-200 transition-colors flex items-center justify-center gap-1.5"
          >
            <Table className="w-3.5 h-3.5 text-sterling-gold" />
            View Full Amortization Breakdown Schedule
          </button>
        </div>

        {/* Micro Notice */}
        <p className="text-[11px] text-slate-400 text-center leading-tight">
          * Amortization computations are indicative. Final rates and monthly installments will be specified in official loan documents upon credit committee approval.
        </p>
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
