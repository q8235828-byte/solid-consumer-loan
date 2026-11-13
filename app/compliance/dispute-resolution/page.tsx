"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuickApplyModal from "@/components/QuickApplyModal";
import { 
  Scale, 
  ChevronRight, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  MessageSquare, 
  Clock, 
  HelpCircle,
  FileCheck2,
  Mail
} from "lucide-react";

export default function DisputeResolutionPage() {
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [ticketNum, setTicketNum] = useState("");

  const handleSimulateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTicketNum(`OMBUDS-${Math.floor(100000 + Math.random() * 900000)}`);
    setSubmitted(true);
  };

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
            <span className="text-slate-700 font-semibold">Financial Ombudsman Dispute Resolution</span>
          </div>
        </div>

        {/* Hero Banner */}
        <section className="bg-gradient-to-br from-sterling-navy-deep via-sterling-navy to-[#0F2856] text-white py-14 px-4 sm:px-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(212,175,55,0.12),transparent_60%)]" />
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sterling-gold/15 border border-sterling-gold/30 text-sterling-gold text-xs font-semibold mb-4">
              <Scale className="w-4 h-4" />
              <span>Independent Fair Hearing & Consumer Arbitration</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
              Financial Ombudsman Dispute Resolution
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
              We are committed to fair treatment, ethical dispute resolution, and prompt escalation. Learn how our multi-tier complaint mechanism ensures every borrower inquiry is addressed with integrity.
            </p>
          </div>
        </section>

        {/* Content Container */}
        <section className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Main Article Body */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Process Card */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-4">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="w-10 h-10 rounded-xl bg-sterling-gold/10 flex items-center justify-center text-sterling-gold font-bold">
                    <Scale className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-sterling-navy">Three-Stage Resolution Protocol</h2>
                    <p className="text-xs text-slate-500">Document Ref: LCG-DISP-OMBUD-2026 • Free Consumer Service</p>
                  </div>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Our Dispute Resolution Policy ensures that any concern regarding loan underwriting, rate application, service quality, or transaction processing is investigated impartially and resolved within clear, statutory timelines.
                </p>

                {/* 3 Steps */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="w-7 h-7 rounded-full bg-sterling-navy text-white text-xs font-bold flex items-center justify-center">
                      1
                    </div>
                    <h4 className="text-xs font-bold text-sterling-navy">Stage 1: Frontline Review</h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      Assigned dedicated senior loan specialist. Initial acknowledgment within 24 hours, resolution target 3 to 5 business days.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="w-7 h-7 rounded-full bg-sterling-gold text-sterling-navy text-xs font-bold flex items-center justify-center">
                      2
                    </div>
                    <h4 className="text-xs font-bold text-sterling-navy">Stage 2: Compliance Bureau</h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      Escalated to internal Independent Compliance & Legal Counsel. Comprehensive review conducted within 10 business days.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="w-7 h-7 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center">
                      3
                    </div>
                    <h4 className="text-xs font-bold text-sterling-navy">Stage 3: External Ombudsman</h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      If unresolved after 14 days, you may file with the statutory Financial Ombudsman Service for free independent arbitration.
                    </p>
                  </div>
                </div>
              </div>

              {/* Ombudsman Filing Form Simulation */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-5 h-5 text-sterling-gold" />
                  <h3 className="text-lg font-bold text-sterling-navy">Direct Ombudsman Inquiry & Escalation Desk</h3>
                </div>

                {submitted ? (
                  <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-2">
                    <div className="flex items-center gap-2 font-bold text-sm">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <span>Formal Dispute Case Registered</span>
                    </div>
                    <p className="text-xs text-emerald-800 leading-relaxed">
                      Your case file reference is <strong className="font-mono">{ticketNum}</strong>. A designated senior ombudsman case officer has been assigned and will communicate an official finding via your registered email within 3 business days.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSimulateSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div className="space-y-1">
                        <label className="font-semibold text-slate-700">Full Legal Name</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. John Doe"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-sterling-gold focus:ring-1 focus:ring-sterling-gold"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-semibold text-slate-700">Loan Reference ID</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. LCG-2026-94812"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-sterling-gold focus:ring-1 focus:ring-sterling-gold"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div className="space-y-1">
                        <label className="font-semibold text-slate-700">Email Address</label>
                        <input
                          type="email"
                          required
                          placeholder="you@example.com"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-sterling-gold focus:ring-1 focus:ring-sterling-gold"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-semibold text-slate-700">Nature of Concern</label>
                        <select className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-sterling-gold focus:ring-1 focus:ring-sterling-gold">
                          <option>Interest Calculation or Amortization</option>
                          <option>Application Processing Timeline</option>
                          <option>Documentation & KYC Verification</option>
                          <option>Account Portal / Repayment Processing</option>
                          <option>Other Institutional Concern</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1 text-xs">
                      <label className="font-semibold text-slate-700">Detailed Statement of Facts</label>
                      <textarea
                        rows={4}
                        required
                        placeholder="Please provide full particulars and desired outcome..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-sterling-gold focus:ring-1 focus:ring-sterling-gold"
                      />
                    </div>

                    <button
                      type="submit"
                      className="py-3 px-6 rounded-xl bg-sterling-navy text-white text-xs font-bold uppercase tracking-wider hover:bg-sterling-navy-deep transition-all shadow-md"
                    >
                      Submit Formal Escalation
                    </button>
                  </form>
                )}
              </div>

              {/* Legal Note */}
              <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-3">
                <h3 className="text-base font-bold text-sterling-gold">External Statutory Arbitration Notice</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Participation in our internal ombudsman procedure does not affect or prejudice your statutory right to seek independent legal advice or submit claims before competent judicial authorities in your home jurisdiction.
                </p>
                <div className="text-[11px] text-slate-400">
                  Ombudsman Inquiries: ombudsman@loancommercialgroup.com
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
                    className="flex items-center justify-between p-2.5 rounded-lg bg-sterling-navy text-white font-semibold"
                  >
                    <span>Ombudsman Dispute Resolution</span>
                    <ChevronRight className="w-4 h-4 text-sterling-gold" />
                  </Link>
                </nav>
              </div>

              {/* Fast Financing Card */}
              <div className="bg-gradient-to-br from-sterling-navy to-slate-900 text-white rounded-2xl p-6 shadow-md border border-sterling-gold/30 space-y-4">
                <h4 className="text-sm font-bold text-sterling-gold uppercase tracking-wider">
                  Trusted Borrowing Experience
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Join thousands of satisfied commercial and personal borrowers with guaranteed fair practices.
                </p>
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