"use client";

import React from "react";
import { X, Calendar, Download, ShieldCheck, Printer } from "lucide-react";

interface AmortizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  principal: number;
  tenorMonths: number;
  annualRate?: number;
  annualRatePct?: number;
  monthlyPayment: number;
  totalRepayment?: number;
  totalInterest?: number;
  currency?: string;
}

export default function AmortizationModal({
  isOpen,
  onClose,
  principal,
  tenorMonths,
  annualRate,
  annualRatePct,
  monthlyPayment,
  currency = "USD",
}: AmortizationModalProps) {
  if (!isOpen) return null;

  const effectiveRate = annualRate ?? annualRatePct ?? 2.85;
  const monthlyRate = effectiveRate / 100 / 12;
  const schedule = [];
  let remainingBalance = principal;
  let totalInterest = 0;

  for (let month = 1; month <= tenorMonths; month++) {
    const interest = remainingBalance * monthlyRate;
    const principalPaid = monthlyPayment - interest;
    totalInterest += interest;
    remainingBalance = Math.max(0, remainingBalance - principalPaid);

    schedule.push({
      month,
      monthlyPayment,
      principalPaid,
      interest,
      totalInterest,
      remainingBalance,
    });
  }

  const symbol = currency === "EUR" ? "€" : "$";
  const formatMoney = (val: number) => {
    return `${symbol}${val.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-slate-50/50">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-sterling-gold border border-amber-200 mb-1">
              <ShieldCheck className="w-3 h-3" />
              Official Amortization Schedule
            </div>
            <h3 className="text-lg font-black text-sterling-navy font-display">
              Detailed Loan Repayment Schedule
            </h3>
            <p className="text-xs text-slate-500">
              Amount: {formatMoney(principal)} | Tenor: {tenorMonths} Months | Fixed APR: {effectiveRate.toFixed(2)}%
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              type="button"
              className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
              title="Print Schedule"
            >
              <Printer className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              type="button"
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Summary Metric Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 mx-6 my-4 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs">
          <div>
            <div className="text-slate-500 font-medium">Monthly Payment</div>
            <div className="text-base font-black text-sterling-navy font-mono">
              {formatMoney(monthlyPayment)}
            </div>
          </div>
          <div>
            <div className="text-slate-500 font-medium">Principal Borrowed</div>
            <div className="text-base font-bold text-slate-800 font-mono">
              {formatMoney(principal)}
            </div>
          </div>
          <div>
            <div className="text-slate-500 font-medium">Total Interest Paid</div>
            <div className="text-base font-bold text-sterling-gold-dark font-mono">
              {formatMoney(totalInterest)}
            </div>
          </div>
          <div>
            <div className="text-slate-500 font-medium">Total Cost of Facility</div>
            <div className="text-base font-black text-emerald-700 font-mono">
              {formatMoney(principal + totalInterest)}
            </div>
          </div>
        </div>

        {/* Scrollable Table */}
        <div className="flex-1 overflow-y-auto px-6 pb-6">
          <table className="w-full text-left text-xs">
            <thead className="sticky top-0 bg-white border-b border-slate-200 text-slate-500 font-semibold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-2.5 px-3">Month</th>
                <th className="py-2.5 px-3">Monthly Payment</th>
                <th className="py-2.5 px-3">Principal</th>
                <th className="py-2.5 px-3">Interest</th>
                <th className="py-2.5 px-3">Total Interest</th>
                <th className="py-2.5 px-3">Remaining Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {schedule.map((row) => (
                <tr key={row.month} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-2 px-3 text-slate-600 font-sans font-medium">
                    #{row.month}
                  </td>
                  <td className="py-2 px-3 font-bold text-sterling-navy">
                    {formatMoney(row.monthlyPayment)}
                  </td>
                  <td className="py-2 px-3 text-emerald-700">
                    {formatMoney(row.principalPaid)}
                  </td>
                  <td className="py-2 px-3 text-amber-700">
                    {formatMoney(row.interest)}
                  </td>
                  <td className="py-2 px-3 text-slate-500">
                    {formatMoney(row.totalInterest)}
                  </td>
                  <td className="py-2 px-3 font-semibold text-slate-800">
                    {formatMoney(row.remainingBalance)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50 text-xs text-slate-500">
          <span>Non-contractual simulation based on fixed rate parameters.</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-sterling-navy hover:bg-sterling-navy-deep text-white font-bold text-xs"
          >
            Close Schedule
          </button>
        </div>

      </div>
    </div>
  );
}
