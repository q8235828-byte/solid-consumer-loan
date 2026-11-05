"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Search, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  ArrowRight,
  UserCheck
} from "lucide-react";
import { getApplications } from "@/lib/loanStore";

export default function TrackerSection() {
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
      a.referenceNumber.toLowerCase().includes(query) || 
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
          { name: "Vérification des Justificatifs", date: "Vérifié", status: "completed" },
          { name: "Étude de Solvabilité & Comité", date: isApproved ? "Avis Favorable" : "En cours", status: isApproved ? "completed" : "active" },
          { name: "Offre Préalable & Signature", date: isApproved ? "Contrat émis" : "En attente", status: isApproved ? (isDisbursed ? "completed" : "active") : "pending" },
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
    <section id="tracker" className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-sterling-gold uppercase tracking-wider bg-amber-50 border border-amber-200 px-3.5 py-1 rounded-full">
            <Search className="w-3.5 h-3.5" />
            Espace Suivi de Dossier
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-sterling-navy font-display tracking-tight">
            Où en est Votre Demande de Prêt ?
          </h2>
          <p className="text-sm text-slate-600">
            Saisissez votre numéro de référence dossier (reçu par email/SMS) et les 4 derniers chiffres de votre mobile pour suivre l&apos;avancement en temps réel.
          </p>
        </div>

        {/* Search Card */}
        <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 mb-10">
          <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
            <div className="sm:col-span-7">
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Numéro de Référence Dossier
              </label>
              <input
                type="text"
                placeholder="ex : SBF-CR-202611-98421"
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
                placeholder="4567"
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

        {/* Tracking Timeline Output */}
        {searched && statusResult && (
          <div className="max-w-3xl mx-auto bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-sterling-gold/40 animate-in fade-in duration-300 space-y-8">
            
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Référence Dossier</span>
                <div className="text-xl font-mono font-black text-sterling-navy">{statusResult.ref}</div>
                <div className="text-xs text-slate-600 mt-0.5">
                  Emprunteur : <span className="font-semibold">{statusResult.applicant}</span> • {statusResult.loanType} ({statusResult.amount})
                </div>
              </div>
              <div className="sm:text-right">
                <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-800 border border-amber-200 px-3 py-1 rounded-full text-xs font-bold">
                  <Clock className="w-3.5 h-3.5 text-amber-600 animate-spin" />
                  Étude de Solvabilité
                </span>
                <div className="text-[11px] text-slate-400 mt-1">Déposé le {statusResult.submissionDate}</div>
              </div>
            </div>

            {/* Stages Pipeline */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Avancement des Étapes
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
                          <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                        ) : (
                          idx + 1
                        )}
                      </div>
                      {idx < statusResult.stages.length - 1 && (
                        <div
                          className={`w-0.5 h-8 my-1 ${
                            stage.status === "completed" ? "bg-emerald-600" : "bg-slate-200"
                          }`}
                        />
                      )}
                    </div>

                    <div className="pt-1">
                      <div className="text-sm font-bold text-sterling-navy">
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
                  className="bg-sterling-navy hover:bg-sterling-navy-light text-white font-bold py-2 px-4 rounded-xl text-xs transition-colors inline-flex items-center justify-center gap-1.5"
                >
                  <UserCheck className="w-3.5 h-3.5 text-sterling-gold" />
                  Ouvrir mon Espace Client Dédié
                </Link>
                <Link
                  href="/admin"
                  className="bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 font-medium py-2 px-4 rounded-xl text-xs transition-colors inline-flex items-center justify-center gap-1.5"
                >
                  Gérer dans la Console Admin
                </Link>
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
