"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductCards from "@/components/ProductCards";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import TrackerSection from "@/components/TrackerSection";
import TrustBadges from "@/components/TrustBadges";
import Footer from "@/components/Footer";
import QuickApplyModal from "@/components/QuickApplyModal";

export default function HomePage() {
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [selectedLoanType, setSelectedLoanType] = useState("persona");

  const handleOpenApply = (loanType: string = "persona") => {
    setSelectedLoanType(loanType);
    setApplyModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans antialiased text-slate-800">
      {/* Top French Banking Navbar */}
      <Navbar onOpenApply={handleOpenApply} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section with Live Euro Calculator & Real Advisor Photo */}
        <Hero onOpenApply={handleOpenApply} />

        {/* Retail Loan Products Matrix with Real Photography */}
        <ProductCards onOpenApply={handleOpenApply} />

        {/* 4-Step Application Walkthrough */}
        <HowItWorks />

        {/* Real Customer Testimonials & Verified Reviews */}
        <Testimonials onOpenApply={handleOpenApply} />

        {/* Application Status Tracker */}
        <TrackerSection />

        {/* ACPR, FGDR, RGPD & eIDAS Trust Badges */}
        <TrustBadges />
      </main>

      {/* Enterprise Banking Footer with French Legal Disclaimers */}
      <Footer />

      {/* 5-Step French Digital Onboarding Application Modal */}
      <QuickApplyModal
        isOpen={applyModalOpen}
        onClose={() => setApplyModalOpen(false)}
        defaultLoanType={selectedLoanType}
      />
    </div>
  );
}
