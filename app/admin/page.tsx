"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  getApplications, 
  saveApplications, 
  updateApplicationStatus, 
  LoanApplication 
} from "@/lib/loanStore";
import { formatMoney } from "@/lib/utils";
import { 
  Building2, 
  SlidersHorizontal, 
  ShieldCheck, 
  Users, 
  CreditCard, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Search, 
  Filter, 
  FileText, 
  TrendingUp, 
  Download, 
  ArrowRight, 
  Eye, 
  Edit3, 
  Plus, 
  Check, 
  AlertTriangle,
  RotateCcw,
  Percent,
  Banknote,
  Send,
  Lock
} from "lucide-react";

export default function AdminDashboard() {
  const [applications, setApplications] = useState<LoanApplication[]>([]);
  const [selectedApp, setSelectedApp] = useState<LoanApplication | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [newNote, setNewNote] = useState("");
  
  // Credit Policy Control State
  const [rates, setRates] = useState({
    persona: 2.85,
    auto: 3.10,
    ecosolutions: 2.50,
    home: 3.45,
    maxAmount: 75000,
    maxDTI: 35
  });
  const [policySaved, setPolicySaved] = useState(false);
  const [activeTab, setActiveTab] = useState<"applications" | "policy" | "analytics">("applications");

  const loadData = () => {
    const list = getApplications();
    setApplications(list);
    if (list.length > 0 && !selectedApp) {
      setSelectedApp(list[0]);
    }
  };

  useEffect(() => {
    loadData();

    // Check saved rates from localStorage
    try {
      const saved = localStorage.getItem("sterling_credit_policy");
      if (saved) setRates(JSON.parse(saved));
    } catch (e) {}

    const handleUpdate = () => loadData();
    window.addEventListener("sterling_applications_updated", handleUpdate);
    return () => window.removeEventListener("sterling_applications_updated", handleUpdate);
  }, []);

  const handleUpdateStatus = (
    id: string, 
    status: LoanApplication["status"], 
    label: string, 
    note?: string
  ) => {
    const updated = updateApplicationStatus(id, status, label, note);
    if (updated) {
      setSelectedApp(updated);
      loadData();
    }
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim() || !selectedApp) return;

    handleUpdateStatus(
      selectedApp.id, 
      selectedApp.status, 
      selectedApp.statusLabelFr, 
      `Underwriter Memo (${new Date().toLocaleDateString("en-US")} ${new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}) : ${newNote}`
    );
    setNewNote("");
  };

  const handleSavePolicy = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("sterling_credit_policy", JSON.stringify(rates));
    setPolicySaved(true);
    setTimeout(() => setPolicySaved(false), 2500);
  };

  const handleExportCSV = () => {
    const headers = "Reference,Name,Email,Phone,Product,Amount,Term,MonthlyPayment,APR,Status\n";
    const rows = applications.map(a => 
      `"${a.referenceNumber}","${a.applicantName}","${a.email}","${a.phone}","${a.loanTypeLabel}",${a.amount},${a.termMonths},${a.monthlyPayment},${a.interestRate},"${a.status}"`
    ).join("\n");

    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `sterling_applications_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered applications
  const filteredApps = applications.filter(app => {
    const matchesSearch = 
      app.applicantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.referenceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // KPI Calculations
  const totalVolume = applications.reduce((acc, a) => acc + a.amount, 0);
  const disbursedVolume = applications.filter(a => a.status === "disbursed").reduce((acc, a) => acc + a.amount, 0);
  const approvedCount = applications.filter(a => a.status === "approved" || a.status === "disbursed").length;
  const approvalRate = applications.length > 0 ? Math.round((approvedCount / applications.length) * 100) : 0;

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 font-sans text-slate-800">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Admin Header */}
        <div className="bg-gradient-to-r from-sterling-navy-deep via-sterling-navy to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Central Lending & Credit Administration Console
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display">
              Credit Underwriting & Facility Decisions
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Supervise financing applications in real time, configure base APR risk policies, and authorize fund disbursements.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleExportCSV}
              className="bg-white/10 hover:bg-white/20 text-white font-medium text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-white/20 transition-all flex items-center gap-2"
            >
              <Download className="w-4 h-4 text-sterling-gold" />
              Export to CSV
            </button>
            <Link
              href="/dashboard"
              className="bg-gradient-to-r from-sterling-gold via-sterling-gold-light to-sterling-gold text-sterling-navy-deep font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-md hover:scale-[1.02] transition-all flex items-center gap-2"
            >
              <Users className="w-4 h-4" />
              View Client Portal
            </Link>
          </div>
        </div>

        {/* Global KPI Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Total Requested Volume</span>
              <Banknote className="w-4 h-4 text-sterling-navy" />
            </div>
            <div className="text-2xl font-black text-sterling-navy">
              ${totalVolume.toLocaleString("en-US")}
            </div>
            <div className="text-[11px] text-slate-500">
              Across {applications.length} filed applications
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Disbursed Facilities</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-black text-emerald-600">
              ${disbursedVolume.toLocaleString("en-US")}
            </div>
            <div className="text-[11px] text-emerald-700 font-semibold">
              Bank wire transfers executed
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Approval Rate</span>
              <TrendingUp className="w-4 h-4 text-sterling-gold" />
            </div>
            <div className="text-2xl font-black text-sterling-navy">
              {approvalRate} %
            </div>
            <div className="text-[11px] text-slate-500">
              Underwriting risk benchmark
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Applications Pending Decision</span>
              <Clock className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-black text-amber-600">
              {applications.filter(a => a.status === "pending" || a.status === "under_review").length}
            </div>
            <div className="text-[11px] text-slate-500">
              Average decision response: 18 min
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 gap-6 text-sm font-semibold">
          <button
            onClick={() => setActiveTab("applications")}
            className={`pb-3 border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === "applications"
                ? "border-sterling-navy text-sterling-navy font-bold"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Users className="w-4 h-4 text-sterling-gold" />
            Applications Underwriting ({filteredApps.length})
          </button>

          <button
            onClick={() => setActiveTab("policy")}
            className={`pb-3 border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === "policy"
                ? "border-sterling-navy text-sterling-navy font-bold"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Percent className="w-4 h-4 text-sterling-gold" />
            Risk Policy & Base APR Settings
          </button>
        </div>

        {/* TAB 1: Applications Management */}
        {activeTab === "applications" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Table & List (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              
              {/* Filter and Search Bar */}
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by applicant name, email, or ref #..."
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl outline-none focus:border-sterling-navy"
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="text-xs px-3 py-2 border border-slate-200 rounded-xl outline-none bg-slate-50 text-slate-700 font-medium"
                >
                  <option value="all">All Statuses</option>
                  <option value="pending">Pending Review (Application Received)</option>
                  <option value="under_review">Underwriting Review Active</option>
                  <option value="approved">Approved (Facility Offer Issued)</option>
                  <option value="disbursed">Disbursed (Funds Transferred)</option>
                  <option value="rejected">Declined</option>
                </select>
              </div>

              {/* Applications List */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 divide-y divide-slate-100 overflow-hidden">
                {filteredApps.length === 0 ? (
                  <div className="p-8 text-center text-xs text-slate-400">
                    No applications match your search criteria.
                  </div>
                ) : (
                  filteredApps.map((app) => (
                    <div
                      key={app.id}
                      onClick={() => setSelectedApp(app)}
                      className={`p-4 cursor-pointer hover:bg-slate-50 transition-colors flex items-center justify-between ${
                        selectedApp?.id === app.id ? "bg-amber-50/50 border-l-4 border-sterling-gold" : ""
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-sterling-navy">{app.applicantName}</span>
                          <span className="text-[10px] font-mono text-slate-400">{app.referenceNumber}</span>
                        </div>
                        <div className="text-xs text-slate-600">
                          {app.loanTypeLabel} • <strong>{formatMoney(app.amount, app.currency || "USD")}</strong> over {app.termMonths} mos
                        </div>
                        <div className="text-[10px] text-slate-400">
                          Income: {formatMoney(app.monthlyIncome, app.currency || "USD")}/mo • Solvency Score: {app.creditScore}/900
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-1.5">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          app.status === "approved" || app.status === "disbursed"
                            ? "bg-emerald-100 text-emerald-700"
                            : app.status === "under_review"
                            ? "bg-amber-100 text-amber-700"
                            : app.status === "rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-blue-100 text-blue-700"
                        }`}>
                          {app.status.toUpperCase()}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {new Date(app.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>

            </div>

            {/* Application Detail & Full Control Actions (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              {selectedApp ? (
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-6">
                  
                  {/* Header */}
                  <div className="border-b border-slate-100 pb-4 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono text-sterling-gold font-bold">
                        {selectedApp.referenceNumber}
                      </span>
                      <span className="text-xs text-slate-400">
                        Submitted on {new Date(selectedApp.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </span>
                    </div>
                    <h3 className="text-xl font-extrabold text-sterling-navy">
                      {selectedApp.applicantName}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {selectedApp.email} • {selectedApp.phone}
                    </p>
                  </div>

                  {/* Financial & Underwriting Details */}
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-slate-50 rounded-xl space-y-0.5">
                      <div className="text-slate-400 text-[10px]">Requested Amount ({selectedApp.currency || "USD"})</div>
                      <div className="font-bold text-base text-sterling-navy">{formatMoney(selectedApp.amount, selectedApp.currency || "USD")}</div>
                      <div className="text-slate-500">{selectedApp.termMonths} mos at {formatMoney(selectedApp.monthlyPayment, selectedApp.currency || "USD")}/mo</div>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl space-y-0.5">
                      <div className="text-slate-400 text-[10px]">Financial Profile</div>
                      <div className="font-bold text-base text-emerald-700">{formatMoney(selectedApp.monthlyIncome, selectedApp.currency || "USD")}/mo</div>
                      <div className="text-slate-500">{selectedApp.employmentType}</div>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl space-y-0.5">
                      <div className="text-slate-400 text-[10px]">Fixed APR Rate</div>
                      <div className="font-bold text-base text-sterling-navy">{selectedApp.interestRate.toFixed(2)} %</div>
                      <div className="text-slate-500">Contractual rate</div>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl space-y-0.5">
                      <div className="text-slate-400 text-[10px]">Solvency Score</div>
                      <div className="font-bold text-base text-indigo-700">{selectedApp.creditScore} / 900</div>
                      <div className="text-slate-500">Low risk rating (Tier 1)</div>
                    </div>
                  </div>

                  {/* KYC Documents */}
                  <div className="space-y-2">
                    <div className="text-xs font-bold text-slate-700 flex items-center justify-between">
                      <span>Submitted Verification Documents ({selectedApp.documents.length})</span>
                      <span className="text-[10px] text-emerald-600 font-semibold">AES-256 Encrypted</span>
                    </div>

                    <div className="space-y-1.5">
                      {selectedApp.documents.map((doc, idx) => (
                        <div key={idx} className="p-2.5 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-sterling-gold" />
                            <span className="font-medium text-slate-800">{doc.name}</span>
                          </div>
                          <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded font-bold">
                            {doc.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* ACTION BUTTONS (Full Control) */}
                  <div className="space-y-3 pt-2 border-t border-slate-100">
                    <div className="text-xs font-bold text-sterling-navy uppercase tracking-wider">
                      Underwriting Decisions & Controls
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => handleUpdateStatus(
                          selectedApp.id, 
                          "approved", 
                          "Facility Approved - Offer Issued", 
                          "Favorable decision issued by credit committee. Facility documentation dispatched to applicant."
                        )}
                        className="py-2.5 px-3 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-700 text-white transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                      >
                        <Check className="w-4 h-4 stroke-[3]" />
                        Approve Facility
                      </button>

                      <button
                        onClick={() => handleUpdateStatus(
                          selectedApp.id, 
                          "disbursed", 
                          "Facility Disbursed via Bank Transfer", 
                          "Instant wire disbursement executed. Funds credited to borrower's nominated account."
                        )}
                        className="py-2.5 px-3 rounded-xl font-bold text-xs bg-sterling-navy hover:bg-sterling-navy-light text-white transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                      >
                        <Banknote className="w-4 h-4 text-sterling-gold" />
                        Disburse Funds
                      </button>

                      <button
                        onClick={() => handleUpdateStatus(
                          selectedApp.id, 
                          "under_review", 
                          "Additional Documentation Requested", 
                          "Request for supplementary KYC documents dispatched to applicant."
                        )}
                        className="py-2.5 px-3 rounded-xl font-medium text-xs bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Clock className="w-4 h-4" />
                        Request Documents
                      </button>

                      <button
                        onClick={() => handleUpdateStatus(
                          selectedApp.id, 
                          "rejected", 
                          "Application Declined", 
                          "Facility declined due to non-conformance with standard debt-to-income underwriting thresholds."
                        )}
                        className="py-2.5 px-3 rounded-xl font-medium text-xs bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 transition-colors flex items-center justify-center gap-1.5"
                      >
                        <XCircle className="w-4 h-4" />
                        Decline Application
                      </button>
                    </div>
                  </div>

                  {/* Officer Audit Notes */}
                  <div className="space-y-3 pt-2 border-t border-slate-100">
                    <div className="text-xs font-bold text-slate-700">
                      Audit Trail & Internal Underwriter Memos
                    </div>

                    <div className="space-y-2 max-h-36 overflow-y-auto">
                      {selectedApp.officerNotes.map((note, idx) => (
                        <div key={idx} className="p-2.5 bg-slate-50 rounded-lg text-xs text-slate-600 border border-slate-100">
                          {note}
                        </div>
                      ))}
                    </div>

                    <form onSubmit={handleAddNote} className="flex gap-2">
                      <input
                        type="text"
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        placeholder="Add an internal underwriter memo..."
                        className="flex-1 text-xs px-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-sterling-navy"
                      />
                      <button
                        type="submit"
                        className="px-3 py-2 bg-slate-800 hover:bg-sterling-navy text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1"
                      >
                        <Send className="w-3.5 h-3.5" />
                        Add Memo
                      </button>
                    </form>
                  </div>

                </div>
              ) : (
                <div className="bg-white rounded-2xl p-8 text-center text-slate-400 text-xs">
                  Select an application on the left to view underwriting controls.
                </div>
              )}
            </div>

          </div>
        )}

        {/* TAB 2: Credit Policy & Rates Controller (Full Control) */}
        {activeTab === "policy" && (
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 max-w-3xl mx-auto space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-xl font-bold text-sterling-navy flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-sterling-gold" />
                Risk Management & Contractual APR Settings
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Adjust interest rate benchmarks in real time for online calculators and scoring models.
              </p>
            </div>

            <form onSubmit={handleSavePolicy} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <label className="text-xs font-bold text-sterling-navy">
                    Fixed APR • Persona Personal Loan (%)
                  </label>
                  <input
                    type="number"
                    step="0.05"
                    value={rates.persona}
                    onChange={(e) => setRates({ ...rates, persona: parseFloat(e.target.value) || 0 })}
                    className="w-full p-2.5 text-base font-bold text-sterling-navy border border-slate-200 rounded-lg bg-white"
                  />
                  <div className="text-[10px] text-slate-400">Standard rate for multi-purpose personal credit</div>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <label className="text-xs font-bold text-sterling-navy">
                    Fixed APR • Auto & Vehicle Loan (%)
                  </label>
                  <input
                    type="number"
                    step="0.05"
                    value={rates.auto}
                    onChange={(e) => setRates({ ...rates, auto: parseFloat(e.target.value) || 0 })}
                    className="w-full p-2.5 text-base font-bold text-sterling-navy border border-slate-200 rounded-lg bg-white"
                  />
                  <div className="text-[10px] text-slate-400">Brand new and certified pre-owned vehicles</div>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <label className="text-xs font-bold text-sterling-navy">
                    Fixed APR • EcoSolutions Clean Energy (%)
                  </label>
                  <input
                    type="number"
                    step="0.05"
                    value={rates.ecosolutions}
                    onChange={(e) => setRates({ ...rates, ecosolutions: parseFloat(e.target.value) || 0 })}
                    className="w-full p-2.5 text-base font-bold text-emerald-700 border border-slate-200 rounded-lg bg-white"
                  />
                  <div className="text-[10px] text-slate-400">Green incentive rate for renewable energy projects</div>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <label className="text-xs font-bold text-sterling-navy">
                    Fixed APR • Home & Renovation Loan (%)
                  </label>
                  <input
                    type="number"
                    step="0.05"
                    value={rates.home}
                    onChange={(e) => setRates({ ...rates, home: parseFloat(e.target.value) || 0 })}
                    className="w-full p-2.5 text-base font-bold text-sterling-navy border border-slate-200 rounded-lg bg-white"
                  />
                  <div className="text-[10px] text-slate-400">Residential upgrades and property improvements</div>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <label className="text-xs font-bold text-sterling-navy">
                    Maximum Personal Loan Facility ($ / €)
                  </label>
                  <input
                    type="number"
                    step="5000"
                    value={rates.maxAmount}
                    onChange={(e) => setRates({ ...rates, maxAmount: parseInt(e.target.value) || 75000 })}
                    className="w-full p-2.5 text-base font-bold text-sterling-navy border border-slate-200 rounded-lg bg-white"
                  />
                  <div className="text-[10px] text-slate-400">Standard retail personal loan ceiling</div>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <label className="text-xs font-bold text-sterling-navy">
                    Maximum Debt-to-Income Ratio (DTI %)
                  </label>
                  <input
                    type="number"
                    value={rates.maxDTI}
                    onChange={(e) => setRates({ ...rates, maxDTI: parseInt(e.target.value) || 35 })}
                    className="w-full p-2.5 text-base font-bold text-sterling-navy border border-slate-200 rounded-lg bg-white"
                  />
                  <div className="text-[10px] text-slate-400">Prudential regulatory guideline: max 35%</div>
                </div>

              </div>

              {policySaved && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Credit risk policy successfully updated and applied across calculators!
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="bg-sterling-navy hover:bg-sterling-navy-light text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition-colors shadow-md flex items-center gap-2"
                >
                  <Check className="w-4 h-4 text-sterling-gold" />
                  Save Policy Settings
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const defaults = { persona: 2.85, auto: 3.10, ecosolutions: 2.50, home: 3.45, maxAmount: 75000, maxDTI: 35 };
                    setRates(defaults);
                    localStorage.setItem("sterling_credit_policy", JSON.stringify(defaults));
                  }}
                  className="px-4 py-3 border border-slate-200 rounded-xl text-xs text-slate-600 hover:bg-slate-50 flex items-center gap-2"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset to Defaults
                </button>
              </div>
            </form>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
