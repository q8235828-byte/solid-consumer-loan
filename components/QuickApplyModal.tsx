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
import { formatEUR, formatMoney, CurrencyCode } from "@/lib/utils";
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

  // Form State for France
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    birthDate: "",
    civilStatus: "Célibataire",
    idType: "Carte Nationale d'Identité (CNI)",
    idNumber: "",
    address: "",
    postalCode: "",
    city: "",
    residenceOwnership: "Locataire",
    yearsAtResidence: "3",
    contractType: "CDI (Contrat à Durée Indéterminée)",
    employerName: "",
    jobTitle: "",
    netMonthlyIncome: "2800",
    hasOtherLoans: "Non",
    consentRGPD: true,
    consentFICP: true,
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
      applicantName: `${formData.firstName} ${formData.lastName}`.trim() || "Nouveau Demandeur",
      email: formData.email || "demandeur@example.fr",
      phone: formData.mobile || "06 00 00 00 00",
      loanType: (loanType as any) || "persona",
      loanTypeLabel: loanType === "persona" ? "Prêt Personnel Express" : loanType === "auto" ? "Prêt Auto" : "Prêt Travaux",
      currency: currency,
      amount: amount,
      termMonths: defaultTenor || 36,
      monthlyPayment: Math.round((amount / (defaultTenor || 36)) * 1.05 * 100) / 100,
      monthlyIncome: parseFloat(formData.netMonthlyIncome) || 2800,
      address: formData.address || "Paris",
      city: formData.city || "Paris",
      postalCode: formData.postalCode || "75001",
      employmentType: formData.contractType || "Salarié CDI",
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
              <h3 className="text-base font-bold text-white">Souscription Express en Ligne</h3>
              <p className="text-xs text-slate-300">
                {loanType === "personnel" ? "Prêt Personnel" : loanType === "auto" ? "Prêt Véhicule" : "Prêt Travaux"} • Chiffrement Bancaire Sécurisé (France)
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
                { s: 2, label: "Logement" },
                { s: 3, label: "Situation Pro" },
                { s: 4, label: "Justificatifs" },
                { s: 5, label: "Validation" },
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
                  Demande Transmise avec Succès !
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Merci, <span className="font-bold text-slate-800">{formData.firstName} {formData.lastName}</span>. Votre dossier a été transmis au pôle d&apos;octroi de crédit de Sterling Bank France.
                </p>
              </div>

              {/* Reference ID Card */}
              <div className="bg-slate-50 border-2 border-dashed border-sterling-gold/60 rounded-2xl p-4 text-center space-y-1">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Numéro de Dossier de Crédit
                </div>
                <div className="text-xl font-mono font-black text-sterling-navy tracking-wider">
                  {applicationRef}
                </div>
                <div className="text-[11px] text-emerald-700 font-semibold pt-1">
                  ✓ Confirmation envoyée par email et SMS au {formData.mobile || "06 XX XX XX XX"}
                </div>
              </div>

              <div className="text-left bg-blue-50/70 border border-blue-100 rounded-xl p-4 text-xs text-slate-600 space-y-1.5">
                <div className="font-bold text-sterling-navy">Prochaines Étapes :</div>
                <div>1. Étude express de vos pièces justificatives sous 24h ouvrées.</div>
                <div>2. Envoi de votre contrat de crédit par signature électronique sécurisée.</div>
                <div>3. Virement de vos fonds sous 48h dès validation définitive (délai légal de rétractation de 14 jours applicable).</div>
              </div>

              <div className="space-y-2">
                <Link
                  href="/dashboard"
                  onClick={handleReset}
                  className="w-full bg-gradient-to-r from-sterling-gold via-sterling-gold-light to-sterling-gold text-sterling-navy-deep font-extrabold py-3 rounded-xl transition-all shadow-md block text-center text-xs"
                >
                  Accéder à mon Espace Client (Suivre mon dossier)
                </Link>
                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2.5 rounded-xl transition-all text-xs"
                >
                  Retour à la page d&apos;accueil
                </button>
              </div>
            </div>
          ) : (
            /* Wizard Steps */
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* STEP 1: Personal & Identity Information */}
              {step === 1 && (
                <div className="space-y-4 animate-in fade-in">
                  <div className="border-b border-slate-100 pb-2">
                    <h4 className="text-base font-bold text-sterling-navy">Étape 1 : Vos Informations Personnelles</h4>
                    <p className="text-xs text-slate-500">Renseignez vos coordonnées exactes telles qu&apos;inscrites sur vos papiers d&apos;identité.</p>
                  </div>

                  {/* Currency Selection: USD or EUR only */}
                  <div className="bg-amber-50/70 border border-sterling-gold/40 rounded-2xl p-3.5 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-sterling-navy flex items-center gap-1.5">
                        <span>Devise du prêt / Loan Currency</span>
                        <span className="text-[10px] font-semibold text-sterling-gold-dark bg-amber-100 px-2 py-0.5 rounded-full">USD & EUR Uniquement</span>
                      </div>
                      <p className="text-[11px] text-slate-600 mt-0.5">Choisissez la monnaie de versement et de remboursement.</p>
                    </div>
                    <div className="inline-flex rounded-xl p-1 bg-white border border-slate-200 shadow-inner">
                      <button
                        type="button"
                        onClick={() => setCurrency("USD")}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
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
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          currency === "EUR"
                            ? "bg-sterling-navy text-white shadow-sm"
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        EUR (€)
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Prénom *</label>
                      <input
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        placeholder="Marc"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-sterling-gold focus:border-sterling-gold outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Nom de famille *</label>
                      <input
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        placeholder="Delaunay"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-sterling-gold focus:border-sterling-gold outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Numéro de Mobile (France +33) *</label>
                      <input
                        type="tel"
                        required
                        value={formData.mobile}
                        onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                        placeholder="06 12 34 56 78"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-sterling-gold focus:border-sterling-gold outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Adresse Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="marc.delaunay@gmail.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-sterling-gold focus:border-sterling-gold outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Type de Pièce d&apos;Identité</label>
                      <select
                        value={formData.idType}
                        onChange={(e) => setFormData({ ...formData, idType: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-sterling-gold focus:border-sterling-gold outline-none bg-white"
                      >
                        <option>Carte Nationale d&apos;Identité (CNI)</option>
                        <option>Passeport Français / Européen</option>
                        <option>Titre de Séjour Valide</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Situation Familiale</label>
                      <select
                        value={formData.civilStatus}
                        onChange={(e) => setFormData({ ...formData, civilStatus: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-sterling-gold focus:border-sterling-gold outline-none bg-white"
                      >
                        <option>Célibataire</option>
                        <option>Marié(e)</option>
                        <option>Pacsé(e)</option>
                        <option>Divorcé(e)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Residential Details */}
              {step === 2 && (
                <div className="space-y-4 animate-in fade-in">
                  <div className="border-b border-slate-100 pb-2">
                    <h4 className="text-base font-bold text-sterling-navy">Étape 2 : Votre Logement en France</h4>
                    <p className="text-xs text-slate-500">Adresse de résidence principale en France métropolitaine.</p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Adresse postale complète *</label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="14 Rue de Rivoli"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-sterling-gold focus:border-sterling-gold outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Code Postal *</label>
                      <input
                        type="text"
                        required
                        maxLength={5}
                        value={formData.postalCode}
                        onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                        placeholder="75004"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-sterling-gold focus:border-sterling-gold outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Ville *</label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="Paris"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-sterling-gold focus:border-sterling-gold outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Statut d&apos;occupation</label>
                      <select
                        value={formData.residenceOwnership}
                        onChange={(e) => setFormData({ ...formData, residenceOwnership: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-sterling-gold focus:border-sterling-gold outline-none bg-white"
                      >
                        <option>Propriétaire (Résidence principale)</option>
                        <option>Locataire</option>
                        <option>Logé à titre gratuit / Famille</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Ancienneté à cette adresse (années)</label>
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

              {/* STEP 3: Professional Situation & Income */}
              {step === 3 && (
                <div className="space-y-4 animate-in fade-in">
                  <div className="border-b border-slate-100 pb-2">
                    <h4 className="text-base font-bold text-sterling-navy">Étape 3 : Situation Professionnelle & Revenus</h4>
                    <p className="text-xs text-slate-500">Pour évaluer votre capacité de remboursement en toute conformité.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Type de Contrat *</label>
                      <select
                        value={formData.contractType}
                        onChange={(e) => setFormData({ ...formData, contractType: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-sterling-gold focus:border-sterling-gold outline-none bg-white"
                      >
                        <option>CDI (Secteur privé)</option>
                        <option>Fonctionnaire / Agent public</option>
                        <option>Profession libérale / Indépendant</option>
                        <option>CDD / Intérim</option>
                        <option>Retraité(e)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Revenu Mensuel Net Avant Impôt (EUR €) *</label>
                      <input
                        type="number"
                        required
                        min="1000"
                        value={formData.netMonthlyIncome}
                        onChange={(e) => setFormData({ ...formData, netMonthlyIncome: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-sterling-gold focus:border-sterling-gold outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Entreprise / Employeur</label>
                      <input
                        type="text"
                        value={formData.employerName}
                        onChange={(e) => setFormData({ ...formData, employerName: e.target.value })}
                        placeholder="Société Générale, TotalEnergies, etc."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-sterling-gold focus:border-sterling-gold outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Profession / Poste Occupé</label>
                      <input
                        type="text"
                        value={formData.jobTitle}
                        onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                        placeholder="Ingénieur, Cadre, Comptable..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-sterling-gold focus:border-sterling-gold outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: KYC Justificatifs Upload */}
              {step === 4 && (
                <div className="space-y-4 animate-in fade-in">
                  <div className="border-b border-slate-100 pb-2">
                    <h4 className="text-base font-bold text-sterling-navy">Étape 4 : Justificatifs en Ligne (KYC)</h4>
                    <p className="text-xs text-slate-500">Formats acceptés : PDF, JPG, PNG (taille max 10 Mo par document).</p>
                  </div>

                  {/* Dropzone 1: Piece d'identité */}
                  <div className="border-2 border-dashed border-slate-200 rounded-2xl p-4 text-center hover:border-sterling-gold transition-colors bg-slate-50/50">
                    <Upload className="w-6 h-6 text-sterling-gold mx-auto mb-1.5" />
                    <div className="text-xs font-bold text-slate-700">1. Pièce d&apos;identité (Recto & Verso)</div>
                    <div className="text-[11px] text-slate-400 mb-2">Carte d&apos;identité ou passeport européen en cours de validité</div>
                    {uploadedFiles["idDoc"] ? (
                      <span className="text-xs text-emerald-600 font-bold flex items-center justify-center gap-1">
                        <Check className="w-3.5 h-3.5" /> {uploadedFiles["idDoc"]} (Document Sécurisé)
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleFileDrop("idDoc", "CNI_Recto_Verso.pdf")}
                        className="text-xs bg-sterling-navy hover:bg-sterling-navy-light text-white font-medium px-4 py-1.5 rounded-lg"
                      >
                        Téléverser / Prendre en photo
                      </button>
                    )}
                  </div>

                  {/* Dropzone 2: Bulletins de paie */}
                  <div className="border-2 border-dashed border-slate-200 rounded-2xl p-4 text-center hover:border-sterling-gold transition-colors bg-slate-50/50">
                    <Upload className="w-6 h-6 text-sterling-gold mx-auto mb-1.5" />
                    <div className="text-xs font-bold text-slate-700">2. Dernier bulletin de salaire ou Avis d&apos;imposition</div>
                    <div className="text-[11px] text-slate-400 mb-2">Justificatif de vos revenus récents</div>
                    {uploadedFiles["incomeDoc"] ? (
                      <span className="text-xs text-emerald-600 font-bold flex items-center justify-center gap-1">
                        <Check className="w-3.5 h-3.5" /> {uploadedFiles["incomeDoc"]} (Document Sécurisé)
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleFileDrop("incomeDoc", "Bulletin_Salaire_Octobre.pdf")}
                        className="text-xs bg-sterling-navy hover:bg-sterling-navy-light text-white font-medium px-4 py-1.5 rounded-lg"
                      >
                        Téléverser / Prendre en photo
                      </button>
                    )}
                  </div>

                  {/* Dropzone 3: RIB */}
                  <div className="border-2 border-dashed border-slate-200 rounded-2xl p-4 text-center hover:border-sterling-gold transition-colors bg-slate-50/50">
                    <Upload className="w-6 h-6 text-sterling-gold mx-auto mb-1.5" />
                    <div className="text-xs font-bold text-slate-700">3. Relevé d&apos;Identité Bancaire (RIB)</div>
                    <div className="text-[11px] text-slate-400 mb-2">Compte bancaire français (IBAN FR76...) pour le virement des fonds</div>
                    {uploadedFiles["ribDoc"] ? (
                      <span className="text-xs text-emerald-600 font-bold flex items-center justify-center gap-1">
                        <Check className="w-3.5 h-3.5" /> {uploadedFiles["ribDoc"]} (Document Sécurisé)
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleFileDrop("ribDoc", "RIB_Bancaire_FR.pdf")}
                        className="text-xs bg-sterling-navy hover:bg-sterling-navy-light text-white font-medium px-4 py-1.5 rounded-lg"
                      >
                        Téléverser mon RIB
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* STEP 5: Declarations & Submit */}
              {step === 5 && (
                <div className="space-y-4 animate-in fade-in">
                  <div className="border-b border-slate-100 pb-2">
                    <h4 className="text-base font-bold text-sterling-navy">Étape 5 : Récapitulatif & Consentements Légaux</h4>
                    <p className="text-xs text-slate-500">Vérifiez les données avant la transmission chiffrée de votre demande.</p>
                  </div>

                  {/* Summary Box */}
                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-xs space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Demandeur :</span>
                      <span className="font-bold text-slate-800">{formData.firstName || "Marc"} {formData.lastName || "Delaunay"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Type de Crédit :</span>
                      <span className="font-bold text-sterling-navy">{loanType.toUpperCase()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Montant souhaité :</span>
                      <span className="font-bold text-slate-800">{formatMoney(amount, currency)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Téléphone de contact :</span>
                      <span className="font-bold text-slate-800">{formData.mobile || "06 XX XX XX XX"}</span>
                    </div>
                  </div>

                  {/* Consent Checkboxes */}
                  <div className="space-y-2.5 pt-2">
                    <label className="flex items-start gap-2.5 text-xs text-slate-600 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.consentRGPD}
                        onChange={(e) => setFormData({ ...formData, consentRGPD: e.target.checked })}
                        className="mt-0.5 rounded text-sterling-navy focus:ring-sterling-gold"
                        required
                      />
                      <span>
                        J&apos;accepte le traitement de mes données personnelles par Sterling Bank France conformément au RGPD pour l&apos;étude de ma demande de crédit.
                      </span>
                    </label>

                    <label className="flex items-start gap-2.5 text-xs text-slate-600 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.consentFICP}
                        onChange={(e) => setFormData({ ...formData, consentFICP: e.target.checked })}
                        className="mt-0.5 rounded text-sterling-navy focus:ring-sterling-gold"
                        required
                      />
                      <span>
                        J&apos;autorise Sterling Bank à interroger le fichier FICP de la Banque de France pour vérifier ma situation de solvabilité financière.
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
                    Précédent
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
                    Étape Suivante
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-7 py-3 rounded-xl bg-gradient-to-r from-sterling-gold via-sterling-gold-light to-sterling-gold hover:from-sterling-gold-dark hover:to-sterling-gold text-sterling-navy-deep text-xs font-black flex items-center gap-2 shadow-lg shadow-sterling-gold/30 transition-all hover:scale-[1.02]"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    Transmettre Ma Demande Sécurisée
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
