"use client";

import React from "react";
import { 
  UserCheck, 
  Car, 
  Home, 
  Coins, 
  ArrowRight, 
  Check, 
  Sparkles 
} from "lucide-react";
import { formatPHP } from "@/lib/utils";

interface ProductCardsProps {
  onOpenApply?: (loanType: string) => void;
}

export default function ProductCards({ onOpenApply }: ProductCardsProps) {
  const products = [
    {
      id: "persona",
      name: "Persona Personal Loan",
      badge: "Most Popular",
      category: "Unsecured Cash Loan",
      icon: UserCheck,
      amount: "Up to ₱1,000,000",
      terms: "12 to 36 Months",
      rate: "From 1.2% monthly add-on",
      features: [
        "Zero collateral and no co-maker required",
        "Fast approval in 2 to 3 banking days",
        "Multi-purpose: Travel, medical, education, renovation",
        "Convenient repayment via Post-Dated Checks (PDC)",
      ],
      cta: "Apply for Persona",
      popular: true,
    },
    {
      id: "auto",
      name: "Ultima Auto Loan",
      badge: "Low Downpayment",
      category: "Vehicle Financing",
      icon: Car,
      amount: "Up to 80% Vehicle Value",
      terms: "12 to 60 Months",
      rate: "Competitive dealer rates",
      features: [
        "Brand new passenger and commercial vehicles",
        "Pre-owned / 2nd-hand certified units accepted",
        "Flexible equity downpayment starting at 20%",
        "Free chattel mortgage & comprehensive insurance assistance",
      ],
      cta: "Apply for Auto Loan",
      popular: false,
    },
    {
      id: "home",
      name: "Discovery Home Loan",
      badge: "Up to 25 Years",
      category: "Mortgage Financing",
      icon: Home,
      amount: "Up to ₱25,000,000",
      terms: "1 to 25 Years",
      rate: "Low fixed-period rates",
      features: [
        "House & lot, townhouse, condominium acquisition",
        "Home construction, expansion & major remodeling",
        "Loan take-out / refinancing from other banks",
        "Accredited top real estate developers across PH",
      ],
      cta: "Apply for Home Loan",
      popular: false,
    },
  ];

  return (
    <section id="products" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-sterling-gold-dark px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Coins className="w-3.5 h-3.5 text-sterling-gold" />
            Sterling Retail Lending Suite
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-sterling-navy tracking-tight font-display">
            Tailored Financial Solutions for Every Milestone
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Choose the loan product that fits your lifestyle. Enjoy transparent pricing, no hidden charges, and dedicated loan officer assistance.
          </p>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {products.map((product) => {
            const Icon = product.icon;
            return (
              <div
                key={product.id}
                className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
                  product.popular
                    ? "bg-white border-2 border-sterling-gold shadow-2xl scale-105 z-10"
                    : "bg-white border border-slate-200 shadow-lg hover:shadow-xl hover:-translate-y-1"
                }`}
              >
                {/* Popular Pill */}
                {product.badge && (
                  <div className="absolute -top-3.5 right-6 bg-gradient-to-r from-sterling-gold to-sterling-gold-light text-sterling-navy-deep font-extrabold text-[11px] px-3.5 py-1 rounded-full shadow-md uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-sterling-navy-deep" />
                    {product.badge}
                  </div>
                )}

                <div>
                  {/* Icon & Title */}
                  <div className="w-14 h-14 rounded-2xl bg-sterling-navy/5 border border-sterling-navy/10 flex items-center justify-center text-sterling-navy mb-6">
                    <Icon className="w-7 h-7 stroke-[2]" />
                  </div>

                  <div className="text-xs font-bold text-sterling-gold-dark uppercase tracking-wider mb-1">
                    {product.category}
                  </div>
                  <h3 className="text-2xl font-black text-sterling-navy font-display mb-4">
                    {product.name}
                  </h3>

                  {/* Highlights Box */}
                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 mb-6 space-y-2">
                    <div className="flex justify-between items-baseline text-xs">
                      <span className="text-slate-500 font-medium">Loan Limit:</span>
                      <span className="font-bold text-sterling-navy text-sm">{product.amount}</span>
                    </div>
                    <div className="flex justify-between items-baseline text-xs">
                      <span className="text-slate-500 font-medium">Flexible Terms:</span>
                      <span className="font-bold text-slate-800">{product.terms}</span>
                    </div>
                    <div className="flex justify-between items-baseline text-xs">
                      <span className="text-slate-500 font-medium">Interest Rate:</span>
                      <span className="font-bold text-emerald-700">{product.rate}</span>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 mb-8">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Key Highlights:
                    </div>
                    {product.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-600 leading-relaxed">
                        <div className="p-0.5 rounded-full bg-emerald-50 text-emerald-600 mt-0.5 shrink-0">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <button
                  onClick={() => onOpenApply?.(product.id)}
                  className={`w-full py-3.5 px-5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                    product.popular
                      ? "bg-sterling-gold hover:bg-sterling-gold-dark text-sterling-navy-deep shadow-md hover:shadow-lg"
                      : "bg-sterling-navy hover:bg-sterling-navy-light text-white shadow-sm"
                  }`}
                >
                  {product.cta}
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
