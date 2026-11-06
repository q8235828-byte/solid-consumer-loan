"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  getApplications, 
  saveApplications, 
  updateApplicationStatus, 
  assignLoan,
  deleteApplication,
  addApplication,
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
  EyeOff,
  Edit3, 
  Plus, 
  Check, 
  AlertTriangle,
  RotateCcw,
  Percent,
  Banknote,
  Send,
  Lock,
  Unlock,
  KeyRound,
  LogOut,
  Phone,
  Mail,
  MapPin,
  Briefcase,
  Printer,
  Copy,
  Trash2,
  UserCheck,
  ChevronRight,
  Calendar,
  DollarSign,
  Award,
  Sparkles,
  MessageSquare,
  ExternalLink
} from "lucide-react";

// Official Administrator Clearance Password
const ADMIN_SECURITY_PASSWORD = "Qa034942@#$";

// Predefined Bank Lending Officers
const BANK_OFFICERS = [
  {
    name: "Emily Vance",
    title: "Senior Credit Underwriting Specialist",
    email: "emily.vance@sterlingbankasia.com",
    phone: "+1 (800) 555-0199 (Ext 104)",
    department: "Consumer & Personal Lending Desk"
  },
  {
    name: "David Sterling",
    title: "Chief Lending Director & Private Banker",
    email: "david.sterling@sterlingbankasia.com",
    phone: "+1 (800) 555-0195 (Ext 101)",
    department: "Corporate & High-Capacity Facilities"
  },
  {
    name: "Sarah Jenkins",
    title: "Consumer Credit Risk Manager",
    email: "sarah.jenkins@sterlingbankasia.com",
    phone: "+1 (800) 555-0194 (Ext 109)",
    department: "Home Mortgage & Property Solutions"
  },
  {
    name: "Michael Chang",
    title: "Asset & Vehicle Financing Specialist",
    email: "michael.chang@sterlingbankasia.com",
    phone: "+1 (800) 555-0198 (Ext 115)",
    department: "Auto, Marine & Clean Mobility"
  }
];

export default function AdminDashboard() {
  // Security & Authentication Gate
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);
  const [passwordAttempt, setPasswordAttempt] = useState<string>("");
  const [authError, setAuthError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [applications, setApplications] = useState<LoanApplication[]>([]);
  const [selectedApp, setSelectedApp] = useState<LoanApplication | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [officerFilter, setOfficerFilter] = useState<string>("all");
  const [newNote, setNewNote] = useState("");
  const [copiedRef, setCopiedRef] = useState(false);
  const [feedbackToast, setFeedbackToast] = useState<string | null>(null);

  // Assignment Workstation Modal State
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [assignedOfficerName, setAssignedOfficerName] = useState("");
  const [assignedOfficerEmail, setAssignedOfficerEmail] = useState("");
  const [assignedOfficerPhone, setAssignedOfficerPhone] = useState("");
  const [assignedAmount, setAssignedAmount] = useState<number>(0);
  const [assignedRate, setAssignedRate] = useState<number>(2.85);
  const [assignedTermMonths, setAssignedTermMonths] = useState<number>(36);
  const [assignedDisbursementMethod, setAssignedDisbursementMethod] = useState("Direct Wire Transfer (SWIFT / Fedwire)");
  const [assignedDisbursementDate, setAssignedDisbursementDate] = useState("Within 24 Hours of Digital Signature");
  const [assignmentNote, setAssignmentNote] = useState("");

  // Sanction Letter Modal State
  const [isSanctionLetterOpen, setIsSanctionLetterOpen] = useState(false);

  // New Application Modal State
  const [isNewAppModalOpen, setIsNewAppModalOpen] = useState(false);
  const [newAppForm, setNewAppForm] = useState({
    applicantName: "",
    civility: "Mr.",
    email: "",
    phone: "",
    loanType: "persona" as const,
    currency: "USD" as const,
    amount: 25000,
    termMonths: 48,
    monthlyIncome: 6000,
    monthlyExpenses: 1500,
    residenceStatus: "Tenant / Renting",
    address: "",
    city: "",
    postalCode: "",
    employmentType: "Employed Full-Time",
  });

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
    if (list.length > 0) {
      if (!selectedApp) {
        setSelectedApp(list[0]);
      } else {
        const found = list.find(a => a.id === selectedApp.id);
        if (found) setSelectedApp(found);
      }
    } else {
      setSelectedApp(null);
    }
  };

  useEffect(() => {
    // Check authenticated session in sessionStorage
    try {
      const storedAuth = sessionStorage.getItem("sterling_admin_auth_token");
      if (storedAuth === "sba_authenticated_session") {
        setIsAuthenticated(true);
      }
    } catch (e) {}
    setIsAuthLoading(false);

    loadData();

    try {
      const saved = localStorage.getItem("sterling_credit_policy");
      if (saved) setRates(JSON.parse(saved));
    } catch (e) {}

    const handleUpdate = () => loadData();
    window.addEventListener("sterling_applications_updated", handleUpdate);
    return () => window.removeEventListener("sterling_applications_updated", handleUpdate);
  }, []);

  const handleAuthenticate = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordAttempt === ADMIN_SECURITY_PASSWORD) {
      try {
        sessionStorage.setItem("sterling_admin_auth_token", "sba_authenticated_session");
      } catch (e) {}
      setIsAuthenticated(true);
      setAuthError("");
      setPasswordAttempt("");
      showToast("Access Granted: Welcome to Sterling Bank Administration Console.");
    } else {
      setAuthError("Access Denied: Invalid administrator password. Please verify and try again.");
    }
  };

  const handleLogout = () => {
    try {
      sessionStorage.removeItem("sterling_admin_auth_token");
    } catch (e) {}
    setIsAuthenticated(false);
    setPasswordAttempt("");
    showToast("Console locked. Administrator session ended.");
  };

  // When selectedApp changes, prefill assignment workstation form
  useEffect(() => {
    if (selectedApp) {
      const defaultOfficer = BANK_OFFICERS.find(o => o.name === selectedApp.assignedOfficer) || BANK_OFFICERS[0];
      setAssignedOfficerName(selectedApp.assignedOfficer || defaultOfficer.name);
      setAssignedOfficerEmail(selectedApp.assignedOfficerEmail || defaultOfficer.email);
      setAssignedOfficerPhone(selectedApp.assignedOfficerPhone || defaultOfficer.phone);
      setAssignedAmount(selectedApp.assignedAmount || selectedApp.amount);
      setAssignedRate(selectedApp.assignedInterestRate || selectedApp.interestRate);
      setAssignedTermMonths(selectedApp.assignedTermMonths || selectedApp.termMonths);
      setAssignedDisbursementMethod(selectedApp.assignedDisbursementMethod || "Direct Wire Transfer (SWIFT / Fedwire)");
      setAssignedDisbursementDate(selectedApp.assignedDisbursementDate || "Within 24 Hours of Digital Signature");
      setAssignmentNote(`Facility structured and underwritten for ${selectedApp.applicantName}.`);
    }
  }, [selectedApp]);

  // Real-time calculation of monthly installment for assigned terms
  const calcMonthlyPayment = (principal: number, annualRatePct: number, months: number) => {
    if (!principal || !months) return 0;
    const monthlyRate = (annualRatePct / 100) / 12;
    if (monthlyRate === 0) return principal / months;
    const pmt = (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
    return Math.round(pmt * 100) / 100;
  };

  const liveAssignedMonthly = calcMonthlyPayment(assignedAmount, assignedRate, assignedTermMonths);
  const liveAssignedTotal = Math.round(liveAssignedMonthly * assignedTermMonths * 100) / 100;
  const liveAssignedInterest = Math.round((liveAssignedTotal - assignedAmount) * 100) / 100;

  const showToast = (msg: string) => {
    setFeedbackToast(msg);
    setTimeout(() => setFeedbackToast(null), 3500);
  };

  // Status updates
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
      showToast(`Status updated to ${status.toUpperCase()}!`);
    }
  };

  // Execute Loan Assignment
  const handleExecuteAssignment = (actionType: "approve" | "disburse" | "assign_only" | "review" | "decline") => {
    if (!selectedApp) return;

    let targetStatus: LoanApplication["status"] = "approved";
    let targetLabel = "Facility Approved - Offer Issued";

    if (actionType === "approve") {
      targetStatus = "approved";
      targetLabel = "Facility Approved - Official Offer Dispatched";
    } else if (actionType === "disburse") {
      targetStatus = "disbursed";
      targetLabel = "Facility Disbursed via Bank Transfer";
    } else if (actionType === "assign_only") {
      targetStatus = "under_review";
      targetLabel = `Assigned to ${assignedOfficerName} - Underwriting Active`;
    } else if (actionType === "review") {
      targetStatus = "under_review";
      targetLabel = "Additional Documentation Requested";
    } else if (actionType === "decline") {
      targetStatus = "rejected";
      targetLabel = "Application Declined by Credit Committee";
    }

    const underwriterMemo = `[DECISION by Underwriting]: Officer ${assignedOfficerName} assigned facility of ${formatMoney(assignedAmount, selectedApp.currency || "USD")} at ${assignedRate.toFixed(2)}% APR for ${assignedTermMonths} months ($${liveAssignedMonthly.toLocaleString("en-US")}/mo). Disbursement via ${assignedDisbursementMethod} (${assignedDisbursementDate}). Memo: ${assignmentNote}`;

    const updated = assignLoan(selectedApp.id, {
      officerName: assignedOfficerName,
      officerEmail: assignedOfficerEmail,
      officerPhone: assignedOfficerPhone,
      assignedAmount: assignedAmount,
      assignedInterestRate: assignedRate,
      assignedTermMonths: assignedTermMonths,
      assignedMonthlyPayment: liveAssignedMonthly,
      assignedDisbursementMethod: assignedDisbursementMethod,
      assignedDisbursementDate: assignedDisbursementDate,
      status: targetStatus,
      statusLabelFr: targetLabel,
      note: underwriterMemo
    });

    if (updated) {
      setSelectedApp(updated);
      loadData();
      setIsAssignModalOpen(false);
      showToast(`Facility successfully assigned to ${assignedOfficerName} and set to ${targetStatus.toUpperCase()}!`);
    }
  };

  // Add Internal Memo
  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim() || !selectedApp) return;

    handleUpdateStatus(
      selectedApp.id, 
      selectedApp.status, 
      selectedApp.statusLabelFr, 
      `Internal Memo (${new Date().toLocaleDateString("en-US")} ${new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}): ${newNote}`
    );
    setNewNote("");
    showToast("Audit memo recorded.");
  };

  // Toggle Document Verification Status
  const handleToggleDocStatus = (docIdx: number) => {
    if (!selectedApp) return;
    const updatedDocs = [...selectedApp.documents];
    const curr = updatedDocs[docIdx].status;
    updatedDocs[docIdx].status = curr === "verified" ? "pending" : "verified";

    const apps = getApplications();
    const idx = apps.findIndex(a => a.id === selectedApp.id);
    if (idx !== -1) {
      apps[idx].documents = updatedDocs;
      apps[idx].lastUpdated = new Date().toISOString();
      apps[idx].officerNotes = [
        `Document "${updatedDocs[docIdx].name}" marked as ${updatedDocs[docIdx].status.toUpperCase()} by Underwriter.`,
        ...apps[idx].officerNotes
      ];
      saveApplications(apps);
      setSelectedApp(apps[idx]);
      loadData();
      showToast(`Document status changed to ${updatedDocs[docIdx].status}!`);
    }
  };

  // Delete Application
  const handleDeleteApp = (id: string) => {
    if (confirm("Are you sure you want to permanently delete this credit application dossier?")) {
      deleteApplication(id);
      loadData();
      showToast("Application removed from database.");
    }
  };

  // Save Credit Policy
  const handleSavePolicy = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("sterling_credit_policy", JSON.stringify(rates));
    setPolicySaved(true);
    setTimeout(() => setPolicySaved(false), 2500);
    showToast("Global credit policy benchmark saved!");
  };

  // Quick Manual New Application Creation
  const handleCreateNewApp = (e: React.FormEvent) => {
    e.preventDefault();
    const created = addApplication({
      applicantName: newAppForm.applicantName || "Walk-in Client",
      civility: newAppForm.civility,
      email: newAppForm.email || "client@sterlingbankasia.com",
      phone: newAppForm.phone || "+1 555-0199",
      loanType: newAppForm.loanType,
      loanTypeLabel: 
        newAppForm.loanType === "persona" ? "Persona Personal Loan" : 
        newAppForm.loanType === "auto" ? "Auto & Vehicle Loan" : 
        newAppForm.loanType === "home" ? "Home Loan & Renovation" : 
        "Private Investment & Lending",
      currency: newAppForm.currency,
      amount: newAppForm.amount,
      termMonths: newAppForm.termMonths,
      monthlyPayment: calcMonthlyPayment(newAppForm.amount, 2.85, newAppForm.termMonths),
      monthlyIncome: newAppForm.monthlyIncome,
      monthlyExpenses: newAppForm.monthlyExpenses,
      residenceStatus: newAppForm.residenceStatus,
      address: newAppForm.address || "120 Financial Plaza",
      city: newAppForm.city || "New York",
      postalCode: newAppForm.postalCode || "10001",
      employmentType: newAppForm.employmentType,
    });

    loadData();
    setSelectedApp(created);
    setIsNewAppModalOpen(false);
    showToast(`New dossier ${created.referenceNumber} created and ready for assignment!`);
  };

  // Copy reference number
  const handleCopyRef = (ref: string) => {
    navigator.clipboard.writeText(ref);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2000);
    showToast("Application Reference copied to clipboard!");
  };

  // Export CSV
  const handleExportCSV = () => {
    const headers = "Reference,Civility,Name,Email,Phone,Address,City,ZIP,Residence,Product,Amount,Currency,TermMonths,MonthlyPayment,APR,AssignedOfficer,Status,SubmissionDate\n";
    const rows = applications.map(a => 
      `"${a.referenceNumber}","${a.civility || ""}","${a.applicantName}","${a.email}","${a.phone}","${a.address}","${a.city}","${a.postalCode}","${a.residenceStatus || ""}","${a.loanTypeLabel}",${a.amount},"${a.currency || "USD"}",${a.termMonths},${a.monthlyPayment},${a.interestRate},"${a.assignedOfficer || "Unassigned"}","${a.status}","${a.createdAt}"`
    ).join("\n");

    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `sterling_credit_dossiers_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("CSV export generated successfully!");
  };

  // Filtered applications
  const filteredApps = applications.filter(app => {
    const matchesSearch = 
      app.applicantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.referenceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (app.city && app.city.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (app.assignedOfficer && app.assignedOfficer.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    const matchesOfficer = 
      officerFilter === "all" ? true :
      officerFilter === "unassigned" ? !app.assignedOfficer :
      app.assignedOfficer === officerFilter;

    return matchesSearch && matchesStatus && matchesOfficer;
  });

  // KPI Calculations
  const totalVolume = applications.reduce((acc, a) => acc + (a.assignedAmount || a.amount), 0);
  const disbursedVolume = applications.filter(a => a.status === "disbursed").reduce((acc, a) => acc + (a.assignedAmount || a.amount), 0);
  const approvedVolume = applications.filter(a => a.status === "approved" || a.status === "disbursed").reduce((acc, a) => acc + (a.assignedAmount || a.amount), 0);
  const approvedCount = applications.filter(a => a.status === "approved" || a.status === "disbursed").length;
  const pendingCount = applications.filter(a => a.status === "pending" || a.status === "under_review").length;
  const assignedCount = applications.filter(a => !!a.assignedOfficer).length;

  // Security Gate: Check Authentication
  if (isAuthLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-900 font-sans text-slate-100">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-6">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-sterling-gold border-t-transparent rounded-full animate-spin" />
            <p className="text-xs text-slate-400 font-medium">Verifying Underwriting Clearance...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-950 font-sans text-slate-100 selection:bg-sterling-gold selection:text-slate-950">
        <Navbar />

        <main className="flex-1 flex items-center justify-center p-4 sm:p-6 py-16">
          <div className="max-w-md w-full bg-slate-900/90 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-6 text-center animate-scale-up">
            
            {/* Emblem */}
            <div className="relative mx-auto w-16 h-16 rounded-2xl bg-gradient-to-tr from-sterling-navy to-slate-800 border border-sterling-gold/40 flex items-center justify-center shadow-xl shadow-sterling-gold/10 text-sterling-gold">
              <Lock className="w-8 h-8 stroke-[2.2]" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-sterling-gold rounded-full flex items-center justify-center text-[10px] font-black text-slate-950">
                !
              </div>
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sterling-gold/15 text-sterling-gold text-xs font-bold border border-sterling-gold/30">
                <ShieldCheck className="w-3.5 h-3.5" />
                RESTRICTED CREDIT GATEWAY
              </div>
              <h1 className="text-2xl font-black text-white font-display tracking-tight">
                Administration Console
              </h1>
              <p className="text-xs text-slate-400 leading-relaxed">
                Access to the central credit underwriting console and loan assignment desk requires authorized security clearance.
              </p>
            </div>

            {authError && (
              <div className="p-3.5 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-300 text-xs flex items-center gap-2.5 text-left">
                <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <form onSubmit={handleAuthenticate} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center justify-between">
                  <span>Administrator Security Key</span>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider">Protected</span>
                </label>
                <div className="relative">
                  <div className="absolute left-3.5 top-3.5 text-slate-400">
                    <KeyRound className="w-4 h-4 text-sterling-gold" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    autoFocus
                    value={passwordAttempt}
                    onChange={(e) => {
                      setPasswordAttempt(e.target.value);
                      if (authError) setAuthError("");
                    }}
                    placeholder="Enter security password..."
                    className="w-full pl-10 pr-10 py-3.5 rounded-xl bg-slate-950/80 border border-slate-700 text-white text-xs font-medium focus:ring-2 focus:ring-sterling-gold focus:border-sterling-gold outline-none transition-all placeholder:text-slate-600"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3.5 text-slate-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-sterling-gold via-sterling-gold-light to-sterling-gold text-sterling-navy-deep font-extrabold py-3.5 px-4 rounded-xl text-xs sm:text-sm hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-sterling-gold/15 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Unlock className="w-4 h-4" />
                Unlock Administration Console
              </button>
            </form>

            <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-500 space-y-2.5">
              <div className="flex items-center justify-center gap-1.5 text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>AES-256 Underwriter Session Security</span>
              </div>
              <p>
                Authorized personnel of Sterling Bank of Asia only.
              </p>
              <div>
                <Link href="/" className="text-sterling-gold hover:underline font-semibold inline-flex items-center gap-1">
                  ← Return to Public Homepage
                </Link>
              </div>
            </div>

          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 font-sans text-slate-800">
      <Navbar />

      {/* Toast Feedback Notification */}
      {feedbackToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-sterling-gold/40 flex items-center gap-3 animate-fade-in text-xs font-semibold">
          <Sparkles className="w-4 h-4 text-sterling-gold" />
          <span>{feedbackToast}</span>
        </div>
      )}

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Admin Header Banner */}
        <div className="bg-gradient-to-r from-sterling-navy-deep via-sterling-navy to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border border-white/10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sterling-gold/20 text-sterling-gold text-xs font-bold border border-sterling-gold/30">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Central Credit & Loan Assignment Workstation
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display">
              Underwriting, Dossier Inspection & Facility Assignment
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Inspect applicant personal, employment, and KYC dossier information. Assign dedicated lending officers, structure approved terms, and dispatch binding facility agreements.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsNewAppModalOpen(true)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              New Loan Dossier
            </button>
            <button
              onClick={handleExportCSV}
              className="bg-white/10 hover:bg-white/20 text-white font-medium text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-white/20 transition-all flex items-center gap-2"
            >
              <Download className="w-4 h-4 text-sterling-gold" />
              Export CSV
            </button>
            <Link
              href="/dashboard"
              className="bg-gradient-to-r from-sterling-gold via-sterling-gold-light to-sterling-gold text-sterling-navy-deep font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-md hover:scale-[1.02] transition-all flex items-center gap-2"
            >
              <Users className="w-4 h-4" />
              Client Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500/15 hover:bg-red-500/25 text-red-200 border border-red-400/30 font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-sm"
              title="End session and lock administration console"
            >
              <LogOut className="w-4 h-4 text-red-300" />
              Lock Console
            </button>
          </div>
        </div>

        {/* Global Executive KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Total Pipeline Volume</span>
              <Banknote className="w-4 h-4 text-sterling-navy" />
            </div>
            <div className="text-2xl font-black text-sterling-navy">
              ${totalVolume.toLocaleString("en-US")}
            </div>
            <div className="text-[11px] text-slate-500">
              Across {applications.length} filed dossiers
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Approved Volume</span>
              <Award className="w-4 h-4 text-sterling-gold" />
            </div>
            <div className="text-2xl font-black text-sterling-gold">
              ${approvedVolume.toLocaleString("en-US")}
            </div>
            <div className="text-[11px] text-slate-500 font-semibold">
              {approvedCount} facilities sanctioned
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Disbursed Funds</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-black text-emerald-600">
              ${disbursedVolume.toLocaleString("en-US")}
            </div>
            <div className="text-[11px] text-emerald-700 font-semibold">
              SWIFT / Wire transfers executed
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Pending Assignment / Review</span>
              <Clock className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-black text-amber-600">
              {pendingCount}
            </div>
            <div className="text-[11px] text-slate-500">
              Requires underwriter review
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Officer Assignments</span>
              <UserCheck className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="text-2xl font-black text-indigo-700">
              {assignedCount} / {applications.length}
            </div>
            <div className="text-[11px] text-slate-500">
              {applications.length - assignedCount} unassigned
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
            Applicant Dossiers & Loan Assignment Desk ({filteredApps.length})
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

        {/* TAB 1: Applications Management & Assignment Station */}
        {activeTab === "applications" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Applications Table & List (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              
              {/* Filter and Search Bar */}
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 space-y-3">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search applicant name, ref #, email, city..."
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl outline-none focus:border-sterling-navy"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="p-2 border border-slate-200 rounded-xl outline-none bg-slate-50 text-slate-700 font-medium"
                  >
                    <option value="all">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="under_review">Under Review</option>
                    <option value="approved">Approved</option>
                    <option value="disbursed">Disbursed</option>
                    <option value="rejected">Declined</option>
                  </select>

                  <select
                    value={officerFilter}
                    onChange={(e) => setOfficerFilter(e.target.value)}
                    className="p-2 border border-slate-200 rounded-xl outline-none bg-slate-50 text-slate-700 font-medium"
                  >
                    <option value="all">All Officers</option>
                    <option value="unassigned">Unassigned Only</option>
                    {BANK_OFFICERS.map((o) => (
                      <option key={o.name} value={o.name}>{o.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Applications List */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 divide-y divide-slate-100 overflow-hidden">
                <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs font-bold text-slate-600">
                  <span>Applicant Pipeline ({filteredApps.length})</span>
                  <span className="text-[10px] text-slate-400">Click row to inspect full dossier</span>
                </div>

                {filteredApps.length === 0 ? (
                  <div className="p-8 text-center text-xs text-slate-400 space-y-2">
                    <AlertTriangle className="w-6 h-6 text-amber-500 mx-auto" />
                    <p>No dossiers match your search filters.</p>
                  </div>
                ) : (
                  filteredApps.map((app) => (
                    <div
                      key={app.id}
                      onClick={() => setSelectedApp(app)}
                      className={`p-4 cursor-pointer hover:bg-slate-50 transition-all flex flex-col gap-2 ${
                        selectedApp?.id === app.id ? "bg-amber-50/60 border-l-4 border-sterling-gold shadow-inner" : ""
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-sm text-sterling-navy">
                            {app.civility ? `${app.civility} ` : ""}{app.applicantName}
                          </span>
                          <span className="text-[10px] font-mono bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-bold">
                            {app.referenceNumber}
                          </span>
                        </div>

                        <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                          app.status === "approved" || app.status === "disbursed"
                            ? "bg-emerald-100 text-emerald-800"
                            : app.status === "under_review"
                            ? "bg-amber-100 text-amber-800"
                            : app.status === "rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-blue-100 text-blue-700"
                        }`}>
                          {app.status === "disbursed" ? "Disbursed" : app.status === "approved" ? "Approved" : app.status === "under_review" ? "Underwriting" : "Pending"}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-xs text-slate-600">
                        <div>
                          {app.loanTypeLabel} • <strong>{formatMoney(app.assignedAmount || app.amount, app.currency || "USD")}</strong> ({app.assignedTermMonths || app.termMonths} mos)
                        </div>
                        <div className="font-bold text-sterling-navy">
                          {formatMoney(app.assignedMonthlyPayment || app.monthlyPayment, app.currency || "USD")}/mo
                        </div>
                      </div>

                      {/* Officer Assignment Tag & Solvency */}
                      <div className="flex items-center justify-between pt-1 border-t border-slate-100/80 text-[11px]">
                        <div className="flex items-center gap-1.5">
                          {app.assignedOfficer ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 font-semibold text-[10px]">
                              <UserCheck className="w-3 h-3 text-indigo-600" />
                              Assigned: {app.assignedOfficer}
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 font-semibold text-[10px]">
                              <Clock className="w-3 h-3 text-amber-600" />
                              Unassigned • Action Needed
                            </span>
                          )}
                        </div>

                        <div className="text-slate-400 text-[10px]">
                          Score: <strong className="text-emerald-700">{app.creditScore}</strong>/900 • {new Date(app.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

            </div>

            {/* Right Column: Full Dossier Inspection & Assignment Engine (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {selectedApp ? (
                <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
                  
                  {/* Top Dossier Action Header */}
                  <div className="border-b border-slate-200 pb-5 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-black text-sterling-navy bg-amber-100/80 px-2.5 py-1 rounded-lg border border-amber-300">
                          {selectedApp.referenceNumber}
                        </span>
                        <button
                          onClick={() => handleCopyRef(selectedApp.referenceNumber)}
                          className="text-slate-400 hover:text-sterling-navy p-1 transition-colors"
                          title="Copy Reference"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        {copiedRef && <span className="text-[10px] text-emerald-600 font-bold">Copied!</span>}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setIsSanctionLetterOpen(true)}
                          className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
                        >
                          <Printer className="w-3.5 h-3.5 text-sterling-navy" />
                          Sanction Letter
                        </button>
                        
                        <button
                          onClick={() => handleDeleteApp(selectedApp.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1.5 rounded-lg transition-colors"
                          title="Delete Application"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <h2 className="text-2xl font-black text-sterling-navy font-display flex items-center gap-2">
                          {selectedApp.civility ? `${selectedApp.civility} ` : ""}{selectedApp.applicantName}
                          <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase ${
                            selectedApp.status === "approved" || selectedApp.status === "disbursed"
                              ? "bg-emerald-100 text-emerald-800"
                              : selectedApp.status === "under_review"
                              ? "bg-amber-100 text-amber-800"
                              : selectedApp.status === "rejected"
                              ? "bg-red-100 text-red-700"
                              : "bg-blue-100 text-blue-700"
                          }`}>
                            {selectedApp.statusLabelFr}
                          </span>
                        </h2>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Submitted on {new Date(selectedApp.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* SECTION 1: APPLICANT PERSONAL & CONTACT INFORMATION */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black uppercase tracking-wider text-sterling-navy flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-sterling-gold" />
                        Applicant Contact & Residential Profile
                      </span>
                      <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
                        Identity Verified
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                        <div className="text-slate-400 text-[10px] uppercase font-bold flex items-center gap-1">
                          <Mail className="w-3 h-3" /> Email Address
                        </div>
                        <div className="font-bold text-slate-800 flex items-center justify-between">
                          <a href={`mailto:${selectedApp.email}`} className="hover:text-sterling-navy hover:underline">
                            {selectedApp.email}
                          </a>
                        </div>
                      </div>

                      <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                        <div className="text-slate-400 text-[10px] uppercase font-bold flex items-center gap-1">
                          <Phone className="w-3 h-3" /> Phone Number
                        </div>
                        <div className="font-bold text-slate-800 flex items-center justify-between">
                          <span>{selectedApp.phone}</span>
                          <div className="flex items-center gap-1.5">
                            <a
                              href={`tel:${selectedApp.phone}`}
                              className="text-[10px] text-sterling-navy bg-white px-2 py-0.5 rounded border border-slate-200 hover:bg-slate-100"
                            >
                              Call
                            </a>
                            <a
                              href={`https://wa.me/${selectedApp.phone.replace(/[^0-9]/g, "")}`}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[10px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded hover:bg-emerald-200"
                            >
                              WhatsApp
                            </a>
                          </div>
                        </div>
                      </div>

                      <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                        <div className="text-slate-400 text-[10px] uppercase font-bold flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> Residential Address
                        </div>
                        <div className="font-bold text-slate-800">
                          {selectedApp.address || "Main Boulevard"}, {selectedApp.city || "New York"} {selectedApp.postalCode || "10001"}
                        </div>
                      </div>

                      <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                        <div className="text-slate-400 text-[10px] uppercase font-bold flex items-center gap-1">
                          <Building2 className="w-3 h-3" /> Housing / Ownership
                        </div>
                        <div className="font-bold text-slate-800">
                          {selectedApp.residenceStatus || "Tenant / Renting"}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* SECTION 2: EMPLOYMENT, FINANCIAL PROFILE & DTI RATIO */}
                  <div className="space-y-3">
                    <span className="text-xs font-black uppercase tracking-wider text-sterling-navy flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-sterling-gold" />
                      Financial Capacity & Underwriting Risk Score
                    </span>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-0.5">
                        <div className="text-slate-400 text-[10px] font-bold">Net Monthly Income</div>
                        <div className="font-black text-sm text-emerald-700">
                          {formatMoney(selectedApp.monthlyIncome, selectedApp.currency || "USD")}
                        </div>
                        <div className="text-[10px] text-slate-500 truncate">{selectedApp.employmentType}</div>
                      </div>

                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-0.5">
                        <div className="text-slate-400 text-[10px] font-bold">Living Expenses</div>
                        <div className="font-black text-sm text-slate-700">
                          {formatMoney(selectedApp.monthlyExpenses, selectedApp.currency || "USD")}
                        </div>
                        <div className="text-[10px] text-slate-500">Rent, loans & utilities</div>
                      </div>

                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-0.5">
                        <div className="text-slate-400 text-[10px] font-bold">Disposable Cashflow</div>
                        <div className="font-black text-sm text-indigo-700">
                          {formatMoney(Math.max(0, selectedApp.monthlyIncome - selectedApp.monthlyExpenses), selectedApp.currency || "USD")}
                        </div>
                        <div className="text-[10px] text-slate-500">Free margin / mo</div>
                      </div>

                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-0.5">
                        <div className="text-slate-400 text-[10px] font-bold">Credit Solvency</div>
                        <div className="font-black text-sm text-sterling-navy">
                          {selectedApp.creditScore} / 900
                        </div>
                        <div className="text-[10px] text-emerald-600 font-bold">Tier 1 Prime Rating</div>
                      </div>
                    </div>

                    {/* DTI Gauge */}
                    {(() => {
                      const installment = selectedApp.assignedMonthlyPayment || selectedApp.monthlyPayment;
                      const dti = selectedApp.monthlyIncome > 0
                        ? Math.round(((selectedApp.monthlyExpenses + installment) / selectedApp.monthlyIncome) * 100)
                        : 30;
                      const isSafe = dti <= 35;
                      const isWarning = dti > 35 && dti <= 45;

                      // Security Gate: Check Authentication
  if (isAuthLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-900 font-sans text-slate-100">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-6">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-sterling-gold border-t-transparent rounded-full animate-spin" />
            <p className="text-xs text-slate-400 font-medium">Verifying Underwriting Clearance...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-950 font-sans text-slate-100 selection:bg-sterling-gold selection:text-slate-950">
        <Navbar />

        <main className="flex-1 flex items-center justify-center p-4 sm:p-6 py-16">
          <div className="max-w-md w-full bg-slate-900/90 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-6 text-center animate-scale-up">
            
            {/* Emblem */}
            <div className="relative mx-auto w-16 h-16 rounded-2xl bg-gradient-to-tr from-sterling-navy to-slate-800 border border-sterling-gold/40 flex items-center justify-center shadow-xl shadow-sterling-gold/10 text-sterling-gold">
              <Lock className="w-8 h-8 stroke-[2.2]" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-sterling-gold rounded-full flex items-center justify-center text-[10px] font-black text-slate-950">
                !
              </div>
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sterling-gold/15 text-sterling-gold text-xs font-bold border border-sterling-gold/30">
                <ShieldCheck className="w-3.5 h-3.5" />
                RESTRICTED CREDIT GATEWAY
              </div>
              <h1 className="text-2xl font-black text-white font-display tracking-tight">
                Administration Console
              </h1>
              <p className="text-xs text-slate-400 leading-relaxed">
                Access to the central credit underwriting console and loan assignment desk requires authorized security clearance.
              </p>
            </div>

            {authError && (
              <div className="p-3.5 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-300 text-xs flex items-center gap-2.5 text-left">
                <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <form onSubmit={handleAuthenticate} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center justify-between">
                  <span>Administrator Security Key</span>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider">Protected</span>
                </label>
                <div className="relative">
                  <div className="absolute left-3.5 top-3.5 text-slate-400">
                    <KeyRound className="w-4 h-4 text-sterling-gold" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    autoFocus
                    value={passwordAttempt}
                    onChange={(e) => {
                      setPasswordAttempt(e.target.value);
                      if (authError) setAuthError("");
                    }}
                    placeholder="Enter security password..."
                    className="w-full pl-10 pr-10 py-3.5 rounded-xl bg-slate-950/80 border border-slate-700 text-white text-xs font-medium focus:ring-2 focus:ring-sterling-gold focus:border-sterling-gold outline-none transition-all placeholder:text-slate-600"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3.5 text-slate-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-sterling-gold via-sterling-gold-light to-sterling-gold text-sterling-navy-deep font-extrabold py-3.5 px-4 rounded-xl text-xs sm:text-sm hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-sterling-gold/15 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Unlock className="w-4 h-4" />
                Unlock Administration Console
              </button>
            </form>

            <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-500 space-y-2.5">
              <div className="flex items-center justify-center gap-1.5 text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>AES-256 Underwriter Session Security</span>
              </div>
              <p>
                Authorized personnel of Sterling Bank of Asia only.
              </p>
              <div>
                <Link href="/" className="text-sterling-gold hover:underline font-semibold inline-flex items-center gap-1">
                  ← Return to Public Homepage
                </Link>
              </div>
            </div>

          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
                        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
                          <div className="flex items-center justify-between text-xs font-bold">
                            <span className="text-slate-700 flex items-center gap-1.5">
                              Calculated Debt-to-Income Ratio (DTI)
                            </span>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                              isSafe ? "bg-emerald-100 text-emerald-800" : isWarning ? "bg-amber-100 text-amber-800" : "bg-red-100 text-red-800"
                            }`}>
                              {dti}% — {isSafe ? "Prime Underwriting Threshold (Low Risk)" : isWarning ? "Moderate Risk - Underwriter Review" : "Exceeds Standard 35% Guideline"}
                            </span>
                          </div>

                          <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full transition-all duration-500 ${
                                isSafe ? "bg-emerald-500" : isWarning ? "bg-amber-500" : "bg-red-500"
                              }`}
                              style={{ width: `${Math.min(100, dti)}%` }}
                            />
                          </div>
                        </div>
                      );
                    })()}
                  </div>

                  {/* SECTION 3: REQUESTED FACILITY VS ASSIGNED TERMS */}
                  <div className="p-5 bg-gradient-to-br from-sterling-navy-deep to-slate-900 text-white rounded-2xl shadow-md space-y-4">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <div>
                        <span className="text-xs font-black uppercase text-sterling-gold tracking-wider flex items-center gap-1.5">
                          <CreditCard className="w-3.5 h-3.5" />
                          Loan Assignment & Underwriting Status
                        </span>
                        <div className="text-lg font-bold mt-0.5">
                          {selectedApp.loanTypeLabel}
                        </div>
                      </div>

                      <button
                        onClick={() => setIsAssignModalOpen(true)}
                        className="bg-gradient-to-r from-sterling-gold via-sterling-gold-light to-sterling-gold text-sterling-navy-deep font-extrabold text-xs px-4 py-2.5 rounded-xl shadow hover:scale-105 transition-all flex items-center gap-1.5"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        Assign / Restructure Loan
                      </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                      <div>
                        <div className="text-slate-400 text-[10px]">Requested Principal</div>
                        <div className="text-base font-black text-white">
                          {formatMoney(selectedApp.amount, selectedApp.currency || "USD")}
                        </div>
                        <div className="text-[10px] text-slate-400">{selectedApp.termMonths} mos @ {selectedApp.interestRate.toFixed(2)}% APR</div>
                      </div>

                      <div>
                        <div className="text-sterling-gold text-[10px] font-bold">Assigned Approved Amount</div>
                        <div className="text-base font-black text-sterling-gold">
                          {formatMoney(selectedApp.assignedAmount || selectedApp.amount, selectedApp.currency || "USD")}
                        </div>
                        <div className="text-[10px] text-slate-300">
                          {selectedApp.assignedAmount ? "Approved Facility" : "Matches request"}
                        </div>
                      </div>

                      <div>
                        <div className="text-sterling-gold text-[10px] font-bold">Approved Installment</div>
                        <div className="text-base font-black text-white">
                          {formatMoney(selectedApp.assignedMonthlyPayment || selectedApp.monthlyPayment, selectedApp.currency || "USD")}/mo
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {selectedApp.assignedTermMonths || selectedApp.termMonths} monthly payments
                        </div>
                      </div>

                      <div>
                        <div className="text-slate-400 text-[10px]">Assigned Officer</div>
                        <div className="text-sm font-extrabold text-emerald-400">
                          {selectedApp.assignedOfficer || "Unassigned"}
                        </div>
                        <div className="text-[10px] text-slate-400 truncate">
                          {selectedApp.assignedOfficerEmail || "Needs assignment"}
                        </div>
                      </div>
                    </div>

                    {selectedApp.assignedDisbursementMethod && (
                      <div className="pt-2 border-t border-white/10 flex flex-wrap items-center justify-between text-xs text-slate-300 gap-2">
                        <div>
                          Disbursement: <strong className="text-white">{selectedApp.assignedDisbursementMethod}</strong>
                        </div>
                        <div className="text-sterling-gold font-medium">
                          Execution: {selectedApp.assignedDisbursementDate}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* SECTION 4: KYC VERIFICATION DOCUMENTS */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black uppercase tracking-wider text-sterling-navy flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-sterling-gold" />
                        Submitted KYC Documents ({selectedApp.documents.length})
                      </span>
                      <span className="text-[10px] text-slate-400">Click verification button to update</span>
                    </div>

                    <div className="space-y-2">
                      {selectedApp.documents.map((doc, idx) => (
                        <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-sterling-navy/10 text-sterling-navy flex items-center justify-center font-bold text-[10px]">
                              PDF
                            </div>
                            <div>
                              <div className="font-bold text-slate-800">{doc.name}</div>
                              <div className="text-[10px] text-slate-400">{doc.type} • Uploaded {doc.uploadedAt}</div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                              doc.status === "verified"
                                ? "bg-emerald-100 text-emerald-800"
                                : doc.status === "pending"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-red-100 text-red-800"
                            }`}>
                              {doc.status}
                            </span>
                            <button
                              onClick={() => handleToggleDocStatus(idx)}
                              className="text-[10px] font-bold px-2 py-1 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 text-slate-700 transition-colors"
                            >
                              {doc.status === "verified" ? "Mark Pending" : "Mark Verified"}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* SECTION 5: FAST UNDERWRITING DECISION SHORTCUTS */}
                  <div className="space-y-3 pt-3 border-t border-slate-200">
                    <div className="text-xs font-black uppercase tracking-wider text-sterling-navy">
                      Quick Decisions & Workflow Triggers
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <button
                        onClick={() => handleUpdateStatus(
                          selectedApp.id, 
                          "approved", 
                          "Facility Approved - Offer Issued", 
                          "Credit committee approved facility terms. Sanction package prepared for applicant."
                        )}
                        className="py-2.5 px-3 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-700 text-white transition-all flex items-center justify-center gap-1.5 shadow-sm"
                      >
                        <Check className="w-4 h-4 stroke-[3]" />
                        Approve Loan
                      </button>

                      <button
                        onClick={() => handleUpdateStatus(
                          selectedApp.id, 
                          "disbursed", 
                          "Facility Disbursed via Bank Transfer", 
                          "Direct bank wire disbursement executed by treasury operations."
                        )}
                        className="py-2.5 px-3 rounded-xl font-bold text-xs bg-sterling-navy hover:bg-sterling-navy-light text-white transition-all flex items-center justify-center gap-1.5 shadow-sm"
                      >
                        <Banknote className="w-4 h-4 text-sterling-gold" />
                        Disburse Funds
                      </button>

                      <button
                        onClick={() => handleUpdateStatus(
                          selectedApp.id, 
                          "under_review", 
                          "Additional Documentation Requested", 
                          "Request dispatched to applicant for supplementary income / banking proof."
                        )}
                        className="py-2.5 px-3 rounded-xl font-medium text-xs bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Clock className="w-4 h-4" />
                        Request Docs
                      </button>

                      <button
                        onClick={() => handleUpdateStatus(
                          selectedApp.id, 
                          "rejected", 
                          "Application Declined", 
                          "Facility declined due to non-conformance with standard risk scoring thresholds."
                        )}
                        className="py-2.5 px-3 rounded-xl font-medium text-xs bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 transition-colors flex items-center justify-center gap-1.5"
                      >
                        <XCircle className="w-4 h-4" />
                        Decline
                      </button>
                    </div>
                  </div>

                  {/* SECTION 6: AUDIT TRAIL & MEMOS */}
                  <div className="space-y-3 pt-3 border-t border-slate-200">
                    <div className="text-xs font-black uppercase tracking-wider text-sterling-navy flex items-center justify-between">
                      <span>Underwriting Audit Trail & Internal Memos</span>
                      <span className="text-[10px] text-slate-400">{selectedApp.officerNotes.length} entries</span>
                    </div>

                    <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
                      {selectedApp.officerNotes.map((note, idx) => (
                        <div key={idx} className="p-2.5 bg-slate-50 rounded-xl text-xs text-slate-600 border border-slate-100 leading-relaxed">
                          {note}
                        </div>
                      ))}
                    </div>

                    <form onSubmit={handleAddNote} className="flex gap-2 pt-1">
                      <input
                        type="text"
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        placeholder="Type an underwriting note or officer instruction..."
                        className="flex-1 text-xs px-3.5 py-2.5 border border-slate-200 rounded-xl outline-none focus:border-sterling-navy bg-slate-50 focus:bg-white"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2.5 bg-slate-900 hover:bg-sterling-navy text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5"
                      >
                        <Send className="w-3.5 h-3.5" />
                        Log Memo
                      </button>
                    </form>
                  </div>

                </div>
              ) : (
                <div className="bg-white rounded-3xl p-12 text-center text-slate-400 text-xs space-y-3 border border-slate-200">
                  <FileText className="w-8 h-8 text-slate-300 mx-auto" />
                  <p>Select an application on the left to inspect its complete credit dossier and assign terms.</p>
                </div>
              )}
            </div>

          </div>
        )}

        {/* TAB 2: Risk Policy & Base APR Settings */}
        {activeTab === "policy" && (
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 max-w-3xl mx-auto space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-xl font-black text-sterling-navy flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-sterling-gold" />
                Underwriting Risk Policy & Contractual APR Settings
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Configure base lending rates and regulatory DTI caps applied across simulators and underwriting decision tables.
              </p>
            </div>

            <form onSubmit={handleSavePolicy} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <label className="text-xs font-bold text-sterling-navy">
                    Fixed APR • Persona Personal Loan (%)
                  </label>
                  <input
                    type="number"
                    step="0.05"
                    value={rates.persona}
                    onChange={(e) => setRates({ ...rates, persona: parseFloat(e.target.value) || 0 })}
                    className="w-full p-2.5 text-base font-bold text-sterling-navy border border-slate-200 rounded-xl bg-white"
                  />
                  <div className="text-[10px] text-slate-400">Standard rate for multi-purpose personal credit</div>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <label className="text-xs font-bold text-sterling-navy">
                    Fixed APR • Auto & Vehicle Loan (%)
                  </label>
                  <input
                    type="number"
                    step="0.05"
                    value={rates.auto}
                    onChange={(e) => setRates({ ...rates, auto: parseFloat(e.target.value) || 0 })}
                    className="w-full p-2.5 text-base font-bold text-sterling-navy border border-slate-200 rounded-xl bg-white"
                  />
                  <div className="text-[10px] text-slate-400">Brand new and certified pre-owned vehicles</div>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <label className="text-xs font-bold text-sterling-navy">
                    Fixed APR • EcoSolutions Clean Energy (%)
                  </label>
                  <input
                    type="number"
                    step="0.05"
                    value={rates.ecosolutions}
                    onChange={(e) => setRates({ ...rates, ecosolutions: parseFloat(e.target.value) || 0 })}
                    className="w-full p-2.5 text-base font-bold text-emerald-700 border border-slate-200 rounded-xl bg-white"
                  />
                  <div className="text-[10px] text-slate-400">Green incentive rate for renewable energy projects</div>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <label className="text-xs font-bold text-sterling-navy">
                    Fixed APR • Home & Renovation Loan (%)
                  </label>
                  <input
                    type="number"
                    step="0.05"
                    value={rates.home}
                    onChange={(e) => setRates({ ...rates, home: parseFloat(e.target.value) || 0 })}
                    className="w-full p-2.5 text-base font-bold text-sterling-navy border border-slate-200 rounded-xl bg-white"
                  />
                  <div className="text-[10px] text-slate-400">Residential upgrades and property improvements</div>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <label className="text-xs font-bold text-sterling-navy">
                    Maximum Personal Loan Facility ($ / €)
                  </label>
                  <input
                    type="number"
                    step="5000"
                    value={rates.maxAmount}
                    onChange={(e) => setRates({ ...rates, maxAmount: parseInt(e.target.value) || 75000 })}
                    className="w-full p-2.5 text-base font-bold text-sterling-navy border border-slate-200 rounded-xl bg-white"
                  />
                  <div className="text-[10px] text-slate-400">Retail personal lending ceiling</div>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <label className="text-xs font-bold text-sterling-navy">
                    Maximum Debt-to-Income Ratio (DTI %)
                  </label>
                  <input
                    type="number"
                    value={rates.maxDTI}
                    onChange={(e) => setRates({ ...rates, maxDTI: parseInt(e.target.value) || 35 })}
                    className="w-full p-2.5 text-base font-bold text-sterling-navy border border-slate-200 rounded-xl bg-white"
                  />
                  <div className="text-[10px] text-slate-400">Standard prudential lending guideline: max 35%</div>
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
                    showToast("Policy reset to default benchmarks.");
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

      {/* ======================================================== */}
      {/* MODAL 1: COMPREHENSIVE LOAN ASSIGNMENT & STRUCTURING DESK */}
      {/* ======================================================== */}
      {isAssignModalOpen && selectedApp && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8 space-y-6 animate-scale-up">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sterling-gold/15 text-sterling-navy text-xs font-black">
                  <Award className="w-3.5 h-3.5 text-sterling-gold" />
                  Official Lending Assignment Workstation
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-sterling-navy">
                  Structure & Assign Loan: {selectedApp.applicantName}
                </h3>
                <p className="text-xs text-slate-500">
                  Ref: <strong className="font-mono text-sterling-navy">{selectedApp.referenceNumber}</strong> • Requested: {formatMoney(selectedApp.amount, selectedApp.currency || "USD")} over {selectedApp.termMonths} mos
                </p>
              </div>

              <button
                onClick={() => setIsAssignModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 font-bold transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6 max-h-[75vh] overflow-y-auto pr-1">
              
              {/* STEP 1: DEDICATED LENDING OFFICER ASSIGNMENT */}
              <div className="space-y-3">
                <label className="text-xs font-black uppercase text-sterling-navy tracking-wider flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4 text-sterling-gold" />
                  1. Assign Dedicated Lending Officer
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {BANK_OFFICERS.map((officer) => (
                    <div
                      key={officer.name}
                      onClick={() => {
                        setAssignedOfficerName(officer.name);
                        setAssignedOfficerEmail(officer.email);
                        setAssignedOfficerPhone(officer.phone);
                      }}
                      className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                        assignedOfficerName === officer.name
                          ? "border-sterling-gold bg-amber-50/60 shadow-sm"
                          : "border-slate-200 hover:border-slate-300 bg-white"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-xs text-sterling-navy">{officer.name}</span>
                        {assignedOfficerName === officer.name && (
                          <Check className="w-4 h-4 text-sterling-gold stroke-[3]" />
                        )}
                      </div>
                      <div className="text-[11px] text-slate-600">{officer.title}</div>
                      <div className="text-[10px] text-slate-400 mt-1">{officer.department}</div>
                    </div>
                  ))}
                </div>

                {/* Custom Officer override inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-xs">
                  <div>
                    <label className="text-[10px] text-slate-400 font-bold">Officer Name</label>
                    <input
                      type="text"
                      value={assignedOfficerName}
                      onChange={(e) => setAssignedOfficerName(e.target.value)}
                      className="w-full p-2 border border-slate-200 rounded-xl text-xs font-medium"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 font-bold">Official Email</label>
                    <input
                      type="email"
                      value={assignedOfficerEmail}
                      onChange={(e) => setAssignedOfficerEmail(e.target.value)}
                      className="w-full p-2 border border-slate-200 rounded-xl text-xs font-medium"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 font-bold">Direct Desk Phone</label>
                    <input
                      type="text"
                      value={assignedOfficerPhone}
                      onChange={(e) => setAssignedOfficerPhone(e.target.value)}
                      className="w-full p-2 border border-slate-200 rounded-xl text-xs font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* STEP 2: STRUCTURE APPROVED FACILITY TERMS */}
              <div className="space-y-4 pt-4 border-t border-slate-200">
                <label className="text-xs font-black uppercase text-sterling-navy tracking-wider flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-sterling-gold" />
                  2. Structure Approved Facility Terms
                </label>

                {/* Amount with quick shortcuts */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-700">Approved Loan Facility Amount ({selectedApp.currency || "USD"})</span>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => setAssignedAmount(selectedApp.amount)}
                        className="text-[10px] px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 font-bold text-slate-700"
                      >
                        100% Match ({formatMoney(selectedApp.amount, selectedApp.currency || "USD")})
                      </button>
                      <button
                        type="button"
                        onClick={() => setAssignedAmount(Math.round(selectedApp.amount * 0.9))}
                        className="text-[10px] px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 font-bold text-slate-700"
                      >
                        90% ({formatMoney(Math.round(selectedApp.amount * 0.9), selectedApp.currency || "USD")})
                      </button>
                      <button
                        type="button"
                        onClick={() => setAssignedAmount(Math.round(selectedApp.amount * 0.8))}
                        className="text-[10px] px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 font-bold text-slate-700"
                      >
                        80% ({formatMoney(Math.round(selectedApp.amount * 0.8), selectedApp.currency || "USD")})
                      </button>
                    </div>
                  </div>

                  <input
                    type="number"
                    step="500"
                    value={assignedAmount}
                    onChange={(e) => setAssignedAmount(parseFloat(e.target.value) || 0)}
                    className="w-full p-3 text-lg font-black text-sterling-navy border border-slate-300 rounded-2xl bg-white outline-none focus:border-sterling-navy"
                  />
                </div>

                {/* APR and Tenor */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Approved Fixed APR Rate (%)</label>
                    <input
                      type="number"
                      step="0.05"
                      value={assignedRate}
                      onChange={(e) => setAssignedRate(parseFloat(e.target.value) || 0)}
                      className="w-full p-2.5 text-base font-bold text-sterling-navy border border-slate-300 rounded-xl bg-white"
                    />
                    <div className="flex gap-1.5 pt-1">
                      {[2.50, 2.85, 3.10, 3.45].map((r) => (
                        <button
                          key={r}
                          type="button"
                          onClick={() => setAssignedRate(r)}
                          className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                            assignedRate === r ? "bg-sterling-navy text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                          }`}
                        >
                          {r.toFixed(2)}%
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Approved Repayment Tenor (Months)</label>
                    <select
                      value={assignedTermMonths}
                      onChange={(e) => setAssignedTermMonths(parseInt(e.target.value) || 36)}
                      className="w-full p-2.5 text-sm font-bold text-sterling-navy border border-slate-300 rounded-xl bg-white"
                    >
                      <option value={12}>12 Months (1 Year)</option>
                      <option value={24}>24 Months (2 Years)</option>
                      <option value={36}>36 Months (3 Years)</option>
                      <option value={48}>48 Months (4 Years)</option>
                      <option value={60}>60 Months (5 Years)</option>
                      <option value={84}>84 Months (7 Years)</option>
                      <option value={120}>120 Months (10 Years)</option>
                      <option value={240}>240 Months (20 Years)</option>
                      <option value={300}>300 Months (25 Years)</option>
                    </select>
                  </div>
                </div>

                {/* LIVE RECALCULATED AMORTIZATION PREVIEW */}
                <div className="p-4 bg-amber-50/70 border border-sterling-gold/40 rounded-2xl space-y-2">
                  <div className="text-xs font-bold text-sterling-navy flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-sterling-gold" />
                      Live Facility Amortization & Installment Calculation
                    </span>
                    <span className="text-[10px] text-emerald-700 font-bold">Standard Bank Annuity Formula</span>
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="p-2.5 bg-white rounded-xl shadow-xs border border-amber-200">
                      <div className="text-[10px] text-slate-400 font-bold">Approved Installment</div>
                      <div className="text-base font-black text-sterling-navy">
                        {formatMoney(liveAssignedMonthly, selectedApp.currency || "USD")}<span className="text-[10px] font-normal text-slate-500">/mo</span>
                      </div>
                    </div>

                    <div className="p-2.5 bg-white rounded-xl shadow-xs border border-amber-200">
                      <div className="text-[10px] text-slate-400 font-bold">Total Interest</div>
                      <div className="text-base font-black text-amber-700">
                        {formatMoney(liveAssignedInterest, selectedApp.currency || "USD")}
                      </div>
                    </div>

                    <div className="p-2.5 bg-white rounded-xl shadow-xs border border-amber-200">
                      <div className="text-[10px] text-slate-400 font-bold">Total Repayment</div>
                      <div className="text-base font-black text-emerald-700">
                        {formatMoney(liveAssignedTotal, selectedApp.currency || "USD")}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Disbursement Method and Timing */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Disbursement Channel</label>
                    <select
                      value={assignedDisbursementMethod}
                      onChange={(e) => setAssignedDisbursementMethod(e.target.value)}
                      className="w-full p-2.5 text-xs font-medium border border-slate-300 rounded-xl bg-white"
                    >
                      <option value="Direct Wire Transfer (SWIFT / Fedwire)">Direct Wire Transfer (SWIFT / Fedwire)</option>
                      <option value="ACH Direct Deposit (Next-Day Priority)">ACH Direct Deposit (Next-Day Priority)</option>
                      <option value="Bank Cashier's Certified Cheque">Bank Cashier&apos;s Certified Cheque</option>
                      <option value="Dealer / Escrow Direct Settlement">Dealer / Escrow Direct Settlement</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Target Disbursement Timing</label>
                    <select
                      value={assignedDisbursementDate}
                      onChange={(e) => setAssignedDisbursementDate(e.target.value)}
                      className="w-full p-2.5 text-xs font-medium border border-slate-300 rounded-xl bg-white"
                    >
                      <option value="Within 24 Hours of Digital Signature">Within 24 Hours of Digital Signature</option>
                      <option value="Immediate Release (Within 2 Hours)">Immediate Release (Within 2 Hours)</option>
                      <option value="Next Business Day (10:00 AM EST)">Next Business Day (10:00 AM EST)</option>
                      <option value="Upon Receipt of Supplementary KYC Documents">Upon Receipt of Supplementary KYC Documents</option>
                    </select>
                  </div>
                </div>

                {/* Underwriter Recommendation Note */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Underwriting Recommendation & Special Conditions</label>
                  <textarea
                    rows={2}
                    value={assignmentNote}
                    onChange={(e) => setAssignmentNote(e.target.value)}
                    placeholder="Enter instructions for client or credit committee rationale..."
                    className="w-full p-2.5 text-xs border border-slate-300 rounded-xl bg-white"
                  />
                </div>
              </div>

            </div>

            {/* Modal Decision Triggers */}
            <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setIsAssignModalOpen(false)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleExecuteAssignment("assign_only")}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all"
                >
                  Assign Officer Only (In Review)
                </button>

                <button
                  type="button"
                  onClick={() => handleExecuteAssignment("approve")}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold shadow-md transition-all flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                  Assign & Issue Approval Offer
                </button>

                <button
                  type="button"
                  onClick={() => handleExecuteAssignment("disburse")}
                  className="px-5 py-2.5 rounded-xl bg-sterling-navy hover:bg-sterling-navy-light text-white text-xs font-extrabold shadow-md transition-all flex items-center gap-1.5"
                >
                  <Banknote className="w-4 h-4 text-sterling-gold" />
                  Assign & Disburse Funds Now
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 2: PRINTABLE SANCTION LETTER PREVIEW */}
      {/* ======================================================== */}
      {isSanctionLetterOpen && selectedApp && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl border border-slate-200 my-8 space-y-6">
            
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div className="flex items-center gap-2">
                <Printer className="w-4 h-4 text-sterling-navy" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Official Sanction Document Preview</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="bg-sterling-navy text-white text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  Print / Save PDF
                </button>
                <button
                  onClick={() => setIsSanctionLetterOpen(false)}
                  className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-xs font-bold"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Document Letterhead */}
            <div className="space-y-6 text-slate-800 text-xs leading-relaxed border p-6 rounded-2xl bg-slate-50/50">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div>
                  <div className="text-lg font-black text-sterling-navy">STERLING BANK OF ASIA</div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-widest">Central Lending & Credit Administration Desk</div>
                  <div className="text-[10px] text-slate-400">Head Office • Registered Credit Institution</div>
                </div>
                <div className="text-right">
                  <div className="font-mono font-bold text-sterling-navy">{selectedApp.referenceNumber}</div>
                  <div className="text-[10px] text-slate-400">Date: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</div>
                </div>
              </div>

              <div>
                <p><strong>To:</strong> {selectedApp.civility} {selectedApp.applicantName}</p>
                <p><strong>Address:</strong> {selectedApp.address}, {selectedApp.city} {selectedApp.postalCode}</p>
                <p><strong>Email:</strong> {selectedApp.email}</p>
              </div>

              <div className="space-y-2">
                <h4 className="font-extrabold text-sm text-sterling-navy uppercase tracking-wide">
                  Subject: Formal Facility Sanction & Pre-Approval Letter
                </h4>
                <p>
                  Dear {selectedApp.applicantName},
                </p>
                <p>
                  We are pleased to inform you that your application for financing facility has been favorably evaluated and sanctioned by the Sterling Bank of Asia Credit Committee, under the supervision of your dedicated lending officer <strong>{selectedApp.assignedOfficer || "Emily Vance"}</strong>.
                </p>
              </div>

              {/* Sanction Terms Table */}
              <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
                <div className="bg-sterling-navy text-white p-2.5 font-bold text-xs flex justify-between">
                  <span>Sanctioned Facility Parameters</span>
                  <span>Sterling Bank Certified</span>
                </div>
                <div className="divide-y divide-slate-100 text-xs">
                  <div className="p-2.5 flex justify-between">
                    <span className="text-slate-500">Approved Facility Amount:</span>
                    <strong className="text-sterling-navy">{formatMoney(selectedApp.assignedAmount || selectedApp.amount, selectedApp.currency || "USD")}</strong>
                  </div>
                  <div className="p-2.5 flex justify-between">
                    <span className="text-slate-500">Contractual Fixed APR:</span>
                    <strong className="text-sterling-navy">{(selectedApp.assignedInterestRate || selectedApp.interestRate).toFixed(2)} %</strong>
                  </div>
                  <div className="p-2.5 flex justify-between">
                    <span className="text-slate-500">Repayment Period:</span>
                    <strong className="text-sterling-navy">{selectedApp.assignedTermMonths || selectedApp.termMonths} Months</strong>
                  </div>
                  <div className="p-2.5 flex justify-between">
                    <span className="text-slate-500">Monthly Contractual Installment:</span>
                    <strong className="text-emerald-700">{formatMoney(selectedApp.assignedMonthlyPayment || selectedApp.monthlyPayment, selectedApp.currency || "USD")} / month</strong>
                  </div>
                  <div className="p-2.5 flex justify-between">
                    <span className="text-slate-500">Disbursement Method:</span>
                    <strong className="text-slate-700">{selectedApp.assignedDisbursementMethod || "Direct Wire Transfer"}</strong>
                  </div>
                  <div className="p-2.5 flex justify-between">
                    <span className="text-slate-500">Assigned Lending Specialist:</span>
                    <strong className="text-indigo-700">{selectedApp.assignedOfficer || "Emily Vance"} ({selectedApp.assignedOfficerPhone || "+1 800 555-0199"})</strong>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <p className="text-[11px] text-slate-500">
                  This facility approval is binding subject to digital signature confirmation and standard regulatory compliance checks. Funds shall be released according to your nominated disbursement schedule.
                </p>
              </div>

              <div className="flex justify-between items-end pt-6 border-t border-slate-200">
                <div>
                  <div className="text-[10px] text-slate-400">Authorized Lending Officer</div>
                  <div className="font-extrabold text-xs text-sterling-navy">{selectedApp.assignedOfficer || "Emily Vance"}</div>
                  <div className="text-[10px] text-slate-500">Credit Risk & Underwriting Desk</div>
                </div>
                <div className="text-right">
                  <div className="w-24 border-b border-slate-400 mb-1"></div>
                  <div className="text-[10px] text-slate-400">Sterling Bank Digital Seal</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 3: MANUAL NEW APPLICATION / DOSSIER ENTRY */}
      {/* ======================================================== */}
      {isNewAppModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8 space-y-6">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-xl font-black text-sterling-navy">
                  Manual Credit Dossier Entry
                </h3>
                <p className="text-xs text-slate-500">
                  Register a walk-in, phone, or institutional financing applicant directly into the credit queue.
                </p>
              </div>
              <button
                onClick={() => setIsNewAppModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateNewApp} className="space-y-4 text-xs">
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-slate-600">Title</label>
                  <select
                    value={newAppForm.civility}
                    onChange={(e) => setNewAppForm({ ...newAppForm, civility: e.target.value })}
                    className="w-full p-2.5 border border-slate-200 rounded-xl"
                  >
                    <option value="Mr.">Mr.</option>
                    <option value="Ms.">Ms.</option>
                    <option value="Mrs.">Mrs.</option>
                    <option value="Dr.">Dr.</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="text-[10px] font-bold text-slate-600">Full Applicant Name</label>
                  <input
                    type="text"
                    required
                    value={newAppForm.applicantName}
                    onChange={(e) => setNewAppForm({ ...newAppForm, applicantName: e.target.value })}
                    placeholder="e.g. Alexander Wright"
                    className="w-full p-2.5 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-slate-600">Email</label>
                  <input
                    type="email"
                    required
                    value={newAppForm.email}
                    onChange={(e) => setNewAppForm({ ...newAppForm, email: e.target.value })}
                    placeholder="client@example.com"
                    className="w-full p-2.5 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-600">Phone</label>
                  <input
                    type="tel"
                    required
                    value={newAppForm.phone}
                    onChange={(e) => setNewAppForm({ ...newAppForm, phone: e.target.value })}
                    placeholder="+1 555-0199"
                    className="w-full p-2.5 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-slate-600">Product</label>
                  <select
                    value={newAppForm.loanType}
                    onChange={(e) => setNewAppForm({ ...newAppForm, loanType: e.target.value as any })}
                    className="w-full p-2.5 border border-slate-200 rounded-xl"
                  >
                    <option value="persona">Persona Personal Loan</option>
                    <option value="auto">Auto & Vehicle Loan</option>
                    <option value="home">Home & Renovation</option>
                    <option value="ecosolutions">EcoSolutions Green</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-600">Currency</label>
                  <select
                    value={newAppForm.currency}
                    onChange={(e) => setNewAppForm({ ...newAppForm, currency: e.target.value as any })}
                    className="w-full p-2.5 border border-slate-200 rounded-xl"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-600">Requested Amount</label>
                  <input
                    type="number"
                    step="1000"
                    value={newAppForm.amount}
                    onChange={(e) => setNewAppForm({ ...newAppForm, amount: parseFloat(e.target.value) || 0 })}
                    className="w-full p-2.5 border border-slate-200 rounded-xl font-bold text-sterling-navy"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-slate-600">Term (Months)</label>
                  <input
                    type="number"
                    value={newAppForm.termMonths}
                    onChange={(e) => setNewAppForm({ ...newAppForm, termMonths: parseInt(e.target.value) || 36 })}
                    className="w-full p-2.5 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-600">Monthly Net Income</label>
                  <input
                    type="number"
                    value={newAppForm.monthlyIncome}
                    onChange={(e) => setNewAppForm({ ...newAppForm, monthlyIncome: parseFloat(e.target.value) || 0 })}
                    className="w-full p-2.5 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-600">Monthly Expenses</label>
                  <input
                    type="number"
                    value={newAppForm.monthlyExpenses}
                    onChange={(e) => setNewAppForm({ ...newAppForm, monthlyExpenses: parseFloat(e.target.value) || 0 })}
                    className="w-full p-2.5 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-slate-600">Street Address</label>
                  <input
                    type="text"
                    value={newAppForm.address}
                    onChange={(e) => setNewAppForm({ ...newAppForm, address: e.target.value })}
                    placeholder="120 Main St"
                    className="w-full p-2.5 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-600">City</label>
                  <input
                    type="text"
                    value={newAppForm.city}
                    onChange={(e) => setNewAppForm({ ...newAppForm, city: e.target.value })}
                    placeholder="New York"
                    className="w-full p-2.5 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-600">Residence Type</label>
                  <select
                    value={newAppForm.residenceStatus}
                    onChange={(e) => setNewAppForm({ ...newAppForm, residenceStatus: e.target.value })}
                    className="w-full p-2.5 border border-slate-200 rounded-xl"
                  >
                    <option value="Tenant / Renting">Tenant / Renting</option>
                    <option value="Homeowner (Mortgaged)">Homeowner (Mortgaged)</option>
                    <option value="Homeowner (Outright)">Homeowner (Outright)</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsNewAppModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-sterling-navy hover:bg-sterling-navy-light text-white font-bold shadow-md"
                >
                  Create & Open Dossier
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
