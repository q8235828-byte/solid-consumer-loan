"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoanCalculator from "@/components/LoanCalculator";
import QuickApplyModal from "@/components/QuickApplyModal";
import { 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  ChevronRight, 
  Calculator, 
  Lock, 
  Sparkles, 
  Smartphone, 
  AlertTriangle,
  HelpCircle,
  FileText,
  Clock,
  ExternalLink
} from "lucide-react";

export default function PersonalLoansPage() {
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [selectedLoanType, setSelectedLoanType] = useState("persona");

  const handleOpenApply = (loanType: string = "persona") => {
    setSelectedLoanType(loanType);
    setApplyModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-800 antialiased">
      {/* Official Sterling Bank Navbar */}
      <Navbar onOpenApply={handleOpenApply} />

      <main className="flex-1">
        {/* Breadcrumb Navigation (Official Style) */}
        <div className="bg-[#F4F6F9] border-b border-slate-200 py-3 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-slate-500 font-medium">
            <Link href="/" className="hover:text-sterling-navy transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <Link href="/personal-loans" className="hover:text-sterling-navy transition-colors">Personal</Link>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="text-slate-400">Consumer Loans</span>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="font-bold text-sterling-navy">Personal Loans</span>
          </div>
        </div>

        {/* Hero Section Banner */}
        <section className="relative bg-gradient-to-r from-[#002244] via-[#003366] to-[#03234D] text-white py-14 lg:py-20 overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C89D35_1px,transparent_1px)] [background-size:24px_24px]" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sterling-gold/20 border border-sterling-gold/40 text-sterling-gold text-xs font-bold tracking-wide">
                <Sparkles className="w-3.5 h-3.5" />
                Sterling Bank of Asia Consumer Financing
              </div>

              <h1 className="text-3xl sm:text-5xl font-black tracking-tight font-display text-white leading-tight">
                Personal Loans
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed">
                Fund your goals with a personal loan you can trust. Sterling Bank of Asia offers flexible loan terms ideal for emergencies, education, travel, home upgrades, and corporate capital structuring. Available in <strong>USD ($)</strong> and <strong>EUR (€)</strong>.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => handleOpenApply("persona")}
                  className="bg-gradient-to-r from-sterling-gold to-sterling-gold-light hover:from-amber-600 hover:to-sterling-gold text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all"
                >
                  Apply Online Now
                </button>
                <a
                  href="#calculator"
                  className="bg-white/10 hover:bg-white/20 text-white font-semibold text-xs px-5 py-3 rounded-lg border border-white/20 transition-all flex items-center gap-2"
                >
                  <Calculator className="w-4 h-4 text-sterling-gold" />
                  Loan Calculator
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION: Choose what is right for you (Official 3-Card Grid)
            ========================================================================= */}
        <section className="py-16 sm:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Section Heading */}
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-black text-sterling-navy font-display tracking-tight mb-3">
                Choose what is right for you
              </h2>
              <p className="text-slate-600 text-sm sm:text-base">
                Discover the financing solution tailored to your personal goals and investment requirements.
              </p>
            </div>

            {/* 3 Product Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* CARD 1: Persona Personal Loan */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group hover:border-sterling-gold/50">
                <div className="p-8 flex flex-col items-center text-center border-b border-slate-100 bg-[#FAFAFA] min-h-[160px] justify-center">
                  <div className="h-20 flex items-center justify-center">
                    <img 
                      src="/images/personal-loans/sterling_bank_persona_01_0.png" 
                      alt="Persona Personal Loan" 
                      className="max-h-16 w-auto object-contain transition-transform group-hover:scale-105"
                    />
                  </div>
                </div>

                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-sterling-navy">Persona Personal Loan</h3>
                      <p className="text-xs font-semibold text-sterling-gold uppercase tracking-wider mt-1">
                        Loan anytime with no collateral
                      </p>
                    </div>

                    <ul className="space-y-2.5 text-xs text-slate-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>Low fixed interest rates from <strong>2.85% p.a.</strong></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>Loan amounts from <strong>$5,000 to $1,000,000+</strong></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>Available in dual currency: <strong>USD ($)</strong> & <strong>EUR (€)</strong></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>Fast approval upon submission of complete documents</span>
                      </li>
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-slate-100 space-y-2">
                    <button
                      type="button"
                      onClick={() => handleOpenApply("persona")}
                      className="w-full py-3 px-4 rounded-xl bg-[#002244] hover:bg-sterling-navy-deep text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow hover:shadow-md"
                    >
                      <span>Apply for Persona</span>
                      <ChevronRight className="w-4 h-4 text-sterling-gold" />
                    </button>
                    <a
                      href="#calculator"
                      className="w-full py-2 px-4 rounded-xl text-center text-xs font-semibold text-slate-600 hover:text-sterling-navy block transition-colors"
                    >
                      Simulate Repayment →
                    </a>
                  </div>
                </div>
              </div>

              {/* CARD 2: EcoSolutions Personal Loan */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group hover:border-emerald-500/50">
                <div className="p-8 flex flex-col items-center text-center border-b border-slate-100 bg-[#FAFAFA] min-h-[160px] justify-center">
                  <div className="h-20 flex items-center justify-center">
                    <img 
                      src="/images/personal-loans/SES-Logo-Website-24.png" 
                      alt="EcoSolutions Personal Loan" 
                      className="max-h-16 w-auto object-contain transition-transform group-hover:scale-105"
                    />
                  </div>
                </div>

                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-sterling-navy">EcoSolutions Personal Loan</h3>
                      <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider mt-1">
                        Small loan, big green impact
                      </p>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      The Sterling EcoSolutions Personal Loan makes it easy to go green—with flexible financing for solar panels, e-bikes, energy-efficient appliances, and sustainable home upgrades.
                    </p>

                    <ul className="space-y-2.5 text-xs text-slate-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>Eco-preferential fixed interest rate</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>Flexible repayment tenors from 12 to 60 months</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>100% digital paperless application</span>
                      </li>
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-slate-100 space-y-2">
                    <button
                      type="button"
                      onClick={() => handleOpenApply("persona")}
                      className="w-full py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow hover:shadow-md"
                    >
                      <span>Apply for EcoSolutions</span>
                      <ChevronRight className="w-4 h-4 text-emerald-200" />
                    </button>
                    <a
                      href="#calculator"
                      className="w-full py-2 px-4 rounded-xl text-center text-xs font-semibold text-slate-600 hover:text-emerald-700 block transition-colors"
                    >
                      Simulate Repayment →
                    </a>
                  </div>
                </div>
              </div>

              {/* CARD 3: Pangarap Personal Loan */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group hover:border-amber-500/50">
                <div className="p-8 flex flex-col items-center text-center border-b border-slate-100 bg-[#FAFAFA] min-h-[160px] justify-center">
                  <div className="h-20 flex items-center justify-center">
                    <img 
                      src="/images/personal-loans/PPL-Logo-Website-24-25.png" 
                      alt="Pangarap Personal Loan" 
                      className="max-h-16 w-auto object-contain transition-transform group-hover:scale-105"
                    />
                  </div>
                </div>

                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-sterling-navy">Pangarap Personal Loan</h3>
                      <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider mt-1">
                        Your future starts with a dream
                      </p>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      Turn your dreams into reality and invest in a brighter future! Whether you&apos;re paying for your child&apos;s education or taking the next step in your career through studies or upskilling, Pangarap Personal Loan is here to support your goals.
                    </p>

                    <ul className="space-y-2.5 text-xs text-slate-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>Financing for tuition, career upskilling, and certifications</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>Low monthly amortizations structured around your cashflow</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>Quick disbursement to accredited institutions or personal account</span>
                      </li>
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-slate-100 space-y-2">
                    <button
                      type="button"
                      onClick={() => handleOpenApply("persona")}
                      className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-sterling-gold to-sterling-gold-light hover:from-amber-600 hover:to-sterling-gold text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow hover:shadow-md"
                    >
                      <span>Apply for Pangarap</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    <a
                      href="#calculator"
                      className="w-full py-2 px-4 rounded-xl text-center text-xs font-semibold text-slate-600 hover:text-amber-700 block transition-colors"
                    >
                      Simulate Repayment →
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION: Interactive Loan Simulator & Parameters (USD / EUR)
            ========================================================================= */}
        <section id="calculator" className="py-20 bg-gradient-to-b from-slate-900 via-sterling-navy-deep to-[#002244] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              <div className="lg:col-span-5 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sterling-gold/20 border border-sterling-gold/40 text-sterling-gold text-xs font-bold uppercase tracking-wider">
                  <Calculator className="w-4 h-4" />
                  Instant Repayment Simulator
                </div>

                <h2 className="text-3xl sm:text-4xl font-black font-display tracking-tight text-white leading-tight">
                  Calculate Your Monthly Personal Loan Payment
                </h2>

                <p className="text-sm text-slate-300 leading-relaxed">
                  Plan your financing with complete transparency. Use our real-time calculator to evaluate monthly amortizations, interest schedules, and repayment tenors in either <strong>USD ($)</strong> or <strong>EUR (€)</strong>.
                </p>

                <div className="space-y-3 pt-2 text-xs text-slate-300">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-sterling-gold shrink-0">
                      <Clock className="w-4 h-4" />
                    </div>
                    <span>Fast decision in principle within 24 to 48 hours</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-sterling-gold shrink-0">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <span>Zero prepayment penalty on standard early settlement</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-sterling-gold shrink-0">
                      <Lock className="w-4 h-4" />
                    </div>
                    <span>Encrypted SSL financial data submission</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <LoanCalculator onApply={(loanType) => handleOpenApply(loanType)} />
              </div>

            </div>
          </div>
        </section>

        {/* =========================================================================
            PREFOOTER SECTION: Bank on-the-go (Official Sterling Mobile App Banner)
            ========================================================================= */}
        <section className="relative bg-[#001833] text-white py-16 overflow-hidden border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Text Left Column */}
              <div className="lg:col-span-7 space-y-5">
                <h3 className="text-3xl sm:text-4xl font-black font-display text-white">
                  Bank on-the-go
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
                  Make transactions on-the-go with Sterling Bank&apos;s mobile app, available on iOS and Android. Manage your personal loans, check amortizations, and transfer funds seamlessly.
                </p>

                <div className="space-y-3 text-xs sm:text-sm text-slate-200">
                  <div className="flex items-start gap-3">
                    <img 
                      src="/images/personal-loans/yellow-check-icon.png" 
                      alt="check" 
                      className="w-5 h-5 shrink-0 mt-0.5" 
                    />
                    <p>With Sterling Bank Online, you can address your banking needs with ease, anytime, anywhere.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <img 
                      src="/images/personal-loans/yellow-check-icon.png" 
                      alt="check" 
                      className="w-5 h-5 shrink-0 mt-0.5" 
                    />
                    <p>Manage your funds, pay bills and more through seamless and secure online banking right at your fingertips.</p>
                  </div>
                </div>

                {/* App Download Store Badges */}
                <div className="flex items-center gap-4 pt-3">
                  <a 
                    href="https://play.google.com/store/apps/details?id=com.sterlingbankasia.retailbanking" 
                    target="_blank" 
                    rel="noreferrer"
                    className="hover:opacity-90 transition-opacity"
                  >
                    <img 
                      src="/images/personal-loans/google-download_0.png" 
                      alt="Get it on Google Play" 
                      className="h-10 w-auto" 
                    />
                  </a>
                  <a 
                    href="https://apps.apple.com/ph/app/sterling-bank-online-personal/id1225810096" 
                    target="_blank" 
                    rel="noreferrer"
                    className="hover:opacity-90 transition-opacity"
                  >
                    <img 
                      src="/images/personal-loans/ios-download_0.png" 
                      alt="Download on the App Store" 
                      className="h-10 w-auto" 
                    />
                  </a>
                </div>
              </div>

              {/* Phone Mockup Right Column */}
              <div className="lg:col-span-5 flex justify-center lg:justify-end">
                <img 
                  src="/images/personal-loans/sterling-bank-phone-images.png" 
                  alt="Sterling Bank Mobile App" 
                  className="max-h-[340px] w-auto object-contain drop-shadow-2xl" 
                />
              </div>

            </div>
          </div>
        </section>

        {/* =========================================================================
            SECURITY NOTICE: Never Click That Link (Official Advisory)
            ========================================================================= */}
        <section className="bg-amber-50 border-y border-amber-200/80 py-10 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-700 shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-bold text-slate-900">Security Advisory: Never Click That Link</h4>
                <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
                  Sterling Bank of Asia will never send links via SMS, email, or any messaging app asking for your passwords or OTPs. Always protect your account credentials and verify loan offers through our official portal.
                </p>
              </div>
            </div>

            <a
              href="mailto:contact@sterlingbankasia.com"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white border border-amber-300 text-slate-800 text-xs font-bold hover:bg-amber-100 transition-colors shadow-sm shrink-0"
            >
              Report Suspicious Activity
            </a>
          </div>
        </section>

      </main>

      {/* Official Sterling Bank Footer */}
      <Footer />

      {/* Quick Application Modal */}
      <QuickApplyModal
        isOpen={applyModalOpen}
        onClose={() => setApplyModalOpen(false)}
        defaultLoanType={selectedLoanType}
      />
    </div>
  );
}
