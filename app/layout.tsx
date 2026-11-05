import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sterling Bank | Crédit à la Consommation & Prêt Personnel en Ligne",
  description: "Simulez et souscrivez votre crédit en ligne en 5 minutes : Prêt Personnel, Prêt Auto et Crédit Immobilier à taux fixe compétitif. Réponse de principe immédiate.",
  keywords: "crédit consommation, prêt personnel, crédit auto, prêt travaux, rachat de crédit, banque en ligne france",
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
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="min-h-screen bg-slate-50 antialiased selection:bg-sterling-gold selection:text-white">
        {children}
      </body>
    </html>
  );
}
