"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuickApplyModal from "@/components/QuickApplyModal";
import { 
  FileText, 
  ChevronRight, 
  Scale, 
  CheckCircle2, 
  ArrowRight, 
  BadgePercent, 
  Calculator, 
  ShieldAlert,
  Percent,
  Check
} from "lucide-react";

export default function ConsumerLendingPage() {
  const [applyModalOpen, setApplyModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-800">
      <Navbar onOpenApply={() => setApplyModalOpen(true)} />

      <main className="flex-1">
        {/* Breadcrumb Navigation */}
        <div className="bg-slate-100 border-b border-slate-200 py-3 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-slate-500">
            <Link href="/" className="hover:text-sterling-navy transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-400">Regulatory Compliance</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-700 font-semibold">Consumer Lending Regulations & Disclosure</span>
          </div>
        </div>

        {/* Hero Banner */}
        <section className="bg-gradient-to-br from-sterling-navy-deep via-sterling-navy to-[#0F2856] text-white py-14 px-4 sm:px-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(212,175,55,0.12),transparent_60%)]" />
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sterling-gold/15 border border-sterling-gold/30 text-sterling-gold text-xs font-semibold mb-4">
              <Scale className="w-4 h-4" />
              <span>Truth in Lending Act (TILA) & Fair Credit Standards</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
              Consumer Lending Regulations & Disclosure
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
              Transparent interest rate schedules, clear Annual Percentage Rates (APR), and complete disclosures. Learn your rights as a borrower under international consumer credit legislation.
            </p>
          </div>
        </section>

        {/* Content Container */}
        <section className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Main Article Body */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Full Disclosure Guarantee */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-4">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="w-10 h-10 rounded-xl bg-sterling-gold/10 flex items-center justify-center text-sterling-gold font-bold">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-sterling-navy">Statutory Truth in Lending Statement</h2>
                    <p className="text-xs text-slate-500">Document Ref: LCG-DISC-TILA-2026 • Statutory Rate Transparency</p>
                  </div>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Loan Commercial Group believes in total transparency. Before signing any loan contract or drawing down funds, you will receive a standardized European Standardised Information Sheet (ESIS) / Truth in Lending disclosure statement clearly specifying your fixed interest rate, total finance charge, repayment schedule, and nominal APR.
                </p>

                {/* Example Rate Table */}
                <div className="overflow-x-auto pt-2">
                  <table className="w-full text-xs text-left border border-slate-200 rounded-xl overflow-hidden">
                    <thead className="bg-slate-100 text-sterling-navy font-bold uppercase tracking-wider">
                      <tr>
                        <th className="py-3 px-4">Loan Facility</th>
                        <th className="py-3 px-4">Annual Rate (APR)</th>
                        <th className="py-3 px-4">Standard Tenor</th>
                        <th className="py-3 px-4">Early Repayment Fee</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-slate-600">
                      <tr>
                        <td className="py-3 px-4 font-semibold text-slate-800">Persona Personal Loan</td>
                        <td className="py-3 px-4 text-emerald-600 font-bold">3.20% - 4.50% Fixed</td>
                        <td className="py-3 px-4">12 to 84 Months</td>
                        <td className="py-3 px-4 text-slate-500">0% (Penalty-Free)</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-semibold text-slate-800">Auto & Fleet Loan</td>
                        <td className="py-3 px-4 text-emerald-600 font-bold">3.10% - 3.90% Fixed</td>
                        <td className="py-3 px-4">24 to 72 Months</td>
                        <td className="py-3 px-4 text-slate-500">0% (Penalty-Free)</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-semibold text-slate-800">Residential & Home Loan</td>
                        <td className="py-3 px-4 text-emerald-600 font-bold">2.85% - 3.75% Fixed</td>
                        <td className="py-3 px-4">5 to 25 Years</td>
                        <td className="py-3 px-4 text-slate-500">Capped by Statute</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-semibold text-slate-800">Commercial & Investment Credit</td>
                        <td className="py-3 px-4 text-emerald-600 font-bold">3.50% - 5.25% Fixed</td>
                        <td className="py-3 px-4">1 to 20 Years</td>
                        <td className="py-3 px-4 text-slate-500">Tailored Term Sheet</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Borrower Legal Rights */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
                <h3 className="text-lg font-bold text-sterling-navy flex items-center gap-2">
                  <Scale className="w-5 h-5 text-sterling-gold" />
                  Statutory Borrower Protection Rights
                </h3>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl border border-slate-200 space-y-1.5">
                    <h4 className="text-sm font-bold text-slate-800">1. 14-Day Statutory Cooling-Off Period (Right of Withdrawal)</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      For all consumer and personal credit agreements, borrowers retain the unconditional legal right to cancel their credit agreement within 14 calendar days of signing without incurring penalty charges.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 space-y-1.5">
                    <h4 className="text-sm font-bold text-slate-800">2. Early Settlement & Partial Amortization Rights</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Borrowers may settle their loan early in whole or in part at any time. Unearned interest is automatically waived, ensuring that you only pay interest for the precise duration you held the funds.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 space-y-1.5">
                    <h4 className="text-sm font-bold text-slate-800">3. Affordability & Credit Capacity Evaluation</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      As a responsible lender, Loan Commercial Group undertakes mandatory affordability evaluations to ensure repayment commitments do not exceed healthy debt-to-income (DTI) thresholds (typically &le; 35-40%).
                    </p>
                  </div>
                </div>
              </div>

              {/* Responsible Lending Advisory */}
              <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200/80 space-y-3">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                  <ShieldAlert className="w-5 h-5 text-amber-600" />
                  <span>Important Credit Advisory Warning</span>
                </div>
                <p className="text-xs text-amber-800 leading-relaxed">
                  Borrowing money requires repayment. Entering into any loan commitment requires careful budgeting. Failure to meet repayment deadlines may adversely impact your credit rating and could lead to legal recovery proceedings.
                </p>
              </div>

            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              {/* Compliance Navigation Menu */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
                <h3 className="text-xs font-bold text-sterling-navy uppercase tracking-wider border-b border-slate-100 pb-3">
                  Regulatory Compliance Documents
                </h3>
                <nav className="space-y-1 text-xs">
                  <Link 
                    href="/compliance/banking-authority" 
                    className="flex items-center justify-between p-2.5 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-sterling-navy transition-colors"
                  >
                    <span>Licensed Banking Authority</span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </Link>
                  <Link 
                    href="/compliance/deposit-protection" 
                    className="flex items-center justify-between p-2.5 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-sterling-navy transition-colors"
                  >
                    <span>Deposit Protection Framework</span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </Link>
                  <Link 
                    href="/compliance/data-privacy" 
                    className="flex items-center justify-between p-2.5 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-sterling-navy transition-colors"
                  >
                    <span>Data Privacy & Confidentiality</span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </Link>
                  <Link 
                    href="/compliance/consumer-lending" 
                    className="flex items-center justify-between p-2.5 rounded-lg bg-sterling-navy text-white font-semibold"
                  >
                    <span>Consumer Lending Regulations</span>
                    <ChevronRight className="w-4 h-4 text-sterling-gold" />
                  </Link>
                  <Link 
                    href="/compliance/dispute-resolution" 
                    className="flex items-center justify-between p-2.5 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-sterling-navy transition-colors"
                  >
                    <span>Ombudsman Dispute Resolution</span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </Link>
                </nav>
              </div>

              {/* Loan Simulator Shortcut */}
              <div className="bg-gradient-to-br from-sterling-navy to-slate-900 text-white rounded-2xl p-6 shadow-md border border-sterling-gold/30 space-y-4">
                <h4 className="text-sm font-bold text-sterling-gold uppercase tracking-wider">
                  Calculate Your Monthly Payment
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Use our live interactive simulator to see exact repayment amounts and total interest before you apply.
                </p>
                <Link
                  href="/loan-calculator"
                  className="w-full py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 border border-white/20"
                >
                  <Calculator className="w-4 h-4 text-sterling-gold" />
                  <span>Open Loan Simulator</span>
                </Link>
                <button
                  onClick={() => setApplyModalOpen(true)}
                  className="w-full py-3 px-4 rounded-xl bg-sterling-gold text-sterling-navy font-bold text-xs uppercase tracking-wider hover:bg-sterling-gold-light transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <span>Apply Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </section>
      </main>

      <Footer />
      <QuickApplyModal isOpen={applyModalOpen} onClose={() => setApplyModalOpen(false)} />
    </div>
  );
}