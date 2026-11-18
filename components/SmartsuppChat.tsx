"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { useLanguage } from "@/lib/LanguageContext";

declare global {
  interface Window {
    _smartsupp?: any;
    smartsupp?: any;
  }
}

// Configurable Smartsupp Chat Key (via env, prop, or localStorage)
const DEFAULT_KEY = process.env.NEXT_PUBLIC_SMARTSUPP_KEY || "";

interface SmartsuppChatProps {
  chatKey?: string;
}

export default function SmartsuppChat({ chatKey = DEFAULT_KEY }: SmartsuppChatProps) {
  const { language } = useLanguage();
  const [activeKey, setActiveKey] = useState<string>(chatKey);

  useEffect(() => {
    // Check localStorage for runtime key configured via admin panel or client
    try {
      const storedKey = localStorage.getItem("lcg_smartsupp_key");
      if (storedKey && storedKey.trim()) {
        setActiveKey(storedKey.trim());
        return;
      }
    } catch (e) {}

    if (chatKey) {
      setActiveKey(chatKey);
    }
  }, [chatKey]);

  useEffect(() => {
    if (!activeKey) return;

    window._smartsupp = window._smartsupp || {};
    window._smartsupp.key = activeKey;
    window._smartsupp.lang = language === "fr" ? "fr" : "en";

    if (window.smartsupp) {
      try {
        window.smartsupp("language", language === "fr" ? "fr" : "en");
      } catch (e) {}
    }
  }, [language, activeKey]);

  if (!activeKey) {
    return null;
  }

  return (
    <Script
      id="smartsupp-chat-script"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          var _smartsupp = _smartsupp || {};
          _smartsupp.key = '${activeKey}';
          _smartsupp.lang = '${language === "fr" ? "fr" : "en"}';
          window.smartsupp||(function(d) {
            var s,c,o=smartsupp=function(){ o._.push(arguments)};o._=[];
            s=d.getElementsByTagName('script')[0];c=d.createElement('script');
            c.type='text/javascript';c.charset='utf-8';c.async=true;
            c.src='https://www.smartsuppchat.com/loader.js?';s.parentNode.insertBefore(c,s);
          })(document);
        `,
      }}
    />
  );
}
