"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Search, 
  CheckCircle2, 
  Clock, 
  FileCheck, 
  ShieldCheck, 
  Building2, 
  AlertCircle,
  ExternalLink,
  Lock,
  ArrowRight
} from "lucide-react";
import { getApplications } from "@/lib/loanStore";

export default function TrackerSection() {
  const [refInput, setRefInput] = useState("");
  const [last4Input, setLast4Input] = useState("");
  const [searched, setSearched] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);

    const cleanRef = refInput.trim().toUpperCase();
    const cleanLast4 = last4Input.trim();
    const applications = getApplications();

    // Check store applications first
    const found = applications.find(
      (app) => 
        (cleanRef && (app.referenceNumber.toUpperCase() === cleanRef || app.referenceNumber.toUpperCase().endsWith(cleanRef))) ||
        (cleanLast4 && app.phone.endsWith(cleanLast4))
    );

    if (found) {
      const isApproved = found.status === "approved" || found.status === "disbursed";
      const isDisbursed = found.status === "disbursed";

      setResult({
        ref: found.referenceNumber,
        applicant: found.applicantName,
        amount: found.amount,
        currency: found.currency || "USD",
        loanType: found.loanTypeLabel || "Personal Loan Facility",
        submissionDate: new Date(found.createdAt).toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
        status: found.status,
        steps: [
          { name: "Online Application Received", date: "Completed", status: "completed" },
          { name: "Document & Identity Verification", date: "Verified", status: "completed" },
          { name: "Underwriting & Credit Committee Review", date: isApproved ? "Approved" : "In Progress", status: isApproved ? "completed" : "current" },
          { name: "Digital Contract Execution", date: isApproved ? "Ready for Signature" : "Pending", status: isApproved ? "current" : "pending" },
          { name: "Fund Disbursement to Account", date: isDisbursed ? "Disbursed" : "Pending", status: isDisbursed ? "completed" : "pending" },
        ],
        remarks: found.officerNotes[0] || "Your application is currently being handled by our international lending division.",
      });
    } else if (cleanRef === "LCG-2026-9842" || cleanRef === "9842" || cleanRef.includes("SBA")) {
      // Demo verified file
      setResult({
        ref: "LCG-2026-9842",
        applicant: "Marcus Vance",
        amount: 25000,
        currency: "USD",
        loanType: "Persona Personal Loan",
        submissionDate: "Nov 03, 2026",
        status: "approved",
        steps: [
          { name: "Online Application Received", date: "Nov 03, 2026 • 10:15", status: "completed" },
          { name: "Document & Identity Verification", date: "Nov 03, 2026 • 14:30", status: "completed" },
          { name: "Underwriting & Credit Committee Review", date: "Approved with Fixed 2.85%", status: "completed" },
          { name: "Digital Contract Execution", date: "Awaiting e-Signature", status: "current" },
          { name: "Fund Disbursement to Account", date: "Within 24-48h of signing", status: "pending" },
        ],
        remarks: "Debt ratio verified at 28.5%. Your formal credit agreement is ready to review in your client portal.",
      });
    } else {
      setResult(null);
    }
  };

  return (
    <section id="tracker" className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-sterling-gold uppercase tracking-wider bg-amber-50 border border-amber-200 px-3.5 py-1 rounded-full">
            <Search className="w-3.5 h-3.5" />
            Application Status Tracker
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-sterling-navy font-display tracking-tight">
            Track Your Loan Application
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Enter your application reference number (received via email or SMS) to check the real-time review, committee decision, and disbursement status.
          </p>
        </div>

        {/* Search Input Box */}
        <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/80">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                  Application Reference Number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="e.g. LCG-2026-9842"
                    value={refInput}
                    onChange={(e) => setRefInput(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-sterling-gold focus:ring-2 focus:ring-sterling-gold/20 text-xs font-mono uppercase font-bold text-slate-800 outline-none transition-all"
                  />
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                  Applicant Phone (Last 4 Digits)
                </label>
                <input
                  type="text"
                  maxLength={4}
                  placeholder="e.g. 5678"
                  value={last4Input}
                  onChange={(e) => setLast4Input(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-sterling-gold focus:ring-2 focus:ring-sterling-gold/20 text-xs font-mono font-bold text-slate-800 outline-none transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-sterling-navy-deep to-sterling-navy hover:from-sterling-navy hover:to-sterling-navy-deep text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4 text-sterling-gold" />
              <span>Search Application Status</span>
            </button>
          </form>

          {/* Quick Demo Hint */}
          <div className="mt-3 text-center">
            <button
              type="button"
              onClick={() => {
                setRefInput("LCG-2026-9842");
                setLast4Input("5678");
              }}
              className="text-[11px] text-sterling-gold hover:underline font-semibold"
            >
              Demo query: load verified file (LCG-2026-9842)
            </button>
          </div>
        </div>

        {/* Results Card */}
        {searched && (
          <div className="max-w-3xl mx-auto mt-8">
            {result ? (
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 space-y-6 animate-in fade-in slide-in-from-top-4 duration-300">
                {/* Result header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Application Reference</span>
                    <h3 className="text-xl font-black font-mono text-sterling-navy">{result.ref}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Applicant: <strong>{result.applicant}</strong> • {result.loanType}
                    </p>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Requested Capital</span>
                    <div className="text-xl font-black text-sterling-gold font-mono">
                      {result.currency === "EUR" ? "€" : "$"}{result.amount.toLocaleString()}
                    </div>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Decision in Principle Approved
                    </span>
                  </div>
                </div>

                {/* Progress Steps Timeline */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Application Progress</h4>
                  <div className="space-y-3">
                    {result.steps.map((st: any, i: number) => (
                      <div key={i} className="flex items-center justify-between text-xs p-3 rounded-xl bg-slate-50 border border-slate-100">
                        <div className="flex items-center gap-3">
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                            st.status === "completed"
                              ? "bg-emerald-100 text-emerald-600"
                              : st.status === "current"
                              ? "bg-sterling-gold/20 text-sterling-gold animate-pulse"
                              : "bg-slate-200 text-slate-400"
                          }`}>
                            {st.status === "completed" ? (
                              <CheckCircle2 className="w-4 h-4" />
                            ) : (
                              <Clock className="w-4 h-4" />
                            )}
                          </div>
                          <div>
                            <div className="font-bold text-slate-800">{st.name}</div>
                            <div className="text-[10px] text-slate-400">{st.date}</div>
                          </div>
                        </div>

                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          st.status === "completed"
                            ? "bg-emerald-50 text-emerald-700"
                            : st.status === "current"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-slate-100 text-slate-500"
                        }`}>
                          {st.status === "completed" ? "Completed" : st.status === "current" ? "Action Required" : "Pending"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Loan Officer Remark */}
                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-1">
                  <div className="text-[11px] font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-sterling-gold" />
                    Financing Officer Notes
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed italic">
                    &ldquo;{result.remarks}&rdquo;
                  </p>
                </div>

                {/* Portal link button */}
                <div className="pt-2">
                  <Link
                    href="/dashboard"
                    className="w-full py-3 px-4 rounded-xl bg-sterling-navy hover:bg-sterling-navy-deep text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow"
                  >
                    <span>Open Dedicated Client Portal</span>
                    <ArrowRight className="w-4 h-4 text-sterling-gold" />
                  </Link>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-8 text-center border border-slate-200 shadow-sm space-y-3">
                <AlertCircle className="w-10 h-10 text-rose-500 mx-auto" />
                <h3 className="font-bold text-slate-800">No application found with this reference</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Please verify your reference number (found in your confirmation email or SMS) or contact your lending officer via WhatsApp.
                </p>
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
}
