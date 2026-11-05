"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { addApplication } from "@/lib/loanStore";
import { 
  Building2, 
  Lock, 
  Mail, 
  User, 
  Phone, 
  Calendar, 
  MapPin, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  AlertCircle,
  Briefcase,
  Check,
  X
} from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form State
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
    employment: "Salarié CDI",
    monthlyIncome: "3200",
    password: "",
    confirmPassword: "",
    consentRGPD: true,
    consentTerms: true,
  });

  const [error, setError] = useState("");

  // Live password validation
  const hasMinLength = formData.password.length >= 8;
  const hasUppercase = /[A-Z]/.test(formData.password);
  const hasNumber = /[0-9]/.test(formData.password);
  const hasSpecial = /[^A-Za-z0-9]/.test(formData.password);
  const passwordsMatch = formData.password && formData.password === formData.confirmPassword;

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (step === 1) {
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
        setError("Veuillez remplir tous les champs obligatoires.");
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!formData.address || !formData.postalCode || !formData.city) {
        setError("Veuillez renseigner votre adresse de résidence.");
        return;
      }
      setStep(3);
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!hasMinLength || !hasUppercase || !hasNumber) {
      setError("Le mot de passe doit respecter tous les critères de sécurité bancaire.");
      return;
    }

    if (!passwordsMatch) {
      setError("Les deux mots de passe ne correspondent pas.");
      return;
    }

    if (!formData.consentTerms || !formData.consentRGPD) {
      setError("Vous devez accepter les conditions générales et la politique de confidentialité.");
      return;
    }

    setLoading(true);

    // Save initial user profile into store
    setTimeout(() => {
      addApplication({
        applicantName: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        phone: formData.phone,
        loanType: "persona",
        loanTypeLabel: "Prêt Personnel Express (Demande en attente)",
        amount: 10000,
        termMonths: 36,
        monthlyPayment: 290,
        monthlyIncome: parseFloat(formData.monthlyIncome) || 3000,
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
        employmentType: formData.employment,
      });

      setLoading(false);
      setIsSuccess(true);
    }, 900);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 font-sans text-slate-800">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl w-full space-y-8">
          
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-slate-200 relative overflow-hidden">
            {/* Top decorative accent */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-sterling-gold via-sterling-gold-light to-sterling-gold" />

            {!isSuccess ? (
              <>
                {/* Header */}
                <div className="text-center space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sterling-gold/15 text-sterling-gold text-xs font-bold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Souscription 100% en Ligne • Sans Frais de Dossier
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-black text-sterling-navy font-display tracking-tight">
                    Ouvrir Mon Espace Client
                  </h1>
                  <p className="text-xs text-slate-500">
                    Créez vos identifiants pour gérer votre crédit et suivre vos démarches en toute sécurité.
                  </p>
                </div>

                {/* Stepper Progress */}
                <div className="mt-6 flex items-center justify-between max-w-xs mx-auto border-b border-slate-100 pb-4">
                  {[
                    { s: 1, label: "Identité" },
                    { s: 2, label: "Coordonnées" },
                    { s: 3, label: "Sécurité" }
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
                      <span className="text-[10px] font-semibold text-slate-500 mt-1">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Error Banner */}
                {error && (
                  <div className="mt-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                {/* STEP 1: Personal Identity */}
                {step === 1 && (
                  <form onSubmit={handleNextStep} className="mt-6 space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Civilité</label>
                      <div className="flex gap-4 text-xs font-semibold">
                        {["M.", "Mme"].map((c) => (
                          <label key={c} className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="civility"
                              value={c}
                              checked={formData.civility === c}
                              onChange={(e) => setFormData({ ...formData, civility: e.target.value })}
                              className="text-sterling-navy focus:ring-sterling-gold"
                            />
                            <span>{c}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Prénom *</label>
                        <input
                          type="text"
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          placeholder="ex: Jean-Pierre"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-sterling-gold outline-none"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Nom *</label>
                        <input
                          type="text"
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          placeholder="ex: Lambert"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-sterling-gold outline-none"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Adresse Email *</label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="votre.email@domaine.fr"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-sterling-gold outline-none"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Téléphone Mobile Français (06 ou 07) *</label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="06 12 34 56 78"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-sterling-gold outline-none"
                          required
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-sterling-navy hover:bg-sterling-navy-light text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 mt-4"
                    >
                      <span>Continuer vers l&apos;Étape 2</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                )}

                {/* STEP 2: Address & Situation */}
                {step === 2 && (
                  <form onSubmit={handleNextStep} className="mt-6 space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Adresse Postale *</label>
                      <div className="relative">
                        <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                        <input
                          type="text"
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          placeholder="Numéro et nom de rue"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-sterling-gold outline-none"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Code Postal *</label>
                        <input
                          type="text"
                          maxLength={5}
                          value={formData.postalCode}
                          onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                          placeholder="75008"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-sterling-gold outline-none"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Ville *</label>
                        <input
                          type="text"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          placeholder="Paris"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-sterling-gold outline-none"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Situation Professionnelle</label>
                        <select
                          value={formData.employment}
                          onChange={(e) => setFormData({ ...formData, employment: e.target.value })}
                          className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-sterling-gold outline-none bg-white"
                        >
                          <option value="Salarié CDI">Salarié en CDI</option>
                          <option value="Fonctionnaire">Fonctionnaire d&apos;État / Territoire</option>
                          <option value="Profession Libérale">Profession Libérale / Indépendant</option>
                          <option value="Retraité">Retraité</option>
                          <option value="Salarié CDD">Salarié en CDD</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Revenus Nets Mensuels (€)</label>
                        <input
                          type="number"
                          value={formData.monthlyIncome}
                          onChange={(e) => setFormData({ ...formData, monthlyIncome: e.target.value })}
                          placeholder="3200"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-sterling-gold outline-none"
                        />
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="px-4 py-3 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 transition-colors"
                      >
                        Précédent
                      </button>
                      <button
                        type="submit"
                        className="flex-1 py-3 rounded-xl bg-sterling-navy hover:bg-sterling-navy-light text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
                      >
                        <span>Étape 3 : Sécurité & Mot de Passe</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </form>
                )}

                {/* STEP 3: Password & Consents */}
                {step === 3 && (
                  <form onSubmit={handleRegisterSubmit} className="mt-6 space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Définir un Mot de Passe Sécurisé *
                      </label>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                        <input
                          type={showPassword ? "text" : "password"}
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          placeholder="••••••••••••"
                          className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-sterling-gold outline-none"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Confirmer le Mot de Passe *
                      </label>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                        <input
                          type={showPassword ? "text" : "password"}
                          value={formData.confirmPassword}
                          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                          placeholder="••••••••••••"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-sterling-gold outline-none"
                          required
                        />
                      </div>
                    </div>

                    {/* Password criteria checklist */}
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-[11px] grid grid-cols-2 gap-1.5">
                      <div className={`flex items-center gap-1.5 ${hasMinLength ? "text-emerald-700 font-bold" : "text-slate-400"}`}>
                        {hasMinLength ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                        <span>8 caractères minimum</span>
                      </div>
                      <div className={`flex items-center gap-1.5 ${hasUppercase ? "text-emerald-700 font-bold" : "text-slate-400"}`}>
                        {hasUppercase ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                        <span>1 majuscule</span>
                      </div>
                      <div className={`flex items-center gap-1.5 ${hasNumber ? "text-emerald-700 font-bold" : "text-slate-400"}`}>
                        {hasNumber ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                        <span>1 chiffre</span>
                      </div>
                      <div className={`flex items-center gap-1.5 ${passwordsMatch ? "text-emerald-700 font-bold" : "text-slate-400"}`}>
                        {passwordsMatch ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                        <span>Mots de passe identiques</span>
                      </div>
                    </div>

                    {/* Consents */}
                    <div className="space-y-2 pt-2 text-xs">
                      <label className="flex items-start gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.consentTerms}
                          onChange={(e) => setFormData({ ...formData, consentTerms: e.target.checked })}
                          className="w-4 h-4 rounded text-sterling-navy mt-0.5"
                          required
                        />
                        <span className="text-slate-600 leading-tight">
                          J&apos;accepte les <strong>Conditions Générales d&apos;Utilisation</strong> du service bancaire en ligne Sterling Bank.
                        </span>
                      </label>

                      <label className="flex items-start gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.consentRGPD}
                          onChange={(e) => setFormData({ ...formData, consentRGPD: e.target.checked })}
                          className="w-4 h-4 rounded text-sterling-navy mt-0.5"
                          required
                        />
                        <span className="text-slate-600 leading-tight">
                          Je consens au traitement sécurisé de mes données conformément au <strong>RGPD</strong> et à la réglementation bancaire ACPR.
                        </span>
                      </label>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="px-4 py-3 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 transition-colors"
                      >
                        Précédent
                      </button>

                      <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-sterling-gold via-sterling-gold-light to-sterling-gold text-sterling-navy-deep font-extrabold text-xs sm:text-sm shadow-lg shadow-sterling-gold/30 hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
                      >
                        {loading ? (
                          <span>Création du compte en cours...</span>
                        ) : (
                          <>
                            <span>Créer Mon Compte Sécurisé</span>
                            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}

                {/* Login link */}
                <div className="mt-6 pt-6 border-t border-slate-100 text-center">
                  <p className="text-xs text-slate-500">
                    Vous avez déjà un compte client ou un dossier en cours ?
                  </p>
                  <Link
                    href="/login"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-sterling-navy hover:text-sterling-gold transition-colors mt-1"
                  >
                    Se connecter à l&apos;Espace Client →
                  </Link>
                </div>
              </>
            ) : (
              /* Success Confirmation */
              <div className="text-center py-6 space-y-6 animate-in fade-in">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-600/20">
                  <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-sterling-navy font-display">
                    Félicitations, votre compte est créé !
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed max-w-sm mx-auto">
                    Bienvenue chez Sterling Bank France, <span className="font-bold text-slate-800">{formData.firstName} {formData.lastName}</span>. Vos identifiants sécurisés sont désormais actifs.
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-slate-700 space-y-1">
                  <div className="font-semibold text-sterling-navy">Identifiant de connexion :</div>
                  <div className="font-mono font-bold text-sm text-slate-800">{formData.email}</div>
                  <div className="text-[11px] text-emerald-700 font-semibold pt-1">
                    ✓ Double facteur SMS prêt sur le {formData.phone}
                  </div>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => router.push("/dashboard")}
                    className="w-full py-3.5 rounded-xl bg-sterling-navy hover:bg-sterling-navy-light text-white font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <span>Accéder à mon Espace Client (Dashboard)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <Link
                    href="/personal-loans"
                    className="block text-center text-xs font-bold text-sterling-gold hover:underline py-1"
                  >
                    Simuler et demander un Prêt Personnel immédiatement →
                  </Link>
                </div>
              </div>
            )}

          </div>

          <div className="text-center text-[11px] text-slate-500">
            « Un crédit vous engage et doit être remboursé. Vérifiez vos capacités de remboursement avant de vous engager. »
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
