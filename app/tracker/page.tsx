"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getApplications } from "@/lib/loanStore";
import { formatMoney } from "@/lib/utils";
import { 
  Search, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  ArrowRight,
  UserCheck, 
  FileCheck2, 
  Calendar, 
  CreditCard, 
  Building2, 
  ChevronRight, 
  AlertCircle 
} from "lucide-react";

export default function TrackerPage() {
  const [refNumber, setRefNumber] = useState("");
  const [phoneDigits, setPhoneDigits] = useState("");
  const [statusResult, setStatusResult] = useState<any>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);

    const apps = getApplications();
    const query = refNumber.trim().toLowerCase();
    const found = apps.find(a => 
      (query && a.referenceNumber.toLowerCase().includes(query)) || 
      (phoneDigits && a.phone.endsWith(phoneDigits))
    );

    if (found) {
      const isApproved = found.status === "approved" || found.status === "disbursed";
      const isDisbursed = found.status === "disbursed";
      setStatusResult({
        ref: found.referenceNumber,
        applicant: found.applicantName,
        loanType: found.loanTypeLabel,
        amount: formatMoney(found.assignedAmount || found.amount, found.currency || "USD"),
        submissionDate: new Date(found.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        statusLabel: isDisbursed ? "Disbursed - Funds Released" : isApproved ? "Approved - Facility Offer Ready" : "In Review - Underwriting Active",
        assignedOfficer: found.assignedOfficer,
        assignedOfficerPhone: found.assignedOfficerPhone,
        stages: [
          { name: "Application Submitted Online", date: "Completed", status: "completed" },
          { name: "Document & Identity Verification", date: "Verified", status: "completed" },
          { name: "Credit Underwriting & Risk Assessment", date: isApproved ? "Approved by Committee" : "In Progress", status: isApproved ? "completed" : "active" },
          { name: "Facility Agreement & e-Signature", date: isApproved ? "Ready for Signature" : "Pending Underwriting", status: isApproved ? (isDisbursed ? "completed" : "active") : "pending" },
          { name: "Disbursement to Bank Account", date: isDisbursed ? "Transferred" : "Pending Signature", status: isDisbursed ? "completed" : "pending" },
        ],
        remarks: found.officerNotes[0] || "Your financing file is currently under review with our dedicated credit department.",
      });
    } else {
      // Mock tracking fallback
      setStatusResult({
        ref: refNumber || "SBA-2026-89412",
        applicant: "David Harrison",
        loanType: "Persona Personal Loan",
        amount: "$25,000",
        submissionDate: "November 3, 2026",
        statusLabel: "Approved - Facility Offer Ready",
        stages: [
          { name: "Application Submitted Online", date: "Nov 03, 2026 • 10:15 AM", status: "completed" },
          { name: "Document & Identity Verification", date: "Nov 03, 2026 • 02:30 PM", status: "completed" },
          { name: "Credit Underwriting & Risk Assessment", date: "Credit Committee Approval", status: "completed" },
          { name: "Facility Agreement & e-Signature", date: "Pending Electronic Signature", status: "active" },
          { name: "Disbursement to Bank Account", date: "Within 24-48 hrs of signature", status: "pending" },
        ],
        remarks: "Debt-to-income verified at 28.5%. Your formal facility documentation is accessible in your Client Portal.",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-800">
      <Navbar />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full space-y-8">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-sterling-navy transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-semibold text-sterling-navy">Application Status Tracker</span>
        </div>

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-sterling-gold uppercase tracking-wider bg-amber-50 border border-amber-200 px-3.5 py-1 rounded-full">
            <Search className="w-3.5 h-3.5" />
            Official Application Tracking Portal
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-sterling-navy font-display tracking-tight">
            Track Your Loan Application in Real-Time
          </h1>
          <p className="text-sm text-slate-600">
            Enter your application reference number (e.g. <code>SBA-2026-89412</code>) or the last 4 digits of your phone number to check current processing progress.
          </p>
        </div>

        {/* Search Form Card */}
        <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200">
          <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
            <div className="sm:col-span-7">
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Application Reference Number
              </label>
              <input
                type="text"
                placeholder="e.g. SBA-2026-89412"
                value={refNumber}
                onChange={(e) => setRefNumber(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-mono font-medium focus:ring-2 focus:ring-sterling-gold focus:border-sterling-gold outline-none"
              />
            </div>

            <div className="sm:col-span-3">
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Phone (Last 4 Digits)
              </label>
              <input
                type="text"
                maxLength={4}
                placeholder="8930"
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

        {/* Tracking Output */}
        {searched && statusResult && (
          <div className="max-w-3xl mx-auto bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-sterling-gold/40 animate-in fade-in duration-300 space-y-8">
            
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Application Reference</span>
                <div className="text-xl font-mono font-black text-sterling-navy">{statusResult.ref}</div>
                <div className="text-xs text-slate-600 mt-0.5">
                  Applicant: <span className="font-semibold">{statusResult.applicant}</span> • {statusResult.loanType} ({statusResult.amount})
                </div>
                {statusResult.assignedOfficer && (
                  <div className="text-[11px] text-indigo-700 font-semibold mt-1 flex items-center gap-1">
                    <UserCheck className="w-3.5 h-3.5" /> Assigned Lending Officer: {statusResult.assignedOfficer}
                  </div>
                )}
              </div>
              <div className="sm:text-right">
                <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-800 border border-amber-200 px-3 py-1 rounded-full text-xs font-bold">
                  <Clock className="w-3.5 h-3.5 text-amber-600 animate-spin" />
                  {statusResult.statusLabel.split(" - ")[0]}
                </span>
                <div className="text-[11px] text-slate-400 mt-1">Submitted on {statusResult.submissionDate}</div>
              </div>
            </div>

            {/* Pipeline Stages */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Facility Underwriting Pipeline
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
                          <CheckCircle2 className="w-4 h-4" />
                        ) : (
                          idx + 1
                        )}
                      </div>
                      {idx < statusResult.stages.length - 1 && (
                        <div
                          className={`w-0.5 h-10 my-1 ${
                            stage.status === "completed" ? "bg-emerald-600" : "bg-slate-200"
                          }`}
                        />
                      )}
                    </div>

                    <div className="flex-1 pt-1">
                      <div
                        className={`text-sm font-bold ${
                          stage.status === "completed"
                            ? "text-slate-800"
                            : stage.status === "active"
                            ? "text-sterling-navy"
                            : "text-slate-400"
                        }`}
                      >
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

            {/* Officer Remarks & Dashboard CTA */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-xs text-slate-700 space-y-3">
              <div className="space-y-1">
                <div className="font-bold text-sterling-navy flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-sterling-gold" />
                  Credit Underwriter Status Memo
                </div>
                <p className="leading-relaxed text-slate-600">{statusResult.remarks}</p>
              </div>

              <div className="pt-2 border-t border-slate-200/60 flex flex-col sm:flex-row gap-2">
                <Link
                  href="/dashboard"
                  className="bg-sterling-navy hover:bg-sterling-navy-light text-white font-bold py-2.5 px-5 rounded-xl text-xs transition-colors inline-flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <UserCheck className="w-3.5 h-3.5 text-sterling-gold" />
                  Open in Client Portal
                </Link>
                <Link
                  href="/personal-loans"
                  className="bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 font-medium py-2.5 px-4 rounded-xl text-xs transition-colors inline-flex items-center justify-center gap-1.5"
                >
                  Submit Another Application
                </Link>
              </div>
            </div>

          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
