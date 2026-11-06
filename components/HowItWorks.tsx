"use client";

import React from "react";
import { 
  Sliders, 
  FileText, 
  UploadCloud, 
  Banknote, 
  ArrowRight, 
  Clock, 
  CheckCircle2 
} from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Simulate Your Financing",
      description: "Select your desired loan amount and repayment tenor tailored to your cashflow. Instantly review your fixed interest rate and monthly payments with zero obligation.",
      icon: Sliders,
      eta: "1 Minute",
    },
    {
      number: "02",
      title: "Complete Online Application",
      description: "Provide your basic personal, employment, or corporate details through our streamlined, secure 256-bit SSL encrypted digital onboarding portal.",
      icon: FileText,
      eta: "3-5 Minutes",
    },
    {
      number: "03",
      title: "Submit Verification Documents",
      description: "Securely upload your valid government ID, recent earnings statements, or business documents directly from your smartphone or computer.",
      icon: UploadCloud,
      eta: "Instant",
    },
    {
      number: "04",
      title: "Rapid Fund Disbursement",
      description: "Upon approval and digital agreement confirmation, your funds are disbursed directly to your designated bank account via secure wire transfer.",
      icon: Banknote,
      eta: "24-48 Hours",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-sterling-gold uppercase tracking-wider bg-sterling-navy/5 px-3 py-1 rounded-full">
            <Clock className="w-3.5 h-3.5" />
            100% Digital Financing Process
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-sterling-navy font-display tracking-tight">
            How It Works: Simple, Transparent & Fast
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Experience our rapid 4-step digital onboarding designed to deliver fast decisions and rapid capital disbursement without unnecessary paperwork.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative bg-slate-50/80 rounded-3xl p-7 border border-slate-200/80 hover:border-sterling-gold/50 hover:bg-white hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Step Header */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-3xl font-black text-sterling-gold/30 group-hover:text-sterling-gold transition-colors">
                      {step.number}
                    </span>
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-sterling-navy/5 text-sterling-navy font-mono">
                      {step.eta}
                    </span>
                  </div>

                  <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-slate-200/80 flex items-center justify-center text-sterling-navy group-hover:bg-sterling-navy group-hover:text-sterling-gold transition-all duration-300">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg font-bold text-sterling-navy font-display">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Step Footer */}
                <div className="pt-6 mt-6 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1.5 text-emerald-600 font-semibold text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Step {idx + 1} of 4
                  </span>
                  {idx < steps.length - 1 && (
                    <ArrowRight className="w-4 h-4 text-slate-300 hidden lg:block" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
