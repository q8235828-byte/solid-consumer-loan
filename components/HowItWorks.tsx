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
      title: "Calculate & Choose",
      description: "Customize your desired loan amount and repayment tenor using our live amortization simulator to fit your monthly budget.",
      icon: Sliders,
      eta: "1 Minute",
    },
    {
      number: "02",
      title: "5-Minute Online Form",
      description: "Fill in your personal, employment, and income details with real-time field validation and draft auto-saving.",
      icon: FileText,
      eta: "3-5 Minutes",
    },
    {
      number: "03",
      title: "Secure KYC Upload",
      description: "Snap and upload photos of your valid government ID, latest payslips, and proof of billing straight from your phone.",
      icon: UploadCloud,
      eta: "Instant",
    },
    {
      number: "04",
      title: "Fast Disbursement",
      description: "Receive rapid credit evaluation and underwriting decision within 24 to 48 hours, followed by prompt loan disbursement.",
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
            Simple 4-Step Process
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-sterling-navy font-display tracking-tight">
            How Digital Loan Application Works
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Say goodbye to long bank queues, endless paper forms, and physical branch visits. Complete your loan journey entirely online.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="bg-slate-50/80 rounded-2xl p-6 border border-slate-200/80 hover:border-sterling-gold/50 hover:bg-white hover:shadow-xl transition-all duration-300 relative group flex flex-col justify-between"
              >
                <div>
                  {/* Step Number & Time Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-black text-slate-300 group-hover:text-sterling-gold transition-colors font-display">
                      {step.number}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500 bg-white px-2.5 py-1 rounded-full border border-slate-200 shadow-sm flex items-center gap-1">
                      <Clock className="w-3 h-3 text-sterling-gold" />
                      {step.eta}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-sterling-navy text-sterling-gold flex items-center justify-center mb-5 shadow-md group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 stroke-[2]" />
                  </div>

                  {/* Title & Body */}
                  <h3 className="text-lg font-bold text-sterling-navy mb-2.5">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {step.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/60 flex items-center gap-1 text-[11px] font-bold text-sterling-gold-dark">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sterling-gold" />
                  <span>Verified Banking Channel</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-14 bg-gradient-to-r from-sterling-navy-deep to-sterling-navy rounded-2xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg font-bold text-sterling-gold-light">
              Already submitted your loan application?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Track your real-time approval status anytime using your Application Reference Number.
            </p>
          </div>
          <a
            href="#tracker"
            className="shrink-0 bg-white hover:bg-slate-100 text-sterling-navy-deep font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition-all shadow-md flex items-center gap-2"
          >
            Track My Application
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </a>
        </div>
      </div>
    </section>
  );
}
