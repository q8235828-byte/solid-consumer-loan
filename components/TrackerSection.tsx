"use client";

import React, { useState } from "react";
import { 
  Search, 
  CheckCircle2, 
  Clock, 
  FileText, 
  ShieldCheck, 
  AlertCircle,
  ArrowRight,
  Sparkles
} from "lucide-react";

export default function TrackerSection() {
  const [refNumber, setRefNumber] = useState("");
  const [phoneDigits, setPhoneDigits] = useState("");
  const [statusResult, setStatusResult] = useState<any>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);

    // Mock tracking status for demo
    setStatusResult({
      ref: refNumber || "SBA-LN-202611-98421",
      applicant: "Mark Dela Cruz",
      loanType: "Persona Personal Loan",
      amount: "₱350,000",
      submissionDate: "November 03, 2026",
      currentStage: 3, // 1: Submitted, 2: Document Verification, 3: Underwriting, 4: Approved, 5: Disbursed
      stages: [
        { name: "Application Submitted", date: "Nov 03, 2026 • 10:14 AM", status: "completed" },
        { name: "Digital KYC & Document Review", date: "Nov 03, 2026 • 02:30 PM", status: "completed" },
        { name: "Credit Underwriting & CI", date: "In Progress (Estimated 24h)", status: "active" },
        { name: "Loan Approval & PDC Signing", date: "Pending Underwriting", status: "pending" },
        { name: "Proceeds Disbursement", date: "Pending Approval", status: "pending" },
      ],
      remarks: "Your income documents and PhilSys verification have passed initial compliance checks. Your application is actively being assessed by the Credit Underwriting Committee.",
    });
  };

  return (
    <section id="tracker" className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-sterling-gold uppercase tracking-wider bg-amber-50 border border-amber-200 px-3.5 py-1 rounded-full">
            <Search className="w-3.5 h-3.5" />
            Self-Service Application Tracker
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-sterling-navy font-display tracking-tight">
            Check Your Loan Status
          </h2>
          <p className="text-sm text-slate-600">
            Enter your Application Reference ID (provided upon submission) and the last 4 digits of your registered mobile number to see real-time updates.
          </p>
        </div>

        {/* Search Card */}
        <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 mb-10">
          <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
            <div className="sm:col-span-7">
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Application Reference Number
              </label>
              <input
                type="text"
                placeholder="e.g. SBA-LN-202611-98421"
                value={refNumber}
                onChange={(e) => setRefNumber(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-mono font-medium focus:ring-2 focus:ring-sterling-gold focus:border-sterling-gold outline-none"
              />
            </div>

            <div className="sm:col-span-3">
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Mobile (Last 4 Digits)
              </label>
              <input
                type="text"
                maxLength={4}
                placeholder="4567"
                value={phoneDigits}
                onChange={(e) => setPhoneDigits(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-mono font-medium text-center focus:ring-2 focus:ring-sterling-gold focus:border-sterling-gold outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <button
                type="submit"
                className="w-full bg-sterling-navy hover:bg-sterling-navy-light text-white font-bold py-3 px-4 rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 shadow-md"
              >
                Track
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        </div>

        {/* Tracking Timeline Output */}
        {searched && statusResult && (
          <div className="max-w-3xl mx-auto bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-sterling-gold/40 animate-in fade-in duration-300 space-y-8">
            
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Reference Number</span>
                <div className="text-xl font-mono font-black text-sterling-navy">{statusResult.ref}</div>
                <div className="text-xs text-slate-600 mt-0.5">
                  Applicant: <span className="font-semibold">{statusResult.applicant}</span> • {statusResult.loanType} ({statusResult.amount})
                </div>
              </div>
              <div className="sm:text-right">
                <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-800 border border-amber-200 px-3 py-1 rounded-full text-xs font-bold">
                  <Clock className="w-3.5 h-3.5 text-amber-600 animate-spin" />
                  Credit Underwriting
                </span>
                <div className="text-[11px] text-slate-400 mt-1">Submitted on {statusResult.submissionDate}</div>
              </div>
            </div>

            {/* Stages Pipeline */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Application Progress Timeline
              </h4>

              <div className="space-y-4">
                {statusResult.stages.map((stage: any, idx: number) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                          stage.status === "completed"
                            ? "bg-emerald-600 text-white"
                            : stage.status === "active"
                            ? "bg-sterling-gold text-sterling-navy-deep ring-4 ring-sterling-gold/20"
                            : "bg-slate-200 text-slate-400"
                        }`}
                      >
                        {stage.status === "completed" ? (
                          <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                        ) : (
                          idx + 1
                        )}
                      </div>
                      {idx < statusResult.stages.length - 1 && (
                        <div
                          className={`w-0.5 h-8 my-1 ${
                            stage.status === "completed" ? "bg-emerald-600" : "bg-slate-200"
                          }`}
                        />
                      )}
                    </div>

                    <div className="pt-1">
                      <div className="text-sm font-bold text-sterling-navy">
                        {stage.name}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        {stage.date}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Officer Remarks */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-xs text-slate-700 space-y-1">
              <div className="font-bold text-sterling-navy flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-sterling-gold" />
                Loan Officer Remarks
              </div>
              <p className="leading-relaxed text-slate-600">{statusResult.remarks}</p>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
