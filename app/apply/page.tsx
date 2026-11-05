"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { addApplication } from "@/lib/loanStore";
import { formatEUR } from "@/lib/utils";
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
  const [loanType, setLoanType] = useState<"persona" | "auto" | "home">("persona");
  const [amount, setAmount] = useState(15000);
  const [tenorMonths, setTenorMonths] = useState(36);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [refNumber, setRefNumber] = useState("");

  const [formData, setFormData] = useState({
    civility: "M.",
    firstName: "",
    lastName: "",
    birthDate: "",
    phone: "",
    email: "",
    address: "",
    postalCode: "",
    city: "",
    residenceStatus: "Locataire",
    employment: "Salarié CDI",
    monthlyIncome: "3000",
    monthlyExpenses: "800",
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
      applicantName: `${formData.firstName} ${formData.lastName}`.trim() || "Nouveau Demandeur",
      email: formData.email,
      phone: formData.phone,
      loanType: loanType,
      loanTypeLabel: loanType === "persona" ? "Prêt Personnel Express" : loanType === "auto" ? "Prêt Auto" : "Prêt Travaux",
      amount: amount,
      termMonths: tenorMonths,
      monthlyPayment: Math.round((amount / tenorMonths) * 1.05 * 100) / 100,
      monthlyIncome: parseFloat(formData.monthlyIncome) || 3000,
      monthlyExpenses: parseFloat(formData.monthlyExpenses) || 800,
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
                  Demande en Ligne • Sécurisée SSL 256-Bit
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-sterling-navy font-display tracking-tight">
                  Dossier de Demande de Financement
                </h1>
                <p className="text-xs text-slate-500">
                  Remplissez votre dossier en 5 étapes rapides pour recevoir une réponse de principe immédiate.
                </p>

                {/* Stepper Dots */}
                <div className="flex items-center justify-between max-w-md mx-auto pt-4">
                  {[
                    { s: 1, label: "Projet" },
                    { s: 2, label: "Identité" },
                    { s: 3, label: "Revenus" },
                    { s: 4, label: "Justificatifs" },
                    { s: 5, label: "Validation" },
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
                    <h3 className="text-base font-bold text-sterling-navy">Étape 1 : Paramètres de votre Financement</h3>
                    
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { id: "persona", label: "Prêt Personnel", desc: "Sans justificatif" },
                        { id: "auto", label: "Prêt Auto", desc: "Véhicule neuf ou occasion" },
                        { id: "home", label: "Prêt Travaux", desc: "Habitat & Rénovation" },
                      ].map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setLoanType(t.id as any)}
                          className={`p-4 rounded-xl border text-left transition-all ${
                            loanType === t.id
                              ? "border-sterling-gold bg-amber-50/50 shadow-sm"
                              : "border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          <div className="text-xs font-bold text-sterling-navy">{t.label}</div>
                          <div className="text-[10px] text-slate-500 mt-0.5">{t.desc}</div>
                        </button>
                      ))}
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-xs font-bold text-slate-700">Montant souhaité (€)</label>
                        <span className="text-xl font-black text-sterling-navy font-mono">{formatEUR(amount)}</span>
                      </div>
                      <input
                        type="range"
                        min={1000}
                        max={75000}
                        step={500}
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-xs font-bold text-slate-700">Durée du prêt</label>
                        <span className="text-base font-bold text-sterling-navy font-mono">{tenorMonths} mois ({tenorMonths / 12} ans)</span>
                      </div>
                      <div className="grid grid-cols-5 gap-2">
                        {[12, 24, 36, 48, 60, 72, 84].slice(0, 5).map((m) => (
                          <button
                            key={m}
                            type="button"
                            onClick={() => setTenorMonths(m)}
                            className={`py-2 rounded-xl text-xs font-bold border transition-colors ${
                              tenorMonths === m
                                ? "bg-sterling-navy text-white border-sterling-navy"
                                : "bg-slate-50 text-slate-600 border-slate-200"
                            }`}
                          >
                            {m} m.
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 2: Personal Identity */}
                {step === 2 && (
                  <div className="space-y-4">
                    <h3 className="text-base font-bold text-sterling-navy">Étape 2 : Vos Coordonnées Personnelles</h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Prénom *</label>
                        <input
                          type="text"
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium outline-none focus:ring-2 focus:ring-sterling-gold"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Nom *</label>
                        <input
                          type="text"
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium outline-none focus:ring-2 focus:ring-sterling-gold"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Email *</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium outline-none focus:ring-2 focus:ring-sterling-gold"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Français (06 ou 07) *</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium outline-none focus:ring-2 focus:ring-sterling-gold"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-slate-700 mb-1">Adresse Postale *</label>
                        <input
                          type="text"
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium outline-none focus:ring-2 focus:ring-sterling-gold"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Code Postal *</label>
                        <input
                          type="text"
                          maxLength={5}
                          value={formData.postalCode}
                          onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
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
                    <h3 className="text-base font-bold text-sterling-navy">Étape 3 : Situation Professionnelle & Revenus</h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Contrat de Travail</label>
                        <select
                          value={formData.employment}
                          onChange={(e) => setFormData({ ...formData, employment: e.target.value })}
                          className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium bg-white outline-none"
                        >
                          <option value="Salarié CDI">Salarié en CDI (hors période d&apos;essai)</option>
                          <option value="Fonctionnaire">Fonctionnaire titulaire</option>
                          <option value="Profession Libérale">Profession Libérale / Indépendant</option>
                          <option value="Retraité">Retraité</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Statut du Logement</label>
                        <select
                          value={formData.residenceStatus}
                          onChange={(e) => setFormData({ ...formData, residenceStatus: e.target.value })}
                          className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium bg-white outline-none"
                        >
                          <option value="Locataire">Locataire</option>
                          <option value="Propriétaire sans crédit">Propriétaire sans crédit</option>
                          <option value="Propriétaire avec crédit">Propriétaire avec crédit immobilier</option>
                          <option value="Hébergé">Hébergé à titre gratuit</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Revenu Net Mensuel (€) *</label>
                        <input
                          type="number"
                          value={formData.monthlyIncome}
                          onChange={(e) => setFormData({ ...formData, monthlyIncome: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-sterling-navy outline-none"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Loyer ou Charges Mensuelles (€)</label>
                        <input
                          type="number"
                          value={formData.monthlyExpenses}
                          onChange={(e) => setFormData({ ...formData, monthlyExpenses: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 4: Document Uploads */}
                {step === 4 && (
                  <div className="space-y-4">
                    <h3 className="text-base font-bold text-sterling-navy">Étape 4 : Téléchargement des Justificatifs (KYC)</h3>
                    <p className="text-xs text-slate-500">Formats acceptés : PDF, JPG, PNG (Max 10 Mo par document, chiffré AES-256).</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { id: "cni", label: "Pièce d'Identité (CNI / Passeport)" },
                        { id: "payslips", label: "Dernier Bulletin de Salaire" },
                        { id: "tax", label: "Dernier Avis d'Imposition" },
                        { id: "rib", label: "Relevé d'Identité Bancaire (RIB)" },
                      ].map((doc) => (
                        <div key={doc.id} className="p-4 border-2 border-dashed border-slate-200 hover:border-sterling-gold rounded-2xl flex flex-col items-center justify-center text-center p-4 transition-colors">
                          <Upload className="w-6 h-6 text-sterling-gold mb-1" />
                          <div className="text-xs font-bold text-slate-700">{doc.label}</div>
                          <span className="text-[10px] text-slate-400 mt-0.5">
                            {uploadedFiles[doc.id] || "Glisser-déposer ou sélectionner"}
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
                            Parcourir
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 5: Consents & Validation */}
                {step === 5 && (
                  <div className="space-y-6">
                    <h3 className="text-base font-bold text-sterling-navy">Étape 5 : Récapitulatif & Signature Électronique</h3>

                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Emprunteur :</span>
                        <span className="font-bold text-slate-800">{formData.firstName} {formData.lastName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Montant demandé :</span>
                        <span className="font-bold text-sterling-navy font-mono text-sm">{formatEUR(amount)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Durée :</span>
                        <span className="font-bold text-slate-800">{tenorMonths} mois</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Mensualité estimée :</span>
                        <span className="font-bold text-emerald-700 font-mono text-sm">{formatEUR(Math.round((amount / tenorMonths) * 1.05 * 100) / 100)} / mois</span>
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
                          J&apos;atteste de l&apos;exactitude des informations fournies et j&apos;accepte le traitement de mes données conformément au RGPD.
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
                          J&apos;autorise Sterling Bank France à consulter le fichier FICP de la Banque de France pour la vérification de ma solvabilité.
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
                      Précédent
                    </button>
                  ) : <div />}

                  {step < 5 ? (
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-sterling-navy hover:bg-sterling-navy-light text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-md"
                    >
                      Étape Suivante
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="px-7 py-3 rounded-xl bg-gradient-to-r from-sterling-gold via-sterling-gold-light to-sterling-gold text-sterling-navy-deep font-black text-xs sm:text-sm shadow-lg hover:scale-[1.01] transition-all flex items-center gap-2"
                    >
                      <Lock className="w-4 h-4" />
                      Transmettre Ma Demande Sécurisée
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
                  Demande Déposée avec Succès !
                </h2>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Merci, <span className="font-bold text-slate-800">{formData.firstName} {formData.lastName}</span>. Votre dossier a été transmis au comité de crédit Sterling Bank France.
                </p>
              </div>

              <div className="bg-slate-50 border-2 border-dashed border-sterling-gold/60 rounded-2xl p-4 text-center space-y-1">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Numéro de Dossier de Crédit
                </div>
                <div className="text-xl font-mono font-black text-sterling-navy tracking-wider">
                  {refNumber}
                </div>
                <div className="text-[11px] text-emerald-700 font-semibold pt-1">
                  ✓ Confirmation envoyée par email à {formData.email}
                </div>
              </div>

              <div className="space-y-2">
                <Link
                  href="/dashboard"
                  className="w-full py-3.5 rounded-xl bg-sterling-navy hover:bg-sterling-navy-light text-white font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <span>Accéder à mon Espace Client (Dashboard)</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/"
                  className="w-full py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 transition-colors block text-center"
                >
                  Retour à l&apos;accueil
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
