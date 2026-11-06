"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Building2, Phone, Mail, MapPin, ExternalLink, ShieldCheck, UserCheck, SlidersHorizontal, Lock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-sterling-navy-deep text-white border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand & Overview */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-white px-3.5 py-1.5 rounded-2xl shadow-md inline-flex items-center border border-white/20">
                <Image
                  src="/logo.png"
                  alt="Sterling Bank of Asia"
                  width={150}
                  height={48}
                  className="h-9 w-auto object-contain"
                />
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
              Sterling Bank of Asia is a licensed banking institution providing consumer loans, mortgage financing, corporate facilities, and digital private lending with full transparency and security.
            </p>

            <div className="pt-2 text-xs text-slate-300 space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-sterling-gold shrink-0" />
                <span>Sterling Bank Corporate Center, Global Financial District</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-sterling-gold shrink-0" />
                <span>Customer Care & Loan Advisory: Available 24/7</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold text-xs">WhatsApp:</span>
                <a 
                  href="https://wa.me/?text=Hello%20I%20am%20interested%20in%20your%20Loan%20Offer" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-emerald-400 hover:underline"
                >
                  Direct WhatsApp Support
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-sterling-gold shrink-0" />
                <span>contact@sterlingbankasia.com</span>
              </div>
            </div>
          </div>

          {/* Financing Solutions */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-sterling-gold uppercase tracking-wider">
              Financing Solutions
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li><Link href="/personal-loans" className="hover:text-sterling-gold transition-colors font-medium text-sterling-gold">Persona Personal Loan</Link></li>
              <li><Link href="/auto-loans" className="hover:text-sterling-gold transition-colors">Auto Loan & Fleet Facility</Link></li>
              <li><Link href="/home-loans" className="hover:text-sterling-gold transition-colors">Home Loan & Construction</Link></li>
              <li><Link href="/apply" className="hover:text-sterling-gold transition-colors">Private Investment Lending ($100k-$500M)</Link></li>
              <li><Link href="/tracker" className="hover:text-sterling-gold transition-colors">Application Status Tracker</Link></li>
              <li><Link href="/loan-calculator" className="hover:text-sterling-gold transition-colors">Interactive Loan Simulator</Link></li>
            </ul>
          </div>

          {/* Online Banking & Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-sterling-gold uppercase tracking-wider">
              Online Banking & Tools
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li><Link href="/login" className="hover:text-sterling-gold transition-colors flex items-center gap-1.5"><UserCheck className="w-3.5 h-3.5 text-sterling-gold" /> Secure Client Login</Link></li>
              <li><Link href="/register" className="hover:text-sterling-gold transition-colors flex items-center gap-1.5"><UserCheck className="w-3.5 h-3.5 text-emerald-400" /> Enroll / Open Account</Link></li>
              <li><Link href="/dashboard" className="hover:text-sterling-gold transition-colors">Borrower Portal Dashboard</Link></li>
              <li><Link href="/tracker" className="hover:text-sterling-gold transition-colors">Real-Time Application Status</Link></li>
              <li><Link href="/personal-loans" className="hover:text-sterling-gold transition-colors">Required Documentation</Link></li>
              <li><Link href="/personal-loans" className="hover:text-sterling-gold transition-colors">Frequently Asked Questions (FAQ)</Link></li>
            </ul>
          </div>

          {/* Compliance & Regulatory Trust */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-sterling-gold uppercase tracking-wider">
              Regulatory Compliance & Security
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li><a href="#" className="hover:text-sterling-gold transition-colors">Licensed Prudential Banking Authority</a></li>
              <li><a href="#" className="hover:text-sterling-gold transition-colors">Statutory Deposit Protection Framework</a></li>
              <li><a href="#" className="hover:text-sterling-gold transition-colors">Data Privacy & Global Confidentiality</a></li>
              <li><a href="#" className="hover:text-sterling-gold transition-colors">Consumer Lending Regulations & Disclosure</a></li>
              <li><a href="#" className="hover:text-sterling-gold transition-colors">Financial Ombudsman Dispute Resolution</a></li>
            </ul>
          </div>

        </div>

        {/* Responsible Lending Advisory Box */}
        <div className="mt-8 p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-300 space-y-2">
          <div className="flex items-center gap-2 font-bold text-sterling-gold">
            <ShieldCheck className="w-4 h-4 text-sterling-gold" />
            <span>Responsible Lending Notice & Capital Commitment</span>
          </div>
          <p className="leading-relaxed">
            Borrowing involves a financial commitment that must be repaid. Please verify your monthly repayment capability before entering into any credit agreement. All loan approvals are subject to underwriting assessment, identity verification, and required regulatory compliance. Available in USD ($) and EUR (€).
          </p>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            &copy; {new Date().getFullYear()} Sterling Bank of Asia. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-sterling-gold transition-colors">Privacy Policy</Link>
            <Link href="/" className="hover:text-sterling-gold transition-colors">Terms of Service</Link>
            <Link href="/" className="hover:text-sterling-gold transition-colors">Security Disclosures</Link>
            <Link href="/admin" className="text-slate-500 hover:text-slate-400">Admin Portal</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
