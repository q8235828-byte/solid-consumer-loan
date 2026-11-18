"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "fr" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  isFrench: boolean;
  isEnglish: boolean;
  t: (frText: string, enText: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "fr",
  setLanguage: () => {},
  isFrench: true,
  isEnglish: false,
  t: (fr, _en) => fr,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("fr");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("lcg_lang") as Language | null;
      if (saved === "en" || saved === "fr") {
        setLanguageState(saved);
        document.documentElement.lang = saved;
      } else {
        // default is French as requested
        setLanguageState("fr");
        document.documentElement.lang = "fr";
      }
    } catch (e) {
      // fallback
      setLanguageState("fr");
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("lcg_lang", lang);
      document.documentElement.lang = lang;

      // Also sync google translate cookie if present
      if (lang === "fr") {
        document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=.${window.location.hostname}; path=/;`;
      } else {
        document.cookie = "googtrans=/fr/en; path=/;";
        document.cookie = `googtrans=/fr/en; domain=.${window.location.hostname}; path=/;`;
      }
    } catch (e) {}
  };

  const t = (frText: string, enText: string) => {
    return language === "fr" ? frText : enText;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        isFrench: language === "fr",
        isEnglish: language === "en",
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
