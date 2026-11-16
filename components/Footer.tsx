"use client";

import React from "react";
import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";
import { Building2, Phone, Mail, MapPin, ExternalLink, ShieldCheck, UserCheck, SlidersHorizontal, Lock } from "lucide-react";

export default function Footer() {
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
              Loan Commercial Group est une institution financière régulée offrant des prêts aux particuliers, des financements immobiliers, des facilités pour entreprises et des solutions de crédit privé numérique en toute transparence et sécurité.
            </p>

            <div className="pt-2 text-xs text-slate-300 space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-sterling-gold shrink-0" />
                <span>Centre d'Affaires Loan Commercial Group, Quartier Financier International</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-sterling-gold shrink-0" />
                <span>Service Client & Conseil en Financement : Disponible 24/7</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold text-xs">WhatsApp :</span>
                <a 
                  href="https://wa.me/?text=Bonjour%2C%20je%20suis%20int%C3%A9ress%C3%A9%28e%29%20par%20votre%20offre%20de%20financement." 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-emerald-400 hover:underline"
                >
                  Support WhatsApp Direct
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
              Solutions de Financement
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li><Link href="/personal-loans" className="hover:text-sterling-gold transition-colors font-medium text-sterling-gold">Prêt Personnel Persona</Link></li>
              <li><Link href="/auto-loans" className="hover:text-sterling-gold transition-colors">Prêt Auto & Facilité Mobilité</Link></li>
              <li><Link href="/home-loans" className="hover:text-sterling-gold transition-colors">Prêt Habitat & Construction</Link></li>
              <li><Link href="/apply" className="hover:text-sterling-gold transition-colors">Prêt d'Investissement Privé (100k$ - 500M$)</Link></li>
              <li><Link href="/tracker" className="hover:text-sterling-gold transition-colors">Suivi de Demande en Direct</Link></li>
              <li><Link href="/loan-calculator" className="hover:text-sterling-gold transition-colors">Simulateur de Prêt Interactif</Link></li>
            </ul>
          </div>

          {/* Online Banking & Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-sterling-gold uppercase tracking-wider">
              Banque en Ligne & Outils
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li><Link href="/login" className="hover:text-sterling-gold transition-colors flex items-center gap-1.5"><UserCheck className="w-3.5 h-3.5 text-sterling-gold" /> Connexion Espace Client</Link></li>
              <li><Link href="/register" className="hover:text-sterling-gold transition-colors flex items-center gap-1.5"><UserCheck className="w-3.5 h-3.5 text-emerald-400" /> S'inscrire / Ouvrir un Compte</Link></li>
              <li><Link href="/dashboard" className="hover:text-sterling-gold transition-colors">Tableau de Bord Emprunteur</Link></li>
              <li><Link href="/tracker" className="hover:text-sterling-gold transition-colors">Statut de Dossier en Temps Réel</Link></li>
              <li><Link href="/personal-loans" className="hover:text-sterling-gold transition-colors">Pièces Justificatives Requises</Link></li>
              <li><Link href="/personal-loans" className="hover:text-sterling-gold transition-colors">Foire Aux Questions (FAQ)</Link></li>
            </ul>
          </div>

          {/* Compliance & Regulatory Trust */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-sterling-gold uppercase tracking-wider">
              Conformité Réglementaire & Sécurité
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li><Link href="/compliance/banking-authority" className="hover:text-sterling-gold transition-colors">Autorité Bancaire Prudentielle Agréée</Link></li>
              <li><Link href="/compliance/deposit-protection" className="hover:text-sterling-gold transition-colors">Cadre Légal de Protection des Dépôts</Link></li>
              <li><Link href="/compliance/data-privacy" className="hover:text-sterling-gold transition-colors">Protection des Données & Confidentialité</Link></li>
              <li><Link href="/compliance/consumer-lending" className="hover:text-sterling-gold transition-colors">Réglementation du Crédit & Transparence</Link></li>
              <li><Link href="/compliance/dispute-resolution" className="hover:text-sterling-gold transition-colors">Médiateur Financier & Résolution des Litiges</Link></li>
            </ul>
          </div>

        </div>

        {/* Responsible Lending Advisory Box */}
        <div className="mt-8 p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-300 space-y-2">
          <div className="flex items-center gap-2 font-bold text-sterling-gold">
            <ShieldCheck className="w-4 h-4 text-sterling-gold" />
            <span>Avertissement Crédit Responsable & Engagement Financier</span>
          </div>
          <p className="leading-relaxed">
            Un crédit vous engage et doit être remboursé. Vérifiez vos capacités de remboursement mensuel avant de vous engager. Tout octroi de prêt est soumis à l'étude du dossier, aux vérifications d'identité et aux exigences réglementaires en vigueur. Disponible en USD ($) et EUR (€).
          </p>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            &copy; {new Date().getFullYear()} Loan Commercial Group. Tous droits réservés.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/compliance/data-privacy" className="hover:text-sterling-gold transition-colors">Politique de Confidentialité</Link>
            <Link href="/compliance/consumer-lending" className="hover:text-sterling-gold transition-colors">Conditions Générales</Link>
            <Link href="/compliance/banking-authority" className="hover:text-sterling-gold transition-colors">Divulgations de Sécurité</Link>
            <Link href="/admin" className="text-slate-500 hover:text-slate-400">Portail Administrateur</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
