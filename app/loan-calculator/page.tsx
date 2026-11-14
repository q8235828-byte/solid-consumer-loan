"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoanCalculator from "@/components/LoanCalculator";
import QuickApplyModal from "@/components/QuickApplyModal";
import Link from "next/link";
import { ChevronRight, Calculator, ShieldCheck, Sparkles } from "lucide-react";

export default function LoanCalculatorPage() {
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [selectedLoanType, setSelectedLoanType] = useState("persona");

  const handleOpenApply = (loanType: string = "persona") => {
    setSelectedLoanType(loanType);
    setApplyModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-800">
      <Navbar onOpenApply={handleOpenApply} />

      <main className="flex-1">
        {/* Breadcrumbs */}
        <div className="bg-slate-100 border-b border-slate-200 py-2.5 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-slate-500">
            <Link href="/" className="hover:text-sterling-navy transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="font-semibold text-sterling-navy">Loan Calculator</span>
          </div>
        </div>

        {/* Hero Banner */}
        <section className="bg-gradient-to-br from-[#001D3D] via-[#002855] to-[#003B7A] text-white py-12 px-4 sm:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sterling-gold/15 text-sterling-gold-light border border-sterling-gold/30 text-xs font-semibold">
              <Calculator className="w-3.5 h-3.5 text-sterling-gold" />
              <span>Simulate in USD ($) & Euro (€)</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Personal & Investment Loan Calculator
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl mx-auto">
              Accurately estimate your monthly amortizations, total interest payable, and repayment schedule with fixed rates.
            </p>
          </div>
        </section>

        {/* Calculator Body */}
        <section className="py-12 px-4 sm:px-8">
          <div className="max-w-5xl mx-auto">
            <LoanCalculator onOpenApply={handleOpenApply} />
          </div>
        </section>
      </main>

      <QuickApplyModal 
        isOpen={applyModalOpen}
        onClose={() => setApplyModalOpen(false)}
        defaultLoanType={selectedLoanType}
      />

      <Footer />
    </div>
  );
}
