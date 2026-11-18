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
import { useLanguage } from "@/lib/LanguageContext";

interface LoanCalculatorProps {
  onApply?: (loanType: string, amount: number, tenor: number) => void;
  onOpenApply?: (loanType?: string) => void;
}

export default function LoanCalculator({ onApply, onOpenApply }: LoanCalculatorProps) {
  const { t, isFrench } = useLanguage();
  const [currency, setCurrency] = useState<"USD" | "EUR">("USD");
  const [selectedProduct, setSelectedProduct] = useState<"investment" | "personnel" | "auto" | "immo">("investment");
  const [loanAmount, setLoanAmount] = useState<number>(1000000);
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
          title: t("Investissement International & Partenariats Mondiaux", "International Investment & Global Partnerships"),
          min: 100000,
          max: 500000000,
          step: 100000,
          annualRate: 2.95,
          tenors: [12, 36, 60, 120, 180, 240, 300], // 1 to 25 years
          tagline: t(
            "Accédez à des partenariats d'investissement de 100 000 $ à 5 000 000 000 $ et au-delà.",
            "Access potential investment partnerships from $100,000 to $5,000,000,000 and beyond."
          ),
        };
      case "personnel":
        return {
          title: t("Prêts Personnels & Professionnels", "Personal & Business Loans"),
          min: 100000,
          max: 500000000,
          step: 50000,
          annualRate: 3.15,
          tenors: [12, 24, 36, 48, 60, 120, 180, 240, 300],
          tagline: t(
            "Capitaux pour besoins personnels, expansion commerciale, acquisition et projets validés.",
            "Financing for personal needs, business expansion, property purchases, and approved projects."
          ),
        };
      case "auto":
        return {
          title: t("Flottes Commerciales & Financement d'Actifs", "Commercial Fleet & Asset Financing"),
          min: 100000,
          max: 500000000,
          step: 50000,
          annualRate: 3.10,
          tenors: [12, 24, 36, 48, 60, 120, 180, 240, 300],
          tagline: t(
            "Financement pour flottes d'entreprise, équipements industriels et mobilité propre.",
            "Financing for corporate fleets, commercial assets, and specialized equipment."
          ),
        };
      case "immo":
        return {
          title: t("Financement de l'Habitat & Construction", "Housing & Construction Financing"),
          min: 100000,
          max: 500000000,
          step: 100000,
          annualRate: 2.85,
          tenors: [36, 60, 120, 180, 240, 300], // up to 25 years
          tagline: t(
            "Construction de maisons, développement immobilier et promotions commerciales.",
            "House construction, real estate development, and commercial building projects."
          ),
        };
    }
  }, [selectedProduct, t]);

  // Handle product switch
  const handleProductChange = (type: "investment" | "personnel" | "auto" | "immo") => {
    setSelectedProduct(type);
    if (type === "investment") {
      setLoanAmount(1000000);
      setTenorMonths(120); // 10 years
    } else if (type === "personnel") {
      setLoanAmount(500000);
      setTenorMonths(60);
    } else if (type === "auto") {
      setLoanAmount(500000);
      setTenorMonths(60);
    } else {
      setLoanAmount(1000000);
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
      
      {/* Top Header with Currency Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sterling-gold/15 text-sterling-gold font-bold text-xs mb-2">
            <Calculator className="w-3.5 h-3.5" />
            <span>{t("Simulateur Financier Haute Fidélité", "High-Precision Financial Simulator")}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-sterling-navy font-display tracking-tight">
            {config.title}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            {config.tagline}
          </p>
        </div>

        {/* Currency Switcher USD / EUR */}
        <div className="flex items-center gap-2 self-start sm:self-center">
          <span className="text-xs font-bold text-slate-500">{t("Devise :", "Currency:")}</span>
          <div className="inline-flex rounded-xl p-1 bg-slate-100 border border-slate-200">
            <button
              type="button"
              onClick={() => setCurrency("USD")}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                currency === "USD" 
                  ? "bg-sterling-navy text-white shadow-sm" 
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              USD ($)
            </button>
            <button
              type="button"
              onClick={() => setCurrency("EUR")}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                currency === "EUR" 
                  ? "bg-sterling-navy text-white shadow-sm" 
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              EUR (€)
            </button>
          </div>
        </div>
      </div>

      {/* Product Selection Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-5">
        {[
          { id: "investment", label: t("Investissement Mondial", "Global Investment"), icon: Sparkles, rate: "2.95%" },
          { id: "personnel", label: t("Personnel & Entreprise", "Personal & Business"), icon: UserCheck, rate: "3.15%" },
          { id: "immo", label: t("Habitat & Construction", "Housing & Construction"), icon: Home, rate: "2.85%" },
          { id: "auto", label: t("Flotte Commerciale", "Commercial Fleet"), icon: Car, rate: "3.10%" },
        ].map((prod) => {
          const Icon = prod.icon;
          const isSelected = selectedProduct === prod.id;
          return (
            <button
              key={prod.id}
              onClick={() => handleProductChange(prod.id as any)}
              className={`p-3 rounded-2xl border text-left transition-all ${
                isSelected 
                  ? "border-sterling-gold bg-amber-50/60 shadow-sm ring-1 ring-sterling-gold" 
                  : "border-slate-200 hover:border-slate-300 bg-white"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <Icon className={`w-4 h-4 ${isSelected ? "text-sterling-gold" : "text-slate-400"}`} />
                <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                  {prod.rate}
                </span>
              </div>
              <div className="text-xs font-bold text-sterling-navy truncate">{prod.label}</div>
              <div className="text-[10px] text-slate-500 font-mono mt-0.5">100k$ - 500M$</div>
            </button>
          );
        })}
      </div>

      {/* Calculator Sliders and Inputs */}
      <div className="mt-6 space-y-6">
        
        {/* Principal Amount Control */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-bold text-slate-700">
              {t("Montant de la Facilité Souhaitée", "Requested Facility Amount")}
            </label>
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
            className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sterling-gold"
          />

          <div className="flex justify-between text-[10px] text-slate-500 font-semibold mt-1">
            <span>{t("Min :", "Min:")} {formatCurrency(100000)}</span>
            <span>{t("Facilité max :", "Max facility:")} {formatCurrency(500000000)}</span>
          </div>

          {/* Quick Amount Selector Chips: Minimum $100K */}
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {[
              { label: "$100K", val: 100000 },
              { label: "$500K", val: 500000 },
              { label: "$1M", val: 1000000 },
              { label: "$5M", val: 5000000 },
              { label: "$10M", val: 10000000 },
              { label: "$50M", val: 50000000 },
              { label: "$100M", val: 100000000 },
              { label: "$500M", val: 500000000 },
            ].map((chip) => (
              <button
                key={chip.val}
                type="button"
                onClick={() => setLoanAmount(chip.val)}
                className={`px-2 py-1 rounded-md text-[10px] font-bold transition-all ${
                  loanAmount === chip.val
                    ? "bg-sterling-navy text-white shadow-xs"
                    : "bg-slate-50 text-slate-700 border border-slate-200 hover:border-sterling-gold hover:bg-amber-50/50"
                }`}
              >
                {currency === "EUR" ? chip.label.replace("$", "€") : chip.label}
              </button>
            ))}
          </div>

          <div className="mt-2 text-[10px] text-slate-500 italic">
            * {t(
              "Partenariats d'investissement et structuration de capital disponibles jusqu'à 5 000 000 000 $ sur étude de projet.",
              "Investment partnerships and capital facilities available up to $5,000,000,000 and beyond upon project evaluation."
            )}
          </div>
        </div>

        {/* Tenor / Duration Control */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-bold text-slate-700">
              {t("Durée de Remboursement", "Repayment Term")}
            </label>
            <span className="text-sm font-bold text-sterling-navy font-mono">
              {tenorMonths} {t("Mois", "Months")} ({tenorMonths / 12} {tenorMonths / 12 === 1 ? t("An", "Yr") : t("Ans", "Yrs")})
            </span>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5">
            {config.tenors.map((tVal) => (
              <button
                key={tVal}
                onClick={() => setTenorMonths(tVal)}
                className={`py-2 px-1 rounded-lg text-xs font-bold transition-all ${
                  tenorMonths === tVal
                    ? "bg-sterling-navy text-white shadow-sm ring-1 ring-sterling-gold"
                    : "bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100"
                }`}
              >
                {tVal >= 12 ? `${tVal / 12} ${isFrench ? "ans" : "yrs"}` : `${tVal} m`}
              </button>
            ))}
          </div>
        </div>

        {/* Calculated Monthly Amortization Display */}
        <div className="bg-gradient-to-br from-slate-50 to-amber-50/40 rounded-2xl p-5 border border-amber-100 shadow-inner">
          <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-1">
            {t("Mensualité Estimée", "Estimated Monthly Payment")}
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-extrabold text-sterling-navy font-display tracking-tight">
              {formatCurrency(monthlyAmortization)}
            </span>
            <span className="text-xs font-medium text-slate-500">/ {t("mois", "month")}</span>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200/70 grid grid-cols-2 gap-2 text-xs text-slate-600">
            <div>
              <span className="text-slate-400">{t("Total des Intérêts :", "Total Interest:")} </span>
              <span className="font-semibold text-slate-700">{formatCurrency(totalInterest)}</span>
            </div>
            <div>
              <span className="text-slate-400">{t("Montant Total Dû :", "Total Repayment:")} </span>
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
            <span>{t("Poursuivre la Demande", "Apply for Financing")}</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>

          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full bg-white hover:bg-slate-50 text-sterling-navy font-semibold text-xs py-2.5 px-4 rounded-xl border border-slate-200 transition-colors flex items-center justify-center gap-1.5"
          >
            <Table className="w-3.5 h-3.5 text-sterling-gold" />
            <span>{t("Voir le Tableau d'Amortissement", "View Amortization Schedule")}</span>
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
