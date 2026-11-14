"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuickApplyModal from "@/components/QuickApplyModal";
import { 
  getApplications, 
  LoanApplication,
  getWithdrawalRequests,
  submitWithdrawalRequest,
  WithdrawalRequest
} from "@/lib/loanStore";
import { formatMoney } from "@/lib/utils";
import { 
  Building2, 
  UserCheck, 
  CreditCard, 
  FileText, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  UploadCloud, 
  Download, 
  ArrowUpRight, 
  ArrowDownRight,
  Plus, 
  ShieldCheck, 
  PhoneCall, 
  MessageSquare, 
  Send, 
  ChevronRight,
  TrendingDown,
  RefreshCw,
  Eye,
  Check,
  Banknote,
  DollarSign,
  Landmark,
  Wallet,
  ShieldAlert,
  Sparkles,
  Printer
} from "lucide-react";

export default function UserDashboard() {
  const [applications, setApplications] = useState<LoanApplication[]>([]);
  const [selectedApp, setSelectedApp] = useState<LoanApplication | null>(null);
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [withdrawals, setWithdrawals] = useState<WithdrawalRequest[]>([]);
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState<number>(1000);
  const [withdrawMethod, setWithdrawMethod] = useState("Direct Wire Transfer (SWIFT / Fedwire)");
  const [beneficiaryName, setBeneficiaryName] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumberOrIban, setAccountNumberOrIban] = useState("");
  const [routingOrSwift, setRoutingOrSwift] = useState("");
  const [transferNotes, setTransferNotes] = useState("");
  const [withdrawFeedback, setWithdrawFeedback] = useState<string | null>(null);
  const [statementModalOpen, setStatementModalOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ sender: "user" | "advisor"; text: string; time: string }[]>([
    {
      sender: "advisor",
      text: "Hello! I am Emily Vance, your dedicated lending specialist at Loan Commercial Group. Your facility application LCG-2026-89412 has been pre-approved with favorable terms. Please reach out if you have any questions regarding your facility agreement.",
      time: "10:15 AM"
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [repayModalOpen, setRepayModalOpen] = useState(false);

  const loadData = () => {
    const list = getApplications();
    setApplications(list);
    if (list.length > 0 && !selectedApp) {
      setSelectedApp(list[0]);
    } else if (selectedApp) {
      const refreshed = list.find(a => a.id === selectedApp.id);
      if (refreshed) setSelectedApp(refreshed);
    }
    const wths = getWithdrawalRequests();
    setWithdrawals(wths);
  };

  useEffect(() => {
    loadData();

    const handleUpdate = () => loadData();

    window.addEventListener("lcg_applications_updated", handleUpdate);
    window.addEventListener("lcg_withdrawals_updated", handleUpdate);
    return () => {
      window.removeEventListener("lcg_applications_updated", handleUpdate);
      window.removeEventListener("lcg_withdrawals_updated", handleUpdate);
    };
  }, []);

  const handleRequestWithdrawal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeApp) return;

    if (withdrawAmount <= 0) {
      alert("Please enter a valid withdrawal amount greater than zero.");
      return;
    }

    if (withdrawAmount > availableToWithdraw) {
      alert(`Withdrawal amount exceeds your current available balance of ${formatMoney(availableToWithdraw, activeApp.currency || "USD")}.`);
      return;
    }

    const created = submitWithdrawalRequest({
      applicationId: activeApp.id,
      referenceNumber: activeApp.referenceNumber,
      applicantName: activeApp.applicantName,
      email: activeApp.email,
      amount: Number(withdrawAmount),
      currency: activeApp.currency || "USD",
      method: withdrawMethod,
      beneficiaryName: beneficiaryName || activeApp.applicantName,
      bankName: bankName || "Designated Beneficiary Bank",
      accountNumberOrIban: accountNumberOrIban || "US89CHAS12345678901234",
      routingOrSwift: routingOrSwift || "CHASUS33XXX",
      notes: transferNotes || "Client online portal transfer request"
    });

    loadData();
    setWithdrawModalOpen(false);
    setWithdrawFeedback(`Withdrawal request #${created.id} for ${formatMoney(created.amount, created.currency)} submitted successfully! Status: Pending Administrator Approval.`);
    setTimeout(() => setWithdrawFeedback(null), 6000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMsg = {
      sender: "user" as const,
      text: inputMessage,
      time: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
    };

    setChatMessages(prev => [...prev, newMsg]);
    setInputMessage("");

    // Simulate advisor response
    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        {
          sender: "advisor",
          text: "Message received! Your inquiry is being reviewed by our underwriting desk. We will confirm your requested disbursement details within 24 business hours.",
          time: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
        }
      ]);
    }, 1200);
  };

  const handleSimulateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const name = e.target.files[0].name;
      setUploadedFiles(prev => [name, ...prev]);
    }
  };

  const activeApp = selectedApp || applications[0];

  const clientAccountBalance = activeApp?.accountBalance !== undefined 
    ? activeApp.accountBalance 
    : (activeApp?.amount || 10000);

  const clientWithdrawals = withdrawals.filter(w => 
    (activeApp && w.applicationId === activeApp.id) || 
    (activeApp && w.referenceNumber === activeApp.referenceNumber) ||
    (activeApp && w.email === activeApp.email)
  );

  const pendingWithdrawalHold = clientWithdrawals
    .filter(w => w.status === "pending")
    .reduce((sum, w) => sum + w.amount, 0);

  const availableToWithdraw = Math.max(0, clientAccountBalance - pendingWithdrawalHold);

  const getStatusStep = (status: LoanApplication["status"]) => {
    switch (status) {
      case "pending": return 1;
      case "under_review": return 2;
      case "approved": return 3;
      case "disbursed": return 4;
      case "rejected": return 0;
      default: return 1;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 font-sans text-slate-800">
      <Navbar onOpenApply={() => setApplyModalOpen(true)} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-sterling-navy-deep via-sterling-navy to-slate-800 text-white rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sterling-gold/20 text-sterling-gold text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              Certified Client Portal • 256-Bit SSL Security
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display">
              Welcome back, {activeApp ? activeApp.applicantName : "David Harrison"}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Manage your active facilities, upload verification documents, and monitor scheduled payments in real time.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                setWithdrawAmount(Math.min(1000, availableToWithdraw));
                setBeneficiaryName(activeApp?.applicantName || "");
                setWithdrawModalOpen(true);
              }}
              className="bg-gradient-to-r from-sterling-gold via-sterling-gold-light to-sterling-gold text-sterling-navy-deep font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-md hover:scale-[1.02] transition-all flex items-center gap-2"
            >
              <ArrowDownRight className="w-4 h-4 stroke-[3]" />
              Request Withdrawal
            </button>
            <button
              onClick={() => setApplyModalOpen(true)}
              className="bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-white/20 transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              New Application
            </button>
          </div>
        </div>

        {/* Withdrawal Notification Feedback */}
        {withdrawFeedback && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center justify-between shadow-sm animate-fade-in">
            <div className="flex items-center gap-3 font-semibold">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{withdrawFeedback}</span>
            </div>
            <button
              onClick={() => setWithdrawFeedback(null)}
              className="text-emerald-700 hover:text-emerald-900 font-bold px-2 py-1"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Client Available Account Balance & Treasury Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Available Client Account Balance
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  Verified Liquidity Account
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                  {activeApp?.accountType || "Private Checking & Loan Facility Account"}
                </span>
              </div>

              <div className="flex items-baseline gap-3">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-sterling-navy font-display tracking-tight">
                  {formatMoney(clientAccountBalance, activeApp?.currency || "USD")}
                </span>
                <span className="text-sm font-bold text-slate-400">
                  {activeApp?.currency || "USD"}
                </span>
              </div>

              <div className="text-xs text-slate-500 flex flex-wrap items-center gap-x-4 gap-y-1">
                <span>Account Number: <strong className="font-mono text-slate-800">{activeApp?.accountNumber || `LCG-ACC-${activeApp?.referenceNumber.replace(/[^0-9]/g, '')}-USD`}</strong></span>
                <span>•</span>
                <span>Bank Clearing BIC: <strong className="font-mono text-slate-800">LCGBUS33XXX</strong></span>
                <span>•</span>
                <span>Institution: <strong>Loan Commercial Group Private Bank</strong></span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  setWithdrawAmount(Math.min(1000, availableToWithdraw));
                  setBeneficiaryName(activeApp?.applicantName || "");
                  setWithdrawModalOpen(true);
                }}
                className="px-5 py-3 rounded-xl bg-sterling-navy text-white hover:bg-sterling-navy-deep font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md hover:scale-[1.02] transition-all"
              >
                <ArrowDownRight className="w-4 h-4 text-sterling-gold" />
                <span>Request Withdrawal</span>
              </button>
              <button
                onClick={() => setStatementModalOpen(true)}
                className="px-4 py-3 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-xs transition-colors flex items-center gap-1.5"
              >
                <FileText className="w-4 h-4 text-slate-400" />
                <span>Official Statement</span>
              </button>
            </div>
          </div>

          {/* Sub-account metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                Net Available to Withdraw
              </span>
              <span className="text-xl font-black text-emerald-600">
                {formatMoney(availableToWithdraw, activeApp?.currency || "USD")}
              </span>
              <p className="text-[10px] text-slate-400 mt-0.5">Cleared capital ready for outward wire</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                Pending Treasury Clearance Hold
              </span>
              <span className="text-xl font-black text-amber-600">
                {formatMoney(pendingWithdrawalHold, activeApp?.currency || "USD")}
              </span>
              <p className="text-[10px] text-slate-400 mt-0.5">Under Administrator clearance</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                Total Withdrawals Processed
              </span>
              <span className="text-xl font-black text-sterling-navy">
                {formatMoney(
                  clientWithdrawals
                    .filter(w => w.status === "approved")
                    .reduce((sum, w) => sum + w.amount, 0),
                  activeApp?.currency || "USD"
                )}
              </span>
              <p className="text-[10px] text-slate-400 mt-0.5">Dispatched to external recipient banks</p>
            </div>
          </div>
        </div>

        {/* Financial KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Remaining Principal Balance</span>
              <CreditCard className="w-4 h-4 text-sterling-gold" />
            </div>
            <div className="text-2xl font-black text-sterling-navy">
              {formatMoney(activeApp ? activeApp.amount * 0.76 : 11400, activeApp?.currency || "USD")}
            </div>
            <div className="text-[11px] text-slate-500 flex items-center gap-1">
              <span>Original Facility: {formatMoney(activeApp?.amount || 15000, activeApp?.currency || "USD")}</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Next Scheduled Payment</span>
              <Calendar className="w-4 h-4 text-sterling-navy" />
            </div>
            <div className="text-2xl font-black text-emerald-600">
              {formatMoney(activeApp?.monthlyPayment || 435, activeApp?.currency || "USD")}
            </div>
            <div className="text-[11px] text-slate-500 flex items-center gap-1">
              <span>Scheduled Debit: <strong>Dec 05, 2026</strong></span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Fixed APR Rate</span>
              <TrendingDown className="w-4 h-4 text-sterling-gold" />
            </div>
            <div className="text-2xl font-black text-sterling-navy">
              {activeApp?.interestRate.toFixed(2)} %
            </div>
            <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
              <Check className="w-3 h-3" /> Fixed contractual rate
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Remaining Term</span>
              <Clock className="w-4 h-4 text-indigo-500" />
            </div>
            <div className="text-2xl font-black text-sterling-navy">
              {Math.max(1, (activeApp?.termMonths || 36) - 8)} mos
            </div>
            <div className="text-[11px] text-slate-500">
              Out of {activeApp?.termMonths || 36} contractual installments
            </div>
          </div>
        </div>

        {/* Main Content Grid: Loan Tracker & Action Center */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Applications and Details (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Application Selector Tabs */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-lg font-bold text-sterling-navy">My Financing Facilities</h2>
                  <p className="text-xs text-slate-500">Click any facility below to review its live pipeline status and documents.</p>
                </div>
                <button
                  onClick={loadData}
                  className="inline-flex items-center gap-1.5 text-xs text-sterling-navy hover:text-sterling-gold font-semibold transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Refresh
                </button>
              </div>

              {/* Application Cards List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {applications.map((app) => (
                  <button
                    key={app.id}
                    onClick={() => setSelectedApp(app)}
                    className={`text-left p-4 rounded-xl border transition-all ${
                      selectedApp?.id === app.id
                        ? "border-sterling-gold bg-amber-50/40 shadow-sm"
                        : "border-slate-200 hover:border-slate-300 bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-bold text-sterling-navy">
                        {app.referenceNumber}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        app.status === "approved" || app.status === "disbursed"
                          ? "bg-emerald-100 text-emerald-700"
                          : app.status === "under_review"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-blue-100 text-blue-700"
                      }`}>
                        {app.status === "approved" ? "Approved" : app.status === "disbursed" ? "Disbursed" : app.status === "under_review" ? "Underwriting" : "Pending"}
                      </span>
                    </div>

                    <div className="text-sm font-bold text-slate-800 mt-2">
                      {app.loanTypeLabel}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {formatMoney(app.amount, app.currency || "USD")} • {app.termMonths} mos at {formatMoney(app.monthlyPayment, app.currency || "USD")}/mo
                    </div>
                  </button>
                ))}
              </div>

              {/* Active Application Live Pipeline */}
              {activeApp && (
                <div className="pt-4 space-y-6">
                  <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold uppercase tracking-wider text-sterling-gold">
                          Selected Facility: {activeApp.referenceNumber}
                        </div>
                        <div className="text-base font-extrabold text-sterling-navy">
                          {activeApp.status === "approved" ? "Facility Approved - Awaiting Signature" : activeApp.status === "disbursed" ? "Facility Disbursed - Active Repayment" : activeApp.status === "under_review" ? "Underwriting Risk Assessment Active" : "Application Received - Initial Review"}
                        </div>
                      </div>
                      <span className="text-xs text-slate-400">
                        Updated on {new Date(activeApp.lastUpdated).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </span>
                    </div>

                    {/* Progress Steps */}
                    <div className="grid grid-cols-4 gap-2 pt-2">
                      {[
                        { label: "1. Submitted", desc: "File received" },
                        { label: "2. Underwriting", desc: "Document check" },
                        { label: "3. Approved", desc: "Facility offer" },
                        { label: "4. Disbursed", desc: "Funds released" },
                      ].map((step, idx) => {
                        const currentStepNum = getStatusStep(activeApp.status);
                        const isDone = idx + 1 <= currentStepNum;
                        const isCurrent = idx + 1 === currentStepNum;

                        return (
                          <div key={idx} className="space-y-1.5">
                            <div className={`h-2 rounded-full transition-all ${
                              isDone ? "bg-emerald-500" : "bg-slate-200"
                            }`} />
                            <div className={`text-xs font-bold ${
                              isCurrent ? "text-sterling-navy" : isDone ? "text-emerald-700" : "text-slate-400"
                            }`}>
                              {step.label}
                            </div>
                            <div className="text-[10px] text-slate-500 hidden sm:block">
                              {step.desc}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Officer Notes if any */}
                    {activeApp.officerNotes.length > 0 && (
                      <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs space-y-1">
                        <div className="font-bold text-slate-700 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                          Note from your Credit Underwriter:
                        </div>
                        <div className="text-slate-600 italic">
                          &ldquo;{activeApp.officerNotes[0]}&rdquo;
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

            </div>

            {/* Document Vault & Upload Dropzone */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-sterling-navy flex items-center gap-2">
                    <FileText className="w-5 h-5 text-sterling-gold" />
                    Secure Digital Vault & KYC Documents
                  </h3>
                  <p className="text-xs text-slate-500">
                    AES-256 encrypted documents stored in compliance with international banking standards.
                  </p>
                </div>
                <label className="cursor-pointer bg-slate-800 hover:bg-sterling-navy text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-colors flex items-center gap-1.5 shadow-sm">
                  <UploadCloud className="w-4 h-4 text-sterling-gold" />
                  <span>Upload Document</span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleSimulateUpload}
                    accept=".pdf,.png,.jpg,.jpeg"
                  />
                </label>
              </div>

              {/* Uploaded Documents List */}
              <div className="divide-y divide-slate-100">
                {activeApp?.documents.map((doc, i) => (
                  <div key={i} className="py-3 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 font-bold">
                        PDF
                      </div>
                      <div>
                        <div className="font-semibold text-slate-800">{doc.name}</div>
                        <div className="text-[10px] text-slate-400">{doc.type} • Uploaded on {doc.uploadedAt}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        doc.status === "verified"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                      }`}>
                        {doc.status === "verified" ? "Verified by Bank" : "Under Review"}
                      </span>
                      <button className="text-slate-400 hover:text-sterling-navy transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}

                {uploadedFiles.map((fname, i) => (
                  <div key={`new-${i}`} className="py-3 flex items-center justify-between text-xs bg-emerald-50/50 px-2 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                        NEW
                      </div>
                      <div>
                        <div className="font-semibold text-emerald-900">{fname}</div>
                        <div className="text-[10px] text-emerald-600">Uploaded just now • Secure transmission</div>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-200 text-emerald-800">
                      Received
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Account Withdrawals & Treasury Clearance Logs */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-base font-bold text-sterling-navy flex items-center gap-2">
                    <Banknote className="w-4 h-4 text-sterling-gold" />
                    Account Withdrawals & Outward Wire Transfers
                  </h3>
                  <p className="text-xs text-slate-500">
                    Track withdrawal clearance requests submitted to Administrator and Treasury.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setWithdrawAmount(Math.min(1000, availableToWithdraw));
                    setBeneficiaryName(activeApp?.applicantName || "");
                    setWithdrawModalOpen(true);
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-sterling-navy text-white text-xs font-bold hover:bg-sterling-navy-deep transition-all flex items-center gap-1.5 self-start sm:self-auto"
                >
                  <ArrowDownRight className="w-3.5 h-3.5 text-sterling-gold" />
                  <span>New Withdrawal</span>
                </button>
              </div>

              {clientWithdrawals.length === 0 ? (
                <div className="text-center py-8 text-xs text-slate-400 space-y-2">
                  <Wallet className="w-8 h-8 text-slate-300 mx-auto" />
                  <p>No outward withdrawal requests on this account yet.</p>
                  <button
                    onClick={() => {
                      setWithdrawAmount(Math.min(1000, availableToWithdraw));
                      setBeneficiaryName(activeApp?.applicantName || "");
                      setWithdrawModalOpen(true);
                    }}
                    className="text-sterling-navy font-bold hover:underline"
                  >
                    Click here to request your first withdrawal
                  </button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px] tracking-wider bg-slate-50">
                        <th className="py-2.5 px-3 rounded-l-lg">Request Ref & Date</th>
                        <th className="py-2.5 px-3">Amount</th>
                        <th className="py-2.5 px-3">Payout Method & Bank</th>
                        <th className="py-2.5 px-3">Status</th>
                        <th className="py-2.5 px-3 rounded-r-lg">Clearance Notes</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-600">
                      {clientWithdrawals.map((req) => (
                        <tr key={req.id} className="hover:bg-slate-50/60 transition-colors">
                          <td className="py-3 px-3">
                            <span className="font-mono font-bold text-sterling-navy block">#{req.id.toUpperCase()}</span>
                            <span className="text-[10px] text-slate-400">
                              {new Date(req.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                            </span>
                          </td>
                          <td className="py-3 px-3">
                            <span className="font-black text-slate-800 text-sm">
                              {formatMoney(req.amount, req.currency)}
                            </span>
                          </td>
                          <td className="py-3 px-3">
                            <div className="font-medium text-slate-800">{req.method}</div>
                            <div className="text-[10px] text-slate-400">{req.bankName} • {req.beneficiaryName}</div>
                          </td>
                          <td className="py-3 px-3">
                            {req.status === "approved" ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                Approved & Disbursed
                              </span>
                            ) : req.status === "rejected" ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-red-100 text-red-800">
                                <AlertCircle className="w-3 h-3 text-red-600" />
                                Declined
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                                <Clock className="w-3 h-3 text-amber-600" />
                                Pending Admin Approval
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-3 text-[11px] text-slate-500 max-w-xs">
                            {req.adminNote || (req.status === "pending" ? "Awaiting underwriter & treasury clearance." : "Processed.")}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Quick Actions & Repayment Simulator */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
              <h3 className="text-base font-bold text-sterling-navy">Quick Facility Actions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  onClick={() => setRepayModalOpen(true)}
                  className="p-3 text-left rounded-xl border border-slate-200 hover:border-sterling-gold hover:bg-slate-50 transition-all space-y-1"
                >
                  <div className="text-xs font-bold text-sterling-navy">Early Repayment Simulator</div>
                  <div className="text-[11px] text-slate-500">Calculate payoff savings with zero penalty fees</div>
                </button>

                <button
                  onClick={() => alert("Your official certified amortization schedule has been generated and dispatched to your registered email.")}
                  className="p-3 text-left rounded-xl border border-slate-200 hover:border-sterling-gold hover:bg-slate-50 transition-all space-y-1"
                >
                  <div className="text-xs font-bold text-sterling-navy">Download Schedule</div>
                  <div className="text-[11px] text-slate-500">Full amortization breakdown in certified PDF format</div>
                </button>

                <button
                  onClick={() => alert("Payment modulation request submitted to your lending specialist Emily Vance.")}
                  className="p-3 text-left rounded-xl border border-slate-200 hover:border-sterling-gold hover:bg-slate-50 transition-all space-y-1"
                >
                  <div className="text-xs font-bold text-sterling-navy">Request Payment Holiday</div>
                  <div className="text-[11px] text-slate-500">Flexible grace period up to 2 months annually</div>
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Advisor Chat & Security (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Dedicated Banking Advisor Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80"
                    alt="Emily Vance"
                    className="w-14 h-14 rounded-full object-cover border-2 border-sterling-gold"
                  />
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full" />
                </div>
                <div>
                  <div className="text-xs text-slate-400">Assigned Lending Specialist</div>
                  <div className="text-sm font-bold text-sterling-navy">{activeApp?.assignedOfficer || "Emily Vance"}</div>
                  <div className="text-[11px] text-emerald-600 font-semibold">Online • Head Office Lending Desk</div>
                </div>
              </div>

              <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1">
                <div className="flex items-center gap-2">
                  <PhoneCall className="w-3.5 h-3.5 text-sterling-gold" />
                  <span>Direct Desk: {activeApp?.assignedOfficerPhone || "+1 (800) 555-0199"}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-500">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Mon - Fri: 8:30 AM - 6:00 PM EST</span>
                </div>
                {activeApp?.assignedOfficerEmail && (
                  <div className="text-[11px] text-sterling-navy font-medium pt-1">
                    Email: <a href={`mailto:${activeApp.assignedOfficerEmail}`} className="underline text-sterling-gold hover:text-amber-600">{activeApp.assignedOfficerEmail}</a>
                  </div>
                )}
              </div>

              {/* Chat Window */}
              <div className="border border-slate-200 rounded-xl overflow-hidden flex flex-col h-64 bg-slate-50">
                <div className="p-2.5 bg-sterling-navy text-white text-[11px] font-bold flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-sterling-gold" />
                    Secure Messenger
                  </span>
                  <span className="text-[10px] text-emerald-400">Connected</span>
                </div>

                <div className="flex-1 p-3 overflow-y-auto space-y-2 text-xs">
                  {chatMessages.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
                    >
                      <div className={`p-2.5 rounded-xl max-w-[85%] leading-relaxed ${
                        msg.sender === "user"
                          ? "bg-sterling-navy text-white rounded-tr-none"
                          : "bg-white text-slate-800 border border-slate-200 rounded-tl-none shadow-sm"
                      }`}>
                        {msg.text}
                      </div>
                      <span className="text-[9px] text-slate-400 mt-0.5">{msg.time}</span>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendMessage} className="p-2 bg-white border-t border-slate-200 flex gap-1.5">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Ask a question or request documents..."
                    className="flex-1 text-xs px-3 py-1.5 border border-slate-200 rounded-lg outline-none focus:border-sterling-navy"
                  />
                  <button
                    type="submit"
                    className="p-1.5 bg-sterling-navy text-white rounded-lg hover:bg-sterling-navy-light transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>

            {/* Mandatory Regulatory Warning in Dashboard */}
            <div className="p-4 bg-amber-500/10 border border-amber-400/30 rounded-xl text-center">
              <p className="text-[11px] font-semibold text-amber-800 leading-snug">
                Borrowing involves financial commitments. Please verify your repayment schedule and borrowing capacity before proceeding with credit facilities.
              </p>
            </div>

          </div>

        </div>

      </main>

      <Footer />

      {/* Client Withdrawal Request Modal */}
      {withdrawModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 my-8 animate-scale-up text-left">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-sterling-gold/15 text-sterling-gold font-black flex items-center justify-center">
                  <ArrowDownRight className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-sterling-navy">Outward Capital Withdrawal</h3>
                  <p className="text-xs text-slate-400">Electronic Wire & Treasury Clearance Request</p>
                </div>
              </div>
              <button
                onClick={() => setWithdrawModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold p-1"
              >
                ✕
              </button>
            </div>

            {/* Account Summary Banner */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Available to Withdraw</span>
                <span className="text-2xl font-black text-emerald-600">
                  {formatMoney(availableToWithdraw, activeApp?.currency || "USD")}
                </span>
              </div>
              <div className="text-right text-[11px] text-slate-500">
                <div>From Account: <strong className="font-mono text-slate-700">{activeApp?.accountNumber || `LCG-ACC-${activeApp?.referenceNumber.replace(/[^0-9]/g, '')}-USD`}</strong></div>
                <div>Total Balance: {formatMoney(clientAccountBalance, activeApp?.currency || "USD")}</div>
              </div>
            </div>

            <form onSubmit={handleRequestWithdrawal} className="space-y-4 text-xs">
              
              {/* Amount to Withdraw */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 flex items-center justify-between">
                  <span>Withdrawal Amount ({activeApp?.currency || "USD"})</span>
                  <span className="text-[10px] text-slate-400">Cannot exceed available balance</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-slate-400 font-bold">$</span>
                  <input
                    type="number"
                    required
                    min={50}
                    max={availableToWithdraw}
                    value={withdrawAmount || ""}
                    onChange={(e) => setWithdrawAmount(Number(e.target.value))}
                    className="w-full pl-8 pr-3 py-2.5 rounded-xl border border-slate-200 focus:border-sterling-navy focus:ring-1 focus:ring-sterling-navy font-bold text-slate-800 text-sm outline-none"
                    placeholder="Enter amount..."
                  />
                </div>

                {/* Quick Presets */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {[500, 1000, 2500, 5000].map((amt) => (
                    amt <= availableToWithdraw && (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => setWithdrawAmount(amt)}
                        className={`px-2.5 py-1 rounded-lg border text-[11px] font-semibold transition-colors ${
                          withdrawAmount === amt
                            ? "border-sterling-gold bg-amber-50 text-sterling-navy"
                            : "border-slate-200 text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        ${amt.toLocaleString()}
                      </button>
                    )
                  ))}
                  {availableToWithdraw > 0 && (
                    <button
                      type="button"
                      onClick={() => setWithdrawAmount(availableToWithdraw)}
                      className="px-2.5 py-1 rounded-lg border border-emerald-300 bg-emerald-50 text-emerald-800 text-[11px] font-bold"
                    >
                      Max Available (${availableToWithdraw.toLocaleString()})
                    </button>
                  )}
                </div>
              </div>

              {/* Payout Method */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700">Disbursement / Transfer Method</label>
                <select
                  value={withdrawMethod}
                  onChange={(e) => setWithdrawMethod(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-white focus:border-sterling-navy outline-none font-medium text-slate-700"
                >
                  <option value="Direct Wire Transfer (SWIFT / Fedwire)">Direct Wire Transfer (SWIFT / Fedwire - International & US)</option>
                  <option value="ACH Direct Bank Transfer">ACH Direct Bank Transfer (US Domestic)</option>
                  <option value="SEPA Express Credit Transfer (EUR)">SEPA Express Credit Transfer (EUR Zone)</option>
                  <option value="Commercial Escrow Disbursement">Commercial Escrow Disbursement</option>
                  <option value="Instant Debit Card Payout">Instant Debit Card Payout</option>
                </select>
              </div>

              {/* Beneficiary Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Beneficiary Legal Name</label>
                  <input
                    type="text"
                    required
                    value={beneficiaryName}
                    onChange={(e) => setBeneficiaryName(e.target.value)}
                    placeholder="e.g. David Harrison"
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-sterling-navy outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Receiving Bank Name</label>
                  <input
                    type="text"
                    required
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    placeholder="e.g. JPMorgan Chase Bank, N.A."
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-sterling-navy outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Account Number or IBAN</label>
                  <input
                    type="text"
                    required
                    value={accountNumberOrIban}
                    onChange={(e) => setAccountNumberOrIban(e.target.value)}
                    placeholder="e.g. US89CHAS12345678901234"
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-sterling-navy outline-none font-mono text-[11px]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">SWIFT BIC or Routing Number</label>
                  <input
                    type="text"
                    required
                    value={routingOrSwift}
                    onChange={(e) => setRoutingOrSwift(e.target.value)}
                    placeholder="e.g. CHASUS33XXX / 021000021"
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-sterling-navy outline-none font-mono text-[11px]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Payment Reference / Note (Optional)</label>
                <input
                  type="text"
                  value={transferNotes}
                  onChange={(e) => setTransferNotes(e.target.value)}
                  placeholder="e.g. Personal expenditure / invoice payment"
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-sterling-navy outline-none"
                />
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/80 text-[11px] text-amber-900 leading-relaxed flex items-start gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Treasury Security Review:</strong> Submitted withdrawal requests are routed to the central Administrator Desk for anti-fraud validation and approval. Standard clearance takes between 12 to 24 business hours.
                </span>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-3 px-4 rounded-xl bg-sterling-navy text-white font-bold text-xs uppercase tracking-wider hover:bg-sterling-navy-deep transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <ArrowDownRight className="w-4 h-4 text-sterling-gold" />
                  <span>Submit Withdrawal Request</span>
                </button>
                <button
                  type="button"
                  onClick={() => setWithdrawModalOpen(false)}
                  className="py-3 px-5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold text-xs"
                >
                  Cancel
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Official Bank Statement Modal */}
      {statementModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 my-8 animate-scale-up text-left">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <h3 className="text-lg font-bold text-sterling-navy font-display">Official Account Statement & Proof of Funds</h3>
                <p className="text-xs text-slate-400">Loan Commercial Group • Private Wealth & Credit Division</p>
              </div>
              <button
                onClick={() => setStatementModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="border border-slate-200 rounded-2xl p-6 bg-slate-50/50 space-y-4">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-200 pb-4">
                <div>
                  <div className="text-xs text-slate-400 uppercase font-semibold">Account Holder</div>
                  <div className="text-base font-bold text-slate-800">{activeApp?.applicantName}</div>
                  <div className="text-xs text-slate-500">{activeApp?.email} • {activeApp?.phone}</div>
                </div>
                <div className="sm:text-right">
                  <div className="text-xs text-slate-400 uppercase font-semibold">Account Reference</div>
                  <div className="text-sm font-mono font-bold text-sterling-navy">{activeApp?.accountNumber || `LCG-ACC-${activeApp?.referenceNumber.replace(/[^0-9]/g, '')}-USD`}</div>
                  <div className="text-xs text-emerald-600 font-bold">Status: Active & Verified</div>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-2">
                <div>
                  <div className="text-[11px] text-slate-400">Current Ledger Balance</div>
                  <div className="text-xl font-black text-sterling-navy">{formatMoney(clientAccountBalance, activeApp?.currency || "USD")}</div>
                </div>
                <div>
                  <div className="text-[11px] text-slate-400">Available to Withdraw</div>
                  <div className="text-xl font-black text-emerald-600">{formatMoney(availableToWithdraw, activeApp?.currency || "USD")}</div>
                </div>
                <div>
                  <div className="text-[11px] text-slate-400">Statement Date</div>
                  <div className="text-sm font-bold text-slate-700">{new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</div>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-3 text-[11px] text-slate-500 leading-relaxed space-y-1">
                <div><strong>Institution:</strong> Loan Commercial Group, Licensed Prudential Banking Authority</div>
                <div><strong>Clearing Code (BIC):</strong> LCGBUS33XXX • Statutory Deposit Protection Guaranteed</div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => window.print()}
                className="flex-1 py-3 px-4 rounded-xl bg-sterling-navy text-white font-bold text-xs uppercase tracking-wider hover:bg-sterling-navy-deep transition-all flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4 text-sterling-gold" />
                <span>Print Official PDF Statement</span>
              </button>
              <button
                onClick={() => setStatementModalOpen(false)}
                className="px-5 py-3 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Early Repayment Modal */}
      {repayModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <h3 className="text-lg font-bold text-sterling-navy">Early Repayment Simulator</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Loan Commercial Group permits early capital prepayments with zero penalty fees on standard personal consumer facilities.
            </p>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-700">Prepayment Amount ({activeApp?.currency || "USD"})</label>
                <input
                  type="number"
                  defaultValue="3000"
                  className="w-full mt-1 p-2.5 border border-slate-200 rounded-lg text-sm font-bold text-sterling-navy outline-none"
                />
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl text-xs text-emerald-800 space-y-1">
                <div className="font-bold">Estimated Interest Savings: {formatMoney(240, activeApp?.currency || "USD")}</div>
                <div className="text-[11px]">Your revised monthly installment will adjust downward from {formatMoney(activeApp?.monthlyPayment || 435, activeApp?.currency || "USD")} to {formatMoney(Number(activeApp?.monthlyPayment || 435) * 0.75, activeApp?.currency || "USD")}.</div>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => {
                  alert("Early prepayment request processed successfully.");
                  setRepayModalOpen(false);
                }}
                className="flex-1 bg-sterling-navy text-white font-bold py-2.5 rounded-xl text-xs hover:bg-sterling-navy-light transition-colors"
              >
                Confirm Prepayment Request
              </button>
              <button
                onClick={() => setRepayModalOpen(false)}
                className="px-4 py-2.5 border border-slate-200 rounded-xl text-xs text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <QuickApplyModal
        isOpen={applyModalOpen}
        onClose={() => setApplyModalOpen(false)}
      />
    </div>
  );
}
