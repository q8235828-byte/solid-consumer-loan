"use client";

import React, { useState } from "react";
import { 
  X, 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  Upload, 
  ShieldCheck, 
  User, 
  Home, 
  Briefcase, 
  FileText, 
  FileCheck2, 
  Sparkles,
  Lock,
  Phone,
  Mail,
  CheckCircle2
} from "lucide-react";
import { formatPHP } from "@/lib/utils";

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
  defaultLoanType = "persona",
  defaultAmount = 300000,
  defaultTenor = 36,
}: QuickApplyModalProps) {
  const [step, setStep] = useState(1);
  const [loanType, setLoanType] = useState(defaultLoanType);
  const [amount, setAmount] = useState(defaultAmount);
  const [tenor, setTenor] = useState(defaultTenor);

  // Form State
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    birthDate: "",
    civilStatus: "Single",
    idType: "Philippine National ID (PhilSys)",
    idNumber: "",
    address: "",
    residenceOwnership: "Owned",
    yearsAtResidence: "3",
    employerName: "",
    jobTitle: "",
    employmentStatus: "Regular",
    grossMonthlyIncome: "45000",
    yearsWithCompany: "2",
    consentPrivacy: true,
    consentBSP: true,
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
    const refNum = `SBA-LN-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, "0")}-${Math.floor(10000 + Math.random() * 90000)}`;
    setApplicationRef(refNum);
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
              <h3 className="text-base font-bold text-white">Sterling Digital Loan Onboarding</h3>
              <p className="text-xs text-slate-300">
                {loanType === "persona" ? "Persona Personal Loan" : loanType === "auto" ? "Ultima Auto Loan" : "Discovery Home Loan"} • Confidential & Encrypted
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
                { s: 4, label: "KYC Upload" },
                { s: 5, label: "Consent & Submit" },
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
                    {step > item.s ? <Check className="w-3.5 h-3.5" /> : item.s}
                  </div>
                  <span className="text-[10px] font-medium text-slate-500 mt-1 hidden sm:block">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="overflow-y-auto flex-1 p-6 sm:p-8">
          {isSubmitted ? (
            /* Success Screen */
            <div className="text-center py-8 space-y-6 max-w-md mx-auto">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-600/20">
                <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
              </div>
              
              <div className="space-y-2">
                <h4 className="text-2xl font-black text-sterling-navy font-display">
                  Application Submitted Successfully!
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Thank you, <span className="font-bold text-slate-800">{formData.firstName} {formData.lastName}</span>. Your digital loan application has been queued to Sterling Bank of Asia&apos;s Retail Credit Evaluation team.
                </p>
              </div>

              {/* Reference ID Card */}
              <div className="bg-slate-50 border-2 border-dashed border-sterling-gold/60 rounded-2xl p-4 text-center space-y-1">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Application Reference ID
                </div>
                <div className="text-xl font-mono font-black text-sterling-navy tracking-wider">
                  {applicationRef}
                </div>
                <div className="text-[11px] text-emerald-700 font-semibold pt-1">
                  ✓ SMS & Email confirmation sent to {formData.mobile || "+63 9xx xxx xxxx"}
                </div>
              </div>

              <div className="text-left bg-blue-50/70 border border-blue-100 rounded-xl p-4 text-xs text-slate-600 space-y-1.5">
                <div className="font-bold text-sterling-navy">Next Steps:</div>
                <div>1. A Sterling Bank loan verification officer will review your documents within 24 hours.</div>
                <div>2. You may receive an SMS notification once your credit evaluation is complete.</div>
                <div>3. You can track status anytime on our website using your Reference ID.</div>
              </div>

              <button
                onClick={handleReset}
                className="w-full bg-sterling-navy hover:bg-sterling-navy-light text-white font-bold py-3 rounded-xl transition-all shadow-md"
              >
                Return to Homepage
              </button>
            </div>
          ) : (
            /* Wizard Steps */
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* STEP 1: Personal & Identity Information */}
              {step === 1 && (
                <div className="space-y-4 animate-in fade-in">
                  <div className="border-b border-slate-100 pb-2">
                    <h4 className="text-base font-bold text-sterling-navy">Step 1: Personal Information</h4>
                    <p className="text-xs text-slate-500">Provide legal identity information as it appears on government IDs.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">First Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        placeholder="Juan"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-sterling-gold focus:border-sterling-gold outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Last Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        placeholder="Dela Cruz"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-sterling-gold focus:border-sterling-gold outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Mobile Number (PH +63) *</label>
                      <input
                        type="tel"
                        required
                        value={formData.mobile}
                        onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                        placeholder="09171234567"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-sterling-gold focus:border-sterling-gold outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="juan.delacruz@gmail.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-sterling-gold focus:border-sterling-gold outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Primary Government ID Type</label>
                      <select
                        value={formData.idType}
                        onChange={(e) => setFormData({ ...formData, idType: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-sterling-gold focus:border-sterling-gold outline-none bg-white"
                      >
                        <option>Philippine National ID (PhilSys)</option>
                        <option>Passport</option>
                        <option>Driver&apos;s License (LTO)</option>
                        <option>UMID / SSS</option>
                        <option>TIN Card (BIR)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">ID Number *</label>
                      <input
                        type="text"
                        required
                        value={formData.idNumber}
                        onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
                        placeholder="XXXX-XXXX-XXXX-XXXX"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-sterling-gold focus:border-sterling-gold outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Residential Details */}
              {step === 2 && (
                <div className="space-y-4 animate-in fade-in">
                  <div className="border-b border-slate-100 pb-2">
                    <h4 className="text-base font-bold text-sterling-navy">Step 2: Residential & Address</h4>
                    <p className="text-xs text-slate-500">Bangko Sentral ng Pilipinas KYC tenure requirements.</p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Current Complete Home Address *</label>
                    <textarea
                      rows={2}
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="Unit / House No., Street, Barangay, City, Province, Postal Code"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-sterling-gold focus:border-sterling-gold outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Home Ownership Status</label>
                      <select
                        value={formData.residenceOwnership}
                        onChange={(e) => setFormData({ ...formData, residenceOwnership: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-sterling-gold focus:border-sterling-gold outline-none bg-white"
                      >
                        <option>Owned (Fully Paid)</option>
                        <option>Mortgaged (Under Bank Loan)</option>
                        <option>Rented / Leased</option>
                        <option>Living with Parents / Relatives</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Years at Current Address</label>
                      <input
                        type="number"
                        min="1"
                        max="50"
                        value={formData.yearsAtResidence}
                        onChange={(e) => setFormData({ ...formData, yearsAtResidence: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-sterling-gold focus:border-sterling-gold outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Employment & Income */}
              {step === 3 && (
                <div className="space-y-4 animate-in fade-in">
                  <div className="border-b border-slate-100 pb-2">
                    <h4 className="text-base font-bold text-sterling-navy">Step 3: Employment & Income Capacity</h4>
                    <p className="text-xs text-slate-500">Minimum monthly income requirement: ₱30,000 for Persona Personal Loan.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Employer / Company Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.employerName}
                        onChange={(e) => setFormData({ ...formData, employerName: e.target.value })}
                        placeholder="Acme Philippines Corp."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-sterling-gold focus:border-sterling-gold outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Current Job Title *</label>
                      <input
                        type="text"
                        required
                        value={formData.jobTitle}
                        onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                        placeholder="Senior Operations Analyst"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-sterling-gold focus:border-sterling-gold outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Gross Monthly Income (PHP) *</label>
                      <input
                        type="number"
                        required
                        min="30000"
                        value={formData.grossMonthlyIncome}
                        onChange={(e) => setFormData({ ...formData, grossMonthlyIncome: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-sterling-gold focus:border-sterling-gold outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Years with Company</label>
                      <input
                        type="number"
                        min="1"
                        max="40"
                        value={formData.yearsWithCompany}
                        onChange={(e) => setFormData({ ...formData, yearsWithCompany: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-sterling-gold focus:border-sterling-gold outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: KYC Document Upload */}
              {step === 4 && (
                <div className="space-y-4 animate-in fade-in">
                  <div className="border-b border-slate-100 pb-2">
                    <h4 className="text-base font-bold text-sterling-navy">Step 4: Digital KYC Document Upload</h4>
                    <p className="text-xs text-slate-500">Upload clear photos or PDFs (max 10MB each). Magic byte & malware verified.</p>
                  </div>

                  {/* Dropzone 1: Government ID */}
                  <div className="border-2 border-dashed border-slate-200 rounded-2xl p-4 text-center hover:border-sterling-gold transition-colors bg-slate-50/50">
                    <Upload className="w-6 h-6 text-sterling-gold mx-auto mb-1.5" />
                    <div className="text-xs font-bold text-slate-700">1. Valid Government ID (Front & Back)</div>
                    <div className="text-[11px] text-slate-400 mb-2">PhilSys, Passport, Driver&apos;s License or UMID</div>
                    {uploadedFiles["idDoc"] ? (
                      <span className="text-xs text-emerald-600 font-bold flex items-center justify-center gap-1">
                        <Check className="w-3.5 h-3.5" /> {uploadedFiles["idDoc"]} (Encrypted & Stored)
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleFileDrop("idDoc", "National_ID_Front_Back.jpg")}
                        className="text-xs bg-sterling-navy hover:bg-sterling-navy-light text-white font-medium px-4 py-1.5 rounded-lg"
                      >
                        Choose / Snap File
                      </button>
                    )}
                  </div>

                  {/* Dropzone 2: Income Proof */}
                  <div className="border-2 border-dashed border-slate-200 rounded-2xl p-4 text-center hover:border-sterling-gold transition-colors bg-slate-50/50">
                    <Upload className="w-6 h-6 text-sterling-gold mx-auto mb-1.5" />
                    <div className="text-xs font-bold text-slate-700">2. Proof of Income</div>
                    <div className="text-[11px] text-slate-400 mb-2">Latest 3 months Payslips or BIR Form 2316 / ITR</div>
                    {uploadedFiles["incomeDoc"] ? (
                      <span className="text-xs text-emerald-600 font-bold flex items-center justify-center gap-1">
                        <Check className="w-3.5 h-3.5" /> {uploadedFiles["incomeDoc"]} (Encrypted & Stored)
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleFileDrop("incomeDoc", "Payslip_Latest_3Months.pdf")}
                        className="text-xs bg-sterling-navy hover:bg-sterling-navy-light text-white font-medium px-4 py-1.5 rounded-lg"
                      >
                        Choose / Snap File
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* STEP 5: Declarations & Submit */}
              {step === 5 && (
                <div className="space-y-4 animate-in fade-in">
                  <div className="border-b border-slate-100 pb-2">
                    <h4 className="text-base font-bold text-sterling-navy">Step 5: Review & Regulatory Consent</h4>
                    <p className="text-xs text-slate-500">Please review your submission and agree to statutory banking privacy laws.</p>
                  </div>

                  {/* Summary Box */}
                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-xs space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Applicant:</span>
                      <span className="font-bold text-slate-800">{formData.firstName || "Juan"} {formData.lastName || "Dela Cruz"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Loan Type:</span>
                      <span className="font-bold text-sterling-navy">{loanType.toUpperCase()} LOAN</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Target Amount:</span>
                      <span className="font-bold text-slate-800">{formatPHP(amount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Contact Number:</span>
                      <span className="font-bold text-slate-800">{formData.mobile || "0917xxxxxxx"}</span>
                    </div>
                  </div>

                  {/* Consent Checkboxes */}
                  <div className="space-y-2.5 pt-2">
                    <label className="flex items-start gap-2.5 text-xs text-slate-600 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.consentPrivacy}
                        onChange={(e) => setFormData({ ...formData, consentPrivacy: e.target.checked })}
                        className="mt-0.5 rounded text-sterling-navy focus:ring-sterling-gold"
                        required
                      />
                      <span>
                        I consent to the processing of my personal data by Sterling Bank of Asia in accordance with Republic Act No. 10173 (Data Privacy Act of 2012).
                      </span>
                    </label>

                    <label className="flex items-start gap-2.5 text-xs text-slate-600 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.consentBSP}
                        onChange={(e) => setFormData({ ...formData, consentBSP: e.target.checked })}
                        className="mt-0.5 rounded text-sterling-navy focus:ring-sterling-gold"
                        required
                      />
                      <span>
                        I authorize Sterling Bank of Asia to perform credit investigation through the Credit Information Corporation (CIC) and relevant credit bureaus.
                      </span>
                    </label>
                  </div>
                </div>
              )}

              {/* Wizard Navigation Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 flex items-center gap-1.5 transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    Back
                  </button>
                ) : (
                  <div />
                )}

                {step < 5 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-6 py-2.5 rounded-xl bg-sterling-navy hover:bg-sterling-navy-light text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-md"
                  >
                    Next Step
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-7 py-3 rounded-xl bg-gradient-to-r from-sterling-gold via-sterling-gold-light to-sterling-gold hover:from-sterling-gold-dark hover:to-sterling-gold text-sterling-navy-deep text-xs font-black flex items-center gap-2 shadow-lg shadow-sterling-gold/30 transition-all hover:scale-[1.02]"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    Submit Encrypted Application
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
