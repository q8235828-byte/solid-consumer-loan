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
  Briefcase,
  ShieldCheck,
  DollarSign
} from "lucide-react";
import AmortizationModal from "./AmortizationModal";

interface LoanCalculatorProps {
  onApply?: (loanType: string, amount: number, tenor: number) => void;
  onOpenApply?: (loanType?: string) => void;
}

export default function LoanCalculator({ onApply, onOpenApply }: LoanCalculatorProps) {
  const [currency, setCurrency] = useState<"USD" | "EUR">("USD");
  const [selectedProduct, setSelectedProduct] = useState<"investment" | "personnel" | "auto" | "immo">("investment");
  const [loanAmount, setLoanAmount] = useState<number>(500000);
  const [tenorMonths, setTenorMonths] = useState<number>(60);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatCurrency = (val: number) => {
    if (currency === "USD") {
      return `$${Math.round(val).toLocaleString("en-US")}`;
    }
    return `${Math.round(val).toLocaleString("fr-FR")} €`;
  };

  // Product configurations
  const config = useMemo(() => {
    switch (selectedProduct) {
      case "investment":
        return {
          title: "Private Investment & Corporate Financing",
          min: 100000,
          max: 50000000, // slider up to 50M, input accepts up to 500M
          step: 100000,
          annualRate: 2.95,
          tenors: [12, 36, 60, 120, 180, 240, 300], // 1 to 25 years
          tagline: "Large-scale capital for legitimate business, expansion, infrastructure & private investments.",
        };
      case "personnel":
        return {
          title: "Personal & Liquidity Loan",
          min: 1000,
          max: 75000,
          step: 500,
          annualRate: 3.50,
          tenors: [12, 24, 36, 48, 60, 72, 84],
          tagline: "Unsecured financing without usage restriction for personal and family needs.",
        };
      case "auto":
        return {
          title: "Auto, Fleet & Clean Mobility",
          min: 5000,
          max: 150000,
          step: 1000,
          annualRate: 3.10,
          tenors: [12, 24, 36, 48, 60, 72, 84],
          tagline: "Financing for new and certified vehicles, EV commercial fleets and clean transport.",
        };
      case "immo":
        return {
          title: "Real Estate & Commercial Development",
          min: 50000,
          max: 10000000,
          step: 50000,
          annualRate: 2.85,
          tenors: [60, 120, 180, 240, 300], // up to 25 years
          tagline: "Property acquisitions, construction, structural renovation and development facilities.",
        };
    }
  }, [selectedProduct]);

  // Handle product switch
  const handleProductChange = (type: "investment" | "personnel" | "auto" | "immo") => {
    setSelectedProduct(type);
    if (type === "investment") {
      setLoanAmount(1000000);
      setTenorMonths(120); // 10 years
    } else if (type === "personnel") {
      setLoanAmount(25000);
      setTenorMonths(48);
    } else if (type === "auto") {
      setLoanAmount(45000);
      setTenorMonths(60);
    } else {
      setLoanAmount(250000);
      setTenorMonths(180);
    }
  };

  // Standard Bank Amortization Formula: M = P * [r(1+r)^n] / [(1+r)^n - 1]
  const { monthlyAmortization, totalRepayment, totalInterest } = useMemo(() => {
    const monthlyRate = config.annualRate / 100 / 12;
    if (monthlyRate === 0) {
      const m = loanAmount / tenorMonths;
      return { monthlyAmortization: m, totalRepayment: loanAmount, totalInterest: 0 };
    }
    const factor = Math.pow(1 + monthlyRate, tenorMonths);
    const m = (loanAmount * monthlyRate * factor) / (factor - 1);
    const total = m * tenorMonths;
    const interest = total - loanAmount;
    return {
      monthlyAmortization: isNaN(m) ? 0 : m,
      totalRepayment: isNaN(total) ? 0 : total,
      totalInterest: isNaN(interest) ? 0 : interest,
    };
  }, [loanAmount, tenorMonths, config.annualRate]);

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 text-slate-800 relative z-20">
      
      {/* Top Header with Currency Selector */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-sterling-gold/15 text-sterling-gold flex items-center justify-center font-bold">
              <Calculator className="w-4 h-4" />
            </div>
            <h3 className="font-extrabold text-lg text-sterling-navy font-display">
              Loan Calculator & Simulator
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            1 to 25-year repayment facilities • Transparent terms
          </p>
        </div>

        {/* Currency Switcher */}
        <div className="p-1 bg-slate-100 rounded-xl flex items-center gap-1 text-xs font-bold self-end sm:self-auto">
          <button
            type="button"
            onClick={() => setCurrency("USD")}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 ${
              currency === "USD"
                ? "bg-sterling-navy text-sterling-gold shadow-sm"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <span>USD ($)</span>
          </button>
          <button
            type="button"
            onClick={() => setCurrency("EUR")}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 ${
              currency === "EUR"
                ? "bg-sterling-navy text-sterling-gold shadow-sm"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <span>Euro (€)</span>
          </button>
        </div>
      </div>

      {/* Product Selection Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-5">
        {[
          { id: "investment", label: "Private & Corp", icon: Briefcase },
          { id: "personnel", label: "Personal", icon: UserCheck },
          { id: "auto", label: "Auto / Fleet", icon: Car },
          { id: "immo", label: "Real Estate", icon: Home },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = selectedProduct === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleProductChange(tab.id as any)}
              className={`py-2.5 px-2 rounded-xl text-xs font-bold flex flex-col items-center justify-center gap-1 transition-all ${
                isActive
                  ? "bg-sterling-navy text-white shadow-md ring-2 ring-sterling-gold"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-sterling-gold" : "text-slate-400"}`} />
              <span className="truncate">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Product Tagline */}
      <div className="mt-4 p-3 bg-amber-50/60 rounded-xl border border-amber-200/60 text-xs text-amber-900 flex items-center justify-between">
        <span className="font-medium">{config.tagline}</span>
        <span className="font-black text-emerald-700 bg-white px-2 py-0.5 rounded shadow-xs whitespace-nowrap ml-2">
          {config.annualRate}% Fixed Rate
        </span>
      </div>

      {/* Calculator Sliders and Inputs */}
      <div className="mt-6 space-y-6">
        
        {/* Principal Amount Control */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-bold text-slate-700">Loan Facility Amount</label>
            <div className="flex items-center gap-1 bg-slate-50 px-3 py-1 rounded-lg border border-slate-200">
              <span className="text-lg font-black text-sterling-navy font-mono">
                {formatCurrency(loanAmount)}
              </span>
            </div>
          </div>

          <input
            type="range"
            min={config.min}
            max={config.max}
            step={config.step}
            value={Math.min(loanAmount, config.max)}
            onChange={(e) => setLoanAmount(Number(e.target.value))}
            className="w-full"
          />

          <div className="flex justify-between text-[10px] text-slate-400 mt-1">
            <span>Min: {formatCurrency(config.min)}</span>
            <span>Max (online): {formatCurrency(config.max)}</span>
          </div>

          {selectedProduct === "investment" && (
            <div className="mt-2 text-[10px] text-slate-500 italic">
              * Facilities up to {formatCurrency(500000000)} available upon institutional due diligence.
            </div>
          )}
        </div>

        {/* Tenor / Duration Control */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-bold text-slate-700">Repayment Term</label>
            <span className="text-sm font-bold text-sterling-navy font-mono">
              {tenorMonths} Months ({tenorMonths / 12} {tenorMonths / 12 === 1 ? "Year" : "Years"})
            </span>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5">
            {config.tenors.map((t) => (
              <button
                key={t}
                onClick={() => setTenorMonths(t)}
                className={`py-2 px-1 rounded-lg text-xs font-bold transition-all ${
                  tenorMonths === t
                    ? "bg-sterling-navy text-white shadow-sm ring-1 ring-sterling-gold"
                    : "bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100"
                }`}
              >
                {t >= 12 ? `${t / 12}y` : `${t}m`}
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
              {formatCurrency(monthlyAmortization)}
            </span>
            <span className="text-xs font-medium text-slate-500">/ month</span>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200/70 grid grid-cols-2 gap-2 text-xs text-slate-600">
            <div>
              <span className="text-slate-400">Total Interest: </span>
              <span className="font-semibold text-slate-700">{formatCurrency(totalInterest)}</span>
            </div>
            <div>
              <span className="text-slate-400">Total Repayment: </span>
              <span className="font-semibold text-slate-700">{formatCurrency(totalRepayment)}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => {
              if (onApply) onApply(selectedProduct, loanAmount, tenorMonths);
              if (onOpenApply) onOpenApply(selectedProduct);
            }}
            className="w-full bg-gradient-to-r from-sterling-gold via-sterling-gold-light to-sterling-gold hover:from-sterling-gold-dark hover:to-sterling-gold text-sterling-navy-deep font-extrabold py-3.5 px-6 rounded-xl shadow-lg shadow-sterling-gold/25 hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
          >
            <span>Proceed to Application</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>

          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full bg-white hover:bg-slate-50 text-sterling-navy font-semibold text-xs py-2.5 px-4 rounded-xl border border-slate-200 transition-colors flex items-center justify-center gap-1.5"
          >
            <Table className="w-3.5 h-3.5 text-sterling-gold" />
            <span>View Amortization Schedule</span>
          </button>
        </div>

      </div>

      {/* Embedded Amortization Modal */}
      <AmortizationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        principal={loanAmount}
        annualRate={config.annualRate}
        tenorMonths={tenorMonths}
        monthlyPayment={monthlyAmortization}
        totalRepayment={totalRepayment}
        totalInterest={totalInterest}
        currency={currency}
      />
    </div>
  );
}
