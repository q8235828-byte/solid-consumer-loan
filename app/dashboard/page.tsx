"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuickApplyModal from "@/components/QuickApplyModal";
import { 
  getApplications, 
  LoanApplication 
} from "@/lib/loanStore";
import { formatMoney } from "@/lib/utils";
import { 
  Building2, 
  UserCheck, 
  CreditCard, 
  FileText, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  UploadCloud, 
  Download, 
  ArrowUpRight, 
  Plus, 
  ShieldCheck, 
  PhoneCall, 
  MessageSquare, 
  Send, 
  ChevronRight,
  TrendingDown,
  RefreshCw,
  Eye,
  Check
} from "lucide-react";

export default function UserDashboard() {
  const [applications, setApplications] = useState<LoanApplication[]>([]);
  const [selectedApp, setSelectedApp] = useState<LoanApplication | null>(null);
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ sender: "user" | "advisor"; text: string; time: string }[]>([
    {
      sender: "advisor",
      text: "Bonjour Jean-Pierre ! Je suis Émilie Bernard, votre conseillère dédiée. Votre dossier SBA-FR-2026-89412 a été pré-validé avec succès. N'hésitez pas si vous avez des questions sur votre contrat.",
      time: "10:15"
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [repayModalOpen, setRepayModalOpen] = useState(false);

  const loadData = () => {
    const list = getApplications();
    setApplications(list);
    if (list.length > 0 && !selectedApp) {
      setSelectedApp(list[0]);
    }
  };

  useEffect(() => {
    loadData();

    const handleUpdate = () => {
      loadData();
    };

    window.addEventListener("sterling_applications_updated", handleUpdate);
    return () => window.removeEventListener("sterling_applications_updated", handleUpdate);
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMsg = {
      sender: "user" as const,
      text: inputMessage,
      time: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })
    };

    setChatMessages(prev => [...prev, newMsg]);
    setInputMessage("");

    // Simulate advisor response
    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        {
          sender: "advisor",
          text: "Bien reçu ! Votre demande est prise en compte par le service crédit. Vos fonds seront virés selon vos instructions sous 24h.",
          time: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })
        }
      ]);
    }, 1200);
  };

  const handleSimulateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const name = e.target.files[0].name;
      setUploadedFiles(prev => [name, ...prev]);
    }
  };

  const activeApp = selectedApp || applications[0];

  const getStatusStep = (status: LoanApplication["status"]) => {
    switch (status) {
      case "pending": return 1;
      case "under_review": return 2;
      case "approved": return 3;
      case "disbursed": return 4;
      case "rejected": return 0;
      default: return 1;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 font-sans text-slate-800">
      <Navbar onOpenApply={() => setApplyModalOpen(true)} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-sterling-navy-deep via-sterling-navy to-slate-800 text-white rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sterling-gold/20 text-sterling-gold text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              Espace Client Certifié • Sécurité eIDAS & RGPD
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display">
              Bienvenue, {activeApp ? activeApp.applicantName : "Jean-Pierre Lambert"}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Gérez vos crédits en cours, transmettez vos justificatifs et suivez vos échéances en temps réel.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setApplyModalOpen(true)}
              className="bg-gradient-to-r from-sterling-gold via-sterling-gold-light to-sterling-gold text-sterling-navy-deep font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-md hover:scale-[1.02] transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              Nouvelle Demande
            </button>
          </div>
        </div>

        {/* Financial KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Capital Restant Dû</span>
              <CreditCard className="w-4 h-4 text-sterling-gold" />
            </div>
            <div className="text-2xl font-black text-sterling-navy">
              {formatMoney(activeApp ? activeApp.amount * 0.76 : 11400, activeApp?.currency || "USD")}
            </div>
            <div className="text-[11px] text-slate-500 flex items-center gap-1">
              <span>Montant initial : {formatMoney(activeApp?.amount || 15000, activeApp?.currency || "USD")}</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Prochaine Échéance</span>
              <Calendar className="w-4 h-4 text-sterling-navy" />
            </div>
            <div className="text-2xl font-black text-emerald-600">
              {formatMoney(activeApp?.monthlyPayment || 435, activeApp?.currency || "USD")}
            </div>
            <div className="text-[11px] text-slate-500 flex items-center gap-1">
              <span>Prélèvement SEPA : <strong>05 Décembre 2026</strong></span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Taux TAEG Fixe</span>
              <TrendingDown className="w-4 h-4 text-sterling-gold" />
            </div>
            <div className="text-2xl font-black text-sterling-navy">
              {activeApp?.interestRate.toFixed(2)} %
            </div>
            <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
              <Check className="w-3 h-3" /> Taux garanti sans variation
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Durée Restante</span>
              <Clock className="w-4 h-4 text-indigo-500" />
            </div>
            <div className="text-2xl font-black text-sterling-navy">
              {Math.max(1, (activeApp?.termMonths || 36) - 8)} mois
            </div>
            <div className="text-[11px] text-slate-500">
              Sur {activeApp?.termMonths || 36} mensualités contractuelles
            </div>
          </div>
        </div>

        {/* Main Content Grid: Loan Tracker & Action Center */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Applications and Details (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Application Selector Tabs */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-lg font-bold text-sterling-navy">Mes Dossiers de Financement</h2>
                  <p className="text-xs text-slate-500">Cliquez sur un dossier pour visualiser son statut et ses documents.</p>
                </div>
                <button
                  onClick={loadData}
                  className="inline-flex items-center gap-1.5 text-xs text-sterling-navy hover:text-sterling-gold font-semibold transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Actualiser
                </button>
              </div>

              {/* Application Cards List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {applications.map((app) => (
                  <button
                    key={app.id}
                    onClick={() => setSelectedApp(app)}
                    className={`text-left p-4 rounded-xl border transition-all ${
                      selectedApp?.id === app.id
                        ? "border-sterling-gold bg-amber-50/40 shadow-sm"
                        : "border-slate-200 hover:border-slate-300 bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-bold text-sterling-navy">
                        {app.referenceNumber}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        app.status === "approved" || app.status === "disbursed"
                          ? "bg-emerald-100 text-emerald-700"
                          : app.status === "under_review"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-blue-100 text-blue-700"
                      }`}>
                        {app.statusLabelFr.split(" - ")[0]}
                      </span>
                    </div>

                    <div className="text-sm font-bold text-slate-800 mt-2">
                      {app.loanTypeLabel}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {formatMoney(app.amount, app.currency || "USD")} • {app.termMonths} mois à {formatMoney(app.monthlyPayment, app.currency || "USD")}/m
                    </div>
                  </button>
                ))}
              </div>

              {/* Active Application Live Pipeline */}
              {activeApp && (
                <div className="pt-4 space-y-6">
                  <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold uppercase tracking-wider text-sterling-gold">
                          Dossier Sélectionné : {activeApp.referenceNumber}
                        </div>
                        <div className="text-base font-extrabold text-sterling-navy">
                          {activeApp.statusLabelFr}
                        </div>
                      </div>
                      <span className="text-xs text-slate-400">
                        Mis à jour le {new Date(activeApp.lastUpdated).toLocaleDateString("fr-FR")}
                      </span>
                    </div>

                    {/* Progress Steps */}
                    <div className="grid grid-cols-4 gap-2 pt-2">
                      {[
                        { label: "1. Déposé", desc: "Dossier reçu" },
                        { label: "2. Analyse", desc: "Vérification pièces" },
                        { label: "3. Accord", desc: "Offre émise" },
                        { label: "4. Déblocage", desc: "Fonds virés" },
                      ].map((step, idx) => {
                        const currentStepNum = getStatusStep(activeApp.status);
                        const isDone = idx + 1 <= currentStepNum;
                        const isCurrent = idx + 1 === currentStepNum;

                        return (
                          <div key={idx} className="space-y-1.5">
                            <div className={`h-2 rounded-full transition-all ${
                              isDone ? "bg-emerald-500" : "bg-slate-200"
                            }`} />
                            <div className={`text-xs font-bold ${
                              isCurrent ? "text-sterling-navy" : isDone ? "text-emerald-700" : "text-slate-400"
                            }`}>
                              {step.label}
                            </div>
                            <div className="text-[10px] text-slate-500 hidden sm:block">
                              {step.desc}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Officer Notes if any */}
                    {activeApp.officerNotes.length > 0 && (
                      <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs space-y-1">
                        <div className="font-bold text-slate-700 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                          Note de votre analyste crédit :
                        </div>
                        <div className="text-slate-600 italic">
                          &laquo; {activeApp.officerNotes[0]} &raquo;
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

            </div>

            {/* Document Vault & Upload Dropzone */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-sterling-navy flex items-center gap-2">
                    <FileText className="w-5 h-5 text-sterling-gold" />
                    Coffre-Fort Numérique & Justificatifs
                  </h3>
                  <p className="text-xs text-slate-500">
                    Documents chiffrés AES-256 stockés en conformité RGPD.
                  </p>
                </div>
                <label className="cursor-pointer bg-slate-800 hover:bg-sterling-navy text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-colors flex items-center gap-1.5 shadow-sm">
                  <UploadCloud className="w-4 h-4 text-sterling-gold" />
                  <span>Ajouter une pièce</span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleSimulateUpload}
                    accept=".pdf,.png,.jpg,.jpeg"
                  />
                </label>
              </div>

              {/* Uploaded Documents List */}
              <div className="divide-y divide-slate-100">
                {activeApp?.documents.map((doc, i) => (
                  <div key={i} className="py-3 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 font-bold">
                        PDF
                      </div>
                      <div>
                        <div className="font-semibold text-slate-800">{doc.name}</div>
                        <div className="text-[10px] text-slate-400">{doc.type} • Déposé le {doc.uploadedAt}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        doc.status === "verified"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                      }`}>
                        {doc.status === "verified" ? "Vérifié par la banque" : "En cours de lecture"}
                      </span>
                      <button className="text-slate-400 hover:text-sterling-navy transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}

                {uploadedFiles.map((fname, i) => (
                  <div key={`new-${i}`} className="py-3 flex items-center justify-between text-xs bg-emerald-50/50 px-2 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                        NEW
                      </div>
                      <div>
                        <div className="font-semibold text-emerald-900">{fname}</div>
                        <div className="text-[10px] text-emerald-600">Téléchargé à l&apos;instant • Transmission sécurisée</div>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-200 text-emerald-800">
                      Reçu
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions & Repayment Simulator */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
              <h3 className="text-base font-bold text-sterling-navy">Actions Rapides sur votre Crédit</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  onClick={() => setRepayModalOpen(true)}
                  className="p-3 text-left rounded-xl border border-slate-200 hover:border-sterling-gold hover:bg-slate-50 transition-all space-y-1"
                >
                  <div className="text-xs font-bold text-sterling-navy">Remboursement Anticipé</div>
                  <div className="text-[11px] text-slate-500">Remboursez sans frais d&apos;indemnité (Art. L312-34)</div>
                </button>

                <button
                  onClick={() => alert("Votre tableau d'amortissement officiel certifié a été généré et envoyé à votre adresse email.")}
                  className="p-3 text-left rounded-xl border border-slate-200 hover:border-sterling-gold hover:bg-slate-50 transition-all space-y-1"
                >
                  <div className="text-xs font-bold text-sterling-navy">Télécharger l&apos;Échéancier</div>
                  <div className="text-[11px] text-slate-500">Tableau complet en format PDF fiscal certifié</div>
                </button>

                <button
                  onClick={() => alert("Demande de modulation d'échéance transmise à votre conseiller Émilie Bernard.")}
                  className="p-3 text-left rounded-xl border border-slate-200 hover:border-sterling-gold hover:bg-slate-50 transition-all space-y-1"
                >
                  <div className="text-xs font-bold text-sterling-navy">Reporter une Mensualité</div>
                  <div className="text-[11px] text-slate-500">Suspension jusqu&apos;à 2 mois par an sans pénalité</div>
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Advisor Chat & Security (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Dedicated Banking Advisor Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80"
                    alt="Émilie Bernard"
                    className="w-14 h-14 rounded-full object-cover border-2 border-sterling-gold"
                  />
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full" />
                </div>
                <div>
                  <div className="text-xs text-slate-400">Votre conseillère attitrée</div>
                  <div className="text-sm font-bold text-sterling-navy">Émilie Bernard</div>
                  <div className="text-[11px] text-emerald-600 font-semibold">Disponible en agence Paris</div>
                </div>
              </div>

              <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1">
                <div className="flex items-center gap-2">
                  <PhoneCall className="w-3.5 h-3.5 text-sterling-gold" />
                  <span>Ligne directe : 01 89 54 22 10</span>
                </div>
                <div className="flex items-center gap-2 text-slate-500">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Lun - Ven : 8h30 - 19h00</span>
                </div>
              </div>

              {/* Chat Window */}
              <div className="border border-slate-200 rounded-xl overflow-hidden flex flex-col h-64 bg-slate-50">
                <div className="p-2.5 bg-sterling-navy text-white text-[11px] font-bold flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-sterling-gold" />
                    Messagerie Sécurisée
                  </span>
                  <span className="text-[10px] text-emerald-400">En ligne</span>
                </div>

                <div className="flex-1 p-3 overflow-y-auto space-y-2 text-xs">
                  {chatMessages.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
                    >
                      <div className={`p-2.5 rounded-xl max-w-[85%] leading-relaxed ${
                        msg.sender === "user"
                          ? "bg-sterling-navy text-white rounded-tr-none"
                          : "bg-white text-slate-800 border border-slate-200 rounded-tl-none shadow-sm"
                      }`}>
                        {msg.text}
                      </div>
                      <span className="text-[9px] text-slate-400 mt-0.5">{msg.time}</span>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendMessage} className="p-2 bg-white border-t border-slate-200 flex gap-1.5">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Posez votre question..."
                    className="flex-1 text-xs px-3 py-1.5 border border-slate-200 rounded-lg outline-none focus:border-sterling-navy"
                  />
                  <button
                    type="submit"
                    className="p-1.5 bg-sterling-navy text-white rounded-lg hover:bg-sterling-navy-light transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>

            {/* Mandatory Regulatory Warning in Dashboard */}
            <div className="p-4 bg-amber-500/10 border border-amber-400/30 rounded-xl text-center">
              <p className="text-[11px] font-semibold text-amber-800 leading-snug">
                « Un crédit vous engage et doit être remboursé. Vérifiez vos capacités de remboursement avant de vous engager. »
              </p>
            </div>

          </div>

        </div>

      </main>

      <Footer />

      {/* Early Repayment Modal */}
      {repayModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <h3 className="text-lg font-bold text-sterling-navy">Simuler un Remboursement Anticipé</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Conformément à l&apos;Article L312-34 du Code de la consommation, aucun frais ni indemnité ne s&apos;applique si le remboursement est inférieur à 10 000 €.
            </p>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-700">Montant à rembourser (€)</label>
                <input
                  type="number"
                  defaultValue="3000"
                  className="w-full mt-1 p-2.5 border border-slate-200 rounded-lg text-sm font-bold text-sterling-navy outline-none"
                />
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl text-xs text-emerald-800 space-y-1">
                <div className="font-bold">Économie d&apos;intérêts estimée : 142,50 €</div>
                <div className="text-[11px]">Votre nouvelle mensualité passera de {activeApp?.monthlyPayment.toFixed(2)} € à {(Number(activeApp?.monthlyPayment || 400) * 0.75).toFixed(2)} €.</div>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => {
                  alert("Demande de remboursement anticipé transmise avec succès.");
                  setRepayModalOpen(false);
                }}
                className="flex-1 bg-sterling-navy text-white font-bold py-2.5 rounded-xl text-xs hover:bg-sterling-navy-light transition-colors"
              >
                Confirmer l&apos;Opération
              </button>
              <button
                onClick={() => setRepayModalOpen(false)}
                className="px-4 py-2.5 border border-slate-200 rounded-xl text-xs text-slate-600 hover:bg-slate-50"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      <QuickApplyModal
        isOpen={applyModalOpen}
        onClose={() => setApplyModalOpen(false)}
      />
    </div>
  );
}
