import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sterling Bank of Asia | Consumer Loans & Digital Banking",
  description: "Apply for Persona Personal Loans, Ultima Auto Loans, and Discovery Home Loans with low interest rates, flexible terms, and instant online calculation.",
  keywords: "Sterling Bank of Asia, Persona Personal Loan, Ultima Auto Loan, Discovery Home Loan, Philippine Bank, Consumer Loans",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
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
