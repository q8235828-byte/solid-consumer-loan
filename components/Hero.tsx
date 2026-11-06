"use client";

import React from "react";
import { 
  CheckCircle,
  FileCheck2,
  TrendingDown,
  Clock,
  Star,
  ShieldCheck,
  Mail,
  MessageCircle,
  DollarSign,
  ArrowRight,
  Globe2,
  Briefcase
} from "lucide-react";
import LoanCalculator from "./LoanCalculator";

interface HeroProps {
  onOpenApply?: (loanType?: string) => void;
}

export default function Hero({ onOpenApply }: HeroProps) {
  return (
    <section className="relative bg-gradient-to-b from-sterling-navy-deep via-sterling-navy to-[#03234D] text-white pt-8 pb-20 overflow-hidden">
      {/* Decorative background glow accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-sterling-gold/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Official Announcement & Financing Details */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Valid Loan Offer Pill Tag */}
            <div className="inline-flex items-center gap-2 bg-sterling-gold/20 border border-sterling-gold/40 px-4 py-1.5 rounded-full shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-black tracking-wider text-sterling-gold uppercase">
                VALID LOAN OFFER — FAST APPROVAL & RAPID PROCESSING
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.15] font-display text-white">
              International Private Investment &{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sterling-gold via-sterling-gold-light to-amber-200">
                Lending Solutions
              </span>
            </h1>

            {/* Official Announcement Statement Box */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-xs font-extrabold uppercase tracking-wider text-sterling-gold flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-sterling-gold" />
                  Official Lending & Financing Notice
                </span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 px-2 py-0.5 rounded-full font-bold">
                  Worldwide Qualified Applicants
                </span>
              </div>

              <div className="text-xs sm:text-sm text-slate-200 space-y-2.5 leading-relaxed font-normal">
                <p className="font-semibold text-white">
                  Dear Investors and Financial Seekers,
                </p>
                <p>
                  We are a registered private investment and lending company offering financing solutions to individuals and companies worldwide who are seeking financial assistance for legitimate business or investment purposes.
                </p>
                <p>
                  We offer loan facilities with repayment terms ranging from <strong>1 year to 25 years</strong>, depending on the applicant’s financial profile, project, and agreed terms.
                </p>
              </div>

              {/* Key Parameters Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="bg-sterling-navy-deep/70 border border-white/10 rounded-xl p-3.5 space-y-1">
                  <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
                    Loan Amounts Available
                  </div>
                  <div className="text-lg sm:text-xl font-black text-sterling-gold font-mono">
                    USD $100,000 to $500,000,000
                  </div>
                  <div className="text-[10px] text-slate-300">
                    High-capacity capital structuring
                  </div>
                </div>

                <div className="bg-sterling-navy-deep/70 border border-white/10 rounded-xl p-3.5 space-y-1">
                  <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
                    Available Currencies
                  </div>
                  <div className="text-lg sm:text-xl font-black text-emerald-400 font-mono flex items-center gap-2">
                    <span>USD ($)</span>
                    <span className="text-slate-500">•</span>
                    <span>Euro (€)</span>
                  </div>
                  <div className="text-[10px] text-slate-300">
                    Dual currency flexibility
                  </div>
                </div>
              </div>

              {/* Due Diligence & Regulatory Compliance */}
              <p className="text-[11px] text-slate-300 leading-relaxed italic border-t border-white/10 pt-3">
                &ldquo;Our financing facilities are structured with a focus on security, transparency, and proper documentation. All applications are subject to the required verification, due diligence, approval, and applicable legal and regulatory requirements. We are available to assist qualified individuals and companies seeking legitimate financing.&rdquo;
              </p>

              {/* Direct Contact CTAs via WhatsApp & Email */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                <a
                  href="https://wa.me/?text=Hello%2C%20I%20am%20interested%20in%20your%20Loan%20Offer%20and%20would%20like%20further%20information%20and%20application%20guidelines."
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-3 px-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Contact via WhatsApp</span>
                </a>

                <a
                  href="mailto:contact@sterlingbank.fr?subject=Financing%20Application%20Inquiry%20(USD%2FEUR)&body=Dear%20Lending%20Team%2C%0A%0AI%20am%20seeking%20financing%20for%20legitimate%20business%2Finvestment%20purposes.%20Please%20provide%20application%20requirements%20and%20guidelines."
                  className="flex-1 bg-white/10 hover:bg-white/20 text-white border border-white/30 font-bold text-xs py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <Mail className="w-4 h-4 text-sterling-gold" />
                  <span>Contact via Email</span>
                </a>

                <button
                  type="button"
                  onClick={() => onOpenApply?.("persona")}
                  className="bg-gradient-to-r from-sterling-gold via-sterling-gold-light to-sterling-gold text-sterling-navy-deep font-black text-xs py-3 px-4 rounded-xl shadow-md hover:scale-[1.02] transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Apply Now</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
                </button>
              </div>

            </div>

            {/* Advisor Real Human Trust Badge */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex items-center gap-4">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=160&q=80"
                alt="Emily Vance - Senior Lending Officer"
                className="w-13 h-13 rounded-full object-cover ring-2 ring-sterling-gold shrink-0 shadow-md"
              />
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">Emily Vance</span>
                  <span className="text-[10px] text-sterling-gold bg-sterling-navy-deep px-2 py-0.5 rounded-full border border-sterling-gold/30 font-semibold">
                    Senior Financing & Lending Specialist
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 italic">
                  Dedicated human assessment, rapid due diligence, and tailored repayment schedules.
                </p>
                <div className="flex items-center gap-1 text-[10px] text-amber-300 font-semibold">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400 stroke-none" />
                    ))}
                  </div>
                  <span>4.9/5 based on verified international client satisfaction</span>
                </div>
              </div>
            </div>

            {/* Quick Guarantees Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="bg-white/5 border border-white/10 rounded-xl p-3 backdrop-blur-sm">
                <div className="w-7 h-7 rounded-lg bg-sterling-gold/20 flex items-center justify-center text-sterling-gold mb-1.5">
                  <Clock className="w-3.5 h-3.5" />
                </div>
                <div className="text-white font-bold text-xs">Rapid Processing</div>
                <div className="text-[10px] text-slate-300 mt-0.5">Preliminary assessment within 24h</div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-3 backdrop-blur-sm">
                <div className="w-7 h-7 rounded-lg bg-sterling-gold/20 flex items-center justify-center text-sterling-gold mb-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <div className="text-white font-bold text-xs">Full Transparency</div>
                <div className="text-[10px] text-slate-300 mt-0.5">Zero hidden fees & proper documentation</div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-3 backdrop-blur-sm">
                <div className="w-7 h-7 rounded-lg bg-sterling-gold/20 flex items-center justify-center text-sterling-gold mb-1.5">
                  <Globe2 className="w-3.5 h-3.5" />
                </div>
                <div className="text-white font-bold text-xs">USD & EUR Available</div>
                <div className="text-[10px] text-slate-300 mt-0.5">1 to 25-year flexible amortizations</div>
              </div>
            </div>

          </div>

          {/* Right Column: Floating Interactive Loan Calculator */}
          <div className="lg:col-span-5">
            <LoanCalculator onApply={(loanType) => onOpenApply?.(loanType)} />
          </div>

        </div>
      </div>
    </section>
  );
}
