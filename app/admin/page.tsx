"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  getApplications, 
  saveApplications, 
  updateApplicationStatus, 
  LoanApplication 
} from "@/lib/loanStore";
import { formatMoney } from "@/lib/utils";
import { 
  Building2, 
  SlidersHorizontal, 
  ShieldCheck, 
  Users, 
  CreditCard, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Search, 
  Filter, 
  FileText, 
  TrendingUp, 
  Download, 
  ArrowRight, 
  Eye, 
  Edit3, 
  Plus, 
  Check, 
  AlertTriangle,
  RotateCcw,
  Percent,
  Banknote,
  Send,
  Lock
} from "lucide-react";

export default function AdminDashboard() {
  const [applications, setApplications] = useState<LoanApplication[]>([]);
  const [selectedApp, setSelectedApp] = useState<LoanApplication | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [newNote, setNewNote] = useState("");
  
  // Credit Policy Control State
  const [rates, setRates] = useState({
    persona: 2.85,
    auto: 3.10,
    ecosolutions: 2.50,
    home: 3.45,
    maxAmount: 75000,
    maxDTI: 35
  });
  const [policySaved, setPolicySaved] = useState(false);
  const [activeTab, setActiveTab] = useState<"applications" | "policy" | "analytics">("applications");

  const loadData = () => {
    const list = getApplications();
    setApplications(list);
    if (list.length > 0 && !selectedApp) {
      setSelectedApp(list[0]);
    }
  };

  useEffect(() => {
    loadData();

    // Check saved rates from localStorage
    try {
      const saved = localStorage.getItem("sterling_credit_policy");
      if (saved) setRates(JSON.parse(saved));
    } catch (e) {}

    const handleUpdate = () => loadData();
    window.addEventListener("sterling_applications_updated", handleUpdate);
    return () => window.removeEventListener("sterling_applications_updated", handleUpdate);
  }, []);

  const handleUpdateStatus = (
    id: string, 
    status: LoanApplication["status"], 
    label: string, 
    note?: string
  ) => {
    const updated = updateApplicationStatus(id, status, label, note);
    if (updated) {
      setSelectedApp(updated);
      loadData();
    }
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim() || !selectedApp) return;

    handleUpdateStatus(
      selectedApp.id, 
      selectedApp.status, 
      selectedApp.statusLabelFr, 
      `Note Analyste (${new Date().toLocaleDateString("fr-FR")} ${new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}) : ${newNote}`
    );
    setNewNote("");
  };

  const handleSavePolicy = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("sterling_credit_policy", JSON.stringify(rates));
    setPolicySaved(true);
    setTimeout(() => setPolicySaved(false), 2500);
  };

  const handleExportCSV = () => {
    const headers = "Reference,Nom,Email,Telephone,Produit,Montant,Duree,Mensualite,TAEG,Statut\n";
    const rows = applications.map(a => 
      `"${a.referenceNumber}","${a.applicantName}","${a.email}","${a.phone}","${a.loanTypeLabel}",${a.amount},${a.termMonths},${a.monthlyPayment},${a.interestRate},"${a.status}"`
    ).join("\n");

    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `sterling_dossiers_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered applications
  const filteredApps = applications.filter(app => {
    const matchesSearch = 
      app.applicantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.referenceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // KPI Calculations
  const totalVolume = applications.reduce((acc, a) => acc + a.amount, 0);
  const disbursedVolume = applications.filter(a => a.status === "disbursed").reduce((acc, a) => acc + a.amount, 0);
  const approvedCount = applications.filter(a => a.status === "approved" || a.status === "disbursed").length;
  const approvalRate = applications.length > 0 ? Math.round((approvedCount / applications.length) * 100) : 0;

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 font-sans text-slate-800">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Admin Header */}
        <div className="bg-gradient-to-r from-sterling-navy-deep via-sterling-navy to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Console Centrale d&apos;Administration des Crédits (Back-Office Paris)
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display">
              Contrôle et Décisionnaire Crédit
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Supervisez les demandes de financement en temps réel, ajustez les taux directeurs TAEG et validez les décaissements.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleExportCSV}
              className="bg-white/10 hover:bg-white/20 text-white font-medium text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-white/20 transition-all flex items-center gap-2"
            >
              <Download className="w-4 h-4 text-sterling-gold" />
              Exporter en CSV
            </button>
            <Link
              href="/dashboard"
              className="bg-gradient-to-r from-sterling-gold via-sterling-gold-light to-sterling-gold text-sterling-navy-deep font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-md hover:scale-[1.02] transition-all flex items-center gap-2"
            >
              <Users className="w-4 h-4" />
              Voir Espace Client
            </Link>
          </div>
        </div>

        {/* Global KPI Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Volume Total Demandé</span>
              <Banknote className="w-4 h-4 text-sterling-navy" />
            </div>
            <div className="text-2xl font-black text-sterling-navy">
              {totalVolume.toLocaleString("fr-FR")} €
            </div>
            <div className="text-[11px] text-slate-500">
              Sur {applications.length} dossiers instruits
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Fonds Débloqués (Disbursed)</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-black text-emerald-600">
              {disbursedVolume.toLocaleString("fr-FR")} €
            </div>
            <div className="text-[11px] text-emerald-700 font-semibold">
              Virements SEPA exécutés
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Taux d&apos;Acceptation</span>
              <TrendingUp className="w-4 h-4 text-sterling-gold" />
            </div>
            <div className="text-2xl font-black text-sterling-navy">
              {approvalRate} %
            </div>
            <div className="text-[11px] text-slate-500">
              Conformité avec les critères Banque de France
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Dossiers en Attente d&apos;Avis</span>
              <Clock className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-black text-amber-600">
              {applications.filter(a => a.status === "pending" || a.status === "under_review").length}
            </div>
            <div className="text-[11px] text-slate-500">
              Délai moyen de réponse : 18 min
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 gap-6 text-sm font-semibold">
          <button
            onClick={() => setActiveTab("applications")}
            className={`pb-3 border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === "applications"
                ? "border-sterling-navy text-sterling-navy font-bold"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Users className="w-4 h-4 text-sterling-gold" />
            Gestion des Demandes ({filteredApps.length})
          </button>

          <button
            onClick={() => setActiveTab("policy")}
            className={`pb-3 border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === "policy"
                ? "border-sterling-navy text-sterling-navy font-bold"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Percent className="w-4 h-4 text-sterling-gold" />
            Paramétrage des Taux & Risque (Full Control)
          </button>
        </div>

        {/* TAB 1: Applications Management */}
        {activeTab === "applications" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Table & List (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              
              {/* Filter and Search Bar */}
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Rechercher par nom, email ou n° dossier..."
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl outline-none focus:border-sterling-navy"
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="text-xs px-3 py-2 border border-slate-200 rounded-xl outline-none bg-slate-50 text-slate-700 font-medium"
                >
                  <option value="all">Tous les Statuts</option>
                  <option value="pending">En attente (Dossier Reçu)</option>
                  <option value="under_review">En analyse comité</option>
                  <option value="approved">Approuvé (Accord de principe)</option>
                  <option value="disbursed">Fonds débloqués (Virement fait)</option>
                  <option value="rejected">Refusé</option>
                </select>
              </div>

              {/* Applications List */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 divide-y divide-slate-100 overflow-hidden">
                {filteredApps.length === 0 ? (
                  <div className="p-8 text-center text-xs text-slate-400">
                    Aucun dossier ne correspond à vos critères de recherche.
                  </div>
                ) : (
                  filteredApps.map((app) => (
                    <div
                      key={app.id}
                      onClick={() => setSelectedApp(app)}
                      className={`p-4 cursor-pointer hover:bg-slate-50 transition-colors flex items-center justify-between ${
                        selectedApp?.id === app.id ? "bg-amber-50/50 border-l-4 border-sterling-gold" : ""
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-sterling-navy">{app.applicantName}</span>
                          <span className="text-[10px] font-mono text-slate-400">{app.referenceNumber}</span>
                        </div>
                        <div className="text-xs text-slate-600">
                          {app.loanTypeLabel} • <strong>{formatMoney(app.amount, app.currency || "USD")}</strong> sur {app.termMonths} mois
                        </div>
                        <div className="text-[10px] text-slate-400">
                          Revenus : {formatMoney(app.monthlyIncome, app.currency || "USD")}/m • Score solvabilité : {app.creditScore}/900
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-1.5">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          app.status === "approved" || app.status === "disbursed"
                            ? "bg-emerald-100 text-emerald-700"
                            : app.status === "under_review"
                            ? "bg-amber-100 text-amber-700"
                            : app.status === "rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-blue-100 text-blue-700"
                        }`}>
                          {app.status.toUpperCase()}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {new Date(app.createdAt).toLocaleDateString("fr-FR")}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>

            </div>

            {/* Application Detail & Full Control Actions (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              {selectedApp ? (
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-6">
                  
                  {/* Header */}
                  <div className="border-b border-slate-100 pb-4 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono text-sterling-gold font-bold">
                        {selectedApp.referenceNumber}
                      </span>
                      <span className="text-xs text-slate-400">
                        Créé le {new Date(selectedApp.createdAt).toLocaleDateString("fr-FR")}
                      </span>
                    </div>
                    <h3 className="text-xl font-extrabold text-sterling-navy">
                      {selectedApp.applicantName}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {selectedApp.email} • {selectedApp.phone}
                    </p>
                  </div>

                  {/* Financial & Underwriting Details */}
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-slate-50 rounded-xl space-y-0.5">
                      <div className="text-slate-400 text-[10px]">Montant sollicité ({selectedApp.currency || "USD"})</div>
                      <div className="font-bold text-base text-sterling-navy">{formatMoney(selectedApp.amount, selectedApp.currency || "USD")}</div>
                      <div className="text-slate-500">{selectedApp.termMonths} mois à {formatMoney(selectedApp.monthlyPayment, selectedApp.currency || "USD")}/m</div>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl space-y-0.5">
                      <div className="text-slate-400 text-[10px]">Profil Financier</div>
                      <div className="font-bold text-base text-emerald-700">{formatMoney(selectedApp.monthlyIncome, selectedApp.currency || "USD")}/m</div>
                      <div className="text-slate-500">{selectedApp.employmentType}</div>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl space-y-0.5">
                      <div className="text-slate-400 text-[10px]">Taux TAEG Fixe</div>
                      <div className="font-bold text-base text-sterling-navy">{selectedApp.interestRate.toFixed(2)} %</div>
                      <div className="text-slate-500">Taux contractuel</div>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl space-y-0.5">
                      <div className="text-slate-400 text-[10px]">Score de Solvabilité</div>
                      <div className="font-bold text-base text-indigo-700">{selectedApp.creditScore} / 900</div>
                      <div className="text-slate-500">Risque faible (Cat. A)</div>
                    </div>
                  </div>

                  {/* KYC Documents */}
                  <div className="space-y-2">
                    <div className="text-xs font-bold text-slate-700 flex items-center justify-between">
                      <span>Pièces Justificatives Transmises ({selectedApp.documents.length})</span>
                      <span className="text-[10px] text-emerald-600 font-semibold">Chiffré AES-256</span>
                    </div>

                    <div className="space-y-1.5">
                      {selectedApp.documents.map((doc, idx) => (
                        <div key={idx} className="p-2.5 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-sterling-gold" />
                            <span className="font-medium text-slate-800">{doc.name}</span>
                          </div>
                          <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded font-bold">
                            {doc.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* ACTION BUTTONS (Full Control) */}
                  <div className="space-y-3 pt-2 border-t border-slate-100">
                    <div className="text-xs font-bold text-sterling-navy uppercase tracking-wider">
                      Décision & Contrôle du Dossier
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => handleUpdateStatus(
                          selectedApp.id, 
                          "approved", 
                          "Accord de principe émis - Prêt validé", 
                          "Décision favorable émise par le comité de crédit. Offre préalable transmise à l'emprunteur."
                        )}
                        className="py-2.5 px-3 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-700 text-white transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                      >
                        <Check className="w-4 h-4 stroke-[3]" />
                        Approuver le Prêt
                      </button>

                      <button
                        onClick={() => handleUpdateStatus(
                          selectedApp.id, 
                          "disbursed", 
                          "Fonds débloqués par virement bancaire SEPA", 
                          "Ordre de virement SEPA instantané exécuté. Montant crédité sur le compte du bénéficiaire."
                        )}
                        className="py-2.5 px-3 rounded-xl font-bold text-xs bg-sterling-navy hover:bg-sterling-navy-light text-white transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                      >
                        <Banknote className="w-4 h-4 text-sterling-gold" />
                        Débloquer les Fonds
                      </button>

                      <button
                        onClick={() => handleUpdateStatus(
                          selectedApp.id, 
                          "under_review", 
                          "Pièces complémentaires requises", 
                          "Demande de justificatif complémentaire envoyée au demandeur (dernier avis fiscal ou quittance de loyer)."
                        )}
                        className="py-2.5 px-3 rounded-xl font-medium text-xs bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Clock className="w-4 h-4" />
                        Demander Pièces
                      </button>

                      <button
                        onClick={() => handleUpdateStatus(
                          selectedApp.id, 
                          "rejected", 
                          "Demande non retenue", 
                          "Dossier refusé pour non-conformité aux critères d'endettement réglementaires."
                        )}
                        className="py-2.5 px-3 rounded-xl font-medium text-xs bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 transition-colors flex items-center justify-center gap-1.5"
                      >
                        <XCircle className="w-4 h-4" />
                        Refuser le Dossier
                      </button>
                    </div>
                  </div>

                  {/* Officer Audit Notes */}
                  <div className="space-y-3 pt-2 border-t border-slate-100">
                    <div className="text-xs font-bold text-slate-700">
                      Journal d&apos;Audit & Notes Internes
                    </div>

                    <div className="space-y-2 max-h-36 overflow-y-auto">
                      {selectedApp.officerNotes.map((note, idx) => (
                        <div key={idx} className="p-2.5 bg-slate-50 rounded-lg text-xs text-slate-600 border border-slate-100">
                          {note}
                        </div>
                      ))}
                    </div>

                    <form onSubmit={handleAddNote} className="flex gap-2">
                      <input
                        type="text"
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        placeholder="Ajouter une instruction ou remarque..."
                        className="flex-1 text-xs px-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-sterling-navy"
                      />
                      <button
                        type="submit"
                        className="px-3 py-2 bg-slate-800 hover:bg-sterling-navy text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1"
                      >
                        <Send className="w-3.5 h-3.5" />
                        Ajouter
                      </button>
                    </form>
                  </div>

                </div>
              ) : (
                <div className="bg-white rounded-2xl p-8 text-center text-slate-400 text-xs">
                  Sélectionnez un dossier à gauche pour afficher les contrôles.
                </div>
              )}
            </div>

          </div>
        )}

        {/* TAB 2: Credit Policy & Rates Controller (Full Control) */}
        {activeTab === "policy" && (
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 max-w-3xl mx-auto space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-xl font-bold text-sterling-navy flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-sterling-gold" />
                Politique de Risque & Barème TAEG des Prêts
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Ajustez en temps réel les taux d&apos;intérêt appliqués par le simulateur et le moteur de scoring.
              </p>
            </div>

            <form onSubmit={handleSavePolicy} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <label className="text-xs font-bold text-sterling-navy">
                    TAEG Fixe • Prêt Personnel Persona (%)
                  </label>
                  <input
                    type="number"
                    step="0.05"
                    value={rates.persona}
                    onChange={(e) => setRates({ ...rates, persona: parseFloat(e.target.value) || 0 })}
                    className="w-full p-2.5 text-base font-bold text-sterling-navy border border-slate-200 rounded-lg bg-white"
                  />
                  <div className="text-[10px] text-slate-400">Taux standard sans justificatif de dépenses</div>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <label className="text-xs font-bold text-sterling-navy">
                    TAEG Fixe • Prêt Auto & Éco-Mobilité (%)
                  </label>
                  <input
                    type="number"
                    step="0.05"
                    value={rates.auto}
                    onChange={(e) => setRates({ ...rates, auto: parseFloat(e.target.value) || 0 })}
                    className="w-full p-2.5 text-base font-bold text-sterling-navy border border-slate-200 rounded-lg bg-white"
                  />
                  <div className="text-[10px] text-slate-400">Véhicules neufs, occasion & bornes recharge</div>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <label className="text-xs font-bold text-sterling-navy">
                    TAEG Fixe • Prêt Éco-Transition EcoSolutions (%)
                  </label>
                  <input
                    type="number"
                    step="0.05"
                    value={rates.ecosolutions}
                    onChange={(e) => setRates({ ...rates, ecosolutions: parseFloat(e.target.value) || 0 })}
                    className="w-full p-2.5 text-base font-bold text-emerald-700 border border-slate-200 rounded-lg bg-white"
                  />
                  <div className="text-[10px] text-slate-400">Taux vert bonifié énergies renouvelables</div>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <label className="text-xs font-bold text-sterling-navy">
                    TAEG Fixe • Prêt Travaux & Rénovation (%)
                  </label>
                  <input
                    type="number"
                    step="0.05"
                    value={rates.home}
                    onChange={(e) => setRates({ ...rates, home: parseFloat(e.target.value) || 0 })}
                    className="w-full p-2.5 text-base font-bold text-sterling-navy border border-slate-200 rounded-lg bg-white"
                  />
                  <div className="text-[10px] text-slate-400">Amélioration de l&apos;habitat & extensions</div>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <label className="text-xs font-bold text-sterling-navy">
                    Plafond Maximum d&apos;Emprunt (€)
                  </label>
                  <input
                    type="number"
                    step="5000"
                    value={rates.maxAmount}
                    onChange={(e) => setRates({ ...rates, maxAmount: parseInt(e.target.value) || 75000 })}
                    className="w-full p-2.5 text-base font-bold text-sterling-navy border border-slate-200 rounded-lg bg-white"
                  />
                  <div className="text-[10px] text-slate-400">Plafond légal crédit consommation (Art. L312-1)</div>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <label className="text-xs font-bold text-sterling-navy">
                    Taux d&apos;Endettement Max Admis (DTI %)
                  </label>
                  <input
                    type="number"
                    value={rates.maxDTI}
                    onChange={(e) => setRates({ ...rates, maxDTI: parseInt(e.target.value) || 35 })}
                    className="w-full p-2.5 text-base font-bold text-sterling-navy border border-slate-200 rounded-lg bg-white"
                  />
                  <div className="text-[10px] text-slate-400">Recommandation HCSF (Haut Conseil de Stabilité Financière) : 35%</div>
                </div>

              </div>

              {policySaved && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Barème de crédit sauvegardé avec succès et appliqué au simulateur !
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="bg-sterling-navy hover:bg-sterling-navy-light text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition-colors shadow-md flex items-center gap-2"
                >
                  <Check className="w-4 h-4 text-sterling-gold" />
                  Enregistrer les Nouveaux Paramètres
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const defaults = { persona: 2.85, auto: 3.10, ecosolutions: 2.50, home: 3.45, maxAmount: 75000, maxDTI: 35 };
                    setRates(defaults);
                    localStorage.setItem("sterling_credit_policy", JSON.stringify(defaults));
                  }}
                  className="px-4 py-3 border border-slate-200 rounded-xl text-xs text-slate-600 hover:bg-slate-50 flex items-center gap-2"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Valeurs par Défaut
                </button>
              </div>
            </form>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
