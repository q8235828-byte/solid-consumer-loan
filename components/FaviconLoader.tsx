"use client";

import { useEffect } from "react";

// Generate SVG Data URL for the dynamic favicon
function getFaviconSvg(isPulsing = false, frame = 0): string {
  const ringRotation = (frame * 30) % 360;
  const starOpacity = isPulsing ? (0.4 + 0.6 * Math.sin(frame * 0.5)) : 1;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
    <defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FCE192" />
        <stop offset="50%" stop-color="#D4AF37" />
        <stop offset="100%" stop-color="#8C6510" />
      </linearGradient>
      <linearGradient id="n" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0B1B3D" />
        <stop offset="100%" stop-color="#040D1D" />
      </linearGradient>
    </defs>

    <!-- Shield Background -->
    <path d="M32 3 L57 14 V34 C57 48 32 62 32 62 C32 62 7 48 7 34 V14 Z" fill="url(#n)" stroke="url(#g)" stroke-width="2.5" />
    
    ${isPulsing ? `
    <!-- Rotating Ring for Favicon Loader State -->
    <circle cx="32" cy="32" r="28" fill="none" stroke="#D4AF37" stroke-width="2" stroke-dasharray="14 10" transform="rotate(${ringRotation} 32 32)" />
    ` : ''}

    <!-- Inner Shield Inset -->
    <path d="M32 8 L52 17 V32 C52 44 32 55 32 55 C32 55 12 44 12 32 V17 Z" fill="none" stroke="#D4AF37" stroke-width="0.8" stroke-opacity="0.4" />

    <!-- Top Gold Star -->
    <polygon points="32,14 34,18 38,18 35,21 36,25 32,22 28,25 29,21 26,18 30,18" fill="url(#g)" opacity="${starOpacity}" />

    <!-- LCG Monogram Letters -->
    <!-- L -->
    <path d="M19 25 V43 H30 V38 H24 V25 Z" fill="url(#g)" />
    <!-- C-G -->
    <path d="M42 27 C38 23 31 23 27 27 C24 30 24 37 27 41 C31 45 38 45 42 41 V36 H34 V32 H42 Z" fill="url(#g)" />
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export default function FaviconLoader() {
  useEffect(() => {
    let link: HTMLLinkElement | null = document.querySelector("link[rel*='icon']");
    if (!link) {
      link = document.createElement("link");
      link.type = "image/svg+xml";
      link.rel = "shortcut icon";
      document.getElementsByTagName("head")[0].appendChild(link);
    }

    // Ensure it uses SVG icon
    link.type = "image/svg+xml";

    let frame = 0;
    // Animate favicon for first 3.5 seconds on load, then settle on crisp static shield
    const interval = setInterval(() => {
      frame++;
      if (link) {
        link.href = getFaviconSvg(true, frame);
      }
      if (frame > 25) {
        clearInterval(interval);
        if (link) {
          link.href = getFaviconSvg(false, 0);
        }
      }
    }, 120);

    return () => clearInterval(interval);
  }, []);

  return null;
}
