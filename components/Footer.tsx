"use client";

import React from "react";
import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";
import { useLanguage } from "@/lib/LanguageContext";
import { Building2, Phone, Mail, MapPin, ExternalLink, ShieldCheck, UserCheck, SlidersHorizontal, Lock } from "lucide-react";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-sterling-navy-deep text-white border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand & Overview */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <BrandLogo variant="light" size="md" />
            </div>

            <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
              {t(
                "Loan Commercial Group est une institution financière régulée offrant des prêts aux particuliers, des financements immobiliers, des facilités pour entreprises et des solutions de crédit privé numérique en toute transparence et sécurité.",
                "Loan Commercial Group is a regulated financial institution providing personal loans, real estate financing, corporate facilities, and digital private lending solutions with complete transparency and security."
              )}
            </p>

            <div className="pt-2 text-xs text-slate-300 space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-sterling-gold shrink-0" />
                <span>{t("Centre d'Affaires Loan Commercial Group, Quartier Financier International", "Loan Commercial Group Financial Center, International Business District")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-sterling-gold shrink-0" />
                <span>{t("Service Client & Conseil en Financement : Disponible 24/7", "Client Advisory & Financing Support: Available 24/7")}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold text-xs">WhatsApp :</span>
                <a 
                  href="https://wa.me/?text=Bonjour%2C%20je%20suis%20int%C3%A9ress%C3%A9%28e%29%20par%20votre%20offre%20de%20financement." 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-emerald-400 hover:underline"
                >
                  {t("Support WhatsApp Direct", "Direct WhatsApp Support")}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-sterling-gold shrink-0" />
                <span>contact@loancommercialgroup.com</span>
              </div>
            </div>
          </div>

          {/* Financing Solutions */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-sterling-gold uppercase tracking-wider">
              {t("Solutions de Financement", "Financial Solutions")}
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li><Link href="/personal-loans" className="hover:text-sterling-gold transition-colors font-medium text-sterling-gold">{t("Prêt Personnel & Entreprise", "Personal & Business Loans")}</Link></li>
              <li><Link href="/auto-loans" className="hover:text-sterling-gold transition-colors">{t("Prêt Auto & Flotte Commerciale", "Auto & Fleet Financing")}</Link></li>
              <li><Link href="/home-loans" className="hover:text-sterling-gold transition-colors">{t("Habitat & Financement de Construction", "Housing & Construction Financing")}</Link></li>
              <li><Link href="/apply" className="hover:text-sterling-gold transition-colors">{t("Investissement Privé International ($100k - $500M+)", "International Investment ($100k - $500M+)")}</Link></li>
              <li><Link href="/tracker" className="hover:text-sterling-gold transition-colors">{t("Suivi de Demande en Direct", "Live Application Tracker")}</Link></li>
              <li><Link href="/#calculator" className="hover:text-sterling-gold transition-colors">{t("Simulateur de Prêt Interactif", "Interactive Loan Calculator")}</Link></li>
            </ul>
          </div>

          {/* Online Banking & Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-sterling-gold uppercase tracking-wider">
              {t("Banque en Ligne & Outils", "Online Banking & Services")}
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li><Link href="/login" className="hover:text-sterling-gold transition-colors flex items-center gap-1.5"><UserCheck className="w-3.5 h-3.5 text-sterling-gold" /> {t("Connexion Espace Client", "Client Portal Login")}</Link></li>
              <li><Link href="/register" className="hover:text-sterling-gold transition-colors flex items-center gap-1.5"><UserCheck className="w-3.5 h-3.5 text-emerald-400" /> {t("S'inscrire / Ouvrir un Compte", "Register / Open Account")}</Link></li>
              <li><Link href="/dashboard" className="hover:text-sterling-gold transition-colors">{t("Tableau de Bord & Solde Client", "Client Balance & Dashboard")}</Link></li>
              <li><Link href="/tracker" className="hover:text-sterling-gold transition-colors">{t("Statut de Dossier en Temps Réel", "Real-Time Dossier Status")}</Link></li>
              <li><Link href="/personal-loans" className="hover:text-sterling-gold transition-colors">{t("Pièces Justificatives Requises", "Required Application Documents")}</Link></li>
              <li><Link href="/compliance/banking-authority" className="hover:text-sterling-gold transition-colors">{t("Réglementations & Garanties", "Regulations & Guarantees")}</Link></li>
            </ul>
          </div>

          {/* Compliance & Regulatory Trust - Matches client requirement image */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-sterling-gold uppercase tracking-wider">
              {t("Conformité Réglementaire & Sécurité", "REGULATORY COMPLIANCE & SECURITY")}
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <Link href="/compliance/banking-authority" className="hover:text-sterling-gold transition-colors">
                  {t("Autorité Bancaire Prudentielle Agréée", "Licensed Prudential Banking Authority")}
                </Link>
              </li>
              <li>
                <Link href="/compliance/deposit-protection" className="hover:text-sterling-gold transition-colors">
                  {t("Cadre Légal de Protection des Dépôts", "Statutory Deposit Protection Framework")}
                </Link>
              </li>
              <li>
                <Link href="/compliance/data-privacy" className="hover:text-sterling-gold transition-colors">
                  {t("Protection des Données & Confidentialité", "Data Privacy & Global Confidentiality")}
                </Link>
              </li>
              <li>
                <Link href="/compliance/consumer-lending" className="hover:text-sterling-gold transition-colors">
                  {t("Réglementation du Crédit & Transparence", "Consumer Lending Regulations & Disclosure")}
                </Link>
              </li>
              <li>
                <Link href="/compliance/dispute-resolution" className="hover:text-sterling-gold transition-colors">
                  {t("Médiateur Financier & Résolution des Litiges", "Financial Ombudsman Dispute Resolution")}
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Responsible Lending Advisory Box */}
        <div className="mt-8 p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-300 space-y-2">
          <div className="flex items-center gap-2 font-bold text-sterling-gold">
            <ShieldCheck className="w-4 h-4 text-sterling-gold" />
            <span>{t("Avertissement Crédit Responsable & Engagement Financier", "Responsible Lending Advisory & Financial Commitment")}</span>
          </div>
          <p className="leading-relaxed">
            {t(
              "Un crédit vous engage et doit être remboursé. Vérifiez vos capacités de remboursement mensuel avant de vous engager. Tout octroi de prêt est soumis à l'étude du dossier, aux vérifications d'identité et aux exigences réglementaires en vigueur. Montants de 100 000 $ / € à 500 000 000 $ / €. Disponible en USD ($) et EUR (€).",
              "Borrowing commits you and must be repaid. Verify your monthly repayment capacities before proceeding. All credit facilities and investor arrangements are subject to dossier review, identity verification, due diligence, and regulatory compliance. Indicative amounts from $100,000 to $500,000,000 and beyond. Official currencies: USD ($) and EUR (€)."
            )}
          </p>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            &copy; {new Date().getFullYear()} Loan Commercial Group. {t("Tous droits réservés.", "All rights reserved.")}
          </div>
          <div className="flex items-center gap-6">
            <Link href="/compliance/data-privacy" className="hover:text-sterling-gold transition-colors">{t("Politique de Confidentialité", "Privacy Policy")}</Link>
            <Link href="/compliance/consumer-lending" className="hover:text-sterling-gold transition-colors">{t("Conditions Générales", "Terms of Service")}</Link>
            <Link href="/compliance/banking-authority" className="hover:text-sterling-gold transition-colors">{t("Divulgations de Sécurité", "Security Disclosures")}</Link>
            <Link href="/admin" className="text-slate-500 hover:text-slate-400">{t("Portail Administrateur", "Admin Workstation")}</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
