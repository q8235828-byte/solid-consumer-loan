"use client";

import React, { useEffect, useState } from "react";
import { Globe, ChevronDown, Check } from "lucide-react";

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}

const LANGUAGES = [
  { code: "fr", label: "Français", flag: "🇫🇷", short: "FR" },
  { code: "en", label: "English", flag: "🇬🇧", short: "EN" },
  { code: "de", label: "Deutsch", flag: "🇩🇪", short: "DE" },
  { code: "es", label: "Español", flag: "🇪🇸", short: "ES" },
  { code: "it", label: "Italiano", flag: "🇮🇹", short: "IT" },
];

export default function GoogleTranslate() {
  const [currentLang, setCurrentLang] = useState("fr");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check existing googtrans cookie
    const match = document.cookie.match(/(?:^|;\s*)googtrans=([^;]+)/);
    if (match) {
      const parts = match[1].split("/");
      const lang = parts[parts.length - 1];
      if (lang && LANGUAGES.some(l => l.code === lang)) {
        setCurrentLang(lang);
      }
    }

    // Set up Google Translate init function
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

    // Load Google Translate script if not present
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

      // Hide banner iframes
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
    const interval = setInterval(suppressGoogleBanner, 150);

    const observer = new MutationObserver(() => {
      suppressGoogleBanner();
    });

    if (document.documentElement) {
      observer.observe(document.documentElement, {
        attributes: true,
        childList: true,
        subtree: true,
        attributeFilter: ["style", "class"],
      });
    }

    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, []);

  const handleSelectLanguage = (code: string) => {
    setCurrentLang(code);
    setIsOpen(false);

    // Set cookie for Google translate
    const cookieValue = code === "fr" ? "/fr/fr" : `/fr/${code}`;
    const domain = window.location.hostname;
    document.cookie = `googtrans=${cookieValue}; path=/;`;
    document.cookie = `googtrans=${cookieValue}; domain=.${domain}; path=/;`;

    // Attempt to trigger select in Google's element if available
    const select = document.querySelector<HTMLSelectElement>(".goog-te-combo");
    if (select) {
      select.value = code;
      select.dispatchEvent(new Event("change"));
    } else {
      // Reload page to apply cookie translation reliably
      window.location.reload();
    }
  };

  const activeLang = LANGUAGES.find(l => l.code === currentLang) || LANGUAGES[0];

  return (
    <div className="relative inline-block text-left notranslate" translate="no">
      {/* Hidden container for Google Translate element */}
      <div id="google_translate_element" className="hidden" />

      {/* Styled Language Selector Pill */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-sterling-navy-light/60 hover:bg-sterling-navy-light text-white border border-white/10 hover:border-sterling-gold/50 transition-all shadow-sm"
        aria-expanded={isOpen}
      >
        <span className="text-sm">{activeLang.flag}</span>
        <span className="hidden sm:inline font-medium">{activeLang.short}</span>
        <Globe className="w-3.5 h-3.5 text-sterling-gold" />
        <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)} 
          />
          <div className="absolute right-0 mt-2 w-48 rounded-xl bg-sterling-navy-deep border border-sterling-gold/30 shadow-2xl z-50 py-1.5 divide-y divide-white/5 animate-in fade-in zoom-in-95 duration-150">
            <div className="px-3 py-1.5 text-[10px] font-bold tracking-wider text-sterling-gold uppercase">
              Europe (Top 5 Languages)
            </div>
            <div className="py-1">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleSelectLanguage(lang.code)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left transition-colors ${
                    currentLang === lang.code
                      ? "bg-sterling-gold/15 text-sterling-gold font-bold"
                      : "text-slate-200 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">{lang.flag}</span>
                    <span>{lang.label}</span>
                  </div>
                  {currentLang === lang.code && (
                    <Check className="w-3.5 h-3.5 text-sterling-gold" />
                  )}
                </button>
              ))}
            </div>
            <div className="px-3 py-1.5 text-[9px] text-slate-400">
              Powered by Google Translate
            </div>
          </div>
        </>
      )}
    </div>
  );
}
