"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { addApplication } from "@/lib/loanStore";
import { formatEUR, formatMoney, CurrencyCode } from "@/lib/utils";
import { 
  Building2, 
  FileCheck2, 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  Lock, 
  ShieldCheck, 
  CheckCircle2, 
  Upload, 
  FileText,
  User,
  Home,
  Briefcase,
  AlertCircle
} from "lucide-react";

export default function ApplyPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loanType, setLoanType] = useState<"persona" | "auto" | "home" | "ecosolutions">("persona");
  const [currency, setCurrency] = useState<CurrencyCode>("USD");
  const [amount, setAmount] = useState(15000);
  const [tenorMonths, setTenorMonths] = useState(36);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [refNumber, setRefNumber] = useState("");

  const [formData, setFormData] = useState({
    civility: "Mr.",
    firstName: "",
    lastName: "",
    birthDate: "",
    phone: "",
    email: "",
    address: "",
    postalCode: "",
    city: "",
    residenceStatus: "Tenant / Renting",
    employment: "Employed Full-Time (Permanent)",
    monthlyIncome: "5000",
    monthlyExpenses: "1200",
    consentRGPD: true,
    consentFICP: true,
  });

  const [uploadedFiles, setUploadedFiles] = useState<{ [key: string]: string }>({});

  const handleFileDrop = (field: string, name: string) => {
    setUploadedFiles(prev => ({ ...prev, [field]: name }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const created = addApplication({
      applicantName: `${formData.firstName} ${formData.lastName}`.trim() || "New Applicant",
      email: formData.email,
      phone: formData.phone,
      loanType: loanType,
      loanTypeLabel: 
        loanType === "persona" ? "Persona Personal Loan" : 
        loanType === "auto" ? "Auto & Vehicle Loan" : 
        loanType === "home" ? "Home Loan & Renovation" : 
        "Private Investment & Corporate Lending",
      currency: currency,
      amount: amount,
      termMonths: tenorMonths,
      monthlyPayment: Math.round((amount / tenorMonths) * 1.05 * 100) / 100,
      monthlyIncome: parseFloat(formData.monthlyIncome) || 5000,
      monthlyExpenses: parseFloat(formData.monthlyExpenses) || 1200,
      address: formData.address,
      city: formData.city,
      postalCode: formData.postalCode,
      employmentType: formData.employment,
    });

    setRefNumber(created.referenceNumber);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 font-sans text-slate-800">
      <Navbar />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-200">
          
          {!isSubmitted ? (
            <>
              {/* Stepper Header */}
              <div className="border-b border-slate-100 pb-6 mb-8 text-center space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sterling-gold/15 text-sterling-gold text-xs font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Online Application • 256-Bit SSL Encryption
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-sterling-navy font-display tracking-tight">
                  Financing & Credit Facility Application
                </h1>
                <p className="text-xs text-slate-500">
                  Complete your application in 5 straightforward steps to receive immediate preliminary underwriting feedback.
                </p>

                {/* Stepper Dots */}
                <div className="flex items-center justify-between max-w-md mx-auto pt-4">
                  {[
                    { s: 1, label: "Project" },
                    { s: 2, label: "Identity" },
                    { s: 3, label: "Income" },
                    { s: 4, label: "Documents" },
                    { s: 5, label: "Review" },
                  ].map((item) => (
                    <div key={item.s} className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        step === item.s 
                          ? "bg-sterling-navy text-white ring-2 ring-sterling-gold ring-offset-2"
                          : step > item.s
                          ? "bg-emerald-600 text-white"
                          : "bg-slate-100 text-slate-400"
                      }`}>
                        {step > item.s ? <Check className="w-4 h-4" /> : item.s}
                      </div>
                      <span className="text-[10px] font-semibold text-slate-500 mt-1 hidden sm:block">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form Content by Step */}
              <form onSubmit={step === 5 ? handleSubmit : (e) => { e.preventDefault(); setStep(step + 1); }}>
                
                {/* STEP 1: Loan Parameters */}
                {step === 1 && (
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                      <div>
                        <h3 className="text-base font-bold text-sterling-navy">Step 1: Financing Facility Parameters</h3>
                        <p className="text-xs text-slate-500">Official currencies: USD ($) & EUR (€) exclusively</p>
                      </div>

                      {/* Currency Toggle */}
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-500">Currency:</span>
                        <div className="inline-flex rounded-xl p-1 bg-slate-100 border border-slate-200">
                          <button
                            type="button"
                            onClick={() => setCurrency("USD")}
                            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                              currency === "USD"
                                ? "bg-sterling-navy text-white shadow-sm"
                                : "text-slate-600 hover:text-slate-900"
                            }`}
                          >
                            USD ($)
                          </button>
                          <button
                            type="button"
                            onClick={() => setCurrency("EUR")}
                            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                              currency === "EUR"
                                ? "bg-sterling-navy text-white shadow-sm"
                                : "text-slate-600 hover:text-slate-900"
                            }`}
                          >
                            EUR (€)
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Loan Product Selection */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {[
                        { id: "persona", label: "Persona Personal Loan", desc: "Multi-purpose personal financing" },
                        { id: "auto", label: "Auto & Vehicle Loan", desc: "New & pre-owned vehicle financing" },
                        { id: "home", label: "Home Loan & Renovation", desc: "Renovation & residential upgrades" },
                        { id: "ecosolutions", label: "Private & Corporate", desc: "Capital facility $100k-$500M" },
                      ].map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => {
                            setLoanType(t.id as any);
                            if (t.id === "ecosolutions" && amount < 100000) {
                              setAmount(1000000);
                              setTenorMonths(120);
                            } else if (t.id !== "ecosolutions" && amount > 75000) {
                              setAmount(15000);
                              setTenorMonths(36);
                            }
                          }}
                          className={`p-3 rounded-xl border text-left transition-all ${
                            loanType === t.id
                              ? "border-sterling-gold bg-amber-50/60 shadow-sm ring-1 ring-sterling-gold"
                              : "border-slate-200 hover:border-slate-300 bg-white"
                          }`}
                        >
                          <div className="text-xs font-bold text-sterling-navy leading-tight">{t.label}</div>
                          <div className="text-[10px] text-slate-500 mt-1 leading-tight">{t.desc}</div>
                        </button>
                      ))}
                    </div>

                    {/* Amount Range Slider */}
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-xs font-bold text-slate-700">
                          Requested Loan Amount ({currency === "USD" ? "USD $" : "EUR €"})
                        </label>
                        <span className="text-xl font-black text-sterling-navy font-mono">
                          {formatMoney(amount, currency)}
                        </span>
                      </div>
                      <input
                        type="range"
                        min={loanType === "ecosolutions" ? 100000 : 1000}
                        max={loanType === "ecosolutions" ? 500000000 : 75000}
                        step={loanType === "ecosolutions" ? 100000 : 500}
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sterling-navy"
                      />
                      <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                        <span>Min: {loanType === "ecosolutions" ? formatMoney(100000, currency) : formatMoney(1000, currency)}</span>
                        <span>Max: {loanType === "ecosolutions" ? formatMoney(500000000, currency) : formatMoney(75000, currency)}</span>
                      </div>
                    </div>

                    {/* Duration / Tenor */}
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-xs font-bold text-slate-700">Repayment Term</label>
                        <span className="text-base font-bold text-sterling-navy font-mono">
                          {tenorMonths} months ({Math.round((tenorMonths / 12) * 10) / 10} yrs)
                        </span>
                      </div>
                      <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                        {(loanType === "ecosolutions" 
                          ? [12, 36, 60, 120, 180, 240, 300] 
                          : [12, 24, 36, 48, 60, 72, 84]
                        ).map((m) => (
                          <button
                            key={m}
                            type="button"
                            onClick={() => setTenorMonths(m)}
                            className={`py-2 rounded-xl text-xs font-bold border transition-colors ${
                              tenorMonths === m
                                ? "bg-sterling-navy text-white border-sterling-navy shadow-sm"
                                : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                            }`}
                          >
                            {m >= 12 ? `${m / 12} yr${m > 12 ? "s" : ""}` : `${m} mos`}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 2: Personal Identity */}
                {step === 2 && (
                  <div className="space-y-4">
                    <h3 className="text-base font-bold text-sterling-navy">Step 2: Personal Contact Details</h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">First Name *</label>
                        <input
                          type="text"
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          placeholder="e.g. David"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium outline-none focus:ring-2 focus:ring-sterling-gold"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Last Name *</label>
                        <input
                          type="text"
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          placeholder="e.g. Harrison"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium outline-none focus:ring-2 focus:ring-sterling-gold"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="david.harrison@example.com"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium outline-none focus:ring-2 focus:ring-sterling-gold"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Phone Number *</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+1 (555) 234-5678"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium outline-none focus:ring-2 focus:ring-sterling-gold"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-slate-700 mb-1">Residential Address *</label>
                        <input
                          type="text"
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          placeholder="Street address, building, suite"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium outline-none focus:ring-2 focus:ring-sterling-gold"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Postal / ZIP Code *</label>
                        <input
                          type="text"
                          value={formData.postalCode}
                          onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                          placeholder="10001"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium outline-none focus:ring-2 focus:ring-sterling-gold"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 3: Financial Profile */}
                {step === 3 && (
                  <div className="space-y-4">
                    <h3 className="text-base font-bold text-sterling-navy">Step 3: Professional Profile & Income</h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Employment Type</label>
                        <select
                          value={formData.employment}
                          onChange={(e) => setFormData({ ...formData, employment: e.target.value })}
                          className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium bg-white outline-none"
                        >
                          <option value="Employed Full-Time (Permanent)">Employed Full-Time (Permanent)</option>
                          <option value="Self-Employed / Business Owner">Self-Employed / Business Owner</option>
                          <option value="Public Sector / Government">Public Sector / Government</option>
                          <option value="Retired">Retired</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Residential Status</label>
                        <select
                          value={formData.residenceStatus}
                          onChange={(e) => setFormData({ ...formData, residenceStatus: e.target.value })}
                          className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium bg-white outline-none"
                        >
                          <option value="Tenant / Renting">Tenant / Renting</option>
                          <option value="Homeowner (No Mortgage)">Homeowner (No Mortgage)</option>
                          <option value="Homeowner (Active Mortgage)">Homeowner (Active Mortgage)</option>
                          <option value="Living with Family">Living with Family</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Net Monthly Income ($ / €) *</label>
                        <input
                          type="number"
                          value={formData.monthlyIncome}
                          onChange={(e) => setFormData({ ...formData, monthlyIncome: e.target.value })}
                          placeholder="5000"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-sterling-navy outline-none"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Monthly Rent / Mortgage Expenses ($ / €)</label>
                        <input
                          type="number"
                          value={formData.monthlyExpenses}
                          onChange={(e) => setFormData({ ...formData, monthlyExpenses: e.target.value })}
                          placeholder="1200"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 4: Document Uploads */}
                {step === 4 && (
                  <div className="space-y-4">
                    <h3 className="text-base font-bold text-sterling-navy">Step 4: Verification Document Upload (KYC)</h3>
                    <p className="text-xs text-slate-500">Accepted formats: PDF, JPG, PNG (Max 10 MB per file, AES-256 encrypted).</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { id: "cni", label: "Government Photo ID (Passport / ID Card)" },
                        { id: "payslips", label: "Recent Pay Stub or Income Proof" },
                        { id: "tax", label: "Recent Tax Return / Annual Filing" },
                        { id: "rib", label: "Bank Account Details (Wire / Routing)" },
                      ].map((doc) => (
                        <div key={doc.id} className="p-4 border-2 border-dashed border-slate-200 hover:border-sterling-gold rounded-2xl flex flex-col items-center justify-center text-center p-4 transition-colors">
                          <Upload className="w-6 h-6 text-sterling-gold mb-1" />
                          <div className="text-xs font-bold text-slate-700">{doc.label}</div>
                          <span className="text-[10px] text-slate-400 mt-0.5">
                            {uploadedFiles[doc.id] || "Drag & drop or choose file"}
                          </span>
                          <input
                            type="file"
                            className="hidden"
                            id={`file-${doc.id}`}
                            onChange={(e) => e.target.files && handleFileDrop(doc.id, e.target.files[0].name)}
                          />
                          <label
                            htmlFor={`file-${doc.id}`}
                            className="mt-2 px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[10px] font-bold cursor-pointer transition-colors"
                          >
                            Browse Files
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 5: Consents & Validation */}
                {step === 5 && (
                  <div className="space-y-6">
                    <h3 className="text-base font-bold text-sterling-navy">Step 5: Facility Summary & Authorization</h3>

                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Applicant:</span>
                        <span className="font-bold text-slate-800">{formData.firstName} {formData.lastName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Selected Currency:</span>
                        <span className="font-bold text-sterling-navy">{currency === "USD" ? "USD ($) US Dollar" : "EUR (€) Euro"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Requested Facility:</span>
                        <span className="font-bold text-sterling-navy font-mono text-sm">{formatMoney(amount, currency)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Repayment Term:</span>
                        <span className="font-bold text-slate-800">{tenorMonths} months ({Math.round((tenorMonths / 12) * 10) / 10} yrs)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Estimated Monthly Installment:</span>
                        <span className="font-bold text-emerald-700 font-mono text-sm">{formatMoney(Math.round((amount / tenorMonths) * 1.05 * 100) / 100, currency)} / mo</span>
                      </div>
                    </div>

                    <div className="space-y-2 text-xs">
                      <label className="flex items-start gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.consentRGPD}
                          onChange={(e) => setFormData({ ...formData, consentRGPD: e.target.checked })}
                          className="mt-0.5 text-sterling-navy"
                          required
                        />
                        <span className="text-slate-600">
                          I certify that all details provided in this application are accurate and consent to secure data processing under banking confidentiality standards.
                        </span>
                      </label>

                      <label className="flex items-start gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.consentFICP}
                          onChange={(e) => setFormData({ ...formData, consentFICP: e.target.checked })}
                          className="mt-0.5 text-sterling-navy"
                          required
                        />
                        <span className="text-slate-600">
                          I authorize Sterling Bank of Asia to perform credit bureau inquiries and financial solvency checks for this facility request.
                        </span>
                      </label>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center pt-8 border-t border-slate-100 mt-8">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={() => setStep(step - 1)}
                      className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 flex items-center gap-1.5 transition-colors"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      Back
                    </button>
                  ) : <div />}

                  {step < 5 ? (
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-sterling-navy hover:bg-sterling-navy-light text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-md"
                    >
                      Next Step
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="px-7 py-3 rounded-xl bg-gradient-to-r from-sterling-gold via-sterling-gold-light to-sterling-gold text-sterling-navy-deep font-black text-xs sm:text-sm shadow-lg hover:scale-[1.01] transition-all flex items-center gap-2"
                    >
                      <Lock className="w-4 h-4" />
                      Submit Application Securely
                    </button>
                  )}
                </div>

              </form>
            </>
          ) : (
            /* Success confirmation */
            <div className="text-center py-8 space-y-6 max-w-md mx-auto">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-600/20">
                <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
              </div>
              
              <div className="space-y-2">
                <h2 className="text-2xl font-black text-sterling-navy font-display">
                  Application Successfully Submitted!
                </h2>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Thank you, <span className="font-bold text-slate-800">{formData.firstName} {formData.lastName}</span>. Your facility application has been routed to our credit underwriting committee.
                </p>
              </div>

              <div className="bg-slate-50 border-2 border-dashed border-sterling-gold/60 rounded-2xl p-4 text-center space-y-1">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Application Reference Number
                </div>
                <div className="text-xl font-mono font-black text-sterling-navy tracking-wider">
                  {refNumber}
                </div>
                <div className="text-[11px] text-emerald-700 font-semibold pt-1">
                  ✓ Confirmation email dispatched to {formData.email}
                </div>
              </div>

              <div className="space-y-2">
                <Link
                  href="/dashboard"
                  className="w-full py-3.5 rounded-xl bg-sterling-navy hover:bg-sterling-navy-light text-white font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <span>Access Client Portal (Dashboard)</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/"
                  className="w-full py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 transition-colors block text-center"
                >
                  Return to Home Page
                </Link>
              </div>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
