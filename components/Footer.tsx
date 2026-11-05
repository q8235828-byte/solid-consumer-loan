"use client";

import React from "react";
import { Building2, Phone, Mail, MapPin, ExternalLink, ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-sterling-navy-deep text-white border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand & Overview */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-sterling-gold via-sterling-gold-light to-sterling-gold-dark flex items-center justify-center">
                <Building2 className="w-5 h-5 text-sterling-navy-deep stroke-[2.2]" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-tight text-white font-display">
                  STERLING BANK
                </span>
                <span className="text-[9px] tracking-[0.25em] text-sterling-gold uppercase font-semibold">
                  OF ASIA • A Savings Bank
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
              Sterling Bank of Asia Inc. (A Savings Bank) is dedicated to delivering transparent, agile, and customer-first digital banking solutions across the Philippines.
            </p>

            <div className="pt-2 text-xs text-slate-300 space-y-1">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-sterling-gold shrink-0" />
                <span>Sterling Bank Corporate Center, Ortigas Ave, Greenhills, San Juan City</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-sterling-gold shrink-0" />
                <span>Customer Care Hotline: (02) 8535-6168</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-sterling-gold shrink-0" />
                <span>consumerloans@sterlingbankasia.com</span>
              </div>
            </div>
          </div>

          {/* Consumer Loans */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-sterling-gold uppercase tracking-wider">
              Consumer Loans
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li><a href="#calculator" className="hover:text-sterling-gold transition-colors">Persona Personal Loan</a></li>
              <li><a href="#products" className="hover:text-sterling-gold transition-colors">Ultima Auto Loan (New)</a></li>
              <li><a href="#products" className="hover:text-sterling-gold transition-colors">Ultima Auto Loan (Pre-Owned)</a></li>
              <li><a href="#products" className="hover:text-sterling-gold transition-colors">Discovery Home Loan</a></li>
              <li><a href="#products" className="hover:text-sterling-gold transition-colors">AvanceCash Salary Loan</a></li>
              <li><a href="#calculator" className="hover:text-sterling-gold transition-colors">Loan Calculator & Simulator</a></li>
            </ul>
          </div>

          {/* Digital Self-Service */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-sterling-gold uppercase tracking-wider">
              Self-Service & Tools
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li><a href="#tracker" className="hover:text-sterling-gold transition-colors">Application Status Tracker</a></li>
              <li><a href="https://sterlingbankonline-personal.com" target="_blank" rel="noreferrer" className="hover:text-sterling-gold transition-colors flex items-center gap-1">Online Banking <ExternalLink className="w-3 h-3" /></a></li>
              <li><a href="#" className="hover:text-sterling-gold transition-colors">Loan Document Checklist</a></li>
              <li><a href="#" className="hover:text-sterling-gold transition-colors">Auto-Debit Arrangement (ADA)</a></li>
              <li><a href="#" className="hover:text-sterling-gold transition-colors">Post-Dated Check Guidelines</a></li>
              <li><a href="#" className="hover:text-sterling-gold transition-colors">Branch & ATM Directory</a></li>
            </ul>
          </div>

          {/* Compliance & Regulatory */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-sterling-gold uppercase tracking-wider">
              Governance & Legal
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li><a href="#" className="hover:text-sterling-gold transition-colors">Bangko Sentral ng Pilipinas (BSP)</a></li>
              <li><a href="#" className="hover:text-sterling-gold transition-colors">PDIC Maximum Deposit Coverage</a></li>
              <li><a href="#" className="hover:text-sterling-gold transition-colors">Data Privacy Act Notice (RA 10173)</a></li>
              <li><a href="#" className="hover:text-sterling-gold transition-colors">Consumer Protection Framework</a></li>
              <li><a href="#" className="hover:text-sterling-gold transition-colors">Terms of Electronic Banking</a></li>
            </ul>
          </div>

        </div>

        {/* Regulatory Disclaimer Notice */}
        <div className="pt-8 text-[11px] text-slate-400 space-y-2 leading-relaxed">
          <p>
            Sterling Bank of Asia Inc. (A Savings Bank) is regulated by the Bangko Sentral ng Pilipinas (BSP). For inquiries and comments, please contact Sterling Bank of Asia Customer Helpdesk at (02) 8535-6168 or email customer.service@sterlingbankasia.com. You may also contact the BSP Financial Consumer Protection Department at (02) 8708-7087 or consumeraffairs@bsp.gov.ph.
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 border-t border-white/5 text-[10px] text-slate-500">
            <div>
              © {new Date().getFullYear()} Sterling Bank of Asia Inc. All Rights Reserved. Built with Next.js 15.
            </div>
            <div className="flex items-center gap-4 mt-2 sm:mt-0">
              <span>Security Audited</span>
              <span>•</span>
              <span>PCI-DSS v4.0 Compliant</span>
              <span>•</span>
              <span>BancNet Member</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
