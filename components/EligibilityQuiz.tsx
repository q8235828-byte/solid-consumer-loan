"use client";

import React, { useState } from "react";
import { 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  HelpCircle, 
  RotateCcw,
  ShieldCheck,
  TrendingUp,
  Percent
} from "lucide-react";

interface EligibilityQuizProps {
  onOpenApply?: (loanType: string) => void;
}

export default function EligibilityQuiz({ onOpenApply }: EligibilityQuizProps) {
  const [income, setIncome] = useState(3500);
  const [rentOrMortgage, setRentOrMortgage] = useState(800);
  const [existingLoans, setExistingLoans] = useState(200);
  const [age, setAge] = useState(35);
  const [employmentStatus, setEmploymentStatus] = useState("Employed Full-Time");

  // Debt-to-income ratio calculation
  const totalExpenses = rentOrMortgage + existingLoans;
  const debtRatio = income > 0 ? Math.round((totalExpenses / income) * 100) : 0;
  const maxBorrowable = Math.max(0, Math.round(((income * 0.35) - totalExpenses) * 60));

  const isEligible = debtRatio <= 35 && income >= 1500;
  const isBorderline = debtRatio > 35 && debtRatio <= 42 && income >= 1800;

  const handleReset = () => {
    setIncome(3500);
    setRentOrMortgage(800);
    setExistingLoans(200);
    setAge(35);
    setEmploymentStatus("Employed Full-Time");
  };

  return (
    <section className="py-16 bg-white border-y border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-gradient-to-br from-slate-900 via-sterling-navy-deep to-sterling-navy rounded-3xl p-6 sm:p-10 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-sterling-gold/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left intro (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sterling-gold/20 text-sterling-gold text-xs font-bold border border-sterling-gold/30">
                <Sparkles className="w-3.5 h-3.5" />
                Instant Eligibility Check (30 sec)
              </div>

              <h2 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white leading-snug">
                Check Your Borrowing Eligibility
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Evaluate your loan pre-eligibility in seconds with zero credit bureau impact. Get an instant estimate of your borrowing capacity based on responsible lending guidelines.
              </p>

              <div className="pt-2 flex items-center gap-3 text-xs text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero documentation required for this test</span>
              </div>
            </div>

            {/* Right Interactive Simulator (7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-2xl p-5 sm:p-6 text-slate-800 shadow-xl space-y-4">
              
              {/* Sliders grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Net Income */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-bold text-slate-700">Net Monthly Income</label>
                    <span className="text-xs font-black text-sterling-navy font-mono">
                      ${income.toLocaleString()} / mo
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1000"
                    max="20000"
                    step="250"
                    value={income}
                    onChange={(e) => setIncome(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sterling-gold"
                  />
                </div>

                {/* Housing expense */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-bold text-slate-700">Rent or Mortgage</label>
                    <span className="text-xs font-black text-slate-700 font-mono">
                      ${rentOrMortgage.toLocaleString()} / mo
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="6000"
                    step="100"
                    value={rentOrMortgage}
                    onChange={(e) => setRentOrMortgage(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sterling-gold"
                  />
                </div>

                {/* Existing loan payments */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-bold text-slate-700">Existing Loan Credits</label>
                    <span className="text-xs font-black text-slate-700 font-mono">
                      ${existingLoans.toLocaleString()} / mo
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="3000"
                    step="50"
                    value={existingLoans}
                    onChange={(e) => setExistingLoans(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sterling-gold"
                  />
                </div>

                {/* Age */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-bold text-slate-700">Your Age: {age} Years</label>
                    <span className="text-xs font-black text-slate-700 font-mono">{age} yrs</span>
                  </div>
                  <input
                    type="range"
                    min="18"
                    max="75"
                    step="1"
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sterling-gold"
                  />
                </div>
              </div>

              {/* Employment Status Pills */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Employment Profile</label>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Employed Full-Time", 
                    "Executive / Corporate", 
                    "Business Owner", 
                    "Self-Employed", 
                    "Retired"
                  ].map((stat) => (
                    <button
                      key={stat}
                      type="button"
                      onClick={() => setEmploymentStatus(stat)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                        employmentStatus === stat
                          ? "bg-sterling-navy text-white shadow-sm"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {stat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Real-time Indicator Box */}
              <div className="pt-3 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50 rounded-xl p-3.5">
                <div className="space-y-0.5 text-center sm:text-left">
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Debt-to-Income Ratio
                  </div>
                  <div className="flex items-center gap-2 justify-center sm:justify-start">
                    <span className={`text-xl font-black font-mono ${
                      isEligible ? "text-emerald-600" : isBorderline ? "text-amber-600" : "text-rose-600"
                    }`}>
                      {debtRatio}%
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isEligible
                        ? "bg-emerald-100 text-emerald-800"
                        : isBorderline
                        ? "bg-amber-100 text-amber-800"
                        : "bg-rose-100 text-rose-800"
                    }`}>
                      {isEligible ? "Excellent Eligibility" : isBorderline ? "Moderate Review" : "Exceeds standard 35%"}
                    </span>
                  </div>
                </div>

                {/* Instant Action CTA */}
                <button
                  type="button"
                  onClick={() => onOpenApply?.("persona")}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-sterling-gold to-sterling-gold-light hover:from-amber-600 hover:to-sterling-gold text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow transition-all"
                >
                  <span>Apply with Pre-approval</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
