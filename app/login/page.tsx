"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Building2, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  ArrowRight, 
  UserCheck, 
  SlidersHorizontal, 
  CheckCircle2, 
  AlertCircle,
  KeyRound,
  Smartphone
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<"client" | "admin">("client");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [requires2FA, setRequires2FA] = useState(false);
  const [otpCode, setOtpCode] = useState(["", "", "", "", "", ""]);

  // Fill quick demo credentials
  const handleQuickDemo = (demoRole: "client" | "admin") => {
    setRole(demoRole);
    setError("");
    if (demoRole === "client") {
      setIdentifier("j.harrison@client.sterlingbankasia.com");
      setPassword("SterlingClient2026!");
    } else {
      setIdentifier("officer.lending@sterlingbankasia.com");
      setPassword("SterlingAdmin2026!");
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!identifier || !password) {
      setError("Please enter your client ID or email address and password.");
      return;
    }

    if (identifier.toLowerCase().includes("admin") || identifier.toLowerCase().includes("officer")) {
      setRole("admin");
    } else {
      setRole("client");
    }

    setLoading(true);

    // Simulate authentication delay
    setTimeout(() => {
      setLoading(false);
      // Trigger 2FA step for security simulation
      setRequires2FA(true);
    }, 800);
  };

  const handleOtpChange = (index: number, val: string) => {
    if (val.length > 1) val = val.slice(-1);
    const updated = [...otpCode];
    updated[index] = val;
    setOtpCode(updated);

    // Auto-focus next input
    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerify2FA = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      if (role === "admin") {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    }, 700);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 font-sans text-slate-800">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          
          {/* Card Container */}
          <div className="bg-white rounded-3xl p-8 shadow-2xl border border-slate-200 relative overflow-hidden">
            {/* Top decorative accent */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-sterling-gold via-sterling-gold-light to-sterling-gold" />

            {/* Header */}
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sterling-navy-deep to-sterling-navy flex items-center justify-center mx-auto text-sterling-gold shadow-lg shadow-sterling-navy/20">
                <Lock className="w-7 h-7 stroke-[2.2]" />
              </div>
              <h1 className="text-2xl font-black text-sterling-navy font-display tracking-tight">
                Secure Banking Portal
              </h1>
              <p className="text-xs text-slate-500">
                Access and manage your loan facilities, applications, and account statements
              </p>
            </div>

            {/* Demo Helpers Button */}
            {!requires2FA && (
              <div className="mt-6 p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl space-y-2">
                <div className="text-[11px] font-bold text-amber-900 flex items-center justify-between">
                  <span>1-Click Demo Client Credentials:</span>
                  <span className="text-[9px] uppercase tracking-wider text-amber-700 bg-amber-200/60 px-1.5 py-0.5 rounded font-black">
                    Quick Test
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleQuickDemo("client")}
                  className="w-full p-2 rounded-lg bg-white border border-amber-300 text-slate-700 hover:border-sterling-gold hover:text-sterling-navy font-semibold transition-colors text-left text-xs flex items-center justify-between"
                >
                  <span>👤 Auto-fill Demo Client (John Harrison)</span>
                  <span className="text-[10px] text-sterling-gold font-bold">Auto-Fill →</span>
                </button>
              </div>
            )}

            {/* Error banner */}
            {error && (
              <div className="mt-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* STEP 1: Main Login Form */}
            {!requires2FA ? (
              <form onSubmit={handleLoginSubmit} className="mt-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {role === "client" ? "Email Address or Client ID" : "Bank Staff / Officer Email"}
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="email"
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      placeholder={role === "client" ? "e.g. j.harrison@client.sterlingbankasia.com" : "officer.lending@sterlingbankasia.com"}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-sterling-gold focus:border-sterling-gold outline-none transition-all"
                      required
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold text-slate-700">
                      Password
                    </label>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        alert("A secure password reset link has been dispatched via SMS/Email.");
                      }}
                      className="text-[11px] font-semibold text-sterling-navy hover:text-sterling-gold transition-colors"
                    >
                      Forgot?
                    </a>
                  </div>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-sterling-gold focus:border-sterling-gold outline-none transition-all"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded text-sterling-navy border-slate-300 focus:ring-sterling-gold"
                    />
                    <span className="text-slate-600 font-medium">Remember this device</span>
                  </label>
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    256-Bit SSL
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-sterling-navy-deep via-sterling-navy to-slate-900 hover:from-sterling-navy hover:to-sterling-navy-deep text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-sterling-navy/20 hover:scale-[1.01] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <span>Verifying security credentials...</span>
                  ) : (
                    <>
                      <span>Sign In to Secure Portal</span>
                      <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                    </>
                  )}
                </button>
              </form>
            ) : (
              /* STEP 2: 2FA Authentication Simulation */
              <form onSubmit={handleVerify2FA} className="mt-6 space-y-6 animate-in fade-in">
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <Smartphone className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-sterling-navy">
                    Two-Factor Authentication (2FA)
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    A 6-digit security verification code was dispatched via SMS to <br />
                    <span className="font-bold text-slate-700">+1 (555) •••-8930</span>.
                  </p>
                </div>

                <div className="flex justify-center gap-2">
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <input
                      key={i}
                      id={`otp-${i}`}
                      type="text"
                      maxLength={1}
                      defaultValue={i === 0 ? "8" : i === 1 ? "4" : i === 2 ? "1" : i === 3 ? "9" : i === 4 ? "2" : "0"}
                      onChange={(e) => handleOtpChange(i, e.target.value)}
                      className="w-11 h-12 text-center text-lg font-mono font-bold border-2 border-slate-200 rounded-xl focus:border-sterling-gold focus:ring-2 focus:ring-sterling-gold/30 outline-none transition-all text-sterling-navy bg-slate-50"
                    />
                  ))}
                </div>

                <div className="space-y-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-sterling-gold via-sterling-gold-light to-sterling-gold text-sterling-navy-deep font-extrabold text-xs sm:text-sm shadow-md hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <span>Authenticating session...</span>
                    ) : (
                      <>
                        <span>Confirm & Access {role === "admin" ? "Officer Portal" : "My Account"}</span>
                        <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setRequires2FA(false)}
                    className="w-full text-center text-xs text-slate-500 hover:text-slate-800 py-1"
                  >
                    Back to Login Screen
                  </button>
                </div>
              </form>
            )}

            {/* Bottom Register Prompt */}
            {!requires2FA && (
              <div className="mt-8 pt-6 border-t border-slate-100 text-center space-y-2">
                <p className="text-xs text-slate-500">
                  Not yet enrolled with Sterling Bank?
                </p>
                <Link
                  href="/register"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-sterling-navy hover:text-sterling-gold transition-colors"
                >
                  Enroll in Online Banking & Apply for a Loan →
                </Link>
              </div>
            )}

          </div>

          {/* Regulatory security note */}
          <div className="text-center text-[11px] text-slate-500 space-y-1">
            <div className="flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Regulated Banking Institution • Deposit Protection • 256-Bit SSL</span>
            </div>
            <p>
              For your security, never share your login credentials or one-time codes via phone or unencrypted email.
            </p>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
