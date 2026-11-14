"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductCards from "@/components/ProductCards";
import EligibilityQuiz from "@/components/EligibilityQuiz";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import TrackerSection from "@/components/TrackerSection";
import TrustBadges from "@/components/TrustBadges";
import WhyChooseUs from "@/components/WhyChooseUs";
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
      {/* Top Banking Navbar */}
      <Navbar onOpenApply={handleOpenApply} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Welcome & Hero Section with Live Calculator */}
        <Hero onOpenApply={handleOpenApply} />

        {/* Core Financial Services (Personal & Business, Housing & Construction, International Investment) */}
        <ProductCards onOpenApply={handleOpenApply} />

        {/* 5-Step How It Works Walkthrough */}
        <HowItWorks />

        {/* Why Choose Us & Your Dream, Opportunity, Commitment Closing Section */}
        <WhyChooseUs onOpenApply={handleOpenApply} />

        {/* Verified Client Reviews */}
        <Testimonials onOpenApply={handleOpenApply} />

        {/* Application Status Tracker */}
        <TrackerSection />

        {/* Regulatory & Institutional Trust Badges */}
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
