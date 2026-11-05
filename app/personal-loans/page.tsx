"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoanCalculator from "@/components/LoanCalculator";
import QuickApplyModal from "@/components/QuickApplyModal";
import { 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Leaf, 
  GraduationCap, 
  AlertTriangle, 
  FileText, 
  Clock, 
  HelpCircle,
  Building2,
  ChevronRight,
  Calculator,
  Lock,
  Sparkles,
  Award
} from "lucide-react";

export default function PersonalLoansPage() {
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [selectedLoanType, setSelectedLoanType] = useState("persona");

  const handleOpenApply = (loanType: string = "persona") => {
    setSelectedLoanType(loanType);
    setApplyModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-800">
      <Navbar onOpenApply={handleOpenApply} />

      <main className="flex-1">
        {/* Breadcrumb Navigation */}
        <div className="bg-slate-100 border-b border-slate-200 py-2.5 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-slate-500">
            <Link href="/" className="hover:text-sterling-navy transition-colors">Accueil</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-400">Crédits Particuliers</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="font-semibold text-sterling-navy">Prêt Personnel (Persona)</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-sterling-navy-deep via-sterling-navy to-sterling-navy-light text-white py-16 lg:py-24 overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C89D35_1px,transparent_1px)] [background-size:24px_24px]" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sterling-gold/20 border border-sterling-gold/40 text-sterling-gold text-xs font-bold tracking-wide">
                  <Sparkles className="w-4 h-4" />
                  Prêt Personnel Express • Taux Fixe Garanti
                </div>

                <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display text-white leading-tight">
                  Vous avez un projet en tête ? <br />
                  <span className="bg-gradient-to-r from-sterling-gold via-sterling-gold-light to-amber-200 bg-clip-text text-transparent">
                    Donnez-lui vie sans attendre.
                  </span>
                </h1>

                <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl">
                  Qu&apos;il s&apos;agisse de financer un voyage en famille, d&apos;équiper votre logement, de faire face à un imprévu ou d&apos;investir dans l&apos;avenir de vos enfants : nos prêts personnels flexibles et transparents s&apos;adaptent à votre budget avec un TAEG fixe dès <strong>2,85%</strong>.
                </p>

                {/* Highlights */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                    <div className="text-xl font-bold text-sterling-gold">Sans Justificatif</div>
                    <div className="text-xs text-slate-300">Utilisation 100% libre des fonds</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                    <div className="text-xl font-bold text-sterling-gold">1 000 € à 75 000 €</div>
                    <div className="text-xs text-slate-300">Durée de 12 à 84 mois</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10 col-span-2 sm:col-span-1">
                    <div className="text-xl font-bold text-sterling-gold">24h à 48h</div>
                    <div className="text-xs text-slate-300">Réponse de principe immédiate</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 pt-4">
                  <button
                    onClick={() => handleOpenApply("persona")}
                    className="bg-gradient-to-r from-sterling-gold via-sterling-gold-light to-sterling-gold text-sterling-navy-deep font-bold px-7 py-3.5 rounded-xl shadow-lg hover:shadow-sterling-gold/30 hover:scale-[1.02] transition-all flex items-center gap-2"
                  >
                    Faire ma Demande en Ligne
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </button>
                  <a
                    href="#calculator-section"
                    className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3.5 rounded-xl border border-white/20 transition-all flex items-center gap-2"
                  >
                    <Calculator className="w-4 h-4 text-sterling-gold" />
                    Simuler mes Mensualités
                  </a>
                </div>
              </div>

              {/* Real Human Photography Image */}
              <div className="lg:col-span-5 relative">
                <div className="relative mx-auto max-w-md rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 bg-slate-800">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80"
                    alt="Conseillère Sterling Bank en agence à Paris"
                    className="w-full h-80 sm:h-96 object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-xs font-semibold uppercase tracking-wider text-sterling-gold">Conseiller Dédié en France</span>
                    </div>
                    <div className="text-lg font-bold">Un accompagnement humain de A à Z</div>
                    <div className="text-xs text-slate-300">Sans intermédiaire, nos conseillers certifiés vous répondent à Paris du lundi au samedi.</div>
                  </div>
                </div>

                {/* Floating badge */}
                <div className="absolute -bottom-4 -left-4 bg-white text-slate-800 p-4 rounded-xl shadow-xl border border-slate-200 hidden sm:flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-sterling-navy">0 € Frais de Dossier</div>
                    <div className="text-[10px] text-slate-500">Offre exclusive souscription 100% web</div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 3 Personal Loan Variants matching Sterling Bank */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-sterling-gold bg-sterling-navy/5 px-3 py-1 rounded-full">
                Gamme Prêts Personnels
              </span>
              <h2 className="text-3xl font-extrabold text-sterling-navy font-display">
                Choisissez la formule adaptée à votre projet
              </h2>
              <p className="text-sm text-slate-600">
                Trois solutions sur-mesure conçues pour répondre à chaque étape de votre vie avec un taux garanti.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Option 1: Persona Personal Loan */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-sterling-gold/30 hover:border-sterling-gold hover:shadow-xl transition-all flex flex-col justify-between relative group">
                <div className="absolute -top-3 right-6 bg-sterling-gold text-sterling-navy-deep text-[11px] font-extrabold px-3 py-1 rounded-full shadow-sm">
                  LE PLUS DEMANDÉ
                </div>

                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-sterling-navy/5 text-sterling-navy flex items-center justify-center group-hover:bg-sterling-navy group-hover:text-sterling-gold transition-colors">
                    <Zap className="w-6 h-6" />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-sterling-navy">Persona Prêt Personnel</h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Empruntez librement sans fournir de facture d&apos;achat ou de justificatif de dépense.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                    <div className="text-xs text-slate-500">Montant finançable</div>
                    <div className="text-2xl font-extrabold text-sterling-navy">1 000 € à 75 000 €</div>
                    <div className="text-[11px] text-emerald-600 font-semibold">TAEG fixe dès 2,85% • 12 à 84 mois</div>
                  </div>

                  <ul className="space-y-2.5 text-xs text-slate-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Aucune caution ni hypothèque exigée</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Mensualité fixe et connue à l&apos;avance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Virement instantané sous 48h après acceptation</span>
                    </li>
                  </ul>
                </div>

                <button
                  onClick={() => handleOpenApply("persona")}
                  className="mt-6 w-full py-2.5 px-4 rounded-xl font-bold text-xs bg-sterling-navy hover:bg-sterling-navy-light text-white transition-colors flex items-center justify-center gap-2"
                >
                  Souscrire Persona
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Option 2: EcoSolutions Green Loan */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:border-emerald-500 hover:shadow-xl transition-all flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <Leaf className="w-6 h-6" />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-sterling-navy">EcoSolutions Prêt Vert</h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Petit emprunt, grand impact écologique. Pour une transition énergétique accessible.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-100 space-y-1">
                    <div className="text-xs text-slate-500">Montant finançable</div>
                    <div className="text-2xl font-extrabold text-emerald-700">2 500 € à 50 000 €</div>
                    <div className="text-[11px] text-emerald-700 font-semibold">Taux vert bonifié dès 2,50% TAEG</div>
                  </div>

                  <ul className="space-y-2.5 text-xs text-slate-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Panneaux solaires, pompes à chaleur, isolation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Vélos électriques & bornes de recharge à domicile</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Cumulable avec MaPrimeRénov&apos; et aides de l&apos;État</span>
                    </li>
                  </ul>
                </div>

                <button
                  onClick={() => handleOpenApply("ecosolutions")}
                  className="mt-6 w-full py-2.5 px-4 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-700 text-white transition-colors flex items-center justify-center gap-2"
                >
                  Souscrire EcoSolutions
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Option 3: Pangarap / Projets d'Avenir Loan */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:border-sterling-gold hover:shadow-xl transition-all flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <GraduationCap className="w-6 h-6" />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-sterling-navy">Pangarap Avenir & Études</h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Votre avenir commence par un projet. Financez vos études supérieures, masters et reconversions.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                    <div className="text-xs text-slate-500">Montant finançable</div>
                    <div className="text-2xl font-extrabold text-sterling-navy">3 000 € à 60 000 €</div>
                    <div className="text-[11px] text-indigo-600 font-semibold">Différé d&apos;amortissement possible (franchise)</div>
                  </div>

                  <ul className="space-y-2.5 text-xs text-slate-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Frais de scolarité grandes écoles, MBA, universités</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Matériel informatique, logement étudiant, mobilité</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Possibilité de co-emprunteur ou caution parentale</span>
                    </li>
                  </ul>
                </div>

                <button
                  onClick={() => handleOpenApply("education")}
                  className="mt-6 w-full py-2.5 px-4 rounded-xl font-bold text-xs bg-slate-800 hover:bg-sterling-navy text-white transition-colors flex items-center justify-center gap-2"
                >
                  Souscrire Pangarap
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>
        </section>

        {/* Eligibility & Required Documents Tabs */}
        <section className="py-16 bg-white border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              
              {/* Eligibility */}
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-sterling-gold bg-sterling-navy/5 px-3 py-1 rounded-full">
                    Conditions d&apos;Éligibilité
                  </span>
                  <h3 className="text-2xl font-bold text-sterling-navy mt-2">
                    Qui peut prétendre au Prêt Personnel ?
                  </h3>
                </div>

                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-bold text-slate-800">Âge et Situation Géographique</div>
                      <div className="text-xs text-slate-600">Être âgé de 18 à 75 ans à la souscription et résider fiscalement en France Métropolitaine ou dans un pays de l&apos;Union Européenne.</div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-bold text-slate-800">Situation Professionnelle & Revenus</div>
                      <div className="text-xs text-slate-600">Salarié en CDI (hors période d&apos;essai), fonctionnaire, profession libérale, artisan ou retraité justifiant d&apos;un revenu régulier net d&apos;au moins 1 200 € / mois.</div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-bold text-slate-800">Capacité de Remboursement & Solvabilité</div>
                      <div className="text-xs text-slate-600">Ne pas être inscrit au FICP (Fichier des Incidents de Remboursement des Crédits) ni au FCC (Fichier Central des Chèques) auprès de la Banque de France.</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Documents Checklist */}
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-sterling-gold bg-sterling-navy/5 px-3 py-1 rounded-full">
                    Pièces Justificatives
                  </span>
                  <h3 className="text-2xl font-bold text-sterling-navy mt-2">
                    Documents requis pour votre dossier
                  </h3>
                </div>

                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                    <FileText className="w-5 h-5 text-sterling-gold shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-bold text-slate-800">1. Pièce d&apos;Identité Officielle</div>
                      <div className="text-xs text-slate-600">Carte Nationale d&apos;Identité (CNI recto-verso), Passeport européen ou Titre de séjour valide.</div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                    <FileText className="w-5 h-5 text-sterling-gold shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-bold text-slate-800">2. Justificatif de Domicile Récent</div>
                      <div className="text-xs text-slate-600">Facture d&apos;électricité, gaz, eau ou téléphone fixe / internet de moins de 3 mois.</div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                    <FileText className="w-5 h-5 text-sterling-gold shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-bold text-slate-800">3. Justificatifs de Revenus & Relevé Bancaire</div>
                      <div className="text-xs text-slate-600">Vos 3 derniers bulletins de paie (ou dernier avis d&apos;imposition pour les indépendants) + un RIB à votre nom.</div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Embedded Calculator Section */}
        <section id="calculator-section" className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-sterling-gold bg-sterling-navy/5 px-3 py-1 rounded-full">
                Simulateur en Direct
              </span>
              <h2 className="text-3xl font-extrabold text-sterling-navy font-display">
                Calculez votre mensualité en toute clarté
              </h2>
              <p className="text-xs text-slate-500">
                Ajustez le montant et la durée pour visualiser immédiatement votre TAEG fixe et le coût total du crédit.
              </p>
            </div>

            <LoanCalculator onOpenApply={handleOpenApply} />
          </div>
        </section>

        {/* Mandatory French Credit Alert Banner */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="p-4 bg-amber-500/10 border border-amber-400/30 rounded-xl text-center">
            <p className="text-xs md:text-sm font-semibold text-amber-800 tracking-wide">
              « Un crédit vous engage et doit être remboursé. Vérifiez vos capacités de remboursement avant de vous engager. »
            </p>
          </div>
        </div>

        {/* Never Click That Link - Sterling Security Notice */}
        <section className="py-12 bg-white border-t border-slate-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-red-50 via-amber-50 to-orange-50 border border-red-200 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center shrink-0 shadow-md">
                <AlertTriangle className="w-8 h-8" />
              </div>
              <div className="space-y-2 text-center md:text-left">
                <div className="inline-block px-2.5 py-0.5 rounded bg-red-600 text-white font-bold text-[10px] tracking-wider uppercase">
                  Sécurité Bancaire Essentielle
                </div>
                <h4 className="text-lg font-extrabold text-slate-900">
                  « Never Click That Link » • Vigilance Anti-Fraude
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Sterling Bank ne vous demandera <strong>jamais</strong> vos identifiants secrets, votre mot de passe bancaire ou votre code de confirmation SMS par e-mail ou SMS non sollicité. Ne cliquez jamais sur des liens douteux et vérifiez toujours l&apos;URL sécurisée <strong>https://solid-consumer-loan.pages.dev</strong>. En cas de doute, contactez notre centre d&apos;assistance au <strong>01 89 54 22 10</strong>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="text-center space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-sterling-gold bg-sterling-navy/5 px-3 py-1 rounded-full">
                FAQ Prêt Personnel
              </span>
              <h2 className="text-2xl font-bold text-sterling-navy">
                Questions Fréquemment Posées
              </h2>
            </div>

            <div className="space-y-3 pt-4">
              <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-1">
                <h4 className="text-sm font-bold text-sterling-navy">Quand les fonds sont-ils versés sur mon compte bancaire ?</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Conformément au Code de la consommation (Art. L312-19), vous bénéficiez d&apos;un délai légal de rétractation de 14 jours calendaires. Vous pouvez toutefois demander la réduction de ce délai au 8ème jour ouvré pour obtenir vos fonds de manière accélérée par virement SEPA immédiat.
                </p>
              </div>

              <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-1">
                <h4 className="text-sm font-bold text-sterling-navy">Puis-je rembourser mon prêt personnel par anticipation ?</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Oui, à tout moment, de façon totale ou partielle. Pour tout montant inférieur à 10 000 € remboursé par anticipation sur une période de 12 mois, aucune pénalité de remboursement anticipé (IRA) ne vous sera facturée.
                </p>
              </div>

              <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-1">
                <h4 className="text-sm font-bold text-sterling-navy">L&apos;assurance emprunteur est-elle obligatoire ?</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Pour un prêt personnel à la consommation, l&apos;assurance décès-invalidité et perte d&apos;emploi reste facultative. Nous vous proposons une couverture avantageuse pour protéger vos proches en toute sérénité.
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />

      <QuickApplyModal
        isOpen={applyModalOpen}
        onClose={() => setApplyModalOpen(false)}
        defaultLoanType={selectedLoanType}
      />
    </div>
  );
}
