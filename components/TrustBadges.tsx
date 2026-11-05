"use client";

import React from "react";
import { ShieldCheck, Lock, Award, Building, CheckCircle } from "lucide-react";

export default function TrustBadges() {
  const badges = [
    {
      title: "Bangko Sentral ng Pilipinas",
      subtitle: "Supervised Financial Institution",
      description: "Sterling Bank of Asia is a thrift bank regulated by BSP. Circulars 808 & 982 IT Risk compliance certified.",
      icon: Building,
    },
    {
      title: "PDIC Insured",
      subtitle: "Deposit Insurance Protection",
      description: "Deposits are insured by the Philippine Deposit Insurance Corporation up to ₱500,000 per depositor.",
      icon: Award,
    },
    {
      title: "256-Bit Bank Encryption",
      subtitle: "Enterprise TLS 1.3 & CSP",
      description: "All loan data and uploaded KYC documents are protected with field-level AES-256 encryption.",
      icon: Lock,
    },
    {
      title: "Data Privacy Act (RA 10173)",
      subtitle: "NPC Registered Bank",
      description: "Full compliance with the National Privacy Commission for consumer personal data protection.",
      icon: ShieldCheck,
    },
  ];

  return (
    <section className="py-14 bg-slate-100/70 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {badges.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex items-start gap-4 hover:border-sterling-gold/50 transition-colors"
              >
                <div className="w-11 h-11 rounded-xl bg-sterling-navy/5 flex items-center justify-center text-sterling-gold shrink-0 mt-0.5">
                  <Icon className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-sterling-navy leading-tight">
                    {badge.title}
                  </h4>
                  <div className="text-[11px] font-semibold text-sterling-gold-dark mt-0.5 mb-1.5">
                    {badge.subtitle}
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    {badge.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
