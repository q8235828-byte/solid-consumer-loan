import type { Metadata } from "next";
import "./globals.css";
import PageLoader from "@/components/PageLoader";
import FaviconLoader from "@/components/FaviconLoader";

export const metadata: Metadata = {
  title: "Loan Commercial Group | Prêts Commerciaux & Facilités de Financement Privé",
  description: "Demandez des facilités d'investissement privé, de prêts commerciaux et de financements personnels avec Loan Commercial Group. Taux fixes compétitifs, durées de 1 à 25 ans et décisions rapides sous 24-48h.",
  keywords: "loan commercial group, prêt commercial, prêt personnel, financement entreprise, prêt auto, crédit immobilier, prêt privé, facilités de capital",
  icons: {
    icon: [
      { url: "/favicon.svg?v=5", type: "image/svg+xml" },
      { url: "/favicon-32x32.png?v=5", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png?v=5", sizes: "16x16", type: "image/png" },
      { url: "/favicon.ico?v=5" }
    ],
    apple: "/favicon.png?v=5",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg?v=5" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=5" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png?v=5" />
        <link rel="shortcut icon" href="/favicon.ico?v=5" />
        <link rel="apple-touch-icon" href="/favicon.png?v=5" />
      </head>
      <body className="min-h-screen bg-slate-50 antialiased selection:bg-sterling-gold selection:text-white">
        <FaviconLoader />
        <PageLoader />
        {children}
      </body>
    </html>
  );
}
