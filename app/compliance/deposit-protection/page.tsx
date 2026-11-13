"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuickApplyModal from "@/components/QuickApplyModal";
import { 
  ShieldCheck, 
  ChevronRight, 
  Lock, 
  CheckCircle2, 
  ArrowRight, 
  Vault, 
  Coins, 
  Scale, 
  BadgePercent,
  FileCheck
} from "lucide-react";

export default function DepositProtectionPage() {
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
            <span className="text-slate-700 font-semibold">Statutory Deposit Protection Framework</span>
          </div>
        </div>

        {/* Hero Banner */}
        <section className="bg-gradient-to-br from-sterling-navy-deep via-sterling-navy to-[#0F2856] text-white py-14 px-4 sm:px-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(212,175,55,0.12),transparent_60%)]" />
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sterling-gold/15 border border-sterling-gold/30 text-sterling-gold text-xs font-semibold mb-4">
              <ShieldCheck className="w-4 h-4" />
              <span>Capital Safeguards & Segregated Reserves</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
              Statutory Deposit Protection Framework
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
              Discover how Loan Commercial Group ring-fences borrower capital, ensures collateral safety, and enforces institutional custody rules to protect every client transaction.
            </p>
          </div>
        </section>

        {/* Content Container */}
        <section className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Main Article Body */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Core Principle Card */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-4">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="w-10 h-10 rounded-xl bg-sterling-gold/10 flex items-center justify-center text-sterling-gold font-bold">
                    <Vault className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-sterling-navy">Complete Capital Ring-Fencing & Escrow</h2>
                    <p className="text-xs text-slate-500">Document Ref: LCG-SAFE-PROT-2026 • Tier-1 Custody Standards</p>
                  </div>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Under statutory finance regulations, any funds deposited by borrowers, upfront processing allocations, collateral securities, or loan amortizations are legally segregated from Loan Commercial Group’s general corporate operational accounts. They reside in bankruptcy-remote statutory escrow trusts held at top-tier global clearing banks.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-xs font-bold text-slate-700 block mb-1">100% Segregation</span>
                    <p className="text-[11px] text-slate-500">Client assets never co-mingled with firm operational liabilities.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-xs font-bold text-slate-700 block mb-1">Insolvency Protected</span>
                    <p className="text-[11px] text-slate-500">Legally shielded against creditor claims under trust law.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-xs font-bold text-slate-700 block mb-1">Continuous Audit</span>
                    <p className="text-[11px] text-slate-500">Daily reconciliation by automated financial clearing systems.</p>
                  </div>
                </div>
              </div>

              {/* Protection Guarantees */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
                <h3 className="text-lg font-bold text-sterling-navy flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-sterling-gold" />
                  Statutory Safeguard Mechanisms
                </h3>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl border border-slate-200 space-y-1.5">
                    <h4 className="text-sm font-bold text-slate-800">1. Deposit Guarantee & Coverage Framework</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Deposits, repayments, and escrowed sums are backed by insurance-grade underwriting guarantees. In any unforeseen structural event, qualifying client sums are guaranteed and redeemable in full without loss of principal.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 space-y-1.5">
                    <h4 className="text-sm font-bold text-slate-800">2. Real-Time Escrow Accounting & Ledger Transparency</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Borrowers maintain real-time visibility into their application escrow balance, interest accruals, and repayment disbursements via our secure online banking portal.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 space-y-1.5">
                    <h4 className="text-sm font-bold text-slate-800">3. Non-Recourse & Capped Liability Lending</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Our commercial facilities are structured with clear borrower safeguards. Where non-recourse or collateralized loan contracts apply, borrower liabilities are strictly capped as articulated in the signed financing deed.
                    </p>
                  </div>
                </div>
              </div>

              {/* Custody Partners Note */}
              <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-3">
                <h3 className="text-base font-bold text-sterling-gold">Statutory Custody Certification</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  All collateral instruments (including promissory notes, letters of credit, mortgage deeds, and pledge documentation) are securely safeguarded in electronic vaults subject to ISO 27001 physical and cyber standards.
                </p>
                <div className="text-[11px] text-slate-400">
                  For certified custody confirmations: legal@loancommercialgroup.com
                </div>
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
                    className="flex items-center justify-between p-2.5 rounded-lg bg-sterling-navy text-white font-semibold"
                  >
                    <span>Deposit Protection Framework</span>
                    <ChevronRight className="w-4 h-4 text-sterling-gold" />
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
                    className="flex items-center justify-between p-2.5 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-sterling-navy transition-colors"
                  >
                    <span>Consumer Lending Regulations</span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
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

              {/* Fast Financing Card */}
              <div className="bg-gradient-to-br from-sterling-navy to-slate-900 text-white rounded-2xl p-6 shadow-md border border-sterling-gold/30 space-y-4">
                <h4 className="text-sm font-bold text-sterling-gold uppercase tracking-wider">
                  Guaranteed Safe Financing
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Borrow with complete peace of mind. Transparent interest schedules with zero hidden fees.
                </p>
                <button
                  onClick={() => setApplyModalOpen(true)}
                  className="w-full py-3 px-4 rounded-xl bg-sterling-gold text-sterling-navy font-bold text-xs uppercase tracking-wider hover:bg-sterling-gold-light transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <span>Apply with Safe Escrow</span>
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