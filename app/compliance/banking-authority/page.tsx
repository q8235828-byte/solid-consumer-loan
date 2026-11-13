"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuickApplyModal from "@/components/QuickApplyModal";
import { 
  Building2, 
  ShieldCheck, 
  FileCheck2, 
  ChevronRight, 
  CheckCircle2, 
  ArrowRight, 
  Scale, 
  Lock, 
  Award, 
  FileText,
  BadgeCheck,
  Globe2
} from "lucide-react";

export default function BankingAuthorityPage() {
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
            <span className="text-slate-700 font-semibold">Licensed Prudential Banking Authority</span>
          </div>
        </div>

        {/* Hero Banner */}
        <section className="bg-gradient-to-br from-sterling-navy-deep via-sterling-navy to-[#0F2856] text-white py-14 px-4 sm:px-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(212,175,55,0.12),transparent_60%)]" />
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sterling-gold/15 border border-sterling-gold/30 text-sterling-gold text-xs font-semibold mb-4">
              <ShieldCheck className="w-4 h-4" />
              <span>Prudential Supervisory Oversight & Charter</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
              Licensed Prudential Banking Authority
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
              Loan Commercial Group operates under institutional prudential banking standards, stringent capital adequacy mandates, and continuous risk monitoring. Discover our legal charter, regulatory supervisory mechanisms, and commitment to market integrity.
            </p>
          </div>
        </section>

        {/* Content Container */}
        <section className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Main Article Body */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Executive Summary Card */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-4">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="w-10 h-10 rounded-xl bg-sterling-gold/10 flex items-center justify-center text-sterling-gold font-bold">
                    <Scale className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-sterling-navy">Institutional Charter & Authority Framework</h2>
                    <p className="text-xs text-slate-500">Document Ref: LCG-REG-AUTH-2026 • Validated Q1 2026</p>
                  </div>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Loan Commercial Group (LCG) is chartered and authorized as a licensed non-bank financial institution and commercial credit provider. Our lending activities are conducted in strict alignment with international prudential financial standards, Basel III/IV capital adequacy guidelines, and national consumer credit legislation.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                    <span className="text-xs font-semibold text-sterling-navy uppercase tracking-wider block mb-1">Prudential Tier 1 Capital Ratio</span>
                    <span className="text-2xl font-bold text-sterling-gold">18.4%</span>
                    <p className="text-[11px] text-slate-500 mt-1">Exceeds international statutory benchmark requirements (10.5%).</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                    <span className="text-xs font-semibold text-sterling-navy uppercase tracking-wider block mb-1">Liquidity Coverage Ratio (LCR)</span>
                    <span className="text-2xl font-bold text-emerald-600">162%</span>
                    <p className="text-[11px] text-slate-500 mt-1">Guarantees unhindered loan disbursements and liquidity buffers.</p>
                  </div>
                </div>
              </div>

              {/* Regulatory Pillars */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
                <h3 className="text-lg font-bold text-sterling-navy flex items-center gap-2">
                  <BadgeCheck className="w-5 h-5 text-sterling-gold" />
                  Five Pillars of Prudential Governance
                </h3>
                
                <div className="space-y-4">
                  <div className="p-4 rounded-xl border border-slate-200 hover:border-sterling-gold/50 transition-colors">
                    <h4 className="text-sm font-bold text-slate-800 mb-1">1. Solvency & Ring-Fenced Lending Reserves</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      All approved private, personal, and corporate loans are funded through fully capitalized treasury accounts. We maintain dedicated liquidity provisions to guarantee that committed loan facilities are disbursed within 24 to 48 hours of closing.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 hover:border-sterling-gold/50 transition-colors">
                    <h4 className="text-sm font-bold text-slate-800 mb-1">2. Anti-Money Laundering (AML) & CFT Compliance</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Loan Commercial Group enforces rigorous Know-Your-Customer (KYC) and Anti-Money Laundering (AML) controls adhering to Financial Action Task Force (FATF) recommendations and OFAC sanction screening lists.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 hover:border-sterling-gold/50 transition-colors">
                    <h4 className="text-sm font-bold text-slate-800 mb-1">3. Independent Third-Party Audit & Inspection</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Financial statements, loan portfolios, credit loss reserves, and digital escrow accounts undergo comprehensive bi-annual audits by Tier-1 independent auditing firms to assure absolute investor and borrower transparency.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 hover:border-sterling-gold/50 transition-colors">
                    <h4 className="text-sm font-bold text-slate-800 mb-1">4. Ethical Lending & Risk Underwriting Standards</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Our proprietary credit assessment algorithm ensures that loan proposals are balanced, affordable, and devoid of predatory clauses, hidden balloon payments, or arbitrary rate escalations.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 hover:border-sterling-gold/50 transition-colors">
                    <h4 className="text-sm font-bold text-slate-800 mb-1">5. Cross-Border Financial Passporting</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Loan facilities in both US Dollars (USD) and Euros (EUR) are structured in compliance with multi-jurisdictional private financing regulations, permitting lawful cross-border capital deployment.
                    </p>
                  </div>
                </div>
              </div>

              {/* Certified Verification Seals */}
              <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-3">
                  <Award className="w-6 h-6 text-sterling-gold" />
                  <h3 className="text-base font-bold text-white">Compliance Inquiries & Verification Office</h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Borrowers, institutional partners, and legal representatives can request formal verification of our regulatory filing numbers, corporate certificates of good standing, and supervisory disclosures directly from our Compliance Secretariat:
                </p>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs space-y-1">
                  <div className="text-sterling-gold font-semibold">Institutional Compliance Desk:</div>
                  <div className="text-slate-300">Email: compliance@loancommercialgroup.com</div>
                  <div className="text-slate-300">Secure Direct Line: Available 24/7 via Borrower Portal</div>
                </div>
              </div>

            </div>

            {/* Sidebar Navigation & Quick Links */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Compliance Navigation Menu */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
                <h3 className="text-xs font-bold text-sterling-navy uppercase tracking-wider border-b border-slate-100 pb-3">
                  Regulatory Compliance Documents
                </h3>
                <nav className="space-y-1 text-xs">
                  <Link 
                    href="/compliance/banking-authority" 
                    className="flex items-center justify-between p-2.5 rounded-lg bg-sterling-navy text-white font-semibold"
                  >
                    <span>Licensed Banking Authority</span>
                    <ChevronRight className="w-4 h-4 text-sterling-gold" />
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

              {/* Ready to Apply Action Card */}
              <div className="bg-gradient-to-br from-sterling-navy to-slate-900 text-white rounded-2xl p-6 shadow-md border border-sterling-gold/30 space-y-4">
                <h4 className="text-sm font-bold text-sterling-gold uppercase tracking-wider">
                  Apply for Institutional Financing
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Experience fast decisions, competitive rates from 3.10% APR, and flexible terms from $5,000 to $500,000,000.
                </p>
                <button
                  onClick={() => setApplyModalOpen(true)}
                  className="w-full py-3 px-4 rounded-xl bg-sterling-gold text-sterling-navy font-bold text-xs uppercase tracking-wider hover:bg-sterling-gold-light transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <span>Submit Loan Application</span>
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