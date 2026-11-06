"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuickApplyModal from "@/components/QuickApplyModal";
import { 
  Home, 
  Hammer, 
  Sun, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Calculator, 
  Sparkles,
  ChevronRight,
  Clock,
  Layers
} from "lucide-react";
import { formatMoney } from "@/lib/utils";

export default function HomeLoansPage() {
  const [projectBudget, setProjectBudget] = useState(75000);
  const [tenorYears, setTenorYears] = useState(15);
  const [projectType, setProjectType] = useState<"renovation" | "energy" | "acquisition">("renovation");
  const [applyModalOpen, setApplyModalOpen] = useState(false);

  const rates = {
    renovation: 2.85,
    energy: 2.70,
    acquisition: 2.95,
  };
  const activeRate = rates[projectType];

  const tenorMonths = tenorYears * 12;
  const monthlyRate = activeRate / 100 / 12;
  const monthlyPayment =
    (projectBudget * monthlyRate * Math.pow(1 + monthlyRate, tenorMonths)) /
    (Math.pow(1 + monthlyRate, tenorMonths) - 1);
  const totalCost = monthlyPayment * tenorMonths;
  const totalInterest = totalCost - projectBudget;

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
            <span className="font-semibold text-sterling-navy">Home Loan & Property Improvements</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-sterling-navy-deep via-sterling-navy to-[#03234D] text-white py-16 lg:py-24 overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C89D35_1px,transparent_1px)] [background-size:24px_24px]" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold tracking-wide">
                  <Home className="w-4 h-4 text-amber-400" />
                  Home Facility • Fixed APR from 2.85% • Up to 25 Years
                </div>

                <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display text-white leading-tight">
                  Bring Your Home & <br />
                  <span className="bg-gradient-to-r from-sterling-gold via-sterling-gold-light to-amber-200 bg-clip-text text-transparent">
                    Property Vision to Life
                  </span>
                </h1>

                <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl">
                  Energy renovations, extensions, interior remodeling, or property acquisition: finance up to 100% of your project with flexible release in stages according to contractor invoices.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                    <div className="text-xl font-bold text-sterling-gold">Up to $500,000+</div>
                    <div className="text-xs text-slate-300">USD & EUR Financing</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                    <div className="text-xl font-bold text-sterling-gold">Up to 25 Years</div>
                    <div className="text-xs text-slate-300">Lower monthly payments</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10 col-span-2 sm:col-span-1">
                    <div className="text-xl font-bold text-sterling-gold">From 2.70%</div>
                    <div className="text-xs text-slate-300">Eco-renovation incentive rate</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 pt-4">
                  <button
                    onClick={() => setApplyModalOpen(true)}
                    className="bg-gradient-to-r from-sterling-gold via-sterling-gold-light to-sterling-gold text-sterling-navy-deep font-bold px-7 py-3.5 rounded-xl shadow-lg hover:shadow-sterling-gold/30 hover:scale-[1.02] transition-all flex items-center gap-2"
                  >
                    Apply for Home Loan
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </button>
                  <a
                    href="#home-calculator"
                    className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3.5 rounded-xl border border-white/20 transition-all flex items-center gap-2"
                  >
                    <Calculator className="w-4 h-4 text-sterling-gold" />
                    Simulate Amortization
                  </a>
                </div>
              </div>

              {/* Home Photography */}
              <div className="lg:col-span-5 relative">
                <div className="relative mx-auto max-w-md rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 bg-slate-800">
                  <img
                    src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80"
                    alt="Modern Home Renovation"
                    className="w-full h-80 sm:h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
                      <span className="text-xs font-semibold uppercase tracking-wider text-sterling-gold">Property Improvements</span>
                    </div>
                    <div className="text-lg font-bold">Comprehensive Energy & Living Upgrades</div>
                    <div className="text-xs text-slate-300">Solar panels, heat pumps, insulation, modern kitchens, and luxury additions.</div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Home Loan Simulator Section */}
        <section id="home-calculator" className="py-20 bg-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-sterling-gold bg-sterling-navy/5 px-3 py-1 rounded-full">
                Home Loan Simulator
              </span>
              <h2 className="text-3xl font-extrabold text-sterling-navy font-display">
                Customize Your Home Project Financing
              </h2>
              <p className="text-xs text-slate-500">
                Adjust project budget and repayment horizon from 5 to 25 years.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 space-y-8">
              
              {/* Project Type Tabs */}
              <div className="grid grid-cols-3 gap-2 p-1.5 bg-slate-100 rounded-2xl text-xs font-bold">
                {[
                  { id: "renovation", label: "Home Renovation", rate: "2.85% APR", icon: Hammer },
                  { id: "energy", label: "Eco-Energy Transition", rate: "2.70% APR", icon: Sun },
                  { id: "acquisition", label: "Property Acquisition", rate: "2.95% APR", icon: Home },
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
                    <label className="text-xs font-bold text-slate-700">Project Budget</label>
                    <span className="text-xl font-black text-sterling-navy font-mono">${projectBudget.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min={10000}
                    max={500000}
                    step={5000}
                    value={projectBudget}
                    onChange={(e) => setProjectBudget(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sterling-gold"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>$10,000</span>
                    <span>$500,000+</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold text-slate-700">Repayment Horizon</label>
                    <span className="text-base font-bold text-sterling-navy font-mono">{tenorYears} Years ({tenorMonths} Months)</span>
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {[5, 10, 15, 20, 25].map((y) => (
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
                        {y} Yrs
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
                    Total Borrowed: <strong>${projectBudget.toLocaleString()}</strong> • Fixed Rate: <strong>{activeRate.toFixed(2)}% APR</strong>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setApplyModalOpen(true)}
                  className="w-full sm:w-auto bg-gradient-to-r from-sterling-gold to-sterling-gold-light hover:from-amber-600 hover:to-sterling-gold text-white font-bold px-8 py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  Apply Online for Home Loan
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
        defaultLoanType="home"
        defaultAmount={projectBudget}
        defaultTenor={tenorMonths}
      />
    </div>
  );
}
