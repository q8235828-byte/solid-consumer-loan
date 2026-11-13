import type { Metadata } from "next";
import "./globals.css";
import PageLoader from "@/components/PageLoader";
import FaviconLoader from "@/components/FaviconLoader";

export const metadata: Metadata = {
  title: "Loan Commercial Group | Commercial Lending & Private Financing Facilities",
  description: "Apply for private investment, commercial loans, and personal financing facilities with Loan Commercial Group. Competitive fixed rates, flexible tenors from 1 to 25 years, and 24-48h fast decisions.",
  keywords: "loan commercial group, commercial loans, personal loans, business financing, auto loans, private lending, capital facilities",
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
    <html lang="en" className="scroll-smooth">
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
