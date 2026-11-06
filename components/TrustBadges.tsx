"use client";

import React from "react";
import { ShieldCheck, Lock, Award, Building2, CheckCircle2 } from "lucide-react";

export default function TrustBadges() {
  const badges = [
    {
      icon: Building2,
      title: "Regulated Banking Authority",
      subtitle: "Licensed Financial Institution",
      description: "Sterling Bank of Asia operates under formal regulatory prudential banking oversight and international banking standards.",
    },
    {
      icon: ShieldCheck,
      title: "Deposit & Capital Protection",
      subtitle: "Insured Banking Facility",
      description: "Eligible customer deposits and financing structures are protected under applicable statutory insurance frameworks.",
    },
    {
      icon: Award,
      title: "Data Privacy & Compliance",
      subtitle: "Strict Confidentiality",
      description: "Your financial information is processed in strict compliance with international banking privacy and confidentiality laws.",
    },
    {
      icon: Lock,
      title: "256-Bit SSL & Digital Trust",
      subtitle: "Encrypted Transactions",
      description: "End-to-end cryptographic encryption for all digital applications, identity verification, and document workflows.",
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
                  <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] font-bold text-sterling-gold uppercase tracking-wider">
                    {badge.subtitle}
                  </div>
                  <h4 className="font-bold text-sterling-navy text-sm">
                    {badge.title}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
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
