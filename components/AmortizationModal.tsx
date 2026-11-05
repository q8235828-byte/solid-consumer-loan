"use client";

import React from "react";
import { X, Calendar, Printer } from "lucide-react";
import { formatEUR } from "@/lib/utils";

interface AmortizationRow {
  month: number;
  beginningBalance: number;
  payment: number;
  principal: number;
  interest: number;
  endingBalance: number;
}

interface AmortizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  principal: number;
  monthlyPayment: number;
  tenorMonths: number;
  annualRatePct: number;
  totalInterest: number;
  totalRepayment: number;
}

export default function AmortizationModal({
  isOpen,
  onClose,
  principal,
  monthlyPayment,
  tenorMonths,
  annualRatePct,
  totalInterest,
  totalRepayment,
}: AmortizationModalProps) {
  if (!isOpen) return null;

  // Monthly interest computation
  const monthlyRate = annualRatePct / 100 / 12;
  const rows: AmortizationRow[] = [];
  let balance = principal;

  for (let m = 1; m <= tenorMonths; m++) {
    const interestPart = balance * monthlyRate;
    const principalPart = monthlyPayment - interestPart;
    const ending = Math.max(0, balance - principalPart);

    rows.push({
      month: m,
      beginningBalance: balance,
      payment: monthlyPayment,
      principal: principalPart,
      interest: interestPart,
      endingBalance: ending,
    });

    balance = ending;
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="bg-sterling-navy text-white px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-sterling-gold/20 rounded-lg text-sterling-gold">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Tableau d&apos;Amortissement Indicatif</h3>
              <p className="text-xs text-slate-300">
                Montant : {formatEUR(principal)} | Durée : {tenorMonths} mois | TAEG fixe : {annualRatePct.toFixed(2)}%
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Summary Badges */}
        <div className="bg-slate-50 px-6 py-4 grid grid-cols-2 sm:grid-cols-4 gap-4 border-b border-slate-200 text-xs">
          <div>
            <div className="text-slate-500 font-medium">Mensualité (hors ass.)</div>
            <div className="text-sm font-bold text-sterling-navy">{formatEUR(monthlyPayment)} / mois</div>
          </div>
          <div>
            <div className="text-slate-500 font-medium">Montant Emprunté</div>
            <div className="text-sm font-bold text-slate-800">{formatEUR(principal)}</div>
          </div>
          <div>
            <div className="text-slate-500 font-medium">Coût Total des Intérêts</div>
            <div className="text-sm font-bold text-amber-600">{formatEUR(totalInterest)}</div>
          </div>
          <div>
            <div className="text-slate-500 font-medium">Montant Total Dû</div>
            <div className="text-sm font-bold text-sterling-navy">{formatEUR(totalRepayment)}</div>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-y-auto flex-1 p-6">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-100 text-slate-700 font-semibold sticky top-0 uppercase tracking-wider">
              <tr>
                <th className="py-2.5 px-3">Mois</th>
                <th className="py-2.5 px-3">Capital restant dû</th>
                <th className="py-2.5 px-3">Mensualité</th>
                <th className="py-2.5 px-3">Capital amorti</th>
                <th className="py-2.5 px-3">Intérêts</th>
                <th className="py-2.5 px-3">Capital de fin</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {rows.map((row) => (
                <tr key={row.month} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-2 px-3 font-sans font-medium text-slate-900">{row.month}</td>
                  <td className="py-2 px-3">{formatEUR(row.beginningBalance)}</td>
                  <td className="py-2 px-3 font-semibold text-sterling-navy">{formatEUR(row.payment)}</td>
                  <td className="py-2 px-3 text-emerald-700">{formatEUR(row.principal)}</td>
                  <td className="py-2 px-3 text-amber-700">{formatEUR(row.interest)}</td>
                  <td className="py-2 px-3">{formatEUR(row.endingBalance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>* Exemple indicatif hors assurance facultative. Offre soumise à étude et acceptation définitive du dossier.</div>
          <div className="flex items-center gap-3">
            <button 
              onClick={handlePrint}
              className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-medium rounded-lg flex items-center gap-2 transition-colors shadow-sm"
            >
              <Printer className="w-4 h-4" />
              Imprimer l&apos;échéancier
            </button>
            <button 
              onClick={onClose}
              className="px-5 py-2 bg-sterling-navy text-white hover:bg-sterling-navy-light font-medium rounded-lg transition-colors"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
