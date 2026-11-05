"use client";

import React from "react";
import Link from "next/link";
import { Building2, Phone, Mail, MapPin, ExternalLink, ShieldCheck, UserCheck, SlidersHorizontal } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-sterling-navy-deep text-white border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand & Overview */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-sterling-gold via-sterling-gold-light to-sterling-gold-dark flex items-center justify-center shadow-md">
                <Building2 className="w-5 h-5 text-sterling-navy-deep stroke-[2.2]" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-tight text-white font-display">
                  STERLING BANK
                </span>
                <span className="text-[9px] tracking-[0.25em] text-sterling-gold uppercase font-semibold">
                  FRANCE • Établissement de Crédit Agréé
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
              Sterling Bank France est un établissement de crédit agréé et contrôlé par l&apos;ACPR (Banque de France). Nous accompagnons les particuliers dans tous leurs projets de financement avec transparence, réactivité et sans frais cachés.
            </p>

            <div className="pt-2 text-xs text-slate-300 space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-sterling-gold shrink-0" />
                <span>14 Rue de Rivoli, 75004 Paris, France</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-sterling-gold shrink-0" />
                <span>Service Client & Conseils : 01 89 54 22 10 (Appel non surtaxé)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-sterling-gold shrink-0" />
                <span>service-client@sterlingbank.fr</span>
              </div>
            </div>
          </div>

          {/* Solutions de Financement */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-sterling-gold uppercase tracking-wider">
              Crédits aux Particuliers
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li><Link href="/personal-loans" className="hover:text-sterling-gold transition-colors font-medium text-sterling-gold">Prêt Personnel Dédié (Persona)</Link></li>
              <li><a href="/#products" className="hover:text-sterling-gold transition-colors">Prêt Auto / Véhicule Électrique</a></li>
              <li><a href="/#products" className="hover:text-sterling-gold transition-colors">Prêt Travaux & Rénovation Énergétique</a></li>
              <li><a href="/#products" className="hover:text-sterling-gold transition-colors">Rachat & Regroupement de Crédits</a></li>
              <li><a href="/#calculator" className="hover:text-sterling-gold transition-colors">Simulateur de Mensualités</a></li>
              <li><Link href="/personal-loans#calculator-section" className="hover:text-sterling-gold transition-colors">Tableau d&apos;Amortissement Détaillé</Link></li>
            </ul>
          </div>

          {/* Espace & Services en Ligne */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-sterling-gold uppercase tracking-wider">
              Services en Ligne
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li><Link href="/dashboard" className="hover:text-sterling-gold transition-colors flex items-center gap-1.5"><UserCheck className="w-3.5 h-3.5 text-sterling-gold" /> Espace Client & Suivi Dossier</Link></li>
              <li><Link href="/admin" className="hover:text-amber-300 transition-colors flex items-center gap-1.5 text-amber-200"><SlidersHorizontal className="w-3.5 h-3.5" /> Espace Admin & Contrôle</Link></li>
              <li><a href="/personal-loans" className="hover:text-sterling-gold transition-colors">Signature Électronique eIDAS</a></li>
              <li><a href="/personal-loans" className="hover:text-sterling-gold transition-colors">Pièces Justificatives Requises</a></li>
              <li><a href="/personal-loans" className="hover:text-sterling-gold transition-colors">Droit de Rétractation (14 jours)</a></li>
              <li><a href="/personal-loans" className="hover:text-sterling-gold transition-colors">Questions Fréquentes (FAQ)</a></li>
            </ul>
          </div>

          {/* Réglementation & Protection */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-sterling-gold uppercase tracking-wider">
              Mentions Légales & Sécurité
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li><a href="#" className="hover:text-sterling-gold transition-colors">Agrément ACPR & Banque de France</a></li>
              <li><a href="#" className="hover:text-sterling-gold transition-colors">Garantie FGDR (jusqu&apos;à 100 000 €)</a></li>
              <li><a href="#" className="hover:text-sterling-gold transition-colors">Protection des Données (RGPD / CNIL)</a></li>
              <li><a href="#" className="hover:text-sterling-gold transition-colors">Code de la Consommation (Art. L312-5)</a></li>
              <li><a href="#" className="hover:text-sterling-gold transition-colors">Médiateur de la Fédération Bancaire (FBF)</a></li>
            </ul>
          </div>

        </div>

        {/* Legal warning box required by French law */}
        <div className="mt-8 p-4 bg-amber-500/10 border border-amber-400/30 rounded-xl text-center">
          <p className="text-xs md:text-sm font-semibold text-amber-300 tracking-wide">
            « Un crédit vous engage et doit être remboursé. Vérifiez vos capacités de remboursement avant de vous engager. »
          </p>
        </div>

        {/* Regulatory Disclaimer Notice */}
        <div className="pt-6 text-[11px] text-slate-400 space-y-2 leading-relaxed">
          <p>
            Sterling Bank France, Société Anonyme au capital de 85 000 000 €, immatriculée au RCS de Paris sous le n° 849 203 118. Siège social : 14 Rue de Rivoli, 75004 Paris. Établissement de crédit agréé sous le code banque CIB 17829 par l&apos;Autorité de Contrôle Prudentiel et de Résolution (ACPR, 4 Place de Budapest, CS 92459, 75436 Paris Cedex 09) et soumis au contrôle de la Banque de France. Intermédiaire d&apos;assurance immatriculé à l&apos;ORIAS sous le n° 19004821.
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 border-t border-white/5 text-[10px] text-slate-400">
            <div>
              © {new Date().getFullYear()} Sterling Bank France. Tous droits réservés. Financement responsable et transparent.
            </div>
            <div className="flex items-center gap-4 mt-2 sm:mt-0">
              <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-sterling-gold" /> Chiffrement AES-256</span>
              <span>•</span>
              <span>Certifié ISO/IEC 27001</span>
              <span>•</span>
              <span>Garantie FGDR 100 000 €</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
