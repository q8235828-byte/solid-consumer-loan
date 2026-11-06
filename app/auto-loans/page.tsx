"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuickApplyModal from "@/components/QuickApplyModal";
import { 
  Car, 
  Leaf, 
  Zap, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Calculator, 
  Sparkles,
  ChevronRight,
  Clock,
  BadgePercent
} from "lucide-react";
import { formatMoney } from "@/lib/utils";

export default function AutoLoansPage() {
  const [vehiclePrice, setVehiclePrice] = useState(25000);
  const [downpaymentPct, setDownpaymentPct] = useState(10);
  const [tenorMonths, setTenorMonths] = useState(60);
  const [vehicleType, setVehicleType] = useState<"electric" | "new" | "used">("electric");
  const [applyModalOpen, setApplyModalOpen] = useState(false);

  // Interest rates
  const rates = {
    electric: 3.10,
    new: 3.40,
    used: 3.90,
  };
  const activeRate = rates[vehicleType];

  const downpaymentAmount = (vehiclePrice * downpaymentPct) / 100;
  const loanPrincipal = vehiclePrice - downpaymentAmount;

  // Monthly calculation
  const monthlyRate = activeRate / 100 / 12;
  const monthlyPayment =
    (loanPrincipal * monthlyRate * Math.pow(1 + monthlyRate, tenorMonths)) /
    (Math.pow(1 + monthlyRate, tenorMonths) - 1);
  const totalCost = monthlyPayment * tenorMonths;
  const totalInterest = totalCost - loanPrincipal;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-800">
      <Navbar onOpenApply={() => setApplyModalOpen(true)} />

      <main className="flex-1">
        {/* Breadcrumb Navigation */}
        <div className="bg-slate-100 border-b border-slate-200 py-2.5 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-slate-500">
            <Link href="/" className="hover:text-sterling-navy transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-400">Consumer Loans</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="font-semibold text-sterling-navy">Auto Loan & Clean Mobility</span>
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
                  Auto Facility • Green Eco-Discount 3.10% Fixed APR
                </div>

                <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display text-white leading-tight">
                  Drive Your Ideal <br />
                  <span className="bg-gradient-to-r from-sterling-gold via-sterling-gold-light to-amber-200 bg-clip-text text-transparent">
                    New Vehicle Today
                  </span>
                </h1>

                <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl">
                  New, certified pre-owned, or 100% electric: finance up to 100% of your vehicle with or without down payment. Benefit from preferential fixed rates and instant preliminary decision.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                    <div className="text-xl font-bold text-sterling-gold">Up to $150,000</div>
                    <div className="text-xs text-slate-300">USD & EUR • New & Pre-owned</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                    <div className="text-xl font-bold text-sterling-gold">$0 Down Payment</div>
                    <div className="text-xs text-slate-300">100% financing available</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10 col-span-2 sm:col-span-1">
                    <div className="text-xl font-bold text-sterling-gold">From 3.10%</div>
                    <div className="text-xs text-slate-300">Eco-discounted fixed APR</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 pt-4">
                  <button
                    onClick={() => setApplyModalOpen(true)}
                    className="bg-gradient-to-r from-sterling-gold via-sterling-gold-light to-sterling-gold text-sterling-navy-deep font-bold px-7 py-3.5 rounded-xl shadow-lg hover:shadow-sterling-gold/30 hover:scale-[1.02] transition-all flex items-center gap-2"
                  >
                    Apply for Auto Loan
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </button>
                  <a
                    href="#auto-calculator"
                    className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3.5 rounded-xl border border-white/20 transition-all flex items-center gap-2"
                  >
                    <Calculator className="w-4 h-4 text-sterling-gold" />
                    Vehicle Calculator
                  </a>
                </div>
              </div>

              {/* Vehicle Photography */}
              <div className="lg:col-span-5 relative">
                <div className="relative mx-auto max-w-md rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 bg-slate-800">
                  <img
                    src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80"
                    alt="Electric Vehicle Charging"
                    className="w-full h-80 sm:h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-xs font-semibold uppercase tracking-wider text-sterling-gold">Clean Mobility Program</span>
                    </div>
                    <div className="text-lg font-bold">Electric & Hybrid Vehicle Incentives</div>
                    <div className="text-xs text-slate-300">Bundle home charging station installation into your financing package.</div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Auto Loan Simulator Section */}
        <section id="auto-calculator" className="py-20 bg-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-sterling-gold bg-sterling-navy/5 px-3 py-1 rounded-full">
                Auto Loan Simulator
              </span>
              <h2 className="text-3xl font-extrabold text-sterling-navy font-display">
                Customize Your Vehicle Financing
              </h2>
              <p className="text-xs text-slate-500">
                Adjust vehicle purchase price, down payment, and repayment tenor.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 space-y-8">
              
              {/* Vehicle Type Tabs */}
              <div className="grid grid-cols-3 gap-2 p-1.5 bg-slate-100 rounded-2xl text-xs font-bold">
                {[
                  { id: "electric", label: "Electric / Hybrid", rate: "3.10% APR", icon: Zap },
                  { id: "new", label: "New Vehicle", rate: "3.40% APR", icon: Sparkles },
                  { id: "used", label: "Pre-Owned Vehicle", rate: "3.90% APR", icon: Car },
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
                    <label className="text-xs font-bold text-slate-700">Vehicle Price</label>
                    <span className="text-xl font-black text-sterling-navy font-mono">${vehiclePrice.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min={5000}
                    max={120000}
                    step={1000}
                    value={vehiclePrice}
                    onChange={(e) => setVehiclePrice(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sterling-gold"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>$5,000</span>
                    <span>$120,000</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold text-slate-700">Down Payment ({downpaymentPct}%)</label>
                    <span className="text-sm font-bold text-slate-600 font-mono">${downpaymentAmount.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={50}
                    step={5}
                    value={downpaymentPct}
                    onChange={(e) => setDownpaymentPct(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sterling-gold"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>0% (Zero Down)</span>
                    <span>50%</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold text-slate-700">Repayment Tenor</label>
                    <span className="text-base font-bold text-sterling-navy font-mono">{tenorMonths} Months ({tenorMonths / 12} Yrs)</span>
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
                        {m} mos.
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Calculated Result Box */}
              <div className="bg-gradient-to-br from-slate-50 to-amber-50/40 rounded-2xl p-6 border border-amber-100 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-1">
                    Estimated Monthly Payment
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-extrabold text-sterling-navy font-mono">
                      ${Math.round(monthlyPayment).toLocaleString()}
                    </span>
                    <span className="text-xs text-slate-500">/ month</span>
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    Financed Capital: <strong>${Math.round(loanPrincipal).toLocaleString()}</strong> • Fixed Rate: <strong>{activeRate.toFixed(2)}% APR</strong>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setApplyModalOpen(true)}
                  className="w-full sm:w-auto bg-gradient-to-r from-sterling-gold to-sterling-gold-light hover:from-amber-600 hover:to-sterling-gold text-white font-bold px-8 py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  Apply Online for This Vehicle
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>
        </section>

      </main>

      <Footer />

      <QuickApplyModal
        isOpen={applyModalOpen}
        onClose={() => setApplyModalOpen(false)}
        defaultLoanType="auto"
        defaultAmount={loanPrincipal}
        defaultTenor={tenorMonths}
      />
    </div>
  );
}
