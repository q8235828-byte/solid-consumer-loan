"use client";

import React from "react";
import Link from "next/link";
import { 
  UserCheck, 
  Car, 
  Home, 
  ArrowRight, 
  Check, 
  Sparkles,
  ShieldCheck,
  ExternalLink 
} from "lucide-react";

interface ProductCardsProps {
  onOpenApply?: (loanType: string) => void;
}

export default function ProductCards({ onOpenApply }: ProductCardsProps) {
  const products = [
    {
      id: "investment",
      name: "Private Investment & Corporate Loan",
      badge: "High Capital Facility",
      category: "Business & Investment",
      icon: ShieldCheck,
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80",
      amount: "$100,000 to $500,000,000 (USD / EUR)",
      terms: "1 to 25 Years (12–300 Mos)",
      rate: "Fixed from 2.95% APR",
      features: [
        "Available in USD ($) and Euro (€)",
        "For legitimate business, projects & private investments",
        "Proper documentation, legal due diligence & swift review",
        "Assistance via Direct Email & WhatsApp channel",
      ],
      cta: "Apply for Capital Facility",
      popular: true,
      link: "/apply",
      linkText: "Explore Corporate & Private Lending →",
    },
    {
      id: "personnel",
      name: "Persona Personal Loan",
      badge: "Fast Approval",
      category: "Unsecured Multi-Purpose Credit",
      icon: UserCheck,
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
      amount: "$1,000 to $75,000 (USD / EUR)",
      terms: "12 to 84 Months",
      rate: "Fixed APR from 2.85%",
      features: [
        "Zero collateral required with no usage restrictions",
        "Available in dual currency: USD ($) & Euro (€)",
        "Zero hidden management fees or unexpected charges",
        "Flexible monthly automatic repayment schedules",
      ],
      cta: "Calculate Personal Loan",
      popular: false,
      link: "/personal-loans",
      linkText: "Explore Dedicated Personal Loans →",
    },
    {
      id: "auto",
      name: "Auto Loan Facility",
      badge: "Eco-Bonus Included",
      category: "Vehicle & Fleet Financing",
      icon: Car,
      image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80",
      amount: "Up to $150,000 (USD / EUR)",
      terms: "12 to 84 Months",
      rate: "Fixed APR from 3.10%",
      features: [
        "New or certified pre-owned vehicles (dealership or private)",
        "Preferential rate discount for electric & hybrid vehicles",
        "Up to 100% financing available with zero down payment",
        "First repayment deferred up to 90 days upon request",
      ],
      cta: "Calculate Auto Loan",
      popular: false,
      link: "/auto-loans",
      linkText: "Explore Dedicated Auto Loan →",
    },
    {
      id: "immo",
      name: "Home Loan & Renovation Facility",
      badge: "Up to 25 Years",
      category: "Mortgage & Property Improvements",
      icon: Home,
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=600&q=80",
      amount: "Up to $500,000+ (USD / EUR)",
      terms: "24 to 300 Months (Up to 25 Yrs)",
      rate: "Fixed APR from 2.85%",
      features: [
        "Home acquisition, renovation, extension, or solar power",
        "Flexible dual currency financing in USD ($) or EUR (€)",
        "Progressive tranche fund release based on contractor milestones",
        "Customizable optional borrower protection insurance",
      ],
      cta: "Calculate Home Loan",
      popular: false,
      link: "/home-loans",
      linkText: "Explore Dedicated Home Loan →",
    },
  ];

  return (
    <section id="products" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-sterling-gold-dark px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-sterling-gold" />
            Sterling Bank Financing Suite
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-sterling-navy tracking-tight font-display">
            Financing Solutions Structured for Your Goals
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Choose the lending facility tailored to your profile. Benefit from transparent, fixed interest rates guaranteed for the full duration of your facility.
          </p>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
          {products.map((product) => {
            const Icon = product.icon;
            return (
              <div
                key={product.id}
                className={`group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between border ${
                  product.popular
                    ? "border-sterling-gold/60 ring-2 ring-sterling-gold/30"
                    : "border-slate-200 hover:border-sterling-gold/40"
                }`}
              >
                {/* Popular Ribbon */}
                {product.popular && (
                  <div className="absolute top-4 right-4 z-20">
                    <span className="inline-flex items-center gap-1 bg-gradient-to-r from-sterling-gold to-sterling-gold-light text-white text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                      <Sparkles className="w-3 h-3" />
                      {product.badge}
                    </span>
                  </div>
                )}

                {/* Card Top: Photo & Category */}
                <div>
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent" />
                    
                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                      <span className="text-xs font-semibold uppercase tracking-wider text-sterling-gold bg-sterling-navy-deep/80 px-2.5 py-1 rounded-md backdrop-blur-sm">
                        {product.category}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 space-y-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-sterling-navy/5 flex items-center justify-center text-sterling-navy group-hover:bg-sterling-gold/20 group-hover:text-sterling-gold transition-colors">
                          <Icon className="w-4 h-4" />
                        </div>
                        <h3 className="font-bold text-sterling-navy text-lg leading-snug">
                          {product.name}
                        </h3>
                      </div>
                    </div>

                    {/* Financial Terms Strip */}
                    <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 space-y-2">
                      <div className="flex justify-between items-baseline">
                        <span className="text-xs text-slate-500 font-medium">Financing Range</span>
                        <span className="text-sm font-black text-sterling-navy font-mono">
                          {product.amount}
                        </span>
                      </div>
                      <div className="flex justify-between items-baseline">
                        <span className="text-xs text-slate-500 font-medium">Repayment Tenor</span>
                        <span className="text-xs font-bold text-slate-700">
                          {product.terms}
                        </span>
                      </div>
                      <div className="flex justify-between items-baseline pt-1 border-t border-slate-200">
                        <span className="text-xs text-slate-500 font-medium">Interest Rate</span>
                        <span className="text-xs font-black text-emerald-700 font-mono bg-emerald-50 px-2 py-0.5 rounded">
                          {product.rate}
                        </span>
                      </div>
                    </div>

                    {/* Features Checklist */}
                    <ul className="space-y-2.5 text-xs text-slate-600 pt-1">
                      {product.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="p-6 pt-0 space-y-2.5">
                  <button
                    type="button"
                    onClick={() => onOpenApply?.(product.id)}
                    className={`w-full py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm ${
                      product.popular
                        ? "bg-gradient-to-r from-sterling-gold to-sterling-gold-light hover:from-amber-600 hover:to-sterling-gold text-white shadow-md hover:shadow-lg"
                        : "bg-sterling-navy hover:bg-sterling-navy-deep text-white"
                    }`}
                  >
                    <span>{product.cta}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  {/* Dedicated Page Link */}
                  {product.link && (
                    <Link
                      href={product.link}
                      className="w-full text-center text-xs font-semibold text-sterling-navy hover:text-sterling-gold py-1 block transition-colors"
                    >
                      {product.linkText}
                    </Link>
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
