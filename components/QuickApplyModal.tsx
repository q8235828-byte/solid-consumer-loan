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
  defaultLoanType = "investment",
  defaultAmount = 1000000,
  defaultTenor = 60,
}: QuickApplyModalProps) {
  const [step, setStep] = useState(1);
  const [loanType, setLoanType] = useState(defaultLoanType);
  const [currency, setCurrency] = useState<CurrencyCode>("USD");
  const [amount, setAmount] = useState(defaultAmount < 100000 ? 1000000 : defaultAmount);

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
      civility: formData.civilStatus === "Married" ? "Mr./Mrs." : "Mr.",
      email: formData.email || "applicant@example.com",
      phone: formData.mobile || "+1 555-0199",
      loanType: (loanType as any) || "persona",
      loanTypeLabel: loanType === "persona" || loanType === "personnel" ? "Persona Personal Loan" : loanType === "auto" ? "Auto Loan Facility" : "Home Loan & Renovation",
      currency: currency,
      amount: amount,
      termMonths: defaultTenor || 36,
      monthlyPayment: Math.round((amount / (defaultTenor || 36)) * 1.05 * 100) / 100,
      monthlyIncome: parseFloat(formData.netMonthlyIncome) || 3500,
      monthlyExpenses: 1100,
      residenceStatus: formData.residenceOwnership === "Tenant" ? "Tenant / Renting" : "Homeowner",
      address: formData.address || "Main Street",
      city: formData.city || "Metropolis",
      postalCode: formData.postalCode || "10001",
      employmentType: formData.contractType || "Full-Time",
      documents: Object.keys(uploadedFiles).length > 0 
        ? Object.entries(uploadedFiles).map(([k, v]) => ({
            name: v,
            type: k === "id" ? "Identity" : k === "income" ? "Income" : "General",
            status: "pending" as const,
            uploadedAt: new Date().toISOString().slice(0, 10)
          }))
        : undefined,
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
                { s: 1, label: "Identité" },
                { s: 2, label: "Résidence" },
                { s: 3, label: "Emploi" },
                { s: 4, label: "Justificatifs" },
                { s: 5, label: "Récapitulatif" },
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
                  Demande Enregistrée avec Succès !
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Merci, <span className="font-bold text-slate-800">{formData.firstName} {formData.lastName}</span>. Votre dossier a été transmis pour analyse préliminaire.
                </p>
              </div>

              {/* Reference Box */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 max-w-sm mx-auto space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Numéro de Référence du Dossier
                </span>
                <div className="text-2xl font-black font-mono text-sterling-navy">
                  {applicationRef || "LCG-2026-9842"}
                </div>
                <div className="text-[11px] text-emerald-700 font-semibold pt-1">
                  Accusé de réception envoyé à {formData.email || "votre adresse e-mail"}
                </div>
              </div>

              {/* Next steps advice */}
              <div className="text-left max-w-md mx-auto bg-amber-50/60 border border-amber-200/70 rounded-2xl p-4 text-xs text-slate-700 space-y-2">
                <div className="font-bold text-amber-900">Prochaines Étapes :</div>
                <div>1. Analyse préliminaire des justificatifs sous 24h ouvrées.</div>
                <div>2. Envoi de l'accord de principe pour signature électronique certifiée.</div>
                <div>3. Mise à disposition des fonds sur votre compte bancaire.</div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/tracker"
                  onClick={handleReset}
                  className="px-6 py-3 rounded-xl bg-sterling-navy hover:bg-sterling-navy-deep text-white font-bold text-xs uppercase tracking-wider shadow"
                >
                  Suivre l'Avancement du Dossier
                </Link>
                <button
                  onClick={handleReset}
                  type="button"
                  className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs uppercase tracking-wider"
                >
                  Fermer la Fenêtre
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* STEP 1: Identity & Parameters */}
              {step === 1 && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div className="border-b border-slate-100 pb-2">
                    <h4 className="text-base font-bold text-sterling-navy">Étape 1 : Paramètres du Financement & Identité</h4>
                    <p className="text-xs text-slate-500">Sélectionnez la devise et complétez vos informations d'identité civile.</p>
                  </div>

                  {/* Currency Picker */}
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700">Devise du Crédit :</span>
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

                  {/* Amount input & Slider: Min $100,000 to $500,000,000 */}
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <label className="text-xs font-bold text-slate-700">
                        Capital Souhaité ({currency === "EUR" ? "EUR €" : "USD $"})
                      </label>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs text-slate-500 font-medium">Montant :</span>
                        <input
                          type="number"
                          min="100000"
                          max="500000000"
                          step="50000"
                          value={amount}
                          onChange={(e) => setAmount(Math.max(100000, Number(e.target.value)))}
                          className="w-36 px-2.5 py-1 text-sm font-black text-sterling-navy bg-white border border-slate-300 rounded-lg text-right font-mono outline-none focus:border-sterling-gold"
                        />
                      </div>
                    </div>

                    <div className="text-xl sm:text-2xl font-black text-sterling-navy font-mono">
                      {currency === "EUR" ? "€" : "$"}{amount.toLocaleString("en-US")}
                    </div>

                    <input
                      type="range"
                      min="100000"
                      max="50000000"
                      step="100000"
                      value={Math.min(50000000, amount)}
                      onChange={(e) => setAmount(Number(e.target.value))}
                      className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sterling-gold"
                    />

                    <div className="flex justify-between text-[10px] text-slate-500 font-semibold">
                      <span>Min : {currency === "EUR" ? "100 000 €" : "100 000 $"}</span>
                      <span>Échelle jusqu'à {currency === "EUR" ? "500 000 000 €" : "500 000 000 $"}</span>
                    </div>

                    {/* Quick Amount Presets */}
                    <div className="pt-1 flex flex-wrap gap-1.5">
                      {[
                        { label: "$100K", val: 100000 },
                        { label: "$500K", val: 500000 },
                        { label: "$1M", val: 1000000 },
                        { label: "$5M", val: 5000000 },
                        { label: "$10M", val: 10000000 },
                        { label: "$50M", val: 50000000 },
                        { label: "$100M", val: 100000000 },
                        { label: "$500M", val: 500000000 },
                      ].map((chip) => (
                        <button
                          key={chip.val}
                          type="button"
                          onClick={() => setAmount(chip.val)}
                          className={`px-2 py-1 rounded-md text-[10px] font-bold transition-all ${
                            amount === chip.val
                              ? "bg-sterling-navy text-white shadow-xs"
                              : "bg-white text-slate-700 border border-slate-200 hover:border-sterling-gold hover:bg-amber-50/50"
                          }`}
                        >
                          {currency === "EUR" ? chip.label.replace("$", "€") : chip.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Names */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Prénom *</label>
                      <input
                        type="text"
                        required
                        placeholder="Jean"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none focus:border-sterling-gold focus:ring-1 focus:ring-sterling-gold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Nom *</label>
                      <input
                        type="text"
                        required
                        placeholder="Dupont"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none focus:border-sterling-gold focus:ring-1 focus:ring-sterling-gold"
                      />
                    </div>
                  </div>

                  {/* Email & Mobile */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Adresse E-mail *</label>
                      <input
                        type="email"
                        required
                        placeholder="jean.dupont@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none focus:border-sterling-gold focus:ring-1 focus:ring-sterling-gold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Téléphone Mobile (compatible WhatsApp) *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+33 6 12 34 56 78"
                        value={formData.mobile}
                        onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none focus:border-sterling-gold focus:ring-1 focus:ring-sterling-gold"
                      />
                    </div>
                  </div>

                  {/* Date of Birth & ID Type */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Date de Naissance *</label>
                      <input
                        type="date"
                        required
                        value={formData.birthDate}
                        onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none focus:border-sterling-gold focus:ring-1 focus:ring-sterling-gold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Type de Document d'Identité *</label>
                      <select
                        value={formData.idType}
                        onChange={(e) => setFormData({ ...formData, idType: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none bg-white"
                      >
                        <option>Passeport International</option>
                        <option>Carte Nationale d'Identité</option>
                        <option>Permis de Conduire</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Residence & Housing Status */}
              {step === 2 && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div className="border-b border-slate-100 pb-2">
                    <h4 className="text-base font-bold text-sterling-navy">Étape 2 : Adresse de Résidence & Logement</h4>
                    <p className="text-xs text-slate-500">Renseignez votre adresse de résidence principale actuelle.</p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Adresse Postale *</label>
                    <input
                      type="text"
                      required
                      placeholder="12 rue de la Paix"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none focus:border-sterling-gold"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Code Postal *</label>
                      <input
                        type="text"
                        required
                        placeholder="75008"
                        value={formData.postalCode}
                        onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none focus:border-sterling-gold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Ville / Région *</label>
                      <input
                        type="text"
                        required
                        placeholder="Paris"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none focus:border-sterling-gold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Statut du Logement *</label>
                      <select
                        value={formData.residenceOwnership}
                        onChange={(e) => setFormData({ ...formData, residenceOwnership: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none bg-white"
                      >
                        <option>Propriétaire sans crédit</option>
                        <option>Propriétaire avec crédit immobilier en cours</option>
                        <option>Locataire</option>
                        <option>Logé par employeur / Famille</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Ancienneté au Domicile (Années) *</label>
                      <select
                        value={formData.yearsAtResidence}
                        onChange={(e) => setFormData({ ...formData, yearsAtResidence: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none bg-white"
                      >
                        <option>Moins de 1 an</option>
                        <option>1 à 2 ans</option>
                        <option>3 à 5 ans</option>
                        <option>Plus de 5 ans</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Professional Employment & Income */}
              {step === 3 && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div className="border-b border-slate-100 pb-2">
                    <h4 className="text-base font-bold text-sterling-navy">Étape 3 : Situation Professionnelle & Revenus</h4>
                    <p className="text-xs text-slate-500">Pour évaluer votre capacité de remboursement selon les normes bancaires.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Type de Contrat / Statut *</label>
                      <select
                        value={formData.contractType}
                        onChange={(e) => setFormData({ ...formData, contractType: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none bg-white"
                      >
                        <option>CDI / Salarié Temps Plein</option>
                        <option>Cadre Dirigeant / Direction</option>
                        <option>Chef d'Entreprise / Dirigeant</option>
                        <option>Profession Libérale / Consultant</option>
                        <option>Fonction Publique</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Revenu Net Mensuel ({currency === "EUR" ? "€" : "$"}) *</label>
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
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Employeur / Nom de Société *</label>
                      <input
                        type="text"
                        placeholder="Société Générale de Distribution"
                        value={formData.employerName}
                        onChange={(e) => setFormData({ ...formData, employerName: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none focus:border-sterling-gold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Poste Occupé / Fonction</label>
                      <input
                        type="text"
                        placeholder="Directeur des Opérations"
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
                    <h4 className="text-base font-bold text-sterling-navy">Étape 4 : Justificatifs & Pièces Dossier</h4>
                    <p className="text-xs text-slate-500">Téléversez des copies claires ou fichiers PDF pour une analyse express sous 24h.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* ID Document */}
                    <div className="p-4 bg-slate-50 border border-dashed border-slate-300 rounded-2xl text-center space-y-2 hover:border-sterling-gold transition-colors">
                      <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-sterling-gold mx-auto">
                        <Upload className="w-5 h-5" />
                      </div>
                      <div className="text-xs font-bold text-slate-700">1. Pièce d'Identité Valide</div>
                      <div className="text-[11px] text-slate-400 mb-2">Passeport ou CNI</div>
                      <button
                        type="button"
                        onClick={() => handleFileDrop("id", "Piece_Identite.pdf")}
                        className={`w-full py-1.5 px-3 rounded-lg text-xs font-semibold transition-all ${
                          uploadedFiles.id ? "bg-emerald-100 text-emerald-800" : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        {uploadedFiles.id ? `✓ ${uploadedFiles.id}` : "Choisir Fichier"}
                      </button>
                    </div>

                    {/* Proof of Income */}
                    <div className="p-4 bg-slate-50 border border-dashed border-slate-300 rounded-2xl text-center space-y-2 hover:border-sterling-gold transition-colors">
                      <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-sterling-gold mx-auto">
                        <Upload className="w-5 h-5" />
                      </div>
                      <div className="text-xs font-bold text-slate-700">2. Justificatif de Revenus</div>
                      <div className="text-[11px] text-slate-400 mb-2">Bulletin de salaire ou bilan fiscal</div>
                      <button
                        type="button"
                        onClick={() => handleFileDrop("income", "Justificatif_Revenus.pdf")}
                        className={`w-full py-1.5 px-3 rounded-lg text-xs font-semibold transition-all ${
                          uploadedFiles.income ? "bg-emerald-100 text-emerald-800" : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        {uploadedFiles.income ? `✓ ${uploadedFiles.income}` : "Choisir Fichier"}
                      </button>
                    </div>

                    {/* Bank Details */}
                    <div className="p-4 bg-slate-50 border border-dashed border-slate-300 rounded-2xl text-center space-y-2 hover:border-sterling-gold transition-colors">
                      <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-sterling-gold mx-auto">
                        <Upload className="w-5 h-5" />
                      </div>
                      <div className="text-xs font-bold text-slate-700">3. Relevé d'Identité Bancaire (RIB)</div>
                      <div className="text-[11px] text-slate-400 mb-2">RIB / IBAN pour le virement</div>
                      <button
                        type="button"
                        onClick={() => handleFileDrop("bank", "RIB_Bancaire.pdf")}
                        className={`w-full py-1.5 px-3 rounded-lg text-xs font-semibold transition-all ${
                          uploadedFiles.bank ? "bg-emerald-100 text-emerald-800" : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        {uploadedFiles.bank ? `✓ ${uploadedFiles.bank}` : "Choisir Fichier"}
                      </button>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-500 italic text-center">
                    Formats acceptés : PDF, JPG, PNG (Max 15 Mo par fichier). Documents stockés dans des coffres-forts numériques chiffrés.
                  </div>
                </div>
              )}

              {/* STEP 5: Review & Digital Confirmation */}
              {step === 5 && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div className="border-b border-slate-100 pb-2">
                    <h4 className="text-base font-bold text-sterling-navy">Étape 5 : Récapitulatif & Confirmation Numérique</h4>
                    <p className="text-xs text-slate-500">Veuillez vérifier l'exactitude des informations avant transmission sécurisée.</p>
                  </div>

                  {/* Summary Box */}
                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Emprunteur :</span>
                      <span className="font-bold text-slate-800">{formData.firstName} {formData.lastName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Facilité Demandée :</span>
                      <span className="font-bold text-sterling-navy">{loanType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Montant Demandé :</span>
                      <span className="font-black text-sterling-gold font-mono">{currency === "EUR" ? "€" : "$"}{amount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">E-mail de Contact :</span>
                      <span className="font-bold text-slate-800">{formData.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Téléphone Mobile :</span>
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
                        J'accepte le traitement de mes données personnelles par Loan Commercial Group conformément aux dispositions du RGPD et aux règles de confidentialité bancaire.
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
                        Je certifie sur l'honneur l'exactitude des renseignements fournis et autorise Loan Commercial Group à effectuer les vérifications d'usage requises.
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
                    <span>Précédent</span>
                  </button>
                ) : <div />}

                {step < 5 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-6 py-2.5 rounded-xl bg-sterling-navy hover:bg-sterling-navy-deep text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow"
                  >
                    <span>Continuer vers l'Étape {step + 1}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-7 py-3 rounded-xl bg-gradient-to-r from-sterling-gold to-sterling-gold-light hover:from-amber-600 hover:to-sterling-gold text-white text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-lg transition-all"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Transmettre le Dossier Chiffré</span>
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
