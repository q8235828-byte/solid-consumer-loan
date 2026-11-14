"use client";

import React from "react";
import Link from "next/link";
import { 
  UserCheck, 
  Car, 
  Home, 
  ArrowRight, 
  Check, 
  Sparkles,
  ShieldCheck,
  ExternalLink 
} from "lucide-react";

interface ProductCardsProps {
  onOpenApply?: (loanType: string) => void;
}

export default function ProductCards({ onOpenApply }: ProductCardsProps) {
  return (
    <section id="services" className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-sterling-gold-dark px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-sterling-gold" />
            Core Banking & Capital Allocation
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-sterling-navy tracking-tight font-display">
            OUR FINANCIAL SERVICES
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Empowering individuals, entrepreneurs, and global enterprises with bespoke capital facilities and premier international investment partnerships.
          </p>
        </div>

        {/* Primary Services Grid: 1 & 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          
          {/* Service 1: Personal & Business Loans */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 hover:border-sterling-gold/60 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-bl-full pointer-events-none" />
            
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-sterling-gold bg-sterling-navy px-3 py-1 rounded-full">
                  Service 01
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                  $100,000 to $500,000,000
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-black text-sterling-navy font-display">
                  1. PERSONAL & BUSINESS LOANS
                </h3>
                <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                  Access financing opportunities for personal needs, business expansion, property purchases, and other approved financial projects.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500 font-medium">Financing Range:</span>
                  <span className="font-bold text-sterling-navy font-mono">$100,000 – $500,000,000</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500 font-medium">Repayment Tenor:</span>
                  <span className="font-bold text-sterling-navy font-mono">1 to 25 Years (12 to 300 Mos)</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500 font-medium">Supported Currencies:</span>
                  <span className="font-bold text-emerald-600 font-mono">USD ($) & EUR (€)</span>
                </div>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>High-capacity capital for commercial growth, liquidity & major personal projects.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Tailored repayment structures aligned with your verified cashflow profile.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Transparent financing agreements with clear legal documentation and zero hidden costs.</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 border-t border-slate-100 mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => onOpenApply?.("persona")}
                className="flex-1 py-3 px-4 bg-sterling-navy hover:bg-sterling-navy-deep text-white font-bold text-xs rounded-xl shadow transition-all flex items-center justify-center gap-2 group-hover:bg-sterling-gold group-hover:text-sterling-navy-deep"
              >
                <span>Apply for Loan</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <Link
                href="/apply"
                className="py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors"
              >
                Full Details
              </Link>
            </div>
          </div>

          {/* Service 2: Housing & Construction Financing */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 hover:border-sterling-gold/60 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-bl-full pointer-events-none" />
            
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-sterling-gold bg-sterling-navy px-3 py-1 rounded-full">
                  Service 02
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                  $100,000 to $500,000,000
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-black text-sterling-navy font-display">
                  2. HOUSING & CONSTRUCTION FINANCING
                </h3>
                <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                  Planning to build your dream home or develop a property? We offer eligible applicants opportunities to secure funding for house construction, real estate development, and commercial building projects, depending on the financing agreement.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500 font-medium">Financing Range:</span>
                  <span className="font-bold text-sterling-navy font-mono">$100,000 – $500,000,000</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500 font-medium">Tenor Options:</span>
                  <span className="font-bold text-sterling-navy font-mono">Up to 25 Years (300 Months)</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500 font-medium">Funding Tranches:</span>
                  <span className="font-bold text-emerald-600 font-mono">Milestone Progressive Release</span>
                </div>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Funding for residential builds, private estates & multi-unit commercial developments.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Progressive disbursements tied to certified architectural and construction milestones.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Fixed long-term amortization up to 25 years in both USD ($) and Euro (€).</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 border-t border-slate-100 mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => onOpenApply?.("home")}
                className="flex-1 py-3 px-4 bg-sterling-navy hover:bg-sterling-navy-deep text-white font-bold text-xs rounded-xl shadow transition-all flex items-center justify-center gap-2 group-hover:bg-sterling-gold group-hover:text-sterling-navy-deep"
              >
                <span>Apply for Construction</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <Link
                href="/apply"
                className="py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors"
              >
                Full Details
              </Link>
            </div>
          </div>

        </div>

        {/* Highlighted Service 3: International Investment Opportunities */}
        <div className="bg-gradient-to-br from-sterling-navy-deep via-sterling-navy to-[#03234D] text-white rounded-3xl p-8 sm:p-12 border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-sterling-gold/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs font-black uppercase tracking-wider text-sterling-navy bg-sterling-gold px-3.5 py-1 rounded-full shadow-sm">
                Service 03 • Global Partnerships
              </span>
              <span className="text-xs sm:text-sm font-black text-sterling-gold bg-white/10 border border-sterling-gold/30 px-3.5 py-1 rounded-full">
                From $100,000 to $5,000,000,000 and Beyond!
              </span>
            </div>

            <div className="max-w-4xl space-y-3">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black font-display tracking-tight text-white">
                3. INTERNATIONAL INVESTMENT OPPORTUNITIES
              </h3>
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                Access Potential Investment Partnerships <strong>From $100,000 to $5,000,000,000 and Beyond!</strong> We facilitate connections with private investors and international investment partners interested in financing promising projects across different parts of the world.
              </p>
            </div>

            {/* 6 Investment Opportunity Asset Classes */}
            <div className="pt-2">
              <div className="text-xs font-bold uppercase tracking-wider text-sterling-gold mb-3">
                Our Investment Opportunities May Include:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  { title: "Cash Investments", desc: "Direct capital liquidity injections and equity financing." },
                  { title: "Gold & Physical Assets", desc: "Precious metal reserves and collateralized commodity allocations." },
                  { title: "Cryptocurrency Investments", desc: "Digital asset allocations, institutional liquidity & Web3 ventures." },
                  { title: "Business Development Funding", desc: "Enterprise scale-up, market entry, acquisitions & working capital." },
                  { title: "Real Estate & Construction Projects", desc: "Commercial towers, resort developments, residential communities." },
                  { title: "Large-Scale Commercial Investments", desc: "Infrastructure, maritime logistics, industrial plants & energy." },
                ].map((item, idx) => (
                  <div key={idx} className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-sterling-gold" />
                      <span className="text-xs sm:text-sm font-extrabold text-white">{item.title}</span>
                    </div>
                    <p className="text-[11px] text-slate-300 pl-4 leading-normal">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Connection and In-Person Meetings Box */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3 text-xs sm:text-sm text-slate-200 leading-relaxed">
              <p>
                Depending on your project proposal and funding requirements, qualified applicants may be connected with suitable investors for investment discussions.
              </p>
              <p className="text-sterling-gold-light font-semibold">
                For applicants who meet the necessary requirements, opportunities may also be available to arrange face-to-face meetings with prospective investors to discuss proposals and negotiate investment agreements.
              </p>
              <p className="text-[11px] text-slate-400 italic">
                * Investment amounts depend on project evaluation, verified investor capacity, and available capital allocation.
              </p>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => onOpenApply?.("ecosolutions")}
                className="py-3.5 px-6 bg-gradient-to-r from-sterling-gold via-sterling-gold-light to-sterling-gold text-sterling-navy-deep font-black text-xs sm:text-sm rounded-xl shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
              >
                <span>Submit an Investment Proposal</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
              <a
                href="mailto:customer.experience@loancommercialgroup.com?subject=Investment%20Partnership%20Proposal&body=Dear%20Investment%20Committee%2C%0A%0AWe%20wish%20to%20submit%20an%20investment%20proposal%20for%20project%20financing.%0A%0AProject%20Overview%3A%0ARequired%20Capital%3A%0ATarget%20Asset%20Class%3A"
                className="py-3.5 px-6 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm rounded-xl border border-white/20 transition-all flex items-center justify-center gap-2"
              >
                <span>Email Proposal Dossier</span>
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
