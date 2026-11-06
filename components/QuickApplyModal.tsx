"use client";

import React, { useState } from "react";
import { 
  X, 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  Upload, 
  FileCheck2, 
  Lock,
  CheckCircle2
} from "lucide-react";
import { formatMoney, CurrencyCode } from "@/lib/utils";
import { addApplication } from "@/lib/loanStore";
import Link from "next/link";

interface QuickApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultLoanType?: string;
  defaultAmount?: number;
  defaultTenor?: number;
}

export default function QuickApplyModal({
  isOpen,
  onClose,
  defaultLoanType = "personnel",
  defaultAmount = 15000,
  defaultTenor = 48,
}: QuickApplyModalProps) {
  const [step, setStep] = useState(1);
  const [loanType, setLoanType] = useState(defaultLoanType);
  const [currency, setCurrency] = useState<CurrencyCode>("USD");
  const [amount, setAmount] = useState(defaultAmount);

  // Form State
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    birthDate: "",
    civilStatus: "Single",
    idType: "Passport / National ID",
    idNumber: "",
    address: "",
    postalCode: "",
    city: "",
    residenceOwnership: "Tenant",
    yearsAtResidence: "3",
    contractType: "Permanent Full-Time",
    employerName: "",
    jobTitle: "",
    netMonthlyIncome: "3500",
    hasOtherLoans: "No",
    consentRGPD: true,
    consentCreditCheck: true,
  });

  const [uploadedFiles, setUploadedFiles] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [applicationRef, setApplicationRef] = useState("");

  if (!isOpen) return null;

  const handleNext = () => {
    if (step < 5) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleFileDrop = (field: string, name: string) => {
    setUploadedFiles((prev) => ({ ...prev, [field]: name }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const created = addApplication({
      applicantName: `${formData.firstName} ${formData.lastName}`.trim() || "New Applicant",
      email: formData.email || "applicant@example.com",
      phone: formData.mobile || "+1 555-0199",
      loanType: (loanType as any) || "persona",
      loanTypeLabel: loanType === "persona" || loanType === "personnel" ? "Persona Personal Loan" : loanType === "auto" ? "Auto Loan Facility" : "Home Loan & Renovation",
      currency: currency,
      amount: amount,
      termMonths: defaultTenor || 36,
      monthlyPayment: Math.round((amount / (defaultTenor || 36)) * 1.05 * 100) / 100,
      monthlyIncome: parseFloat(formData.netMonthlyIncome) || 3500,
      address: formData.address || "Main Street",
      city: formData.city || "Metropolis",
      postalCode: formData.postalCode || "10001",
      employmentType: formData.contractType || "Full-Time",
    });

    setApplicationRef(created.referenceNumber);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-slate-200">
        
        {/* Modal Header */}
        <div className="bg-sterling-navy text-white px-6 py-4 flex items-center justify-between border-b border-sterling-navy-light/40">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-sterling-gold/20 flex items-center justify-center text-sterling-gold">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Online Digital Loan Application</h3>
              <p className="text-xs text-slate-300">
                {loanType === "personnel" || loanType === "persona" ? "Personal Loan" : loanType === "auto" ? "Auto Loan Facility" : "Home & Real Estate"} • 256-Bit SSL Encrypted
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper Indicator */}
        {!isSubmitted && (
          <div className="bg-slate-50 px-6 py-3 border-b border-slate-200">
            <div className="flex items-center justify-between max-w-xl mx-auto">
              {[
                { s: 1, label: "Identity" },
                { s: 2, label: "Residence" },
                { s: 3, label: "Employment" },
                { s: 4, label: "Documents" },
                { s: 5, label: "Review" },
              ].map((item) => (
                <div key={item.s} className="flex flex-col items-center">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      step === item.s
                        ? "bg-sterling-navy text-white ring-2 ring-sterling-gold"
                        : step > item.s
                        ? "bg-emerald-600 text-white"
                        : "bg-slate-200 text-slate-500"
                    }`}
                  >
                    {step > item.s ? <Check className="w-4 h-4 stroke-[3]" /> : item.s}
                  </div>
                  <span className={`text-[10px] mt-1 font-semibold ${step === item.s ? "text-sterling-navy font-bold" : "text-slate-400"}`}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {isSubmitted ? (
            /* SUBMISSION SUCCESS CONFIRMATION */
            <div className="text-center py-8 px-4 space-y-6 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-black text-sterling-navy font-display">
                  Application Successfully Submitted!
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Thank you, <span className="font-bold text-slate-800">{formData.firstName} {formData.lastName}</span>. Your application file has been registered.
                </p>
              </div>

              {/* Reference Box */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 max-w-sm mx-auto space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Application Reference Number
                </span>
                <div className="text-2xl font-black font-mono text-sterling-navy">
                  {applicationRef || "SBA-2026-9842"}
                </div>
                <div className="text-[11px] text-emerald-700 font-semibold pt-1">
                  Confirmation sent to {formData.email || "your email address"}
                </div>
              </div>

              {/* Next steps advice */}
              <div className="text-left max-w-md mx-auto bg-amber-50/60 border border-amber-200/70 rounded-2xl p-4 text-xs text-slate-700 space-y-2">
                <div className="font-bold text-amber-900">Next Steps:</div>
                <div>1. Preliminary review of documents within 24 business hours.</div>
                <div>2. Direct agreement issuance via secure digital signature.</div>
                <div>3. Fund disbursement to your verified bank account.</div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/tracker"
                  onClick={handleReset}
                  className="px-6 py-3 rounded-xl bg-sterling-navy hover:bg-sterling-navy-deep text-white font-bold text-xs uppercase tracking-wider shadow"
                >
                  Track Application Status
                </Link>
                <button
                  onClick={handleReset}
                  type="button"
                  className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs uppercase tracking-wider"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* STEP 1: Identity & Parameters */}
              {step === 1 && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div className="border-b border-slate-100 pb-2">
                    <h4 className="text-base font-bold text-sterling-navy">Step 1: Financing Parameters & Identity</h4>
                    <p className="text-xs text-slate-500">Select currency and provide your primary identity details.</p>
                  </div>

                  {/* Currency Picker */}
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700">Loan Currency:</span>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setCurrency("USD")}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          currency === "USD"
                            ? "bg-sterling-navy text-white shadow-sm"
                            : "bg-white text-slate-600 border border-slate-200"
                        }`}
                      >
                        USD ($)
                      </button>
                      <button
                        type="button"
                        onClick={() => setCurrency("EUR")}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          currency === "EUR"
                            ? "bg-sterling-navy text-white shadow-sm"
                            : "bg-white text-slate-600 border border-slate-200"
                        }`}
                      >
                        EUR (€)
                      </button>
                    </div>
                  </div>

                  {/* Amount input */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Desired Capital: {currency === "EUR" ? "€" : "$"}{amount.toLocaleString()}
                    </label>
                    <input
                      type="range"
                      min="5000"
                      max="1000000"
                      step="5000"
                      value={amount}
                      onChange={(e) => setAmount(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sterling-gold"
                    />
                  </div>

                  {/* Names */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">First Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="John"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none focus:border-sterling-gold focus:ring-1 focus:ring-sterling-gold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Last Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="Smith"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none focus:border-sterling-gold focus:ring-1 focus:ring-sterling-gold"
                      />
                    </div>
                  </div>

                  {/* Email & Mobile */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="john.smith@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none focus:border-sterling-gold focus:ring-1 focus:ring-sterling-gold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Mobile Phone (WhatsApp enabled) *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+1 555-0199"
                        value={formData.mobile}
                        onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none focus:border-sterling-gold focus:ring-1 focus:ring-sterling-gold"
                      />
                    </div>
                  </div>

                  {/* Date of Birth & ID Type */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Date of Birth *</label>
                      <input
                        type="date"
                        required
                        value={formData.birthDate}
                        onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none focus:border-sterling-gold focus:ring-1 focus:ring-sterling-gold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Identification Document Type *</label>
                      <select
                        value={formData.idType}
                        onChange={(e) => setFormData({ ...formData, idType: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none bg-white"
                      >
                        <option>International Passport</option>
                        <option>National Identity Card</option>
                        <option>Driver&apos;s License</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Residence & Housing Status */}
              {step === 2 && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div className="border-b border-slate-100 pb-2">
                    <h4 className="text-base font-bold text-sterling-navy">Step 2: Residential Address & Living Details</h4>
                    <p className="text-xs text-slate-500">Provide your current registered residential address.</p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Street Address *</label>
                    <input
                      type="text"
                      required
                      placeholder="123 Banking Blvd, Suite 400"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none focus:border-sterling-gold"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Postal / ZIP Code *</label>
                      <input
                        type="text"
                        required
                        placeholder="10001"
                        value={formData.postalCode}
                        onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none focus:border-sterling-gold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">City / Region *</label>
                      <input
                        type="text"
                        required
                        placeholder="New York / London"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none focus:border-sterling-gold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Housing Status *</label>
                      <select
                        value={formData.residenceOwnership}
                        onChange={(e) => setFormData({ ...formData, residenceOwnership: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none bg-white"
                      >
                        <option>Homeowner without mortgage</option>
                        <option>Homeowner with active mortgage</option>
                        <option>Tenant (Renting)</option>
                        <option>Corporate Housing / Family</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Years at Current Address *</label>
                      <select
                        value={formData.yearsAtResidence}
                        onChange={(e) => setFormData({ ...formData, yearsAtResidence: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none bg-white"
                      >
                        <option>Less than 1 year</option>
                        <option>1 to 2 years</option>
                        <option>3 to 5 years</option>
                        <option>More than 5 years</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Professional Employment & Income */}
              {step === 3 && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div className="border-b border-slate-100 pb-2">
                    <h4 className="text-base font-bold text-sterling-navy">Step 3: Professional Employment & Cashflow</h4>
                    <p className="text-xs text-slate-500">To evaluate repayment capability under responsible lending standards.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Employment Type *</label>
                      <select
                        value={formData.contractType}
                        onChange={(e) => setFormData({ ...formData, contractType: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none bg-white"
                      >
                        <option>Permanent Full-Time</option>
                        <option>Executive / Senior Management</option>
                        <option>Business Owner / Corporate Officer</option>
                        <option>Independent Professional / Consultant</option>
                        <option>Civil Servant / Public Sector</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Net Monthly Income ({currency === "EUR" ? "€" : "$"}) *</label>
                      <input
                        type="number"
                        required
                        value={formData.netMonthlyIncome}
                        onChange={(e) => setFormData({ ...formData, netMonthlyIncome: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none focus:border-sterling-gold font-mono font-bold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Employer / Company Name *</label>
                      <input
                        type="text"
                        placeholder="Acme Global Corporation"
                        value={formData.employerName}
                        onChange={(e) => setFormData({ ...formData, employerName: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none focus:border-sterling-gold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Job Title / Role</label>
                      <input
                        type="text"
                        placeholder="Senior Operations Director"
                        value={formData.jobTitle}
                        onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none focus:border-sterling-gold"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: KYC Document Upload */}
              {step === 4 && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div className="border-b border-slate-100 pb-2">
                    <h4 className="text-base font-bold text-sterling-navy">Step 4: Required Documentation & Proof</h4>
                    <p className="text-xs text-slate-500">Upload clear photographs or digital PDFs for expedited 24h assessment.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* ID Document */}
                    <div className="p-4 bg-slate-50 border border-dashed border-slate-300 rounded-2xl text-center space-y-2 hover:border-sterling-gold transition-colors">
                      <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-sterling-gold mx-auto">
                        <Upload className="w-5 h-5" />
                      </div>
                      <div className="text-xs font-bold text-slate-700">1. Valid Identity Document</div>
                      <div className="text-[11px] text-slate-400 mb-2">Passport or Government ID</div>
                      <button
                        type="button"
                        onClick={() => handleFileDrop("id", "Government_ID.pdf")}
                        className={`w-full py-1.5 px-3 rounded-lg text-xs font-semibold transition-all ${
                          uploadedFiles.id ? "bg-emerald-100 text-emerald-800" : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        {uploadedFiles.id ? `✓ ${uploadedFiles.id}` : "Choose File"}
                      </button>
                    </div>

                    {/* Proof of Income */}
                    <div className="p-4 bg-slate-50 border border-dashed border-slate-300 rounded-2xl text-center space-y-2 hover:border-sterling-gold transition-colors">
                      <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-sterling-gold mx-auto">
                        <Upload className="w-5 h-5" />
                      </div>
                      <div className="text-xs font-bold text-slate-700">2. Proof of Income</div>
                      <div className="text-[11px] text-slate-400 mb-2">Recent pay statement or tax return</div>
                      <button
                        type="button"
                        onClick={() => handleFileDrop("income", "Proof_Income.pdf")}
                        className={`w-full py-1.5 px-3 rounded-lg text-xs font-semibold transition-all ${
                          uploadedFiles.income ? "bg-emerald-100 text-emerald-800" : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        {uploadedFiles.income ? `✓ ${uploadedFiles.income}` : "Choose File"}
                      </button>
                    </div>

                    {/* Bank Details */}
                    <div className="p-4 bg-slate-50 border border-dashed border-slate-300 rounded-2xl text-center space-y-2 hover:border-sterling-gold transition-colors">
                      <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-sterling-gold mx-auto">
                        <Upload className="w-5 h-5" />
                      </div>
                      <div className="text-xs font-bold text-slate-700">3. Bank Account Proof</div>
                      <div className="text-[11px] text-slate-400 mb-2">Account statement for wire transfer</div>
                      <button
                        type="button"
                        onClick={() => handleFileDrop("bank", "Bank_Statement.pdf")}
                        className={`w-full py-1.5 px-3 rounded-lg text-xs font-semibold transition-all ${
                          uploadedFiles.bank ? "bg-emerald-100 text-emerald-800" : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        {uploadedFiles.bank ? `✓ ${uploadedFiles.bank}` : "Choose File"}
                      </button>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-500 italic text-center">
                    Accepted formats: PDF, JPG, PNG (Max 15MB per file). Documents are stored in secure encrypted vaults.
                  </div>
                </div>
              )}

              {/* STEP 5: Review & Digital Confirmation */}
              {step === 5 && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div className="border-b border-slate-100 pb-2">
                    <h4 className="text-base font-bold text-sterling-navy">Step 5: Review & Digital Confirmation</h4>
                    <p className="text-xs text-slate-500">Please review your submitted details before encrypted transmission.</p>
                  </div>

                  {/* Summary Box */}
                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Applicant:</span>
                      <span className="font-bold text-slate-800">{formData.firstName} {formData.lastName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Credit Facility:</span>
                      <span className="font-bold text-sterling-navy">{loanType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Requested Amount:</span>
                      <span className="font-black text-sterling-gold font-mono">{currency === "EUR" ? "€" : "$"}{amount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Contact Email:</span>
                      <span className="font-bold text-slate-800">{formData.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Mobile Phone:</span>
                      <span className="font-bold text-slate-800">{formData.mobile}</span>
                    </div>
                  </div>

                  {/* Legal Checkboxes */}
                  <div className="space-y-3 pt-2">
                    <label className="flex items-start gap-2.5 text-xs text-slate-600 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.consentRGPD}
                        onChange={(e) => setFormData({ ...formData, consentRGPD: e.target.checked })}
                        className="mt-0.5 rounded border-slate-300 text-sterling-navy focus:ring-sterling-gold"
                      />
                      <span>
                        I accept the processing of my personal data by Sterling Bank of Asia in accordance with privacy laws and banking confidentiality regulations.
                      </span>
                    </label>

                    <label className="flex items-start gap-2.5 text-xs text-slate-600 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.consentCreditCheck}
                        onChange={(e) => setFormData({ ...formData, consentCreditCheck: e.target.checked })}
                        className="mt-0.5 rounded border-slate-300 text-sterling-navy focus:ring-sterling-gold"
                      />
                      <span>
                        I certify that the information provided is accurate and authorize Sterling Bank of Asia to perform necessary financial due diligence.
                      </span>
                    </label>
                  </div>
                </div>
              )}

              {/* Navigation buttons */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Previous</span>
                  </button>
                ) : <div />}

                {step < 5 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-6 py-2.5 rounded-xl bg-sterling-navy hover:bg-sterling-navy-deep text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow"
                  >
                    <span>Continue to Step {step + 1}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-7 py-3 rounded-xl bg-gradient-to-r from-sterling-gold to-sterling-gold-light hover:from-amber-600 hover:to-sterling-gold text-white text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-lg transition-all"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Transmit Encrypted Application</span>
                  </button>
                )}
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
}
