import type { Metadata } from "next";
import "./globals.css";
import PageLoader from "@/components/PageLoader";

export const metadata: Metadata = {
  title: "Loan Commercial Group | Commercial Lending & Private Financing Facilities",
  description: "Apply for private investment, commercial loans, and personal financing facilities with Loan Commercial Group. Competitive fixed rates, flexible tenors from 1 to 25 years, and 24-48h fast decisions.",
  keywords: "loan commercial group, commercial loans, personal loans, business financing, auto loans, private lending, capital facilities",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.png", type: "image/png" }
    ],
    apple: "/favicon.png",
  }
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
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
      </head>
      <body className="min-h-screen bg-slate-50 antialiased selection:bg-sterling-gold selection:text-white">
        <PageLoader />
        {children}
      </body>
    </html>
  );
}
