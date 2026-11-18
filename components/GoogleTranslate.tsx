"use client";

import React, { useEffect, useState } from "react";
import { Globe, ChevronDown, Check } from "lucide-react";
import { useLanguage, Language } from "@/lib/LanguageContext";

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}

const LANGUAGES = [
  { code: "fr", label: "Français (Principal)", flag: "🇫🇷", short: "FR" },
  { code: "en", label: "English", flag: "🇺🇸", short: "EN" },
  { code: "de", label: "Deutsch", flag: "🇩🇪", short: "DE" },
  { code: "es", label: "Español", flag: "🇪🇸", short: "ES" },
  { code: "it", label: "Italiano", flag: "🇮🇹", short: "IT" },
];

export default function GoogleTranslate() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Set up Google Translate init function for external languages (DE, ES, IT)
    window.googleTranslateElementInit = () => {
      if (window.google?.translate?.TranslateElement) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "fr",
            includedLanguages: "fr,en,de,es,it",
            autoDisplay: false,
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          },
          "google_translate_element"
        );
      }
    };

    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.type = "text/javascript";
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }

    // Suppress Google Translate Top Banner and Body Shift
    const suppressGoogleBanner = () => {
      if (document.body) {
        if (document.body.style.top && document.body.style.top !== "0px") {
          document.body.style.setProperty("top", "0px", "important");
        }
        if (document.body.style.position && document.body.style.position !== "static") {
          document.body.style.setProperty("position", "static", "important");
        }
      }
      if (document.documentElement && document.documentElement.style.marginTop && document.documentElement.style.marginTop !== "0px") {
        document.documentElement.style.setProperty("margin-top", "0px", "important");
      }

      const bannerFrames = document.querySelectorAll<HTMLElement>(
        '.goog-te-banner-frame, .VIpgJd-ZVi9od-ORHb-OEVmcd, iframe.skiptranslate, iframe[id*=":1.container"], iframe[id*=":2.container"], iframe[name*="google_translate"]'
      );
      bannerFrames.forEach((frame) => {
        frame.style.setProperty("display", "none", "important");
        frame.style.setProperty("visibility", "hidden", "important");
        frame.style.setProperty("height", "0px", "important");
        frame.style.setProperty("width", "0px", "important");
        frame.style.setProperty("position", "absolute", "important");
        frame.style.setProperty("top", "-9999px", "important");
        frame.setAttribute("hidden", "true");
      });
    };

    suppressGoogleBanner();
    const interval = setInterval(suppressGoogleBanner, 200);
    return () => clearInterval(interval);
  }, []);

  const handleSelectLanguage = (code: string) => {
    setIsOpen(false);
    if (code === "fr" || code === "en") {
      setLanguage(code as Language);
      return;
    }

    // External language via Google Translate (de, es, it)
    const select = document.querySelector<HTMLSelectElement>(".goog-te-combo");
    if (select) {
      select.value = code;
      select.dispatchEvent(new Event("change"));
    }
  };

  const activeLang = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  return (
    <div className="relative inline-flex items-center gap-1.5 notranslate" translate="no">
      {/* Hidden container for Google Translate element */}
      <div id="google_translate_element" className="hidden" />

      {/* Direct 1-Click FR / EN Segmented Toggle */}
      <div className="inline-flex items-center bg-black/25 p-0.5 rounded-lg border border-white/10 text-[10px] sm:text-[11px] font-bold">
        <button
          type="button"
          onClick={() => setLanguage("fr")}
          className={`px-2 py-0.5 sm:py-1 rounded-md transition-all flex items-center gap-1 ${
            language === "fr"
              ? "bg-sterling-gold text-sterling-navy-deep font-extrabold shadow-sm"
              : "text-slate-300 hover:text-white"
          }`}
          title="Afficher en Français"
        >
          <span>🇫🇷</span>
          <span>FR</span>
        </button>
        <button
          type="button"
          onClick={() => setLanguage("en")}
          className={`px-2 py-0.5 sm:py-1 rounded-md transition-all flex items-center gap-1 ${
            language === "en"
              ? "bg-sterling-gold text-sterling-navy-deep font-extrabold shadow-sm"
              : "text-slate-300 hover:text-white"
          }`}
          title="Switch to English"
        >
          <span>🇺🇸</span>
          <span>EN</span>
        </button>
      </div>

      {/* Optional dropdown for more languages */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 sm:px-1.5 sm:py-1 rounded-lg bg-sterling-navy-light/40 hover:bg-sterling-navy-light text-slate-300 hover:text-white border border-white/10 transition-colors"
        aria-label="More languages"
        title="More languages"
      >
        <ChevronDown className={`w-3 h-3 text-slate-300 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)} 
          />
          <div className="absolute right-0 top-full mt-2 w-48 rounded-xl bg-sterling-navy-deep border border-sterling-gold/30 shadow-2xl z-50 py-1.5 divide-y divide-white/5 animate-in fade-in zoom-in-95 duration-150">
            <div className="px-3 py-1.5 text-[10px] font-bold tracking-wider text-sterling-gold uppercase">
              Select Language
            </div>
            <div className="py-1">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => handleSelectLanguage(lang.code)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left transition-colors ${
                    language === lang.code
                      ? "bg-sterling-gold/15 text-sterling-gold font-bold"
                      : "text-slate-200 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">{lang.flag}</span>
                    <span>{lang.label}</span>
                  </div>
                  {language === lang.code && (
                    <Check className="w-3.5 h-3.5 text-sterling-gold" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
