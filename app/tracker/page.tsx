"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getApplications } from "@/lib/loanStore";
import { 
  Search, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  ArrowRight,
  UserCheck,
  FileCheck2,
  Calendar,
  CreditCard,
  Building2,
  ChevronRight,
  AlertCircle
} from "lucide-react";

export default function TrackerPage() {
  const [refNumber, setRefNumber] = useState("");
  const [phoneDigits, setPhoneDigits] = useState("");
  const [statusResult, setStatusResult] = useState<any>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);

    const apps = getApplications();
    const query = refNumber.trim().toLowerCase();
    const found = apps.find(a => 
      (query && a.referenceNumber.toLowerCase().includes(query)) || 
      (phoneDigits && a.phone.endsWith(phoneDigits))
    );

    if (found) {
      const isApproved = found.status === "approved" || found.status === "disbursed";
      const isDisbursed = found.status === "disbursed";
      setStatusResult({
        ref: found.referenceNumber,
        applicant: found.applicantName,
        loanType: found.loanTypeLabel,
        amount: `${found.amount.toLocaleString("fr-FR")} €`,
        submissionDate: new Date(found.createdAt).toLocaleDateString("fr-FR"),
        statusLabel: found.statusLabelFr,
        stages: [
          { name: "Dossier Enregistré en Ligne", date: "Complet", status: "completed" },
          { name: "Vérification des Justificatifs & CNI", date: "Vérifié", status: "completed" },
          { name: "Étude de Solvabilité & Comité de Crédit", date: isApproved ? "Avis Favorable Émis" : "En cours", status: isApproved ? "completed" : "active" },
          { name: "Offre Préalable & Signature Électronique", date: isApproved ? "Contrat émis" : "En attente", status: isApproved ? (isDisbursed ? "completed" : "active") : "pending" },
          { name: "Virement des Fonds sur votre RIB", date: isDisbursed ? "Virement Exécuté" : "En attente", status: isDisbursed ? "completed" : "pending" },
        ],
        remarks: found.officerNotes[0] || "Votre dossier est géré par notre pôle crédit à Paris.",
      });
    } else {
      // Mock tracking fallback
      setStatusResult({
        ref: refNumber || "SBA-FR-2026-89412",
        applicant: "Jean-Pierre Lambert",
        loanType: "Prêt Personnel Express",
        amount: "15 000 €",
        submissionDate: "03 Novembre 2026",
        statusLabel: "Approuvé - En attente de signature",
        stages: [
          { name: "Dossier Enregistré en Ligne", date: "03 Nov 2026 • 10:15", status: "completed" },
          { name: "Vérification des Justificatifs & CNI", date: "03 Nov 2026 • 14:30", status: "completed" },
          { name: "Étude de Solvabilité & Comité de Crédit", date: "Avis Favorable Émis", status: "completed" },
          { name: "Offre Préalable & Signature Électronique", date: "En attente de signature eIDAS", status: "active" },
          { name: "Virement des Fonds sur votre RIB", date: "Sous 48h après signature", status: "pending" },
        ],
        remarks: "Ratio d'endettement validé à 28.5%. Votre offre de crédit est disponible sur votre Espace Client.",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-800">
      <Navbar />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full space-y-8">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-sterling-navy transition-colors">Accueil</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-semibold text-sterling-navy">Suivi de Demande en Direct</span>
        </div>

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-sterling-gold uppercase tracking-wider bg-amber-50 border border-amber-200 px-3.5 py-1 rounded-full">
            <Search className="w-3.5 h-3.5" />
            Portail Officiel de Suivi des Demandes
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-sterling-navy font-display tracking-tight">
            Où en est Votre Demande de Prêt ?
          </h1>
          <p className="text-sm text-slate-600">
            Saisissez votre numéro de référence dossier (ex: <code>SBA-FR-2026-89412</code>) ou les 4 derniers chiffres de votre mobile pour consulter l&apos;état d&apos;avancement de votre financement en temps réel.
          </p>
        </div>

        {/* Search Form Card */}
        <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200">
          <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
            <div className="sm:col-span-7">
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Numéro de Référence Dossier
              </label>
              <input
                type="text"
                placeholder="ex : SBA-FR-2026-89412"
                value={refNumber}
                onChange={(e) => setRefNumber(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-mono font-medium focus:ring-2 focus:ring-sterling-gold focus:border-sterling-gold outline-none"
              />
            </div>

            <div className="sm:col-span-3">
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Mobile (4 derniers chiffres)
              </label>
              <input
                type="text"
                maxLength={4}
                placeholder="1230"
                value={phoneDigits}
                onChange={(e) => setPhoneDigits(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-mono font-medium text-center focus:ring-2 focus:ring-sterling-gold focus:border-sterling-gold outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <button
                type="submit"
                className="w-full bg-sterling-navy hover:bg-sterling-navy-light text-white font-bold py-3 px-4 rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 shadow-md"
              >
                Suivre
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        </div>

        {/* Tracking Output */}
        {searched && statusResult && (
          <div className="max-w-3xl mx-auto bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-sterling-gold/40 animate-in fade-in duration-300 space-y-8">
            
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Référence Dossier</span>
                <div className="text-xl font-mono font-black text-sterling-navy">{statusResult.ref}</div>
                <div className="text-xs text-slate-600 mt-0.5">
                  Demandeur : <span className="font-semibold">{statusResult.applicant}</span> • {statusResult.loanType} ({statusResult.amount})
                </div>
              </div>
              <div className="sm:text-right">
                <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-800 border border-amber-200 px-3 py-1 rounded-full text-xs font-bold">
                  <Clock className="w-3.5 h-3.5 text-amber-600 animate-spin" />
                  {statusResult.statusLabel.split(" - ")[0]}
                </span>
                <div className="text-[11px] text-slate-400 mt-1">Déposé le {statusResult.submissionDate}</div>
              </div>
            </div>

            {/* Pipeline Stages */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Avancement des Étapes d&apos;Octroi
              </h4>

              <div className="space-y-4">
                {statusResult.stages.map((stage: any, idx: number) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                          stage.status === "completed"
                            ? "bg-emerald-600 text-white"
                            : stage.status === "active"
                            ? "bg-sterling-gold text-sterling-navy-deep ring-4 ring-sterling-gold/20"
                            : "bg-slate-200 text-slate-400"
                        }`}
                      >
                        {stage.status === "completed" ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : (
                          idx + 1
                        )}
                      </div>
                      {idx < statusResult.stages.length - 1 && (
                        <div
                          className={`w-0.5 h-10 my-1 ${
                            stage.status === "completed" ? "bg-emerald-600" : "bg-slate-200"
                          }`}
                        />
                      )}
                    </div>

                    <div className="flex-1 pt-1">
                      <div
                        className={`text-sm font-bold ${
                          stage.status === "completed"
                            ? "text-slate-800"
                            : stage.status === "active"
                            ? "text-sterling-navy"
                            : "text-slate-400"
                        }`}
                      >
                        {stage.name}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        {stage.date}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Officer Remarks & Dashboard CTA */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-xs text-slate-700 space-y-3">
              <div className="space-y-1">
                <div className="font-bold text-sterling-navy flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-sterling-gold" />
                  Note de votre Conseiller Crédit
                </div>
                <p className="leading-relaxed text-slate-600">{statusResult.remarks}</p>
              </div>

              <div className="pt-2 border-t border-slate-200/60 flex flex-col sm:flex-row gap-2">
                <Link
                  href="/dashboard"
                  className="bg-sterling-navy hover:bg-sterling-navy-light text-white font-bold py-2.5 px-5 rounded-xl text-xs transition-colors inline-flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <UserCheck className="w-3.5 h-3.5 text-sterling-gold" />
                  Ouvrir dans mon Espace Client
                </Link>
                <Link
                  href="/personal-loans"
                  className="bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 font-medium py-2.5 px-4 rounded-xl text-xs transition-colors inline-flex items-center justify-center gap-1.5"
                >
                  Déposer une autre demande
                </Link>
              </div>
            </div>

          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
