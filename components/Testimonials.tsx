"use client";

import React from "react";
import { Star, ThumbsUp, CheckCircle, ShieldCheck, ArrowRight } from "lucide-react";

interface TestimonialsProps {
  onOpenApply?: (loanType: string) => void;
}

export default function Testimonials({ onOpenApply }: TestimonialsProps) {
  const reviews = [
    {
      author: "David Harrison",
      role: "Corporate Executive",
      location: "London, UK",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      rating: 5,
      loanType: "Home Improvement Facility ($45,000)",
      date: "October 2026",
      verified: true,
      comment:
        "I needed flexible funding to renovate our family home. The preliminary decision came within 24 hours and the funds were in my account two days later. The fixed rate is transparent and lower than my local high street banks.",
    },
    {
      author: "Sofia Morales",
      role: "Logistics Manager",
      location: "Valencia, Spain",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      rating: 5,
      loanType: "Electric Auto Facility (€28,500)",
      date: "September 2026",
      verified: true,
      comment:
        "Completely seamless experience on smartphone. I simply uploaded my proof of income and ID. The e-mobility discount made a noticeable difference on my monthly payment.",
    },
    {
      author: "Marcus Vance",
      role: "Technology Consultant",
      location: "Frankfurt, Germany",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
      rating: 5,
      loanType: "Persona Personal Loan ($18,000)",
      date: "October 2026",
      verified: true,
      comment:
        "The calculator gave the exact amortization down to the penny with zero surprise fees. Customer support via WhatsApp responded promptly to all my questions.",
    },
  ];

  return (
    <section id="testimonials" className="py-20 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-sterling-gold uppercase tracking-wider bg-sterling-navy/5 px-3 py-1 rounded-full">
            <ThumbsUp className="w-3.5 h-3.5" />
            Verified Client Testimonials
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-sterling-navy font-display tracking-tight">
            Client Success Stories with Loan Commercial Group
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Discover verified reviews from individuals and businesses worldwide who have funded their projects with our lending facilities.
          </p>

          <div className="inline-flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-2xl border border-slate-200 text-xs font-medium text-slate-700">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 stroke-none" />
              ))}
            </div>
            <span className="font-bold text-sterling-navy text-sm">4.9 / 5</span>
            <span className="text-slate-400">|</span>
            <span className="text-slate-600">Based on over 1,280 verified international clients</span>
          </div>
        </div>

        {/* Reviews Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-slate-50/80 rounded-3xl p-7 border border-slate-200/80 hover:border-sterling-gold/50 hover:bg-white hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Rating & Verified badge */}
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 stroke-none" />
                    ))}
                  </div>
                  {rev.verified && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" /> Verified
                    </span>
                  )}
                </div>

                {/* Comment quote */}
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  &ldquo;{rev.comment}&rdquo;
                </p>

                {/* Loan facility tag */}
                <div className="text-[11px] font-semibold text-sterling-gold uppercase tracking-wider font-mono">
                  {rev.loanType}
                </div>
              </div>

              {/* Author profile */}
              <div className="pt-6 mt-6 border-t border-slate-200/60 flex items-center gap-3">
                <img
                  src={rev.avatar}
                  alt={rev.author}
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-white shadow-sm"
                />
                <div>
                  <div className="text-xs font-bold text-sterling-navy">{rev.author}</div>
                  <div className="text-[11px] text-slate-500">{rev.role} • {rev.location}</div>
                  <div className="text-[10px] text-slate-400">{rev.date}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <button
            type="button"
            onClick={() => onOpenApply?.("persona")}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-sterling-gold to-sterling-gold-light hover:from-amber-600 hover:to-sterling-gold text-white font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-xl shadow-lg transition-all"
          >
            <span>Start Your Online Application</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
